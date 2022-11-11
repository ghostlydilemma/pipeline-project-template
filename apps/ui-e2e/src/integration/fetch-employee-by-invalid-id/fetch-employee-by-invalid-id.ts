import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user has the browser open', () => true)

When('the user opens the invalid ID INVALID', () => {
  cy.visit('/employee/INVALID')
})

Then('the user should be notified of the invalid ID', () => {
  cy.get('pipeline-project-template--employee-detail').should('have.text', 'This employee does not exist')
})
