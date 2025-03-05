import React from 'react';
import { render, screen } from '@testing-library/react';
import MagicForm from '../src/MagicForm';

test('renders MagicForm component', () => {
    const fields = [
        {
            group: "User Information",
            fields: [
                { name: "username", label: "Username", type: "text", required: true },
            ],
            layout: { type: "vertical" },
            position: { row: 1, column: 1, width: "full" },
            card: true,
        },
    ];

    render(<MagicForm fields={fields} onSubmit={() => { }} />);
    const usernameLabel = screen.getByText(/Username/i);
    expect(usernameLabel).toBeInTheDocument();
});
