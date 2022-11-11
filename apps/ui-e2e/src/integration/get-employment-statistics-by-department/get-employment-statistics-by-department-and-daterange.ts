import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is using the application', () => true)

Then('is on the main screen', () => {
  cy.visit('/employee')
})

When('the user clicks on the “Management Statistics” button', () => {
  cy.get(
    "pipeline-project-template-employee-employment-statistics-button[data-qa='employment-statistics-button']"
  ).click()
})

Then('a pop up window should open', () => {
  cy.get('pipeline-project-template--employee-employment-statistics-dialog')
    .find('.mat-dialog-title')
    .should('have.text', 'Employee Stats: Employment')
})

Then(
  'the user should be presented with statistics of how many people were onboarded and left the company in a given timeframe from a given department',
  () => {
    cy.get('[data-qa="department-selector"]')
      .click()
      .then(() => {
        cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`)
          .contains('Testing')
          .click()
          .then(() => {
            cy.get('[data-qa="department-selector"]').find('.mat-select-value-text').should('have.text', 'Testing')
          })
      })
    cy.get('[data-qa="date-from-selector"]').type('01/01/2001')
    cy.get('[data-qa="date-to-selector"]').type('31/12/2013')
    cy.get('mat-accordion').find('mat-expansion-panel').should('have.length', 3)
  }
)

Then('the user should be able to select a filter for department and daterange', () => {
  cy.get('[data-qa="department-selector"]').should('exist')
  cy.get('[data-qa="date-from-selector"]').should('exist')
  cy.get('[data-qa="date-to-selector"]').should('exist')
})
