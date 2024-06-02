import { UrlPaths } from "../support/enums";
import { Cart } from "../pageObjects/cart";
import { Item } from "../pageObjects/item";
import { MainPage } from "../pageObjects/mainPage";
import { NavBar } from "../pageObjects/components/navBar";
import { Notification } from "../pageObjects/components/notification";
import 'cypress-each';

const validInput = 'valid';
const invalidInput = 'invalid';
const itemTitle = 'title';
const itemPrice = 100;

describe('Shopping cart tests', () => {
  beforeEach(() => {
    cy.visit(UrlPaths.MainPage);
  });

  it.each([validInput, invalidInput])(
    tData => `Check search results with ${tData} input`,
    test => {
      //using intercept to stub out a search response body using a fixture
      cy.intercept('GET', `/${UrlPaths.MainPage}/search=${test}`, (req) => {
        req.reply({
          statusCode: 200, // default
          fixture: `itemSearch${test}.json`
        })
      })

      MainPage.assertSearch();
      MainPage.searchItem(test);
      cy.url().should('eq', `http://localhost:8000/${UrlPaths.MainPage}/search=${test}`)

      if (test == validInput) {
        MainPage.assertItemByName(test);
      } else {
        MainPage.assertNoData();
      }
    },
  );

  it('Verify that the user can add item to the cart.', () => {
    MainPage.assertItem();
    MainPage.addItemToCartByTitle(itemTitle);
    Notification.assertNotification(`Item ${itemTitle} added to cart.`);
    NavBar.goToCart();
    cy.url().should('eq', `http://localhost:8000/${UrlPaths.Cart}`)
    Cart.assertItemInCartByTitle(itemTitle);
    Cart.assertTotalAmmount(itemPrice);
  });

  it('Verify that the user can delete one or more products from the cart.', () => {
    MainPage.addItemToCartByTitle(itemTitle);
    Notification.assertNotification(`Item ${itemTitle} added to cart.`);
    NavBar.goToCart();
    cy.url().should('eq', `http://localhost:8000/${UrlPaths.Cart}`)
    Cart.assertItemInCartByTitle(itemTitle);
    Cart.removeItemFromCart();
    Notification.assertNotification(`Item ${itemTitle} removed from cart.`);
    Cart.assertCartIsEmpty();
    Cart.assertTotalAmmount(0);
  });

  it('Verify that the user can proceed to checkout from non-empty shopping cart with one or more items.', () => {
    MainPage.addItemToCartByTitle(itemTitle);
    Notification.assertNotification(`Item ${itemTitle} added to cart.`);
    NavBar.goToCart();
    Cart.assertItemInCartByTitle(itemTitle);
    Cart.checkout();
    cy.url().should('eq', `http://localhost:8000/${UrlPaths.Checkout}`)
  });

  it('Verify that the user can view the item page.', () => {
    MainPage.ckickOnItemByTitle(itemTitle);
    cy.url().should('eq', `http://localhost:8000/${UrlPaths.Item}`)
    Item.assertItem();
  });
});


