import React from 'react';

// --- Text Input ---
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}
export const TextInput: React.FC<TextInputProps> = ({ label, containerClassName, className, ...props }) => (
  <div className={`flex flex-col ${containerClassName}`}>
    <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      className={`px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${className}`}
      {...props}
    />
  </div>
);

// --- Checkbox ---
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className }) => (
  <label className={`flex items-center cursor-pointer space-x-2 ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
    />
    <span className="text-slate-700">{label}</span>
  </label>
);

// --- Radio ---
interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (val: string) => void;
  className?: string;
}
export const Radio: React.FC<RadioProps> = ({ label, name, value, checked, onChange, className }) => (
  <label className={`flex items-center cursor-pointer space-x-2 ${className}`}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => onChange(e.target.value)}
      className="w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500"
    />
    <span className="text-slate-700">{label}</span>
  </label>
);
