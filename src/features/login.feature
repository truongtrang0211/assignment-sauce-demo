@smoke @login
Feature: Authentication & Inventory Display
  As a user of Swag Labs
  I want to log in securely
  So that I can view available products

  @negative
  Scenario Outline: Attempt login with invalid credentials
    Given the user is on the login page
    When the user logs in with username "<username>" and password "<password>"
    Then an error message "<error_message>" should be displayed

    Examples:
      | username        | password       | error_message                                                             |
      | locked_out_user | secret_sauce   | Epic sadface: Sorry, this user has been locked out.                       |
      | standard_user   | wrong_password | Epic sadface: Username and password do not match any user in this service |

  @positive
  Scenario: Successful login and inventory verification
    Given the user is on the login page
    When the user logs in with valid standard credentials
    Then the user should land on the inventory page
    And the product list should contain at least 1 item
    And every product should display a name, image, price, and add to cart button
