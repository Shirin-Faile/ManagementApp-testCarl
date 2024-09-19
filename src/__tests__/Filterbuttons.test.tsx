import { render, screen, fireEvent } from "@testing-library/react";
import FilterButtons from "@/components/FilterButtons";

describe("Filterbuttons", () => {
  test("renders all filter buttons", () => {
    const currentFilter = "all";
    const onFilterChange = jest.fn();

    render(
      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
    );

    const allButton = screen.getByRole("button", { name: /all/i });
    const completedButton = screen.getByRole("button", { name: /completed/i });
    const pendingButton = screen.getByRole("button", { name: /pending/i });

    expect(allButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
    expect(pendingButton).toBeInTheDocument();
  });

  test("calls onFilterChange when filter buttons are clicked", () => {
    const currentFilter = "all";
    const onFilterChange = jest.fn();

    render(
      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
    );

    const completedButton = screen.getByRole("button", { name: /completed/i });
    fireEvent.click(completedButton);

    expect(onFilterChange).toHaveBeenCalledWith("completed");
  });

  test("applies correct styles based on the current filter", () => {
    const onFilterChange = jest.fn();

    render(
      <FilterButtons
        currentFilter="completed"
        onFilterChange={onFilterChange}
      />
    );

    const completedButton = screen.getByRole("button", { name: /completed/i });
    expect(completedButton).toHaveClass("bg-blue-500 text-white");

    const allButton = screen.getByRole("button", { name: /all/i });
    const pendingButton = screen.getByRole("button", { name: /pending/i });

    expect(allButton).toHaveClass("bg-gray-200");
    expect(pendingButton).toHaveClass("bg-gray-200");
  });
});
