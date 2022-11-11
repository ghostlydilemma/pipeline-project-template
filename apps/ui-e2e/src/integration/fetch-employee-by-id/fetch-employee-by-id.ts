import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is on the landing page of the application', () => cy.visit('/employee'))

When('the user selects the employee Denisse Donald Cobb out of the list', () =>
  cy
    .get('pipeline-project-template--employee-table')
    .find('[data-qa="cell-name"]')
    .contains('Denisse Donald Cobb')
    .parent()
    .click()
)

Then('the user should be redirected to a detailed view of the employee with the corresponding id', () =>
  cy.url().should('include', '/employee/1')
)
