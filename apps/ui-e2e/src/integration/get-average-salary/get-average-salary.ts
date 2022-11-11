import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is using the application', () => true)

Then('is on the main screen', () => {
  cy.visit('/employee')
})

When('the user clicks on the “Get Average Salary” button', () => {
  cy.get(
    "pipeline-project-template-employee-average-salary-statistics-button[data-qa='average-salary-statistics-button']"
  ).click()
})

Then('a pop up window should open', () => {
  cy.get('pipeline-project-template--employee-average-salary-statistics-dialog')
    .find('.mat-dialog-title')
    .should('have.text', 'Employee Stats: Average Salary')
})

Then('the user should be presented with a statistic of the average salary throughout the entire company', () =>
  cy.get('.employee-average-salary-dialog__average-salary').should('include.text', 'Average salary:')
)

Then('the user should be able to select a filter for department', () => {
  cy.get('[data-qa="department-selector"]').should('exist')
})
