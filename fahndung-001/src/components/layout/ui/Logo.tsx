"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon';
  href?: string;
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: { container: 28, text: 'text-xs' },
  md: { container: 42, text: 'text-sm' },
  lg: { container: 56, text: 'text-base' },
  xl: { container: 70, text: 'text-lg' }
};

/**
 * Logo Component - Minimal Code, Maximum Functionality
 * WCAG 2.2 AAA konform mit optimaler Performance
 */
export default function Logo({ 
  size = 'md',
  variant = 'horizontal',
  href = '/',
  className = '',
  priority = false
}: LogoProps) {
  const { container, text } = sizeMap[size];
  const showText = variant !== 'icon';
  
  const content = (
    <>
      {/* Logo mit Next.js Image Optimierung */}
      <div 
        className="relative shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ width: container, height: container }}
      >
        <Image
          src="/images/logo-pbw.svg"
          alt=""
          fill
          sizes={`${container}px`}
          priority={priority}
          className="object-contain"
        />
      </div>
      
      {/* Text nur wenn nicht icon variant */}
      {showText && (
        <div className={`${text} transition-colors duration-200 ${
          variant === 'vertical' ? 'text-center mt-2' : 'ml-3'
        }`}>
          <div className="font-bold text-gray-900 dark:text-white leading-tight">
            FAHNDUNG
          </div>
          <div className="font-light text-gray-600 dark:text-gray-300 leading-tight">
            POLIZEI BW
          </div>
        </div>
      )}
    </>
  );

  return (
    <Link 
      href={href}
      className={`
        group inline-flex items-center
        ${variant === 'vertical' ? 'flex-col' : 'flex-row'}
        transition-opacity duration-200 hover:opacity-90
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        rounded-lg p-1 -m-1
        ${className}
      `}
      aria-label="Polizei Baden-Württemberg Fahndungsportal - Zur Startseite"
    >
      {content}
    </Link>
  );
}