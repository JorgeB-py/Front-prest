describe('deudores spec', () => {
  it('La página carga correctamente', ()=>{
    cy.visit('http://https://back-prest.onrender.com/deudores')
    cy.get('h1').should('contain', 'Bienvenido, Jorge')
    cy.get('h3').should('contain', 'Este mes has ganado')
    cy.wait(4000);
    cy.get('h3').should('contain', 'Este mes has ganado')
    cy.get('h2').should('contain', '$0')
  })
  it('Cuando se da click a la imagen no pasa nada', ()=>{
    cy.visit('http://https://back-prest.onrender.com/deudores')
    cy.wait(4000)
    cy.url().should('include', "/deudores")
  })
  it('Visitar crear cliente desde deudores', ()=>{
    cy.visit('http://https://back-prest.onrender.com/deudores')
    cy.wait(4000)
    cy.get('a.nav-link.custom-links').contains('Crear Deudor').click()
    cy.url().should('include', "/crearcliente")
  })
  it('Visitar consultar cliente desde deudores', ()=>{
    cy.visit('http://https://back-prest.onrender.com/deudores')
    cy.wait(4000)
    cy.get('a.nav-link.custom-links').contains('Consultar Deudor').click()
    cy.url().should('include', "/consultarcliente")
  })
  it('Buscar deudor', ()=>{
    cy.visit('http://https://back-prest.onrender.com/deudores')
    cy.wait(4000)
    cy.get('input').type('Jorge')
    cy.get('body') 
      .invoke('text') 
      .then((pageText) => {
        expect(pageText).to.include('Jorge');
      });
  })

})