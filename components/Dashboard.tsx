
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig.ts';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FormData } from '../types.ts';

interface Props {
  onEdit: (data: FormData) => void;
  onCreateNew: () => void;
}

const formatDate = (timestamp: any) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
};

export const Dashboard: React.FC<Props> = ({ onEdit, onCreateNew }) => {
  const [list, setList] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "consultations"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data: FormData[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as FormData);
      });
      setList(data);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      alert("Không thể tải danh sách. Kiểm tra kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa hồ sơ của "${name}" không?`)) {
      try {
        await deleteDoc(doc(db, "consultations", id));
        setList(prev => prev.filter(item => item.id !== id));
      } catch (e) {
        alert("Xóa thất bại.");
        console.error(e);
      }
    }
  };

  const filteredList = list.filter(item => 
    item.personal.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.personal.phone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-teal-800">Danh sách hồ sơ tư vấn</h2>
        <button 
          onClick={onCreateNew}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tạo phiếu mới
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Đang tải dữ liệu...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 text-sm uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Thời gian</th>
                  <th className="p-4 border-b border-slate-200">Khách hàng</th>
                  <th className="p-4 border-b border-slate-200">SĐT</th>
                  <th className="p-4 border-b border-slate-200">Năm sinh</th>
                  <th className="p-4 border-b border-slate-200 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">Chưa có dữ liệu nào.</td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition border-b border-slate-100 last:border-0">
                      <td className="p-4 text-slate-600 text-sm whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="p-4 font-medium text-slate-800">
                        {item.personal.fullName}
                        <div className="text-xs text-slate-500 md:hidden">{item.personal.phone}</div>
                      </td>
                      <td className="p-4 text-slate-600 hidden md:table-cell">{item.personal.phone}</td>
                      <td className="p-4 text-slate-600 hidden md:table-cell">{item.personal.dob}</td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button 
                          onClick={() => onEdit(item)}
                          className="text-teal-600 hover:text-teal-800 font-medium text-sm inline-flex items-center gap-1 px-2 py-1 bg-teal-50 rounded"
                        >
                          Xem / Sửa
                        </button>
                        <button 
                          onClick={() => item.id && handleDelete(item.id, item.personal.fullName)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center gap-1 px-2 py-1 bg-red-50 rounded"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
