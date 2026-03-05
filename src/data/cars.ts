export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  seats: number;
  mileage: string;
  rating: number;
  reviews: number;
  available: boolean;
  features: string[];
  year: number;
  ac: boolean;
  gps: boolean;
  bluetooth: boolean;
  insurance: boolean;
  category: "Sedan" | "SUV" | "Sports" | "Luxury" | "Compact";
}

export const carsData: Car[] = [
  {
    id: "1", name: "Mercedes S-Class", brand: "Mercedes", price: 250, category: "Luxury",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    ],
    description: "Experience ultimate luxury with the Mercedes S-Class. Premium comfort meets cutting-edge technology.",
    fuel: "Petrol", transmission: "Automatic", seats: 5, mileage: "12 km/l", rating: 4.9, reviews: 48,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Leather Seats", "Panoramic Roof", "Massage Seats", "Night Vision", "Ambient Lighting"],
  },
  {
    id: "2", name: "BMW X5", brand: "BMW", price: 200, category: "SUV",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800",
    ],
    description: "The BMW X5 combines sporty performance with versatile functionality and luxury.",
    fuel: "Diesel", transmission: "Automatic", seats: 7, mileage: "14 km/l", rating: 4.7, reviews: 35,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["All-Wheel Drive", "Heated Seats", "Harman Kardon Sound", "Parking Assistant"],
  },
  {
    id: "3", name: "Porsche 911", brand: "Porsche", price: 400, category: "Sports",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
    ],
    description: "The iconic Porsche 911 delivers pure sports car thrills with everyday usability.",
    fuel: "Petrol", transmission: "Automatic", seats: 2, mileage: "10 km/l", rating: 4.8, reviews: 62,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Sport Chrono Package", "PASM", "Bose Sound System", "Sport Exhaust"],
  },
  {
    id: "4", name: "Range Rover Sport", brand: "Land Rover", price: 280, category: "SUV",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=600",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800",
    ],
    description: "Commanding presence with refined luxury. The Range Rover Sport dominates any terrain.",
    fuel: "Diesel", transmission: "Automatic", seats: 5, mileage: "11 km/l", rating: 4.6, reviews: 29,
    available: true, year: 2023, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Terrain Response", "Meridian Sound", "Air Suspension", "360° Camera"],
  },
  {
    id: "5", name: "Audi A8", brand: "Audi", price: 220, category: "Luxury",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    ],
    description: "The Audi A8 redefines luxury with its sophisticated technology and timeless design.",
    fuel: "Petrol", transmission: "Automatic", seats: 5, mileage: "13 km/l", rating: 4.7, reviews: 31,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Virtual Cockpit", "Matrix LED", "Quattro AWD", "Bang & Olufsen Sound"],
  },
  {
    id: "6", name: "Tesla Model 3", brand: "Tesla", price: 150, category: "Sedan",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    ],
    description: "Electric performance meets minimalist design. Zero emissions, maximum thrills.",
    fuel: "Electric", transmission: "Automatic", seats: 5, mileage: "500 km range", rating: 4.5, reviews: 55,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Autopilot", "15\" Touchscreen", "Glass Roof", "Over-the-air Updates"],
  },
  {
    id: "7", name: "Toyota Camry", brand: "Toyota", price: 80, category: "Sedan",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"],
    description: "Reliable, comfortable, and fuel-efficient. The perfect everyday sedan.",
    fuel: "Hybrid", transmission: "Automatic", seats: 5, mileage: "20 km/l", rating: 4.4, reviews: 42,
    available: true, year: 2024, ac: true, gps: true, bluetooth: true, insurance: true,
    features: ["Toyota Safety Sense", "Apple CarPlay", "JBL Audio", "Wireless Charging"],
  },
  {
    id: "8", name: "Volkswagen Golf", brand: "Volkswagen", price: 65, category: "Compact",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"],
    description: "The iconic Golf. Compact yet spacious, efficient yet fun to drive.",
    fuel: "Petrol", transmission: "Manual", seats: 5, mileage: "18 km/l", rating: 4.3, reviews: 28,
    available: false, year: 2023, ac: true, gps: false, bluetooth: true, insurance: true,
    features: ["Digital Cockpit", "Adaptive Cruise", "Park Assist", "LED Headlights"],
  },
];

export const brands = [...new Set(carsData.map(c => c.brand))];
export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"] as const;
export const transmissionTypes = ["Automatic", "Manual"] as const;
