import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import type { FilterState } from '@/types';
import { Check, X } from 'lucide-react';

/* ===== Static filter options matching the Figma design ===== */
const categoryOptions = [
  { id: 'eggs', label: 'Eggs' },
  { id: 'noodles_pasta', label: 'Noodles & Pasta' },
  { id: 'chips_crisps', label: 'Chips & Crisps' },
  { id: 'fast_food', label: 'Fast Food' },
];

const brandOptions = [
  { id: 'individual_collection', label: 'Individual Callection' },
  { id: 'cocola', label: 'Cocola' },
  { id: 'ifad', label: 'Ifad' },
  { id: 'kazi_farmas', label: 'Kazi Farmas' },
];

/* ===== Checkbox component ===== */
function FilterCheckbox({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 py-2.5 w-full text-left group"
      role="checkbox"
      aria-checked={checked}
    >
      {/* Checkbox */}
      <span
        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 ${
          checked
            ? 'bg-primary shadow-[0_2px_6px_rgba(83,177,117,0.35)]'
            : 'border-2 border-gray-light bg-white group-hover:border-gray'
        }`}
      >
        {checked && (
          <Check/>
        )}
      </span>

      {/* Label */}
      <span
        className={`text-[15px] font-medium transition-colors duration-200 ${
          checked ? 'text-primary' : 'text-dark'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ===== Main FiltersScreen ===== */
export default function FiltersScreen() {
  const navigate = useNavigate();
  const { filters, setFilters } = useProductStore();

  // Local state mirrors store filters so changes aren't applied until user clicks "Apply"
  const [localCategories, setLocalCategories] = useState<string[]>(
    filters.categories.length > 0 ? [...filters.categories] : []
  );
  const [localBrands, setLocalBrands] = useState<string[]>(
    filters.brands?.length > 0 ? [...filters.brands] : []
  );

  const toggleCategory = (id: string) => {
    setLocalCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id: string) => {
    setLocalBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    setFilters({
      ...filters,
      categories: localCategories as FilterState['categories'],
      brands: localBrands,
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-lightest flex flex-col">
      {/* ─── Header ─── */}
      <div className="px-5 pt-6 pb-4 flex items-center max-w-lg mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-lighter/60 transition-colors"
          aria-label="Close filters"
        >
          <X/>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-dark">
          Filters
        </h1>
        {/* Invisible spacer to center the title */}
        <div className="w-8.5" />
      </div>

      {/* ─── Filter Card ─── */}
      <div className="flex-1 mx-4 mb-4 bg-white rounded-t-(--radius-xl) px-6 pt-6 pb-28 max-w-lg lg:mx-auto lg:w-full overflow-y-auto">
        {/* Categories Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-dark mb-3">Categories</h2>
          <div className="flex flex-col">
            {categoryOptions.map((opt) => (
              <FilterCheckbox
                key={opt.id}
                checked={localCategories.includes(opt.id)}
                label={opt.label}
                onToggle={() => toggleCategory(opt.id)}
              />
            ))}
          </div>
        </section>

        {/* Brand Section */}
        <section>
          <h2 className="text-lg font-bold text-dark mb-3">Brand</h2>
          <div className="flex flex-col">
            {brandOptions.map((opt) => (
              <FilterCheckbox
                key={opt.id}
                checked={localBrands.includes(opt.id)}
                label={opt.label}
                onToggle={() => toggleBrand(opt.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ─── Apply Button (pinned to bottom) ─── */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-linear-to-t from-white via-white/95 to-transparent max-w-lg mx-auto">
        <button
          onClick={handleApply}
          className="w-full bg-primary text-white text-base font-bold py-4 rounded-lg hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 shadow-button"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
