import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-sky-500 text-slate-950 hover:bg-sky-400',
    secondary: 'bg-slate-800 text-slate-50 hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800',
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};

