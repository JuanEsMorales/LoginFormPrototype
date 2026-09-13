import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import logo from 'figma:asset/0cf0ba8496b07b763ba3d08d4a5be68ccb63ce8b.png';
import type { Question } from './FormEditorView';

interface FormResponse {
  [questionId: string]: string | string[];
}

export function FormResponseView() {
  const formTitle = 'Encuesta de satisfacción';
  const formDescription = 'Ayúdanos a mejorar nuestros servicios. Tus respuestas son importantes para nosotros.';
  
  const questions: Question[] = [
    {
      id: '1',
      type: 'text',
      question: '¿Cuál es tu nombre completo?',
      required: true
    },
    {
      id: '2',
      type: 'text',
      question: 'Correo electrónico',
      required: true
    },
    {
      id: '3',
      type: 'multiple-choice',
      question: '¿Cómo calificarías nuestro servicio?',
      options: ['Excelente', 'Bueno', 'Regular', 'Malo'],
      required: true
    },
    {
      id: '4',
      type: 'checkbox',
      question: '¿Qué aspectos te gustaron más? (Puedes seleccionar varios)',
      options: ['Atención al cliente', 'Calidad del producto', 'Tiempo de entrega', 'Precio', 'Facilidad de uso'],
      required: false
    },
    {
      id: '5',
      type: 'dropdown',
      question: '¿Con qué frecuencia utilizas nuestros servicios?',
      options: ['Diariamente', 'Semanalmente', 'Mensualmente', 'Ocasionalmente', 'Primera vez'],
      required: true
    },
    {
      id: '6',
      type: 'textarea',
      question: '¿Tienes alguna sugerencia o comentario adicional?',
      required: false
    }
  ];

  const [responses, setResponses] = useState<FormResponse>({});
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResponseChange = (questionId: string, value: string | string[]) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
    // Remover error si el campo ahora tiene valor
    if (value && (typeof value === 'string' ? value.trim() : value.length > 0)) {
      const newErrors = new Set(errors);
      newErrors.delete(questionId);
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = (responses[questionId] as string[]) || [];
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter(v => v !== option);
    handleResponseChange(questionId, newValues);
  };

  const validateForm = (): boolean => {
    const newErrors = new Set<string>();
    
    questions.forEach(question => {
      if (question.required) {
        const response = responses[question.id];
        if (!response || 
            (typeof response === 'string' && !response.trim()) ||
            (Array.isArray(response) && response.length === 0)) {
          newErrors.add(question.id);
        }
      }
    });

    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll al primer error
      const firstError = document.querySelector('.error-highlight');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const renderQuestionInput = (question: Question) => {
    const hasError = errors.has(question.id);
    const errorClass = hasError ? 'error-highlight' : '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(responses[question.id] as string) || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`w-full max-w-2xl px-4 py-3 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition ${errorClass}`}
            placeholder="Tu respuesta"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={(responses[question.id] as string) || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none ${errorClass}`}
            placeholder="Tu respuesta"
          />
        );
      
      case 'multiple-choice':
        return (
          <div className={`space-y-3 ${errorClass}`}>
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  hasError ? 'hover:bg-red-50' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="w-5 h-5 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className={`space-y-3 ${errorClass}`}>
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={((responses[question.id] as string[]) || []).includes(option)}
                  onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                  className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <select
            value={(responses[question.id] as string) || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`w-full max-w-2xl px-4 py-3 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white ${errorClass}`}
          >
            <option value="">Selecciona una opción</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-4">
              ¡Respuesta enviada!
            </h2>
            <p className="text-gray-600 mb-8">
              Gracias por completar la encuesta. Tus respuestas han sido registradas exitosamente.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setResponses({});
                setErrors(new Set());
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition"
            >
              Enviar otra respuesta
            </button>
            <p className="text-gray-500 mt-8">
              Prototipo RF10 - InkForm v1.0
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header del formulario */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-t-8 border-gradient-to-r from-orange-500 via-pink-500 to-purple-600" style={{
          borderImage: 'linear-gradient(to right, rgb(249, 115, 22), rgb(236, 72, 153), rgb(147, 51, 234)) 1'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="InkForm Logo" className="w-12 h-12" />
            <h1 className="text-gray-900">{formTitle}</h1>
          </div>
          <p className="text-gray-600">
            {formDescription}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-red-600">
              * Indica una pregunta obligatoria
            </p>
          </div>
        </div>

        {/* Mensaje de error general */}
        {errors.size > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800">
                Por favor completa todos los campos obligatorios
              </p>
            </div>
          </div>
        )}

        {/* Preguntas */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-gray-900 mb-1">
                  {question.question}
                  {question.required && (
                    <span className="text-red-600 ml-1">*</span>
                  )}
                </h3>
              </div>
              {renderQuestionInput(question)}
              {errors.has(question.id) && (
                <p className="text-red-600 mt-2">
                  Esta pregunta es obligatoria
                </p>
              )}
            </div>
          ))}

          {/* Botón de envío */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-500">
            Prototipo RF10 - InkForm v1.0
          </p>
          <p className="text-gray-400 mt-2">
            Nunca compartas contraseñas a través de InkForm
          </p>
        </div>
      </div>
    </div>
  );
}
