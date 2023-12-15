import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List/List';

describe('App component', () => {
    it('should render list items', () => {
        const { getByText, queryByText, unmount } = render(<List initialItems={['Diego', 'Lucas', 'João']} />);

        expect(getByText('Diego')).toBeInTheDocument();
        expect(getByText('Lucas')).toBeInTheDocument();
        expect(getByText('João')).toBeInTheDocument();

        unmount();
        render(<List initialItems={['Ana']} />);

        expect(getByText('Ana')).toBeInTheDocument();
        expect(queryByText('João')).not.toBeInTheDocument();
    });

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText } = render(<List initialItems={[]} />);

        const input = getByPlaceholderText('Novo item...');
        const addButton = getByText('Adicionar');

        await userEvent.type(input, 'Novo');
        await userEvent.click(addButton);

        await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument();
        });
    });

    it('should be able to remove an item to the list', async () => {
        const { getByText, getAllByText } = render(<List initialItems={['Diego']} />);

        const removeButton = getAllByText('Remover');

        await userEvent.click(removeButton[0]);

        await waitForElementToBeRemoved(() => {
            return getByText('Diego');
        });
    });
});