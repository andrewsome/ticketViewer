import { createVerify } from "crypto";

describe('Listing page goes to detail page back to listing remembers the state', function() {
  it('successfully loads', function() {
    cy.visit('/')
    //go to the second page
    cy.get('.-next').click()
    cy.url().should('contain', 'page=2')
    //click the first row to detail page
    cy.get('.ReactTable').get('.rt-tr-group').first().click()
    cy.url().should('contain', 'detail')
    cy.get('.backButton').click()
    //check if the listing page is still in the second page 
    cy.url().should('contain', 'page=2')
    cy.get('.ReactTable').get('.-pageJump').get('input').should('have.value', '2')
  })
})
