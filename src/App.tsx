import React, { useState, useEffect } from "react";
import type { ComponentType } from "react";
import { themes, i18n } from "./data";
import { Module, ChatMessage, UserEvaluation } from "./types";
import {
  Award,
  Bot,
  Clapperboard,
  Code2,
  House,
  NotebookPen,
  ClipboardList,
  Upload,
  UsersRound,
  Wrench,
  BarChart3
} from "lucide-react";

// Import Modularized Panels & Workspaces
import Onboarding from "./components/Onboarding";
import LoginRegister from "./components/LoginRegister";
import EvaluationResults from "./components/EvaluationResults";
import Analytics from "./components/Analytics";
import DashboardScreen from "./components/Dashboard";
import GuidedVideoScreen from "./components/GuidedVideo";
import NotebookScreen from "./components/Notebook";
import QuizScreen from "./components/Quiz";
import SubmissionsScreen from "./components/Submissions";
import CodeSpaceScreen from "./components/Codespace";
import ToolsScreen from "./components/Tools";
import AIMentorScreen from "./components/AIMentor";
import CommunityScreen from "./components/Community";
import CertificatesScreen from "./components/Certificates";
import ProfileSettingsScreen from "./components/ProfileSettings";
import { CourseExplorerSidebar, AIChatSidebar } from "./components/Sidebar";

type UserProfile = {
  name: string;
  email: string;
  title?: string;
  location?: string;
  bio?: string;
};

type UserPreferences = {
  layoutDensity: "compact" | "comfortable" | "spacious";
  colorPreset: "mint" | "ocean" | "sunset" | "rose";
  accentColor: string;
  mentorTone: "concise" | "balanced" | "deep";
  weeklyGoal: number;
  contentVisibility: {
    showCommunity: boolean;
    showCertificates: boolean;
    showMentor: boolean;
    showPortfolio: boolean;
  };
  dataPreferences: {
    allowTelemetry: boolean;
    allowPersonalization: boolean;
    autoSaveProgress: boolean;
    downloadFormat: "json" | "csv";
  };
};

const DEFAULT_USER: UserProfile = {
  name: "Jawat",
  email: "jawat@example.com",
  title: "Learner",
  location: "Dhaka, Bangladesh",
  bio: "Focused on practical, job-ready engineering skills."
};

const DEFAULT_PREFERENCES: UserPreferences = {
  layoutDensity: "comfortable",
  colorPreset: "mint",
  accentColor: "#00C896",
  mentorTone: "balanced",
  weeklyGoal: 4,
  contentVisibility: {
    showCommunity: true,
    showCertificates: true,
    showMentor: true,
    showPortfolio: true
  },
  dataPreferences: {
    allowTelemetry: true,
    allowPersonalization: true,
    autoSaveProgress: true,
    downloadFormat: "json"
  }
};

const ACCENT_PRESETS: Record<UserPreferences["colorPreset"], string> = {
  mint: "#00C896",
  ocean: "#3AA0FF",
  sunset: "#FF8A3D",
  rose: "#FF5B8A"
};

