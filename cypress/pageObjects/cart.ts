export class Cart {
    //elements

    //items
    static item = '[data-cy="item"]';
    static itemTitle = '[data-cy="itemTitle"]';
    static itemImage = '[data-cy="itemImage"]';
    static itemPrice = '[data-cy="itemPrice"]';
    static itemCount = '[data-cy="itemCount"]';
    static itemPlusButton = '[data-cy="itemPlusButton"]';
    static itemMinusButton = '[data-cy="itemMinusButton"]';
    static itemRemoveButton = '[data-cy="itemRemoveButton"]';

    static totalAmmount = '[data-cy="totalAmmount"]';

    static checkoutButton = '[data-cy="checkoutButton"]';

    //assertions

    static assertItemInCart(): void {
        //checks only first item, since all items should have same structure
        cy.get(this.item).first().within(() => {
            cy.get(this.itemImage).should('be.visible');
            cy.get(this.itemTitle).should('be.visible');
            cy.get(this.itemPrice).should('be.visible');
            cy.get(this.itemCount).should('be.visible');
            cy.get(this.itemMinusButton).should('be.visible');
            cy.get(this.itemPlusButton).should('be.visible');
            cy.get(this.itemRemoveButton).should('be.visible');
        })
    }

    static assertItemInCartByTitle(title: string): void {
        cy.get(this.item).within(() => {
            cy.get(this.itemImage).should('be.visible');
            cy.get(this.itemTitle).should('eq', title);
            cy.get(this.itemPrice).should('be.visible');
            cy.get(this.itemCount).should('be.visible');
            cy.get(this.itemMinusButton).should('be.visible');
            cy.get(this.itemPlusButton).should('be.visible');
            cy.get(this.itemRemoveButton).should('be.visible');
        })
    }

    static assertCartIsEmpty(): void {
        cy.get(this.item).should('not.exist');
    }

    static assertTotalAmmount(ammount: number): void {
        cy.get(this.totalAmmount).should('eq', ammount);
    }

    //integrations
    static changeItemCount(sign: string): void {
        cy.get(this.item).first().within(() => {
            cy.get(this[`item${sign}Button`]).click();
        })
    }

    static removeItemFromCart(): void {
        cy.get(this.item).first().within(() => {
            cy.get(this.itemRemoveButton).click();
        })
    }

    static checkout(): void {
        cy.get(this.checkoutButton).click();
    }
}
