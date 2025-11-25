import { useState, useRef } from "react";
import { 
  ChevronLeft, ChevronRight, Star, MapPin, Clock, 
  Users, Shield, TrendingUp, Briefcase, Code, 
  PenTool, BarChart3, DollarSign, Brain, Heart
} from "lucide-react";

import { useNavigate } from "react-router-dom";


// Types
type Category = "IT" | "HR" | "Business" | "Design" | "Marketing" | "Finance" | "AI";

interface Profile {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  rating: number;
  price: string;
  category: Category;
  company: string;
  avatar: string;
  location: string;
  reviews: number;
  responseTime: string;
  successRate: number;
  isVerified: boolean;
  isFeatured?: boolean;
}

// Data - Expanded for better display
const profiles: Profile[] = [
  // IT Profiles
  {
    id: "it-1",
    name: "Rajesh Kumar",
    role: "Full Stack Developer",
    experience: "6 years",
    skills: ["React", "Node.js", "System Design"],
    rating: 4.8,
    price: "₹399",
    category: "IT",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    location: "Hyderabad",
    reviews: 189,
    responseTime: "1 hour",
    successRate: 92,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "it-2",
    name: "Alok Mehta",
    role: "Cloud Architect",
    experience: "7 years",
    skills: ["AWS", "Azure", "DevOps"],
    rating: 4.9,
    price: "₹449",
    category: "IT",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 210,
    responseTime: "2 hours",
    successRate: 94,
    isVerified: true
  },
  {
    id: "it-3",
    name: "Priya Patel",
    role: "DevOps Engineer",
    experience: "5 years",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    rating: 4.7,
    price: "₹379",
    category: "IT",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop",
    location: "Pune",
    reviews: 156,
    responseTime: "3 hours",
    successRate: 91,
    isVerified: true
  },
  {
    id: "it-4",
    name: "Amit Sharma",
    role: "Data Scientist",
    experience: "6 years",
    skills: ["Python", "ML", "TensorFlow"],
    rating: 4.8,
    price: "₹429",
    category: "IT",
    company: "Meta",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
    location: "Delhi",
    reviews: 178,
    responseTime: "2 hours",
    successRate: 93,
    isVerified: true
  },
  {
    id: "it-5",
    name: "Neha Gupta",
    role: "Backend Developer",
    experience: "5 years",
    skills: ["Java", "Spring", "Microservices"],
    rating: 4.7,
    price: "₹359",
    category: "IT",
    company: "Uber",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 145,
    responseTime: "4 hours",
    successRate: 89,
    isVerified: true
  },
  {
    id: "it-6",
    name: "Vikram Singh",
    role: "Mobile Developer",
    experience: "6 years",
    skills: ["React Native", "Flutter", "iOS"],
    rating: 4.8,
    price: "₹389",
    category: "IT",
    company: "Flipkart",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 167,
    responseTime: "3 hours",
    successRate: 92,
    isVerified: true
  },

  // HR Profiles
  {
    id: "hr-1",
    name: "Sarah Johnson",
    role: "Senior Technical Recruiter",
    experience: "8 years",
    skills: ["Technical Hiring", "Behavioral", "Leadership"],
    rating: 4.9,
    price: "₹299",
    category: "HR",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 234,
    responseTime: "2 hours",
    successRate: 95,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "hr-2",
    name: "David Kim",
    role: "HR Director",
    experience: "10 years",
    skills: ["Leadership", "Culture", "Strategy"],
    rating: 4.8,
    price: "₹499",
    category: "HR",
    company: "Apple",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 201,
    responseTime: "3 hours",
    successRate: 94,
    isVerified: true
  },
  {
    id: "hr-3",
    name: "Anjali Reddy",
    role: "Talent Acquisition Lead",
    experience: "7 years",
    skills: ["Sourcing", "Screening", "Onboarding"],
    rating: 4.7,
    price: "₹329",
    category: "HR",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    location: "Hyderabad",
    reviews: 189,
    responseTime: "2 hours",
    successRate: 92,
    isVerified: true
  },
  {
    id: "hr-4",
    name: "Rahul Verma",
    role: "HR Business Partner",
    experience: "6 years",
    skills: ["HRBP", "Employee Relations", "Policy"],
    rating: 4.6,
    price: "₹279",
    category: "HR",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    location: "Pune",
    reviews: 145,
    responseTime: "4 hours",
    successRate: 90,
    isVerified: true
  },
  {
    id: "hr-5",
    name: "Meera Nair",
    role: "Recruitment Manager",
    experience: "8 years",
    skills: ["Campus Hiring", "Lateral", "Assessment"],
    rating: 4.8,
    price: "₹349",
    category: "HR",
    company: "Infosys",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 178,
    responseTime: "3 hours",
    successRate: 93,
    isVerified: true
  },
  {
    id: "hr-6",
    name: "Karan Malhotra",
    role: "People Operations",
    experience: "5 years",
    skills: ["HR Operations", "Benefits", "Payroll"],
    rating: 4.7,
    price: "₹299",
    category: "HR",
    company: "Swiggy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 134,
    responseTime: "2 hours",
    successRate: 91,
    isVerified: true
  },

  // Business Profiles
  {
    id: "bus-1",
    name: "Michael Chen",
    role: "Business Consultant",
    experience: "10 years",
    skills: ["Strategy", "Analysis", "Operations"],
    rating: 4.8,
    price: "₹449",
    category: "Business",
    company: "McKinsey",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 201,
    responseTime: "4 hours",
    successRate: 91,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "bus-2",
    name: "Simran Dhawan",
    role: "Business Analyst",
    experience: "6 years",
    skills: ["Finance", "Reporting", "Analysis"],
    rating: 4.7,
    price: "₹329",
    category: "Business",
    company: "BCG",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    location: "Delhi",
    reviews: 167,
    responseTime: "3 hours",
    successRate: 89,
    isVerified: true
  },
  {
    id: "bus-3",
    name: "Arjun Kapoor",
    role: "Product Manager",
    experience: "8 years",
    skills: ["Product Strategy", "Roadmap", "Agile"],
    rating: 4.9,
    price: "₹479",
    category: "Business",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 223,
    responseTime: "2 hours",
    successRate: 95,
    isVerified: true
  },
  {
    id: "bus-4",
    name: "Kavya Iyer",
    role: "Operations Manager",
    experience: "7 years",
    skills: ["Operations", "Process", "Efficiency"],
    rating: 4.6,
    price: "₹349",
    category: "Business",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    location: "Hyderabad",
    reviews: 156,
    responseTime: "4 hours",
    successRate: 88,
    isVerified: true
  },
  {
    id: "bus-5",
    name: "Rohan Desai",
    role: "Strategy Consultant",
    experience: "9 years",
    skills: ["Corporate Strategy", "M&A", "Growth"],
    rating: 4.8,
    price: "₹499",
    category: "Business",
    company: "Bain",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 189,
    responseTime: "5 hours",
    successRate: 93,
    isVerified: true
  },
  {
    id: "bus-6",
    name: "Tanvi Shah",
    role: "Business Development",
    experience: "5 years",
    skills: ["Sales", "Partnerships", "Growth"],
    rating: 4.7,
    price: "₹319",
    category: "Business",
    company: "Flipkart",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 145,
    responseTime: "3 hours",
    successRate: 90,
    isVerified: true
  },

  // Design Profiles
  {
    id: "des-1",
    name: "Priya Sharma",
    role: "UX/UI Designer",
    experience: "7 years",
    skills: ["Figma", "User Research", "Prototyping"],
    rating: 4.9,
    price: "₹349",
    category: "Design",
    company: "Adobe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    location: "Pune",
    reviews: 198,
    responseTime: "3 hours",
    successRate: 94,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "des-2",
    name: "Alex Turner",
    role: "Product Designer",
    experience: "6 years",
    skills: ["Design Systems", "UX", "Accessibility"],
    rating: 4.8,
    price: "₹379",
    category: "Design",
    company: "Spotify",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 167,
    responseTime: "2 hours",
    successRate: 92,
    isVerified: true
  },
  {
    id: "des-3",
    name: "Sneha Reddy",
    role: "Visual Designer",
    experience: "5 years",
    skills: ["Brand Design", "Illustration", "Animation"],
    rating: 4.7,
    price: "₹299",
    category: "Design",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 134,
    responseTime: "4 hours",
    successRate: 89,
    isVerified: true
  },
  {
    id: "des-4",
    name: "Karthik Menon",
    role: "Interaction Designer",
    experience: "8 years",
    skills: ["Prototyping", "Animation", "Micro-interactions"],
    rating: 4.8,
    price: "₹399",
    category: "Design",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
    location: "Hyderabad",
    reviews: 178,
    responseTime: "3 hours",
    successRate: 93,
    isVerified: true
  },
  {
    id: "des-5",
    name: "Riya Joshi",
    role: "Design Lead",
    experience: "9 years",
    skills: ["Team Management", "Strategy", "Mentoring"],
    rating: 4.9,
    price: "₹449",
    category: "Design",
    company: "Apple",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 210,
    responseTime: "4 hours",
    successRate: 95,
    isVerified: true
  },
  {
    id: "des-6",
    name: "Aditya Kumar",
    role: "UI Developer",
    experience: "4 years",
    skills: ["HTML/CSS", "React", "Animations"],
    rating: 4.6,
    price: "₹279",
    category: "Design",
    company: "Zomato",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    location: "Delhi",
    reviews: 123,
    responseTime: "2 hours",
    successRate: 88,
    isVerified: true
  },

  // Marketing Profiles
  {
    id: "mar-1",
    name: "Anjali Verma",
    role: "Marketing Strategist",
    experience: "6 years",
    skills: ["SEO", "Content", "Analytics"],
    rating: 4.8,
    price: "₹329",
    category: "Marketing",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    location: "Delhi",
    reviews: 178,
    responseTime: "2 hours",
    successRate: 93,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "mar-2",
    name: "James Carter",
    role: "Digital Marketing Lead",
    experience: "8 years",
    skills: ["Paid Ads", "Social Media", "Email"],
    rating: 4.9,
    price: "₹399",
    category: "Marketing",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 201,
    responseTime: "3 hours",
    successRate: 95,
    isVerified: true
  },
  {
    id: "mar-3",
    name: "Pooja Singh",
    role: "Content Marketing",
    experience: "5 years",
    skills: ["Content Strategy", "Writing", "SEO"],
    rating: 4.7,
    price: "₹289",
    category: "Marketing",
    company: "HubSpot",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    location: "Pune",
    reviews: 145,
    responseTime: "4 hours",
    successRate: 90,
    isVerified: true
  },
  {
    id: "mar-4",
    name: "Sanjay Patel",
    role: "Growth Marketing",
    experience: "7 years",
    skills: ["Growth Hacking", "Analytics", "A/B Testing"],
    rating: 4.8,
    price: "₹379",
    category: "Marketing",
    company: "Uber",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 167,
    responseTime: "3 hours",
    successRate: 92,
    isVerified: true
  },
  {
    id: "mar-5",
    name: "Divya Nair",
    role: "Brand Manager",
    experience: "6 years",
    skills: ["Brand Strategy", "Positioning", "Creative"],
    rating: 4.7,
    price: "₹349",
    category: "Marketing",
    company: "Coca-Cola",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    location: "Hyderabad",
    reviews: 156,
    responseTime: "4 hours",
    successRate: 91,
    isVerified: true
  },
  {
    id: "mar-6",
    name: "Vikram Rao",
    role: "Performance Marketing",
    experience: "5 years",
    skills: ["PPC", "Facebook Ads", "ROI"],
    rating: 4.6,
    price: "₹299",
    category: "Marketing",
    company: "Swiggy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 134,
    responseTime: "2 hours",
    successRate: 89,
    isVerified: true
  },

  // Finance Profiles
  {
    id: "fin-1",
    name: "David Kim",
    role: "Financial Analyst",
    experience: "9 years",
    skills: ["Valuation", "Modeling", "Investment"],
    rating: 4.9,
    price: "₹499",
    category: "Finance",
    company: "Goldman Sachs",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 223,
    responseTime: "3 hours",
    successRate: 96,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "fin-2",
    name: "Neha Agarwal",
    role: "Investment Banker",
    experience: "10 years",
    skills: ["M&A", "Due Diligence", "Valuation"],
    rating: 4.8,
    price: "₹599",
    category: "Finance",
    company: "Morgan Stanley",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 198,
    responseTime: "5 hours",
    successRate: 95,
    isVerified: true
  },
  {
    id: "fin-3",
    name: "Rahul Chopra",
    role: "Risk Analyst",
    experience: "7 years",
    skills: ["Risk Management", "Compliance", "Audit"],
    rating: 4.7,
    price: "₹399",
    category: "Finance",
    company: "HSBC",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    location: "Pune",
    reviews: 167,
    responseTime: "4 hours",
    successRate: 92,
    isVerified: true
  },
  {
    id: "fin-4",
    name: "Priya Desai",
    role: "Financial Planner",
    experience: "6 years",
    skills: ["Wealth Management", "Planning", "Tax"],
    rating: 4.6,
    price: "₹349",
    category: "Finance",
    company: "ICICI",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    location: "Mumbai",
    reviews: 145,
    responseTime: "3 hours",
    successRate: 90,
    isVerified: true
  },
  {
    id: "fin-5",
    name: "Arjun Khanna",
    role: "Credit Analyst",
    experience: "5 years",
    skills: ["Credit Analysis", "Lending", "Underwriting"],
    rating: 4.7,
    price: "₹329",
    category: "Finance",
    company: "Citibank",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    location: "Delhi",
    reviews: 134,
    responseTime: "4 hours",
    successRate: 91,
    isVerified: true
  },
  {
    id: "fin-6",
    name: "Shreya Menon",
    role: "Portfolio Manager",
    experience: "8 years",
    skills: ["Portfolio Management", "Equity", "Bonds"],
    rating: 4.8,
    price: "₹449",
    category: "Finance",
    company: "BlackRock",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    location: "Bengaluru",
    reviews: 178,
    responseTime: "4 hours",
    successRate: 93,
    isVerified: true
  },

  // AI Profiles
  {
    id: "ai-1",
    name: "AI Interview Pro",
    role: "Smart AI Coach",
    experience: "24/7",
    skills: ["Real-time Feedback", "Voice Analysis", "Tips"],
    rating: 4.9,
    price: "₹199",
    category: "AI",
    company: "MockAI",
    avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 892,
    responseTime: "Instant",
    successRate: 97,
    isVerified: true,
    isFeatured: true
  },
  {
    id: "ai-2",
    name: "Tech Interview AI",
    role: "Technical AI Assistant",
    experience: "Always On",
    skills: ["Code Review", "DSA", "System Design"],
    rating: 4.8,
    price: "₹249",
    category: "AI",
    company: "CodeAI",
    avatar: "https://images.unsplash.com/photo-1677442135136-760cbba4ab01?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 745,
    responseTime: "Instant",
    successRate: 95,
    isVerified: true
  },
  {
    id: "ai-3",
    name: "Behavioral AI Coach",
    role: "HR Interview AI",
    experience: "Unlimited",
    skills: ["Behavioral", "Communication", "Confidence"],
    rating: 4.7,
    price: "₹179",
    category: "AI",
    company: "InterviewBot",
    avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 623,
    responseTime: "Instant",
    successRate: 93,
    isVerified: true
  },
  {
    id: "ai-4",
    name: "Design AI Mentor",
    role: "Design Review AI",
    experience: "24/7",
    skills: ["Portfolio Review", "Feedback", "Tips"],
    rating: 4.6,
    price: "₹199",
    category: "AI",
    company: "DesignAI",
    avatar: "https://images.unsplash.com/photo-1677442135136-760cbba4ab01?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 534,
    responseTime: "Instant",
    successRate: 91,
    isVerified: true
  },
  {
    id: "ai-5",
    name: "Business AI Coach",
    role: "Case Study AI",
    experience: "Always Active",
    skills: ["Case Studies", "Analysis", "Strategy"],
    rating: 4.8,
    price: "₹229",
    category: "AI",
    company: "BusinessAI",
    avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 678,
    responseTime: "Instant",
    successRate: 94,
    isVerified: true
  },
  {
    id: "ai-6",
    name: "Marketing AI Pro",
    role: "Marketing Strategy AI",
    experience: "24/7",
    skills: ["Campaign Analysis", "Strategy", "ROI"],
    rating: 4.7,
    price: "₹189",
    category: "AI",
    company: "MarketAI",
    avatar: "https://images.unsplash.com/photo-1677442135136-760cbba4ab01?w=150&h=150&fit=crop",
    location: "Online",
    reviews: 567,
    responseTime: "Instant",
    successRate: 92,
    isVerified: true
  }
];

