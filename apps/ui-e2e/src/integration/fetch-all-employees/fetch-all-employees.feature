Feature: Fetch all employees

  Scenario: Opening the application should load all employees in a simple to access table that can be browsed easily
    Given the user has the browser open
    When the user navigates to the application
    Then the user should be presented a browsable table view
    And the table contains information of all the employees
