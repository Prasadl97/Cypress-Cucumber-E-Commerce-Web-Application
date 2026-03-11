Feature: User Registration and Login

  @registration @login @smoke
  Scenario: Register, logout, and login with saved credentials
    Given I am on the home page
    When I register a new user with a dynamic email
    Then registration succeeds
    When I log out
    When I log in with the saved credentials
    Then I see my account dashboard
