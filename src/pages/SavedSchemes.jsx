import { Link } from 'react-router-dom'
import SchemeCard from '../components/SchemeCard'
import { schemes } from '../data/schemes'
import { t } from '../i18n/translations'
export default function SavedSchemes({ savedIds, onToggleSave, language }) { const saved = schemes.filter((scheme) => savedIds.includes(scheme.id)); return <main className="inner-page page-width"><div className="page-intro"><p className="section-kicker">YOUR SHORTLIST</p><h1>{t(language, 'saved')}</h1><p>Keep useful schemes close while you compare your options.</p></div>{saved.length ? <div className="scheme-grid">{saved.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} saved onToggleSave={onToggleSave} />)}</div> : <div className="empty-panel"><div className="empty-mark">♡</div><h2>{t(language, 'noSaved')}</h2><p>{t(language, 'noSavedCopy')}</p><Link className="button button-primary" to="/explore">Explore schemes</Link></div>}</main> }
