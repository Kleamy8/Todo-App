import { data } from "node_modules/cypress/types/jquery";

describe("Calendar-component", () => {
  beforeEach(() => {
    const todos = [
      {
        task: "Study React",
        date: new Date(2025, 10, 17).toISOString(),
        category: "Study",
      },
      {
        task: "Working",
        date: new Date(2025, 10, 18).toISOString(),
        category: "Work",
      },
    ];
    localStorage.setItem("todo", JSON.stringify(todos));
    cy.visit("/");
  });
  it("shows the task in the right cell", () => {
    cy.contains("button", "‹").as("prevButton");
    cy.contains("button", "›").as("nextButton");
    cy.get("h1").then($header => {
      if (!$header.text().includes("November 2025")) {
        cy.get("@nextButton").click();
      }
    });
    cy.get('[data-testid="day-cell"]').within(() => {
      cy.contains('[data-testid="day-number"]', "17")
        .parents('[data-testid="day-cell"]')
        .within(() => {
          cy.contains(`[data-testid="todoItem"]`, "Study React").should(
            "exist"
          );
        });
    });
  });
  it("filters out the tasks ", () => {
    cy.contains("button", "‹").as("prevButton");
    cy.contains("button", "›").as("nextButton");
    cy.get("h1").then($header => {
      if (!$header.text().includes("November 2025")) {
        cy.get("@nextButton").click();
      }
    });
    cy.contains("p", "Category").as("CategoryButton");
    cy.get("@CategoryButton").click();
    cy.get("ul").should("exist");
    cy.contains("li", "Work").click();
    cy.get('[data-testid="day-cell"]').within(() => {
      cy.contains('[data-testid="day-number"]', "17")
        .parents('[data-testid="day-cell"]')
        .within(() => {
          cy.contains(`[data-testid="todoItem"]`, "Study React").should(
            "not.exist"
          );
        });
    });
    cy.get('[data-testid="day-cell"]').within(() => {
      cy.contains('[data-testid="day-number"]', "18")
        .parents('[data-testid="day-cell"]')
        .within(() => {
          cy.contains(`[data-testid="todoItem"]`, "Working").should("exist");
        });
    });
  });
  it("filters  the tasks ", () => {
    cy.contains("button", "‹").as("prevButton");
    cy.contains("button", "›").as("nextButton");
    cy.get("h1").then($header => {
      if (!$header.text().includes("November 2025")) {
        cy.get("@nextButton").click();
      }
    });
    cy.contains("p", "Category").as("CategoryButton");
    cy.get("@CategoryButton").click();
    cy.get("ul").should("exist");
    cy.contains("li", "Study").click();
    cy.get('[data-testid="day-cell"]').within(() => {
      cy.contains('[data-testid="day-number"]', "17")
        .parents('[data-testid="day-cell"]')
        .within(() => {
          cy.contains(`[data-testid="todoItem"]`, "Study React").should(
            "exist"
          );
        });
    });
  });
});
