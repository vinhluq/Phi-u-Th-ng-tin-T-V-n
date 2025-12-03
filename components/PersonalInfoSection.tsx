import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { TextInput, Radio } from './InputFields';
import { FormData } from '../types';

interface Props {
  data: FormData['personal'];
  onChange: (data: FormData['personal']) => void;
}

export const PersonalInfoSection: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof FormData['personal'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionWrapper title="1. Thông Tin Cá Nhân">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Họ và tên"
          value={data.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          placeholder="Nguyễn Văn A"
        />
        <TextInput
          label="Ngày sinh"
          type="date"
          value={data.dob}
          onChange={(e) => update('dob', e.target.value)}
        />
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Giới tính</label>
          <div className="flex space-x-6 mt-1">
            <Radio
              label="Nam"
              name="gender"
              value="male"
              checked={data.gender === 'male'}
              onChange={(v) => update('gender', v)}
            />
            <Radio
              label="Nữ"
              name="gender"
              value="female"
              checked={data.gender === 'female'}
              onChange={(v) => update('gender', v)}
            />
             <Radio
              label="Khác"
              name="gender"
              value="other"
              checked={data.gender === 'other'}
              onChange={(v) => update('gender', v)}
            />
          </div>
        </div>

        <TextInput
          label="SĐT"
          type="tel"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
        />
        <TextInput
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
        />
         <TextInput
          label="Mã số sinh viên"
          value={data.studentId}
          onChange={(e) => update('studentId', e.target.value)}
        />
         <TextInput
          label="Khoa / Ngành học"
          value={data.major}
          onChange={(e) => update('major', e.target.value)}
        />
      </div>
    </SectionWrapper>
  );
};