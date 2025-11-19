import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import Swal from 'sweetalert2';
import { FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Perfil.css';

const Perfil = () => {
  const { usuario: usuarioContext, actualizarUsuario } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  });
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);

  useEffect(() => {
    document.title = 'Mi Perfil - Taskly';
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      const response = await authService.obtenerPerfil();
      setUsuario(response.data);
      setFormData({
        nombre: response.data.nombre,
        email: response.data.email
      });
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      Swal.fire('Error', 'No se pudo cargar la información del perfil', 'error');
    }
  };

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email
      });
    }
  }, [usuario]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(file);
      setPrevisualizacion(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('email', formData.email);
      
      if (fotoPerfil) {
        formDataToSend.append('foto_perfil', fotoPerfil);
      }

      await authService.actualizarPerfil(formDataToSend);
      
      // Recargar datos del perfil desde el backend
      await cargarPerfil();
      
      actualizarUsuario({
        nombre: formData.nombre,
        email: formData.email
      });

      Swal.fire('¡Actualizado!', 'Perfil actualizado exitosamente', 'success');
      setEditando(false);
      setFotoPerfil(null);
      setPrevisualizacion(null);
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.passwordNueva !== passwordData.confirmarPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (passwordData.passwordNueva.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    try {
      await authService.cambiarPassword(
        passwordData.passwordActual,
        passwordData.passwordNueva
      );

      Swal.fire('¡Actualizado!', 'Contraseña cambiada exitosamente', 'success');
      setPasswordData({
        passwordActual: '',
        passwordNueva: '',
        confirmarPassword: ''
      });
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'No se pudo cambiar la contraseña', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <h1>Mi Perfil</h1>

        <div className="perfil-container">
          {/* Card de Información Personal */}
          <div className="card perfil-card fade-in">
            <h2>Información Personal</h2>
            
            <div className="perfil-foto-section">
              <div className="foto-perfil">
                <img 
                  src={
                    previsualizacion || 
                    (usuario?.foto_perfil && usuario.foto_perfil !== 'default-avatar.png' 
                      ? `http://localhost:3000/uploads/${usuario.foto_perfil}` 
                      : '/images/default-avatar.png')
                  } 
                  alt="Foto de perfil"
                  style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                />
                {editando && (
                  <label className="foto-overlay" htmlFor="foto-input">
                    <FaCamera />
                    <input 
                      type="file" 
                      id="foto-input" 
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="perfil-form">
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="perfil-actions">
                {!editando ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setEditando(true)}
                  >
                    <FaEdit /> Editar Perfil
                  </button>
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary">
                      <FaSave /> Guardar Cambios
                    </button>
                    <button 
                      type="button" 
                      className="btn"
                      onClick={() => {
                        setEditando(false);
                        setFotoPerfil(null);
                        setPrevisualizacion(null);
                        setFormData({
                          nombre: usuario.nombre,
                          email: usuario.email
                        });
                      }}
                    >
                      <FaTimes /> Cancelar
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Card de Cambiar Contraseña */}
          <div className="card perfil-card fade-in">
            <h2>Cambiar Contraseña</h2>
            
            <form onSubmit={handlePasswordChange} className="perfil-form">
              <div className="form-group">
                <label>Contraseña actual</label>
                <input
                  type="password"
                  value={passwordData.passwordActual}
                  onChange={(e) => setPasswordData({...passwordData, passwordActual: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  value={passwordData.passwordNueva}
                  onChange={(e) => setPasswordData({...passwordData, passwordNueva: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmar nueva contraseña</label>
                <input
                  type="password"
                  value={passwordData.confirmarPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmarPassword: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Cambiar Contraseña
              </button>
            </form>
          </div>

          {/* Card de Información de Cuenta */}
          <div className="card perfil-card fade-in">
            <h2>Información de Cuenta</h2>
            
            <div className="info-item">
              <span className="info-label">Fecha de registro:</span>
              <span className="info-value">
                {usuario?.fecha_registro ? new Date(usuario.fecha_registro).toLocaleDateString('es-ES') : 'No disponible'}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Última conexión:</span>
              <span className="info-value">
                {usuario?.ultima_conexion ? new Date(usuario.ultima_conexion).toLocaleString('es-ES') : 'Primera vez'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="main-footer">
        <p>&copy; 2025 Taskly. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Perfil;
