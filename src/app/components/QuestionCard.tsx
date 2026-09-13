import { Pencil, Trash2, Copy } from 'lucide-react';
import type { Question } from './FormEditorView';

interface QuestionCardProps {
  question: Question;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function QuestionCard({ question, onEdit, onDelete, onDuplicate }: QuestionCardProps) {
  const renderQuestionPreview = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            disabled
            className="w-full max-w-md px-3 py-2 border-b border-gray-300 text-gray-400 bg-transparent"
            placeholder="Respuesta corta"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            disabled
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-400 resize-none bg-transparent"
            placeholder="Respuesta larga"
          />
        );
      
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-gray-400"></div>
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <select
            disabled
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded text-gray-400 bg-transparent"
          >
            <option>Selecciona una opción</option>
            {question.options?.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  const getQuestionTypeLabel = () => {
    const labels = {
      'text': 'Respuesta corta',
      'textarea': 'Párrafo',
      'multiple-choice': 'Opción múltiple',
      'checkbox': 'Casillas',
      'dropdown': 'Lista desplegable'
    };
    return labels[question.type];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group">
      {/* Header de la pregunta */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-gray-900">{question.question}</h3>
            {question.required && (
              <span className="text-red-500">*</span>
            )}
          </div>
          <p className="text-gray-500">
            {getQuestionTypeLabel()}
          </p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition"
            title="Editar pregunta"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Duplicar pregunta"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Eliminar pregunta"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview de la pregunta */}
      <div className="pt-4 border-t border-gray-100">
        {renderQuestionPreview()}
      </div>

      {/* Indicador de obligatoria */}
      {question.required && (
        <p className="text-gray-500 mt-3">
          Esta pregunta es obligatoria
        </p>
      )}
    </div>
  );
}
