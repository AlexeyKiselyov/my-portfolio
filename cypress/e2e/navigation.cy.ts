describe('Navigation Flow', () => {
  it('should navigate through main pages', () => {
    // 1. Visit the home page
    cy.visit('/');
    
    // Check that we are on the home page (by greeting text)
    // Use #navbar selector to ensure we are checking the desktop menu
    cy.get('#navbar').contains('_hello').should('be.visible');

    // 2. Click on "about-me" in the menu
    cy.get('#navbar a[href="/about-me"]').click();
    
    // Check URL and presence of unique page content
    cy.url().should('include', '/about-me');
    // Use #section-content to search for text only in the desktop part
    // Look for 'professional-info' as it is the title of the first section in developer.json
    cy.get('#section-content').contains('professional-info').should('be.visible');

    // 3. Navigate to contacts
    cy.get('#navbar a[href="/contact-me"]').click();
    cy.url().should('include', '/contact-me');
    
    // Check for form presence
    cy.get('form').should('exist');
  });
});
