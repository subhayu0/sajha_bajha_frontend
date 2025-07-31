import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variantClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
    gray: 'text-secondary-400',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${variantClasses[variant]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {text && (
        <p className="mt-2 text-sm text-secondary-600">{text}</p>
      )}
    </div>
  );
};

// Skeleton loader component
export const Skeleton = ({ 
  className = '', 
  lines = 1,
  height = 'h-4'
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-secondary-200 rounded ${height} ${
            index !== lines - 1 ? 'mb-2' : ''
          }`}
        />
      ))}
    </div>
  );
};

// Card skeleton
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      <Skeleton className="w-3/4 h-6 mb-4" />
      <Skeleton lines={3} />
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-16 h-8 rounded" />
      </div>
    </div>
  );
};

// Product card skeleton
export const ProductCardSkeleton = ({ className = '' }) => {
  return (
    <div className={`card-hover ${className}`}>
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <div className="p-4">
        <Skeleton className="w-3/4 h-5 mb-2" />
        <Skeleton className="w-1/2 h-4 mb-3" />
        <Skeleton className="w-20 h-6 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-20 h-8 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 