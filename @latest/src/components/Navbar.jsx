function Navbar({ userName = 'Patient', onLogout }) {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Department', href: '#departments' },
    { label: 'Book Appointment', href: '#book-appointment' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="navbar-brand" href="#home">
        MediCare
      </a>

      <div className="navbar-links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
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
