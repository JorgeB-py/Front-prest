import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeudorApp from '../deudorApp';  // Importa tu componente
import '@testing-library/jest-dom';  // Para las aserciones de jest-dom
import { IntlProvider } from 'react-intl'; // Importar para la internacionalización
import messages_en from '../local/en.json';

const messages = {
  en: messages_en,
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
    test("Abrir y cerrar el modal para Editar Informacion", async ()=>{
        fireEvent.click(screen.getByRole('button',{name:/Edit/i}))
        const cancelBtn = screen.queryByText(/Cancel/i)
        expect(cancelBtn).toBeInTheDocument();
        fireEvent.click(cancelBtn);
        await waitFor(() => {
            expect(cancelBtn).not.toBeInTheDocument();
        });
    })

    test("Verificar que los cambios se descarten al cancelar",async ()=>{
        fireEvent.click(screen.getByRole('button',{name:/Edit/i}));
        
        fireEvent.change(screen.getByLabelText(/Total Loan/i),{target:"953841023123"});
        fireEvent.change(screen.getByLabelText(/Interest/i),{target:"910"});
        
        const cancelBtn = screen.queryByText(/Cancel/i);
        fireEvent.click(cancelBtn);
        await waitFor(() => {
            expect(cancelBtn).not.toBeInTheDocument();
        });

        expect(screen.queryByText(/953841023123/i)).not.toBeInTheDocument();
        expect(screen.queryByText("910")).not.toBeInTheDocument();
    })

    test("Verificar que los cambios se guarden",async ()=>{
        const deudorData = {
            totalLoan: 953841023123,
            interest:20,
            paymentFrequency:{value:"Quincenal",translation:"Biweekly"}
        }
        const container = screen.getByTestId('interest-value');

        fireEvent.click(screen.getByRole('button',{name:/Edit/i}));
        
        fireEvent.change(screen.getByLabelText(/Total Loan/i),{target:{value: deudorData.totalLoan.toString()}});
        fireEvent.change( screen.getByLabelText(/Interest/i) ,{target:{value: deudorData.interest.toString()}});
        fireEvent.change(screen.getByLabelText(/Payment Frequency/i),{target:{value:deudorData.paymentFrequency.value}});
        
        const saveBtn = screen.queryByText(/Save/i);
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(saveBtn).not.toBeInTheDocument();
        });

        console.log(container.textContent)
        expect(screen.getByText(`$ ${(deudorData.totalLoan).toLocaleString()}`)).toBeInTheDocument();
        expect(screen.getByText(`${deudorData.interest}%`)).toBeInTheDocument();
        expect(screen.getByText(deudorData.paymentFrequency.translation)).toBeInTheDocument();
    })
});