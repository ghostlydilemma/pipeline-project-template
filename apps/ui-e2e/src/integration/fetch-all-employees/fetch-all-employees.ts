import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user has the browser open', () => true)

When('the user navigates to the application', () => cy.visit('/employee'))

Then('the user should be presented a browsable table view', () =>
  cy.get('pipeline-project-template--employee-table').find('.employee-table').should('exist')
)

Then('the table contains information of all the employees', () =>
  cy.get('pipeline-project-template--employee-table').find('[data-qa="cell-name"]').contains('Denisse Donald Cobb')
)