const getCategoryIcon = (category: Category) => {
  const icons = {
    IT: Code,
    HR: Users,
    Business: Briefcase,
    Design: PenTool,
    Marketing: BarChart3,
    Finance: DollarSign,
    AI: Brain
  };
  return icons[category];
};

// Profile Card Component
const ProfileCard = ({ profile }: { profile: Profile }) => {
  const [liked, setLiked] = useState(false);
   const navigate = useNavigate();

     const handleBookNow = () => {
    navigate(`/book-session/${profile.name}`, {
      state: {
        profile // Pass the full profile object; you can customize fields as needed
      }
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{profile.name}</h3>
                {profile.isVerified && (
                  <Shield className="w-3 h-3 text-blue-500 shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">{profile.company}</p>
            </div>
          </div>
          <button 
            onClick={() => setLiked(!liked)}
            className="p-1 hover:bg-gray-50 rounded-full transition-colors shrink-0"
          >
            <Heart 
              className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>

        <p className="text-xs text-gray-700 font-medium mb-1.5 truncate">{profile.role}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {profile.experience}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3" />
            {profile.location}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex flex-wrap gap-1">
          {profile.skills.map((skill, idx) => (
            <span 
              key={idx}
              className="px-1.5 py-0.5 bg-gray-50 text-gray-700 text-xs rounded border border-gray-200 truncate"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 border-b border-gray-100 grow">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-0.5 text-yellow-500 mb-0.5">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-semibold text-gray-900">{profile.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{profile.reviews}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-0.5 text-green-500 mb-0.5">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-semibold text-gray-900">{profile.successRate}%</span>
            </div>
            <p className="text-xs text-gray-500">Success</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-0.5 text-blue-500 mb-0.5">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-semibold text-gray-900 truncate">{profile.responseTime}</span>
            </div>
            <p className="text-xs text-gray-500">Time</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Session</p>
          <p className="text-base font-bold text-gray-900">{profile.price}</p>
        </div>
         <button
          className="px-3 py-1.5 bg-gray-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Carousel Component
const Carousel = ({ title, category }: { title: string; category: Category }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProfiles = profiles.filter(p => p.category === category);
  const Icon = getCategoryIcon(category);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 240;
      const gap = 12;
      const scrollAmount = (cardWidth + gap) * 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-100 rounded">
            <Icon className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{filteredProfiles.length} coaches</p>
          </div>
        </div>
        
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide"
      >
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="flex-none w-60">
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function MockInterviewPlatform() {
  const categories: { id: Category; name: string }[] = [
    { id: "IT", name: "Technology" },
    { id: "HR", name: "HR & Recruiting" },
    { id: "Business", name: "Business" },
    { id: "Design", name: "Design" },
    { id: "Marketing", name: "Marketing" },
    { id: "Finance", name: "Finance" },
    { id: "AI", name: "AI Interviews" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
   

 
    

      {/* Content */}
      <main className="max-w-[1920px] mx-auto px-6 py-6">
        {categories.map(cat => (
          <Carousel 
            key={cat.id}
            title={cat.name}
            category={cat.id}
          />
        ))}
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}