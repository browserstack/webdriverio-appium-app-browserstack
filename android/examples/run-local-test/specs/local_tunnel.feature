Feature: BrowserStack Local Testing
  Scenario: Verify local tunnel connection
    Given I start the BrowserStack Local tunnel test
    When I tap the test action button
    And I wait for the connection status to appear
    Then the connection status should show wifi and up and running
