import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeudorApp from '../deudorApp';  // Importa tu componente
import '@testing-library/jest-dom';  // Para las aserciones de jest-dom
import { IntlProvider } from 'react-intl'; // Importar para la internacionalización
import messages_en from '../local/en.json';

const messages = {
  es: messages_en,
};
const language = 'en';

describe('DeudorApp', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <IntlProvider locale={language} messages={messages[language]}>
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
  test('Debe cargar los datos iniciales del deudor correctamente', async () => {
    expect(screen.getByText("Joseph")).toBeInTheDocument();
    expect(screen.getByText("$ 100,000")).toBeInTheDocument();
    expect(screen.getByText("5%")).toBeInTheDocument();
  });
  
  test('Debe mostrar un historial de pagos vacío al inicio', () => {
    expect(screen.getByText("Recents")).toBeInTheDocument();
    expect(screen.queryByText("2024-11-19")).not.toBeInTheDocument();
  });

  test('Debe actualizar el balance después de agregar un pago', () => {
    fireEvent.click(screen.getByText("Add payment"));
  
    fireEvent.change(screen.getByLabelText("Capital"), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText("Interest"), { target: { value: '50' } });
    
    fireEvent.click(screen.getByText("Add"));
  
    // Verificar que el balance haya cambiado
    expect(screen.getByText("$1,000")).toBeInTheDocument();
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
