import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const DivAnimateYAxis: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default DivAnimateYAxis;
