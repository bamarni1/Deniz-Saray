export type Language = 'ar' | 'ku' | 'tr' | 'en';

export interface TranslationSet {
  appName: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappButton: string;
  aiAssistant: string;
  adminDashboard: string;
  
  // Navigation
  tourism: string;
  transport: string;
  hotelsFlights: string;
  medical: string;
  aiAdvisor: string;
  
  // Tourism Tab
  tourismTitle: string;
  tourismSubtitle: string;
  dailyPrograms: string;
  customItinerary: string;
  selectCity: string;
  bookTrip: string;
  daysCount: string;
  itineraryPlaceholder: string;
  istanbul: string;
  bursa: string;
  sapanca: string;
  trabzon: string;
  antalya: string;
  
  // Transport Tab
  transportTitle: string;
  transportSubtitle: string;
  airportPickup: string;
  vipCar: string;
  interCityTransfer: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  passengerCount: string;
  carType: string;
  estimatePrice: string;
  bookTransport: string;
  
  // Hotels & Flights Tab
  hotelsFlightsTitle: string;
  hotelsFlightsSubtitle: string;
  hotelBooking: string;
  flightBooking: string;
  destinationCity: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  comparePrices: string;
  fromAirport: string;
  toAirport: string;
  flightDate: string;
  classType: string;
  bookNow: string;
  
  // Medical Tab
  medicalTitle: string;
  medicalSubtitle: string;
  treatmentType: string;
  cosmetics: string;
  hairTransplant: string;
  dental: string;
  eyes: string;
  obesity: string;
  medicalTranslation: string;
  patientAccompaniment: string;
  followUp: string;
  requestAppointment: string;
  medicalNotes: string;
  
  // AI Assistant Chat Tab
  aiTitle: string;
  aiSubtitle: string;
  chatPlaceholder: string;
  sendMessage: string;
  snapchatGen: string;
  snapchatBtn: string;
  whatsappConnect: string;
  
  // Admin Panel
  adminTitle: string;
  adminSubtitle: string;
  bookings: string;
  clients: string;
  hotels: string;
  drivers: string;
  hospitals: string;
  notifications: string;
  reports: string;
  statsTitle: string;
  totalBookings: string;
  pendingActions: string;
  activeDrivers: string;
  activeHospitals: string;
  clientName: string;
  clientPhone: string;
  status: string;
  action: string;
  sendNotificationBtn: string;
  notificationContent: string;
  notifSuccess: string;
  
  // Common Forms
  name: string;
  phone: string;
  email: string;
  notes: string;
  successMessage: string;
  loading: string;
  close: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  type: 'tourism' | 'transport' | 'hotel_flight' | 'medical';
  details: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  date: string;
  createdAt: string;
}

export interface TourPackage {
  id: string;
  city: string;
  title: string;
  description: string;
  duration: string;
  priceEstimate: string;
  highlights: string[];
}

export interface HotelData {
  id: string;
  name: string;
  city: string;
  stars: number;
  pricePerNight: string;
  image: string;
}

export interface DriverData {
  id: string;
  name: string;
  carModel: string;
  languages: string[];
  status: 'Available' | 'On Trip' | 'Offline';
  phone: string;
  lat?: number;
  lng?: number;
}

export interface HospitalData {
  id: string;
  name: string;
  specialty: string[];
  city: string;
  rating: number;
}
