describe('deudores spec', () => {
  it('Probar botón información', () => {
    cy.visit('http://localhost:3000/deudores')
    cy.wait(4000);
    cy.get('a.btn.btn-primary').contains("Información").click()
    cy.url().should('include', '/infodeudor')
  })
  it('La página carga correctamente', ()=>{
    cy.visit('http://localhost:3000/deudores')
    cy.get('h1').should('contain', 'Bienvenido, Jorge')
    cy.get('h3').should('contain', 'Este mes has ganado')
    cy.wait(4000);
    cy.get('div.card-body').should('contain', 'Información')
    cy.get('div.card-body').should('contain', 'Modificado:')
  })
  it('Cuando se da click a la imagen no pasa nada', ()=>{
    cy.visit('http://localhost:3000/deudores')
    cy.wait(4000)
    cy.get('img.card-img-top').first().click()
    cy.url().should('include', "/deudores")
  })
  it('Visitar crear cliente desde deudores', ()=>{
    cy.visit('http://localhost:3000/deudores')
    cy.wait(4000)
    cy.get('a.nav-link.custom-links').contains('Crear Deudor').click()
    cy.url().should('include', "/crearcliente")
  })
  it('Visitar consultar deudor desde deudores',()=>{
    cy.visit('http://localhost:3000/deudores')
    cy.get('a.nav-link.custom-links').contains('Consultar Deudor').click()
    cy.url().should('include', '/consultarcliente')
  })

})