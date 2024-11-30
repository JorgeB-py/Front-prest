import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import DeudorDetalle from '../DeudorDetalle';
import messages_en from '../local/en.json';

const messages = {
    'en': messages_en,
};

const language = 'en';
// Mensajes de prueba
describe('DeudorDetalle', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <IntlProvider locale={language} messages={messages[language]}>
                    <DeudorDetalle />
                </IntlProvider>
            </MemoryRouter>
        );
    });

    test('Debe renderizar correctamente el componente', () => {
        expect(screen.getByText('Credits')).toBeInTheDocument();
    });

    test('Abre y cierra el modal de editar información', () => {
        fireEvent.click(screen.getByRole('button',{name:"Edit Info"}));
        expect(screen.getByRole('button',{name:"Save"})).toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('New Interest(%)')).not.toBeInTheDocument();
    });

    test('Actualizar la informacion por el modal',async () => {
        fireEvent.click(screen.getByRole('button',{name:"Edit Info"}));
        expect(screen.getByRole('button',{name:"Save"})).toBeInTheDocument();



        fireEvent.change(screen.getByLabelText("name"), { target: { value: 'Samuel Castillo' } });
        fireEvent.change(screen.getByLabelText("idNumber"),{target:{value:'1104688702'}});
        fireEvent.change(screen.getByLabelText("workStatus"), { target: { value: 'employed' } });
        fireEvent.change(screen.getByLabelText("age"),{target:{value:'20'}});
        fireEvent.change(screen.getByLabelText("phoneNumber"), { target: { value: '3211234567' } });
        fireEvent.change(screen.getByLabelText("email"),{target:{value:'test@hotmail.com'}});
        
        fireEvent.click(screen.getByText('Save'));
        
        expect(screen.getByText(/: 20/i)).toBeInTheDocument();
        expect(screen.getByText(/samuel castillo/i)).toBeInTheDocument();
        expect(screen.getByText(/1104688702/i)).toBeInTheDocument();
        expect(screen.getByText(/3211234567/i)).toBeInTheDocument();
        expect(screen.getByText(/test@hotmail.com/i)).toBeInTheDocument();
        expect(screen.getByText(/employed/i)).toBeInTheDocument();
    });

    test('Verificar boton detalle de deuda', () => {
        const btnArray = screen.getAllByRole('button',{name:'Show Details'})
        expect(btnArray.length).toBe(4)
    })
});
