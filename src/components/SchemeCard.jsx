import { Bookmark, CheckCircle2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SchemeCard({ scheme, saved, onToggleSave, match }) {
  return <article className="scheme-card"><div className="scheme-card-top"><span className="category-tag">{scheme.category}</span><button className={saved ? 'save-button saved' : 'save-button'} type="button" onClick={() => onToggleSave(scheme.id)} aria-label={saved ? `Remove ${scheme.name} from saved schemes` : `Save ${scheme.name}`}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button></div><h3>{scheme.name}</h3><p className="scheme-dept">{scheme.department}</p><p className="scheme-description">{scheme.description}</p><div className="scheme-benefit"><span>Potential benefit</span><strong>{scheme.benefit}</strong></div>{match && <p className="match-preview">{match.score}% estimated match · {match.reasons[0] || 'Some details still need checking.'}</p>}<div className="scheme-card-footer"><span className="demo-badge"><CheckCircle2 size={14} /> DEMO DATA</span><Link className="card-link" to={`/scheme/${scheme.id}`}>View details <ExternalLink size={13} /></Link></div></article>
}
