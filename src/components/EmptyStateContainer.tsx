import React from 'react';
import './EmptyStateContainer.css';

interface EmptyStateContainerProps {
  message: string;
}

const EmptyStateContainer: React.FC<EmptyStateContainerProps> = ({ children, message }) => {
  return (
    <div className='container'>
      <strong>{message}</strong>
      <p>{children}</p>
    </div>
  );
};

export default EmptyStateContainer;
