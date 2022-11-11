import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is using the application', () => true)

Then('currently looks at an employee', () => cy.visit('/employee/1'))

When('the user clicks on the “Unemploy” button', () => {
  cy.get("pipeline-project-template-employee-employment-change-button[data-qa='employment-change-button']").click()
})

Then(`the user should be presented with a warning dialog if the employee should be removed`, () => {
  cy.get('pipeline-project-template--employee-employment-change-dialog')
    .find('.mat-dialog-title')
    .should('have.text', 'Are you sure?')
})

Then(`the user should have the option to accept or reject the warning`, () => {
  cy.get('[data-qa="cancel-button"]').should('exist')
  cy.get('[data-qa="confirm-button"]').should('exist')
})

When('the user clicks on the "Unemploy employee" button', () => {
  cy.get('[data-qa="confirm-button"]').click()
})

Then('the user will be redirected to the previous page', () => {
  cy.url().should('include', '/employee/1')
})

Then('the employee will be unemployed', () => {
  cy.get('.employee-activity-status__indicator').should('have.class', 'employee-activity-status__indicator--inactive')

  // RESET TEST
  cy.get("pipeline-project-template-employee-employment-change-button[data-qa='employment-change-button']").click()
  cy.get('[data-qa="confirm-button"]').click()
})
