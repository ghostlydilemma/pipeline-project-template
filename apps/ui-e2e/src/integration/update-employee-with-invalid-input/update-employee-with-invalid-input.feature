Feature: Update employee with invalid input

  Scenario: Opening the employee, pressing “Edit Employee”, entering invalid data and pressing “Save” results in the update of the employee to fail with an inline notification.
    Given the user is using the application
    And currently looks at an employee
    When the user clicks on the “Edit employee” button
    Then a popup should open filled with all the data of this employee
    And the user should be able to edit the data of the chosen employee
    When the user changes the salary
    Then the data should be updated
    When the user clicks the “Save” button
    Then the data should be validated
    And the user should be presented with a validation error message
    And the user should remain on the modal page
