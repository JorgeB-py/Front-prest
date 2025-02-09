describe('Pruebas para HU-2', () => {
    beforeEach(() => {
      // Acceder al componente principal
      cy.visit('http://https://back-prest.onrender.com/deudorApp', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'languages', {
            value: ['en-US'],
          });
          Object.defineProperty(win.navigator, 'language', {
            value: 'en-US',
          });
        }
      });
    });
    it("Verificar que el interés se puede editar y guardar",()=>{
        cy.contains('button','Edit info').click();
        cy.get('input[aria-label="Interest"]').clear().type('47');
        cy.contains('button','Save').click();
        cy.contains('47%').should('be.visible');
    })
    it("Verificar si muestra error si el interés está fuera del rango",()=>{
      cy.contains('button','Edit info').click();
      cy.get('input[aria-label="Interest"]').clear().type('300');
      cy.contains('button','Save').click();
      cy.contains('Interest must be between 0 and 100.').should('be.visible');
  })
});