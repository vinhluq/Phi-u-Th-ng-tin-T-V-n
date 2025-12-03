
import React, { useState } from 'react';
import { PersonalInfoSection } from './components/PersonalInfoSection.tsx';
import { SkinHealthSection } from './components/SkinHealthSection.tsx';
import { HabitsSection } from './components/HabitsSection.tsx';
import { FaceMapSection } from './components/FaceMapSection.tsx';
import { GoalsSection } from './components/GoalsSection.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { FormData, INITIAL_DATA } from './types.ts';
import { db } from './firebaseConfig.ts';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Icons
const Save = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const Refresh = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
const Print = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const Back = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const Spinner = () => <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;

type ViewMode = 'list' | 'form';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('list');
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.personal.fullName) {
      alert("Vui lòng nhập họ tên khách hàng trước khi lưu.");
      return;
    }

    // Basic validation
    if (formData.personal.fullName.includes("Văn A") && !formData.id) { 
        if(!confirm("Tên khách hàng đang là tên mẫu 'Nguyễn Văn A'. Bạn có chắc muốn lưu không?")) return;
    }

    setIsSubmitting(true);
    try {
      const dataToSave = {
        ...formData,
        // Don't save the ID field into the document data itself explicitly if not needed, 
        // but keeping it doesn't hurt.
        updatedAt: serverTimestamp(), 
      };

      if (formData.id) {
        // UPDATE Existing
        const docRef = doc(db, "consultations", formData.id);
        // Remove id from payload to avoid circular reference if any, though Firestore handles it.
        const { id, ...data } = dataToSave; 
        await updateDoc(docRef, data);
        alert("Đã cập nhật hồ sơ thành công!");
      } else {
        // CREATE New
        const { id, ...data } = dataToSave;
        const docRef = await addDoc(collection(db, "consultations"), {
          ...data,
          createdAt: serverTimestamp(),
          status: 'new'
        });
        // Update local state with new ID
        setFormData(prev => ({ ...prev, id: docRef.id }));
        alert(`Đã tạo hồ sơ mới thành công!\nMã: ${docRef.id}`);
      }
      
    } catch (e: any) {
      console.error("Error adding/updating document: ", e);
      let errorMessage = "Đã xảy ra lỗi khi lưu dữ liệu.";
      if (e.code === 'permission-denied') errorMessage += "\n\nLỗi quyền truy cập.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if(window.confirm("Bạn có chắc chắn muốn xóa dữ liệu đang nhập để tạo mới?")) {
        setFormData(INITIAL_DATA);
    }
  };

  const handleCreateNew = () => {
    setFormData(INITIAL_DATA);
    setView('form');
  };

  const handleEdit = (data: FormData) => {
    setFormData(data);
    setView('form');
  };

  const handleBackToList = () => {
    setView('list');
    setFormData(INITIAL_DATA); // Clean up
  };

  const handlePrint = () => {
    window.print();
  };

  if (view === 'list') {
    return <Dashboard onEdit={handleEdit} onCreateNew={handleCreateNew} />;
  }

  return (
    <div className="min-h-screen pb-12 print:bg-white print:pb-0 print:h-auto">
      {/* Header */}
      <header className="bg-teal-700 text-white py-6 shadow-md print:hidden">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <button onClick={handleBackToList} className="p-2 hover:bg-teal-600 rounded-full transition" title="Quay lại danh sách">
                    <Back />
                 </button>
                 <div>
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Phiếu Thông Tin Tư Vấn</h1>
                    <p className="text-teal-100 text-sm mt-1 opacity-90">Skin Analysis & Consultation Form</p>
                 </div>
            </div>
            <div className="hidden md:block">
                <span className="bg-teal-800 px-3 py-1 rounded text-xs font-mono">
                    {formData.id ? `EDIT MODE: ${formData.id.slice(0,6)}...` : 'NEW MODE'}
                </span>
            </div>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block mb-8 text-center border-b-2 border-teal-600 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-teal-800">Phiếu Thông Tin Tư Vấn</h1>
        <p className="text-slate-500 text-sm">Skin Analysis & Consultation Form</p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 -mt-4 print:mt-0 print:p-0 max-w-5xl">
         {/* Actions Toolbar */}
         <div className="flex justify-between items-center mb-4 print:hidden bg-slate-100 p-2 rounded-lg border border-slate-200">
             <button 
                onClick={handleBackToList}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-teal-700 font-medium text-sm"
             >
                <ListIcon /> Danh sách
             </button>

             <div className="flex gap-3">
                <button 
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded shadow-sm hover:bg-slate-50 transition-colors border border-slate-200 disabled:opacity-50"
                >
                    <Refresh /> Đặt lại
                </button>
                <button 
                    onClick={handlePrint}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded shadow-sm hover:bg-slate-50 transition-colors border border-slate-200 disabled:opacity-50"
                >
                    <Print /> In phiếu
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded shadow-sm hover:bg-teal-700 transition-colors font-medium disabled:opacity-75 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? <Spinner /> : <Save />} 
                    {isSubmitting ? 'Đang lưu...' : (formData.id ? 'Cập nhật' : 'Lưu mới')}
                </button>
             </div>
         </div>

        <div className="print:block">
            {/* PAGE 1 CONTENT */}
            <div className="print-page-1">
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
            </div>

            {/* Force Page Break */}
            <div className="print-page-break"></div>

            {/* PAGE 2 CONTENT */}
            <div className="print-page-2">
                <FaceMapSection 
                data={formData.faceMap}
                onChange={(d) => setFormData(prev => ({ ...prev, faceMap: d }))}
                />

                <GoalsSection 
                data={formData.goals}
                onChange={(d) => setFormData(prev => ({ ...prev, goals: d }))}
                />
            </div>
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
