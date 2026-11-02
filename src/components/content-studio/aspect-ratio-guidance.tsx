import { ASPECT_RATIO_GUIDES } from "@/data/social-media-preview";

const shapeClasses = ["size-9", "h-11 w-9", "h-12 w-7"];

export function AspectRatioGuidance() {
  return (
    <section className="surface-card p-5 sm:p-6" aria-labelledby="aspect-guidance-heading">
      <div className="mb-4">
        <h2 id="aspect-guidance-heading" className="text-sm font-semibold text-foreground">Aspect ratio guidance</h2>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Common layouts to consider when preparing a pubmat.</p>
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {ASPECT_RATIO_GUIDES.map((guide, index) => (
          <li key={guide.ratio} className="rounded-lg bg-muted/60 p-3 text-center">
            <span className={`${shapeClasses[index]} mx-auto flex items-center justify-center rounded-md border-2 border-violet-400 bg-violet-100/60 dark:border-violet-600 dark:bg-violet-950/50`} aria-hidden="true" />
            <span className="mt-2 block text-xs font-semibold text-foreground">{guide.label}</span>
            <span className="mt-0.5 block text-[11px] font-medium text-violet-800 dark:text-violet-200">{guide.ratio}</span>
            <span className="mt-1 hidden text-[10px] leading-4 text-muted-foreground sm:block">{guide.description}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Previews fit the full original image without cropping or changing the selected file.
      </p>
    </section>
  );
}
