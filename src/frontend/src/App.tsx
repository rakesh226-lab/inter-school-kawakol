import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  Droplets,
  Eye,
  Facebook,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Trophy,
  Tv,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createActor } from "./backend";

// ─────────────────────────── DATA ───────────────────────────

const NAV_LINKS = [
  { label: "HOME", id: "home" },
  { label: "ABOUT US", id: "about" },
  { label: "ACADEMICS", id: "academics" },
  { label: "FACILITIES", id: "facilities" },
  { label: "STAFF", id: "staff" },
  { label: "NOTICES", id: "notices" },
  { label: "GALLERY", id: "gallery" },
  { label: "CONTACT", id: "contact" },
];

const NOTICES = [
  {
    title: "Admission Open for Class 9th (2026-27)",
    date: "March 25, 2026",
    desc: "Applications are invited for Class 9th Admission 2026-27. Admission process starts from 15th April 2026. Interested students may contact the school office.",
    badge: "Admission",
    isAdmission: true,
  },
  {
    title: "Annual Examination Schedule 2025",
    date: "March 15, 2025",
    desc: "Exams to begin from April 1st. All students to report with admit cards.",
    badge: "Exam",
  },
  {
    title: "Admission Open for Class XI (2025-26)",
    date: "March 10, 2025",
    desc: "Applications invited for Science, Arts & Commerce streams.",
    badge: "Admission",
  },
  {
    title: "Sports Day Celebration",
    date: "March 5, 2025",
    desc: "Annual sports day on March 25. Students to register with Sports Teacher.",
    badge: "Event",
  },
  {
    title: "Parent-Teacher Meeting",
    date: "Feb 28, 2025",
    desc: "PTM scheduled for March 8, 2025 from 10:00 AM to 1:00 PM.",
    badge: "Meeting",
  },
  {
    title: "BSEB Result Declaration",
    date: "Feb 20, 2025",
    desc: "Class X and XII results announced. Marksheets available in school office.",
    badge: "Result",
  },
];

// Placeholder SVG data URI for staff members without photos
const PLACEHOLDER_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e2e8f0'/%3E%3Ccircle cx='100' cy='80' r='36' fill='%2394a3b8'/%3E%3Cellipse cx='100' cy='170' rx='60' ry='45' fill='%2394a3b8'/%3E%3C/svg%3E";

