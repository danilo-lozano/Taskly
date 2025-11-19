import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { tareaService } from '../services/tareaService';
import { categoriaService } from '../services/categoriaService';
import { analyticsService } from '../services/analyticsService';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaClock } from 'react-icons/fa';
import { formatearFechaCorta, colorPrioridad, colorEstado, getTextColor } from '../utils/helpers';
import './Dashboard.css';

const Dashboard = () => {
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [filtro, setFiltro] = useState('todas');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_limite: '',
    prioridad: 'media',
    categoria_id: ''
  });

  useEffect(() => {
    document.title = 'Dashboard - Taskly';
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [tareasRes, categoriasRes, statsRes] = await Promise.all([
        tareaService.obtenerTodas(),
        categoriaService.obtenerTodas(),
        analyticsService.obtenerEstadisticas()
      ]);

      setTareas(tareasRes.data);
      setCategorias(categoriasRes.data);
      setEstadisticas(statsRes.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (tareaEditar) {
        await tareaService.actualizar(tareaEditar.id, formData);
        Swal.fire('¡Actualizado!', 'Tarea actualizada exitosamente', 'success');
      } else {
        await tareaService.crear(formData);
        Swal.fire('¡Creado!', 'Tarea creada exitosamente', 'success');
      }
      
      setMostrarModal(false);
      setTareaEditar(null);
      resetForm();
      cargarDatos();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la tarea', 'error');
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await tareaService.cambiarEstado(id, nuevoEstado);
      cargarDatos();
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
    }
  };

  const eliminarTarea = async (id) => {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await tareaService.eliminar(id);
        Swal.fire('¡Eliminado!', 'Tarea eliminada exitosamente', 'success');
        cargarDatos();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
      }
    }
  };

  const abrirModalEditar = (tarea) => {
    setTareaEditar(tarea);
    setFormData({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion || '',
      fecha_limite: tarea.fecha_limite || '',
      prioridad: tarea.prioridad,
      estado: tarea.estado,
      categoria_id: tarea.categoria_id || ''
    });
    setMostrarModal(true);
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha_limite: '',
      prioridad: 'media',
      categoria_id: ''
    });
  };

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'todas') return true;
    return tarea.estado === filtro;
  });

  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setTareaEditar(null);
              setMostrarModal(true);
            }}
          >
            <FaPlus /> Nueva Tarea
          </button>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#6C63FF'}}>
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.total_tareas || 0}</h3>
              <p>Total Tareas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#2ECC71'}}>
              <FaCheck />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.completadas || 0}</h3>
              <p>Completadas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#FFA500'}}>
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.pendientes || 0}</h3>
              <p>Pendientes</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#FF6B6B'}}>
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.vencidas || 0}</h3>
              <p>Vencidas</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros">
          <button 
            className={`filtro-btn ${filtro === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>
          <button 
            className={`filtro-btn ${filtro === 'pendiente' ? 'active' : ''}`}
            onClick={() => setFiltro('pendiente')}
          >
            Pendientes
          </button>
          <button 
            className={`filtro-btn ${filtro === 'en_progreso' ? 'active' : ''}`}
            onClick={() => setFiltro('en_progreso')}
          >
            En Progreso
          </button>
          <button 
            className={`filtro-btn ${filtro === 'completada' ? 'active' : ''}`}
            onClick={() => setFiltro('completada')}
          >
            Completadas
          </button>
        </div>

        {/* Lista de Tareas */}
        <div className="tareas-lista">
          {tareasFiltradas.length === 0 ? (
            <div className="empty-state">
              <p>No hay tareas {filtro !== 'todas' ? filtro + 's' : ''}</p>
            </div>
          ) : (
            tareasFiltradas.map(tarea => (
              <div key={tarea.id} className="tarea-card fade-in">
                <div className="tarea-header">
                  <div>
                    <h3>{tarea.titulo}</h3>
                    {tarea.descripcion && <p className="text-muted">{tarea.descripcion}</p>}
                  </div>
                  <div className="tarea-acciones">
                    <button 
                      className="btn-icon"
                      onClick={() => abrirModalEditar(tarea)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-danger"
                      onClick={() => eliminarTarea(tarea.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="tarea-info">
                  <span 
                    className="badge"
                    style={{
                      backgroundColor: colorPrioridad(tarea.prioridad), 
                      color: getTextColor(colorPrioridad(tarea.prioridad))
                    }}
                  >
                    {tarea.prioridad}
                  </span>
                  <span 
                    className="badge"
                    style={{
                      backgroundColor: colorEstado(tarea.estado), 
                      color: getTextColor(colorEstado(tarea.estado))
                    }}
                  >
                    {tarea.estado.replace('_', ' ')}
                  </span>
                  {tarea.fecha_limite && (
                    <span className="text-muted">
                      📅 {formatearFechaCorta(tarea.fecha_limite)}
                    </span>
                  )}
                  {tarea.categoria_nombre && (
                    <span 
                      className="badge"
                      style={{
                        backgroundColor: tarea.categoria_color, 
                        color: getTextColor(tarea.categoria_color)
                      }}
                    >
                      {tarea.categoria_nombre}
                    </span>
                  )}
                </div>

                <div className="tarea-estados">
                  <button 
                    className="btn-estado"
                    onClick={() => cambiarEstado(tarea.id, 'pendiente')}
                    disabled={tarea.estado === 'pendiente'}
                  >
                    Pendiente
                  </button>
                  <button 
                    className="btn-estado"
                    onClick={() => cambiarEstado(tarea.id, 'en_progreso')}
                    disabled={tarea.estado === 'en_progreso'}
                  >
                    En Progreso
                  </button>
                  <button 
                    className="btn-estado"
                    onClick={() => cambiarEstado(tarea.id, 'completada')}
                    disabled={tarea.estado === 'completada'}
                  >
                    Completada
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Crear/Editar */}
        {mostrarModal && (
          <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{tareaEditar ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                <button onClick={() => setMostrarModal(false)}>×</button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Título *</label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha límite</label>
                    <input
                      type="date"
                      value={formData.fecha_limite}
                      onChange={(e) => setFormData({...formData, fecha_limite: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Prioridad</label>
                    <select
                      value={formData.prioridad}
                      onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                    >
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={formData.categoria_id}
                    onChange={(e) => setFormData({...formData, categoria_id: e.target.value})}
                  >
                    <option value="">Sin categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn" onClick={() => setMostrarModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {tareaEditar ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <footer className="main-footer">
        <p>&copy; 2025 Taskly. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
