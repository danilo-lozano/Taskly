import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaChartBar, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/images/logo.png" alt="Taskly" className="navbar-logo" />
        <span>Taskly</span>
      </div>

      <div className="navbar-menu">
        <Link 
          to="/dashboard" 
          className={`navbar-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <FaTasks /> Dashboard
        </Link>
        <Link 
          to="/analytics" 
          className={`navbar-item ${isActive('/analytics') ? 'active' : ''}`}
        >
          <FaChartBar /> Analytics
        </Link>
        <Link 
          to="/perfil" 
          className={`navbar-item ${isActive('/perfil') ? 'active' : ''}`}
        >
          <FaUser /> Perfil
        </Link>
      </div>

      <div className="navbar-user">
        <span className="user-name">{usuario?.nombre}</span>
        <button onClick={handleLogout} className="btn-logout">
          <FaSignOutAlt /> Salir
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
