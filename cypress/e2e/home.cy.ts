describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the Add new Todo button", () => {
    cy.get("button")
      .contains(/add new todo/i)
      .should("be.visible");
  });

  it("renders the title", () => {
    cy.get("[data-testid='title']").should("contain.text", "Home");
  });
  it("button should be clickable", () => {
    cy.get("button")
      .contains(/add new todo/i)
      .click();
  });
  it("have 2 headings", () => {
    cy.get("h4")
      .should("have.length", 2)
      .then(heading => {
        expect(heading[0]).to.contain.text("Ongoing");
        expect(heading[1]).to.contain.text("Completed");
      });
  });
});

export {};
