describe('Consultar Cliente', () => {
  // Antes de cada prueba, visitamos la página
  beforeEach(() => {
    cy.visit('http://localhost:3000/consultarcliente');
  });

  it('Debe cargar la página correctamente', () => {
    cy.contains('Consult Client'); // Verifica que el título esté presente
    cy.get('input#criterio').should('exist'); // Verifica que el campo de búsqueda esté presente
    cy.get('button').contains('Search Client').should('exist'); // Verifica que el botón de búsqueda esté presente
  });

  it('Debe mostrar un error cuando no se encuentra el cliente', () => {
    // Simula una búsqueda con un criterio inexistente
    cy.get('input#criterio').type('11111111111111111');
    cy.get('button').contains('Search Client').click();

    // Verifica que el mensaje de error se muestra
    cy.get('.alert-danger').should('be.visible')
      .and('contain.text', 'Client not found. Please check the entered data.');
  });

  it('Debe mostrar los detalles de un cliente cuando se encuentra', () => {
    // Simula la búsqueda de un cliente válido
    cy.get('input#criterio').type('1111111');
    cy.get('button').contains('Search Client').click();

    // Verifica que la información del cliente se muestra en la tabla
    cy.get('table').should('exist');
    cy.get('tbody').find('tr').should('have.length', 7); // Asegura que hay 7 campos
    cy.contains('1111111'); // Verifica que el nombre del cliente esté en la tabla
  });

  it('Debe mostrar todos los clientes cuando se presiona el botón "Consultar Todos"', () => {
    cy.get('button').contains('Consult All').click();

    // Verifica que se muestren todos los clientes en la tabla
    cy.get('table').should('exist');
    cy.get('tbody').find('tr').should('have.length.greaterThan', 1); // Verifica que hay más de un cliente
  });


  it('Debe permitir regresar al menú de deudores', () => {
    cy.get('a').contains('Back to Main Menu').should('have.attr', 'href', '/deudores');
  });

  it('Debe mostrar la tabla de clientes cuando no se está buscando un cliente específico', () => {
    // Simula la búsqueda de todos los clientes
    cy.get('button').contains('Consult All').click();

    // Verifica que la tabla con todos los clientes se muestra correctamente
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.greaterThan', 1); // Verifica que hay más de un cliente en la tabla
  });

  it('Debe limpiar la búsqueda al presionar "Consultar Todos"', () => {
    // Simula la búsqueda de un cliente
    cy.get('input#criterio').type('1111111');
    cy.get('button').contains('Search Client').click();

    // Verifica que se muestra el cliente
    cy.contains('1111111');

    // Ahora simula la búsqueda de todos los clientes
    cy.get('button').contains('Consult All').click();

    // Verifica que la tabla de todos los clientes se muestra
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.greaterThan', 1); // Verifica que hay más de un cliente en la tabla
  });
});
