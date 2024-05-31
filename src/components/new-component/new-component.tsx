import React from 'react';
import { NewComponent as NewComponent0 } from './new-component';

export interface NewComponentProps {
    className?: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ className = '' }) => (
    <div className={className}>NewComponent<NewComponent0 />
</div>
);