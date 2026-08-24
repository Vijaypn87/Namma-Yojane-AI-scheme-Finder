import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner page-width"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">ನ</span><span><strong>NAMMA</strong><small>YOJANE</small></span></Link><p>Making public support easier<br />to discover, for everyone.</p></div><div className="footer-links"><div><span>Explore</span><Link to="/explore">All schemes</Link><Link to="/find-schemes">Find my schemes</Link></div><div><span>Connect</span><a href="mailto:hello@namma-yojane.demo">Contact us <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div></div></div><div className="footer-bottom page-width"><span>© 2026 Namma Yojane</span><span>Built for Karnataka <span className="footer-dot">●</span></span></div></footer>
}
