describe('HTML', () => {

  it('loads a page', () => {
    cy.visit('/')
    cy.get('h1')
      .should('have.text', 'success')
  })

})
