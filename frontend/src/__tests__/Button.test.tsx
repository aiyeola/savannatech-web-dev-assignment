import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders with correct text and handles click", async () => {
    const handleClick = jest.fn();
    render(
      <Button asChild={false} onClick={handleClick}>
        Click Me
      </Button>
    );

    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
