import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Footer } from "./Footer";
import { MemoryRouter } from "react-router-dom";

it("Le lien github s'affiche correctement dans le footer", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

  const lienGithub = screen.getByRole("link", { name: "GitHub" });

  expect(lienGithub).toBeInTheDocument();

  expect(lienGithub).toHaveAttribute("href", "https://github.com/Nacer-atoui");

});

it("Le lien github s'affiche correctement dans le footer", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

  const lienLinkedIn = screen.getByRole("link", { name: "LinkedIn" });

  expect(lienLinkedIn).toBeInTheDocument();

  expect(lienLinkedIn).toHaveAttribute("href", "http://www.linkedin.com/in/nacer-atoui");

});