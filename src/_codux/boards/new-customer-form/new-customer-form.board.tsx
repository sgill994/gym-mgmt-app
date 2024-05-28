import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { NewCustomerForm } from '../../../components/new-customer-form/new-customer-form';

export default createBoard({
    name: 'NewCustomerForm',
    Board: () => <NewCustomerForm />,
    isSnippet: true,
    environmentProps: {
canvasHeight: 520.3677498946502,
canvasWidth: 1018.5807374152633
}
});