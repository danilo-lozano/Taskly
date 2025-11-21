import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { validarEmail, validarPassword } from '../utils/helpers';
import './Login.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const { registrar, estaAutenticado, cargando: cargandoAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Registro - Taskly';
    
    // Solo redirigir si ya terminó de cargar y está autenticado
    if (!cargandoAuth && estaAutenticado) {
      navigate('/dashboard', { replace: true });
    }
  }, [estaAutenticado, cargandoAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre requerido',
        text: 'Por favor ingresa tu nombre completo'
      });
      return;
    }

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

    if (password !== confirmarPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas deben ser iguales'
      });
      return;
    }

    setCargando(true);

    try {
      const response = await registrar(nombre, email, password);
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puedes iniciar sesión',
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/login');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error al registrar usuario'
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
      <div className="login-section" style={{gridColumn: '1 / -1'}}>
        <div className="login-card fade-in">
          <div className="login-header">
            <img src="/images/logo.png" alt="Taskly" className="login-logo" style={{width: '100px', height: '100px', display: 'block', margin: '0 auto 1rem'}} />
            <h2>Crear Cuenta</h2>
            <p className="text-muted">Únete a Taskly y organiza tus tareas</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmarPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmarPassword"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
          <div className="login-footer">
            <p>
              ¿Ya tienes cuenta? <Link to="/login" className="link-primary">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="auth-footer">
        <p>&copy; 2025 Taskly. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Registro;