const STAFF = [
  {
    name: "Shyam Kumar Verma",
    designation: "In-Charge Principal",
    qualification: "M.Sc., M.Ed – ELE (Math)",
    image:
      "/assets/uploads/shyam_kumar_verma-019d2456-2bfa-752a-8a54-95ac3093084b-2.jpg",
  },
  {
    name: "Upendra Kumar",
    designation: "Social Science",
    qualification: "M.A., B.Ed.",
    image:
      "/assets/uploads/upendra_kumar-019d2456-2e50-77b8-943e-c141bae68392-3.jpeg",
  },
  {
    name: "Niteen Mukesh Kumar",
    designation: "Science",
    qualification: "M.Sc., B.Ed, LLB",
    image:
      "/assets/uploads/niteen_mukesh_kumar-019d2456-2e52-7029-adde-20058061a477-5.jpeg",
  },
  {
    name: "Udal Ram",
    designation: "Hindi",
    qualification: "M.A., B.Ed.",
    image:
      "/assets/uploads/whatsapp_image_2024-06-24_at_11.23.31-019d2456-2ae8-73b7-af69-692dec5c6415-1.jpeg",
  },
  {
    name: "Chakradhar Mishra",
    designation: "Accountancy",
    qualification: "M.Com., B.Ed.",
    image:
      "/assets/uploads/chakradhar_mishra-019d2456-2ea3-719b-9901-9349180b2b17-6.jpeg",
  },
  {
    name: "Rakesh Kumar Ranjan",
    designation: "Computer Science",
    qualification: "M.C.A.",
    image:
      "/assets/uploads/rakesh_kumar_ranjan-019d2456-2e53-758d-9219-31e81b2fecd4-4.jpg",
  },
  {
    name: "Mukesh Kumar",
    designation: "Music",
    qualification: "Prabhakar Music",
    image:
      "/assets/uploads/mukesh_kumar-019d2456-2fd2-7772-ac85-385c1bb80b02-7.jpeg",
  },
  {
    name: "Gopal Sharan",
    designation: "Clerk",
    qualification: "",
    image:
      "/assets/uploads/gopal_sharan-019d245c-95b4-75d9-80ca-2220a69751c5-1.jpg",
  },
  // New staff members
  {
    name: "FAIZUR REHMAN ANSARI",
    designation: "URDU",
    qualification: "M.A., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "KUMARI ANJANA SINHA",
    designation: "SOCIOLOGY",
    qualification: "M.A., B.Ed.",
    image:
      "/assets/kumari_anjana_sinha-019d7014-dfb7-735c-945e-1147f6d35fcd.jpg",
  },
  {
    name: "PAWAN KUMAR",
    designation: "HEALTH & PHYSICAL EDUCATION",
    qualification: "M.P.Ed.",
    image: "/assets/pawan_kumar-019d7014-eb77-757e-81a1-3798b2d5de86.jpg",
  },
  {
    name: "BANARAS RAVIDAS",
    designation: "SANSKRIT",
    qualification: "M.A., B.Ed.",
    image: "/assets/banaras_ravidas-019d7014-ddbc-76e8-b5c3-cf671461bca9.jpg",
  },
  {
    name: "KUMARI DHRITI SINGH",
    designation: "BUSINESS STUDIES",
    qualification: "M.Com., M.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "SAURAV SUMAN",
    designation: "PHYSICS",
    qualification: "M.Sc., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "NARENDRA PRASAD",
    designation: "ECONOMICS",
    qualification: "M.A., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "HALIMA KHATON",
    designation: "URDU",
    qualification: "B.A., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "RUPA KUMARI",
    designation: "HINDI",
    qualification: "B.A., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "DHARAMVIR KUMAR",
    designation: "MUSIC",
    qualification: "PRABHAKAR MUSIC",
    image: "/assets/dharamvir_kumar-019d7014-e087-708f-8aef-91ca47f2a543.jpg",
  },
  {
    name: "MADHUWALA RANI",
    designation: "SCIENCE",
    qualification: "B.Sc., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "SUMAN SHEKHAR",
    designation: "ENGLISH",
    qualification: "M.A., B.Ed.",
    image: PLACEHOLDER_AVATAR,
  },
  {
    name: "ANSHU KUMAR",
    designation: "ENGLISH",
    qualification: "B.A., B.Ed.",
    image: "/assets/anshu_kumar-019d7014-e080-73a6-ba85-1718456c12b9.jpg",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/gallery-science-lab.dim_400x300.jpg",
    label: "Science Lab",
  },
  {
    src: "/assets/generated/gallery-library.dim_400x300.jpg",
    label: "Library",
  },
  {
    src: "/assets/generated/gallery-sports.dim_400x300.jpg",
    label: "Sports Day",
  },
  {
    src: "/assets/generated/gallery-computer-lab.dim_400x300.jpg",
    label: "Computer Lab",
  },
  {
    src: "/assets/generated/gallery-annual-function.dim_400x300.jpg",
    label: "Annual Function",
  },
];

const FACILITIES = [
  {
    Icon: FlaskConical,
    label: "Science Labs",
    desc: "3 well-equipped labs for Physics, Chemistry & Biology with modern apparatus",
  },
  {
    Icon: BookOpen,
    label: "Library",
    desc: "5000+ books, journals, newspapers & digital learning resources",
  },
  {
    Icon: Monitor,
    label: "Computer Lab",
    desc: "40 computers with high-speed internet & latest educational software",
  },
  {
    Icon: Trophy,
    label: "Sports Ground",
    desc: "Football, Cricket, Athletics, Volleyball & Kabaddi facilities",
  },
  {
    Icon: Users,
    label: "Auditorium",
    desc: "500-seat auditorium for cultural events, seminars & assemblies",
  },
  {
    Icon: Tv,
    label: "Smart Classrooms",
    desc: "Digital smart classrooms with projectors and audio-visual aids for interactive learning.",
  },
  {
    Icon: Droplets,
    label: "Drinking Water",
    desc: "Safe, clean drinking water supply facility provided to all students on campus.",
  },
  {
    Icon: Award,
    label: "Scholarship Programs",
    desc: "Government of Bihar scholarship programs to support meritorious and economically weaker students.",
  },
];

