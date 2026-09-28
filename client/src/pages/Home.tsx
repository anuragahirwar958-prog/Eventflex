import { useMemo, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  CreditCard,
  FileCheck2,
  Filter,
  Flag,
  Grid2X2,
  Heart,
  HelpCircle,
  Home as HomeIcon,
  LayoutDashboard,
  ListFilter,
  LogOut,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Plus,
  ReceiptText,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  UserRound,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";

type Role = "professional" | "organizer" | "admin";
type JobStatus = "Open" | "Shortlisted" | "Hired" | "Completed";

type Job = {
  id: string;
  role: string;
  company: string;
  eventName: string;
  category: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  pay: number;
  openings: number;
  tags: string[];
  urgent?: boolean;
  verified?: boolean;
  status?: JobStatus;
  accent: string;
  description: string;
};

type NavItem = { id: string; label: string; icon: LucideIcon };

const categories = [
  { label: "Wedding Staff", icon: Heart, color: "#fff0e8", iconColor: "#e65d32", openRoles: 12 },
  { label: "Corporate Events", icon: Building2, color: "#eaf5f3", iconColor: "#278f83", openRoles: 6 },
  { label: "Concert Crew", icon: Activity, color: "#f1edff", iconColor: "#6c58c9", openRoles: 9 },
  { label: "Hospitality", icon: BriefcaseBusiness, color: "#fff6db", iconColor: "#b98518", openRoles: 15 },
  { label: "Security", icon: ShieldCheck, color: "#e9eef7", iconColor: "#42658f", openRoles: 8 },
  { label: "Photography", icon: Camera, color: "#f9e9ee", iconColor: "#bd5571", openRoles: 4 },
];

const initialJobs: Job[] = [
  {
    id: "job-1",
    role: "Guest Experience Host",
    company: "The Celebration Co.",
    eventName: "Aarav & Meera Wedding",
    category: "Wedding Staff",
    date: "Oct 18, 2026",
    time: "4:00 PM – 11:00 PM",
    location: "The Fern Residency, Bhopal",
    distance: "3.2 km",
    pay: 1800,
    openings: 6,
    tags: ["Guest handling", "Hindi", "English"],
    urgent: true,
    verified: true,
    status: "Open",
    accent: "#f26b38",
    description: "Welcome guests, guide family members to the right zones, and keep the evening moving with warmth and precision.",
  },
  {
    id: "job-2",
    role: "Registration Executive",
    company: "Summit Experiences",
    eventName: "Bhopal Growth Forum",
    category: "Corporate Events",
    date: "Oct 22, 2026",
    time: "8:30 AM – 5:30 PM",
    location: "Kushabhau Thakre Convention Centre",
    distance: "5.8 km",
    pay: 1500,
    openings: 8,
    tags: ["Excel", "Front desk", "English"],
    verified: true,
    status: "Open",
    accent: "#278f83",
    description: "Manage delegate check-in, badges, welcome desks, and basic attendee support for a full-day corporate forum.",
  },
  {
    id: "job-3",
    role: "Backstage Runner",
    company: "LiveWire Productions",
    eventName: "Indie Nights — Bhopal",
    category: "Concert Crew",
    date: "Oct 27, 2026",
    time: "5:00 PM – 12:30 AM",
    location: "Minto Hall Grounds, Bhopal",
    distance: "7.1 km",
    pay: 2200,
    openings: 4,
    tags: ["Stage support", "Quick learner", "Night shift"],
    urgent: true,
    status: "Open",
    accent: "#6c58c9",
    description: "Support artist movement, backstage resets, and production hand-offs for a high-energy live music evening.",
  },
  {
    id: "job-4",
    role: "Event Photographer",
    company: "Mango Tree Weddings",
    eventName: "Sangeet Evening",
    category: "Photography",
    date: "Nov 02, 2026",
    time: "6:00 PM – 10:30 PM",
    location: "Courtyard by Marriott, Bhopal",
    distance: "9.4 km",
    pay: 4500,
    openings: 1,
    tags: ["DSLR", "Candid", "Portfolio"],
    verified: true,
    status: "Open",
    accent: "#bd5571",
    description: "Capture candid guest moments, couple portraits, and the visual rhythm of a polished sangeet evening.",
  },
  {
    id: "job-5",
    role: "Catering Captain",
    company: "Gather & Graze",
    eventName: "Founders' Table Dinner",
    category: "Hospitality",
    date: "Nov 08, 2026",
    time: "5:30 PM – 10:00 PM",
    location: "Jehan Numa Palace, Bhopal",
    distance: "6.6 km",
    pay: 2000,
    openings: 3,
    tags: ["Service", "Team lead", "Hospitality"],
    status: "Open",
    accent: "#b98518",
    description: "Lead a small service team and help the organizer deliver a calm, attentive dinner experience.",
  },
];

const professionalNav: NavItem[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "explore", label: "Explore jobs", icon: Grid2X2 },
  { id: "myjobs", label: "My jobs", icon: ClipboardList },
  { id: "wallet", label: "Wallet", icon: WalletCards },
  { id: "profile", label: "Profile", icon: UserRound },
];

const organizerNav: NavItem[] = [
  { id: "home", label: "Overview", icon: HomeIcon },
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applicants", label: "Applicants", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "profile", label: "Organization", icon: Building2 },
];

const adminNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "verification", label: "Verification queue", icon: FileCheck2 },
  { id: "risk", label: "Risk & disputes", icon: Flag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function AppLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-center" : ""}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f26b38] text-white shadow-[0_8px_20px_rgba(242,107,56,0.27)]">
        <Sparkles size={19} strokeWidth={2.5} />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-[17px] font-extrabold tracking-[-0.04em] text-white">EventFlex</div>
          <div className="font-mono-ui mt-0.5 text-[9px] uppercase tracking-[0.2em] text-[#94a5b6]">Event workforce</div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "orange" | "blue" | "purple" | "red" }) {
  const tones = {
    neutral: "bg-[#f1f3f2] text-[#5d6874]",
    green: "bg-[#e9f6f1] text-[#19735f]",
    orange: "bg-[#fff0e8] text-[#b74c26]",
    blue: "bg-[#eaf0fa] text-[#48678d]",
    purple: "bg-[#f0edff] text-[#6350ba]",
    red: "bg-[#fff0ef] text-[#b14a49]",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="font-mono-ui mb-1 text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">{eyebrow}</div>}
        <h2 className="font-display text-[20px] font-extrabold tracking-[-0.035em] text-[#152238]">{title}</h2>
      </div>
      {action && <button onClick={onAction} className="group flex items-center gap-1 text-[12px] font-bold text-[#d85c31] hover:text-[#a9401c]">{action}<ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></button>}
    </div>
  );
}

