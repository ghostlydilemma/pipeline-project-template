import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is using the application', () => true)

Given('currently looks at an employee', () => cy.visit('/employee/1'))

When('the user clicks on the “Edit employee” button', () => {
  cy.get("pipeline-project-template-employee-management-button[data-qa='management-edit-button']").click()
})

Then(`a popup should open filled with all the data of this employee`, () => {
  cy.get('pipeline-project-template--employee-dialog')
    .find('.mat-dialog-title')
    .contains('Edit Employee')
    .should('exist')
  cy.get("[data-qa='create-input-firstname']").should('have.value', 'Denisse').should('have.attr', 'required')
  cy.get("[data-qa='create-input-middlename']").should('have.value', 'Donald').should('not.have.attr', 'required')
  cy.get("[data-qa='create-input-lastname']").should('have.value', 'Cobb').should('have.attr', 'required')
  cy.get("[data-qa='create-input-address']")
    .should('have.value', '2883 Ashton Lane, Austin, TX, 78701')
    .should('have.attr', 'required')
  cy.get("[data-qa='create-input-date_of_birth']").should('have.value', '28/11/1983').should('have.attr', 'required')
  cy.get("[data-qa='create-input-salary']").should('have.value', '1865').should('have.attr', 'required')
  cy.get("[data-qa='create-input-department']").should('have.attr', 'aria-required')
  cy.get("[data-qa='create-input-department']").find('.mat-select-value-text').should('have.text', 'HR')
})

Then(`the user should be able to edit the data of the chosen employee`, () => {
  cy.get("[data-qa='create-input-salary']").should('not.be.disabled')
})

When('the user changes the salary', () => {
  cy.get("[data-qa='create-input-salary']")
    .clear()
    .clear()
    .then(() => {
      cy.get("[data-qa='create-input-salary']").type('3000')
    })
})

Then('the data should be updated', () => {
  cy.get("[data-qa='create-input-salary']").should('have.value', '3000')
})

Then(`the data is valid`, () => {
  cy.get('mat-error span').should('not.exist')
})

Then('the user clicks the “Save” button', () => cy.get("[data-qa='submit']").click())

Then('the user will be redirected to the previous page', () => {
  cy.intercept('/employee/1').as('reloadEmployee')
})

Then('the data should be update', () => {
  cy.wait('@reloadEmployee').then(() => {
    cy.get('mat-card-content').find('p').eq(1).should('have.text', 'Salary: 3000€')
  })

  // RESET TEST
  cy.get("pipeline-project-template-employee-management-button[data-qa='management-edit-button']").click()
  cy.get("[data-qa='create-input-salary']")
    .clear()
    .clear()
    .then(() => {
      cy.get("[data-qa='create-input-salary']").type('1865')
    })
  cy.get("[data-qa='submit']").click()
})
