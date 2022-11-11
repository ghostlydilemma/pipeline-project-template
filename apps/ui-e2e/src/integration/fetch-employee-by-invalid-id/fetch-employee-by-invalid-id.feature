Feature: Fetch employee by invalid ID

  Scenario: Opening the detail view with the invalid ID INVALID should notify the user of the invalid employee ID
    Given the user has the browser open
    When the user opens the invalid ID INVALID
    Then the user should be notified of the invalid ID
