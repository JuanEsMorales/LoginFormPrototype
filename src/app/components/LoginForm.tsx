import { useState } from 'react';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import logo from 'figma:asset/0cf0ba8496b07b763ba3d08d4a5be68ccb63ce8b.png';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    // Validaciones básicas
    if (!email || !password) {
      setTimeout(() => {
        setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
        setIsLoading(false);
      }, 500);
      return;
    }

    if (!email.includes('@')) {
      setTimeout(() => {
        setMessage({ type: 'error', text: 'Por favor ingresa un correo electrónico válido' });
        setIsLoading(false);
      }, 500);
      return;
    }

    // Simulación de inicio de sesión exitoso
    setTimeout(() => {
      setMessage({ type: 'success', text: '¡Inicio de sesión exitoso! Bienvenido a InkForm' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <img src={logo} alt="InkForm Logo" className="w-20 h-20" />
        </div>
        <h1 className="text-gray-900 mb-2">InkForm</h1>
        <p className="text-gray-600">Inicia sesión en tu cuenta</p>
      </div>

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

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo de correo electrónico */}
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        {/* Campo de contraseña */}
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Olvidaste tu contraseña */}
        <div className="text-right">
          <button
            type="button"
            className="text-pink-600 hover:text-pink-700 transition"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Separador */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-gray-500">o</span>
        </div>
      </div>

      {/* Botón de registro */}
      <button
        type="button"
        onClick={onSwitchToRegister}
        className="w-full border-2 border-pink-500 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition"
      >
        Registrarse
      </button>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-6">
        Prototipo RF01 - InkForm v1.0
      </p>
    </div>
  );
}