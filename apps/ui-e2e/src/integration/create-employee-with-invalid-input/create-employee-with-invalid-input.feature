Feature: Create employee with invalid input

  Scenario: Clicking on “Add employee” and entering invalid data results in the creation of the employee fails with appropriate inline errors.
    Given the user is on the landing page of the application
    When the user clicks the create Employee button
    Then a modal page should popup
    And  the modal page has empty fields with titles
    Then the user fills out all the empty fields marked with a star icon with invalid data
    And the user clicks the “Save” button
    Then the data should be validated
    And the user should be presented with a validation error message
    And the user should remain on the modal page
