export default function DecisionPill({ value }) {
  if (value === "🔥 SPELA") return <span className="pill pillPlay">{value}</span>;
  if (value === "⚠️ BEVAKA") return <span className="pill pillWatch">{value}</span>;
  return <span className="pill pillPass">{value || "Ingen status"}</span>;
}
