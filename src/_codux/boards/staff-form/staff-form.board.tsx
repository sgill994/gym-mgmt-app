import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { StaffForm } from '../../../components/staff-form/staff-form';

export default createBoard({
    name: 'StaffForm',
    Board: () => <StaffForm />,
    isSnippet: true,
});