import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div
      className="rounded-2xl border p-4 flex flex-col items-center justify-center text-center min-h-48"
      style={{
        backgroundColor: category.color,
        borderColor: category.borderColor,
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-24 h-24 object-contain mb-4"
      />

      <h3 className="font-semibold text-dark">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;