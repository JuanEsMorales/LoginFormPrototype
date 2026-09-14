import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { CreateFormView } from './components/CreateFormView';
import { FormEditorView } from './components/FormEditorView';
import { FormResponseView } from './components/FormResponseView';
import { DashboardView } from './components/DashboardView';

type View = 'login' | 'register' | 'dashboard' | 'create-form' | 'form-editor' | 'form-response';

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  if (view === 'dashboard') return <DashboardView />;
  if (view === 'form-response') return <FormResponseView />;
  if (view === 'form-editor') return <FormEditorView />;
  if (view === 'create-form') return <CreateFormView />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {view === 'login' ? (
          <LoginForm onSwitchToRegister={() => setView('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setView('login')} />
        )}
      </div>
    </div>
  );
}