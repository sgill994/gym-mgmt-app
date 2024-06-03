import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { NewClassForm } from '../../../components/new-class-form/new-class-form';

export default createBoard({
    name: 'NewClassForm',
    Board: () => <NewClassForm />,
    isSnippet: true,
});