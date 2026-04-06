import DecisionPill from "./DecisionPill";

export default function PicksTable({ rows }) {
  if (!rows?.length) return <div className="empty">Inga spelförslag ännu.</div>;

  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>Match</th>
            <th>Liga</th>
            <th>Spel</th>
            <th>Odds</th>
            <th>Edge</th>
            <th>Score</th>
            <th>Beslut</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.event_id}-${row.selection}-${index}`}>
              <td className="matchCell">{row.match}</td>
              <td>{row.league}</td>
              <td>{row.selection}</td>
              <td>{row.odds}</td>
              <td>{row.edge}</td>
              <td>{row.score}</td>
              <td><DecisionPill value={row.decision} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
