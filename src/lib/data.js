export const SPECIALTIES = [
  "All",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dentistry",
  "Psychiatry",
];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Amira Hassan",
    specialty: "Cardiology",
    rating: 4.9,
    location: "Dokki, Giza",
    years: 12,
  },
  {
    id: 2,
    name: "Dr. Kareem Talaat",
    specialty: "Dermatology",
    rating: 4.7,
    location: "Nasr City, Cairo",
    years: 9,
  },
  {
    id: 3,
    name: "Dr. Lina Farouk",
    specialty: "Pediatrics",
    rating: 4.8,
    location: "Heliopolis, Cairo",
    years: 10,
  },
  {
    id: 4,
    name: "Dr. Omar Salem",
    specialty: "Orthopedics",
    rating: 4.6,
    location: "Alexandria",
    years: 11,
  },
  {
    id: 5,
    name: "Dr. Nour El-Din",
    specialty: "Neurology",
    rating: 4.9,
    location: "Sheikh Zayed, Giza",
    years: 13,
  },
  {
    id: 6,
    name: "Dr. Mariam Adel",
    specialty: "Dentistry",
    rating: 4.5,
    location: "Maadi, Cairo",
    years: 7,
  },
  {
    id: 7,
    name: "Dr. Youssef Fathi",
    specialty: "Psychiatry",
    rating: 4.8,
    location: "New Cairo",
    years: 8,
  },
];

export const toProfile = (doc) => ({
  clinic: {
    name: `${doc.specialty} Care Clinic`,
    address: "123 Nile St",
    city: doc.location?.split(", ")[1] || "Cairo",
  },
  userId: {
    name: doc.name,
    email: `${doc.name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`,
    phone: "+201001112223",
  },
  specialization: doc.specialty,
  experience: doc.years,
  consultationFee: 400,
  availableDays: [],
  availableSlots: [],
  rating: doc.rating,
  reviewsCount: Math.floor(doc.rating * 20),
});
