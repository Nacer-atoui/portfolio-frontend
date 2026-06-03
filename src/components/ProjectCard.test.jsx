import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

it("affiche le titre du projet", () => {
  render(
    <MemoryRouter>
      <ProjectCard title="Symphony Project 1" />
    </MemoryRouter>,
  );

  expect(screen.getByText("Symphony Project 1")).toBeInTheDocument();
});

it("affiche la description du projet", () => {
  render(
    <MemoryRouter>
      <ProjectCard title="Symphony Project 1" description="Mon nouveau projet symfony" tech_stack="symphony" />
    </MemoryRouter>,
  );

  expect(screen.getByText("Mon nouveau projet symfony")).toBeInTheDocument();
});

it("affiche la stack du projet", () => {
  render(
    <MemoryRouter>
      <ProjectCard title="Symphony Project 1" description="Mon nouveau projet symfony" />
    </MemoryRouter>,
  );

  expect(screen.getByText("PROJET")).toBeInTheDocument();
});