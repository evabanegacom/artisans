import React, { useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleOnError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Error Boundary caught an error:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return fallback;
  }

  return children;
};

export default ErrorBoundary;