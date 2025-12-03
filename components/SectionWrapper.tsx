import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<Props> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 ${className}`}>
      <h2 className="text-xl font-bold text-teal-800 uppercase mb-4 border-b border-teal-100 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
};