const normalizePreferences = (raw: unknown): UserPreferences => {
  const src = (raw && typeof raw === "object") ? (raw as Partial<UserPreferences>) : {};
  const srcVisibility = (src.contentVisibility && typeof src.contentVisibility === "object")
    ? src.contentVisibility
    : DEFAULT_PREFERENCES.contentVisibility;
  const srcDataPrefs = (src.dataPreferences && typeof src.dataPreferences === "object")
    ? src.dataPreferences
    : DEFAULT_PREFERENCES.dataPreferences;

  const layoutDensity = ["compact", "comfortable", "spacious"].includes(String(src.layoutDensity))
    ? (src.layoutDensity as UserPreferences["layoutDensity"])
    : DEFAULT_PREFERENCES.layoutDensity;
  const colorPreset = ["mint", "ocean", "sunset", "rose"].includes(String(src.colorPreset))
    ? (src.colorPreset as UserPreferences["colorPreset"])
    : DEFAULT_PREFERENCES.colorPreset;
  const mentorTone = ["concise", "balanced", "deep"].includes(String(src.mentorTone))
    ? (src.mentorTone as UserPreferences["mentorTone"])
    : DEFAULT_PREFERENCES.mentorTone;
  const weeklyGoal = Number.isFinite(src.weeklyGoal) ? Math.min(10, Math.max(1, Number(src.weeklyGoal))) : DEFAULT_PREFERENCES.weeklyGoal;
  const accentColor = typeof src.accentColor === "string" && /^#[0-9a-fA-F]{6}$/.test(src.accentColor)
    ? src.accentColor
    : ACCENT_PRESETS[colorPreset];

  return {
    layoutDensity,
    colorPreset,
    accentColor,
    mentorTone,
    weeklyGoal,
    contentVisibility: {
      showCommunity: srcVisibility.showCommunity ?? DEFAULT_PREFERENCES.contentVisibility.showCommunity,
      showCertificates: srcVisibility.showCertificates ?? DEFAULT_PREFERENCES.contentVisibility.showCertificates,
      showMentor: srcVisibility.showMentor ?? DEFAULT_PREFERENCES.contentVisibility.showMentor,
      showPortfolio: srcVisibility.showPortfolio ?? DEFAULT_PREFERENCES.contentVisibility.showPortfolio
    },
    dataPreferences: {
      allowTelemetry: srcDataPrefs.allowTelemetry ?? DEFAULT_PREFERENCES.dataPreferences.allowTelemetry,
      allowPersonalization: srcDataPrefs.allowPersonalization ?? DEFAULT_PREFERENCES.dataPreferences.allowPersonalization,
      autoSaveProgress: srcDataPrefs.autoSaveProgress ?? DEFAULT_PREFERENCES.dataPreferences.autoSaveProgress,
      downloadFormat: srcDataPrefs.downloadFormat === "csv" ? "csv" : "json"
    }
  };
};

const toRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const safe = normalized.length === 6 ? normalized : "00C896";
  const r = parseInt(safe.slice(0, 2), 16);
  const g = parseInt(safe.slice(2, 4), 16);
  const b = parseInt(safe.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type NavigationItem = {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string; className?: string }>;
};

