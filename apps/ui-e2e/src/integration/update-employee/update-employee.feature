Feature: Update employee

  Scenario: Clicking on “Edit employee” will lead to the detailed view of the data from chosen employee. On the detailed page the data is editable, changes made will be saved and the page will return to previous site.
    Given the user is using the application
    And currently looks at an employee
    When the user clicks on the “Edit employee” button
    Then a popup should open filled with all the data of this employee
    And the user should be able to edit the data of the chosen employee
    When the user changes the salary
    Then the data should be updated
    And the data is valid
    When the user clicks the “Save” button
    Then the user will be redirected to the previous page
    And the data should be update
