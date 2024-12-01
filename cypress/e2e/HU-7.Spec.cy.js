describe('Pruebas para DeudorDetalle', () => {
	const findDateInCalendar = (beforeButton, dateObj) => {
		cy.get('.title-calendar').invoke('text').then((text) => { // Obtener el texto de .title-calendar
			if (text === `${dateObj.month} ${dateObj.year}`) { // Comprabar si es el mes-año escogido
				cy.contains('button', dateObj.day).click(); // Seleccionar el dia
			}
			else {
				beforeButton.click(); //Devolvernos un mes
				findDateInCalendar(beforeButton, dateObj); // Volver a buscar
			}
		})
	}


	beforeEach(() => {
		// Acceder al componente principal
		cy.visit('http://localhost:3000/deudorApp', {
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
	it("Verificar que el las fechas de inicio, caducidad y la frecuencia de pago se puede editar y guardar", () => {
		cy.contains('button', 'Edit info').click();
		const startDate = cy.get('button[aria-label="Select a date"]').eq(0)
		const dueDate = cy.get('button[aria-label="Select a date"]').eq(1)
		let date;

		startDate.click();
		date = { day: "10", month: "January", year: "2024" }
		findDateInCalendar(cy.get('button[aria-label="Before"]').click(), date);
		startDate.click();

		dueDate.click();
		date = { day: "15", month: "June", year: "2024" }
		findDateInCalendar(cy.get('button[aria-label="Before"]').click(), date);
		dueDate.click();

		cy.get('select[aria-label="Payment Frequency"').select('Biweekly')
		cy.contains('button', 'Save').click();

		// Comprabar los datos
		cy.contains('January 10, 2024').should('be.visible');
		cy.contains('June 15, 2024').should('be.visible');
		cy.contains('Biweekly').should('be.visible');
	})

	it("Verificar error en fechas incoherentes de inicio y vencimiento", () => {
		cy.contains('button', 'Edit info').click();
		const startDate = cy.get('button[aria-label="Select a date"]').eq(0)
		const dueDate = cy.get('button[aria-label="Select a date"]').eq(1)
		let date;

		startDate.click();
		date = { day: "15", month: "June", year: "2024" }
		findDateInCalendar(cy.get('button[aria-label="Before"]').click(), date);
		startDate.click();
		
		dueDate.click();
		date = { day: "10", month: "January", year: "2024" }
		findDateInCalendar(cy.get('button[aria-label="Before"]').click(), date);
		dueDate.click();

		cy.contains('button', 'Save').click();

		cy.contains('Start and Due Dates must be consistent.').should('be.visible');
	})
});