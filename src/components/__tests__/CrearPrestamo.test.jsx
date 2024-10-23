import { render, screen } from "@testing-library/react";
import CrearPrestamo from "../crearPrestamo";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from 'react-router-dom';  
import messages_es from '../local/es.json';

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

