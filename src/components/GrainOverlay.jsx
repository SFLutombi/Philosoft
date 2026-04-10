export default function GrainOverlay({ variant = "film" }) {
  if (variant === "grain") {
    return <div className="fixed inset-0 grain-overlay z-50" />;
  }
  return <div className="film-grain" />;
}
