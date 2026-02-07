/// <reference types="cypress"/>
import user from"../fixtures/usuario.json"
describe('Funcionalidade: Login', () => {
    
  beforeEach(() => {
    cy.visit('login.html')
  });

   it('Deve fazer login com sucesso', () => {
    cy.get('#email').type( 'richardbalestrim8@gmail.com')
    cy.get('#password').type('richar.@m8')
    cy.get('#login-btn').click()
    cy.url().should('include', 'dashboard')
   });
     
    it('Deve fazer login com sucesso - Usando comando customizado', () => {
        cy.login('richardbalestrim8@gmail.com', 'richar.@m8')
    }); 
    
    it('Deve fazer login com sucesso com conta Admin - Usando comando customizado', () => {
        cy.login ('admin@biblioteca.com', 'admin123')
    });

    it('Deve fazer login com sucesso - Usando importação da massa de dados', () => {
     cy.login (user.email, user.senha)    
    });

}); 