import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

export interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  images: string[];
  color: string;
}

export interface CatalogueSubItem {
  name: string;
  images: string[];
}

export interface CatalogueItem {
  id: string;
  title: string;
  span: string;
  image: string;
  items: CatalogueSubItem[];
}

interface SiteData {
  general: {
    logo: string;
    reviewsScore: string;
    reviewsCount: string;
  };
  hero: {
    poster: string;
    video: string;
  };
  beforeAfterGallery: {
    id: string;
    before: string;
    after: string;
    title: string;
  }[];
  materials: {
    hardware: string;
    countertop: string;
    laminate: string;
    complete: string;
  };
  sketchReveal: {
    sketch: string;
    reality: string;
  };
  anatomy: {
    inner: string;
    outer: string;
  };
  about: {
    architectureBg: string;
    founder: string;
    pm1: string;
    pm1Name: string;
    pm2: string;
    pm2Name: string;
    services: {
      kitchen: string;
      bedroom: string;
      living: string;
      civil: string;
      tiles: string;
      commercial: string;
    };
  };
  servicesList: {
    kitchen: string;
    bedroom: string;
    living: string;
    civil: string;
  };
  interactiveBoard: {
    hettich: string;
    blum: string;
    hafele: string;
    godrej: string;
    ozone: string;
    onyx: string;
  };
  portfolioPreview: {
    img1: string;
    img2: string;
    img3: string;
  };
  portfolio: PortfolioItem[];
  catalogue: CatalogueItem[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

const defaultSiteData: SiteData = {
  general: {
    logo: "",
    reviewsScore: "4.8",
    reviewsCount: "66"
  },
  hero: {
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    video: "https://cdn.pixabay.com/vimeo/328840148/architecture-22874.mp4?width=1280&hash=bdcd079ed94ed6cb264d8566def3673ab26f9554",
  },
  beforeAfterGallery: [
    {
      id: "1",
      before: "https://images.unsplash.com/photo-1596700684725-be96bdcfa4c9?q=80&w=1600&fit=crop",
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&fit=crop",
      title: "Living Room Modernization"
    },
    {
      id: "2",
      before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&fit=crop",
      after: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&fit=crop",
      title: "Kitchen Remodel"
    },
    {
      id: "3",
      before: "https://images.unsplash.com/photo-1596700684725-be96bdcfa4c9?q=80&w=1600&fit=crop",
      after: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&fit=crop",
      title: "Master Bedroom Upgrade"
    },
    {
      id: "4",
      before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&fit=crop",
      after: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&fit=crop",
      title: "Bathroom Renovation"
    }
  ],
  materials: {
    hardware: "https://images.unsplash.com/photo-1585913214539-75a6c11b08e2?q=80&w=400&fit=crop",
    countertop: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&fit=crop",
    laminate: "https://images.unsplash.com/photo-1546955070-5cb2f1aa029f?q=80&w=400&fit=crop",
    complete: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1600&fit=crop",
  },
  sketchReveal: {
    sketch: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&fit=crop",
    reality: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&fit=crop",
  },
  anatomy: {
    inner: "https://images.unsplash.com/photo-1596700684725-be96bdcfa4c9?q=80&w=1600&fit=crop",
    outer: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&fit=crop",
  },
  about: {
    architectureBg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&fit=crop",
    founder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&fit=crop",
    pm1: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&fit=crop",
    pm1Name: "Praveen Bishnoi",
    pm2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop",
    pm2Name: "Anil Sau",
    services: {
      kitchen: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=1200&fit=crop",
      bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&fit=crop",
      living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&fit=crop",
      civil: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&fit=crop",
      tiles: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600&fit=crop",
      commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&fit=crop",
    },
  },
  servicesList: {
    kitchen: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=600&fit=crop",
    bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&fit=crop",
    living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&fit=crop",
    civil: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&fit=crop",
  },
  interactiveBoard: {
    hettich: "https://images.unsplash.com/photo-1585913214539-75a6c11b08e2?q=80&w=400&fit=crop",
    blum: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&fit=crop",
    hafele: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&fit=crop",
    godrej: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=400&fit=crop",
    ozone: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&fit=crop",
    onyx: "https://images.unsplash.com/photo-1546955070-5cb2f1aa029f?q=80&w=400&fit=crop",
  },
  portfolioPreview: {
    img1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&fit=crop",
    img2: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&fit=crop",
    img3: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2000&fit=crop",
  },
  portfolio: [
    {
      id: 1,
      title: "The Oasis",
      location: "Kalyani Nagar",
      images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&fit=crop"],
      color: "#1d2524",
    },
    {
      id: 2,
      title: "Sunlit Serenade",
      location: "Koregoan Park",
      images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&fit=crop"],
      color: "#e3d5c8",
    },
    {
      id: 3,
      title: "Brutalist Warmth",
      location: "Baner",
      images: ["https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2000&fit=crop"],
      color: "#6b5e54",
    },
    {
      id: 4,
      title: "Urban Minimalist",
      location: "Viman Nagar",
      images: ["https://images.unsplash.com/photo-1598928302598-a832cb5e6cbf?q=80&w=2000&fit=crop"],
      color: "#353e4c",
    },
  ],
  catalogue: [
    {
      id: "01",
      title: "Modular Kitchen",
      span: "col-span-1 md:col-span-2 row-span-2",
      image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=1600&fit=crop",
      items: [
        { name: "Tandems (Acrylic, Laminate, PU + Deco)", images: ["https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&fit=crop"] },
        { name: "SS Stainless Trollies", images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&fit=crop"] },
        { name: "Wicker Baskets", images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&fit=crop"] },
        { name: "Premium Pantry Unit", images: ["https://plus.unsplash.com/premium_photo-1681980018596-3392ff150fa8?q=80&w=800&fit=crop"] },
        { name: "Sleek Rolling Shutter", images: ["https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800&fit=crop"] },
        { name: "Tall Unit Storage", images: ["https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=800&fit=crop"] },
        { name: "Crockery Cabinet (Fluted & Tinted Glass)", images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&fit=crop"] },
        { name: "Loft Integrations", images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&fit=crop"] },
        { name: "Platform Top (Quartz, Granite)", images: ["https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "02",
      title: "Accessories",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1585913214539-75a6c11b08e2?q=80&w=1600&fit=crop",
      items: [
        { name: "Premium Handles", images: ["https://images.unsplash.com/photo-1585913214539-75a6c11b08e2?q=80&w=800&fit=crop"] },
        { name: "Magical Corner Solutions", images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&fit=crop"] },
        { name: "Pantry Unit Pull-outs", images: ["https://images.unsplash.com/photo-1622372738982-bdfaca33ce1b?q=80&w=800&fit=crop"] },
        { name: "Masala Organizers", images: ["https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&fit=crop"] },
        { name: "Basket Elevator", images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "03",
      title: "Bedroom",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&fit=crop",
      items: [
        { name: "Hydraulic Storage Beds", images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&fit=crop"] },
        { name: "Side Tables & Headboards", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&fit=crop"] },
        { name: "Premium Wardrobes", images: ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&fit=crop"] },
        { name: "Custom Wall Decor", images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&fit=crop"] },
        { name: "Study Tables & Lofts", images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "04",
      title: "Living Room",
      span: "col-span-1 md:col-span-2 row-span-1",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&fit=crop",
      items: [
        { name: "TV Unit with Louvers", images: ["https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=800&fit=crop"] },
        { name: "Custom Mandir Design", images: ["https://images.unsplash.com/photo-1598928302598-a832cb5e6cbf?q=80&w=800&fit=crop"] },
        { name: "Premium Sofa Sets", images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&fit=crop"] },
        { name: "False Ceiling & Mood Lighting", images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&fit=crop"] },
        { name: "Architectural Partitions", images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "05",
      title: "Entrance",
      span: "col-span-1 md:col-span-1 row-span-2",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&fit=crop",
      items: [
        { name: "Welcome Wall Paneling", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&fit=crop"] },
        { name: "Concealed Shoe Racks", images: ["https://images.unsplash.com/photo-1595514535215-8121633f8e02?q=80&w=800&fit=crop"] },
        { name: "Safety Doors & Digital Locks", images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800&fit=crop"] },
        { name: "CNC Jali Features", images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&fit=crop"] },
        { name: "Grand Main Doors", images: ["https://images.unsplash.com/photo-1505362947231-152eab4c9e4c?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "06",
      title: "Balcony",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1545042746-8806c9a3eb53?q=80&w=1600&fit=crop",
      items: [
        { name: "PVC Ceilings", images: ["https://images.unsplash.com/photo-1510408544973-7e4fd2c1b2f7?q=80&w=800&fit=crop"] },
        { name: "Outdoor Seating", images: ["https://images.unsplash.com/photo-1545042746-8806c9a3eb53?q=80&w=800&fit=crop"] },
        { name: "Vertical Gardens", images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "07",
      title: "Wallpapers",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=1600&fit=crop",
      items: [
        { name: "Custom Designed Wallpapers", images: ["https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800&fit=crop"] },
        { name: "Textured Wall Offerings", images: ["https://images.unsplash.com/photo-1558211583-059902f5aaff?q=80&w=800&fit=crop"] },
        { name: "Imported Canvas Prints", images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "08",
      title: "Tiles & Floors",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&fit=crop",
      items: [
        { name: "Full Body Tiles", images: ["https://images.unsplash.com/photo-1581005831682-1dd772bf272f?q=80&w=800&fit=crop"] },
        { name: "Premium Ceramic Tiles", images: ["https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&fit=crop"] },
        { name: "Imported Marbles", images: ["https://images.unsplash.com/photo-1525087796338-7fd859bb3ee2?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "09",
      title: "Illumination",
      span: "col-span-1 md:col-span-2 row-span-1",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&fit=crop",
      items: [
        { name: "Panel Lights", images: ["https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&fit=crop"] },
        { name: "Profile & Magnetic Track Lights", images: ["https://images.unsplash.com/photo-1505404919723-002ecad81b92?q=80&w=800&fit=crop"] },
        { name: "Accent Spot Lights", images: ["https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?q=80&w=800&fit=crop"] },
        { name: "Cove Lighting", images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "10",
      title: "Civil Work",
      span: "col-span-1 md:col-span-1 row-span-1",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&fit=crop",
      items: [
        { name: "Precision Painting", images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&fit=crop"] },
        { name: "End-to-End Plumbing", images: ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&fit=crop"] },
        { name: "Structural Modifications", images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&fit=crop"] },
        { name: "Space Renovation", images: ["https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=800&fit=crop"] }
      ]
    },
    {
      id: "11",
      title: "Commercial",
      span: "col-span-1 md:col-span-3 row-span-1",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&fit=crop",
      items: [
        { name: "Modern Office Layouts", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&fit=crop"] },
        { name: "Retail Shop Displays", images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&fit=crop"] },
        { name: "Shopping Mall Kiosks", images: ["https://images.unsplash.com/photo-1519567281023-ad8fdecbfbc4?q=80&w=800&fit=crop"] }
      ]
    }
  ],
  contact: {
    phone: "+91 9876543210, 087930 93953",
    email: "bishnoimsuresh@gmail.com",
    address: "Sr. No. 282, Porwal Road, Near Kamlai Dairy, Kand Nagar, Lohegaon, Pune - 411047"
  }
};

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
  // Portfolio Actions
  updatePortfolioItem: (portfolioIndex: number, imageIndex: number, newImage: string) => void;
  updatePortfolioProjectDetails: (portfolioIndex: number, details: Partial<PortfolioItem>) => void | Promise<void>;
  addPortfolioProject: (project: Omit<PortfolioItem, "id">) => void;
  deletePortfolioProject: (portfolioIndex: number) => void;
  addPortfolioImage: (portfolioIndex: number, newImage: string) => void;
  removePortfolioImage: (portfolioIndex: number, imageIndex: number) => void;
  // Catalogue Actions
  updateCatalogueCover: (categoryId: string, newImage: string) => void;
  addCatalogueSubItemImage: (categoryId: string, itemIndex: number, newImage: string) => void;
  removeCatalogueSubItemImage: (categoryId: string, itemIndex: number, imageIndex: number) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    // Attempt to load from Firebase
    const dataRef = doc(db, "site", "data");
    
    // First, check local storage as a fallback to avoid flashing default layout
    const saved = localStorage.getItem("studio-a-site-data");
    let initialData = defaultSiteData;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        initialData = { ...defaultSiteData, ...parsed, contact: parsed.contact || defaultSiteData.contact };
        setData(initialData);
      } catch (e) {}
    }

    // Subscribe to Firebase explicitly
    const unsubscribe = onSnapshot(dataRef, (docSnap) => {
      if (docSnap.exists()) {
        const fireData = docSnap.data() as Partial<SiteData>;
        const mergedData = { ...defaultSiteData, ...fireData, contact: fireData.contact || defaultSiteData.contact };
        setData(mergedData);
        // Also update local storage for offline fast load
        localStorage.setItem("studio-a-site-data", JSON.stringify(mergedData));
      } else {
        // Init firebase with current data
        setDoc(dataRef, initialData).catch(console.error);
      }
    }, (error) => {
       console.error("Firebase sync error:", error);
    });

    return () => unsubscribe();
  }, []);

  const updateData = (newData: Partial<SiteData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      // Sync to Firebase
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  // --- Portfolio Functions ---

  const updatePortfolioProjectDetails = async (portfolioIndex: number, details: Partial<PortfolioItem>) => {
    return new Promise<void>((resolve, reject) => {
      setData((prev) => {
        const newPortfolio = [...prev.portfolio];
        if (newPortfolio[portfolioIndex]) {
          newPortfolio[portfolioIndex] = { ...newPortfolio[portfolioIndex], ...details };
        }
        const updated = { ...prev, portfolio: newPortfolio };
        localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
        setDoc(doc(db, "site", "data"), updated, { merge: true })
          .then(() => resolve())
          .catch((err) => reject(err));
        return updated;
      });
    });
  };

  const updatePortfolioItem = (portfolioIndex: number, imageIndex: number, newImage: string) => {
    setData((prev) => {
      const newPortfolio = [...prev.portfolio];
      if (newPortfolio[portfolioIndex]) {
        const newImages = [...(newPortfolio[portfolioIndex].images || [])];
        newImages[imageIndex] = newImage;
        newPortfolio[portfolioIndex].images = newImages;
      }
      const updated = { ...prev, portfolio: newPortfolio };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const addPortfolioProject = (project: Omit<PortfolioItem, "id">) => {
    setData((prev) => {
      const newId = prev.portfolio.length > 0 ? Math.max(...prev.portfolio.map(p => p.id)) + 1 : 1;
      const updated = { ...prev, portfolio: [...prev.portfolio, { ...project, id: newId }] };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const deletePortfolioProject = (portfolioIndex: number) => {
    setData((prev) => {
      const newPortfolio = [...prev.portfolio];
      newPortfolio.splice(portfolioIndex, 1);
      const updated = { ...prev, portfolio: newPortfolio };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const addPortfolioImage = (portfolioIndex: number, newImage: string) => {
    setData((prev) => {
      const newPortfolio = [...prev.portfolio];
      if (newPortfolio[portfolioIndex]) {
        newPortfolio[portfolioIndex].images = [...(newPortfolio[portfolioIndex].images || []), newImage];
      }
      const updated = { ...prev, portfolio: newPortfolio };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const removePortfolioImage = (portfolioIndex: number, imageIndex: number) => {
    setData((prev) => {
      const newPortfolio = [...prev.portfolio];
      if (newPortfolio[portfolioIndex]) {
        const newImages = [...(newPortfolio[portfolioIndex].images || [])];
        newImages.splice(imageIndex, 1);
        newPortfolio[portfolioIndex].images = newImages;
      }
      const updated = { ...prev, portfolio: newPortfolio };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  // --- Catalogue Functions ---

  const updateCatalogueCover = (categoryId: string, newImage: string) => {
    setData((prev) => {
      const newCatalogue = prev.catalogue.map((cat) => 
        cat.id === categoryId ? { ...cat, image: newImage } : cat
      );
      const updated = { ...prev, catalogue: newCatalogue };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const addCatalogueSubItemImage = (categoryId: string, itemIndex: number, newImage: string) => {
    setData((prev) => {
      const newCatalogue = prev.catalogue.map((cat) => {
        if (cat.id === categoryId) {
          const newItems = [...cat.items];
          if (newItems[itemIndex]) {
            newItems[itemIndex] = { 
              ...newItems[itemIndex], 
              images: [...(newItems[itemIndex].images || []), newImage] 
            };
          }
          return { ...cat, items: newItems };
        }
        return cat;
      });
      const updated = { ...prev, catalogue: newCatalogue };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  const removeCatalogueSubItemImage = (categoryId: string, itemIndex: number, imageIndex: number) => {
    setData((prev) => {
      const newCatalogue = prev.catalogue.map((cat) => {
        if (cat.id === categoryId) {
          const newItems = [...cat.items];
          if (newItems[itemIndex]) {
            const newImages = [...(newItems[itemIndex].images || [])];
            newImages.splice(imageIndex, 1);
            newItems[itemIndex] = { ...newItems[itemIndex], images: newImages };
          }
          return { ...cat, items: newItems };
        }
        return cat;
      });
      const updated = { ...prev, catalogue: newCatalogue };
      localStorage.setItem("studio-a-site-data", JSON.stringify(updated));
      setDoc(doc(db, "site", "data"), updated, { merge: true }).catch(console.error);
      return updated;
    });
  };

  return (
    <SiteDataContext.Provider value={{ 
      data, updateData, 
      updatePortfolioItem, updatePortfolioProjectDetails, addPortfolioProject, deletePortfolioProject, addPortfolioImage, removePortfolioImage,
      updateCatalogueCover, addCatalogueSubItemImage, removeCatalogueSubItemImage 
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
