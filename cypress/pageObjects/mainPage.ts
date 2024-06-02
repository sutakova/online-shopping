export class MainPage {
    //items
    static item = '[data-cy="item"]';
    static itemTitle = '[data-cy="itemTitle"]';
    static itemImage = '[data-cy="itemImage"]';
    static itemPrice = '[data-cy="itemPrice"]';
    static itemAddToCartButton = '[data-cy="itemAddToCartButton"]';

    //search
    static searchInput = '[data-cy="searchInput"]';
    static searchButton = '[data-cy="searchButton"]';

    //assertions
    static assertSearch(): void {
        cy.get(this.searchButton).should('be.visible');
        cy.get(this.searchInput).should('be.visible');
    }

    static assertItem(): void {
        //checks only first item, since all items should have same structure
        cy.get(this.item).first().within(() => {
            cy.get(this.itemImage).should('be.visible');
            cy.get(this.itemTitle).should('be.visible');
            cy.get(this.itemPrice).should('be.visible');
        })
    }

    static assertNoData(): void {
        cy.get(this.item).should('not.exist');
    }

    //checks search items
    static assertItemByName(text: string): void {
        cy.get(this.item).within(() => {
            cy.get(this.itemTitle).invoke('text').should('eq', text);
            cy.get(this.itemImage).should('be.visible');
            cy.get(this.itemPrice).should('be.visible');
        })
    }

    //integrations
    static addItemToCartByTitle(title: string): void {
        cy.contains(this.itemTitle, title).within(() => {
            cy.get(this.itemAddToCartButton).click();
        })
    }

    static searchItem(item: string): void {
        cy.get(this.searchInput).type(`${item}`);
        cy.get(this.searchButton).click();
    }

    static ckickOnItemByTitle(title: string): void {
        cy.contains(this.itemTitle, title).click();
    }
}