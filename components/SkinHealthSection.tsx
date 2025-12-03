import React from 'react';
import { SectionWrapper } from './SectionWrapper.tsx';
import { Checkbox, TextInput } from './InputFields.tsx';
import { FormData } from '../types.ts';

interface Props {
  data: FormData['skinHealth'];
  onChange: (data: FormData['skinHealth']) => void;
}

const CONDITIONS = [
  'Mụn viêm', 'Mụn đầu đen', 'Mụn ẩn', 'Thâm sau mụn', 'Sẹo rỗ',
  'Da nhạy cảm', 'Lỗ chân lông to', 'Dầu nhiều', 'Da khô', 'Da xỉn màu',
  'Nám - Tàn nhang', 'Không chắc chắn'
];

const SKIN_TYPES = [
  'Da dầu', 'Da khô', 'Da hỗn hợp', 'Da nhạy cảm', 'Không rõ'
];

export const SkinHealthSection: React.FC<Props> = ({ data, onChange }) => {
  
  const toggleCondition = (item: string) => {
    const current = data.currentConditions;
    const next = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    onChange({ ...data, currentConditions: next });
  };

  const toggleSkinType = (item: string) => {
     const current = data.skinType;
    const next = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    onChange({ ...data, skinType: next });
  };

  const updateHistory = (key: keyof typeof data.history, field: 'value' | 'note', val: any) => {
    onChange({
      ...data,
      history: {
        ...data.history,
        [key]: { ...data.history[key], [field]: val }
      }
    });
  };

  return (
    <SectionWrapper title="2. Tình Trạng Da & Sức Khỏe">
      {/* 2.1 */}
      <div className="mb-6 print:mb-2">
        <h3 className="text-md font-semibold text-slate-800 mb-3 print:mb-1">2.1. Tình trạng da hiện tại</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-4 gap-3 print:gap-1">
          {CONDITIONS.map(cond => (
            <Checkbox
              key={cond}
              label={cond}
              checked={data.currentConditions.includes(cond)}
              onChange={() => toggleCondition(cond)}
            />
          ))}
        </div>
      </div>

      {/* 2.2 */}
      <div className="mb-6 print:mb-2">
        <h3 className="text-md font-semibold text-slate-800 mb-3 print:mb-1">2.2. Loại da</h3>
        <div className="flex flex-wrap gap-4 print:gap-2">
          {SKIN_TYPES.map(type => (
            <Checkbox
              key={type}
              label={type}
              checked={data.skinType.includes(type)}
              onChange={() => toggleSkinType(type)}
            />
          ))}
        </div>
      </div>

      {/* 2.3 */}
      <div>
        <h3 className="text-md font-semibold text-slate-800 mb-3 print:mb-1">2.3. Tiền sử da liễu</h3>
        <div className="space-y-4 print:space-y-1">
          <HistoryRow
            label="Từng điều trị mụn?"
            checked={data.history.treatedAcne.value}
            note={data.history.treatedAcne.note}
            onCheck={(v) => updateHistory('treatedAcne', 'value', v)}
            onNote={(v) => updateHistory('treatedAcne', 'note', v)}
          />
          <HistoryRow
            label="Từng dùng thuốc bác sĩ kê?"
            checked={data.history.prescribedMeds.value}
            note={data.history.prescribedMeds.note}
            onCheck={(v) => updateHistory('prescribedMeds', 'value', v)}
            onNote={(v) => updateHistory('prescribedMeds', 'note', v)}
          />
          <HistoryRow
            label="Từng dùng Retinoids?"
            checked={data.history.retinoids.value}
            note={data.history.retinoids.note}
            onCheck={(v) => updateHistory('retinoids', 'value', v)}
            onNote={(v) => updateHistory('retinoids', 'note', v)}
          />
          <HistoryRow
            label="Dị ứng mỹ phẩm?"
            checked={data.history.allergies.value}
            note={data.history.allergies.note}
            yesLabel="Có"
            noLabel="Không"
            onCheck={(v) => updateHistory('allergies', 'value', v)}
            onNote={(v) => updateHistory('allergies', 'note', v)}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

// Helper component for history rows
const HistoryRow: React.FC<{
  label: string;
  checked: boolean;
  note: string;
  yesLabel?: string;
  noLabel?: string;
  onCheck: (val: boolean) => void;
  onNote: (val: string) => void;
}> = ({ label, checked, note, yesLabel = 'Rồi', noLabel = 'Chưa', onCheck, onNote }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-4 border-b border-dashed border-slate-200 pb-2 last:border-0 print:border-slate-300 print:pb-1">
    <span className="w-full md:w-1/3 text-slate-700">{label}</span>
    <div className="flex items-center gap-4 w-full md:w-1/4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={!checked}
          onChange={() => onCheck(false)}
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>{noLabel}</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={checked}
          onChange={() => onCheck(true)}
          className="text-teal-600 focus:ring-teal-500"
        />
        <span>{yesLabel}</span>
      </label>
    </div>
    <div className={`flex-1 transition-opacity duration-300 ${checked ? 'opacity-100' : 'opacity-0 pointer-events-none print:opacity-100'}`}>
       <input
          type="text"
          placeholder="Chi tiết..."
          value={note}
          onChange={(e) => onNote(e.target.value)}
          className="w-full px-2 py-1 border-b border-slate-300 focus:border-teal-500 outline-none bg-transparent"
        />
    </div>
  </div>
);