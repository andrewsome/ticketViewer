describe('Detail Page Test', function() {
  it('successfully loads', function() {
    cy.visit('/detail/1')
    cy.get('#subject').should('contain','Sample ticket: Meet the ticket')
  })
})
