describe('Listing Page Test', function() {
  it('successfully loads', function() {
    cy.visit('/')
    cy.get('.ReactTable').should('exist')
  })
})

describe('Listing Page Test with page number and page size', function() {
  it('successfully loads', function() {
    cy.visit('/?page=2&limit=25')
    cy.get('.ReactTable').find('.rt-tr-group').should('have.length', 25)
    cy.get('.ReactTable').get('.-pageJump').get('input').should('have.value', '2')
  })
})