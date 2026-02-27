import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Lock } from 'lucide-react';

export function Header() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (clickCount === 3) {
      navigate('/admin/login');
      setClickCount(0);
    }
    
    // Reset count after 2 seconds of inactivity
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount, navigate]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="cursor-pointer select-none relative group"
            onClick={handleLogoClick}
          >
            <img 
              src="https://i.imgur.com/yxjbTha.png" 
              alt="Agiliza Marketing Digital" 
              className="h-12 w-auto object-contain rounded-full"
            />
            {/* Hidden hint for admin */}
            <span className="absolute -bottom-4 left-0 text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Admin Access
            </span>
          </div>

          {/* Desktop Nav */}
          {!isAdmin && (
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-[#7B3FA0] font-medium transition-colors">Serviços</a>
              <a href="#benefits" className="text-gray-600 hover:text-[#7B3FA0] font-medium transition-colors">Benefícios</a>
              <a href="#contact" className="px-6 py-2.5 bg-[#7B3FA0] text-white rounded-full font-semibold hover:bg-[#5e2d7d] transition-colors shadow-lg shadow-purple-500/30">
                Orçamento Grátis
              </a>
            </nav>
          )}

          {isAdmin && (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Lock className="w-4 h-4" />
              Área Administrativa
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isAdmin && (
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !isAdmin && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Serviços</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Portfólio</a>
            <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Benefícios</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 bg-[#7B3FA0] text-white rounded-lg font-semibold text-center">
              Orçamento Grátis
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
