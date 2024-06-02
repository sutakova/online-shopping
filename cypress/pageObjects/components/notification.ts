export class Notification {
    //elements
    static notification = '[data-cy="notofication"]'
    static notificationMessage = '[data-cy="notificationMessage"]';

    //assertions
    static assertNotification(text: string): void {
        cy.get(this.notification).should('be.visible');
        cy.get(this.notificationMessage).invoke('text').should('eq', text);
    }
}