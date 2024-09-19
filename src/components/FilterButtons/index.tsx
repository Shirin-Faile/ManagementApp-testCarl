import React from "react";

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
  const getButtonClass = (filter: string) => {
    return currentFilter === filter
      ? "bg-blue-500 text-white"
      : "bg-gray-200";
  };

  return (
    <div>
      <button
        className={getButtonClass("all")}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={getButtonClass("completed")}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
      <button
        className={getButtonClass("pending")}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
    </div>
  );
};

export default FilterButtons;
