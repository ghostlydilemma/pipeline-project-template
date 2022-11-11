Feature: Get employment statistics by department and daterange

  Scenario: Clicking on the “Management Statistics” button opens a popup showing how many people were onboarded and left the company in a given timeframe
    Given the user is using the application
    And is on the main screen
    When the user clicks on the “Management Statistics” button
    Then a pop up window should open
    And the user should be presented with statistics of how many people were onboarded and left the company in a given timeframe from a given department
