@smoke @checkout
Feature: End-to-End Cart and Checkout Workflow
  As a customer
  I want to add products to the cart, manage items, and complete checkout
  So that I can successfully purchase my desired products

  Scenario: Complete purchase flow with item management and tax validation
    Given the user is logged in as standard user
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And the user navigates to the cart
    Then the cart should contain "Sauce Labs Backpack" and "Sauce Labs Bike Light"
    When the user removes "Sauce Labs Bike Light" from the cart
    Then the cart should only contain "Sauce Labs Backpack"
    When the user proceeds to checkout with details "John", "Doe", "12345"
    Then the checkout overview total must equal subtotal plus tax
    When the user finishes the checkout
    Then the order confirmation message should be displayed
