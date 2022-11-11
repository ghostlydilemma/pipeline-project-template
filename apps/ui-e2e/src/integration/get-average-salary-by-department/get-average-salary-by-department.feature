Feature: Get average salary

  Scenario: Clicking on the “Get Average Salary” button opens a popup showing average salary throughout the entire company
    Given the user is using the application
    And is on the main screen
    When the user clicks on the “Get Average Salary” button
    Then a pop up window should open
    When the user selects a department
    Then the user should be presented with a statistic of the average salary throughout the selected department
