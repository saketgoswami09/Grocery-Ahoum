type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 mt-6 mb-4">
      <h2 className="text-xl font-bold text-dark">{title}</h2>

      <button className="text-primary font-medium text-sm">
        See all
      </button>
    </div>
  );
};

export default SectionHeader