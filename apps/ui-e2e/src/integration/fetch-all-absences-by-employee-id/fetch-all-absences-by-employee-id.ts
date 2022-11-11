import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is on the landing page of the application', () => cy.visit('/employee'))

When('the user selects the employee “Denisse Donald Cobb” out of the list', () =>
  cy
    .get('pipeline-project-template--employee-table')
    .find('[data-qa="cell-name"]')
    .contains('Denisse Donald Cobb')
    .click()
)

Then('the user should be redirected to a detailed view of the employee with the corresponding id "1"', () =>
  cy.url().should('include', '/employee/1')
)

Then('the user should be able to see at least one start date of the absence called holiday', () => {
  cy.get('[data-qa="cell-startDate"]').contains('Oct 7, 2022')
  cy.get('[data-qa="cell-endDate"]').contains('Oct 14, 2022')
  cy.get('[data-qa="cell-type"]').contains('Holiday')
})
