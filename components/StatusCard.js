export default function StatusCard({ title, value, subtitle }) {
  return (
    <div className="card span-3">
      <div className="muted">{title}</div>
      <div className="statValue">{value}</div>
      <div className="muted small">{subtitle}</div>
    </div>
  );
}
