describe('Pruebas para DeudorDetalle', () => {
  beforeEach(() => {
    // Acceder al componente principal
    cy.visit('http://localhost:3000/pasarela', {
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

  it("Verificar que los componentes de las opciones de pago están presentes", () => {
    cy.contains('Debit or credit card').should('be.visible');
    cy.contains('Nequi').should('be.visible');
    cy.contains('PSE').should('be.visible');
  })
  it("Verificar que abre y cierra los modales de pago", () => {
    cy.get('button[aria-label="Open Payment"]').eq(0).click();
    cy.wait(500);
    cy.get('button[aria-label="Close"]').click();
    cy.wait(500);
    cy.get('button[aria-label="Open Payment"]').eq(1).click();
    cy.wait(500);
    cy.get('button[aria-label="Close"]').click();
    cy.wait(500);
    cy.get('button[aria-label="Open Payment"]').eq(2).click();
    cy.wait(500);
    cy.get('button[aria-label="Close"]').click();
  })
  it("Validar que el modal de T. Crédito permite ingresar datos correctamente y redirige al URL esperado", () => {
    cy.get('button[aria-label="Open Payment"]').eq(0).click();
    cy.get('input[aria-label="Interest"]').clear().type('12345');
    cy.get('input[aria-label="Principal"]').clear().type('10');
    cy.get('input[aria-label="Card Number"]').clear().type('0123456789111213');
    cy.get('select[aria-label="Select Month"]').select('11');
    cy.get('select[aria-label="Select Year"]').select('2026');
    cy.get('input[aria-label="CVV"]').clear().type('123');

    cy.contains('button', 'Save').click();
    cy.url().should('match', /\/visualizar-transacciones\/\d+$/);
  })
  it("Validar que el modal de Nequi permite ingresar datos correctamente y redirige al URL esperado", () => {
    cy.get('button[aria-label="Open Payment"]').eq(1).click();
    cy.get('input[aria-label="Interest"]').clear().type('12345');
    cy.get('input[aria-label="Principal"]').clear().type('10');
    cy.get('input[aria-label="Phone Number"').clear().type('3211235678')

    cy.contains('button', 'Save').click();
    cy.url().should('match', /\/visualizar-transacciones\/\d+$/);

  })
  it("Validar que el modal de PSE permite ingresar datos correctamente y redirige al URL esperado", () => {
    cy.get('button[aria-label="Open Payment"]').eq(2).click();
    cy.get('input[aria-label="Interest"]').clear().type('12345');
    cy.get('input[aria-label="Principal"]').clear().type('10');
    cy.get('input[aria-label="Full Name"').clear().type('Alfredo Benitez')
    cy.get('input[aria-label="Phone Number"').clear().type('3211235678')
    cy.get('input[aria-label="ID"]').clear().type('1234567');

    cy.contains('button', 'Save').click();
    cy.url().should('match', /\/visualizar-transacciones\/\d+$/);
  })
  it("Validar errores en el modal de T. Credito con datos inválidos", () => {
    cy.get('button[aria-label="Open Payment"]').eq(0).click();
    // input Interest,Principal no se va a llenar
    cy.get('input[aria-label="Card Number"]').clear().type('0123456789111213');
    cy.get('select[aria-label="Select Month"]').select('11');
    cy.get('select[aria-label="Select Year"]').select('2026');
    cy.get('input[aria-label="CVV"]').clear().type('123');

    cy.contains('button', 'Save').click();
    cy.contains('All fields are not complete').should('be.visible');
  })
  it("Validar errores en el modal de Nequi con datos inválidos", () => {
    cy.get('button[aria-label="Open Payment"]').eq(1).click();
    // el input Interest no se va a llenar
    cy.get('input[aria-label="Phone Number"').clear().type('3211235678')

    cy.contains('button', 'Save').click();
    cy.contains('All fields are not complete').should('be.visible');

  })
  it("Validar errores en el modal de PSE con datos inválidos", () => {
    cy.get('button[aria-label="Open Payment"]').eq(2).click();
    // el input Interest no se va a llenar
    cy.get('input[aria-label="Full Name"').clear().type('Alfredo Benitez')
    cy.get('input[aria-label="Phone Number"').clear().type('3211235678')
    cy.get('input[aria-label="ID"]').clear().type('1234567');

    cy.contains('button', 'Save').click();
    cy.contains('All fields are not complete').should('be.visible');
  })

});