Feature: Search Wikipedia
  Scenario: Find search results
    Given I skip the onboarding
    When I search for "BrowserStack"
    Then I should see search results