function StatCard({ label, value, detail, icon: Icon, tone = "orange" }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: "orange" | "teal" | "blue" | "yellow" }) {
  const color = { orange: "#f26b38", teal: "#278f83", blue: "#5576a2", yellow: "#b98518" }[tone];
  return (
    <div className="interactive rounded-[18px] border border-[#e7ebe8] bg-white p-4 shadow-[0_7px_24px_rgba(30,46,63,0.035)]">
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[#87919a]">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}15`, color }}><Icon size={16} /></span>
      </div>
      <div className="font-display text-[25px] font-extrabold tracking-[-0.05em] text-[#152238]">{value}</div>
      <div className="mt-1 text-[11px] text-[#7b858d]">{detail}</div>
    </div>
  );
}

function JobCard({ job, onOpen, onApply, applied }: { job: Job; onOpen: () => void; onApply: () => void; applied?: boolean }) {
  return (
    <article onClick={onOpen} className="interactive group cursor-pointer rounded-[20px] border border-[#e5eae7] bg-white p-4 shadow-[0_8px_26px_rgba(30,46,63,0.035)] sm:p-5">
      <div className="flex items-start gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-inner" style={{ backgroundColor: job.accent }}>
          {job.category === "Photography" ? <Camera size={19} /> : job.category === "Concert Crew" ? <Activity size={19} /> : job.category === "Hospitality" ? <BriefcaseBusiness size={19} /> : <Users size={19} />}
          {job.urgent && <span className="absolute -right-1.5 -top-1.5 rounded-full border-2 border-white bg-[#f26b38] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">Hot</span>}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display truncate text-[15px] font-extrabold tracking-[-0.025em] text-[#152238]">{job.role}</h3>
            {job.verified && <BadgeCheck size={15} className="shrink-0 text-[#278f83]" fill="#e5f5f0" />}
          </div>
          <p className="mt-1 truncate text-[12px] text-[#77818a]">{job.company} · {job.eventName}</p>
        </div>
        <button onClick={(event) => { event.stopPropagation(); toast.success("Saved to your shortlist"); }} className="rounded-full p-1.5 text-[#b0b8bc] hover:bg-[#fff0e8] hover:text-[#f26b38]" aria-label="Save job"><Heart size={17} /></button>
      </div>
      <div className="my-4 grid grid-cols-2 gap-2 text-[11px] text-[#66727d] sm:grid-cols-4">
        <div className="flex items-center gap-1.5"><CalendarDays size={14} className="text-[#f26b38]" />{job.date}</div>
        <div className="flex items-center gap-1.5"><Clock3 size={14} className="text-[#278f83]" />{job.time}</div>
        <div className="flex items-center gap-1.5 sm:col-span-2"><MapPin size={14} className="shrink-0 text-[#5576a2]" /><span className="truncate">{job.location}</span></div>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => <span key={tag} className="rounded-md bg-[#f5f7f6] px-2 py-1 text-[10px] font-medium text-[#66727d]">{tag}</span>)}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[#eef1ef] pt-3">
        <div><span className="font-display text-[17px] font-extrabold tracking-[-0.035em] text-[#152238]">{money(job.pay)}</span><span className="ml-1 text-[11px] text-[#87919a]">/ shift</span></div>
        <div className="flex items-center gap-2"><span className="hidden text-[10px] text-[#87919a] sm:inline">{job.openings} openings · {job.distance}</span><button onClick={(event) => { event.stopPropagation(); onApply(); }} className={`rounded-xl px-3.5 py-2 text-[11px] font-bold transition ${applied ? "bg-[#e9f6f1] text-[#19735f]" : "bg-[#152238] text-white hover:bg-[#f26b38]"}`}>{applied ? "Applied" : "Apply now"}</button></div>
      </div>
    </article>
  );
}

function ProfessionalHome({ jobs, onExplore, onOpenJob, onApply, appliedIds, location, setLocation }: { jobs: Job[]; onExplore: () => void; onOpenJob: (job: Job) => void; onApply: (job: Job) => void; appliedIds: string[]; location: string; setLocation: (value: string) => void }) {
  return (
    <div className="fade-up space-y-8">
      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
        <section className="relative overflow-hidden rounded-[24px] bg-[#152238] px-5 py-7 text-white shadow-[0_14px_40px_rgba(21,34,56,0.18)] sm:px-8 sm:py-9">
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-[28px] border-[#f26b38]/20" />
          <div className="absolute -bottom-36 right-20 h-64 w-64 rounded-full border-[16px] border-[#278f83]/20" />
          <div className="relative z-10 max-w-[620px]">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f7ab89]"><span className="h-1.5 w-1.5 rounded-full bg-[#f26b38]" /> Your next opportunity is closer than you think</div>
            <h1 className="font-display max-w-[560px] text-[32px] font-extrabold leading-[1.05] tracking-[-0.065em] sm:text-[44px]">Find work that makes the event happen.</h1>
            <p className="mt-4 max-w-[480px] text-[13px] leading-6 text-[#bac7d2]">Discover verified event jobs, show up with confidence, and build a portfolio people remember.</p>
            <div className="mt-7 flex max-w-[590px] flex-col gap-2 rounded-[16px] bg-white p-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-[#f6f7f5] px-3 text-[#152238]"><Search size={16} className="shrink-0 text-[#87919a]" /><input value={location} onChange={(e) => setLocation(e.target.value)} className="min-w-0 flex-1 bg-transparent py-2.5 text-[12px] outline-none placeholder:text-[#8c969e]" placeholder="Search role, event or location" /></div>
              <button onClick={onExplore} className="flex items-center justify-center gap-2 rounded-xl bg-[#f26b38] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(242,107,56,0.25)] transition hover:bg-[#d85c31]">Explore jobs <ArrowRight size={14} /></button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#91a5b7]"><Navigation size={12} className="text-[#7fd0c0]" /> Showing opportunities near <span className="font-bold text-[#e5f5f0]">Bhopal, Madhya Pradesh</span><ChevronDown size={12} /></div>
          </div>
        </section>
        <section className="soft-grid relative overflow-hidden rounded-[24px] border border-[#e5eae7] bg-[#fbfcfa] p-5 sm:p-6">
          <div className="flex items-center justify-between"><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#8d9899]">Your momentum</div><span className="rounded-lg bg-[#e9f6f1] p-2 text-[#278f83]"><TrendingUp size={16} /></span></div>
          <div className="mt-8"><div className="flex items-end justify-between"><div><div className="font-display text-[38px] font-extrabold tracking-[-0.07em] text-[#152238]">82<span className="text-[20px] text-[#9aa4a9]">%</span></div><div className="mt-1 text-[12px] font-semibold text-[#19735f]">Profile strength</div></div><span className="rounded-lg bg-[#fff6db] px-2 py-1 text-[10px] font-bold text-[#9a721d]">+12% this week</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e7efeb]"><div className="h-full w-[82%] rounded-full bg-[#278f83]" /></div></div>
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#e5eae7] pt-5"><div><div className="font-display text-[19px] font-extrabold text-[#152238]">14</div><div className="text-[10px] text-[#7b858d]">Jobs this month</div></div><div><div className="font-display text-[19px] font-extrabold text-[#152238]">4.9 <span className="text-[#d19b26]">★</span></div><div className="text-[10px] text-[#7b858d]">Average rating</div></div></div>
          <button onClick={() => toast.info("Profile editor opened — connect your documents to finish verification.")} className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#eef2f1] px-3 py-2.5 text-left text-[11px] font-bold text-[#3e4c58] hover:bg-[#e4ebe8]">Complete your profile <ChevronRight size={15} /></button>
        </section>
      </div>

      <section><SectionHeading eyebrow="Browse by category" title="Find your kind of event" action="View all categories" onAction={onExplore} /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map(({ label, icon: Icon, color, iconColor, openRoles }) => <button onClick={onExplore} key={label} className="interactive flex min-h-[106px] flex-col items-start justify-between rounded-[16px] border border-[#e6ebe8] bg-white p-3.5 text-left shadow-[0_6px_18px_rgba(30,46,63,0.025)]"><span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: color, color: iconColor }}><Icon size={16} /></span><span className="text-[11px] font-bold leading-4 text-[#344250]">{label}</span><span className="text-[10px] text-[#97a0a5]">{openRoles} open roles</span></button>)}</div></section>

      <section><SectionHeading eyebrow="Curated for you" title="Recommended opportunities" action="See all jobs" onAction={onExplore} /><div className="grid gap-4 lg:grid-cols-2">{jobs.slice(0, 4).map((job) => <JobCard key={job.id} job={job} onOpen={() => onOpenJob(job)} onApply={() => onApply(job)} applied={appliedIds.includes(job.id)} />)}</div></section>
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"><div className="rounded-[20px] bg-[#e9f6f1] p-5 sm:p-6"><div className="flex items-start justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#4e978a]">Before your next shift</div><h3 className="mt-2 font-display text-[20px] font-extrabold tracking-[-0.045em] text-[#153d3b]">Be event-ready, every time.</h3></div><ClipboardCheck className="text-[#278f83]" size={24} /></div><p className="mt-2 max-w-[520px] text-[12px] leading-5 text-[#4d7470]">Keep your documents, arrival time, and venue location in one place. A complete profile gets priority visibility with verified organizers.</p><div className="mt-5 flex flex-wrap gap-2"><StatusPill tone="green"><Check size={12} className="mr-1" /> ID verified</StatusPill><StatusPill tone="green"><Check size={12} className="mr-1" /> UPI connected</StatusPill><StatusPill tone="orange">Add 1 certification</StatusPill></div></div><div className="rounded-[20px] border border-[#e6ebe8] bg-white p-5 sm:p-6"><div className="flex items-center gap-2 text-[#f26b38]"><MapPinned size={19} /><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em]">Near you</span></div><h3 className="mt-3 font-display text-[19px] font-extrabold tracking-[-0.04em] text-[#152238]">6 jobs within 10 km</h3><p className="mt-1 text-[12px] leading-5 text-[#7b858d]">Your location helps us show shifts you can actually reach on time.</p><button onClick={onExplore} className="mt-5 flex items-center gap-1 text-[12px] font-bold text-[#d85c31]">Explore nearby work <ArrowRight size={14} /></button></div></section>
    </div>
  );
}

