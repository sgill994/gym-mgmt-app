import React from 'react';

export interface NewCustomerProps {
    className?: string;
}

export const NewCustomer: React.FC<NewCustomerProps> = ({ className = '' }) => (
    <div className={className}></div>
);