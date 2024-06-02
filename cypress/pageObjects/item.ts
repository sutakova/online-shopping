export class Item {
    //items
    static title = '[data-cy="title"]';
    static image = '[data-cy="image"]';
    static price = '[data-cy="price"]';
    static addToCartButton = '[data-cy="addToCartButton"]';

    //assertions
    static assertItem(): void {
        cy.get(this.image).should('be.visible');
        cy.get(this.title).should('be.visible');
        cy.get(this.price).should('be.visible');
        cy.get(this.addToCartButton).should('be.visible');
    }

    //integrations
    static addItemToCart(): void {
        cy.get(this.addToCartButton).click();
    }
}