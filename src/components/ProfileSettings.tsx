import React, { useEffect, useState } from "react";

type ProfileTab = "profile" | "account" | "preferences";

type UserProfile = {
  name: string;
  email: string;
  title?: string;
  location?: string;
  bio?: string;
};

export default function ProfileSettingsScreen({
  T,
  t,
  lang,
  isDark,
  user,
  initialTab,
  onBack,
  onSaveUser,
  onSetLang,
  onToggleTheme
}: {
  T: any;
  t: any;
  lang: string;
  isDark: boolean;
  user: UserProfile;
  initialTab: ProfileTab;
  onBack: () => void;
  onSaveUser: (nextUser: UserProfile) => void;
  onSetLang: (nextLang: string) => void;
  onToggleTheme: () => void;
}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [draft, setDraft] = useState<UserProfile>(user);
  const [toast, setToast] = useState<string | null>(null);
  const [profileVisibility, setProfileVisibility] = useState<"public" | "cohort" | "private">("cohort");
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [showCertificates, setShowCertificates] = useState(true);
  const [mentorTone, setMentorTone] = useState<"concise" | "balanced" | "deep">("balanced");
  const [weeklyGoal, setWeeklyGoal] = useState(4);
  const [emailDigest, setEmailDigest] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [calendarSync, setCalendarSync] = useState(false);
  const [linkedInSync, setLinkedInSync] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setDraft(user);
  }, [user]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const saveProfile = () => {
    const normalizedName = draft.name.trim() || (lang === "bn" ? "শিক্ষার্থী" : "Learner");
    const normalizedEmail = draft.email.trim();
    onSaveUser({ ...draft, name: normalizedName, email: normalizedEmail });
    showToast(lang === "bn" ? "প্রোফাইল আপডেট হয়েছে" : "Profile updated");
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive ? T.accentDim : T.bg2,
    border: `1px solid ${isActive ? T.accent : T.border}`,
    borderRadius: 8,
    color: isActive ? T.accent : T.txt1,
    padding: "8px 12px",
    fontSize: 11.5,
    fontWeight: 800,
    cursor: "pointer"
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", background: T.bg0 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              onClick={onBack}
              style={{
                background: T.bg2,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                color: T.txt0,
                fontWeight: 800,
                fontSize: 11,
                padding: "6px 10px",
                cursor: "pointer",
                alignSelf: "flex-start"
              }}
            >
              {lang === "bn" ? "← প্রোফাইল থেকে বের হোন" : "← Back to Workspace"}
            </button>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: T.txt0 }}>
              {lang === "bn" ? "অ্যাকাউন্ট ও প্রোফাইল সেটিংস" : "Account & Profile Settings"}
            </h1>
            <p style={{ margin: "6px 0 0", color: T.txt1, fontSize: 12 }}>
              {lang === "bn"
                ? "এখান থেকে আপনার পরিচিতি, অ্যাকাউন্ট এবং পছন্দসমূহ নিয়ন্ত্রণ করুন"
                : "Manage your public profile, account details, and platform preferences"}
            </p>
          </div>
          <div
            style={{
              background: T.accentDim,
              border: `1px solid ${T.accent}55`,
              color: T.accent,
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 10.5,
              fontWeight: 900,
              whiteSpace: "nowrap"
            }}
          >
            ✦ {lang === "bn" ? "Premium LMS Workspace" : "Premium LMS Workspace"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <button style={tabButtonStyle(activeTab === "profile")} onClick={() => setActiveTab("profile")}>
            {lang === "bn" ? "প্রোফাইল" : "Profile"}
          </button>
          <button style={tabButtonStyle(activeTab === "account")} onClick={() => setActiveTab("account")}>
            {lang === "bn" ? "অ্যাকাউন্ট" : "Account"}
          </button>
          <button style={tabButtonStyle(activeTab === "preferences")} onClick={() => setActiveTab("preferences")}>
            {lang === "bn" ? "পছন্দসমূহ" : "Preferences"}
          </button>
        </div>

        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
            <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 14, color: T.txt0 }}>
                {lang === "bn" ? "পাবলিক প্রোফাইল" : "Public Profile"}
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                  {lang === "bn" ? "পূর্ণ নাম" : "Full Name"}
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                    style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
                  {lang === "bn" ? "পেশাগত শিরোনাম" : "Professional Title"}
                  <input
                    value={draft.title || ""}
                    onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                    placeholder={lang === "bn" ? "যেমন: Data Analyst" : "e.g., Data Analyst"}
                    style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}
                  />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1, marginTop: 12 }}>
                {lang === "bn" ? "অবস্থান" : "Location"}
                <input
                  value={draft.location || ""}
                  onChange={(e) => setDraft((p) => ({ ...p, location: e.target.value }))}
                  placeholder={lang === "bn" ? "যেমন: ঢাকা, বাংলাদেশ" : "e.g., Dhaka, Bangladesh"}
                  style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1, marginTop: 12 }}>
                {lang === "bn" ? "সংক্ষিপ্ত বায়ো" : "Short Bio"}
                <textarea
                  value={draft.bio || ""}
                  onChange={(e) => setDraft((p) => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  placeholder={lang === "bn" ? "আপনার দক্ষতা ও লক্ষ্য সম্পর্কে লিখুন" : "Write a short intro about your goals and skills"}
                  style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "10px 12px", fontSize: 12, resize: "vertical" }}
                />
              </label>

              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={saveProfile}
                  style={{ background: T.accent, color: "#000", border: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 900, cursor: "pointer", fontSize: 11.5 }}
                >
                  {lang === "bn" ? "প্রোফাইল সেভ করুন" : "Save Profile"}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14, boxShadow: T.shadow }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.txt0, marginBottom: 10 }}>
                  {lang === "bn" ? "প্রোফাইল দৃশ্যমানতা" : "Profile Visibility"}
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {[
                    ["public", lang === "bn" ? "সর্বজনীন" : "Public"],
                    ["cohort", lang === "bn" ? "শুধু কোহর্ট" : "Cohort Only"],
                    ["private", lang === "bn" ? "ব্যক্তিগত" : "Private"]
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setProfileVisibility(id as "public" | "cohort" | "private")}
                      style={{
                        background: profileVisibility === id ? T.accentDim : T.bg2,
                        border: `1px solid ${profileVisibility === id ? T.accent : T.border}`,
                        borderRadius: 8,
                        color: profileVisibility === id ? T.accent : T.txt1,
                        padding: "7px 10px",
                        fontSize: 11,
                        textAlign: "left",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14, boxShadow: T.shadow }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.txt0, marginBottom: 10 }}>
                  {lang === "bn" ? "শোকেস অপশন" : "Showcase Options"}
                </div>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1, marginBottom: 8 }}>
                  <span>{lang === "bn" ? "পোর্টফোলিও দেখান" : "Show Portfolio"}</span>
                  <input type="checkbox" checked={showPortfolio} onChange={(e) => setShowPortfolio(e.target.checked)} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>{lang === "bn" ? "সার্টিফিকেট দেখান" : "Show Certificates"}</span>
                  <input type="checkbox" checked={showCertificates} onChange={(e) => setShowCertificates(e.target.checked)} />
                </label>
              </div>

              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 14, boxShadow: T.shadow }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.txt0, marginBottom: 10 }}>
                  {lang === "bn" ? "লার্নিং টার্গেট" : "Learning Target"}
                </div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>
                  {lang === "bn" ? `সাপ্তাহিক লক্ষ্য: ${weeklyGoal} ক্লাস` : `Weekly goal: ${weeklyGoal} classes`}
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 14, color: T.txt0 }}>
              {lang === "bn" ? "অ্যাকাউন্ট তথ্য" : "Account Details"}
            </h3>

            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: T.txt1 }}>
              {lang === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
              <input
                type="email"
                value={draft.email}
                onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
                style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}
              />
            </label>

            <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>{lang === "bn" ? "টু-ফ্যাক্টর অথেন্টিকেশন" : "Two-factor authentication"}</span>
                <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
              </label>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                <span>{lang === "bn" ? "ইমেইল সিকিউরিটি ডাইজেস্ট" : "Email security digest"}</span>
                <input type="checkbox" checked={emailDigest} onChange={(e) => setEmailDigest(e.target.checked)} />
              </label>
            </div>

            <div style={{ marginTop: 14, fontSize: 11, color: T.txt1 }}>
              {lang === "bn" ? "সিঙ্গেল সাইন-অন (SSO), লগইন হিস্ট্রি এবং ডিভাইস ম্যানেজমেন্ট পরবর্তী আপডেটে যোগ করা যাবে।" : "SSO, login history, and device session management can be extended here in a future iteration."}
            </div>

            <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={saveProfile}
                style={{ background: T.accent, color: "#000", border: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 900, cursor: "pointer", fontSize: 11.5 }}
              >
                {lang === "bn" ? "অ্যাকাউন্ট আপডেট" : "Update Account"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 14, color: T.txt0 }}>
              {lang === "bn" ? "অভিজ্ঞতা পছন্দসমূহ" : "Experience Preferences"}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>{lang === "bn" ? "ভাষা" : "Language"}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onSetLang("en")}
                    style={{ background: lang === "en" ? T.accent : T.bg2, color: lang === "en" ? "#000" : T.txt1, border: `1px solid ${lang === "en" ? T.accent : T.border}`, borderRadius: 8, padding: "8px 12px", fontWeight: 800, cursor: "pointer" }}
                  >
                    English
                  </button>
                  <button
                    onClick={() => onSetLang("bn")}
                    style={{ background: lang === "bn" ? T.accent : T.bg2, color: lang === "bn" ? "#000" : T.txt1, border: `1px solid ${lang === "bn" ? T.accent : T.border}`, borderRadius: 8, padding: "8px 12px", fontWeight: 800, cursor: "pointer" }}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>{lang === "bn" ? "থিম" : "Theme"}</div>
                <button
                  onClick={onToggleTheme}
                  style={{ background: T.bg2, border: `1px solid ${T.border}`, color: T.txt0, borderRadius: 8, padding: "8px 12px", fontWeight: 800, cursor: "pointer" }}
                >
                  {isDark ? (lang === "bn" ? "☀️ লাইট থিম" : "☀️ Switch to Light") : (lang === "bn" ? "🌙 ডার্ক থিম" : "🌙 Switch to Dark")}
                </button>
              </div>

              <div>
                <div style={{ fontSize: 11, color: T.txt1, marginBottom: 8 }}>{lang === "bn" ? "মেন্টর রেসপন্স স্টাইল" : "Mentor Response Style"}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["concise", lang === "bn" ? "সংক্ষিপ্ত" : "Concise"],
                    ["balanced", lang === "bn" ? "ব্যালান্সড" : "Balanced"],
                    ["deep", lang === "bn" ? "ডিপ ডাইভ" : "Deep Dive"]
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setMentorTone(id as "concise" | "balanced" | "deep")}
                      style={{
                        background: mentorTone === id ? T.accentDim : T.bg2,
                        border: `1px solid ${mentorTone === id ? T.accent : T.border}`,
                        color: mentorTone === id ? T.accent : T.txt1,
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontWeight: 800,
                        fontSize: 11,
                        cursor: "pointer"
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>{lang === "bn" ? "পুশ নোটিফিকেশন" : "Push notifications"}</span>
                  <input type="checkbox" checked={pushAlerts} onChange={(e) => setPushAlerts(e.target.checked)} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>{lang === "bn" ? "ক্যালেন্ডার সিঙ্ক" : "Calendar sync"}</span>
                  <input type="checkbox" checked={calendarSync} onChange={(e) => setCalendarSync(e.target.checked)} />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, color: T.txt1 }}>
                  <span>{lang === "bn" ? "LinkedIn অটো-শেয়ার" : "LinkedIn auto-share"}</span>
                  <input type="checkbox" checked={linkedInSync} onChange={(e) => setLinkedInSync(e.target.checked)} />
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => showToast(lang === "bn" ? "প্রেফারেন্স আপডেট হয়েছে" : "Preferences updated")}
                  style={{ background: T.accent, color: "#000", border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 900, cursor: "pointer", fontSize: 11 }}
                >
                  {lang === "bn" ? "প্রেফারেন্স সেভ" : "Save Preferences"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: T.accent,
            color: "#000",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 900,
            boxShadow: T.shadow,
            zIndex: 400
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
