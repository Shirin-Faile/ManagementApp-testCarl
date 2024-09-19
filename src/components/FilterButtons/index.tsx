import React from "react";

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
  const getButtonClass = (filter: string) => {
    return currentFilter === filter
      ? "filter-button filter-button-active"
      : "filter-button";
  };

  return (
    <div className="flex space-x-2 mb-4">
      <button
        className={getButtonClass("all") + " filter-button-all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={getButtonClass("completed") + " filter-button-completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
      <button
        className={getButtonClass("pending") + " filter-button-pending"}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
    </div>
  );
};

export default FilterButtons;


