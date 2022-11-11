import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

import { CreateEmployeeDto } from '@pipeline-project-template/api-interfaces'

const employeeData: CreateEmployeeDto = {
  firstname: 'Ash_ley',
  middlename: 'Sus!an',
  lastname: 'Bost*on',
  dateOfBirth: new Date(1953, 0, 22),
  address: '909 Hampton Meadows',
  salary: -1000,
  department: 'Testing',
}

Given('the user is on the landing page of the application', () => cy.visit('/employee'))

When('the user clicks the create Employee button', () => {
  cy.get("pipeline-project-template-employee-management-button[data-qa='management-create-button']").click()
})

Then('a modal page should popup', () => {
  cy.get('pipeline-project-template-employee-dialog')
    .find('.mat-dialog-title')
    .contains('Create Employee')
    .should('exist')
})

Then('the modal page has empty fields with titles', () => {
  cy.get("[data-qa='create-input-firstname']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-middlename']").should('have.value', '').should('not.have.attr', 'required')
  cy.get("[data-qa='create-input-lastname']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-address']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-date_of_birth']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-salary']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-department']").should('have.attr', 'aria-required')
  cy.get("[data-qa='create-input-department']").find('.mat-select-value-text').should('not.exist')
})

Then(`the user fills out all the empty fields marked with a star icon with invalid data`, () => {
  cy.get("[data-qa='create-input-firstname']")
    .type(employeeData.firstname)
    .then(() => {
      cy.get("[data-qa='create-input-firstname']").should('have.value', employeeData.firstname)
    })
  cy.get("[data-qa='create-input-middlename']")
    .type(employeeData.middlename)
    .then(() => {
      cy.get("[data-qa='create-input-middlename']").should('have.value', employeeData.middlename)
    })
  cy.get("[data-qa='create-input-lastname']")
    .type(employeeData.lastname)
    .then(() => {
      cy.get("[data-qa='create-input-lastname']").should('have.value', employeeData.lastname)
    })
  cy.get("[data-qa='create-input-address']")
    .type(employeeData.address)
    .then(() => {
      cy.get("[data-qa='create-input-address']").should('have.value', employeeData.address)
    })
  cy.get("[data-qa='create-input-date_of_birth']")
    .type('08/22/-3834')
    .then(() => {
      cy.get("[data-qa='create-input-date_of_birth']").should('have.value', '08/22/-3834')
    })
  cy.get("[data-qa='create-input-salary']")
    .type(employeeData.salary.toString())
    .then(() => {
      cy.get("[data-qa='create-input-salary']").should('have.value', employeeData.salary.toString())
    })
  cy.get("[data-qa='create-input-department']")
    .click()
    .then(() => {
      cy.get(`.cdk-overlay-container .mat-select-panel .mat-option-text`)
        .contains(employeeData.department)
        .click()
        .then(() => {
          cy.get("[data-qa='create-input-department']")
            .find('.mat-select-value-text')
            .should('have.text', employeeData.department)
        })
    })
})

Then(`the user clicks the “Save” button`, () => {
  cy.get("[data-qa='submit']").click()
})

Then(`the data should be validated`, () => true)

Then(`the user should be presented with a validation error message`, () => {
  cy.get('[data-qa="create-input-field-firstname"] mat-error span').should('have.text', 'Not a valid name')
  cy.get('[data-qa="create-input-field-middlename"] mat-error span').should('have.text', 'Not a valid name')
  cy.get('[data-qa="create-input-field-lastname"] mat-error span').should('have.text', 'Not a valid name')
  cy.get('[data-qa="create-input-field-date_of_birth"] mat-error span').should('have.text', 'Date of birth is required')
  cy.get('[data-qa="create-input-field-salary"] mat-error span').should('have.text', 'This input is too small')
})

Then(`the user should remain on the modal page`, () => {
  cy.get("[data-qa='submit']").click()
  cy.get('.cdk-overlay-backdrop-showing').should('exist')
})
