/// <reference types="cypress"/>

describe("Funcionalidade: Contato", () => {

 beforeEach(() => {
   cy.visit('index.html')
 });

  it('Deve preencher formulario de contato com sucesso', () => {
    
    cy.get('[name="name"]').type('Richard Marlon Balestrim')
    cy.get('[name="email"]').type('richardbalestrim8@gmail.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    //Resultado esperado
    cy.contains('Contato enviado com sucesso!').should('exist')
  });

  it('Deve validat mensagem de erro ao enviar sem preencher nome', () => {
    
    cy.get('[name="name"]').clear()
    cy.get('[name="email"]').type('richardbalestrim8@gmail.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click()
    //Resultado esperado 
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo Nome')
    

  });

  it('Deve validar mensagem de erro ao enviar sem preencher email', () => {

  
    cy.get('[name="name"]').type('Richard')
    cy.get('[name="email"]').clear()
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click() 
    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo E-mail')

  });

  it('Deve validat mensagem de erro ao enviar sem selecionar assunto', () => {
   
   
    cy.get('[name="name"]').type('Richard')
    cy.get('[name="email"]').type('richardbalestrim8@gmail.com')
    
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click() 
    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, selecione o Assunto')


  });

  it('Deve validat mensagem de erro ao enviar sem preencher a mensagem', () => {

   
    cy.get('[name="name"]').type('Richard')
    cy.get('[name="email"]').type('richardbalestrim8@gmail.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').clear()
    cy.get('#btn-submit').click() 
    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, escreva sua Mensagem')

  }); 
});