function ExploreView({ jobs, search, setSearch, onOpenJob, onApply, appliedIds }: { jobs: Job[]; search: string; setSearch: (value: string) => void; onOpenJob: (job: Job) => void; onApply: (job: Job) => void; appliedIds: string[] }) {
  const [category, setCategory] = useState("All categories");
  const filteredJobs = jobs.filter((job) => {
    const term = search.toLowerCase();
    const matchesTerm = !term || [job.role, job.company, job.eventName, job.location, job.category].some((value) => value.toLowerCase().includes(term));
    const matchesCategory = category === "All categories" || job.category === category;
    return matchesTerm && matchesCategory;
  });
  return <div className="fade-up space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Explore work</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Jobs worth showing up for.</h1><p className="mt-2 text-[13px] text-[#78838a]">Verified event work, transparent pay, and an exact venue before you apply.</p></div><button onClick={() => toast.info("Filters saved for your next visit.")} className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe6e2] bg-white px-3.5 py-2.5 text-[11px] font-bold text-[#50606b]"><SlidersHorizontal size={15} /> Save filters</button></div><div className="grid gap-3 rounded-[18px] border border-[#e5eae7] bg-white p-3 shadow-[0_7px_22px_rgba(30,46,63,0.03)] md:grid-cols-[1.4fr_0.7fr_auto]"><div className="flex items-center gap-2 rounded-xl bg-[#f6f8f6] px-3"><Search size={16} className="text-[#8b969d]" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-[12px] outline-none" placeholder="Search by role, event or location" /></div><div className="flex items-center gap-2 rounded-xl bg-[#f6f8f6] px-3"><MapPin size={15} className="text-[#5576a2]" /><select className="w-full bg-transparent py-3 text-[12px] text-[#53616b] outline-none"><option>Bhopal, Madhya Pradesh</option><option>Indore, Madhya Pradesh</option><option>Anywhere in India</option></select></div><button onClick={() => toast.success("Showing the latest verified roles")} className="flex items-center justify-center gap-2 rounded-xl bg-[#152238] px-4 py-3 text-[11px] font-bold text-white"><Filter size={14} /> Filter</button></div><div className="flex gap-2 overflow-x-auto pb-1">{["All categories", ...categories.map((categoryItem) => categoryItem.label)].map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold transition ${category === item ? "bg-[#152238] text-white" : "bg-white text-[#6f7b82] hover:bg-[#eef2f1]"}`}>{item}</button>)}</div><div className="flex items-center justify-between"><p className="text-[12px] text-[#7a858c]"><span className="font-bold text-[#152238]">{filteredJobs.length} opportunities</span> match your search</p><button onClick={() => { setSearch(""); setCategory("All categories"); }} className="text-[11px] font-bold text-[#d85c31]">Clear filters</button></div><div className="grid gap-4 lg:grid-cols-2">{filteredJobs.map((job) => <JobCard key={job.id} job={job} onOpen={() => onOpenJob(job)} onApply={() => onApply(job)} applied={appliedIds.includes(job.id)} />)}</div>{filteredJobs.length === 0 && <div className="rounded-[20px] border border-dashed border-[#ccd7d1] bg-white p-14 text-center"><Search size={24} className="mx-auto text-[#a1adb1]" /><h3 className="mt-3 font-display text-[18px] font-extrabold text-[#152238]">No jobs found</h3><p className="mt-1 text-[12px] text-[#7b858d]">Try a different role, event name, or city.</p></div>}</div>;
}

function MyJobsView({ jobs, appliedIds, onOpenJob }: { jobs: Job[]; appliedIds: string[]; onOpenJob: (job: Job) => void }) {
  const appliedJobs = jobs.filter((job) => appliedIds.includes(job.id));
  return <div className="fade-up space-y-6"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Your work timeline</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">My jobs</h1><p className="mt-2 text-[13px] text-[#78838a]">Keep every application, upcoming shift, and payment milestone in view.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><StatCard label="Applied" value={`${appliedJobs.length || 3}`} detail="Across 4 categories" icon={Send} tone="orange" /><StatCard label="Shortlisted" value="2" detail="Awaiting organizer" icon={UserCheck} tone="teal" /><StatCard label="Upcoming" value="1" detail="Next shift in 4 days" icon={CalendarDays} tone="blue" /><StatCard label="Reliability" value="98%" detail="On-time attendance" icon={CheckCircle2} tone="yellow" /></div><div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="Upcoming & active" action="View history" onAction={() => toast.info("Completed shifts are ready in your work history.")} />{[...appliedJobs, jobs[1]].slice(0, 3).map((job, index) => <div key={`${job.id}-${index}`} onClick={() => onOpenJob(job)} className="interactive flex cursor-pointer gap-3 border-b border-[#edf0ee] py-4 last:border-0"><div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: job.accent }}><CalendarDays size={17} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-[13px] font-bold text-[#253545]">{job.role}</h3><StatusPill tone={index === 0 ? "orange" : "green"}>{index === 0 ? "Applied" : "Upcoming"}</StatusPill></div><p className="mt-1 truncate text-[11px] text-[#7b858d]">{job.eventName} · {job.date}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-[#77828b]"><MapPin size={12} className="text-[#5576a2]" />{job.location}</p></div><div className="text-right"><div className="font-display text-[14px] font-extrabold text-[#152238]">{money(job.pay)}</div><div className="mt-1 text-[10px] text-[#8b969d]">{job.time.split("–")[0]}</div></div></div>)}</div><div className="rounded-[20px] bg-[#152238] p-5 text-white"><div className="flex items-center justify-between"><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#91a5b7]">Next check-in</div><span className="rounded-lg bg-[#f26b38] p-2"><MapPinned size={16} /></span></div><h3 className="mt-6 font-display text-[22px] font-extrabold tracking-[-0.045em]">Your shift is in 4 days.</h3><p className="mt-2 text-[12px] leading-5 text-[#b5c2ce]">Guest Experience Host · Aarav & Meera Wedding</p><div className="mt-6 rounded-[15px] border border-white/10 bg-white/5 p-3"><div className="flex items-center justify-between text-[11px]"><span className="text-[#aebdca]">Venue</span><span className="font-bold text-[#eaf5f3]">The Fern Residency</span></div><div className="mt-2 flex items-start gap-2 text-[11px] text-[#b5c2ce]"><MapPin size={13} className="mt-0.5 shrink-0 text-[#f7ab89]" />Plot 12, Hoshangabad Road, Bhopal</div></div><button onClick={() => toast.info("Your QR check-in pass will be available 24 hours before the shift.")} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[11px] font-bold text-[#152238]">View check-in pass <ArrowRight size={14} /></button></div></div></div>;
}

function WalletView() {
  return <div className="fade-up space-y-6"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Money, made clear</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Your wallet</h1><p className="mt-2 text-[13px] text-[#78838a]">Track funded, ready-to-release, and withdrawn earnings.</p></div><div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"><div className="rounded-[22px] bg-[#152238] p-6 text-white shadow-[0_12px_32px_rgba(21,34,56,0.17)]"><div className="flex items-center justify-between"><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#9cafbc]">Available to withdraw</span><WalletCards className="text-[#f7ab89]" size={20} /></div><div className="mt-8 font-display text-[40px] font-extrabold tracking-[-0.07em]">₹18,450</div><p className="mt-1 text-[11px] text-[#a9bbc9]">Updated just now · UPI ending in 2210</p><button onClick={() => toast.success("Withdrawal request created for the connected UPI account.")} className="mt-7 flex items-center gap-2 rounded-xl bg-[#f26b38] px-4 py-3 text-[11px] font-bold text-white hover:bg-[#d85c31]">Withdraw funds <ArrowRight size={14} /></button></div><div className="grid grid-cols-2 gap-3"><StatCard label="Pending earnings" value="₹4,300" detail="2 shifts in progress" icon={Clock3} tone="yellow" /><StatCard label="Total earned" value="₹42,850" detail="Since joining EventFlex" icon={CircleDollarSign} tone="teal" /><StatCard label="Funded securely" value="₹3,200" detail="Held for your next shift" icon={ShieldCheck} tone="blue" /><StatCard label="Avg. payout" value="₹2,140" detail="Per completed shift" icon={TrendingUp} tone="orange" /></div></div><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="Recent transactions" action="Download statement" onAction={() => toast.success("Statement download prepared.")} /><div className="divide-y divide-[#edf0ee]">{[["Aarav & Meera Wedding", "Payment released", "+₹1,800", "green", "Oct 12"], ["Bhopal Growth Forum", "Funded in escrow", "+₹1,500", "blue", "Oct 09"], ["Brand launch support", "Payment released", "+₹2,400", "green", "Sep 28"], ["UPI withdrawal", "Transfer completed", "−₹8,000", "neutral", "Sep 25"]].map(([name, detail, amount, tone, date]) => <div key={name} className="flex items-center gap-3 py-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f7f6] text-[#5576a2]"><ReceiptText size={16} /></span><div className="min-w-0 flex-1"><div className="text-[12px] font-bold text-[#344250]">{name}</div><div className="mt-0.5 text-[10px] text-[#8a959c]">{detail} · {date}</div></div><div className="text-right"><div className="text-[12px] font-bold text-[#19735f]">{amount}</div><StatusPill tone={tone === "green" ? "green" : tone === "blue" ? "blue" : "neutral"}>{tone === "blue" ? "Escrow" : tone === "green" ? "Released" : "Completed"}</StatusPill></div></div>)}</div></div></div>;
}

function ProfileView({ role }: { role: Role }) {
  const isOrganizer = role === "organizer";
  return <div className="fade-up space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">{isOrganizer ? "Organization profile" : "Your professional identity"}</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">{isOrganizer ? "The Celebration Co." : "Your profile"}</h1><p className="mt-2 text-[13px] text-[#78838a]">Build trust before the first message, shift, or payment.</p></div><button onClick={() => toast.success("Profile changes saved.")} className="rounded-xl bg-[#152238] px-4 py-2.5 text-[11px] font-bold text-white">Save changes</button></div><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><div className="rounded-[20px] bg-[#152238] p-6 text-white"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#f26b38] font-display text-[22px] font-extrabold">{isOrganizer ? "TC" : "AK"}</div><div><h2 className="font-display text-[19px] font-extrabold">{isOrganizer ? "The Celebration Co." : "Anurag Kapoor"}</h2><div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#aabac7]"><BadgeCheck size={13} className="text-[#7fd0c0]" /> Verified {isOrganizer ? "organizer" : "professional"}</div></div></div><div className="mt-8 rounded-[15px] border border-white/10 bg-white/5 p-4"><div className="flex items-center justify-between text-[11px]"><span className="text-[#aebdca]">Profile completion</span><span className="font-bold text-[#f7ab89]">{isOrganizer ? "91%" : "82%"}</span></div><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-[#f26b38]" style={{ width: isOrganizer ? "91%" : "82%" }} /></div><p className="mt-3 text-[10px] leading-4 text-[#9cafbc]">{isOrganizer ? "Add your team contact to complete organization setup." : "Add one certification to unlock more hospitality roles."}</p></div><div className="mt-5 flex items-center gap-2 text-[11px] text-[#aebdca]"><MapPin size={14} className="text-[#f7ab89]" /> {isOrganizer ? "Bhopal, Madhya Pradesh" : "Bhopal, Madhya Pradesh"}</div></div><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-[17px] font-extrabold text-[#152238]">{isOrganizer ? "Organization details" : "Professional details"}</h2><button onClick={() => toast.info("Edit mode enabled")} className="rounded-lg bg-[#f5f7f6] p-2 text-[#687680]"><Settings2 size={15} /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-[11px] font-bold text-[#65727b]">{isOrganizer ? "Organization name" : "Full name"}<input defaultValue={isOrganizer ? "The Celebration Co." : "Anurag Kapoor"} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-[#fbfcfb] px-3 py-2.5 text-[12px] font-medium text-[#253545] outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">{isOrganizer ? "Organizer type" : "Primary role"}<input defaultValue={isOrganizer ? "Wedding & social events" : "Event host / coordinator"} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-[#fbfcfb] px-3 py-2.5 text-[12px] font-medium text-[#253545] outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Email<input defaultValue={isOrganizer ? "hello@celebrationco.in" : "anurag.k@example.com"} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-[#fbfcfb] px-3 py-2.5 text-[12px] font-medium text-[#253545] outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Phone number<input defaultValue="+91 98••• 2210" className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-[#fbfcfb] px-3 py-2.5 text-[12px] font-medium text-[#253545] outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b] sm:col-span-2">{isOrganizer ? "Registered location" : "Current city"}<input defaultValue="Bhopal, Madhya Pradesh" className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-[#fbfcfb] px-3 py-2.5 text-[12px] font-medium text-[#253545] outline-none focus:border-[#f26b38]" /></label></div></div></div></div>;
}

function OrganizerHome({ jobs, onPostJob, onOpenJob }: { jobs: Job[]; onPostJob: () => void; onOpenJob: (job: Job) => void }) {
  return <div className="fade-up space-y-8"><div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]"><section className="relative overflow-hidden rounded-[24px] bg-[#152238] px-5 py-7 text-white sm:px-8 sm:py-9"><div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border-[25px] border-[#f26b38]/20" /><div className="relative z-10 max-w-[600px]"><div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f7ab89]"><span className="h-1.5 w-1.5 rounded-full bg-[#f26b38]" /> Organizer workspace</div><h1 className="font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.065em] sm:text-[42px]">Build the right team for your next event.</h1><p className="mt-4 max-w-[470px] text-[13px] leading-6 text-[#bac7d2]">Post a clear requirement, review verified professionals, and keep location, attendance, and payouts in one calm workflow.</p><button onClick={onPostJob} className="mt-7 flex items-center gap-2 rounded-xl bg-[#f26b38] px-4 py-3 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(242,107,56,0.25)] hover:bg-[#d85c31]"><Plus size={15} /> Post a job</button></div></section><section className="rounded-[24px] border border-[#e5eae7] bg-white p-5 shadow-[0_8px_25px_rgba(30,46,63,0.035)] sm:p-6"><div className="flex items-center justify-between"><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#8d9899]">Hiring pulse</div><span className="rounded-lg bg-[#fff0e8] p-2 text-[#f26b38]"><TrendingUp size={16} /></span></div><div className="mt-8 font-display text-[36px] font-extrabold tracking-[-0.07em] text-[#152238]">86%</div><div className="mt-1 text-[12px] font-semibold text-[#19735f]">Average fill rate</div><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#f0f2f0]"><div className="h-full w-[86%] rounded-full bg-[#f26b38]" /></div><p className="mt-4 text-[11px] leading-5 text-[#7b858d]">Your roles are getting filled 18% faster than similar organizers in Bhopal.</p><button onClick={() => toast.info("Analytics will include city-wise demand and no-show rate in the next release.")} className="mt-4 text-[11px] font-bold text-[#d85c31]">View hiring insights <ArrowRight size={13} className="ml-1 inline" /></button></section></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><StatCard label="Active jobs" value="4" detail="2 need attention" icon={BriefcaseBusiness} tone="orange" /><StatCard label="Applications" value="48" detail="+12 this week" icon={Users} tone="teal" /><StatCard label="Hired talent" value="21" detail="Across 8 events" icon={UserCheck} tone="blue" /><StatCard label="To release" value="₹32.4K" detail="3 completed shifts" icon={Banknote} tone="yellow" /></div><div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="Live job posts" action="Manage all" onAction={() => toast.info("Jobs view selected from the sidebar.")} />{jobs.slice(0, 3).map((job) => <div key={job.id} onClick={() => onOpenJob(job)} className="interactive flex cursor-pointer gap-3 border-b border-[#edf0ee] py-4 last:border-0"><div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: job.accent }}><BriefcaseBusiness size={16} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="truncate text-[13px] font-bold text-[#253545]">{job.role}</h3><StatusPill tone={job.urgent ? "orange" : "green"}>{job.urgent ? "Urgent" : "Live"}</StatusPill></div><p className="mt-1 truncate text-[11px] text-[#7b858d]">{job.eventName} · {job.openings} openings</p><div className="mt-1 flex items-center gap-1 text-[10px] text-[#78848c]"><MapPin size={11} className="text-[#5576a2]" />{job.location}</div></div><div className="text-right"><div className="font-display text-[14px] font-extrabold text-[#152238]">{money(job.pay)}</div><div className="mt-1 text-[10px] text-[#8b969d]">12 applicants</div></div></div>)}</div><div className="rounded-[20px] bg-[#fff6db] p-5"><div className="flex items-start justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#a1812f]">Action center</div><h3 className="mt-2 font-display text-[20px] font-extrabold tracking-[-0.045em] text-[#51431c]">Keep your events moving.</h3></div><ClipboardCheck className="text-[#b98518]" size={23} /></div><div className="mt-5 space-y-3">{[["Review 8 new applications", "Most are within 5 km of the venue", Users], ["Approve attendance", "3 professionals checked out", CheckCircle2], ["Fund the next shift", "Payment is still pending", CreditCard]].map(([title, detail, Icon]) => <button key={title as string} onClick={() => toast.info(title as string)} className="flex w-full items-center gap-3 rounded-[14px] bg-white/65 p-3 text-left hover:bg-white"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fffaf0] text-[#b98518]"><Icon size={15} /></span><span className="min-w-0 flex-1"><span className="block text-[11px] font-bold text-[#5a4a1e]">{title as string}</span><span className="mt-0.5 block truncate text-[10px] text-[#8d7b3e]">{detail as string}</span></span><ChevronRight size={14} className="text-[#b98518]" /></button>)}</div></div></div></div>;
}

function JobsView({ jobs, onPostJob, onOpenJob }: { jobs: Job[]; onPostJob: () => void; onOpenJob: (job: Job) => void }) {
  return <div className="fade-up space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Your marketplace activity</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Jobs</h1><p className="mt-2 text-[13px] text-[#78838a]">Every post, venue, opening, and hiring status in one view.</p></div><button onClick={onPostJob} className="flex items-center justify-center gap-2 rounded-xl bg-[#152238] px-4 py-2.5 text-[11px] font-bold text-white"><Plus size={15} /> Post a job</button></div><div className="rounded-[20px] border border-[#e5eae7] bg-white p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2 text-[12px] font-bold text-[#344250]"><ListFilter size={15} className="text-[#f26b38]" /> 4 live posts</div><button onClick={() => toast.info("Sort options: newest, urgent, and fill rate.")} className="flex items-center gap-1 text-[11px] font-bold text-[#75818a]">Newest <ChevronDown size={14} /></button></div><div className="space-y-2">{jobs.map((job) => <button key={job.id} onClick={() => onOpenJob(job)} className="flex w-full flex-col gap-3 rounded-[15px] border border-[#eef1ef] p-4 text-left transition hover:border-[#f6c4b2] hover:bg-[#fffaf8] sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundColor: job.accent }}><BriefcaseBusiness size={16} /></span><span className="min-w-0"><span className="flex flex-wrap items-center gap-2"><span className="truncate text-[13px] font-bold text-[#253545]">{job.role}</span><StatusPill tone={job.urgent ? "orange" : "green"}>{job.urgent ? "Urgent" : "Live"}</StatusPill></span><span className="mt-1 flex items-center gap-1 truncate text-[11px] text-[#7b858d]"><MapPin size={12} className="text-[#5576a2]" />{job.location}</span></span></div><span className="flex items-center gap-6 text-[11px] text-[#6f7b83]"><span><b className="text-[#253545]">{job.openings}</b> openings</span><span><b className="text-[#253545]">12</b> applicants</span><span className="font-display font-extrabold text-[#152238]">{money(job.pay)}</span><MoreHorizontal size={17} className="text-[#98a2a7]" /></span></button>)}</div></div></div>;
}

function ApplicantsView() {
  const applicants = [["Priya Sharma", "Guest Experience Host", "4.9", "24 events", "Shortlisted", "#f26b38"], ["Rohit Malviya", "Registration Executive", "4.8", "18 events", "New", "#278f83"], ["Nidhi Jain", "Guest Experience Host", "5.0", "31 events", "Interview", "#6c58c9"], ["Vikas Patel", "Backstage Runner", "4.7", "12 events", "New", "#5576a2"]];
  return <div className="fade-up space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Hiring pipeline</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Applicants</h1><p className="mt-2 text-[13px] text-[#78838a]">Review verified talent before you share contact details or make a hire.</p></div><button onClick={() => toast.info("Applicant filters: event, skill, rating, and availability.")} className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe6e2] bg-white px-3.5 py-2.5 text-[11px] font-bold text-[#50606b]"><Filter size={15} /> Filters</button></div><div className="flex gap-2 overflow-x-auto">{["New · 8", "Shortlisted · 5", "Interview · 3", "Hired · 21", "Rejected"].map((item, index) => <button key={item} className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-bold ${index === 0 ? "bg-[#152238] text-white" : "bg-white text-[#6f7b82]"}`}>{item}</button>)}</div><div className="grid gap-3">{applicants.map(([name, role, rating, events, status, color]) => <div key={name} className="interactive flex flex-col gap-4 rounded-[20px] border border-[#e5eae7] bg-white p-4 shadow-[0_7px_22px_rgba(30,46,63,0.025)] sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[13px] font-extrabold text-white" style={{ backgroundColor: color }}>{name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-[13px] font-bold text-[#253545]">{name}</h3><BadgeCheck size={14} className="text-[#278f83]" fill="#e5f5f0" /><StatusPill tone={status === "Shortlisted" ? "orange" : status === "Interview" ? "purple" : "neutral"}>{status}</StatusPill></div><p className="mt-1 text-[11px] text-[#7b858d]">{role} · <Star size={11} className="inline fill-[#d19b26] text-[#d19b26]" /> {rating} · {events}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-[#7b858d]"><MapPin size={11} className="text-[#5576a2]" />Bhopal · Available for Oct 18</p></div></div><div className="flex items-center gap-2 sm:justify-end"><button onClick={() => toast.info(`${name}'s verified profile opened.`)} className="flex-1 rounded-xl border border-[#dfe6e2] px-3 py-2 text-[11px] font-bold text-[#52606b] sm:flex-none">View profile</button><button onClick={() => toast.success(`${name} shortlisted for review.`)} className="flex-1 rounded-xl bg-[#152238] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#f26b38] sm:flex-none">Shortlist</button><button onClick={() => toast.info("Contact reveal is available after hiring or through secure chat.")} className="rounded-xl bg-[#f5f7f6] p-2 text-[#64727b]"><MessageCircle size={15} /></button></div></div>)}</div></div>;
}

function PaymentsView() {
  return <div className="fade-up space-y-6"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Payment confidence</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Payments</h1><p className="mt-2 text-[13px] text-[#78838a]">Fund shifts before the event, approve attendance, and release money transparently.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><StatCard label="Funded in escrow" value="₹58.2K" detail="9 active shifts" icon={ShieldCheck} tone="blue" /><StatCard label="Ready to release" value="₹32.4K" detail="3 completed shifts" icon={Banknote} tone="orange" /><StatCard label="Released this month" value="₹1.8L" detail="42 professionals paid" icon={CheckCircle2} tone="teal" /><StatCard label="Open disputes" value="1" detail="Needs your response" icon={AlertTriangle} tone="yellow" /></div><div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]"><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="Payment queue" action="Download invoices" onAction={() => toast.success("Invoice bundle prepared.")} /><div className="divide-y divide-[#edf0ee]">{[["Aarav & Meera Wedding", "6 professionals · attendance approved", "₹10,800", "Ready to release", "orange"], ["Bhopal Growth Forum", "8 professionals · funded", "₹12,000", "Funded in escrow", "blue"], ["Founders' Table Dinner", "3 professionals · shortlist", "₹6,000", "Awaiting hire", "neutral"]].map(([name, detail, amount, status, tone]) => <div key={name} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f7f6] text-[#5576a2]"><ReceiptText size={16} /></span><span className="min-w-0"><span className="block truncate text-[12px] font-bold text-[#344250]">{name}</span><span className="mt-1 block truncate text-[10px] text-[#8a959c]">{detail}</span></span></div><span className="flex items-center justify-between gap-3 sm:justify-end"><span className="font-display text-[14px] font-extrabold text-[#152238]">{amount}</span><StatusPill tone={tone === "orange" ? "orange" : tone === "blue" ? "blue" : "neutral"}>{status}</StatusPill><button onClick={() => toast.success(`${status === "Ready to release" ? "Payment released" : "Payment workflow opened"}.`)} className="rounded-lg bg-[#152238] p-2 text-white"><ArrowRight size={14} /></button></span></div>)}</div></div><div className="rounded-[20px] bg-[#e9f6f1] p-5"><div className="flex items-center gap-2 text-[#278f83]"><ShieldCheck size={19} /><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em]">Protected workflow</span></div><h3 className="mt-4 font-display text-[20px] font-extrabold tracking-[-0.04em] text-[#153d3b]">Money follows verified attendance.</h3><p className="mt-2 text-[12px] leading-5 text-[#4d7470]">EventFlex keeps your payment status visible from funding to release. Actual payouts can connect to a compliant Indian payment partner during production setup.</p><div className="mt-5 space-y-2 text-[11px] font-semibold text-[#397870]"><div className="flex items-center gap-2"><CheckCircle2 size={14} /> Organizer funds estimated payout</div><div className="flex items-center gap-2"><CheckCircle2 size={14} /> QR + venue proximity records attendance</div><div className="flex items-center gap-2"><CheckCircle2 size={14} /> Release after approval or dispute window</div></div></div></div></div>;
}

function AdminView({ section }: { section: string }) {
  const queue = [["Aditi Rao", "Professional ID", "2 documents", "12 min ago"], ["StageCraft Events", "Organizer approval", "GST + PAN", "28 min ago"], ["Rakesh Verma", "Professional ID", "Address proof", "1 hr ago"], ["Crescent Hospitality", "Organizer approval", "Company profile", "2 hr ago"]];
  return <div className="fade-up space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#9a6b58]">Admin control room · {section}</div><h1 className="mt-1 font-display text-[31px] font-extrabold tracking-[-0.06em] text-[#152238]">Keep the marketplace trustworthy.</h1><p className="mt-2 text-[13px] text-[#78838a]">Verification, risk flags, attendance disputes, and platform health at a glance.</p></div><StatusPill tone="green"><span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#278f83]" /> Systems healthy</StatusPill></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><StatCard label="Total users" value="2,840" detail="+8.4% this month" icon={Users} tone="blue" /><StatCard label="Verified workers" value="1,926" detail="67.8% of professionals" icon={BadgeCheck} tone="teal" /><StatCard label="Live jobs" value="184" detail="Across 6 cities" icon={BriefcaseBusiness} tone="orange" /><StatCard label="Payout volume" value="₹12.4L" detail="This month" icon={CircleDollarSign} tone="yellow" /></div><div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="Verification queue" action="Open full queue" onAction={() => toast.info("Full verification queue opened.")} /><div className="divide-y divide-[#edf0ee]">{queue.map(([name, type, documents, time]) => <div key={name} className="flex items-center gap-3 py-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f7f6] text-[#5576a2]"><FileCheck2 size={16} /></div><div className="min-w-0 flex-1"><div className="text-[12px] font-bold text-[#344250]">{name}</div><div className="mt-1 text-[10px] text-[#8a959c]">{type} · {documents} · {time}</div></div><button onClick={() => toast.success(`${name}'s documents marked for review.`)} className="rounded-xl bg-[#152238] px-3 py-2 text-[10px] font-bold text-white">Review</button></div>)}</div></div><div className="rounded-[20px] bg-[#152238] p-5 text-white"><div className="flex items-center justify-between"><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#91a5b7]">Platform health</div><Activity size={18} className="text-[#7fd0c0]" /></div><div className="mt-7 space-y-5">{[["Fill rate", "86%", "w-[86%]", "#278f83"], ["Attendance reliability", "94%", "w-[94%]", "#f26b38"], ["Payment success", "99.2%", "w-[99%]", "#d19b26"]].map(([label, value, width, color]) => <div key={label}><div className="flex justify-between text-[11px]"><span className="text-[#aebdca]">{label}</span><span className="font-bold text-[#eef5f3]">{value}</span></div><div className="mt-2 h-1.5 rounded-full bg-white/10"><div className={`h-full rounded-full ${width}`} style={{ backgroundColor: color }} /></div></div>)}</div><div className="mt-7 rounded-[14px] border border-white/10 bg-white/5 p-3 text-[10px] leading-4 text-[#9cafbc]">No active fraud spikes. One attendance dispute is waiting for organizer response.</div></div></div><div className="rounded-[20px] border border-[#e5eae7] bg-white p-5"><SectionHeading title="City-wise demand" action="View analytics" onAction={() => toast.info("City analytics view selected.")} /><div className="grid gap-3 sm:grid-cols-3">{[["Bhopal", "184 jobs", "72% filled", "#f26b38"], ["Indore", "142 jobs", "81% filled", "#278f83"], ["New Delhi", "96 jobs", "68% filled", "#5576a2"]].map(([city, jobsCount, filled, color]) => <div key={city} className="rounded-[15px] bg-[#f7f9f7] p-4"><div className="flex items-center justify-between"><span className="text-[12px] font-bold text-[#344250]">{city}</span><MapPin size={14} style={{ color }} /></div><div className="mt-5 font-display text-[22px] font-extrabold tracking-[-0.04em] text-[#152238]">{jobsCount}</div><div className="mt-1 text-[10px] text-[#7b858d]">{filled} this month</div></div>)}</div></div></div>;
}

function JobDetailModal({ job, onClose, onApply, applied }: { job: Job; onClose: () => void; onApply: () => void; applied: boolean }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#152238]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"><div className="fade-up max-h-[92vh] w-full max-w-[660px] overflow-y-auto rounded-t-[24px] bg-[#fbfcfa] shadow-[0_20px_70px_rgba(21,34,56,0.25)] sm:rounded-[24px]"><div className="relative h-32 overflow-hidden rounded-t-[24px] bg-[#152238] px-5 py-5 text-white sm:h-40 sm:px-7"><div className="absolute -right-4 -top-20 h-60 w-60 rounded-full border-[24px] border-[#f26b38]/20" /><button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X size={17} /></button><div className="relative z-10 mt-5 flex items-center gap-3 sm:mt-9"><div className="flex h-11 w-11 items-center justify-center rounded-[14px] text-white" style={{ backgroundColor: job.accent }}><BriefcaseBusiness size={19} /></div><div><div className="font-mono-ui text-[9px] uppercase tracking-[0.17em] text-[#aebdca]">{job.category}</div><h2 className="mt-1 font-display text-[22px] font-extrabold tracking-[-0.045em]">{job.role}</h2></div></div></div><div className="p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[15px] border border-[#e5eae7] bg-white p-4"><div className="flex items-center gap-2 text-[#f26b38]"><CalendarDays size={16} /><span className="font-mono-ui text-[9px] uppercase tracking-[0.16em]">Shift</span></div><div className="mt-3 text-[13px] font-bold text-[#253545]">{job.date}</div><div className="mt-1 text-[11px] text-[#7b858d]">{job.time}</div></div><div className="rounded-[15px] border border-[#e5eae7] bg-white p-4"><div className="flex items-center gap-2 text-[#5576a2]"><MapPin size={16} /><span className="font-mono-ui text-[9px] uppercase tracking-[0.16em]">Event location</span></div><div className="mt-3 text-[13px] font-bold text-[#253545]">{job.location}</div><button onClick={() => toast.info("Map directions will open after location services are enabled.")} className="mt-1 text-[11px] font-bold text-[#d85c31]">Open in maps <ArrowRight size={12} className="ml-1 inline" /></button></div></div><div className="mt-5"><div className="flex items-center justify-between"><div><div className="text-[11px] text-[#7b858d]">Organized by</div><div className="mt-1 flex items-center gap-1.5 text-[13px] font-bold text-[#253545]">{job.company} <BadgeCheck size={14} className="text-[#278f83]" fill="#e5f5f0" /></div></div><div className="text-right"><div className="font-display text-[23px] font-extrabold tracking-[-0.05em] text-[#152238]">{money(job.pay)}</div><div className="text-[10px] text-[#8a959c]">per shift · transparent pay</div></div></div><div className="mt-6"><h3 className="font-display text-[16px] font-extrabold text-[#152238]">About this role</h3><p className="mt-2 text-[12px] leading-5 text-[#697680]">{job.description}</p></div><div className="mt-5 flex flex-wrap gap-1.5">{job.tags.map((tag) => <StatusPill key={tag} tone="neutral">{tag}</StatusPill>)}</div><div className="mt-6 flex items-start gap-3 rounded-[14px] bg-[#e9f6f1] p-3 text-[11px] leading-4 text-[#397870]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#278f83]" /><span>Attendance is recorded by a signed QR check-in plus venue proximity. Payment moves to release after the shift is approved.</span></div><div className="mt-7 flex gap-2"><button onClick={onClose} className="flex-1 rounded-xl border border-[#dfe6e2] bg-white py-3 text-[11px] font-bold text-[#52606b]">Close</button><button onClick={onApply} className={`flex-[1.6] rounded-xl py-3 text-[11px] font-bold ${applied ? "bg-[#e9f6f1] text-[#19735f]" : "bg-[#152238] text-white hover:bg-[#f26b38]"}`}>{applied ? "Application sent" : "Apply to this job"}</button></div></div></div></div></div>;
}

function PostJobModal({ onClose, onCreate }: { onClose: () => void; onCreate: (job: Job) => void }) {
  const [form, setForm] = useState({ role: "Event Registration Executive", category: "Corporate Events", eventName: "", location: "", date: "2026-10-24", startTime: "09:00", endTime: "17:00", pay: "1800", openings: "4", skills: "Guest handling, Hindi, English" });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.eventName || !form.location) { toast.error("Add the event name and exact event location first."); return; }
    const newJob: Job = { id: `job-${Date.now()}`, role: form.role, company: "The Celebration Co.", eventName: form.eventName, category: form.category, date: new Date(`${form.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }), time: `${form.startTime} – ${form.endTime}`, location: form.location, distance: "New", pay: Number(form.pay) || 0, openings: Number(form.openings) || 1, tags: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean), verified: true, status: "Open", accent: "#f26b38", description: "A new EventFlex role with clear expectations, a verified organizer, and a confirmed venue." };
    onCreate(newJob);
  };
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#152238]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"><div className="fade-up max-h-[94vh] w-full max-w-[700px] overflow-y-auto rounded-t-[24px] bg-[#fbfcfa] shadow-[0_20px_70px_rgba(21,34,56,0.25)] sm:rounded-[24px]"><div className="flex items-start justify-between border-b border-[#e8ede9] px-5 py-5 sm:px-7"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#9a6b58]">Create requirement</div><h2 className="mt-1 font-display text-[24px] font-extrabold tracking-[-0.05em] text-[#152238]">Post a new job</h2><p className="mt-1 text-[11px] text-[#7b858d]">Clear details attract the right professionals faster.</p></div><button onClick={onClose} className="rounded-full bg-[#f1f4f2] p-2 text-[#63717b] hover:bg-[#e4ebe8]"><X size={17} /></button></div><form onSubmit={submit} className="space-y-5 p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-[11px] font-bold text-[#65727b] sm:col-span-2">Event name<input value={form.eventName} onChange={(e) => update("eventName", e.target.value)} placeholder="e.g. Bhopal Growth Forum" className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Required role<select value={form.role} onChange={(e) => update("role", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]"><option>Event Registration Executive</option><option>Guest Experience Host</option><option>Event Coordinator</option><option>Waiter / Catering Staff</option><option>Security Personnel</option><option>Event Photographer</option></select></label><label className="text-[11px] font-bold text-[#65727b]">Category<select value={form.category} onChange={(e) => update("category", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]"><option>Corporate Events</option><option>Wedding Staff</option><option>Concert Crew</option><option>Hospitality</option><option>Security</option><option>Photography</option></select></label><label className="text-[11px] font-bold text-[#65727b] sm:col-span-2"><span className="flex items-center gap-1">Event location <MapPin size={13} className="text-[#f26b38]" /></span><input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Venue name, street, city and state" className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /><span className="mt-1 block text-[10px] font-normal text-[#8a959c]">This exact location will appear on the job detail, application review, and attendance check-in.</span></label><label className="text-[11px] font-bold text-[#65727b] sm:col-span-2">Event date<input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Start time<input type="time" value={form.startTime} onChange={(e) => update("startTime", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">End time<input type="time" value={form.endTime} onChange={(e) => update("endTime", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Pay per shift<input type="number" min="0" value={form.pay} onChange={(e) => update("pay", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b]">Open positions<input type="number" min="1" value={form.openings} onChange={(e) => update("openings", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label><label className="text-[11px] font-bold text-[#65727b] sm:col-span-2">Skills and languages<input value={form.skills} onChange={(e) => update("skills", e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#e2e8e4] bg-white px-3 py-3 text-[12px] font-medium outline-none focus:border-[#f26b38]" /></label></div><div className="flex items-start gap-3 rounded-[14px] bg-[#fff6db] p-3 text-[11px] leading-4 text-[#7d682c]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#b98518]" /><span>Payment estimate: <b>{money((Number(form.pay) || 0) * (Number(form.openings) || 1))}</b> will be required to fund all positions before hiring is confirmed.</span></div><div className="flex gap-2 border-t border-[#e8ede9] pt-5"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[#dfe6e2] bg-white py-3 text-[11px] font-bold text-[#52606b]">Save draft</button><button type="submit" className="flex-[1.5] rounded-xl bg-[#f26b38] py-3 text-[11px] font-bold text-white hover:bg-[#d85c31]">Publish job requirement</button></div></form></div></div>;
}

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [role, setRole] = useState<Role>("professional");
  const [activeNav, setActiveNav] = useState("home");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bhopal, Madhya Pradesh");
  const [appliedIds, setAppliedIds] = useState<string[]>(["job-2"]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = role === "professional" ? professionalNav : role === "organizer" ? organizerNav : adminNav;
  const roleLabel = role === "professional" ? "Professional" : role === "organizer" ? "Organizer" : "Admin";
  const firstName = user?.name?.split(" ")[0] || "Anurag";

  const setCurrentRole = (nextRole: Role) => {
    setRole(nextRole);
    setActiveNav(nextRole === "admin" ? "dashboard" : "home");
    setShowMobileMenu(false);
  };

  const applyToJob = (job: Job) => {
    if (appliedIds.includes(job.id)) { toast.info("You have already applied to this job."); return; }
    setAppliedIds((current) => [...current, job.id]);
    toast.success(`Application sent for ${job.role}.`);
  };

  const createJob = (job: Job) => {
    setJobs((current) => [job, ...current]);
    setShowPostJob(false);
    setRole("organizer");
    setActiveNav("jobs");
    toast.success("Job published with the event location included.");
  };

  const openJob = (job: Job) => setSelectedJob(job);
  const resetExplore = () => { setActiveNav("explore"); setSearch(""); };

  const content = useMemo(() => {
    if (role === "professional") {
      if (activeNav === "explore") return <ExploreView jobs={jobs} search={search} setSearch={setSearch} onOpenJob={openJob} onApply={applyToJob} appliedIds={appliedIds} />;
      if (activeNav === "myjobs") return <MyJobsView jobs={jobs} appliedIds={appliedIds} onOpenJob={openJob} />;
      if (activeNav === "wallet") return <WalletView />;
      if (activeNav === "profile") return <ProfileView role={role} />;
      return <ProfessionalHome jobs={jobs} onExplore={resetExplore} onOpenJob={openJob} onApply={applyToJob} appliedIds={appliedIds} location={location} setLocation={setLocation} />;
    }
    if (role === "organizer") {
      if (activeNav === "jobs") return <JobsView jobs={jobs} onPostJob={() => setShowPostJob(true)} onOpenJob={openJob} />;
      if (activeNav === "applicants") return <ApplicantsView />;
      if (activeNav === "payments") return <PaymentsView />;
      if (activeNav === "profile") return <ProfileView role={role} />;
      return <OrganizerHome jobs={jobs} onPostJob={() => setShowPostJob(true)} onOpenJob={openJob} />;
    }
    return <AdminView section={activeNav === "dashboard" ? "overview" : navItems.find((item) => item.id === activeNav)?.label || "overview"} />;
  }, [activeNav, appliedIds, jobs, location, navItems, role, search]);

  return <div className="app-surface min-h-screen bg-[#f7f7f3] text-[#152238]"><div className="flex min-h-screen"><aside className="hidden w-[248px] shrink-0 flex-col bg-[#152238] lg:flex"><div className="px-6 pb-7 pt-7"><AppLogo /></div><div className="px-4"><div className="mb-3 flex items-center justify-between px-3"><span className="font-mono-ui text-[9px] uppercase tracking-[0.16em] text-[#8193a5]">Workspace</span><span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-[#9fb0be]">LIVE</span></div><nav className="space-y-1">{navItems.map((item) => { const Icon = item.icon; const active = activeNav === item.id; return <button key={item.id} onClick={() => setActiveNav(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] font-semibold transition ${active ? "bg-[#f26b38] text-white shadow-[0_6px_16px_rgba(242,107,56,0.18)]" : "text-[#aebdca] hover:bg-white/5 hover:text-white"}`}><Icon size={16} />{item.label}{item.id === "applicants" && <span className="ml-auto rounded-full bg-[#f26b38] px-1.5 py-0.5 text-[9px] text-white">8</span>}</button>; })}</nav></div><div className="mt-auto px-4 pb-6"><div className="mb-3 rounded-[16px] border border-white/10 bg-white/5 p-3"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#278f83] text-white"><ShieldCheck size={15} /></span><span><span className="block text-[11px] font-bold text-white">Trust & safety</span><span className="mt-0.5 block text-[10px] text-[#9fb0be]">Your data stays protected</span></span></div></div><button onClick={() => toast.info("Help center is coming soon.")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold text-[#aebdca] hover:bg-white/5 hover:text-white"><HelpCircle size={15} /> Help center</button><button onClick={() => { if (isAuthenticated) logout(); else startLogin(); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[11px] font-semibold text-[#aebdca] hover:bg-white/5 hover:text-white">{isAuthenticated ? <LogOut size={15} /> : <UserRound size={15} />}{isAuthenticated ? "Sign out" : "Sign in"}</button></div></aside><div className="min-w-0 flex-1"><header className="sticky top-0 z-30 border-b border-[#e6ebe8]/90 bg-[#f7f7f3]/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-10"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3 lg:hidden"><button onClick={() => setShowMobileMenu(true)} className="rounded-xl bg-white p-2 text-[#52606b] shadow-sm"><Menu size={18} /></button><AppLogo compact /></div><div className="hidden lg:block"><div className="font-mono-ui text-[9px] uppercase tracking-[0.16em] text-[#9a6b58]">{roleLabel} workspace</div><div className="mt-1 text-[13px] font-bold text-[#52606b]">Good morning, {firstName}</div></div><div className="ml-auto flex items-center gap-2 sm:gap-3"><button onClick={() => setLocation("Bhopal, Madhya Pradesh")} className="hidden items-center gap-2 rounded-xl border border-[#e0e7e2] bg-white px-3 py-2 text-[11px] font-semibold text-[#56656f] sm:flex"><MapPin size={14} className="text-[#f26b38]" /> Bhopal <ChevronDown size={13} className="text-[#97a2a7]" /></button><div className="relative"><button onClick={() => setShowNotifications((value) => !value)} className="relative rounded-xl border border-[#e0e7e2] bg-white p-2.5 text-[#56656f] hover:border-[#f6c4b2]"><Bell size={16} />{showNotifications && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#f26b38]" />}</button>{showNotifications && <div className="absolute right-0 top-12 z-40 w-72 rounded-[16px] border border-[#e5eae7] bg-white p-3 shadow-[0_14px_40px_rgba(30,46,63,0.15)]"><div className="flex items-center justify-between px-2 pb-2"><span className="text-[12px] font-bold text-[#253545]">Notifications</span><span className="text-[10px] text-[#f26b38]">3 new</span></div>{["Your profile was viewed by Summit Experiences", "Payment released for Brand launch support", "New role near Bhopal matches your skills"].map((notification) => <button key={notification} onClick={() => setShowNotifications(false)} className="flex w-full gap-2 rounded-xl p-2 text-left hover:bg-[#f7f9f7]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f26b38]" /><span className="text-[11px] leading-4 text-[#65727b]">{notification}</span></button>)}</div>}</div><button onClick={() => setCurrentRole(role === "professional" ? "organizer" : role === "organizer" ? "admin" : "professional")} className="flex items-center gap-2 rounded-xl border border-[#e0e7e2] bg-white px-2 py-1.5 text-left hover:border-[#f6c4b2]"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f26b38] text-[10px] font-extrabold text-white">{role === "professional" ? "AK" : role === "organizer" ? "TC" : "AD"}</span><span className="hidden pr-1 sm:block"><span className="block text-[10px] font-bold text-[#344250]">{roleLabel}</span><span className="block text-[9px] text-[#8a959c]">Switch role <ChevronDown size={10} className="ml-0.5 inline" /></span></span></button></div></div></header><main className="mx-auto max-w-[1450px] px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:py-8">{content}</main><div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#e2e8e4] bg-white/95 px-2 py-2 backdrop-blur-md lg:hidden"><div className="mx-auto flex max-w-lg justify-around">{navItems.slice(0, 5).map((item) => { const Icon = item.icon; const active = activeNav === item.id; return <button key={item.id} onClick={() => setActiveNav(item.id)} className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[9px] font-bold ${active ? "text-[#f26b38]" : "text-[#839099]"}`}><Icon size={17} />{item.label.split(" ")[0]}</button>; })}</div></div></div></div>{showMobileMenu && <div className="fixed inset-0 z-50 bg-[#152238]/50 lg:hidden" onClick={() => setShowMobileMenu(false)}><div className="h-full w-[280px] bg-[#152238] p-5" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><AppLogo /><button onClick={() => setShowMobileMenu(false)} className="rounded-full bg-white/10 p-2 text-white"><X size={17} /></button></div><div className="mt-10 space-y-1">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { setActiveNav(item.id); setShowMobileMenu(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] font-semibold ${activeNav === item.id ? "bg-[#f26b38] text-white" : "text-[#aebdca]"}`}><Icon size={16} />{item.label}</button>; })}</div><div className="mt-8 border-t border-white/10 pt-5"><div className="mb-3 px-3 text-[9px] uppercase tracking-[0.16em] text-[#8193a5]">Switch workspace</div>{(["professional", "organizer", "admin"] as Role[]).map((option) => <button key={option} onClick={() => setCurrentRole(option)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[11px] font-semibold capitalize ${role === option ? "bg-white/10 text-white" : "text-[#aebdca]"}`}><span className="h-2 w-2 rounded-full bg-[#f26b38]" />{option}</button>)}</div></div></div>}{showPostJob && <PostJobModal onClose={() => setShowPostJob(false)} onCreate={createJob} />}{selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={() => applyToJob(selectedJob)} applied={appliedIds.includes(selectedJob.id)} />}</div>;
}
