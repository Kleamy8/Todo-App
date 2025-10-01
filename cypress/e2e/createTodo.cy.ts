describe("CreateTodo component", () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit("/create");
  });

  it("adds a new todo with selected date", () => {
    cy.on("window:alert", msg => {
      expect(msg).to.equal("task added");

      cy.get('input[placeholder="Task name"]').should("have.value", "");
      cy.window().then(win => {
        const todos = JSON.parse(win.localStorage.getItem("todo") || "[]");
        expect(todos.length).to.equal(1);
        expect(todos[0].task).to.equal("Cypress Test Task");
        expect(new Date(todos[0].date).getDate()).to.equal(15);
      });
    });

    cy.get('input[placeholder="Task name"]').type("Cypress Test Task");

    cy.get('[data-testid="date-picker"]').clear().type("01/15/2030").blur();

    cy.contains("Add").click();
  });

  it("does not save empty tasks", () => {
    cy.contains("Add").click();
    cy.window()
      .its("localStorage.todo")
      .should(todoStr => {
        const todos = JSON.parse(todoStr || "[]");
        expect(todos.length).to.equal(0);
      });
  });
});
