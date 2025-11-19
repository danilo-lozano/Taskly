import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { analyticsService } from '../services/analyticsService';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FaTasks, FaCheckCircle, FaClock, FaChartLine } from 'react-icons/fa';
import { colorPrioridad, colorEstado } from '../utils/helpers';
import './Analytics.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [estadisticas, setEstadisticas] = useState({});
  const [tareasPorCategoria, setTareasPorCategoria] = useState([]);
  const [tareasPorEstado, setTareasPorEstado] = useState([]);
  const [tareasPorPrioridad, setTareasPorPrioridad] = useState([]);
  const [productividad, setProductividad] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    document.title = 'Analytics - Taskly';
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [stats, categoria, estado, prioridad, prod] = await Promise.all([
        analyticsService.obtenerEstadisticas(),
        analyticsService.obtenerTareasPorCategoria(),
        analyticsService.obtenerTareasPorEstado(),
        analyticsService.obtenerTareasPorPrioridad(),
        analyticsService.obtenerProductividadSemanal()
      ]);

      setEstadisticas(stats.data);
      setTareasPorCategoria(categoria.data);
      setTareasPorEstado(estado.data);
      setTareasPorPrioridad(prioridad.data);
      setProductividad(prod.data);
    } catch (error) {
      console.error('Error al cargar analytics:', error);
    } finally {
      setCargando(false);
    }
  };

  // Datos para gráfico de categorías
  const datosCategoria = {
    labels: tareasPorCategoria.map(c => c.categoria),
    datasets: [{
      label: 'Tareas por Categoría',
      data: tareasPorCategoria.map(c => c.cantidad),
      backgroundColor: tareasPorCategoria.map(c => c.color),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  // Función para capitalizar texto
  const capitalizarTexto = (texto) => {
    return texto.split('_').map(palabra => 
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    ).join(' ');
  };

  // Datos para gráfico de estados
  const datosEstado = {
    labels: tareasPorEstado.map(e => capitalizarTexto(e.estado)),
    datasets: [{
      label: 'Tareas por Estado',
      data: tareasPorEstado.map(e => e.cantidad),
      backgroundColor: tareasPorEstado.map(e => colorEstado(e.estado)),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  // Datos para gráfico de prioridad
  const datosPrioridad = {
    labels: tareasPorPrioridad.map(p => capitalizarTexto(p.prioridad)),
    datasets: [{
      label: 'Tareas',
      data: tareasPorPrioridad.map(p => p.cantidad),
      backgroundColor: tareasPorPrioridad.map(p => colorPrioridad(p.prioridad))
    }]
  };

  // Datos para productividad
  const datosProductividad = {
    labels: productividad.map(p => new Date(p.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Tareas Completadas',
      data: productividad.map(p => p.tareas_completadas),
      borderColor: '#6C63FF',
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      tension: 0.4
    }]
  };

  const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  if (cargando) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            Cargando estadísticas...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <h1>Analytics & Estadísticas</h1>

        {/* Resumen de Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#6C63FF'}}>
              <FaTasks />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.total_tareas || 0}</h3>
              <p>Total Tareas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#2ECC71'}}>
              <FaCheckCircle />
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
              <h3>{estadisticas.en_progreso || 0}</h3>
              <p>En Progreso</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: '#FF6B6B'}}>
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>
                {estadisticas.total_tareas > 0 
                  ? Math.round((estadisticas.completadas / estadisticas.total_tareas) * 100) 
                  : 0}%
              </h3>
              <p>Tasa de Completado</p>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="graficos-grid">
          {/* Gráfico de Categorías */}
          <div className="card grafico-card fade-in">
            <h3>Tareas por Categoría</h3>
            <div className="grafico-container">
              {tareasPorCategoria.length > 0 ? (
                <Pie data={datosCategoria} options={opcionesGrafico} />
              ) : (
                <p className="text-center text-muted">No hay datos disponibles</p>
              )}
            </div>
          </div>

          {/* Gráfico de Estados */}
          <div className="card grafico-card fade-in">
            <h3>Tareas por Estado</h3>
            <div className="grafico-container">
              {tareasPorEstado.length > 0 ? (
                <Pie data={datosEstado} options={opcionesGrafico} />
              ) : (
                <p className="text-center text-muted">No hay datos disponibles</p>
              )}
            </div>
          </div>

          {/* Gráfico de Prioridad */}
          <div className="card grafico-card fade-in">
            <h3>Tareas por Prioridad</h3>
            <div className="grafico-container">
              {tareasPorPrioridad.length > 0 ? (
                <Bar data={datosPrioridad} options={opcionesGrafico} />
              ) : (
                <p className="text-center text-muted">No hay datos disponibles</p>
              )}
            </div>
          </div>

          {/* Gráfico de Productividad */}
          <div className="card grafico-card grafico-card-wide fade-in">
            <h3>Productividad Semanal</h3>
            <div className="grafico-container">
              {productividad.length > 0 ? (
                <Line data={datosProductividad} options={opcionesGrafico} />
              ) : (
                <p className="text-center text-muted">No hay datos de productividad</p>
              )}
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="card fade-in" style={{marginTop: '2rem'}}>
          <h3>Resumen General</h3>
          <div className="resumen-grid">
            <div className="resumen-item">
              <span className="resumen-label">Tareas Pendientes:</span>
              <span className="resumen-valor">{estadisticas.pendientes || 0}</span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Tareas Vencidas:</span>
              <span className="resumen-valor" style={{color: '#FF6B6B'}}>
                {estadisticas.vencidas || 0}
              </span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Alta Prioridad:</span>
              <span className="resumen-valor" style={{color: '#FFA500'}}>
                {estadisticas.alta_prioridad || 0}
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

export default Analytics;
