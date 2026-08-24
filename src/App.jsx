import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Compass,
  Landmark,
  Sparkles,
  Users,
  Wheat,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import SchemeDetails from "./pages/SchemeDetails";
import FindSchemes from "./pages/FindSchemes";
import Results from "./pages/Results";
import Assistant from "./pages/Assistant";
import SavedSchemes from "./pages/SavedSchemes";
import Auth from "./pages/Auth";
import { t } from "./i18n/translations";
import "./App.css";

const categories = [
  {
    icon: Users,
    label: "Families",
    count: "24 schemes",
    copy: "Support for everyday needs",
  },
  {
    icon: Wheat,
    label: "Farmers",
    count: "18 schemes",
    copy: "Tools for rural livelihoods",
  },
  {
    icon: BriefcaseBusiness,
    label: "Employment",
    count: "15 schemes",
    copy: "Work and skill opportunities",
  },
  {
    icon: Sparkles,
    label: "Students",
    count: "12 schemes",
    copy: "Education made more accessible",
  },
];

function Home({ language }) {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-grid" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> Karnataka Government Schemes
            </div>
            <h1>
              {language === "en" ? (
                <>
                  Benefits should be <em>easier</em> to find.
                </>
              ) : (
                t(language, "home")
              )}
            </h1>
            <p className="hero-lede">{t(language, "homeCopy")}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/find-schemes">
                Find schemes for me <ArrowRight size={17} />
              </Link>
              <Link className="button button-quiet" to="/explore">
                Explore all schemes
              </Link>
            </div>
            <div className="trust-row">
              <span>
                <Check size={14} /> Verified information
              </span>
              <span>
                <Check size={14} /> Kannada + English
              </span>
            </div>
          </div>
          <div className="discovery-card" aria-label="Scheme discovery preview">
            <div className="discovery-topline">
              <span>YOUR DISCOVERY MAP</span>
              <span className="live-label">
                <i /> LIVE PREVIEW
              </span>
            </div>
            <div className="discovery-title">
              Find what fits
              <br />
              <span>your life.</span>
            </div>
            <div className="orbit orbit-one">
              <div className="orbit-pill orbit-student">
                <Sparkles size={15} /> Students
              </div>
            </div>
            <div className="orbit orbit-two">
              <div className="orbit-pill orbit-farmer">
                <Wheat size={15} /> Farmers
              </div>
            </div>
            <div className="center-orbit">
              <div className="center-icon">
                <Compass size={25} />
              </div>
              <span>Start here</span>
            </div>
            <div className="discovery-foot">
              <span>10 categories</span>
              <span>69+ demo schemes</span>
            </div>
          </div>
        </div>
      </section>
      <section className="category-section page-width">
        <div className="section-heading">
          <div>
            <p className="section-kicker">START EXPLORING</p>
            <h2>Something for every chapter.</h2>
          </div>
          <Link to="/explore" className="text-link">
            View all categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map(({ icon: Icon, label, count, copy }) => (
            <Link className="category-card" to="/explore" key={label}>
              <div className="category-icon">
                <Icon size={21} />
              </div>
              <div>
                <h3>{label}</h3>
                <p>{copy}</p>
              </div>
              <span className="category-count">{count}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="steps-band">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="section-kicker">HOW IT WORKS</p>
              <h2>From question to clarity.</h2>
            </div>
            <p className="section-note">
              A simpler way to navigate public support.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <b>01</b>
              <div>
                <h3>Tell us about yourself</h3>
                <p>A few simple questions about your everyday life.</p>
              </div>
            </div>
            <div className="step">
              <b>02</b>
              <div>
                <h3>We find possible matches</h3>
                <p>Our transparent engine checks the details you share.</p>
              </div>
            </div>
            <div className="step">
              <b>03</b>
              <div>
                <h3>Understand your next step</h3>
                <p>Get a clear starting point and official links.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-section page-width">
        <div className="popular-callout">
          <div className="callout-icon">
            <Landmark size={23} />
          </div>
          <div>
            <p className="section-kicker">BUILT FOR KARNATAKA</p>
            <h2>
              Less searching.
              <br />
              <em>More finding.</em>
            </h2>
            <p>
              Explore a growing library of schemes in one calm, accessible
              place.
            </p>
          </div>
          <Link to="/explore" className="button button-dark">
            Browse schemes <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <div className="demo-note page-width">
        <span>DEMO EXPERIENCE</span> Scheme information shown here is mock data
        while we build our verified catalogue.
      </div>
    </main>
  );
}

function Placeholder({ title }) {
  return (
    <main className="placeholder page-width">
      <p className="section-kicker">NAMMA YOJANE</p>
      <h1>{title}</h1>
      <p>This view is ready for the next build step.</p>
      <Link className="button button-primary" to="/">
        Back home <ArrowRight size={17} />
      </Link>
    </main>
  );
}

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("namma-language") || "en",
  );
  const [savedIds, setSavedIds] = useState(() =>
    JSON.parse(localStorage.getItem("namma-saved") || "[]"),
  );
  const toggleSave = (id) =>
    setSavedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      localStorage.setItem("namma-saved", JSON.stringify(next));
      return next;
    });
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          language={language}
          onLanguageChange={() => {
            const next = language === "en" ? "kn" : "en";
            setLanguage(next);
            localStorage.setItem("namma-language", next);
          }}
        />
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route
            path="/explore"
            element={
              <Explore
                savedIds={savedIds}
                onToggleSave={toggleSave}
                language={language}
              />
            }
          />
          <Route
            path="/scheme/:id"
            element={
              <SchemeDetails savedIds={savedIds} onToggleSave={toggleSave} />
            }
          />
          <Route
            path="/find-schemes"
            element={<FindSchemes language={language} />}
          />
          <Route
            path="/results"
            element={<Results savedIds={savedIds} onToggleSave={toggleSave} />}
          />
          <Route
            path="/assistant"
            element={<Assistant language={language} />}
          />
          <Route
            path="/saved"
            element={
              <SavedSchemes
                savedIds={savedIds}
                onToggleSave={toggleSave}
                language={language}
              />
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="*" element={<Placeholder title="Page coming soon" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
