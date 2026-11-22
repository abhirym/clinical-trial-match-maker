export interface CriteriaBlock {
  heading: string | null;
  items: { text: string; level: number }[];
  paragraphs: string[];
}

/**
 * Splits published eligibility text into scannable sections WITHOUT rewriting it.
 * Every non-empty source line is preserved verbatim (only bullet markers are removed).
 */
export function parseEligibility(raw: string): CriteriaBlock[] {
  const blocks: CriteriaBlock[] = [];
  let cur: CriteriaBlock = { heading: null, items: [], paragraphs: [] };
  const push = () => {
    if (cur.heading || cur.items.length || cur.paragraphs.length) blocks.push(cur);
  };
  for (const line of raw.replace(/\\>/g, ">").replace(/\\</g, "<").split(/\r?\n/)) {
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const t = line.trim();
    const bullet = t.match(/^(?:[*\-•]|\d+[.)])\s+(.*)$/);
    if (!bullet && /^(inclusion|exclusion)( criteria)?\s*:?$/i.test(t)) {
      push();
      cur = { heading: t.replace(/:$/, ""), items: [], paragraphs: [] };
    } else if (bullet) {
      cur.items.push({ text: /^\d/.test(t) ? t : (bullet[1] ?? t), level: indent >= 2 ? 1 : 0 });
    } else {
      cur.paragraphs.push(t);
    }
  }
  push();
  return blocks;
}
