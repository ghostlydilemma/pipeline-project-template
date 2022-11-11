Feature: Fetch employee by ID

  Scenario: Selecting an employee out of the list should load a detail view for the selected employee
    Given the user is on the landing page of the application
    When the user selects the employee Denisse Donald Cobb out of the list
    Then the user should be redirected to a detailed view of the employee with the corresponding id
