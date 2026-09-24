import React from 'react';

export type AvatarStatus = 'safe' | 'warning' | 'danger' | 'critical' | 'offline';

export interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: AvatarStatus;
  className?: string;
}

export function getInitials(name: string): string {
  if (!name) return 'MG';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function Avatar({ name, size = 'md', status, className = '' }: AvatarProps) {
  const initials = getInitials(name);

  const sizeClasses = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-14 h-14 text-lg font-bold',
  }[size];

  const ringClasses = {
    safe: 'ring-2 ring-[#22C55E] ring-offset-2 ring-offset-white',
    warning: 'ring-2 ring-[#F59E0B] ring-offset-2 ring-offset-white',
    danger: 'ring-2 ring-[#EF4444] ring-offset-2 ring-offset-white',
    critical: 'ring-2 ring-[#EF4444] ring-offset-2 ring-offset-white animate-pulse',
    offline: 'ring-2 ring-[#94A3B8] ring-offset-2 ring-offset-white',
  };

  const statusDotClasses = {
    safe: 'bg-[#22C55E]',
    warning: 'bg-[#F59E0B]',
    danger: 'bg-[#EF4444]',
    critical: 'bg-[#EF4444] animate-ping',
    offline: 'bg-[#94A3B8]',
  };

  const dotSize = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
  }[size];

  return (
    <div className="relative inline-flex flex-shrink-0 items-center justify-center">
      <div
        className={`
          flex items-center justify-center rounded-full
          bg-[#E0F2FE] text-[#0284C7] select-none tracking-wider
          border border-[#BAE6FD] font-sans transition-transform
          ${sizeClasses}
          ${status ? ringClasses[status] : ''}
          ${className}
        `}
        title={name}
      >
        <span>{initials}</span>
      </div>

      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full border-2 border-white
            ${dotSize} ${statusDotClasses[status]}
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default Avatar;
