/**
 * Animated SVG Checkbox Component
 * Hand-drawn scratch check animation on click
 */

'use client';

import React, { useState } from 'react';

interface AnimatedCheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function AnimatedCheckbox({ id, label = 'Signed', checked = false, onChange }: AnimatedCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newVal = !isChecked;
    setIsChecked(newVal);
    onChange?.(newVal);
  };

  return (
    <div
      className="scratch-checkbox"
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      id={id}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleClick(); }}
    >
      <svg width={45} height={45} viewBox="0 0 95 95">
        <rect x={30} y={20} width={50} height={50} stroke="currentColor" fill="none" strokeWidth={2} />
        <g transform="translate(0,-952.36222)">
          <path
            d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
            stroke="currentColor"
            strokeWidth={3}
            fill="none"
            className={`scratch-path ${isChecked ? 'scratched' : ''}`}
          />
        </g>
      </svg>
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
}
