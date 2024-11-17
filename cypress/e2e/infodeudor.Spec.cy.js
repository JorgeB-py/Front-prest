describe('Pruebas para DeudorDetalle', () => {
    beforeEach(() => {
      // Acceder al componente principal
      cy.visit('http://localhost:3000/infodeudor');
    });
  
    it('Debe cargar los datos iniciales del deudor correctamente', () => {
      // Verificar el nombre del deudor
      cy.contains('Armando Casas').should('exist');
      
      // Validar información personal
      cy.contains('C.C. 1110450340').should('exist');
      cy.contains('Edad: 24').should('exist');
      cy.contains('hola@gmail.com').should('exist');
      cy.contains('3143807270').should('exist');
      
      // Validar estado laboral
      cy.contains('Empleado').should('exist');
  
      // Validar deudas
      cy.contains('Estudios').should('exist');
      cy.contains('200000').should('exist');
      cy.contains('Carro').should('exist');
      cy.contains('100000').should('exist');
    });
    it('Debe mostrar los íconos correctos en la información rápida', () => {
        cy.get('.custom-container .bi-currency-dollar').should('exist');
        cy.get('.custom-container .bi-star').should('exist');
        cy.get('.custom-container .bi-briefcase').should('exist');
      });
  
    it('Debe permitir editar la información del deudor', () => {
      // Abrir modal de edición
      cy.get('.bi-pencil-square').click();
      cy.get('.modal-title').should('contain', 'Editar información');
  
      // Editar campos del formulario
      cy.get('input').eq(0).clear().type('Nuevo Nombre');
      cy.get('input').eq(1).clear().type('123456789');
      cy.get('input').eq(2).clear().type('Desempleado');
      cy.get('input').eq(3).clear().type('30');
      cy.get('input').eq(4).clear().type('3216549870');
      cy.get('input').eq(5).clear().type('nuevoemail@gmail.com');
  
      // Guardar cambios
      cy.contains('Guardar').click();
  
      // Validar cambios en el componente
      cy.contains('Nuevo Nombre').should('exist');
      cy.contains('123456789').should('exist');
      cy.contains('Desempleado').should('exist');
      cy.contains('Edad: 30').should('exist');
      cy.contains('3216549870').should('exist');
      cy.contains('nuevoemail@gmail.com').should('exist');
    });
  
    it('Debe navegar correctamente al detalle de las deudas', () => {
      // Clic en el ícono de "ojo" en una deuda
      cy.get('.bi-eye').first().click();
  
      // Verificar que la navegación sea correcta (ajusta según tu ruta específica)
      cy.url().should('include', '/deudorApp');
    });
  
    it('Debe permitir navegar a la página de creación de préstamos', () => {
      // Clic en el botón "Crear Préstamo"
      cy.contains('Crear Préstamo').click();
  
      // Verificar navegación a la página de préstamos
      cy.url().should('include', '/crearPrestamo');
    });
  });
  