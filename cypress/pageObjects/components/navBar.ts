export class NavBar {
    //elements
    static navBar = '[data-cy="navBar"]'
    static cartIcon = '[data-cy="cartIcon"]';

    //assertions
    static assertNavBar(): void {
        cy.get(this.navBar).should('be.visible');
        cy.get(this.cartIcon).should('be.visible');
    }

    //integrations
    static goToCart(): void {
        cy.get(this.cartIcon).click();
    }
}