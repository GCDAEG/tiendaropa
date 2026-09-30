"use client";

export type GenderFilter = "Todos" | "Hombre" | "Mujer";
export interface CatalogFilterState {
  gender: GenderFilter;
  category: string;
  sizes: string[];
  colors: string[];
  minPrice: string;
  maxPrice: string;
}

interface Props {
  filters: CatalogFilterState;
  categories: string[];
  sizes: string[];
  colors: string[];
  priceBounds: { min: number; max: number };
  onChange: (next: CatalogFilterState) => void;
  onClear: () => void;
  layout?: "sidebar" | "wide";
}

const formatPrice = (price: number) => price.toLocaleString("es-AR");

export function CatalogFilters({ filters, categories, sizes, colors, priceBounds, onChange, onClear, layout = "sidebar" }: Props) {
  const toggle = (key: "sizes" | "colors", value: string) => {
    const values = filters[key];
    onChange({ ...filters, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] });
  };
  const heading = "mb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted";
  const group = layout === "wide" ? "border-t border-line pt-4" : "border-t border-line pt-5";
  const label = "flex min-h-9 cursor-pointer items-center gap-2.5 text-sm text-ink/80";

  return (
    <div className={layout === "wide" ? "grid gap-x-7 gap-y-6 sm:grid-cols-2 lg:grid-cols-5" : "space-y-6"}>
      <fieldset className={layout === "wide" ? "border-t border-line pt-4" : undefined}>
        <legend className={heading}>Colección</legend>
        {(["Todos", "Hombre", "Mujer"] as const).map((gender) => (
          <label className={label} key={gender}>
            <input type="radio" name="catalog-gender" value={gender} checked={filters.gender === gender} onChange={() => onChange({ ...filters, gender })} />
            {gender}
          </label>
        ))}
      </fieldset>
      <fieldset className={group}>
        <legend className={heading}>Categoría</legend>
        {["Todos", ...categories].map((category) => (
          <label className={label} key={category}>
            <input type="radio" name="catalog-category" value={category} checked={filters.category === category} onChange={() => onChange({ ...filters, category })} />
            {category}
          </label>
        ))}
      </fieldset>
      <fieldset className={group}>
        <legend className={heading}>Talle <span className="font-normal normal-case tracking-normal">(cualquiera)</span></legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => <button key={size} type="button" aria-pressed={filters.sizes.includes(size)} onClick={() => toggle("sizes", size)} className={`min-h-10 min-w-10 border px-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${filters.sizes.includes(size) ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink hover:border-ink/50"}`}>{size}</button>)}
        </div>
      </fieldset>
      <fieldset className={group}>
        <legend className={heading}>Color <span className="font-normal normal-case tracking-normal">(cualquiera)</span></legend>
        <div className={layout === "wide" ? "grid max-h-52 grid-cols-2 gap-x-3 overflow-y-auto" : undefined}>{colors.map((color) => <label className={label} key={color}><input type="checkbox" checked={filters.colors.includes(color)} onChange={() => toggle("colors", color)} />{color}</label>)}</div>
      </fieldset>
      <fieldset className={group}>
        <legend className={heading}>Precio · ARS</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-muted">Mínimo
            <input aria-label="Precio mínimo" type="number" min={priceBounds.min} max={priceBounds.max} inputMode="numeric" placeholder={formatPrice(priceBounds.min)} value={filters.minPrice} onChange={(event) => onChange({ ...filters, minPrice: event.target.value })} className="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent" />
          </label>
          <label className="text-xs text-muted">Máximo
            <input aria-label="Precio máximo" type="number" min={priceBounds.min} max={priceBounds.max} inputMode="numeric" placeholder={formatPrice(priceBounds.max)} value={filters.maxPrice} onChange={(event) => onChange({ ...filters, maxPrice: event.target.value })} className="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-accent" />
          </label>
        </div>
      </fieldset>
      <div className={layout === "wide" ? "flex items-end" : undefined}><button type="button" onClick={onClear} className="min-h-10 border-b border-ink/40 text-sm text-ink hover:border-ink">Limpiar filtros</button></div>
    </div>
  );
}
