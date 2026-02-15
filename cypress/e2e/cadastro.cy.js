/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

  cy.clearLocalStorage
  beforeEach(() => {
    cadastroPage.visitarPaginaCadastro()
  })

  afterEach(() => {
//     cy.screenshot()
  });

  it('Deve bloquear cadastro quando campos obrigatorios estão vazios', () => {
    cy.get('#register-btn').click()
    // exemplos (ajuste conforme seu HTML)
    cy.get('#name').then(($el) => expect($el[0].checkValidity()).to.eq(false))
    cy.get('#email').then(($el) => expect($el[0].checkValidity()).to.eq(false))
    cy.get('#password').then(($el) =>
      expect($el[0].checkValidity()).to.eq(false),
    )
  })

  it('Deve bloquear cadastro com email inválido', () => {
    cy.get('#name').type('Teste-QA')
    cy.get('#email').type('email-invalido')
    cy.get('#phone').type('44999430660')
    cy.get('#password').type('123,5Aire')
    cy.get('#confirm-password').type('123,5Aire')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.get('#email').then(($el) => expect($el[0].checkValidity()).to.eq(false))
  })

  it('Deve bloquear cadastro quando senhas não coincidem', () => {
    cy.get('#name').type('Teste QA')
    cy.get('#email').type(`teste${Date.now()}@teste.com`)
    cy.get('#phone').type('44999430660')
    cy.get('#password').type('123,5Aire')
    cy.get('#confirm-password').type('diferente123')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.url().should('include', 'register')
  })

  it('Deve bloquear cadastro se não aceitar os termos', () => {
    cy.get('#name').type('Teste QA')
    cy.get('#email').type(`teste${Date.now()}@teste.com`)
    cy.get('#phone').type('44999430660')
    cy.get('#password').type('123,5Aire')
    cy.get('#confirm-password').type('123,5Aire')

    cy.get('#register-btn').click()
    cy.url().should('include', 'register')
   })


   it('Deve fazer cadastro com sucesso, usando função JS', () => {
    let email = `teste${Date.now()}@teste.com`
    cy.get('#name').type('Richard Marlon Balestrim')
    cy.get('#email').type(email)
    cy.get('#phone').type('44999430660')
    cy.get('#password').type('123,5Aire')
    cy.get('#confirm-password').type('123,5Aire')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.url().should('include', 'dashboard')
  })

  it('Deve fazer cadastro com sucesso usando Faker', () => {
    let nome = faker.person.fullName()
    let email = faker.internet.email()
    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#phone').type('44999430660')
    cy.get('#password').type('richar.@m8')
    cy.get('#confirm-password').type('richar.@m8')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.url().should('include', 'dashboard')
    cy.get('#user-name').should('contain', nome)
  })
  
    it('Deve preencher cadastro com sucesso - Usando comando customisado', () => {
    let email = `teste${Date.now()}@teste.com`            
    let nome = faker.person.fullName({sex: 'male'})
    cy.preencherCadastro(nome, email, '44999430660', 'richar.@m8', 'richar.@m8')
    cy.url().should('include', 'dashboard')

    });

  it('Deve fazer cadastro com sucesso - Usando Page Ob jects', () => {
    
    let email = `teste${Date.now()}@teste.com` 
    cadastroPage.preencherCadastro('Richard Marlon Balestrim', email, '44999430660', 'richar.@8m', 'richar@8m')
  });
 
  it('Deve validar mensagem ao tentar cadastrar sem prencher nome', () => {
  
  cadastroPage.preencherCadastro('', 'richardbalestrim8@gmail.com', '44999430660', 'richar@8m', 'richr@8m')
  cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
  
 });

})