const CORE_MODULES: Module[] = [
  {
    id: 1,
    title: "Python Fundamentals & Logic",
    lessons: [
      { id: 1, title: "1.1 Scopes & Scaffolding", done: true, dur: "12:34" },
      { id: 2, title: "1.2 Functions Syntax & def", done: true, dur: "18:02" },
      { id: 3, title: "1.3 Scopes and Scuttles Check", done: false, dur: "22:15", active: true },
      { id: 4, title: "1.4 Modular return Returns", done: false, dur: "15:40" }
    ]
  },
  {
    id: 2,
    title: "Data Operations Analytics",
    lessons: [
      { id: 5, title: "2.1 NumPy Dimension Scaling", done: false, dur: "20:10" },
      { id: 6, title: "2.2 Pandas DataFrame Cleansing", done: false, dur: "25:30" }
    ]
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState<"auth" | "onboarding" | "app">(() => {
    try {
      const rawAuth = localStorage.getItem("fixeth.isAuthenticated");
      const rawScreen = localStorage.getItem("fixeth.screen");
      if (rawAuth === "true" && (rawScreen === "onboarding" || rawScreen === "app")) return rawScreen as "auth" | "onboarding" | "app";
      if (rawAuth === "true") return "onboarding";
    } catch {
      // ignore
    }
    return "auth";
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("fixeth.isAuthenticated") === "true";
    } catch {
      return false;
    }
  });
  const [activeNav, setActiveNav] = useState<string>(() => {
    try {
      return localStorage.getItem("fixeth.activeTab") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  // Lessons active indexes
  const [modules, setModules] = useState<Module[]>(CORE_MODULES);
  const [activeLessonId, setActiveLessonId] = useState<number>(3);
  const [openMods, setOpenMods] = useState<{ [key: number]: boolean }>({ 1: true, 2: false });

  // Shared persistent Chat logs
  const [aiMsgs, setAiMsgs] = useState<ChatMessage[]>([
    { role: "ai", text: "I am your Fixeth companion tutor. Let us review the Python Scope blocks!" }
  ]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(290);
  const [isResizing, setIsResizing] = useState(false);
  // Global user/profile state
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [evaluation, setEvaluation] = useState<UserEvaluation | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<"profile" | "account" | "preferences">("profile");
  const [profileReturnNav, setProfileReturnNav] = useState("dashboard");
  const [showingEvalResults, setShowingEvalResults] = useState(false);
  const [lastEvaluationTrack, setLastEvaluationTrack] = useState<string>(() => {
    try {
      return localStorage.getItem("fixeth.lastEvaluationTrack") || "";
    } catch {
      return "";
    }
  });
  const [resumingAssessment, setResumingAssessment] = useState<boolean>(() => {
    try {
      return localStorage.getItem("fixeth.resumingAssessment") === "true";
    } catch {
      return false;
    }
  });

  const activeModule = modules.find((mod: any) => mod.lessons.some((lesson: any) => lesson.id === activeLessonId)) ?? modules[0];
  const activeLesson = activeModule?.lessons.find((lesson: any) => lesson.id === activeLessonId) ?? activeModule?.lessons[0];

  const accent = preferences.accentColor || ACCENT_PRESETS[preferences.colorPreset as keyof typeof ACCENT_PRESETS];
  const baseTheme = themes[isDark ? "dark" : "light"];
  const T = {
    ...baseTheme,
    accent,
    accentHi: accent,
    accentDim: toRgba(accent, 0.16)
  };
  const t = i18n[lang] || i18n.en;

  const densityConfig: any = {
    compact: { topBarHeight: 40, bottomBarHeight: 46, navPadding: "3px 6px" },
    comfortable: { topBarHeight: 44, bottomBarHeight: 52, navPadding: "4px 6px" },
    spacious: { topBarHeight: 52, bottomBarHeight: 58, navPadding: "6px 8px" }
  };
  const density = densityConfig[preferences.layoutDensity as keyof typeof densityConfig];

  // Load persisted user customization and auth state
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("fixeth.userProfile");
      const rawPrefs = localStorage.getItem("fixeth.userPreferences");
      const rawLang = localStorage.getItem("fixeth.lang");
      const rawTheme = localStorage.getItem("fixeth.isDark");
      const rawAuth = localStorage.getItem("fixeth.isAuthenticated");
      const rawScreen = localStorage.getItem("fixeth.screen");
      const rawEval = localStorage.getItem("fixeth.evaluation");
      const rawResuming = localStorage.getItem("fixeth.resumingAssessment");
      const rawTab = localStorage.getItem("fixeth.activeTab");
      
      if (rawUser) setUser({ ...DEFAULT_USER, ...JSON.parse(rawUser) });
      if (rawPrefs) setPreferences(normalizePreferences(JSON.parse(rawPrefs)));
      if (rawLang === "en" || rawLang === "bn") setLang(rawLang);
      if (rawTheme === "true" || rawTheme === "false") setIsDark(rawTheme === "true");
      if (rawAuth === "true") setIsAuthenticated(true);
      if (rawEval) {
        try {
          const parsedEval = JSON.parse(rawEval);
          setEvaluation(parsedEval);
          if (parsedEval.track) setLastEvaluationTrack(parsedEval.track);
        } catch {
          // ignore malformed eval
          setEvaluation(null);
        }
      }
      if (rawResuming === "true") {
        setResumingAssessment(true);
      }
      if (rawTab) setActiveNav(rawTab);
      
      // Restore screen state if authenticated
      if (rawAuth === "true" && (rawScreen === "onboarding" || rawScreen === "app")) {
        setScreen(rawScreen as "onboarding" | "app");
      } else if (rawAuth === "true") {
        setScreen("onboarding");
      }
    } catch {
      // Ignore bad local storage payloads and keep defaults.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fixeth.userProfile", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fixeth.userPreferences", JSON.stringify(normalizePreferences(preferences)));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem("fixeth.lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("fixeth.isDark", String(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("fixeth.isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("fixeth.screen", screen);
  }, [screen]);

  useEffect(() => {
    if (evaluation) {
      localStorage.setItem("fixeth.evaluation", JSON.stringify(evaluation));
    }
  }, [evaluation]);

  useEffect(() => {
    if (lastEvaluationTrack) {
      localStorage.setItem("fixeth.lastEvaluationTrack", lastEvaluationTrack);
    }
  }, [lastEvaluationTrack]);

  useEffect(() => {
    localStorage.setItem("fixeth.resumingAssessment", String(resumingAssessment));
  }, [resumingAssessment]);

  useEffect(() => {
    localStorage.setItem("fixeth.activeTab", activeNav);
  }, [activeNav]);

  // Sync active lesson highlight in list elements
  useEffect(() => {
    setModules((pMods: any) =>
      pMods.map((mod: any) => ({
        ...mod,
        lessons: mod.lessons.map((les: any) => ({
          ...les,
          active: les.id === activeLessonId
        }))
      }))
    );
  }, [activeLessonId]);

  // Handle sidebar drag resize interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 160 && newWidth < 550) {
        setRightSidebarWidth(newWidth);
      } else if (newWidth <= 160) {
        setRightSidebarWidth(0); // Minimize completely
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Global sequential previous lesson navigation
  const handlePreviousLesson = () => {
    let allLessons: { id: number; modId: number }[] = [];
    modules.forEach((m: any) => {
      m.lessons.forEach((l: any) => {
        allLessons.push({ id: l.id, modId: m.id });
      });
    });

    const currIdx = allLessons.findIndex((item) => item.id === activeLessonId);
    if (currIdx > 0) {
      const prevItem = allLessons[currIdx - 1];
      setActiveLessonId(prevItem.id);
      setOpenMods((prev: any) => ({ ...prev, [prevItem.modId]: true }));
    }
  };

  // Global sequential next lesson navigation
  const handleNextLesson = () => {
    let allLessons: { id: number; modId: number }[] = [];
    modules.forEach((m: any) => {
      m.lessons.forEach((l: any) => {
        allLessons.push({ id: l.id, modId: m.id });
      });
    });

    const currIdx = allLessons.findIndex((item) => item.id === activeLessonId);
    if (currIdx < allLessons.length - 1) {
      const nextItem = allLessons[currIdx + 1];
      setActiveLessonId(nextItem.id);
      setOpenMods((prev: any) => ({ ...prev, [nextItem.modId]: true }));
    }
  };

  // Define Navigation Array
  const NAVIGATION_ITEMS: NavigationItem[] = [
    { id: "dashboard", label: t.dashboard, icon: House },
    { id: "video", label: t.guidedVideo, icon: Clapperboard },
    { id: "notebook", label: t.notebook, icon: NotebookPen },
    { id: "quiz", label: t.quizAssign, icon: ClipboardList },
    { id: "submissions", label: t.submissions, icon: Upload },
    { id: "codespace", label: t.codeSpace, icon: Code2 },
    { id: "tools", label: t.tools, icon: Wrench },
    { id: "analytics", label: t.analytics, icon: BarChart3 },
    ...(preferences.contentVisibility.showMentor ? [{ id: "mentor", label: t.aiMentor, icon: Bot }] : []),
    ...(preferences.contentVisibility.showCommunity ? [{ id: "community", label: t.community, icon: UsersRound }] : []),
    ...(preferences.contentVisibility.showCertificates ? [{ id: "certs", label: t.certs, icon: Award }] : [])
  ];

  useEffect(() => {
    const allowedIds = new Set(NAVIGATION_ITEMS.map((item) => item.id));
    if (!allowedIds.has(activeNav) && activeNav !== "profile") {
      setActiveNav("dashboard");
    }
  }, [activeNav, NAVIGATION_ITEMS]);

  // Screen selection dispatcher
  const renderScreen = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardScreen T={T} t={t} lang={lang} onContinue={() => setActiveNav("video")} user={user} evaluation={evaluation} modules={modules} activeLessonId={activeLessonId} weeklyGoal={preferences.weeklyGoal} onStartAssessment={() => { setResumingAssessment(true); setScreen("onboarding"); }} />;
      case "video":
        return (
          <GuidedVideoScreen
            T={T}
            t={t}
            modules={modules}
            openMods={openMods}
            setOpenMods={setOpenMods}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            aiMsgs={aiMsgs}
            setAiMsgs={setAiMsgs}
            lang={lang}
          />
        );
      case "notebook":
        return (
          <NotebookScreen
            T={T}
            t={t}
            modules={modules}
            openMods={openMods}
            setOpenMods={setOpenMods}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            aiMsgs={aiMsgs}
            setAiMsgs={setAiMsgs}
            lang={lang}
          />
        );
      case "quiz":
        return (
          <QuizScreen
            T={T}
            t={t}
            modules={modules}
            openMods={openMods}
            setOpenMods={setOpenMods}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            aiMsgs={aiMsgs}
            setAiMsgs={setAiMsgs}
            lang={lang}
          />
        );
      case "submissions":
        return (
          <SubmissionsScreen
            T={T}
            t={t}
            modules={modules}
            openMods={openMods}
            setOpenMods={setOpenMods}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            aiMsgs={aiMsgs}
            setAiMsgs={setAiMsgs}
            lang={lang}
          />
        );
      case "codespace":
        return <CodeSpaceScreen T={T} t={t} />;
      case "tools":
        return <ToolsScreen T={T} t={t} />;
      case "mentor":
        return <AIMentorScreen T={T} t={t} lang={lang} aiMsgs={aiMsgs} setAiMsgs={setAiMsgs} />;
      case "community":
        return <CommunityScreen T={T} t={t} lang={lang} />;
      case "certs":
        return <CertificatesScreen T={T} t={t} lang={lang} user={user} />;
      case "profile":
        return (
          <ProfileSettingsScreen
            T={T}
            t={t}
            lang={lang}
            isDark={isDark}
            user={user}
            preferences={preferences}
            initialTab={profileTab}
            onBack={() => setActiveNav(profileReturnNav || "dashboard")}
            onSaveUser={setUser}
            onSavePreferences={(nextPrefs) => setPreferences(normalizePreferences(nextPrefs))}
            onResetPreferences={() => setPreferences(DEFAULT_PREFERENCES)}
            onExportProfileData={() => {
              const payload = {
                user,
                preferences,
                exportedAt: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `fixeth-profile-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            onClearProfileData={() => {
              localStorage.removeItem("fixeth.userProfile");
              localStorage.removeItem("fixeth.userPreferences");
              setUser(DEFAULT_USER);
              setPreferences(DEFAULT_PREFERENCES);
            }}
            onSetLang={setLang}
            onToggleTheme={() => setIsDark((prev: boolean) => !prev)}
          />
        );
      case "analytics":
        return <Analytics T={T} t={t} lang={lang} user={user} evaluation={evaluation} modules={modules} activeLessonId={activeLessonId} weeklyGoal={preferences.weeklyGoal} />;
      default:
        return <DashboardScreen T={T} t={t} lang={lang} onContinue={() => setActiveNav("video")} user={user} evaluation={evaluation} modules={modules} activeLessonId={activeLessonId} weeklyGoal={preferences.weeklyGoal} onStartAssessment={() => { setResumingAssessment(true); setScreen("onboarding"); }} />;
    }
  };

  const isWorkspaceTab = ["video", "notebook", "quiz", "submissions"].includes(activeNav);
  const showAiSidebar = preferences.contentVisibility.showMentor && ["video", "notebook", "quiz"].includes(activeNav);

  // Keep this conditional return after all hooks to preserve hook order across renders.
  // Auth screen
  if (!isAuthenticated) {
    return (
      <LoginRegister
        T={T}
        t={t}
        onSuccess={(email, name) => {
          setUser({ ...user, email, name });
          setIsAuthenticated(true);
          setScreen("onboarding");
        }}
      />
    );
  }

  // Onboarding screen
  if (screen === "onboarding") {
    return (
      <Onboarding
        T={T}
        parentT={t}
        isDark={isDark}
        initialStep={resumingAssessment ? 4 : 0}
        initialTrack={lastEvaluationTrack || "ds"}
        onComplete={(data) => {
          if (data.lang) setLang(data.lang);
          
          // Store evaluation result
          if (data.evaluation) {
            setEvaluation(data.evaluation);
            setLastEvaluationTrack(data.track);
            
            // If not skipped, show results screen
            if (!data.evaluation.skipped && data.evaluation.score !== undefined) {
              setShowingEvalResults(true);
              setScreen("app");
              setActiveNav("dashboard");
              setResumingAssessment(false);
              return;
            }
          }
          
          // Set recommended lesson based on assessment score
          if (typeof data.assessmentScore === "number") {
            const recommendedLessonId = data.assessmentScore >= 2 ? 5 : data.assessmentScore === 1 ? 3 : 1;
            setActiveLessonId(recommendedLessonId);
            setOpenMods({ 1: true, 2: recommendedLessonId >= 5 });
          }
          
          setScreen("app");
          setActiveNav("dashboard");
          setResumingAssessment(false);
        }}
      />
    );
  }

  // Show evaluation results if just completed assessment
  if (showingEvalResults && evaluation && !evaluation.skipped && evaluation.score !== undefined) {
    return (
      <EvaluationResults
        T={T}
        t={t}
        score={evaluation.score}
        totalQuestions={10}
        trackName={lastEvaluationTrack || "Selected Track"}
        onContinue={() => {
          setShowingEvalResults(false);
          // Set recommended lesson
          const recommendedLessonId = (evaluation?.score ?? 0) >= 7 ? 5 : (evaluation?.score ?? 0) >= 5 ? 3 : 1;
          setActiveLessonId(recommendedLessonId);
          setOpenMods({ 1: true, 2: recommendedLessonId >= 5 });
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: T.bg0,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        color: T.txt0,
        overflow: "hidden"
      }}
    >
      {/* Top action header block */}
      {activeNav === "dashboard" && (
      <div
        style={{
          height: density.topBarHeight,
          background: T.navBg,
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          flexShrink: 0,
          boxShadow: T.shadow,
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: T.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 950,
              color: "#000"
            }}
          >
            F
          </div>
          <span style={{ fontSize: 15, fontWeight: 950, color: T.txt0, letterSpacing: -0.5 }}>
            {t.brand}
          </span>
          <span style={{ fontSize: 10, color: T.accent, fontStyle: "italic", fontWeight: 700 }}>
            {t.tagline}
          </span>
        </div>

        <div style={{ width: 1, height: 16, background: T.border, margin: "0 4px" }} />
        
        {/* Dynamic Context Header */}
        <span style={{ fontSize: 11, color: T.txt1, fontWeight: 700 }}>
          {lang === "bn" ? "আইটি প্লেসমেন্ট কারিকুলাম" : "Professional Syllabus"}
        </span>
        <span style={{ color: T.txt2, fontSize: 10 }}>›</span>
        <span style={{ fontSize: 11, color: T.txt0, fontWeight: 600 }}>
          {lang === "bn" ? `মডিউল ${activeModule?.id ?? 1}` : `Module ${activeModule?.id ?? 1}`}
        </span>
        <span style={{ color: T.txt2, fontSize: 10 }}>›</span>
        <span style={{ fontSize: 11, color: T.txt0, fontWeight: 600 }}>
          {activeLesson?.title ?? (lang === "bn" ? "লেসন নির্বাচন করুন" : "Select a lesson")}
        </span>

        {/* Local Settings Panel (Top Right Header) */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          
          {/* Active bilingual selection */}
          <div style={{ display: "flex", background: T.bg3, borderRadius: 6, overflow: "hidden", border: `1px solid ${T.border}`, padding: 1.5 }}>
            {[
              ["en", "EN"],
              ["bn", "বাংলা"]
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setLang(id)}
                style={{
                  padding: "2px 8px",
                  fontSize: 8.5,
                  fontWeight: 700,
                  background: lang === id ? T.accent : "none",
                  color: lang === id ? "#000" : T.txt1,
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 4
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Theme selection toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: T.bg3,
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10.5,
              fontWeight: 700,
              color: T.txt0,
              cursor: "pointer"
            }}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

          <span style={{ background: T.accentDim, color: T.accent, border: `1px solid ${T.accent}33`, padding: "2px 6px", borderRadius: 4, fontSize: 9.5, fontWeight: 700 }}>
            BYOA: Active
          </span>
          
          {/* Avatar sphere with profile menu */}
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setProfileOpen((s) => !s)}
              title={user.name}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: T.accent,
                color: "#000",
                fontSize: 11,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            {profileOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 34,
                  background: T.bg1,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 180,
                  boxShadow: T.shadow,
                  zIndex: 200
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: T.txt0, padding: "6px 8px" }}>{user.name}</div>
                <div style={{ height: 1, background: T.border, margin: "6px 0" }} />
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setProfileReturnNav(activeNav);
                    setProfileTab("profile");
                    setActiveNav("profile");
                  }}
                  style={{ display: "block", width: "100%", padding: "8px", background: "none", border: "none", textAlign: "left", color: T.txt1, cursor: "pointer" }}
                >
                  {t.profileView}
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setProfileReturnNav(activeNav);
                    setProfileTab("account");
                    setActiveNav("profile");
                  }}
                  style={{ display: "block", width: "100%", padding: "8px", background: "none", border: "none", textAlign: "left", color: T.txt1, cursor: "pointer" }}
                >
                  {t.profileSettings}
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setProfileReturnNav(activeNav);
                    setProfileTab("preferences");
                    setActiveNav("profile");
                  }}
                  style={{ display: "block", width: "100%", padding: "8px", background: "none", border: "none", textAlign: "left", color: T.txt1, cursor: "pointer" }}
                >
                  {t.profilePreferences}
                </button>
                <button
                  onClick={() => {
                    // Sign out: clear auth state and return to login
                    setUser({ name: "Guest", email: "", title: "", location: "", bio: "" });
                    setProfileOpen(false);
                    setIsAuthenticated(false);
                    setScreen("auth");
                    localStorage.removeItem("fixeth.isAuthenticated");
                  }}
                  style={{ display: "block", width: "100%", padding: "8px", background: "none", border: "none", textAlign: "left", color: T.red, cursor: "pointer", fontWeight: 800 }}
                >
                  {t.profileSignOut}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Primary content card viewport */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
        {isWorkspaceTab && (
          <CourseExplorerSidebar
            T={T}
            t={t}
            modules={modules}
            openMods={openMods}
            setOpenMods={setOpenMods}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            onPrevious={handlePreviousLesson}
            onNext={handleNextLesson}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(true)}
          />
        )}
        
        {/* Floating expand button for left sidebar */}
        {isWorkspaceTab && sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            title="Expand sidebar"
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              zIndex: 50,
              width: 32,
              height: 32,
              borderRadius: 8,
              background: T.bg2,
              border: `1px solid ${T.border}`,
              color: T.accent,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: T.shadow,
              outline: "none"
            }}
          >
            <span style={{ fontSize: 13, color: T.accent }}>▶</span>
          </button>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
          {renderScreen()}
        </div>

        {/* Resizable Divider Drag Handle */}
        {isWorkspaceTab && rightSidebarWidth > 0 && (
          <div
            onMouseDown={() => setIsResizing(true)}
            style={{
              width: 4,
              cursor: "col-resize",
              background: isResizing ? T.accent : "transparent",
              borderLeft: `1px solid ${T.border}`,
              borderRight: `1px solid ${T.border}`,
              transition: "background 0.15s ease",
              alignSelf: "stretch",
              zIndex: 40
            }}
            title="Drag left/right to resize AI Mentor sidebar"
          />
        )}

        {/* Floating expand button for right sidebar */}
        {isWorkspaceTab && rightSidebarWidth === 0 && (
          <button
            onClick={() => setRightSidebarWidth(290)}
            title="Expand AI Mentor Sidebar"
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              background: T.accent,
              border: `1px solid ${T.border}`,
              borderRadius: "8px 0 0 8px",
              padding: "16px 8px",
              color: "#000000",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 10.5,
              zIndex: 100,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              boxShadow: T.shadow,
              outline: "none"
            }}
          >
            ✦ Expand AI Mentor
          </button>
        )}

        {showAiSidebar && (
          <AIChatSidebar
            T={T}
            t={t}
            msgs={aiMsgs}
            setMsgs={setAiMsgs}
            lang={lang}
            width={rightSidebarWidth}
          />
        )}
      </div>

      {/* Bottom ribbons (DaVinci resolve layout) */}
      <div
        style={{
          height: density.bottomBarHeight,
          background: T.navBg,
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexShrink: 0,
          padding: "0 6px",
          zIndex: 10
        }}
      >
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                padding: density.navPadding,
                borderRadius: 8,
                background: isActive ? T.accentDim : "none",
                border: `1.5px solid ${isActive ? T.accent + "3c" : "transparent"}`,
                cursor: "pointer",
                minWidth: 68,
                outline: "none"
              }}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.9} color={isActive ? T.accent : T.txt1} />
              <span
                style={{
                  fontSize: 8,
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? T.accent : T.txt1,
                  whiteSpace: "nowrap"
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
