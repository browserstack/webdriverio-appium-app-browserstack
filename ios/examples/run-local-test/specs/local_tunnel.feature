Feature: BrowserStack Local Testing
  Scenario: Verify local tunnel connection
    When I tap the element with accessibility id "Test BrowserStackLocal connection"
    And I wait for the element with accessibility id "ResultBrowserStackLocal"
    Then the result should show "Up and running"
