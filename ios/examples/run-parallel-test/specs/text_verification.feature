Feature: Text Verification
  Scenario: Match displayed text with input
    When I tap the text button
    And I enter "hello@browserstack.com" in the text input
    Then the text output should show "hello@browserstack.com"
