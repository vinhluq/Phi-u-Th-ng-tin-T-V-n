import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase cho dự án saohanapp
const firebaseConfig = {
  apiKey: "AIzaSyAmztfHVW9g6qRIcE_kZnNUsEuPt89tF94",
  authDomain: "saohanapp.firebaseapp.com",
  projectId: "saohanapp",
  storageBucket: "saohanapp.firebasestorage.app",
  messagingSenderId: "444734023820",
  appId: "1:444734023820:web:83a499e6d9e4eaa3aa73a9",
  measurementId: "G-Q0C1Y4FMFL"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo và xuất Firestore Database để dùng trong App.tsx
export const db = getFirestore(app);