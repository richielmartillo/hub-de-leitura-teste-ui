/// <reference types="cypress"/>

describe('Funcionalidade: Catálogo de livros', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('catalog.html')
  })

  it('Deve clicar no botão Adicionar á cesta', () => {
    cy.get(
      ':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary',
    ).click()
    cy.get('#cart-count').should('contain', 1)
  })

  it('Deve clicar em todos os botões Adicionar à cesta', () => {
    cy.get('.btn-primary').click({ multiple: true })
  })

  it('Deve clicar no primeiro botão Adicionar à cesta', () => {
    cy.get('.btn-primary').first().click()
  })

  it('Deve clicar no úlitimo botão Adicionar à cesta', () => {
    cy.get('.btn-primary').last().click()
  })

  it('Deve clicar no terceiro botão Adicionar à cesta', () => {
    cy.get('.btn-primary').eq(2).click()
  })

  it('Deve clicar no quinto botão Adicionar à cesta', () => {
    cy.get('.btn-primary').eq(4).click()
  })

  it('Deve clicar no quinto botão Adicionar à cesta', () => {
    cy.get('.btn-primary').eq(4).click()
    cy.get('#global-alert-container').should('contain', 'A Metamorfose')
  })

  it('Deve clicar no nome do livro e direcionar  para a tela do livro', () => {
    cy.contains('Dom Casmurro').click()
    cy.url().should('include', 'book-details')
    cy.get('#add-to-cart-btn').click()
    cy.get('#alert-container').should(
      'contain',
      'Livro adicionado à cesta com sucesso!',
    )
  })

  it('Deve carregar o catálogo com livros e botões de adicionar', () => {
    cy.get('.card').should('have.length.greaterThan', 1)
    cy.get('.btn-primary').should('have.length.greaterThan', 1)
  })

  it('Deve adicionar dois livros diferentes e atualizar o contador', () => {
    cy.get('#cart-count').should('contain', '0')

    cy.get('.btn-primary').eq(0).click()
    cy.get('#cart-count').should('contain', '1')

    cy.get('.btn-primary').eq(1).click()
    cy.get('#cart-count').should('contain', '2')
  })

  it('Deve iniciar com contador da cesta em 0', () => {
    cy.get('#cart-count').should('contain', '0')
  })
})
