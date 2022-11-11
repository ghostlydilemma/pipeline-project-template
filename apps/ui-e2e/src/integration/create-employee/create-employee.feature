Feature: Create employee

  Scenario: Clicking on “Add employee” should create an employee and reload the page to show the newly created employee
    Given the user is on the landing page of the application
    When the user clicks the Create Employee button
    Then a modal page should popup
    And  the modal page has empty fields
    Then the user enters the firstname Ashley
    And  the user enters the middlename Susan
    And  the user enters the lastname Boston
    And  the user enters the address 909 Hampton Meadows
    And  the user enters the date of birth 22/08/1953
    And  the user enters the salary 3500€
    And  the user selects department Testing
    Then the data should be validated
    Then the user clicks the “Save” button
    And  the user should be redirected to a page that shows the newly created employee
