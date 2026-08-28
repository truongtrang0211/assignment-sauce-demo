@smoke @inventory
Feature: Product Sorting Functionality
  As a shopper
  I want to sort products by name and price
  So that I can easily find the items I want to buy

  Background:
    Given the user is logged in as standard user

  Scenario Outline: Verify product sorting options
    When the user sorts products by "<option_value>"
    Then products should be ordered according to "<sort_criteria>"

    Examples:
      | option_value | sort_criteria       |
      | az           | Name (A to Z)       |
      | za           | Name (Z to A)       |
      | lohi         | Price (low to high) |
      | hilo         | Price (high to low) |
