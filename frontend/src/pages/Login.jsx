import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { validarEmail, validarPassword } from '../utils/helpers';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login, estaAutenticado, cargando: cargandoAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Iniciar Sesión - Taskly';
    
    // Solo redirigir si ya terminó de cargar y está autenticado
    if (!cargandoAuth && estaAutenticado) {
      navigate('/dashboard', { replace: true });
    }
  }, [estaAutenticado, cargandoAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!validarEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor ingresa un email válido'
      });
      return;
    }

    if (!validarPassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    setCargando(true);

    try {
      const response = await login(email, password);
      
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Inicio de sesión exitoso',
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: response?.message || 'Credenciales inválidas. Verifica tu email y contraseña.'
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.response?.data?.message || 'Usuario o contraseña incorrectos. Por favor, intenta de nuevo.'
      });
    } finally {
      setCargando(false);
    }
  };

  // Mostrar pantalla de carga mientras verifica la sesión
  if (cargandoAuth) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #6C63FF 0%, #95E1D3 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="login-hero">
        <div className="hero-content">
          <img src="/images/logo.png" alt="Taskly" className="hero-logo" style={{width: '120px', height: '120px', display: 'block', margin: '0 auto 1.5rem'}} />
          <h1 className="hero-title">Taskly</h1>
          <p className="hero-subtitle">Tu aliado perfecto para la productividad</p>
          
          <div className="hero-features">
            <div className="feature-item fade-in">
              <div className="feature-icon">📋</div>
              <h3>Organiza</h3>
              <p>Gestiona todas tus tareas en un solo lugar.</p>
            </div>
            <div className="feature-item fade-in" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon">🎯</div>
              <h3>Prioriza</h3>
              <p>Define lo importante y alcanza tus metas.</p>
            </div>
            <div className="feature-item fade-in" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon">📊</div>
              <h3>Analiza</h3>
              <p>Visualiza tu progreso con estadísticas detalladas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-section">
        <div className="login-card fade-in">
          <div className="login-header">
            <h2>Iniciar Sesión</h2>
            <p className="text-muted">Bienvenido de nuevo.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={cargando}
          >
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

          <div className="login-footer">
            <p>
              ¿No tienes cuenta? <Link to="/registro" className="link-primary">Crear cuenta gratis</Link>
            </p>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <p className="social-title">Síguenos en:</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon x-twitter" title="X (Twitter)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="auth-footer">
        <p>&copy; 2025 Taskly. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
