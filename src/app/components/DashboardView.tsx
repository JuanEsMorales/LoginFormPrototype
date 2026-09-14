import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Bell,
  Plus,
  MoreVertical,
  Clock,
  ChevronRight,
  Menu,
  X,
  User,
  Search,
} from 'lucide-react';
import logo from 'figma:asset/0cf0ba8496b07b763ba3d08d4a5be68ccb63ce8b.png';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

const recentForms = [
  {
    id: 1,
    title: 'Encuesta Satisfacción Clientes',
    lastEdited: 'hace 2 horas',
    responses: 48,
    status: 'Activo',
  },
  {
    id: 2,
    title: 'Registro de Eventos',
    lastEdited: 'ayer',
    responses: 124,
    status: 'Activo',
  },
  {
    id: 3,
    title: 'Evaluación de Servicio',
    lastEdited: 'hace 3 días',
    responses: 31,
    status: 'Activo',
  },
  {
    id: 4,
    title: 'Formulario de Contacto',
    lastEdited: 'hace 1 semana',
    responses: 87,
    status: 'Pausado',
  },
  {
    id: 5,
    title: 'Encuesta NPS Q3 2026',
    lastEdited: 'hace 2 semanas',
    responses: 210,
    status: 'Cerrado',
  },
];

const stats = [
  { label: 'Formularios', value: '12', sub: '+2 este mes', icon: FileText, color: 'from-orange-400 to-orange-500' },
  { label: 'Respuestas', value: '500', sub: '+48 esta semana', icon: BarChart2, color: 'from-pink-400 to-pink-500' },
  { label: 'Usuarios', value: '8', sub: '3 administradores', icon: Users, color: 'from-purple-400 to-purple-600' },
  { label: 'Tasa respuesta', value: '73%', sub: '+5% vs. mes ant.', icon: BarChart2, color: 'from-rose-400 to-pink-500' },
];

const quickAccess = [
  { label: 'Formularios', desc: 'Crea y gestiona tus formularios', icon: FileText, bg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { label: 'Respuestas', desc: 'Consulta y analiza las respuestas', icon: BarChart2, bg: 'bg-pink-50', iconColor: 'text-pink-500' },
  { label: 'Usuarios', desc: 'Administra los usuarios del sistema', icon: Users, bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { label: 'Configuración', desc: 'Ajustes y preferencias de la aplicación', icon: Settings, bg: 'bg-rose-50', iconColor: 'text-rose-500' },
];

const navItems = [
  { label: 'Inicio', icon: LayoutDashboard, active: true },
  { label: 'Formularios', icon: FileText, active: false },
  { label: 'Respuestas', icon: BarChart2, active: false },
  { label: 'Usuarios', icon: Users, active: false },
  { label: 'Configuración', icon: Settings, active: false },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Activo: 'bg-emerald-50 text-emerald-600',
    Pausado: 'bg-amber-50 text-amber-600',
    Cerrado: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
}

export function DashboardView() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 z-20 ${
          sidebarOpen ? 'w-60' : 'w-16'
        } flex-shrink-0`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${sidebarOpen ? '' : 'justify-center'}`}>
          <ImageWithFallback src={logo} alt="InkForm logo" className="h-8 w-8 flex-shrink-0 object-contain" />
          {sidebarOpen && (
            <span className="font-bold text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent select-none">
              InkForm
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                item.active
                  ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-200'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              } ${sidebarOpen ? '' : 'justify-center'}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className={`p-2 border-t border-gray-100 space-y-1`}>
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all ${sidebarOpen ? '' : 'justify-center'}`}
            title={!sidebarOpen ? 'Cerrar sesión' : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-100 px-6 py-3 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* Search bar */}
            <div className="relative hidden md:flex items-center">
              <Search size={15} className="absolute left-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar formularios..."
                className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white" />
            </button>
            {/* User avatar */}
            <button className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                J
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800 leading-none">Juan</p>
                <p className="text-xs text-gray-400 leading-none mt-0.5">Admin</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Greeting + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">¡Hola, Juan! 👋</h1>
              <p className="text-gray-500 text-sm mt-0.5">Bienvenido nuevamente a InkForm</p>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 active:scale-95 shadow-md shadow-pink-200 transition-all self-start sm:self-auto">
              <Plus size={18} />
              Crear formulario
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.color} text-white flex-shrink-0`}>
                  <s.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-gray-900 leading-none">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-none">{s.label}</p>
                  <p className="text-xs text-emerald-500 mt-1 leading-none">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick access */}
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3">Accesos rápidos</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickAccess.map((item) => (
                <button
                  key={item.label}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                    <item.icon size={20} className={item.iconColor} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Recent forms table */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-800">Formularios recientes</h2>
              <button className="flex items-center gap-1 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">
                Ver todos <ChevronRight size={15} />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <span>Formulario</span>
                <span className="hidden sm:block">Respuestas</span>
                <span className="hidden md:block">Estado</span>
                <span />
              </div>

              {/* Table rows */}
              {recentForms.map((form, i) => (
                <div
                  key={form.id}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors ${
                    i < recentForms.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  {/* Title + meta */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                      <FileText size={15} className="text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{form.title}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={11} /> Última edición: {form.lastEdited}
                      </p>
                    </div>
                  </div>

                  {/* Responses */}
                  <span className="hidden sm:block text-sm font-semibold text-gray-700 text-right w-16">
                    {form.responses}
                  </span>

                  {/* Status */}
                  <span className="hidden md:block w-20 text-right">
                    <StatusBadge status={form.status} />
                  </span>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === form.id ? null : form.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === form.id && (
                      <div className="absolute right-0 top-8 z-10 bg-white border border-gray-100 rounded-xl shadow-lg py-1 w-40">
                        {['Editar', 'Ver respuestas', 'Duplicar', 'Eliminar'].map((action) => (
                          <button
                            key={action}
                            onClick={() => setOpenMenu(null)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              action === 'Eliminar' ? 'text-red-500' : 'text-gray-700'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
