import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";

interface CategorySidebarProps {
  activeCat: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategorySidebar({ activeCat, onSelect }: CategorySidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:block w-[240px] shrink-0 self-start sticky top-[80px]">
      <div className="bg-white rounded-2xl border border-gray-lighter/60 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-lightest">
          <h3 className="text-sm font-bold text-dark tracking-wide uppercase">Categories</h3>
        </div>
        <nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">
          {/* All Items */}
          <button
            onClick={() => onSelect(null)}
            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-200 group ${
              activeCat === null
                ? "bg-primary/10 text-primary font-bold border-r-[3px] border-primary"
                : "text-gray-dark hover:bg-gray-lightest/70 hover:text-dark"
            }`}
          >
            <span className="text-[13px] font-semibold">All Items</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelect(cat.id);
                navigate(`/category/${cat.id}`);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-200 group ${
                activeCat === cat.id
                  ? "bg-primary/10 text-primary font-bold border-r-[3px] border-primary"
                  : "text-gray-dark hover:bg-gray-lightest/70 hover:text-dark"
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${cat.color}` }}
              >
                <img src={cat.image} alt="" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-[13px] font-semibold truncate">{cat.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
