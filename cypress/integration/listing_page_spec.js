describe('Listing Page Test', function() {
  it('successfully loads', function() {
    cy.visit('/')
    cy.get('.ReactTable').should('exist')
  })
})