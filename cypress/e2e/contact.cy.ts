describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact-me');
  });

  it('should show validation errors for empty fields', () => {
    // Disable native browser validation (required) to test React validation
    cy.get('form').invoke('attr', 'novalidate', true);
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check that error messages appeared (invalid class or error text)
    // Your code uses aria-invalid
    cy.get('input[name="name"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should allow typing in fields', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="name"]').should('have.value', 'Test User');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="email"]').should('have.value', 'test@example.com');
  });
});
