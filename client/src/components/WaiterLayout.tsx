import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

const WaiterLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { selectedTable, clearCurrentOrder } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentOrder();
    logout();
    navigate('/');
  };

  const handleBack = () => {
    clearCurrentOrder();
    navigate('/pos');
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      {/* Top bar */}
      <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          {selectedTable && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RestoPOS</h1>
              {selectedTable && (
                <p className="text-xs text-muted-foreground">{selectedTable.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default WaiterLayout;
