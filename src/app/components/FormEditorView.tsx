import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import logo from 'figma:asset/0cf0ba8496b07b763ba3d08d4a5be68ccb63ce8b.png';
import { QuestionEditor } from './QuestionEditor';
import { QuestionCard } from './QuestionCard';

export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'multiple-choice' | 'checkbox' | 'dropdown';
  question: string;
  options?: string[];
  required: boolean;
}

export function FormEditorView() {
  const [formTitle, setFormTitle] = useState('Encuesta de satisfacción');
  const [formDescription, setFormDescription] = useState('Ayúdanos a mejorar nuestros servicios');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'text',
      question: '¿Cuál es tu nombre completo?',
      required: true
    },
    {
      id: '2',
      type: 'multiple-choice',
      question: '¿Cómo calificarías nuestro servicio?',
      options: ['Excelente', 'Bueno', 'Regular', 'Malo'],
      required: true
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const handleAddQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString()
    };
    setQuestions([...questions, newQuestion]);
    setShowNewQuestion(false);
  };

  const handleUpdateQuestion = (id: string, question: Omit<Question, 'id'>) => {
    setQuestions(questions.map(q => q.id === id ? { ...question, id } : q));
    setEditingId(null);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleDuplicateQuestion = (id: string) => {
    const questionToDuplicate = questions.find(q => q.id === id);
    if (questionToDuplicate) {
      const newQuestion: Question = {
        ...questionToDuplicate,
        id: Date.now().toString(),
        question: `${questionToDuplicate.question} (copia)`
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="InkForm Logo" className="w-12 h-12" />
            <h1 className="text-gray-900">InkForm</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
            Volver a mis formularios
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header del formulario */}
        <div className="bg-white rounded-lg shadow-md p-8 border-t-8 border-gradient-to-r from-orange-500 via-pink-500 to-purple-600" style={{
          borderImage: 'linear-gradient(to right, rgb(249, 115, 22), rgb(236, 72, 153), rgb(147, 51, 234)) 1'
        }}>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-pink-500 outline-none pb-2 mb-4 transition"
            placeholder="Título del formulario"
          />
          <input
            type="text"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-pink-500 outline-none pb-2 transition"
            placeholder="Descripción del formulario"
          />
        </div>

        {/* Preguntas existentes */}
        {questions.map((question) => (
          <div key={question.id}>
            {editingId === question.id ? (
              <QuestionEditor
                initialData={question}
                onSave={(data) => handleUpdateQuestion(question.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <QuestionCard
                question={question}
                onEdit={() => setEditingId(question.id)}
                onDelete={() => handleDeleteQuestion(question.id)}
                onDuplicate={() => handleDuplicateQuestion(question.id)}
              />
            )}
          </div>
        ))}

        {/* Nueva pregunta */}
        {showNewQuestion ? (
          <QuestionEditor
            onSave={handleAddQuestion}
            onCancel={() => setShowNewQuestion(false)}
          />
        ) : (
          <button
            onClick={() => setShowNewQuestion(true)}
            className="w-full bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex items-center justify-center gap-3 text-gray-700 hover:text-pink-600 border-2 border-dashed border-gray-300 hover:border-pink-400"
          >
            <Plus className="w-6 h-6" />
            Agregar pregunta
          </button>
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            Prototipo RF05 - InkForm v1.0
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition">
            Guardar formulario
          </button>
        </div>
      </div>
    </div>
  );
}
