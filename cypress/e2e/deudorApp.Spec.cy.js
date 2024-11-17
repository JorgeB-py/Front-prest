describe('Exploration of the crearPrestamo component', () => {
    beforeEach(()=>{
      cy.visit('http://localhost:3000')
      cy.get('a.nav-link').contains('Entra').click()
      cy.get('input#form3Example3').type('testuser@gmail.com')
      cy.get('input#form3Example4').type('12345678')
      cy.get('button.btn.btn-primary.btn-lg.me-2').click()
      cy.get('a[href*="/infodeudor"]').contains('Información').first().click()
      cy.get('span.eye-button').first().click()
      cy.wait(500)
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