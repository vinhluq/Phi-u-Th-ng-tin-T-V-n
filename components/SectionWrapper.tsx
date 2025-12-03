import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<Props> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 print:shadow-none print:border-none print:p-0 print:mb-2 ${className}`}>
      <h2 className="text-xl font-bold text-teal-800 uppercase mb-4 border-b border-teal-100 pb-2 print:border-teal-800 print:text-base print:mb-2 print:pb-1">
        {title}
      </h2>
      {children}
    </div>
  );
};