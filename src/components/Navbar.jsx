import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  ['Explore schemes', '/explore'],
  ['Find my schemes', '/find-schemes'],
  ['AI assistant', '/assistant'],
  ['Saved schemes', '/saved'],
]

export default function Navbar({ language = 'en', onLanguageChange }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="nav-inner page-width">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Namma Yojane home">
          <span className="brand-mark">ನ</span><span><strong>NAMMA</strong><small>YOJANE</small></span>
        </Link>
        <nav className={open ? 'desktop-nav is-open' : 'desktop-nav'} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          {links.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions"><button className="language-button" type="button" onClick={onLanguageChange}>{language === 'en' ? 'ಕನ್ನಡ' : 'English'} <span>/</span> {language === 'en' ? 'English' : 'ಕನ್ನಡ'}</button><Link className="login-link" to="/login">Log in <ArrowRight size={15} /></Link></div>
        <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  )
}
