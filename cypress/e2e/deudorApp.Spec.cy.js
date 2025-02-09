describe('Exploration of the crearPrestamo component', () => {
    beforeEach(()=>{
      cy.visit('${apiurl}/deudorApp')
    })

    it('Añadir pago y confirmar cambio intereses y capital', () => {
      cy.get('button').contains('Añadir pago').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('input[aria-label="Capital"]').type(3000)
      cy.get('input[aria-label="Interest"]').type(1000)
      cy.get('input[aria-label="Total Payment"]').should('have.value', 4000)
      cy.get('div.modal-content')
        .contains('button', 'Añadir pago')
        .click();
      cy.get('div.modal-content').should('not.exist')
    })

    it('Cerrar prestamo button is enabled if balance equals 0', () => {
      cy.get('button').contains('Cerrar Préstamo').should('be.enabled')
    })

    it('Cerrar prestamo button invokes the confirmation modal', () => {
      cy.get('button').contains('Cerrar Préstamo').click()
      cy.get('div.modal-content').should('be.visible')
    })

    it('Confirmation modal contains paz y salvo button', () => {
      cy.get('button').contains('Cerrar Préstamo').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('button').contains('Generar paz y salvo').should('be.visible')
    })

    it('Confirmation modal closes when generar paz y salvo button is pressed', () => {
      cy.get('button').contains('Cerrar Préstamo').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('button').contains('Generar paz y salvo').should('be.visible').click()
      cy.get('div.modal-content').should('not.exist')
    })

    it('Confirmation modal closes when cancel button is pressed', () => {
      cy.get('button').contains('Cerrar Préstamo').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('button.btn-close').should('be.visible').click()
      cy.get('div.modal-content').should('not.exist')
    })

    it('Descargar historial prestamo button is visible and enabled', () => {
      cy.get('button').contains('Descargar Historial').should('be.visible').should('be.enabled')
    })

    it('Descargar historial prestamo button invokes the confirmation modal', () => {
      cy.get('button').contains('Descargar Historial').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('div.modal-title.h4').should('be.visible')
    })

    it('Confirmation modal closes when cerrar button is pressed', () => {
      cy.get('button').contains('Descargar Historial').click()
      cy.get('div.modal-content').should('be.visible')
      cy.get('button.btn.buttom-general.btn-primary').contains('Cerrar').should('be.visible')
      cy.get('div.fade.modal.show').click('bottomRight')
      cy.get('div.modal-content').should('not.exist')
    })
})