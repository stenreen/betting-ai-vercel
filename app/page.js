import Link from "next/link";
import { getHealth, getHistory, getPicks, getStats } from "../lib/api";
import StatusCard from "../components/StatusCard";
import PicksTable from "../components/PicksTable";
import HistoryTable from "../components/HistoryTable";

export default async function HomePage() {
  let health = null;
  let picks = [];
  let history = [];
  let stats = null;
  let error = null;

  try {
    [health, picks, history, stats] = await Promise.all([
      getHealth(),
      getPicks(),
      getHistory(),
      getStats(),
    ]);
  } catch (err) {
    error = err.message;
  }

  const latestHistory = Array.isArray(history) ? history.slice(0, 20) : [];

  return (
    <main className="page">
      <section className="hero">
        <h1>Betting AI Dashboard</h1>
        <p>Mobilvänlig front för din backend med picks, historik och statistik på ett ställe.</p>
        <div className="nav">
          <Link className="navButton" href="#picks">Dagens spel</Link>
          <Link className="navButton" href="#history">Historik</Link>
          <Link className="navButton" href="#stats">Statistik</Link>
          <a className="navButton" href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/docs`} target="_blank">API docs</a>
        </div>
      </section>

      {error ? (
        <div className="card">
          <h2>Fel vid hämtning</h2>
          <p className="muted">{error}</p>
          <p className="muted">Kontrollera att NEXT_PUBLIC_API_BASE_URL pekar på din Render-backend.</p>
        </div>
      ) : (
        <>
          <section className="grid">
            <StatusCard title="Aktiva picks" value={health?.pick_rows ?? 0} subtitle="Rader i picks-tabellen" />
            <StatusCard title="Odds snapshots" value={health?.odds_rows ?? 0} subtitle="Sparade odds" />
            <StatusCard title="Historik" value={health?.history_rows ?? 0} subtitle="Historiska picks" />
            <StatusCard title="Resultat" value={health?.result_rows ?? 0} subtitle="Matchade slutresultat" />
          </section>

          <section className="grid" id="stats" style={{ marginTop: 16 }}>
            <div className="card span-6">
              <div className="sectionHeader">
                <h2>Statistik</h2>
                <span className="timestamp">Live från backend</span>
              </div>
              {!stats ? (
                <div className="empty">Ingen statistik ännu.</div>
              ) : (
                <div className="grid">
                  <StatusCard title="Plays" value={stats.plays ?? 0} subtitle="Avgjorda spel" />
                  <StatusCard title="Wins" value={stats.wins ?? 0} subtitle="Vunna spel" />
                  <StatusCard title="Losses" value={stats.losses ?? 0} subtitle="Förlorade spel" />
                  <StatusCard title="ROI %" value={stats.roi_percent ?? 0} subtitle="Avkastning" />
                </div>
              )}
            </div>

            <div className="card span-6">
              <div className="sectionHeader">
                <h2>Snabbåtgärder</h2>
              </div>
              <div className="actions">
                <a className="button" href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/generate-picks`} target="_blank">Kör generate-picks</a>
                <a className="button buttonSecondary" href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/fetch-results?force=true`} target="_blank">Hämta resultat</a>
                <a className="button buttonMuted" href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`} target="_blank">Se backend-status</a>
              </div>
            </div>
          </section>

          <section className="card" id="picks" style={{ marginTop: 16 }}>
            <div className="sectionHeader">
              <h2>Dagens spel</h2>
              <span className="timestamp">{Array.isArray(picks) ? picks.length : 0} rader</span>
            </div>
            <PicksTable rows={picks} />
          </section>

          <section className="card" id="history" style={{ marginTop: 16 }}>
            <div className="sectionHeader">
              <h2>Historik</h2>
              <span className="timestamp">Senaste 20 rader</span>
            </div>
            <HistoryTable rows={latestHistory} />
          </section>
        </>
      )}
    </main>
  );
}
