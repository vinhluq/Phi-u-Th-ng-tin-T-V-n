export interface PersonalInfo {
  fullName: string;
  dob: string;
  gender: 'male' | 'female' | 'other' | '';
  phone: string;
  email: string;
  studentId: string;
  major: string;
}

export interface SkinHealth {
  currentConditions: string[]; // Mụn viêm, Mụn đầu đen, etc.
  skinType: string[]; // Da dầu, Da khô, etc. (Checkbox behavior in image implies multiple possible)
  history: {
    treatedAcne: { value: boolean; note: string };
    prescribedMeds: { value: boolean; note: string };
    retinoids: { value: boolean; note: string };
    allergies: { value: boolean; note: string };
  };
}

export interface Habits {
  cleanser: 'sang' | 'toi' | 'ca_hai' | 'khong';
  makeupRemover: boolean;
  moisturizer: boolean;
  sunscreen: 'moingay' | 'thinhthoang' | 'khong';
  currentProducts: string;
  sleep: boolean; // Enough 7-8h
  stress: boolean;
  water: '<1L' | '1-2L' | '>2L' | '';
  dietSpicySweet: boolean;
}

export interface FaceMapZone {
  id: string;
  label: string;
  conditions: string[];
}

export interface Goals {
  targets: string[]; // Hết mụn, Giảm thâm...
  other: string;
  agreedToAnalysis: boolean;
  agreedToTreatment: boolean;
}

export interface FormData {
  personal: PersonalInfo;
  skinHealth: SkinHealth;
  habits: Habits;
  faceMap: Record<string, string[]>; // zoneId -> selected conditions
  goals: Goals;
}

export const INITIAL_DATA: FormData = {
  personal: {
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    studentId: '',
    major: '',
  },
  skinHealth: {
    currentConditions: [],
    skinType: [],
    history: {
      treatedAcne: { value: false, note: '' },
      prescribedMeds: { value: false, note: '' },
      retinoids: { value: false, note: '' },
      allergies: { value: false, note: '' },
    },
  },
  habits: {
    cleanser: 'khong',
    makeupRemover: false,
    moisturizer: false,
    sunscreen: 'khong',
    currentProducts: '',
    sleep: false,
    stress: false,
    water: '',
    dietSpicySweet: false,
  },
  faceMap: {},
  goals: {
    targets: [],
    other: '',
    agreedToAnalysis: false,
    agreedToTreatment: false,
  },
};
