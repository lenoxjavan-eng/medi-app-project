import { NavLink } from 'react-router-dom'

function Navbar({ userName = 'Patient', onLogout }) {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Department', path: '/departments' },
    { label: 'Book Appointment', path: '/book-appointment' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink className="navbar-brand" to="/">
        MediCare
      </NavLink>

      <div className="navbar-links">
        {navLinks.map((link) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'navbar-link-active' : '')}
            key={link.path}
            to={link.path}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar-user">
        <span>{userName}</span>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
