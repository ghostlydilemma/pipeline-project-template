import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is on the landing page of the application', () => cy.visit('/'))
