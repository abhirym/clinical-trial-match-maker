// Abstract, static visual of connected research sites.
const nodes = [
  [60, 70, 6], [170, 40, 9], [280, 90, 5], [120, 170, 11], [240, 200, 7], [340, 160, 9], [60, 260, 7], [190, 290, 6], [310, 290, 10], [380, 60, 5],
] as const;
const edges: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [2, 5], [4, 5], [3, 6], [6, 7], [4, 7], [7, 8], [5, 8], [2, 9], [5, 9], [4, 8]];

export function ResearchNetwork() {
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" role="img" aria-label="Abstract illustration of connected research sites">
      <rect x="0" y="0" width="420" height="340" rx="24" className="fill-card stroke-border" />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]} className="stroke-teal" strokeWidth="1.2" opacity="0.35" />
      ))}
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r + 7} className="fill-teal-soft" />
          <circle cx={x} cy={y} r={r} className={i % 3 === 0 ? "fill-navy" : "fill-teal"} />
        </g>
      ))}
    </svg>
  );
}
