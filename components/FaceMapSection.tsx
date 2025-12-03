import React from 'react';
import { SectionWrapper } from './SectionWrapper.tsx';
import { Checkbox } from './InputFields.tsx';
import { FormData } from '../types.ts';

interface Props {
  data: FormData['faceMap'];
  onChange: (data: FormData['faceMap']) => void;
}

const ZONES = [
  { 
    id: 'forehead', 
    label: 'Trán', 
    options: ['Mụn ẩn', 'Mụn viêm', 'Dầu nhiều', 'Khô', 'Thâm', 'Sẹo'] 
  },
  { 
    id: 'brows', 
    label: 'Vùng giữa lông mày', 
    options: ['Mụn', 'Mẩn đỏ', 'Tắc nghẽn'] 
  },
  { 
    id: 'nose', 
    label: 'Mũi', 
    options: ['Mụn đầu đen', 'Lỗ chân lông to', 'Dầu nhiều'] 
  },
  { 
    id: 'cheeks_in', 
    label: 'Má trong', 
    options: ['Nhạy cảm', 'Đỏ da', 'Mụn', 'Sạm'] 
  },
  { 
    id: 'cheeks_out', 
    label: 'Má ngoài', 
    options: ['Sạm', 'Nám', 'Tàn nhang', 'Tổn thương nắng'] 
  },
  { 
    id: 'chin', 
    label: 'Cằm', 
    options: ['Mụn nội tiết', 'Mụn viêm', 'Mụn đầu trắng'] 
  },
  { 
    id: 'jaw', 
    label: 'Đường viền hàm', 
    options: ['Mụn rối tiết', 'Mụn tái phát'] 
  },
];

export const FaceMapSection: React.FC<Props> = ({ data, onChange }) => {
  
  const toggleCondition = (zoneId: string, condition: string) => {
    const currentConditions = data[zoneId] || [];
    const newConditions = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition];
    
    onChange({
      ...data,
      [zoneId]: newConditions
    });
  };

  return (
    <SectionWrapper title="4. FACE MAPPING - ĐÁNH GIÁ VÙNG MẶT">
      <div className="flex flex-col lg:flex-row print:flex-row gap-8 print:gap-2 items-start">
        {/* Visual Map Placeholder */}
        <div className="hidden lg:block print:block w-1/3 print:w-auto flex-shrink-0 pt-4 print:pt-0">
           <div className="sticky top-6 print:static">
              <div className="relative mx-auto w-64 h-80 face-map-visual border-2 border-teal-200 rounded-full bg-slate-50 flex items-center justify-center print:border-teal-800 print:bg-transparent">
                 {/* Simplified Face SVG Representation */}
                 <div className="absolute top-10 print:top-4 text-xs text-teal-800 font-bold">TRÁN</div>
                 <div className="absolute top-24 print:top-12 text-xs text-teal-800 font-bold">MŨI</div>
                 <div className="absolute top-36 left-8 print:top-16 print:left-2 text-xs text-teal-800 font-bold">MÁ</div>
                 <div className="absolute top-36 right-8 print:top-16 print:right-2 text-xs text-teal-800 font-bold">MÁ</div>
                 <div className="absolute bottom-12 print:bottom-5 text-xs text-teal-800 font-bold">CẰM</div>
                 
                 {/* Decorative Lines */}
                 <svg className="w-full h-full opacity-20 print:opacity-50" viewBox="0 0 100 120">
                    <path d="M20,30 Q50,60 80,30" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M30,80 Q50,110 70,80" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <ellipse cx="50" cy="50" rx="40" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                 </svg>
              </div>
           </div>
        </div>

        {/* Input Grid */}
        <div className="flex-1 space-y-6 print:space-y-1">
          {ZONES.map((zone) => (
            <div key={zone.id} className="border-b border-slate-100 pb-4 last:border-0 print:border-slate-300 print:pb-0.5">
              <h4 className="font-bold text-teal-700 mb-2 uppercase text-sm tracking-wide print:text-teal-900 print:mb-0 print:text-[9.5pt]">
                {zone.label}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 print:grid-cols-3 gap-2 print:gap-x-1 print:gap-y-0">
                {zone.options.map(opt => (
                  <label key={opt} className="flex items-start space-x-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors print:p-0">
                    <input
                      type="checkbox"
                      className="mt-1 w-3.5 h-3.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                      checked={(data[zone.id] || []).includes(opt)}
                      onChange={() => toggleCondition(zone.id, opt)}
                    />
                    <span className="text-slate-600 leading-tight print:text-black print:text-[9pt]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};