import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { CreateFormView } from './components/CreateFormView';
import { FormEditorView } from './components/FormEditorView';
import { FormResponseView } from './components/FormResponseView';

export default function App() {
  const [view, setView] = useState<'login' | 'register' | 'create-form' | 'form-editor' | 'form-response'>('form-response');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      {view === 'form-response' ? (
        <FormResponseView />
      ) : view === 'form-editor' ? (
        <FormEditorView />
      ) : view === 'create-form' ? (
        <CreateFormView />
      ) : (
        <div className="w-full max-w-md">
          {view === 'login' ? (
            <LoginForm onSwitchToRegister={() => setView('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setView('login')} />
          )}
        </div>
      )}
    </div>
  );
}