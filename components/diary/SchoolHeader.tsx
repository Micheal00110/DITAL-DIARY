/**
 * School Header Component
 * Displays school logo, name, and contact information
 * Features red and green header bars matching the academic diary design
 */

'use client';

import { SchoolDetails } from '@/lib/types';
import Image from 'next/image';

interface SchoolHeaderProps {
  schoolDetails: SchoolDetails;
  editable?: boolean;
  onUpdate?: (field: keyof SchoolDetails, value: string) => void;
}

export function SchoolHeader({ schoolDetails, editable = false, onUpdate }: SchoolHeaderProps) {
  return (
    <div className="w-full">
      {/* Red top bar */}
      <div className="h-3 bg-red-700"></div>
      
      {/* Green secondary bar */}
      <div className="h-6 bg-green-700"></div>
      
      {/* School information section */}
      <div className="bg-white border-2 border-gray-800 p-4">
        <div className="flex items-center justify-between gap-4">
          {/* School Logo */}
          <div className="flex-shrink-0">
            {schoolDetails.logo ? (
              <Image
                src={schoolDetails.logo}
                alt="School Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            ) : (
              <div className="w-20 h-20 bg-green-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {schoolDetails.name.substring(0, 3).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* School Details */}
          <div className="flex-1 text-center">
            {editable && onUpdate ? (
              <>
                <input
                  type="text"
                  value={schoolDetails.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="text-xl font-bold text-green-800 uppercase text-center w-full border-b border-gray-300 focus:outline-none focus:border-green-600"
                />
                <input
                  type="text"
                  value={schoolDetails.address}
                  onChange={(e) => onUpdate('address', e.target.value)}
                  className="text-sm text-gray-700 text-center w-full mt-1 border-b border-gray-300 focus:outline-none focus:border-green-600"
                />
                <div className="flex gap-2 justify-center mt-1">
                  <input
                    type="tel"
                    value={schoolDetails.phone}
                    onChange={(e) => onUpdate('phone', e.target.value)}
                    placeholder="Phone"
                    className="text-xs text-gray-600 text-center border-b border-gray-300 focus:outline-none focus:border-green-600"
                  />
                  <span className="text-xs text-gray-600">|</span>
                  <input
                    type="email"
                    value={schoolDetails.email}
                    onChange={(e) => onUpdate('email', e.target.value)}
                    placeholder="Email"
                    className="text-xs text-gray-600 text-center border-b border-gray-300 focus:outline-none focus:border-green-600"
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold text-green-800 uppercase">
                  {schoolDetails.name}
                </h1>
                <p className="text-sm text-gray-700">{schoolDetails.address}</p>
                <p className="text-xs text-gray-600">
                  Tel: {schoolDetails.phone} | Email: {schoolDetails.email}
                </p>
              </>
            )}
          </div>

          {/* Right side spacer for balance */}
          <div className="w-20 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