const HERO_SLIDES = [
  {
    headline: "NURTURING EXCELLENCE.",
    subheadline: "FOSTERING FUTURES.",
    desc: "Welcome to Inter School Kawakol — a premier institution dedicated to holistic education and student development since 1957.",
  },
  {
    headline: "SHAPING TOMORROW'S",
    subheadline: "LEADERS TODAY.",
    desc: "Providing quality education through Arts, Science, and Commerce streams under Bihar School Examination Board.",
  },
  {
    headline: "EXCELLENCE IN",
    subheadline: "EVERY ENDEAVOR.",
    desc: "State-of-the-art facilities, experienced faculty, and a nurturing environment for every student to flourish.",
  },
];

const BADGE_COLORS: Record<string, string> = {
  Exam: "bg-red-100 text-red-700",
  Admission: "bg-emerald-100 text-emerald-700",
  Event: "bg-blue-100 text-blue-700",
  Meeting: "bg-purple-100 text-purple-700",
  Result: "bg-orange-100 text-orange-700",
};

// ─────────────────────────── HELPERS ───────────────────────────

function SectionTitle({
  children,
  light = false,
}: { children: ReactNode; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl font-bold uppercase tracking-wider mb-3 ${
          light ? "text-white" : "text-school-navy"
        }`}
      >
        {children}
      </h2>
      <div className="w-16 h-1 mx-auto rounded bg-school-green" />
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-3 bg-background rounded-lg border border-border">
      <div className="text-2xl font-bold text-school-green">{number}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

// ─────────────────────────── SCHOOL CREST ───────────────────────────

function SchoolCrest({ size = 56 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 80 90"
      width={size}
      height={size}
      style={{ flexShrink: 0 }}
      fill="none"
      role="img"
      aria-labelledby="crest-title"
    >
      <title id="crest-title">Inter School Kawakol Crest</title>
      <path
        d="M40 2 L76 15 L76 52 Q76 75 40 88 Q4 75 4 52 L4 15 Z"
        fill="oklch(var(--school-navy))"
        stroke="oklch(var(--school-green))"
        strokeWidth="2.5"
      />
      <path
        d="M40 10 L69 21 L69 52 Q69 71 40 82 Q11 71 11 52 L11 21 Z"
        fill="none"
        stroke="#FFD700"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <rect
        x="27"
        y="42"
        width="26"
        height="18"
        rx="2"
        fill="white"
        opacity="0.92"
      />
      <line
        x1="40"
        y1="42"
        x2="40"
        y2="60"
        stroke="oklch(var(--school-green))"
        strokeWidth="1.5"
      />
      <path
        d="M29 42 L29 46 L40 42 L51 46 L51 42"
        fill="oklch(var(--school-green))"
        opacity="0.9"
      />
      <circle cx="40" cy="27" r="8" fill="#FFD700" opacity="0.92" />
      <text
        x="40"
        y="31"
        textAnchor="middle"
        fill="oklch(var(--school-navy))"
        fontSize="11"
        fontWeight="bold"
      >
        ★
      </text>
    </svg>
  );
}

// ─────────────────────────── ADMISSION MODAL ───────────────────────────

function AdmissionModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Close on overlay click (outside banner)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handler already registered via useEffect
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
      onClick={handleOverlayClick}
      data-ocid="admission_modal.overlay"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        data-ocid="admission_modal.banner"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admission modal"
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
          data-ocid="admission_modal.close"
        >
          <X size={18} />
        </button>

        {/* Banner background gradient */}
        <div
          className="relative px-8 pt-10 pb-8 text-white text-center"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.18 0.07 235) 0%, oklch(0.25 0.08 235) 40%, oklch(0.35 0.11 145) 100%)",
          }}
        >
          {/* Decorative top arc */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background:
                "linear-gradient(90deg, #FFD700 0%, oklch(0.46 0.13 145) 50%, #FFD700 100%)",
            }}
          />

          {/* Decorative circles */}
          <div className="absolute top-6 left-6 w-16 h-16 rounded-full opacity-10 border-4 border-yellow-400" />
          <div className="absolute bottom-12 right-6 w-24 h-24 rounded-full opacity-10 border-4 border-yellow-400" />

          {/* School logo */}
          <div className="flex justify-center mb-3">
            <SchoolCrest size={64} />
          </div>

          {/* School names */}
          <h2 className="text-lg font-bold uppercase tracking-wide leading-tight mb-0.5">
            Inter School Kawakol, Nawada
          </h2>
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "#FFD700", opacity: 0.9 }}
          >
            राजकीयकृत उच्च माध्यमिक विद्यालय, कौआकोल
          </p>
          <p className="text-xs text-white/55 tracking-widest mb-5">
            Estd. 1957 &bull; Affiliated to BSEB &bull; Government Aided School
          </p>

          {/* Divider */}
          <div
            className="w-full h-px mb-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, #FFD700, transparent)",
            }}
          />

          {/* Main heading */}
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3"
            style={{ background: "rgba(255,215,0,0.18)", color: "#FFD700" }}
          >
            New Admissions
          </div>
          <h3
            className="text-3xl font-extrabold tracking-wider uppercase leading-tight mb-2"
            style={{ color: "#FFD700" }}
          >
            Admission Open
          </h3>
          <h3 className="text-3xl font-extrabold tracking-wider uppercase leading-tight mb-4">
            2026–27
          </h3>
          <p className="text-base text-white/85 mb-1 font-medium">
            Bihar Board &nbsp;|&nbsp; Classes IX–XII
          </p>
          <p className="text-sm text-white/70 mb-6">
            Arts &nbsp;•&nbsp; Science &nbsp;•&nbsp; Commerce
          </p>

          {/* Key detail chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {[
              "Affiliated to BSEB",
              "Government Aided",
              "Co-Education",
              "Hindi & English Medium",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="https://inter-school-kawakol-admission-system-mrj.caffeine.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="admission_modal.register_button"
          >
            <button
              type="button"
              className="w-full py-3.5 rounded-xl font-bold text-base uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                color: "oklch(0.18 0.07 235)",
                boxShadow: "0 4px 20px rgba(255, 215, 0, 0.35)",
              }}
            >
              Admission Registration
            </button>
          </a>
          <p className="mt-3 text-white/45 text-xs">
            Click to register online &mdash; Apply before seats are full
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────── HEADER ───────────────────────────

function SchoolHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: School Logo */}
        <div className="flex items-center flex-shrink-0">
          <SchoolCrest size={64} />
        </div>

        {/* Center: School crest + name */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <SchoolCrest size={52} />
          <div className="text-center">
            <h1 className="text-school-navy font-bold text-base sm:text-xl uppercase tracking-wide leading-tight">
              INTER SCHOOL KAWAKOL, NAWADA
            </h1>
            <p className="text-school-navy text-xs font-medium mt-0.5">
              राजकीयकृत उच्च माध्यमिक विद्यालय, कौआकोल
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm tracking-wider mt-0.5">
              NAWADA, BIHAR &bull; Extd. 1957
            </p>
            <p className="text-school-green text-xs font-semibold mt-0.5">
              Affiliated to Bihar School Examination Board (BSEB)
            </p>
          </div>
        </div>

        {/* Right: Student Portal + Admin Login */}
        <div className="flex flex-col sm:flex-row gap-2 items-center flex-shrink-0">
          <a
            href="https://inter-school-kawakol-admission-system-mrj.caffeine.xyz/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-school-navy hover:bg-school-navy/90 text-white rounded-full text-xs sm:text-sm px-4 py-2 font-bold tracking-wide"
              data-ocid="header.portal_button"
            >
              STUDENT PORTAL
            </Button>
          </a>
          <a
            href="https://inter-school-kawakol-admission-system-mrj.caffeine.xyz/admin/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-school-navy text-school-navy hover:bg-school-navy hover:text-white rounded-full text-xs sm:text-sm px-4 py-2 font-bold tracking-wide"
              data-ocid="header.admin_login_button"
            >
              ADMIN LOGIN
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────── NAV ───────────────────────────

function SchoolNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="bg-school-navy sticky top-0 z-50 shadow-md"
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollTo(id)}
              data-ocid={`nav.${id}.link`}
              className={`px-4 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${
                activeSection === id
                  ? "text-school-green border-school-green"
                  : "text-white/80 border-transparent hover:text-white hover:border-white/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between py-3">
          <span className="text-white font-bold text-sm tracking-wide">
            INTER SCHOOL KAWAKOL
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-1"
            aria-label="Toggle navigation"
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/20"
            >
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold tracking-wider uppercase transition-colors ${
                    activeSection === id
                      ? "text-school-green bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                  data-ocid={`nav.mobile.${id}.link`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ─────────────────────────── HERO ───────────────────────────

function HeroSection({
  onAdmissionClick,
}: {
  onAdmissionClick: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[580px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-school-campus.dim_1600x700.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-school-navy/75" />

      {/* Image label badge — top-left */}
      <div className="absolute top-4 left-4 z-10 bg-school-navy/70 border border-white/30 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
        <p className="text-white text-xs font-bold tracking-wide">
          Inter School Kawakol, Nawada
        </p>
        <p className="text-white/80 text-[10px] font-medium">
          राजकीयकृत उच्च माध्यमिक विद्यालय, कौआकोल
        </p>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider leading-tight mb-1">
              {HERO_SLIDES[currentSlide].headline}
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider leading-tight mb-6 text-school-green">
              {HERO_SLIDES[currentSlide].subheadline}
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {HERO_SLIDES[currentSlide].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={onAdmissionClick}
            className="bg-school-green hover:bg-school-green/90 text-white uppercase font-bold tracking-wider px-8 text-sm"
            data-ocid="hero.primary_button"
          >
            ADMISSION OPEN 2026-27 – APPLY NOW
          </Button>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {HERO_SLIDES.map((slide, i) => (
            <button
              type="button"
              key={slide.headline}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              data-ocid={`hero.item.${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-school-green w-6" : "bg-white/50 w-2.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── ABOUT ───────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>About Our School</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-card"
          >
            <img
              src="/assets/generated/about-school-building.dim_600x450.jpg"
              alt="Inter School Kawakol Building"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* School name overlay banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-school-navy/75 px-4 py-2.5">
              <p className="text-white text-sm font-bold text-center tracking-wide">
                Inter School Kawakol
              </p>
              <p className="text-white/80 text-xs font-medium text-center">
                राजकीयकृत उच्च माध्यमिक विद्यालय, कौआकोल
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-xl shadow-card p-8"
          >
            <h3 className="text-lg font-bold text-school-navy mb-4 uppercase tracking-wide">
              A Legacy of Excellence Since 1957
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Inter School Kawakol is a government-aided higher secondary school
              located in Kawakol, Nawada, Bihar. Established in 1957, the school
              has been a beacon of quality education in the region, offering
              classes from IX to XII across Arts, Science, and Commerce streams.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              Affiliated to the Bihar School Examination Board (BSEB), the
              school provides education in both Hindi and English mediums,
              nurturing thousands of students who have gone on to excel in
              various fields across India.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background p-4 rounded-lg border-l-4 border-school-green">
                <h4 className="font-bold text-school-navy mb-1 text-xs uppercase tracking-wide">
                  Our Vision
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To nurture young minds into responsible, educated citizens who
                  contribute to the nation's progress and uphold Bihar's rich
                  cultural heritage.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border-l-4 border-school-navy">
                <h4 className="font-bold text-school-navy mb-1 text-xs uppercase tracking-wide">
                  Our Mission
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To provide accessible, quality education through skilled
                  faculty, modern facilities, and holistic development programs
                  for every student.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard number="1957" label="Established" />
              <StatCard number="1901+" label="Students" />
              <StatCard number="20+" label="Faculty" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── FACILITIES ───────────────────────────

function FacilitiesSection() {
  return (
    <section id="facilities" className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Key Facilities</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility, i) => (
            <motion.div
              key={facility.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background rounded-xl p-6 text-center hover:shadow-card transition-shadow group cursor-default"
              data-ocid={`facilities.item.${i + 1}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-school-green/10 rounded-full flex items-center justify-center group-hover:bg-school-green/20 transition-colors">
                <facility.Icon className="w-8 h-8 text-school-green" />
              </div>
              <h3 className="font-bold text-school-navy mb-2 text-sm">
                {facility.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {facility.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── NOTICES & ACADEMICS ───────────────────────────

const CLASS_9_10_SUBJECTS = [
  "Hindi",
  "Urdu",
  "Bangla",
  "Maithili",
  "Sanskrit",
  "HIN (NLH)",
  "Arabic",
  "Bhojpuri",
  "Math",
  "Advance Math",
  "Science",
  "Social Science",
  "English",
  "Dance",
  "Economics",
  "Fine Arts",
  "Home Science",
  "Music",
];

const CLASS_11_12_STREAMS = {
  science: [
    "Hindi",
    "English",
    "Urdu",
    "Sanskrit",
    "Physics",
    "Biology",
    "Chemistry",
    "Agriculture",
    "Mathematics",
    "Computer Science",
    "Multimedia & Web Tech.",
  ],
  arts: [
    "English",
    "Hindi",
    "Urdu",
    "Sanskrit",
    "Music",
    "Home Science",
    "Philosophy",
    "History",
    "Political Science",
    "Geography",
    "Psychology",
    "Sociology",
    "Economics",
    "Mathematics",
    "Yoga & Phy. Edu.",
    "Computer Science",
    "Multimedia & Web Tech.",
  ],
  commerce: [
    "English",
    "Hindi",
    "Urdu",
    "Sanskrit",
    "Business Studies",
    "Entrepreneurship",
    "Economics",
    "Accountancy",
    "Computer Science",
    "Multimedia",
    "Web. Tech.",
  ],
};

function SubjectTag({ label }: { label: string }) {
  return (
    <span className="text-xs bg-background px-3 py-1 rounded-full text-school-navy font-medium border border-border">
      {label}
    </span>
  );
}

function NoticesAcademicsSection({
  onAdmissionClick,
}: {
  onAdmissionClick: () => void;
}) {
  return (
    <section id="notices" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Notices &amp; Academics</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl shadow-card overflow-hidden"
            data-ocid="notices.panel"
          >
            <div className="bg-school-navy px-6 py-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-school-green" />
              <h3 className="text-white font-bold uppercase tracking-wide text-sm">
                Latest Notices &amp; Announcements
              </h3>
            </div>
            <div className="divide-y divide-border">
              {NOTICES.map((notice, i) => {
                const isAdmissionNotice = notice.isAdmission === true;
                return (
                  <div
                    key={notice.title}
                    onClick={isAdmissionNotice ? onAdmissionClick : undefined}
                    onKeyDown={
                      isAdmissionNotice
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ")
                              onAdmissionClick();
                          }
                        : undefined
                    }
                    role={isAdmissionNotice ? "button" : undefined}
                    tabIndex={isAdmissionNotice ? 0 : undefined}
                    className={`px-6 py-4 transition-colors ${
                      isAdmissionNotice
                        ? "cursor-pointer hover:bg-school-green/5 group"
                        : "hover:bg-background"
                    }`}
                    data-ocid={`notices.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4
                        className={`font-semibold text-sm leading-snug flex-1 ${
                          isAdmissionNotice
                            ? "text-school-green group-hover:underline"
                            : "text-school-navy"
                        }`}
                      >
                        {notice.title}
                        {isAdmissionNotice && (
                          <span className="ml-2 inline-flex items-center gap-0.5 text-school-green text-xs font-bold">
                            <ChevronRight size={12} />
                          </span>
                        )}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          BADGE_COLORS[notice.badge] ??
                          "bg-muted text-foreground"
                        }`}
                      >
                        {notice.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {notice.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-school-green">
                        <Calendar className="w-3 h-3" />
                        <span>{notice.date}</span>
                      </div>
                      {isAdmissionNotice && (
                        <span className="text-xs text-school-green font-bold uppercase tracking-wide">
                          Click to view →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-3 border-t border-border bg-background">
              <button
                type="button"
                className="text-school-green text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all"
                data-ocid="notices.view_all.button"
              >
                View All Notices <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Academics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl shadow-card overflow-hidden flex flex-col"
            id="academics"
            data-ocid="academics.panel"
          >
            <div className="bg-school-navy px-6 py-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-school-green" />
              <h3 className="text-white font-bold uppercase tracking-wide text-sm">
                Academic Offerings
              </h3>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-6 max-h-[560px]">
              {/* Subsection 1: Class 09 & 10 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-school-green" />
                  <h4 className="font-bold text-school-navy text-sm uppercase tracking-wide">
                    Class 09 &amp; 10th — Subjects Offered
                  </h4>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="academics.class9_10.subjects"
                >
                  {CLASS_9_10_SUBJECTS.map((s) => (
                    <SubjectTag key={s} label={s} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  All subjects offered under Bihar School Examination Board
                  (BSEB) curriculum.
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Subsection 2: Class 11 & 12 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full bg-school-navy" />
                  <h4 className="font-bold text-school-navy text-sm uppercase tracking-wide">
                    Class 11 &amp; 12th — Subjects Offered
                  </h4>
                </div>
                <Tabs defaultValue="science" className="w-full">
                  <TabsList className="w-full mb-4 bg-background">
                    <TabsTrigger
                      value="science"
                      className="flex-1 text-xs font-bold uppercase"
                      data-ocid="academics.science.tab"
                    >
                      Science
                    </TabsTrigger>
                    <TabsTrigger
                      value="arts"
                      className="flex-1 text-xs font-bold uppercase"
                      data-ocid="academics.arts.tab"
                    >
                      Arts
                    </TabsTrigger>
                    <TabsTrigger
                      value="commerce"
                      className="flex-1 text-xs font-bold uppercase"
                      data-ocid="academics.commerce.tab"
                    >
                      Commerce
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="science">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-school-green uppercase tracking-wide">
                        Science Stream
                      </span>
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      data-ocid="academics.science.subjects"
                    >
                      {CLASS_11_12_STREAMS.science.map((s) => (
                        <SubjectTag key={s} label={s} />
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Ideal for students aspiring for Engineering, Medical,
                      Agriculture, and Research fields.
                    </p>
                  </TabsContent>
                  <TabsContent value="arts">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-school-navy uppercase tracking-wide">
                        Arts Stream
                      </span>
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      data-ocid="academics.arts.subjects"
                    >
                      {CLASS_11_12_STREAMS.arts.map((s) => (
                        <SubjectTag key={s} label={s} />
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Ideal for students interested in Civil Services, Law,
                      Journalism &amp; Social Sciences.
                    </p>
                  </TabsContent>
                  <TabsContent value="commerce">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-school-green uppercase tracking-wide">
                        Commerce Stream
                      </span>
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      data-ocid="academics.commerce.subjects"
                    >
                      {CLASS_11_12_STREAMS.commerce.map((s) => (
                        <SubjectTag key={s} label={s} />
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Ideal for students aspiring for CA, MBA, Banking &amp;
                      Business careers.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-school-navy">Board:</strong> BSEB
                  &nbsp;&bull;&nbsp;
                  <strong className="text-school-navy">Medium:</strong> Hindi
                  &amp; English &nbsp;&bull;&nbsp;
                  <strong className="text-school-navy">Classes:</strong> IX –
                  XII
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── GALLERY ───────────────────────────

function GallerySection() {
  return (
    <section id="gallery" className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Gallery Highlights</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-xl shadow group cursor-pointer"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <div className="aspect-square">
                <img
                  src={item.src}
                  alt={`Inter School Kawakol — ${item.label}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-school-green px-3 py-2">
                <p className="text-white text-[10px] font-bold text-center tracking-wide">
                  Inter School Kawakol
                </p>
                <p className="text-white/75 text-[9px] font-medium text-center">
                  राजकीयकृत उच्च माध्यमिक विद्यालय, कौआकोल
                </p>
                <p className="text-white text-xs font-bold text-center uppercase tracking-wide">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── STAFF ───────────────────────────

function StaffSection() {
  return (
    <section id="staff" className="py-16 px-4 bg-school-navy">
      <div className="max-w-6xl mx-auto">
        <SectionTitle light>Our Faculty &amp; Staff</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {STAFF.map((member, i) => (
            <motion.div
              key={`${member.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.07 }}
              className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/20 transition-colors"
              data-ocid={`staff.item.${i + 1}`}
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-school-green">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-white font-bold text-sm leading-tight mb-1">
                {member.name}
              </h4>
              <p className="text-school-green text-xs font-semibold mb-1">
                {member.designation}
              </p>
              {member.qualification && (
                <p className="text-white/60 text-xs">{member.qualification}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── CONTACT ───────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Contact Us</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl shadow-card p-8"
            data-ocid="contact.panel"
          >
            <h3 className="text-school-navy font-bold text-lg uppercase tracking-wide mb-6">
              Get In Touch
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-school-green flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-school-navy text-sm mb-0.5">
                    Address
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    Inter School Kawakol, Kawakol, Nawada (Bihar) - 805106
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-school-green flex-shrink-0" />
                <div>
                  <div className="font-semibold text-school-navy text-sm mb-0.5">
                    Phone
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="text-muted-foreground text-sm hover:text-school-green transition-colors"
                    data-ocid="contact.phone.link"
                  >
                    +91-98765-43210
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-school-green flex-shrink-0" />
                <div>
                  <div className="font-semibold text-school-navy text-sm mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:interschool.kawakol@gmail.com"
                    className="text-muted-foreground text-sm hover:text-school-green transition-colors"
                    data-ocid="contact.email.link"
                  >
                    interschool.kawakol@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-school-green flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-school-navy text-sm mb-0.5">
                    Affiliation
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Bihar School Examination Board (BSEB)
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background rounded-lg border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-school-navy">Office Hours:</strong>{" "}
                Monday to Saturday, 8:00 AM — 4:00 PM
                <br />
                <strong className="text-school-navy">
                  Admission Enquiries:
                </strong>{" "}
                Monday to Friday, 10:00 AM — 2:00 PM
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-card min-h-[350px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=VV3P%2B33H+Sarauni+Pachamma+Bihar+805106&t=m&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: "350px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Inter School Kawakol Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── FOOTER ───────────────────────────

function SchoolFooter({ visitorCount }: { visitorCount: number | null }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedCount =
    visitorCount !== null ? visitorCount.toLocaleString("en-IN") : "...";

  return (
    <footer className="bg-school-navy text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SchoolCrest size={44} />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide">
                  Inter School Kawakol
                </h4>
                <p className="text-white/50 text-xs mt-0.5">
                  Nawada, Bihar &bull; Extd. 1957
                </p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              A premier government-aided institution providing quality education
              to students of Nawada district since 1957. Affiliated to BSEB.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-school-green rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
                data-ocid="footer.facebook.link"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-school-green rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
                data-ocid="footer.youtube.link"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-school-green">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-white/55 hover:text-school-green text-sm transition-colors flex items-center gap-1"
                    data-ocid={`footer.${id}.link`}
                  >
                    <ChevronRight size={12} />
                    {label.charAt(0) + label.slice(1).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-school-green">
              Contact Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-white/55 text-sm">
                <MapPin
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-school-green"
                />
                <span>
                  Inter School Kawakol, Kawakol, Nawada (Bihar) - 805106
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/55 text-sm">
                <Phone size={14} className="flex-shrink-0 text-school-green" />
                <span>+91-98765-43210</span>
              </div>
              <div className="flex items-center gap-2 text-white/55 text-sm">
                <Mail size={14} className="flex-shrink-0 text-school-green" />
                <span>interschool.kawakol@gmail.com</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/45 leading-relaxed">
                <strong className="text-school-green">BSEB Affiliated</strong>
                <br />
                Bihar School Examination Board
                <br />
                Classes IX to XII
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor counter bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center">
          <div
            className="flex items-center gap-2 px-5 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,215,0,0.2)",
            }}
            data-ocid="footer.visitor_counter"
          >
            <Eye size={14} style={{ color: "#FFD700" }} />
            <span
              className="text-xs font-semibold"
              style={{ color: "#FFD700" }}
            >
              Visitors:
            </span>
            <span className="text-xs font-bold text-white">
              {formattedCount}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/45 text-xs text-center">
            &copy; {year} Inter School Kawakol, Nawada, Bihar. All Rights
            Reserved.
          </p>
          <p className="text-white/35 text-xs">
            Built with <span className="text-school-green">&#10084;</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-school-green transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────── APP ───────────────────────────

// Visitor count via real backend canister (trackVisit returns the new count as bigint)
function useVisitorCount(): number | null {
  const [count, setCount] = useState<number | null>(null);
  const { actor, isFetching } = useActor(createActor);

  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    actor
      .trackVisit()
      .then((bigCount: bigint) => {
        if (!cancelled) setCount(Number(bigCount));
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  return count;
}

export default function App() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const visitorCount = useVisitorCount();

  return (
    <div className="min-h-screen bg-background">
      <SchoolHeader />
      <SchoolNav />
      <main>
        <HeroSection onAdmissionClick={() => setAdmissionModalOpen(true)} />
        <AboutSection />
        <FacilitiesSection />
        <NoticesAcademicsSection
          onAdmissionClick={() => setAdmissionModalOpen(true)}
        />
        <GallerySection />
        <StaffSection />
        <ContactSection />
      </main>
      <SchoolFooter visitorCount={visitorCount} />

      {/* Admission Modal */}
      <AnimatePresence>
        {admissionModalOpen && (
          <AdmissionModal onClose={() => setAdmissionModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
