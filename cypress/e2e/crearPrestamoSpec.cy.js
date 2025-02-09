describe('Exploration of the crearPrestamo component', () => {
  beforeEach(()=>{
    cy.visit('http://https://back-prest.onrender.com')
    cy.get('a.nav-link').contains('Entra').click()
    cy.get('input#form3Example3').type('testuser@gmail.com')
    cy.get('input#form3Example4').type('12345678')
    cy.get('button.btn.btn-primary.btn-lg.me-2').click()
    cy.get('a[href*="/infodeudor"]').contains('Información').first().click()
    cy.get('button').contains('Crear Préstamo').click()
    cy.wait(500)
  })

  it('Test links using button "volver"', () => {
    cy.url().should('eq', 'http://https://back-prest.onrender.com/crearPrestamo')
    cy.get('a').contains('Volver').click()
    cy.url().should('eq', 'http://https://back-prest.onrender.com/infodeudor')
  })

  it('Crear prestamo button disabled', () => {
    cy.get('button').contains('Crear Préstamo').should('be.disabled')
  })

  it('Crear prestamo button enabled', () => {
    cy.get('input#nombre-prestamo').type('Préstamo prueba')
    cy.get('input#monto-prestamo').type('100000')
    cy.get('input#dia-pago-prestamo').type('10')
    cy.get('input#cuotas-prestamo').type('10')
    cy.get('input#interes-prestamo').type('5')
    cy.get('input#valor-cuota').type('10000')
    cy.get('button').contains('Crear Préstamo').should('be.enabled')
  })

  it('Crear prestamo launchs modal', () => {
    cy.get('input#nombre-prestamo').type('Préstamo prueba')
    cy.get('input#monto-prestamo').type('100000')
    cy.get('input#dia-pago-prestamo').type('10')
    cy.get('input#cuotas-prestamo').type('10')
    cy.get('input#interes-prestamo').type('5')
    cy.get('input#valor-cuota').type('10000')
    cy.get('button').contains('Crear Préstamo').click()
    cy.get('div.modal-content').should('be.visible')
  })

  it('Crear pretamo modal shows correct data', () => {
    cy.get('input#nombre-prestamo').type('Préstamo prueba')
    cy.get('input#monto-prestamo').type('100000')
    cy.get('input#dia-pago-prestamo').type('10')
    cy.get('input#cuotas-prestamo').type('10')
    cy.get('input#interes-prestamo').type('5')
    cy.get('input#valor-cuota').type('10000')
    cy.get('button').contains('Crear Préstamo').click()
    cy.get('div.modal-content').should('be.visible')
    cy.get('div.modal-body').contains('Préstamo prueba').should('be.visible')
    cy.get('div.modal-body').contains('100000').should('be.visible')
    cy.get('div.modal-body').contains('10').should('be.visible')
    cy.get('div.modal-body').contains('10').should('be.visible')
    cy.get('div.modal-body').contains('5').should('be.visible')
    cy.get('div.modal-body').contains('10000').should('be.visible')
  })

  it('Confirming creation closes the prestamo modal', () => {
    cy.get('input#nombre-prestamo').type('Préstamo prueba')
    cy.get('input#monto-prestamo').type('100000')
    cy.get('input#dia-pago-prestamo').type('10')
    cy.get('input#cuotas-prestamo').type('10')
    cy.get('input#interes-prestamo').type('5')
    cy.get('input#valor-cuota').type('10000')
    cy.get('button').contains('Crear Préstamo').click()
    cy.get('div.modal-content').should('be.visible')
    cy.get('button').contains('Confirmar').click()
    cy.get('div.modal-content').should('not.exist')
  })


})