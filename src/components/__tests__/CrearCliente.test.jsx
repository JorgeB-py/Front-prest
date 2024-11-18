// CrearCliente.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from 'react-router-dom';
import messages_es from '../local/es.json';
import CrearCliente from "../CrearCliente";

const messages = {
    'es': messages_es,
};

const language = 'es';

// Función auxiliar para renderizar el componente con los proveedores necesarios
const renderWithProviders = (ui) => {
    return render(
        <MemoryRouter>
            <IntlProvider locale={language} messages={messages[language]}>
                {ui}
            </IntlProvider>
        </MemoryRouter>
    );
};

describe('Componente CrearCliente', () => {
    test('1. Muestra correctamente los placeholders de los campos de entrada', () => {
        renderWithProviders(<CrearCliente />);

        const placeholders = [
            { id: 'app.placeholderName', name: 'nombre' },
            { id: 'app.placeholderID', name: 'identificacion' },
            { id: 'app.placeholderIncome', name: 'ingresos' },
            { id: 'app.placeholderOccupation', name: 'ocupacion' },
            { id: 'app.placeholderAddress', name: 'direccion' },
            { id: 'app.placeholderPhone', name: 'telefono' },
            { id: 'app.placeholderEmail', name: 'correo' },
        ];

        placeholders.forEach(({ id, name }) => {
            const placeholderText = messages[language][id];
            const input = screen.getByPlaceholderText(placeholderText);
            expect(input).toBeInTheDocument();
            expect(input).toHaveAttribute('name', name);
        });
    });

    test('2. El botón de envío muestra el texto correcto', () => {
        renderWithProviders(<CrearCliente />);
        const buttonText = messages[language]['app.registerClient'];
        const button = screen.getByRole('button', { name: buttonText });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'submit');
    });

    test('3. Muestra mensaje de error al enviar el formulario vacío', () => {
        renderWithProviders(<CrearCliente />);

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const errorMessage = messages[language]['app.errorFields'];
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('4. Muestra mensaje de error cuando la identificación no es numérica', () => {
        renderWithProviders(<CrearCliente />);

        const testData = {
            nombre: 'Ana López',
            identificacion: 'ABC123', // Identificación inválida
            ingresos: '4000',
            ocupacion: 'Abogada',
            direccion: 'Avenida Siempre Viva 742',
            telefono: '5557654321',
            correo: 'ana@example.com',
        };

        fireEvent.change(screen.getByLabelText(messages[language]['app.fullName']), { target: { value: testData.nombre } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.idNumber']), { target: { value: testData.identificacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.monthlyIncome']), { target: { value: testData.ingresos } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.occupation']), { target: { value: testData.ocupacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.address']), { target: { value: testData.direccion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.phone']), { target: { value: testData.telefono } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.email']), { target: { value: testData.correo } });

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const errorMessage = messages[language]['app.errorID'];
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('5. Muestra mensaje de error cuando el teléfono no es numérico', () => {
        renderWithProviders(<CrearCliente />);

        const testData = {
            nombre: 'Carlos Díaz',
            identificacion: '987654321',
            ingresos: '4500',
            ocupacion: 'Contador',
            direccion: 'Calle Principal 456',
            telefono: 'ABC123', // Teléfono inválido
            correo: 'carlos@example.com',
        };

        fireEvent.change(screen.getByLabelText(messages[language]['app.fullName']), { target: { value: testData.nombre } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.idNumber']), { target: { value: testData.identificacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.monthlyIncome']), { target: { value: testData.ingresos } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.occupation']), { target: { value: testData.ocupacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.address']), { target: { value: testData.direccion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.phone']), { target: { value: testData.telefono } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.email']), { target: { value: testData.correo } });

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const errorMessage = messages[language]['app.errorPhone'];
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('6. Muestra mensaje de error cuando el correo es inválido', () => {
        renderWithProviders(<CrearCliente />);

        const testData = {
            nombre: 'Pedro Martínez',
            identificacion: '987654321',
            ingresos: '3500',
            ocupacion: 'Doctor',
            direccion: 'Boulevard de los Sueños Rotos 456',
            telefono: '5552345678',
            correo: 'pedro@example', // Correo inválido
        };

        fireEvent.change(screen.getByLabelText(messages[language]['app.fullName']), { target: { value: testData.nombre } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.idNumber']), { target: { value: testData.identificacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.monthlyIncome']), { target: { value: testData.ingresos } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.occupation']), { target: { value: testData.ocupacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.address']), { target: { value: testData.direccion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.phone']), { target: { value: testData.telefono } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.email']), { target: { value: testData.correo } });

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const errorMessage = messages[language]['app.errorEmail'];
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('7. Muestra mensaje de éxito y registra los datos al enviar el formulario con datos válidos', async () => {
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        renderWithProviders(<CrearCliente />);

        const testData = {
            nombre: 'María Gómez',
            identificacion: '123456789',
            ingresos: '5000',
            ocupacion: 'Ingeniera',
            direccion: 'Calle de la Paz 123',
            telefono: '5559876543',
            correo: 'maria@example.com',
        };

        fireEvent.change(screen.getByLabelText(messages[language]['app.fullName']), { target: { value: testData.nombre } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.idNumber']), { target: { value: testData.identificacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.monthlyIncome']), { target: { value: testData.ingresos } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.occupation']), { target: { value: testData.ocupacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.address']), { target: { value: testData.direccion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.phone']), { target: { value: testData.telefono } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.email']), { target: { value: testData.correo } });

        // Simular carga de archivo
        const file = new File(['contenido de prueba'], 'foto.jpg', { type: 'image/jpeg' });
        const photoInput = screen.getByLabelText(messages[language]['app.clientPhoto']);
        fireEvent.change(photoInput, { target: { files: [file] } });

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const successMessage = messages[language]['app.successMessage'];

        await waitFor(() => {
            expect(screen.getByText(successMessage)).toBeInTheDocument();
        });

        expect(consoleLogMock).toHaveBeenCalledTimes(1);
        const loggedData = consoleLogMock.mock.calls[0][0];
        expect(loggedData).toMatchObject({
            ...testData,
            foto: file,
        });
        expect(loggedData.id).toBeDefined();

        consoleLogMock.mockRestore();
    });

    test('8. No muestra mensaje de error después de un envío exitoso', async () => {
        renderWithProviders(<CrearCliente />);

        // Envío exitoso
        const testData = {
            nombre: 'Laura Sánchez',
            identificacion: '1122334455',
            ingresos: '6000',
            ocupacion: 'Arquitecta',
            direccion: 'Calle del Sol 789',
            telefono: '5558765432',
            correo: 'laura@example.com',
        };

        fireEvent.change(screen.getByLabelText(messages[language]['app.fullName']), { target: { value: testData.nombre } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.idNumber']), { target: { value: testData.identificacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.monthlyIncome']), { target: { value: testData.ingresos } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.occupation']), { target: { value: testData.ocupacion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.address']), { target: { value: testData.direccion } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.phone']), { target: { value: testData.telefono } });
        fireEvent.change(screen.getByLabelText(messages[language]['app.email']), { target: { value: testData.correo } });

        const submitButton = screen.getByRole('button', { name: messages[language]['app.registerClient'] });
        fireEvent.click(submitButton);

        const successMessage = messages[language]['app.successMessage'];

        await waitFor(() => {
            expect(screen.getByText(successMessage)).toBeInTheDocument();
        });

        // Verificamos que no haya mensaje de error
        const errorMessages = [
            messages[language]['app.errorFields'],
            messages[language]['app.errorID'],
            messages[language]['app.errorPhone'],
            messages[language]['app.errorEmail'],
        ];

        errorMessages.forEach((errorMessage) => {
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        });
    });

    test('9. El botón "Regresar al menú" tiene el enlace correcto', () => {
        renderWithProviders(<CrearCliente />);
        const linkText = messages[language]['app.goBackMenu'];
        const link = screen.getByRole('link', { name: linkText });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/deudores');
    });
});
