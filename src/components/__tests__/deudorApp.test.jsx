import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeudorApp from '../deudorApp';  // Importa tu componente
import '@testing-library/jest-dom';  // Para las aserciones de jest-dom
import { IntlProvider } from 'react-intl'; // Importar para la internacionalización

// Definir un idioma de prueba (puedes añadir más si es necesario)
const messages = {
  "app.Deudores": "Deudores",
  "app.MiDinero": "My Money",
  "app.recents": "Recents",
  "app.addPayment": "Add payment",
  "app.capital": "Capital",
  "app.interest": "Interest",
  "app.totalPayment": "Total Payment",
  "app.cancel": "Cancel",
  "app.save": "Save",
  "app.editInfo": "Edit Info",
  "app.startDate": "Start Date",
  "app.dueDate": "Due Date",
  "app.newLoan": "Total Loan",
  "app.newInterest": "Interest",
  "app.paymentFrequency": "Payment Frequency",
  "app.Semanal": "Weekly",
  "app.Quincenal": "Biweekly",
  "app.Mensual": "Monthly",
  "app.November": "November"
};

describe('DeudorApp', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <IntlProvider locale="en" messages={messages.en}>
                    <DeudorApp />
                </IntlProvider>
            </MemoryRouter>
        );
    });
  test('Debe renderizar correctamente el componente', () => {
    
    
    // Verificar que los textos clave se rendericen
    expect(screen.getByText("Deudores")).toBeInTheDocument();
    expect(screen.getByText("Recents")).toBeInTheDocument();
  });

  test('Abrir y cerrar el modal de pago', () => {
    

    // Hacer click en el botón de "Add payment"
    fireEvent.click(screen.getByText("Add payment"));

    // Verificar que el modal se haya abierto
    expect(screen.getByText("Add")).toBeInTheDocument();

    // Cerrar el modal
    fireEvent.click(screen.getByText("Cancel"));

    // Verificar que el modal se haya cerrado
    expect(screen.queryByText("modal-header")).not.toBeInTheDocument();
  });

  test('Agregar un nuevo pago y actualizar historial', async () => {

    // Abre el modal de pago
    fireEvent.click(screen.getByText("Add payment"));

    // Cambiar los valores de capital e interés
    fireEvent.change(screen.getByLabelText("Capital"), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText("Interest"), { target: { value: '10' } });

    // Verificar que el totalPayment se actualice correctamente
    expect(screen.getByDisplayValue(110)).toBeInTheDocument();

    // Agregar el pago
    fireEvent.click(screen.getByText("Add payment"));
  });

  test('Modificar el interés del deudor', async () => {
    

    // Abrir el modal para modificar el interés
    fireEvent.click(screen.getByText("Edit"));

    // Cambiar el valor del interés
    fireEvent.change(screen.getByLabelText("Interest"), { target: { value: '10' } });

    // Guardar cambios
    fireEvent.click(screen.getByText("Save"));

    // Verificar que el nuevo interés se haya guardado correctamente
    await waitFor(() => {
      expect(screen.queryByLabelText("Interest").value).toBe('10');
    });
  });
});
