import React from 'react';

export interface StaffFormProps {
    className?: string;
}

export const StaffForm: React.FC<StaffFormProps> = ({ className = '' }) => (
    <div className={className}>StaffForm</div>
);