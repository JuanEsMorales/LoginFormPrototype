import { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import type { Question } from './FormEditorView';

interface QuestionEditorProps {
  initialData?: Question;
  onSave: (question: Omit<Question, 'id'>) => void;
  onCancel: () => void;
}

export function QuestionEditor({ initialData, onSave, onCancel }: QuestionEditorProps) {
  const [type, setType] = useState<Question['type']>(initialData?.type || 'text');
  const [question, setQuestion] = useState(initialData?.question || '');
  const [options, setOptions] = useState<string[]>(initialData?.options || ['Opción 1']);
  const [required, setRequired] = useState(initialData?.required || false);

  const questionTypes = [
    { value: 'text', label: 'Respuesta corta' },
    { value: 'textarea', label: 'Párrafo' },
    { value: 'multiple-choice', label: 'Opción múltiple' },
    { value: 'checkbox', label: 'Casillas de verificación' },
    { value: 'dropdown', label: 'Lista desplegable' }
  ];

  const handleAddOption = () => {
    setOptions([...options, `Opción ${options.length + 1}`]);
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    if (!question.trim()) {
      alert('Por favor ingresa el texto de la pregunta');
      return;
    }

    const questionData: Omit<Question, 'id'> = {
      type,
      question: question.trim(),
      required
    };

    if (type === 'multiple-choice' || type === 'checkbox' || type === 'dropdown') {
      questionData.options = options.filter(opt => opt.trim() !== '');
    }

    onSave(questionData);
  };

  const needsOptions = type === 'multiple-choice' || type === 'checkbox' || type === 'dropdown';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
      {/* Campo de pregunta y selector de tipo */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
          placeholder="Escribe tu pregunta aquí"
          autoFocus
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Question['type'])}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white min-w-[200px]"
        >
          {questionTypes.map((qt) => (
            <option key={qt.value} value={qt.value}>
              {qt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Opciones (si el tipo lo requiere) */}
      {needsOptions && (
        <div className="mb-6 space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-shrink-0">
                {type === 'multiple-choice' && (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                )}
                {type === 'checkbox' && (
                  <div className="w-5 h-5 rounded border-2 border-gray-400"></div>
                )}
                {type === 'dropdown' && (
                  <span className="text-gray-500">{index + 1}.</span>
                )}
              </div>
              <input
                type="text"
                value={option}
                onChange={(e) => handleUpdateOption(index, e.target.value)}
                className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-pink-500 outline-none transition"
                placeholder={`Opción ${index + 1}`}
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition ml-7"
          >
            <Plus className="w-4 h-4" />
            Agregar opción
          </button>
        </div>
      )}

      {/* Vista previa del tipo de pregunta */}
      {!needsOptions && (
        <div className="mb-6 pl-2">
          {type === 'text' && (
            <input
              type="text"
              disabled
              className="w-full max-w-md px-3 py-2 border-b border-gray-300 text-gray-400"
              placeholder="Respuesta corta"
            />
          )}
          {type === 'textarea' && (
            <textarea
              disabled
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 resize-none"
              placeholder="Respuesta larga"
            />
          )}
        </div>
      )}

      {/* Footer con acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
          />
          <span className="text-gray-700">Obligatoria</span>
        </label>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {initialData ? 'Guardar cambios' : 'Agregar pregunta'}
          </button>
        </div>
      </div>
    </div>
  );
}
