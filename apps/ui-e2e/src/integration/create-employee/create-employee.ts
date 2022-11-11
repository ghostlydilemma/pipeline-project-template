import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

import { CreateEmployeeDto } from '@pipeline-project-template/api-interfaces'

const employeeData: CreateEmployeeDto = {
  firstname: 'Ashley',
  middlename: 'Susan',
  lastname: 'Boston',
  dateOfBirth: new Date(1953, 8, 22),
  address: '909 Hampton Meadows',
  salary: 3500,
  department: 'Testing',
}

const dateString = `${employeeData.dateOfBirth.getDate()}/${employeeData.dateOfBirth.getMonth()}/${employeeData.dateOfBirth.getFullYear()}`

Given('the user is on the landing page of the application', () => cy.visit('/employee'))

When('the user clicks the Create Employee button', () => {
  cy.get("pipeline-project-template-employee-management-button[data-qa='management-create-button']").click()
})

Then('a modal page should popup', () => {
  cy.get('pipeline-project-template--employee-dialog')
    .find('.mat-dialog-title')
    .contains('Create Employee')
    .should('exist')
})

Then('the modal page has empty fields', () => {
  cy.get("[data-qa='create-input-firstname']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-middlename']").should('have.value', '').should('not.have.attr', 'required')
  cy.get("[data-qa='create-input-lastname']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-address']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-date_of_birth']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-salary']").should('have.value', '').should('have.attr', 'required')
  cy.get("[data-qa='create-input-department']").should('have.attr', 'aria-required')
  cy.get("[data-qa='create-input-department']").find('.mat-select-value-text').should('not.exist')
})

Then(`the user enters the firstname Ashley`, () => {
  cy.get("[data-qa='create-input-firstname']")
    .type(employeeData.firstname)
    .then(() => {
      cy.get("[data-qa='create-input-firstname']").should('have.value', employeeData.firstname)
    })
})

Then(`the user enters the middlename Susan`, () => {
  cy.get("[data-qa='create-input-middlename']")
    .type(employeeData.middlename)
    .then(() => {
      cy.get("[data-qa='create-input-middlename']").should('have.value', employeeData.middlename)
    })
})

Then(`the user enters the lastname Boston`, () => {
  cy.get("[data-qa='create-input-lastname']")
    .type(employeeData.lastname)
    .then(() => {
      cy.get("[data-qa='create-input-lastname']").should('have.value', employeeData.lastname)
    })
})

Then(`the user enters the address 909 Hampton Meadows`, () => {
  cy.get("[data-qa='create-input-address']")
    .type(employeeData.address)
    .then(() => {
      cy.get("[data-qa='create-input-address']").should('have.value', employeeData.address)
    })
})

Then(/^the user enters the date of birth 22\/08\/1953$/, () => {
  cy.get("[data-qa='create-input-date_of_birth']")
    .type(dateString)
    .then(() => {
      cy.get("[data-qa='create-input-date_of_birth']").should('have.value', dateString)
    })
})

Then(`the user enters the salary 3500€`, () => {
  cy.get("[data-qa='create-input-salary']")
    .type(employeeData.salary.toString())
    .then(() => {
      cy.get("[data-qa='create-input-salary']").should('have.value', employeeData.salary.toString())
    })
})

Then(`the user selects department Testing`, () => {
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

Then('the data should be validated', () => {
  cy.get('mat-error span').should('not.exist')
})

Then('the user clicks the “Save” button', () => {
  cy.get("[data-qa='submit']").click()
})

Then('the user should be redirected to a page that shows the newly created employee', () => {
  const name = `${employeeData.firstname} ${employeeData.middlename ? employeeData.middlename : ''} ${
    employeeData.lastname
  }`

  cy.get('[data-qa="employee-detail-title"]').should('have.text', name)
  cy.get('[data-qa="employee-detail-subtitle"]').should('have.text', 'Aug 22, 1953')
  cy.get('[data-qa="employee-detail-address"]').should('have.text', `Address: ${employeeData.address}`)
  cy.get('[data-qa="employee-detail-salary"]').should('have.text', `Salary: ${employeeData.salary.toString()}€`)
  cy.get('[data-qa="employee-detail-department"]').should('have.text', `Department: ${employeeData.department}`)
})
