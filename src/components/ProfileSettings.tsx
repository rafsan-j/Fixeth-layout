import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Database,
  Download,
  Languages,
  LayoutGrid,
  MoonStar,
  Palette,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Trash2,
  UserRound
} from "lucide-react";

type ProfileTab = "profile" | "account" | "preferences";
type ScreenTab = ProfileTab | "data";

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

const SECTION_STYLE = {
  display: "grid",
  gap: 14
} as const;

export default function ProfileSettingsScreen({
  T,
  lang,
  isDark,
  user,
  preferences,
  initialTab,
  onBack,
  onSaveUser,
  onSavePreferences,
  onResetPreferences,
  onExportProfileData,
  onClearProfileData,
  onSetLang,
  onToggleTheme
}: {
  T: any;
  t: any;
  lang: string;
  isDark: boolean;
  user: UserProfile;
  preferences: UserPreferences;
  initialTab: ProfileTab;
  onBack: () => void;
  onSaveUser: (nextUser: UserProfile) => void;
  onSavePreferences: (nextPrefs: UserPreferences) => void;
  onResetPreferences: () => void;
  onExportProfileData: () => void;
  onClearProfileData: () => void;
  onSetLang: (nextLang: string) => void;
  onToggleTheme: () => void;
}) {
  const [activeTab, setActiveTab] = useState<ScreenTab>(initialTab);
  const [profileDraft, setProfileDraft] = useState<UserProfile>(user);
  const [prefsDraft, setPrefsDraft] = useState<UserPreferences>(preferences);
  const [toast, setToast] = useState<string | null>(null);
  const [twoFA, setTwoFA] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setProfileDraft(user);
  }, [user]);

  useEffect(() => {
    setPrefsDraft(preferences);
  }, [preferences]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  };

  const saveIdentity = () => {
    const nextName = profileDraft.name.trim() || "Learner";
    const nextEmail = profileDraft.email.trim();
    onSaveUser({ ...profileDraft, name: nextName, email: nextEmail });
    showToast("Profile updated");
  };

  const savePreferences = () => {
    onSavePreferences(prefsDraft);
    showToast("Customization saved");
  };

  const gradientPreview = useMemo(() => {
    return `linear-gradient(140deg, ${prefsDraft.accentColor}30 0%, ${T.bg2} 45%, ${T.bg1} 100%)`;
  }, [prefsDraft.accentColor, T.bg1, T.bg2]);

  const tabButton = (tab: ScreenTab, label: string, icon: React.ReactNode) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: activeTab === tab ? T.accentDim : T.bg2,
        border: `1px solid ${activeTab === tab ? T.accent : T.border}`,
        borderRadius: 10,
        color: activeTab === tab ? T.accent : T.txt1,
        padding: "10px 12px",
        fontSize: 11.5,
        fontWeight: 800,
        cursor: "pointer"
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: T.bg0 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              onClick={onBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                color: T.txt0,
                fontWeight: 800,
                fontSize: 11,
                padding: "8px 12px",
                cursor: "pointer",
                alignSelf: "flex-start"
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Workspace</span>
            </button>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950, color: T.txt0 }}>
              Profile Control Center
            </h1>
            <p style={{ margin: "4px 0 0", color: T.txt1, fontSize: 12.5, maxWidth: 680 }}>
              Tune your identity, display preferences, and privacy defaults from one polished workspace.
            </p>
          </div>
          <div style={{ background: T.accentDim, border: `1px solid ${T.accent}66`, color: T.accent, borderRadius: 999, padding: "8px 12px", fontSize: 10.5, fontWeight: 900, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <BadgeCheck size={14} />
            <span>Premium LMS Personalization</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {tabButton("profile", "Profile", <UserRound size={14} />)}
          {tabButton("account", "Account", <ShieldCheck size={14} />)}
          {tabButton("preferences", "Customization", <Palette size={14} />)}
          {tabButton("data", "Data", <Database size={14} />)}
        </div>

        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
            <section style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18, boxShadow: T.shadow, ...SECTION_STYLE }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, color: T.txt0 }}>Identity Details</h3>
                <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 11.5 }}>
                  Keep your public profile aligned across the dashboard, certificates, and mentor surfaces.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                  Full Name
                  <input value={profileDraft.name} onChange={(e) => setProfileDraft((p) => ({ ...p, name: e.target.value }))} style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontSize: 12 }} />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                  Professional Title
                  <input value={profileDraft.title || ""} onChange={(e) => setProfileDraft((p) => ({ ...p, title: e.target.value }))} style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontSize: 12 }} />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                Location
                <input value={profileDraft.location || ""} onChange={(e) => setProfileDraft((p) => ({ ...p, location: e.target.value }))} style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontSize: 12 }} />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                Short Bio
                <textarea value={profileDraft.bio || ""} onChange={(e) => setProfileDraft((p) => ({ ...p, bio: e.target.value }))} rows={4} style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontSize: 12, resize: "vertical" }} />
              </label>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={saveIdentity} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer", fontSize: 11.5 }}>
                  <Save size={14} />
                  <span>Save Profile</span>
                </button>
              </div>
            </section>

            <aside style={{ background: gradientPreview, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16, boxShadow: T.shadow }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: T.txt0, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={14} />
                <span>Live Preview</span>
              </div>
              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: prefsDraft.accentColor, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                    {(profileDraft.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: T.txt0 }}>{profileDraft.name || "Learner"}</div>
                    <div style={{ fontSize: 10.5, color: T.txt1 }}>{profileDraft.title || "Learner"}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 10.5, color: T.txt1 }}>
                  Density: {prefsDraft.layoutDensity} | Weekly goal: {prefsDraft.weeklyGoal}
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === "account" && (
          <section style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18, boxShadow: T.shadow, maxWidth: 760, ...SECTION_STYLE }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, color: T.txt0 }}>Account & Security</h3>
              <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 11.5 }}>
                Account access, sign-in protection, and sync behavior.
              </p>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1, maxWidth: 420 }}>
              Email Address
              <input type="email" value={profileDraft.email} onChange={(e) => setProfileDraft((p) => ({ ...p, email: e.target.value }))} style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontSize: 12 }} />
            </label>

            <div style={{ display: "grid", gap: 10, maxWidth: 460 }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>Two-factor authentication</span>
                <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>Auto-save progress</span>
                <input type="checkbox" checked={prefsDraft.dataPreferences.autoSaveProgress} onChange={(e) => setPrefsDraft((p) => ({ ...p, dataPreferences: { ...p.dataPreferences, autoSaveProgress: e.target.checked } }))} />
              </label>
            </div>

            <div style={{ fontSize: 11, color: T.txt1, maxWidth: 760 }}>
              Next steps can include device sessions, login history, and enterprise SSO links.
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={saveIdentity} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer", fontSize: 11.5 }}>
                <Save size={14} />
                <span>Update Account</span>
              </button>
            </div>
          </section>
        )}

        {activeTab === "preferences" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
            <section style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18, boxShadow: T.shadow, ...SECTION_STYLE }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, color: T.txt0 }}>Layout & Color Control</h3>
                <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 11.5 }}>
                  Choose how dense, vibrant, and assistant-forward the workspace feels.
                </p>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <LayoutGrid size={13} />
                  <span>Layout Density</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["compact", "Compact"],
                    ["comfortable", "Comfortable"],
                    ["spacious", "Spacious"]
                  ].map(([id, label]) => (
                    <button key={id} onClick={() => setPrefsDraft((p) => ({ ...p, layoutDensity: id as UserPreferences["layoutDensity"] }))} style={{ background: prefsDraft.layoutDensity === id ? T.accentDim : T.bg2, border: `1px solid ${prefsDraft.layoutDensity === id ? T.accent : T.border}`, color: prefsDraft.layoutDensity === id ? T.accent : T.txt1, borderRadius: 10, padding: "8px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <Palette size={13} />
                  <span>Color Preset</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {([
                    ["mint", "#00C896"],
                    ["ocean", "#3AA0FF"],
                    ["sunset", "#FF8A3D"],
                    ["rose", "#FF5B8A"]
                  ] as const).map(([id, color]) => (
                    <button key={id} onClick={() => setPrefsDraft((p) => ({ ...p, colorPreset: id, accentColor: color }))} style={{ width: 30, height: 30, borderRadius: 999, background: color, border: `2px solid ${prefsDraft.colorPreset === id ? T.txt0 : "transparent"}`, cursor: "pointer" }} title={id} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <Sparkles size={13} />
                  <span>Custom Accent Color</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="color" value={prefsDraft.accentColor} onChange={(e) => setPrefsDraft((p) => ({ ...p, accentColor: e.target.value }))} style={{ width: 46, height: 34, border: `1px solid ${T.border}`, borderRadius: 10, background: T.bg2, cursor: "pointer" }} />
                  <input value={prefsDraft.accentColor} onChange={(e) => setPrefsDraft((p) => ({ ...p, accentColor: e.target.value }))} style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 10, color: T.txt0, padding: "8px 10px", fontSize: 11.5, width: 120, fontFamily: "monospace" }} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>AI Mentor Tone</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {([
                    ["concise", "Concise"],
                    ["balanced", "Balanced"],
                    ["deep", "Deep Dive"]
                  ] as const).map(([id, label]) => (
                    <button key={id} onClick={() => setPrefsDraft((p) => ({ ...p, mentorTone: id }))} style={{ background: prefsDraft.mentorTone === id ? T.accentDim : T.bg2, border: `1px solid ${prefsDraft.mentorTone === id ? T.accent : T.border}`, color: prefsDraft.mentorTone === id ? T.accent : T.txt1, borderRadius: 10, padding: "8px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>Weekly Goal</div>
                <div style={{ fontSize: 11, color: T.txt0, marginBottom: 8 }}>{prefsDraft.weeklyGoal} classes / week</div>
                <input type="range" min={1} max={10} value={prefsDraft.weeklyGoal} onChange={(e) => setPrefsDraft((p) => ({ ...p, weeklyGoal: Number(e.target.value) }))} style={{ width: "100%" }} />
              </div>
            </section>

            <aside style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18, boxShadow: T.shadow, ...SECTION_STYLE }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 14, color: T.txt0 }}>Content Visibility</h3>
                <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 11.5 }}>
                  Show only the modules and surfaces you want in the shell.
                </p>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>Show Community</span>
                  <input type="checkbox" checked={prefsDraft.contentVisibility.showCommunity} onChange={(e) => setPrefsDraft((p) => ({ ...p, contentVisibility: { ...p.contentVisibility, showCommunity: e.target.checked } }))} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>Show Certificates</span>
                  <input type="checkbox" checked={prefsDraft.contentVisibility.showCertificates} onChange={(e) => setPrefsDraft((p) => ({ ...p, contentVisibility: { ...p.contentVisibility, showCertificates: e.target.checked } }))} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>Show AI Mentor</span>
                  <input type="checkbox" checked={prefsDraft.contentVisibility.showMentor} onChange={(e) => setPrefsDraft((p) => ({ ...p, contentVisibility: { ...p.contentVisibility, showMentor: e.target.checked } }))} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>Show Portfolio</span>
                  <input type="checkbox" checked={prefsDraft.contentVisibility.showPortfolio} onChange={(e) => setPrefsDraft((p) => ({ ...p, contentVisibility: { ...p.contentVisibility, showPortfolio: e.target.checked } }))} />
                </label>
              </div>

              <div style={{ paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <Languages size={13} />
                  <span>Quick Settings</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => onSetLang(lang === "en" ? "bn" : "en")} style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 10, color: T.txt0, padding: "8px 12px", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                    Toggle Language
                  </button>
                  <button onClick={onToggleTheme} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 10, color: T.txt0, padding: "8px 12px", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
                    {isDark ? <SunMedium size={13} /> : <MoonStar size={13} />}
                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={savePreferences} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.accent, color: "#000", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 900, cursor: "pointer", fontSize: 11.5 }}>
                  <Save size={14} />
                  <span>Save Customization</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {activeTab === "data" && (
          <section style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 14, padding: 18, boxShadow: T.shadow, maxWidth: 760, ...SECTION_STYLE }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, color: T.txt0 }}>Data Controls</h3>
              <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 11.5 }}>
                Export, reset, or remove locally stored profile data.
              </p>
            </div>

            <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>Allow product analytics</span>
                <input type="checkbox" checked={prefsDraft.dataPreferences.allowTelemetry} onChange={(e) => setPrefsDraft((p) => ({ ...p, dataPreferences: { ...p.dataPreferences, allowTelemetry: e.target.checked } }))} />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>Allow personalization</span>
                <input type="checkbox" checked={prefsDraft.dataPreferences.allowPersonalization} onChange={(e) => setPrefsDraft((p) => ({ ...p, dataPreferences: { ...p.dataPreferences, allowPersonalization: e.target.checked } }))} />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>Auto-save work progress</span>
                <input type="checkbox" checked={prefsDraft.dataPreferences.autoSaveProgress} onChange={(e) => setPrefsDraft((p) => ({ ...p, dataPreferences: { ...p.dataPreferences, autoSaveProgress: e.target.checked } }))} />
              </label>
            </div>

            <div>
              <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>Download Format</div>
              <div style={{ display: "flex", gap: 10 }}>
                {(["json", "csv"] as const).map((fmt) => (
                  <button key={fmt} onClick={() => setPrefsDraft((p) => ({ ...p, dataPreferences: { ...p.dataPreferences, downloadFormat: fmt } }))} style={{ background: prefsDraft.dataPreferences.downloadFormat === fmt ? T.accentDim : T.bg2, border: `1px solid ${prefsDraft.dataPreferences.downloadFormat === fmt ? T.accent : T.border}`, borderRadius: 10, color: prefsDraft.dataPreferences.downloadFormat === fmt ? T.accent : T.txt1, padding: "8px 12px", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => { savePreferences(); onExportProfileData(); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontWeight: 800, cursor: "pointer", fontSize: 11 }}>
                <Download size={14} />
                <span>Export My Data</span>
              </button>
              <button onClick={() => { onResetPreferences(); showToast("Defaults restored"); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 10, padding: "10px 12px", fontWeight: 800, cursor: "pointer", fontSize: 11 }}>
                <RotateCcw size={14} />
                <span>Reset to Default</span>
              </button>
              <button onClick={() => { onClearProfileData(); showToast("Local profile data cleared"); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: `1px solid ${T.red}`, color: T.red, borderRadius: 10, padding: "10px 12px", fontWeight: 800, cursor: "pointer", fontSize: 11 }}>
                <Trash2 size={14} />
                <span>Clear Local Data</span>
              </button>
            </div>

            <div style={{ fontSize: 10.5, color: T.txt1 }}>
              Clearing data resets only this browser's local profile and customization settings.
            </div>
          </section>
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: T.accent, color: "#000", padding: "10px 14px", borderRadius: 10, fontSize: 11, fontWeight: 900, boxShadow: T.shadow, zIndex: 400, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Settings2 size={14} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
