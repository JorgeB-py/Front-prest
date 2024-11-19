import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import Deudores from '../Deudores';
import messages_es from '../local/es.json';

const messages = {
  es: messages_es,
};
const language = 'es';

describe('Deudores', () => {
  beforeEach(() => {
    // Mock del fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { nombre: 'Deudor 1', fecha: '2024-01-01', pago_intereses: 100 },
            { nombre: 'Deudor 2', fecha: '2024-01-01', pago_intereses: 200 },
            { nombre: 'Deudor 3', fecha: '2024-01-01', pago_intereses: 300 },
            { nombre: 'Deudor 4', fecha: '2024-01-01', pago_intereses: 400 },
            { nombre: 'Deudor 5', fecha: '2024-01-01', pago_intereses: 500 },
            { nombre: 'Deudor 6', fecha: '2024-01-01', pago_intereses: 600 },
            { nombre: 'Deudor 7', fecha: '2024-01-01', pago_intereses: 700 },
            { nombre: 'Deudor 8', fecha: '2024-01-01', pago_intereses: 800 },
            { nombre: 'Deudor 9', fecha: '2024-01-01', pago_intereses: 900 },
            { nombre: 'Deudor 10', fecha: '2024-01-01', pago_intereses: 1000 },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe renderizar correctamente el componente', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );

    // Verificar textos clave
    expect(screen.getByText("Bienvenido, Jorge")).toBeInTheDocument();
    expect(screen.getByText("Este mes has ganado")).toBeInTheDocument();
    expect(screen.getByText(">1 año")).toBeInTheDocument();
    expect(screen.getByText("6 meses")).toBeInTheDocument();
    expect(screen.getByText("3 meses")).toBeInTheDocument();
    expect(screen.getByText("1 mes")).toBeInTheDocument();
  });

  test('Deben crearse 10 cartas', async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );

    // Esperar que las cartas se carguen
    const cards = await screen.findAllByTestId('deudor-card');

    // Verificar que hay exactamente 10 cartas
    expect(cards.length).toBe(10);
  });
  
  test('Debe aparecer el botón de información y se crean las cartas correctamente', async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );
  
    // Esperar a que se rendericen las cartas
    const cards = await screen.findAllByTestId('deudor-card');
  
    // Verificar que se crean 10 cartas
    expect(cards.length).toBe(10);
  
    // Validar contenido de las cartas
    cards.forEach((card, index) => {
      // Verificar el nombre del deudor
      expect(card).toHaveTextContent(`Deudor ${index + 1}`);
  
      // Verificar la fecha
      expect(card).toHaveTextContent('2024-01-01');
  
      const img = card.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', './2148859448.jpg');
  
      const infoButton = card.querySelector('a.btn.btn-primary');
      expect(infoButton).toBeInTheDocument();
      expect(infoButton).toHaveTextContent('Información');
    });
  });
  test('Debe calcular y mostrar el total correctamente', async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );
  
    // Esperar que el total sea calculado
    await waitFor(() => {
      expect(screen.getByText('$5500')).toBeInTheDocument(); // Suma de los 10 pagos en el mock
    });
  });
  test('Debe mostrar correctamente los enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );
  
    // Verificar que los enlaces de navegación existen
    expect(screen.getByText('Deudores')).toBeInTheDocument();
    expect(screen.getByText('Crear Deudor')).toBeInTheDocument();
    expect(screen.getByText('Consultar Deudor')).toBeInTheDocument();
  });
  test('Cada tarjeta tiene un botón accesible para información', async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );
  
    const buttons = await screen.findAllByRole('link', { name: /Información/i });
    expect(buttons.length).toBe(10); // Un botón por tarjeta
  });
  test('Debe coincidir con el snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <Deudores />
        </IntlProvider>
      </MemoryRouter>
    );
  
    expect(asFragment()).toMatchSnapshot();
  });
        
});
