import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, addDoc, onSnapshot, query, where, orderBy, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  projectId: "gen-lang-client-0323898474",
  appId: "1:938408383664:web:6fa738625e6f0efe56d775",
  apiKey: "AIzaSyB4jQzGRQsINNA-D9BnMYgnLS3teH1VxYs",
  authDomain: "gen-lang-client-0323898474.firebaseapp.com",
  storageBucket: "gen-lang-client-0323898474.firebasestorage.app",
  messagingSenderId: "938408383664"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId
export const db = initializeFirestore(app, {}, "ai-studio-denizsaraytravel-e4dda878-eb8e-4293-8ff5-a01b4122dc69");

// Initialize Auth
export const auth = getAuth(app);

// Sign in anonymously on load with local UUID fallback
export const initAuth = (onUserReady: (uid: string) => void) => {
  const getFallbackId = () => {
    let localId = localStorage.getItem("deniz_saray_fallback_uid");
    if (!localId) {
      localId = `client_fallback_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`;
      localStorage.setItem("deniz_saray_fallback_uid", localId);
    }
    return localId;
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      onUserReady(user.uid);
    } else {
      try {
        const credential = await signInAnonymously(auth);
        if (credential.user) {
          onUserReady(credential.user.uid);
        }
      } catch (err) {
        console.warn("Firebase Anonymous Auth restricted or failed. Using persistent local client-side UUID instead:", err);
        const fallbackId = getFallbackId();
        onUserReady(fallbackId);
      }
    }
  });
};

// Bookings Helper Types
export interface FirebaseBooking {
  id?: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientWhatsapp: string;
  nationality: string;
  peopleCount: number;
  travelDate: string;
  type: 'tourism' | 'transport' | 'hotel_flight' | 'medical';
  details: string;
  notes: string;
  status: 'new' | 'reviewing' | 'contacted' | 'booked' | 'completed' | 'cancelled';
  createdAt: string;
}

// Chat message interface
export interface ChatMessage {
  id?: string;
  clientId: string;
  sender: 'client' | 'admin';
  senderName: string;
  content: string;
  timestamp: string;
}
