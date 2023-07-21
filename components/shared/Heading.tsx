import React from 'react';

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className='text-3xl text-gray-900 mt-6 font-semibold'>{title}</h2>
      <p className='text-base text-muted-foreground mt-1'>{description}</p>
    </div>
  );
};

export default Heading;
