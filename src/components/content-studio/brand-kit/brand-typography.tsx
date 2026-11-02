import { BRAND_TYPOGRAPHY_RECOMMENDATIONS } from "@/data/brand-kit";

export function BrandTypography() {
  return <div>
    <p className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm leading-6 text-foreground">These are sample recommendations for readable materials, not approved SFA typography standards. Replace them when an official guide is available.</p>
    <div className="grid gap-4 md:grid-cols-2">
      {BRAND_TYPOGRAPHY_RECOMMENDATIONS.map((item) => <article key={item.id} className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-foreground">{item.label}</h3><span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">Sample</span></div>
        <p className={`mt-4 text-2xl text-foreground ${item.id === "heading" ? "font-semibold tracking-tight" : "font-normal"}`}>{item.sample}</p>
        <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Font family</dt><dd className="mt-1 text-foreground">{item.family}</dd></div>
          <div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Weights</dt><dd className="mt-1 text-foreground">{item.weights}</dd></div>
          <div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Suggested use</dt><dd className="mt-1 leading-6 text-muted-foreground">{item.usage}</dd></div>
        </dl>
      </article>)}
    </div>
  </div>;
}
