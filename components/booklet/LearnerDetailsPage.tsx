'use client';

import React from 'react';

export function LearnerDetailsPage() {
  const fields = [
    { label: "Learner's name", value: "Zanny Imani Karan" },
    { label: "Date of Birth", value: "11 July 2016" },
    { label: "Nationality", value: "Kenyan" },
    { label: "Religion", value: "Christian" },
    { label: "House", value: "Oledume" },
    { label: "Grade", value: "5 Meridian" },
    { label: "Guardian's Name", value: "Reenah Abubakar" },
    { label: "Postal Address", value: "5 Meridian Road" },
    { label: "Residential Address", value: "Kilimani Estate, Nairobi" },
  ];

  const emergencyContacts = [
    { name: "Reenah Abubakar", tel: "0728904321" },
    { name: "Kennedy Karan", tel: "0725318958" },
    { name: "Precious Klerings", tel: "0742579041" },
  ];

  return (
    <div className="h-full paper-texture p-8 flex flex-col font-sans relative bg-white">
      <h2 className="text-xl font-[900] text-[#104e8b] border-b-[3px] border-[#104e8b] mb-8 pb-1 uppercase tracking-tight">
        LEARNER'S PERSONAL DETAILS
      </h2>
      
      <div className="space-y-3 flex-1">
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-end gap-2 text-[11px]">
            <span className="font-[900] text-[#104e8b] uppercase whitespace-nowrap min-w-[150px] mb-1">
              {field.label}:
            </span>
            <span className="flex-1 font-handwriting text-[24px] border-b border-[#5cc5f2]/40 pb-0.5 px-2 italic text-[#104e8b] leading-none mb-0.5">
              {field.value}
            </span>
          </div>
        ))}

        <div className="mt-10">
          <h3 className="text-[12px] font-[900] text-[#104e8b] mb-4 uppercase italic">Emergency Contact:</h3>
          <div className="space-y-4">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="flex items-end gap-3 text-[10px]">
                <span className="font-[900] text-[#104e8b] w-4">{idx + 1}.</span>
                <span className="font-[900] text-[#104e8b] uppercase whitespace-nowrap mb-1">Name:</span>
                <span className="flex-1 font-handwriting text-xl border-b border-[#5cc5f2]/40 italic px-2 text-[#104e8b] leading-none mb-0.5">{contact.name}</span>
                <span className="font-[900] text-[#104e8b] uppercase whitespace-nowrap ml-2 mb-1">Tel:</span>
                <span className="w-32 font-handwriting text-xl border-b border-[#5cc5f2]/40 italic px-2 text-[#104e8b] leading-none mb-0.5">{contact.tel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center text-[10px] text-[#5cc5f2] font-black uppercase italic">
        <span>St. Hannah's Preparatory School</span>
        <span className="text-[#104e8b] text-xl not-italic">2</span>
      </div>
    </div>
  );
}
