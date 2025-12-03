import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Checkbox, Radio } from './InputFields';
import { FormData } from '../types';

interface Props {
  data: FormData['habits'];
  onChange: (data: FormData['habits']) => void;
}

export const HabitsSection: React.FC<Props> = ({ data, onChange }) => {
  const update = (key: keyof FormData['habits'], value: any) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <SectionWrapper title="3. Thói Quen Chăm Sóc & Sinh Hoạt">
      <div className="mb-6">
        <h3 className="text-md font-semibold text-slate-800 mb-3 border-l-4 border-teal-500 pl-2">Routine hiện tại</h3>
        <div className="space-y-4 text-sm md:text-base">
          {/* Cleanser */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="w-32 font-medium text-slate-700">Sữa rửa mặt:</span>
            <div className="flex gap-4 mt-2 md:mt-0">
               <label className="flex items-center gap-1 cursor-pointer">
                 <input type="checkbox" checked={data.cleanser === 'sang' || data.cleanser === 'ca_hai'} onChange={(e) => {
                    const isMorning = e.target.checked;
                    const isNight = data.cleanser === 'toi' || data.cleanser === 'ca_hai';
                    if (isMorning && isNight) update('cleanser', 'ca_hai');
                    else if (isMorning) update('cleanser', 'sang');
                    else if (isNight) update('cleanser', 'toi');
                    else update('cleanser', 'khong');
                 }} className="text-teal-600 rounded" /> <span>Sáng</span>
               </label>
               <label className="flex items-center gap-1 cursor-pointer">
                 <input type="checkbox" checked={data.cleanser === 'toi' || data.cleanser === 'ca_hai'} onChange={(e) => {
                    const isNight = e.target.checked;
                    const isMorning = data.cleanser === 'sang' || data.cleanser === 'ca_hai';
                    if (isMorning && isNight) update('cleanser', 'ca_hai');
                    else if (isNight) update('cleanser', 'toi');
                    else if (isMorning) update('cleanser', 'sang');
                    else update('cleanser', 'khong');
                 }} className="text-teal-600 rounded" /> <span>Tối</span>
               </label>
            </div>
          </div>

          {/* Makeup Remover */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="w-32 font-medium text-slate-700">Tẩy trang:</span>
            <div className="flex gap-4 mt-2 md:mt-0">
               <Radio label="Có" name="rem" value="yes" checked={data.makeupRemover} onChange={() => update('makeupRemover', true)} />
               <Radio label="Không" name="rem" value="no" checked={!data.makeupRemover} onChange={() => update('makeupRemover', false)} />
            </div>
          </div>

          {/* Moisturizer */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="w-32 font-medium text-slate-700">Kem dưỡng:</span>
            <div className="flex gap-4 mt-2 md:mt-0">
               <Radio label="Có" name="moist" value="yes" checked={data.moisturizer} onChange={() => update('moisturizer', true)} />
               <Radio label="Không" name="moist" value="no" checked={!data.moisturizer} onChange={() => update('moisturizer', false)} />
            </div>
          </div>

          {/* Sunscreen */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="w-32 font-medium text-slate-700">Chống nắng:</span>
            <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
               <Radio label="Mỗi ngày" name="sun" value="moingay" checked={data.sunscreen === 'moingay'} onChange={(v) => update('sunscreen', v)} />
               <Radio label="Thỉnh thoảng" name="sun" value="thinhthoang" checked={data.sunscreen === 'thinhthoang'} onChange={(v) => update('sunscreen', v)} />
               <Radio label="Không" name="sun" value="khong" checked={data.sunscreen === 'khong'} onChange={(v) => update('sunscreen', v)} />
            </div>
          </div>

           <div className="mt-4">
            <label className="block text-slate-700 font-medium mb-1">Sản phẩm đang dùng:</label>
            <textarea
              rows={3}
              className="w-full border border-slate-300 rounded p-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="Liệt kê tên các sản phẩm..."
              value={data.currentProducts}
              onChange={(e) => update('currentProducts', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-md font-semibold text-slate-800 mb-3 border-l-4 border-teal-500 pl-2">Thói quen sinh hoạt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
           <div className="flex justify-between items-center border-b border-slate-100 pb-2">
             <span>Ngủ đủ 7-8 tiếng?</span>
             <div className="flex gap-4">
                <Radio label="Có" name="sleep" value="yes" checked={data.sleep} onChange={() => update('sleep', true)} />
                <Radio label="Không" name="sleep" value="no" checked={!data.sleep} onChange={() => update('sleep', false)} />
             </div>
           </div>

           <div className="flex justify-between items-center border-b border-slate-100 pb-2">
             <span>Stress nhiều?</span>
             <div className="flex gap-4">
                <Radio label="Có" name="stress" value="yes" checked={data.stress} onChange={() => update('stress', true)} />
                <Radio label="Không" name="stress" value="no" checked={!data.stress} onChange={() => update('stress', false)} />
             </div>
           </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
             <span>Ăn cay/ngọt nhiều?</span>
             <div className="flex gap-4">
                <Radio label="Có" name="diet" value="yes" checked={data.dietSpicySweet} onChange={() => update('dietSpicySweet', true)} />
                <Radio label="Không" name="diet" value="no" checked={!data.dietSpicySweet} onChange={() => update('dietSpicySweet', false)} />
             </div>
           </div>

           <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-2">
             <span className="mr-2">Lượng nước uống:</span>
             <div className="flex gap-3 text-sm">
                <Radio label="< 1L" name="water" value="<1L" checked={data.water === '<1L'} onChange={(v) => update('water', v)} />
                <Radio label="1-2L" name="water" value="1-2L" checked={data.water === '1-2L'} onChange={(v) => update('water', v)} />
                <Radio label="> 2L" name="water" value=">2L" checked={data.water === '>2L'} onChange={(v) => update('water', v)} />
             </div>
           </div>
        </div>
      </div>
    </SectionWrapper>
  );
};