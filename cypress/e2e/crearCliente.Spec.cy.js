describe('Register New Client Form', () => {
    beforeEach(() => {
      // Visitar la página del formulario
      cy.visit('${apiurl}/crearcliente'); // Cambia esta ruta según corresponda
    });
  
    it('should render all form fields correctly', () => {
      // Verificar que todos los campos del formulario existan
      cy.get('input[placeholder="Ingresa el nombre del cliente"]').should('exist');
      cy.get('input[placeholder="Ingresa el número de identificación"]').should('exist');
      cy.get('input[placeholder="Ingresa los ingresos mensuales"]').should('exist');
      cy.get('input[placeholder="Ingresa la ocupación del cliente"]').should('exist');
      cy.get('input[placeholder="Ingresa la dirección del cliente"]').should('exist');
      cy.get('input[placeholder="Ingresa el teléfono del cliente"]').should('exist');
      cy.get('input[placeholder="Ingresa el correo electrónico"]').should('exist');
      cy.get('input[type="file"]').should('exist');
      cy.get('button.btn.buttom-general.btn.btn-primary').contains('Registrar Cliente').should('exist');
      cy.get('a.btn.buttom-regresar.float-end').contains('Regresar al Menú Principal').should('exist');
    });
  
    it('should allow filling and submitting the form', () => {
      // Rellenar los campos del formulario
      cy.get('input[placeholder="Ingresa el nombre del cliente"]').type('John Doe');
      cy.get('input[placeholder="Ingresa el número de identificación"]').type('123456789');
      cy.get('input[placeholder="Ingresa los ingresos mensuales"]').type('5000');
      cy.get('input[placeholder="Ingresa la ocupación del cliente"]').type('Engineer');
      cy.get('input[placeholder="Ingresa la dirección del cliente"]').type('123 Main St');
      cy.get('input[placeholder="Ingresa el teléfono del cliente"]').type('5551234');
      cy.get('input[placeholder="Ingresa el correo electrónico"]').type('john.doe@example.com');
      // Simular clic en el botón "Register Client"
      cy.get('button.btn.buttom-general.btn.btn-primary').contains('Registrar Cliente').click();
  
      // Verificar el comportamiento esperado (cambiar según tu aplicación)
      cy.get('p.mensaje-exito').contains('Cliente registrado con éxito') // Suponiendo que redirige a una página de éxito
    });

    it('número de teléfono erroneo', () => {
        // Rellenar los campos del formulario
        cy.get('input[placeholder="Ingresa el nombre del cliente"]').type('John Doe');
        cy.get('input[placeholder="Ingresa el número de identificación"]').type('123456789');
        cy.get('input[placeholder="Ingresa los ingresos mensuales"]').type('5000');
        cy.get('input[placeholder="Ingresa la ocupación del cliente"]').type('Engineer');
        cy.get('input[placeholder="Ingresa la dirección del cliente"]').type('123 Main St');
        cy.get('input[placeholder="Ingresa el teléfono del cliente"]').type('555-1234');
        cy.get('input[placeholder="Ingresa el correo electrónico"]').type('john.doe@example.com');
        // Simular clic en el botón "Register Client"
        cy.get('button.btn.buttom-general.btn.btn-primary').contains('Registrar Cliente').click();
    
        // Verificar el comportamiento esperado (cambiar según tu aplicación)
        cy.get('p.mensaje-error').contains('El número de teléfono solo debe contener dígitos.') // Suponiendo que redirige a una página de éxito
      });

      it('ID de cliente erroneo', () => {
        // Rellenar los campos del formulario
        cy.get('input[placeholder="Ingresa el nombre del cliente"]').type('John Doe');
        cy.get('input[placeholder="Ingresa el número de identificación"]').type('123456789-');
        cy.get('input[placeholder="Ingresa los ingresos mensuales"]').type('5000');
        cy.get('input[placeholder="Ingresa la ocupación del cliente"]').type('Engineer');
        cy.get('input[placeholder="Ingresa la dirección del cliente"]').type('123 Main St');
        cy.get('input[placeholder="Ingresa el teléfono del cliente"]').type('5551234');
        cy.get('input[placeholder="Ingresa el correo electrónico"]').type('john.doe@example.com');
        // Simular clic en el botón "Register Client"
        cy.get('button.btn.buttom-general.btn.btn-primary').contains('Registrar Cliente').click();
    
        // Verificar el comportamiento esperado (cambiar según tu aplicación)
        cy.get('p.mensaje-error').contains('El número de identificación solo debe contener dígitos.') // Suponiendo que redirige a una página de éxito
      });
  
    it('should return to the main menu when clicking "Go Back to Main Menu"', () => {
      // Simular clic en "Go Back to Main Menu"
      cy.get('a.btn.buttom-regresar.float-end').contains('Regresar al Menú Principal').click();
  
      // Verificar que redirige a la página principal
      cy.url().should('include', '/deudores'); // Cambiar la URL esperada
    });
  });
  