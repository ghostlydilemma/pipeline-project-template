Feature: Soft delete employee

  Scenario: Opening the employee and pressing on “Remove Employee” will result in the employee to be set to inactive and the date of today to be logged as end of employment.
    Given the user is using the application
    And currently looks at an employee
    When the user clicks on the “Unemploy” button
    Then the user should be presented with a warning dialog if the employee should be removed
    And the user should have the option to accept or reject the warning
    When the user clicks on the "Unemploy employee" button
    Then the user will be redirected to the previous page
    And the employee will be unemployed


