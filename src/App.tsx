import React, { useState, useEffect } from "react";
import { themes, i18n } from "./data";
import { Module, ChatMessage } from "./types";

// Import Modularized Panels & Workspaces
import Onboarding from "./components/Onboarding";
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
import { CourseExplorerSidebar, AIChatSidebar } from "./components/Sidebar";

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
  const [screen, setScreen] = useState("onboarding");
  const [activeNav, setActiveNav] = useState("dashboard");

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

  const activeModule = modules.find((mod) => mod.lessons.some((lesson) => lesson.id === activeLessonId)) ?? modules[0];
  const activeLesson = activeModule?.lessons.find((lesson) => lesson.id === activeLessonId) ?? activeModule?.lessons[0];

  const T = themes[isDark ? "dark" : "light"];
  const t = i18n[lang] || i18n.en;

  // Sync active lesson highlight in list elements
  useEffect(() => {
    setModules((pMods) =>
      pMods.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((les) => ({
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
    modules.forEach((m) => {
      m.lessons.forEach((l) => {
        allLessons.push({ id: l.id, modId: m.id });
      });
    });

    const currIdx = allLessons.findIndex((item) => item.id === activeLessonId);
    if (currIdx > 0) {
      const prevItem = allLessons[currIdx - 1];
      setActiveLessonId(prevItem.id);
      setOpenMods((prev) => ({ ...prev, [prevItem.modId]: true }));
    }
  };

  // Global sequential next lesson navigation
  const handleNextLesson = () => {
    let allLessons: { id: number; modId: number }[] = [];
    modules.forEach((m) => {
      m.lessons.forEach((l) => {
        allLessons.push({ id: l.id, modId: m.id });
      });
    });

    const currIdx = allLessons.findIndex((item) => item.id === activeLessonId);
    if (currIdx < allLessons.length - 1) {
      const nextItem = allLessons[currIdx + 1];
      setActiveLessonId(nextItem.id);
      setOpenMods((prev) => ({ ...prev, [nextItem.modId]: true }));
    }
  };

  if (screen === "onboarding") {
    return (
      <Onboarding
        T={T}
        parentT={t}
        isDark={isDark}
        onComplete={(data) => {
          if (data.lang) setLang(data.lang);
          if (typeof data.assessmentScore === "number") {
            const recommendedLessonId = data.assessmentScore >= 2 ? 5 : data.assessmentScore === 1 ? 3 : 1;
            setActiveLessonId(recommendedLessonId);
            setOpenMods({ 1: true, 2: recommendedLessonId >= 5 });
          }
          setScreen("app");
          setActiveNav("dashboard");
        }}
      />
    );
  }

  // Define Navigation Array
  const NAVIGATION_ITEMS = [
    { id: "dashboard", label: t.dashboard, icon: "🏠" },
    { id: "video", label: t.guidedVideo, icon: "🎬" },
    { id: "notebook", label: t.notebook, icon: "📓" },
    { id: "quiz", label: t.quizAssign, icon: "📝" },
    { id: "submissions", label: t.submissions, icon: "📤" },
    { id: "codespace", label: t.codeSpace, icon: "⚡" },
    { id: "tools", label: t.tools, icon: "🔧" },
    { id: "mentor", label: t.aiMentor, icon: "✦" },
    { id: "community", label: t.community, icon: "👥" },
    { id: "certs", label: t.certs, icon: "🎓" }
  ];

  // Screen selection dispatcher
  const renderScreen = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardScreen T={T} t={t} lang={lang} onContinue={() => setActiveNav("video")} />;
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
        return <CertificatesScreen T={T} t={t} lang={lang} />;
      default:
        return <DashboardScreen T={T} t={t} lang={lang} />;
    }
  };

  const isWorkspaceTab = ["video", "notebook", "quiz", "submissions"].includes(activeNav);
  const showAiSidebar = ["video", "notebook", "quiz"].includes(activeNav);

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
      <div
        style={{
          height: 44,
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
          
          {/* Avatar sphere */}
          <div
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
              justifyContent: "center"
            }}
          >
            J
          </div>
        </div>
      </div>

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
          height: 52,
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
                padding: "4px 6px",
                borderRadius: 8,
                background: isActive ? T.accentDim : "none",
                border: `1.5px solid ${isActive ? T.accent + "3c" : "transparent"}`,
                cursor: "pointer",
                minWidth: 68,
                outline: "none"
              }}
            >
              <span style={{ fontSize: 15, filter: isActive ? "none" : "grayscale(50%)" }}>{item.icon}</span>
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
