

import React, { useState, Fragment } from 'react';

const XIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  // FIX: Added size prop to support different button sizes.
  size?: 'sm' | 'md' | 'lg';
}
export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-600/90"
    : "bg-gray-100 text-gray-900 hover:bg-gray-100/80 border border-gray-200";
  // FIX: Added size classes to apply different padding and text sizes.
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : size === 'lg' ? 'px-8 py-3 text-lg' : 'px-4 py-2';
  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Card
interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ title, description, children, footer }) => (
  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
    {footer && (
      <div className="bg-gray-50 px-6 py-4 text-right">
        {footer}
      </div>
    )}
  </div>
);

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, helperText, id, ...props }, ref) => {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input ref={ref} id={inputId} {...props} className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.type === 'color' ? 'p-1 h-10' : 'p-2'}`} />
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}
export const Select: React.FC<SelectProps> = ({ label, children, id, ...props }) => {
  const selectId = id || label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">{label}</label>
      <select id={selectId} {...props} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
        {children}
      </select>
    </div>
  );
};

// ToggleSwitch
interface ToggleSwitchProps {
    label: string;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    description?: string;
}
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, setEnabled, description }) => (
  <div className="flex items-center justify-between">
    <span className="flex-grow flex flex-col">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      {description && <span className="text-sm text-gray-500">{description}</span>}
    </span>
    <button
      type="button"
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      onClick={() => setEnabled(!enabled)}
    >
      <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
  </div>
);

// Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <XIconComponent className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto p-1">
              {children}
            </div>
          </div>
          {footer && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// TagInput
interface TagInputProps {
    label: string;
    tags: string[];
    setTags: (tags: string[]) => void;
    helperText?: string;
}
export const TagInput: React.FC<TagInputProps> = ({ label, tags, setTags, helperText }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 flex flex-wrap items-center w-full p-2 border border-gray-300 rounded-md shadow-sm">
                {tags.map(tag => (
                    <span key={tag} className="flex items-center bg-gray-200 text-sm rounded-md mr-2 mb-1 px-2 py-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 text-gray-600 hover:text-gray-800">
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow border-none focus:ring-0 p-1"
                    placeholder="Add a tag..."
                />
            </div>
             {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
        </div>
    );
};
