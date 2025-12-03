import React from 'react';
import { SectionWrapper } from './SectionWrapper.tsx';
import { Checkbox } from './InputFields.tsx';
import { FormData } from '../types.ts';

interface Props {
  data: FormData['goals'];
  onChange: (data: FormData['goals']) => void;
}

const GOALS = [
  'Hết mụn', 'Giảm thâm', 'Hết bóng dầu', 'Se khít lỗ chân lông',
  'Cải thiện sạm/nám', 'Da sáng khỏe', 'Da đều màu',
  'Routine phù hợp sinh viên'
];

export const GoalsSection: React.FC<Props> = ({ data, onChange }) => {
  const toggleGoal = (goal: string) => {
    const current = data.targets;
    const next = current.includes(goal)
      ? current.filter(t => t !== goal)
      : [...current, goal];
    onChange({ ...data, targets: next });
  };

  return (
    <>
      <SectionWrapper title="5. Mục Tiêu Cải Thiện Da">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 print:grid-cols-4 print:gap-1 print:mb-0.5">
          {GOALS.map(goal => (
            <Checkbox
              key={goal}
              label={goal}
              checked={data.targets.includes(goal)}
              onChange={() => toggleGoal(goal)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 border-t border-slate-100 pt-4 print:border-slate-300 print:mt-1 print:pt-1">
          <label className="text-slate-700 font-medium whitespace-nowrap text-sm">Khác:</label>
          <input
            type="text"
            className="w-full border-b border-slate-300 focus:border-teal-500 outline-none py-1 bg-transparent text-sm"
            value={data.other}
            onChange={(e) => onChange({ ...data, other: e.target.value })}
            placeholder="Mục tiêu khác..."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper title="6. Cam Kết & Đồng Ý">
        <div className="space-y-3 print:space-y-0.5">
          <Checkbox
            label="Đồng ý khảo sát da & soi da"
            checked={data.agreedToAnalysis}
            onChange={(v) => onChange({ ...data, agreedToAnalysis: v })}
            className="font-medium text-slate-800 text-sm"
          />
          <Checkbox
            label="Đồng ý tư vấn liệu trình"
            checked={data.agreedToTreatment}
            onChange={(v) => onChange({ ...data, agreedToTreatment: v })}
             className="font-medium text-slate-800 text-sm"
          />
        </div>

        <div className="flex justify-between items-end mt-12 pt-8 print:mt-1 print:pt-0">
            <div className="w-1/2">
                <p className="text-sm text-slate-500 mb-8 italic print:mb-2">Chữ ký khách hàng:</p>
                <div className="h-px bg-slate-400 w-3/4"></div>
            </div>
            <div className="w-1/2 flex flex-col items-end">
                 <div className="flex items-end gap-2 mb-8 print:mb-2">
                     <span className="text-sm text-slate-500">Ngày:</span>
                     <div className="w-24 border-b border-slate-400"></div>
                 </div>
                 <p className="text-sm text-slate-500 italic pr-8">Chữ ký chuyên viên</p>
            </div>
        </div>
      </SectionWrapper>
    </>
  );
};