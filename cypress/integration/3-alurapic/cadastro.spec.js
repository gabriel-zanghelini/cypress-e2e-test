describe("Cadastro de usuarios alurapic", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verifica mensagens validacao", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
  });

  it("verifica mensagem de email invalido", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="email"]').type("gabriel");
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("verifica mensagem de senha com menos de 8 caracteres", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="password"]').type("123");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("verifica mensagem de nome minusculo", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.get('input[formcontrolname="userName"]').type("Gabriel");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Must be lower case").should("be.visible");
  });

  const usuarios = require("../../fixtures/usuarios.json");

  usuarios.forEach((usuario) => {
    it(`fazer registro de novo usuario ${usuario.userName}`, () => {
      cy.contains("a", "Register now").click();
      cy.register(
        usuario.email,
        usuario.fullName,
        (usuario.userName + Math.random() * 1000).replace(".", ""),
        usuario.password
      );
      cy.contains("h4", "Login").should("be.visible");
    });
  });
});
