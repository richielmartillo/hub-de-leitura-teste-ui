/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register.html')
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
})
