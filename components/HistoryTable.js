import DecisionPill from "./DecisionPill";

export default function HistoryTable({ rows }) {
  if (!rows?.length) {
    return <div className="empty">Ingen historik ännu.</div>;
  }

  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Match</th>
            <th>Liga</th>
            <th>Spel</th>
            <th>Odds</th>
            <th>Beslut</th>
            <th>Resultat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const resultText =
              row.home_score != null && row.away_score != null
                ? `${row.home_score}-${row.away_score}`
                : "-";

            return (
              <tr key={`${row.event_id}-${row.selection}-${index}`}>
                <td className="matchCell">{row.match}</td>
                <td>{row.league}</td>
                <td>{row.selection}</td>
                <td>{row.odds}</td>
                <td><DecisionPill value={row.decision} /></td>
                <td>{resultText}</td>
                <td>{row.status || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
