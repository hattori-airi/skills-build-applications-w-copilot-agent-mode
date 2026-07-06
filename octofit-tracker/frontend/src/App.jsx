import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="title">OctoFit Tracker</h1>
          <p className="subtitle">Modern multi-tier fitness dashboard</p>
        </div>
        <nav className="nav-tabs" aria-label="API sections">
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/teams" className="nav-link">
            Teams
          </NavLink>
          <NavLink to="/activities" className="nav-link">
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className="nav-link">
            Leaderboard
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
        </nav>
      </header>

      <section className="env-note" role="note">
        <p>
          <strong>VITE_CODESPACE_NAME</strong> は必須設定です（例: <code>.env.local</code> に定義）。未設定時は安全に <code>http://localhost:8000/api</code> を使います。
        </p>
        <p className="env-current">
          現在の VITE_CODESPACE_NAME: {codespaceName ? codespaceName : '未設定'}
        </p>
      </section>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
