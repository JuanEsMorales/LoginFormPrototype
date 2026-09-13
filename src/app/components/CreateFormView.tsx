import { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import logo from 'figma:asset/0cf0ba8496b07b763ba3d08d4a5be68ccb63ce8b.png';

export function CreateFormView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    // Validaciones básicas
    if (!title.trim()) {
      setTimeout(() => {
        setMessage({ type: 'error', text: 'Por favor ingresa un título para el formulario' });
        setIsLoading(false);
      }, 500);
      return;
    }

    // Simulación de creación exitosa
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: `¡Formulario "${title}" creado exitosamente!` 
      });
      setIsLoading(false);
      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setMessage(null);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="InkForm Logo" className="w-12 h-12" />
          <h1 className="text-gray-900">InkForm</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg">
              <Plus className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-gray-900">Crear nuevo formulario</h2>
          </div>
          <p className="text-gray-600">
            Completa la información básica para crear tu formulario
          </p>
        </div>
      </div>

      {/* Formulario principal */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card del formulario */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Mensajes */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  message.type === 'error'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                {message.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`${
                    message.type === 'error' ? 'text-red-800' : 'text-green-800'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )}

            {/* Campo de título */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 mb-3">
                Título del formulario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-gray-900"
                  placeholder="Ej: Encuesta de satisfacción"
                />
              </div>
              <p className="text-gray-500 mt-2">
                Ingresa un título descriptivo para tu formulario
              </p>
            </div>

            {/* Campo de descripción */}
            <div>
              <label htmlFor="description" className="block text-gray-700 mb-3">
                Descripción del formulario
                <span className="text-gray-400 ml-2">(Opcional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none text-gray-900"
                placeholder="Ej: Este formulario tiene como objetivo conocer tu opinión sobre nuestros servicios..."
              />
              <p className="text-gray-500 mt-2">
                Proporciona detalles sobre el propósito del formulario
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setDescription('');
                setMessage(null);
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isLoading ? 'Creando...' : 'Crear formulario'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-500">
            Prototipo RF04 - InkForm v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
