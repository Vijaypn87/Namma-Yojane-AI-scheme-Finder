import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SchemeCard from '../components/SchemeCard'
import { benefitOptions, categoryOptions, departmentOptions, schemes } from '../data/schemes'
import { t } from '../i18n/translations'

export default function Explore({ savedIds, onToggleSave, language }) {
  const [searchParams] = useSearchParams()
  const linkedCategory = searchParams.get('category')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categoryOptions.includes(linkedCategory) ? linkedCategory : 'All categories')
  const [department, setDepartment] = useState('All departments')
  const [benefit, setBenefit] = useState('All benefits')
  const [sort, setSort] = useState('Featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const list = schemes.filter((scheme) =>
      [scheme.name, scheme.department, scheme.category, scheme.description].join(' ').toLowerCase().includes(query.toLowerCase()) &&
      (category === 'All categories' || scheme.category === category) &&
      (department === 'All departments' || scheme.department === department) &&
      (benefit === 'All benefits' || scheme.benefitType === benefit))
    return sort === 'A-Z' ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list
  }, [query, category, department, benefit, sort])

  const select = (label, value, setter, options) => (
    <select value={value} onChange={(event) => setter(event.target.value)} aria-label={label}>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  )

  return (
    <main className="inner-page page-width">
      <div className="page-intro">
        <p className="section-kicker">DISCOVER AT YOUR PACE</p>
        <h1>{t(language, 'explore')}</h1>
        <p>{t(language, 'exploreSubtitle')}</p>
      </div>
      <div className="explore-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search schemes, departments or benefits" aria-label="Search schemes" />
        </label>
        <button type="button" className="filter-mobile" aria-expanded={filtersOpen} aria-controls="scheme-filters" onClick={() => setFiltersOpen(!filtersOpen)}>
          <SlidersHorizontal size={16} /> {filtersOpen ? 'Hide filters' : 'Filters'}
        </button>
        <div id="scheme-filters" className={filtersOpen ? 'select-filters is-open' : 'select-filters'}>
          {select('Filter by category', category, setCategory, categoryOptions)}
          {select('Filter by department', department, setDepartment, departmentOptions)}
          {select('Filter by benefit type', benefit, setBenefit, benefitOptions)}
          {select('Sort schemes', sort, setSort, ['Featured', 'A-Z'])}
        </div>
      </div>
      <div className="results-meta">
        <span><strong>{filtered.length}</strong> demo schemes found</span>
        <span>Information is for discovery only</span>
      </div>
      <div className="scheme-grid">
        {filtered.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} saved={savedIds.includes(scheme.id)} onToggleSave={onToggleSave} />)}
      </div>
      {!filtered.length && <div className="empty-panel"><h2>No schemes found</h2><p>Try a different category or search term.</p></div>}
    </main>
  )
}
