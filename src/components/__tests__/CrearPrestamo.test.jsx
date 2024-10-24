import { render, screen } from "@testing-library/react";
import { fireEvent, waitFor } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from 'react-router-dom';  
import messages_es from '../local/es.json';
import CrearPrestamo from "../crearPrestamo";


const messages = {
    'es': messages_es,
};

const language = 'es';

test('Display correct placeholder for loan name input', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    
    const placeholderText = 'Nombre del préstamo';
    const loanNameInput = screen.getByPlaceholderText(placeholderText);
    expect(loanNameInput).toBeInTheDocument();
});

test('Display correct placeholder for loan amount input', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const placeholderText = 'Monto total del préstamo';
    const loanAmountInput = screen.getByPlaceholderText(placeholderText);
    expect(loanAmountInput).toBeInTheDocument();
});

test('Display correct placeholder for loan payment date', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const placeholderText = 'Día del mes a pagar'
    const loanPaymentDateInput = screen.getByPlaceholderText(placeholderText);
    expect(loanPaymentDateInput).toBeInTheDocument();
});

test('Display correct placeholder for number of installments input', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const placeholderText = 'Número de cuotas';
    const installmentsInput = screen.getByPlaceholderText(placeholderText);
    expect(installmentsInput).toBeInTheDocument();
});

test('Display correct placeholder for loan interest input', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const placeholderText = 'Tasa de interés';
    const loanInterestInput = screen.getByPlaceholderText(placeholderText);
    expect(loanInterestInput).toBeInTheDocument();
});

test('Display correct placeholder for value of installment', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const placeholderText = 'Valor de cada cuota';
    const installmentValueInput = screen.getByPlaceholderText(placeholderText);
    expect(installmentValueInput).toBeInTheDocument();
});

test('Display correct button text', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const buttonText = 'Crear Préstamo';
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
});

test('Fieds should be empty by default', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const loanNameInput = screen.getByPlaceholderText('Nombre del préstamo');
    const loanAmountInput = screen.getByPlaceholderText('Monto total del préstamo');
    const loanPaymentDateInput = screen.getByPlaceholderText('Día del mes a pagar');
    const installmentsInput = screen.getByPlaceholderText('Número de cuotas');
    const loanInterestInput = screen.getByPlaceholderText('Tasa de interés');
    const installmentValueInput = screen.getByPlaceholderText('Valor de cada cuota');

    expect(loanNameInput.value).toBe('');
    expect(loanAmountInput.value).toBe('');
    expect(loanPaymentDateInput.value).toBe('');
    expect(installmentsInput.value).toBe('');
    expect(loanInterestInput.value).toBe('');
    expect(installmentValueInput.value).toBe('');
});

test('Fields change when filled', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba'} });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    expect(screen.getByPlaceholderText('Nombre del préstamo').value).toBe('Prestamo prueba');
    expect(screen.getByPlaceholderText('Monto total del préstamo').value).toBe('1000');
    expect(screen.getByPlaceholderText('Día del mes a pagar').value).toBe('15');
    expect(screen.getByPlaceholderText('Número de cuotas').value).toBe('10');
    expect(screen.getByPlaceholderText('Tasa de interés').value).toBe('5');
    expect(screen.getByPlaceholderText('Valor de cada cuota').value).toBe('100');
});

test('Submit button shloud be disabled if fields are not filled', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
});

test('Submit button should be disabled if fields are partially filled', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 0' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });

});

test('Submit button should be enabled if all fields are filled', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 1' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled(); 
});

test('Clicking on the "Crear préstamo" button should call the function to handle submit', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 2' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();    
    const form = screen.getByTestId('create-loan-form');
    const handleSubmitMock = jest.fn();     
    form.onsubmit = handleSubmitMock;      
    fireEvent.click(button);
    expect(handleSubmitMock).toHaveBeenCalled();
});

test('Clicking on the "Crear préstamo" button should open the confirmation modal', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 3' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();  
    expect(button).toBeEnabled(); 
    fireEvent.click(button);
    const confirmationModal = screen.getByTestId('create-confirmation-modal'); 
    expect(confirmationModal).toBeInTheDocument();
});

test('Confirming the creation of the loan should close the confirmation modal', async () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 4' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();  
    expect(button).toBeEnabled(); 
    fireEvent.click(button);
    const confirmationModal = screen.getByTestId('create-confirmation-modal'); 
    expect(confirmationModal).toBeInTheDocument();
    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
    fireEvent.click(confirmButton);
    await waitFor(() => {
        expect(confirmationModal).not.toBeInTheDocument();
    });
});

test('Confirming the creation of the loan should log the loan information', () => {
    render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                <CrearPrestamo />
            </IntlProvider>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre del préstamo'), { target: { value: 'Prestamo prueba 4' } });
    fireEvent.change(screen.getByPlaceholderText('Monto total del préstamo'), { target: { value: 1000 } });
    fireEvent.change(screen.getByPlaceholderText('Día del mes a pagar'), { target: { value: 15 } });
    fireEvent.change(screen.getByPlaceholderText('Número de cuotas'), { target: { value: 10 } });
    fireEvent.change(screen.getByPlaceholderText('Tasa de interés'), { target: { value: 5 } });
    fireEvent.change(screen.getByPlaceholderText('Valor de cada cuota'), { target: { value: 100 } });

    const button = screen.getByRole('button', { name: 'Crear Préstamo' });
    expect(button).toBeInTheDocument();  
    expect(button).toBeEnabled(); 
    fireEvent.click(button);
    const confirmationModal = screen.getByTestId('create-confirmation-modal'); 
    expect(confirmationModal).toBeInTheDocument();
    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
    fireEvent.click(confirmButton);
    //TODO: Check that the loan information is logged
});


