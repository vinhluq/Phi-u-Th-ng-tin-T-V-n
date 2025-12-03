import React, { useState } from 'react';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { SkinHealthSection } from './components/SkinHealthSection';
import { HabitsSection } from './components/HabitsSection';
import { FaceMapSection } from './components/FaceMapSection';
import { GoalsSection } from './components/GoalsSection';
import { FormData, INITIAL_DATA } from './types';

// Icons Inline to avoid extra file
const Save = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const Refresh = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
const Print = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Dữ liệu đã được lưu! (Check console for object)');
  };

  const handleReset = () => {
    if(window.confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu nhập?")) {
        setFormData(INITIAL_DATA);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-12 print:bg-white print:p-0">
      {/* Header */}
      <header className="bg-teal-700 text-white py-6 shadow-md print:hidden">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
                 <h1 className="text-2xl font-bold uppercase tracking-wide">Phiếu Thông Tin Tư Vấn</h1>
                 <p className="text-teal-100 text-sm mt-1 opacity-90">Skin Analysis & Consultation Form</p>
            </div>
            <div className="hidden md:block">
                <span className="bg-teal-800 px-3 py-1 rounded text-xs font-mono">ID: {Date.now().toString().slice(-6)}</span>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-4 print:mt-0 print:p-0 max-w-5xl">
         {/* Actions Toolbar */}
         <div className="flex justify-end gap-3 mb-4 print:hidden">
            <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
            >
                <Refresh /> Đặt lại
            </button>
            <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
            >
                <Print /> In phiếu
            </button>
            <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded shadow-sm hover:bg-teal-700 transition-colors font-medium"
            >
                <Save /> Lưu hồ sơ
            </button>
         </div>

        <div className="print:block">
            <PersonalInfoSection 
            data={formData.personal} 
            onChange={(d) => setFormData(prev => ({ ...prev, personal: d }))} 
            />

            <SkinHealthSection 
            data={formData.skinHealth}
            onChange={(d) => setFormData(prev => ({ ...prev, skinHealth: d }))}
            />

            <HabitsSection 
            data={formData.habits}
            onChange={(d) => setFormData(prev => ({ ...prev, habits: d }))}
            />

            <FaceMapSection 
            data={formData.faceMap}
            onChange={(d) => setFormData(prev => ({ ...prev, faceMap: d }))}
            />

            <GoalsSection 
            data={formData.goals}
            onChange={(d) => setFormData(prev => ({ ...prev, goals: d }))}
            />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 text-sm mt-12 mb-6 print:hidden">
        &copy; {new Date().getFullYear()} SkinCare Professional System. All rights reserved.
      </footer>
    </div>
  );
};

export default App;