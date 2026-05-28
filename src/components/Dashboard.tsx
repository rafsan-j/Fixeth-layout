import React from "react";
import { themes } from "../data";
import { AlertCircle, CheckCircle2, ArrowRight, BookOpen, Star, Bot, Award, Trophy, Flame } from "lucide-react";
import ContentTemplates from "./ContentTemplates";

export default function DashboardScreen({ T, t, lang, onContinue, user, evaluation, onStartAssessment }: { T: any; t: any; lang: string; onContinue: () => void; user?: { name: string }; evaluation?: any; onStartAssessment?: () => void }) {
  const skills = [
    ["Python & Numpy", "+47%"],
    ["Pandas ETL", "+32%"],
    ["Apache Airflow", "+28%"],
    ["SQL Databases", "+25%"],
    ["React Framework", "+22%"],
    ["Git Versioning", "+18%"]
  ];

  const histories = [
    { icon: BookOpen, textEn: "Completed Class: Scoping & Variables", textBn: "লেকচার সম্পন্ন: স্কোপ ও ভ্যারিয়েবল", timeEn: "2 hours ago", timeBn: "২ ঘণ্টা আগে", color: T.accent },
    { icon: Star, textEn: "Assessment Passed: Digital Literacy (90%)", textBn: "কুইজ পাস: ডিজিটাল লিটারেসি (৯০%)", timeEn: "Yesterday", timeBn: "অনুমোদিত গতকাল", color: T.amber },
    { icon: Bot, textEn: "AI Mentor consultation on scope limits", textBn: "এআই মেন্টর সেশন — ৩টি প্রশ্ন সমাধান", timeEn: "3 days ago", timeBn: "৩ দিন আগে", color: T.blue },
    { icon: Award, textEn: "Enrolled in Data Science Syllabus", textBn: "ডেটা সায়েন্স কারিকুলামে অংশগ্রহণ সম্পন্ন", timeEn: "2 weeks ago", timeBn: "২ সপ্তাহ আগে", color: T.purple }
  ];

  const weekArr = ["M", "T", "W", "T", "F", "S", "S"];
  const weekActivity = [1, 1, 1, 0, 1, 1, 0];

  return (
    <div style={{ flex: 1, overflowY: "auto", background: T.bg0 }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "20px 16px 40px" }}>
        
        {/* Personalized Welcome Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${T.bg2} 0%, ${T.accent}0d 100%)`,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: "24px",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            boxShadow: T.shadow
          }}
        >
          <div>
            <h2 style={{ fontSize: 21, fontWeight: 900, color: T.txt0, margin: "0 0 6px" }}>
              {t.greeting}, {user?.name ?? (lang === "bn" ? "বন্ধু" : "Learner")} 👋
            </h2>
            <p style={{ color: T.txt1, fontSize: 13, margin: "0 0 14px", lineHeight: 1.4 }}>
              {lang === "bn"
                ? "আপনি টানা ১২ দিন ধরে পড়াশোনা সচল রেখেছেন! মডিউল ১ সম্পন্ন করতে আর ৩টি লেকচার বাকি।"
                : "Continuous activity maintained for 12 days! Complete 3 classes to lock-in Module 1 certification."}
            </p>
            {/* Week tracker balls */}
            <div style={{ display: "flex", gap: 6 }}>
              {weekArr.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: weekActivity[idx] ? T.accent : T.bg4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: weekActivity[idx] ? "#000" : T.txt2
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <button
              onClick={onContinue}
              style={{
                background: T.accent,
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                fontWeight: 800,
                fontSize: 12.5,
                color: "#000",
                cursor: "pointer",
                boxShadow: `0 4px 14px ${T.accent}2d`
              }}
            >
              {t.continueBtn}
            </button>
            <span style={{ fontSize: 10, color: T.txt1 }}>
              Syllabus Progress · <strong style={{ color: T.accent }}>32%</strong>
            </span>
          </div>
        </div>

        {/* Skipped Evaluation Banner */}
        {evaluation?.skipped && (
          <div
            style={{
              background: `linear-gradient(135deg, #FF8A3D0d 0%, #FF8A3D1a 100%)`,
              border: `2px solid #FF8A3D`,
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              boxShadow: `0 4px 14px #FF8A3D15`,
              animation: "slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <AlertCircle size={24} color="#FF8A3D" />
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: T.txt0, margin: "0 0 4px" }}>
                  {lang === "bn" ? "আপনার মূল্যায়ন এখনো বাকি" : "Assessment Pending"}
                </h3>
                <p style={{ color: T.txt1, fontSize: 13, margin: 0, lineHeight: 1.3 }}>
                  {lang === "bn"
                    ? "আপনার দক্ষতা পরিমাপ করুন এবং ব্যক্তিগতকৃত শিক্ষা পথ পান।"
                    : "Complete your assessment to unlock personalized learning recommendations."}
                </p>
              </div>
            </div>

            <button
              onClick={onStartAssessment}
              style={{
                background: "#FF8A3D",
                border: "none",
                borderRadius: 8,
                padding: "10px 16px",
                fontWeight: 800,
                fontSize: 13,
                color: "#fff",
                cursor: "pointer",
                boxShadow: `0 4px 12px #FF8A3D3d`,
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 6px 16px #FF8A3D4d`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px #FF8A3D3d`;
              }}
            >
              {lang === "bn" ? "এখনই মূল্যায়ন করুন" : "Take Assessment"}
              <ArrowRight size={16} />
            </button>
          </div>
        )}


        {/* Dynamic Metric Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { icon: BookOpen, label: t.lessonsCompleted, value: "3", color: T.accent },
            { icon: Star, label: t.quizAvg, value: "88%", color: T.amber },
            { icon: Flame, label: t.streak, value: "12 days", color: "#FF5B8A" },
            { icon: Trophy, label: t.certificates, value: "3", color: T.blue }
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                background: T.bg1,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: T.shadow
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: T.txt1, fontWeight: 700, textTransform: "uppercase" }}>{card.label}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: T.txt0, marginTop: 4 }}>{card.value}</div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: `${card.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <card.icon size={18} color={card.color} strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress & Target Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 20 }}>
          
          {/* My tracks progress */}
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 800, color: T.txt0, margin: "0 0 14px" }}>
              {t.activeTrack}
            </h3>
            {[
              { name: lang === "bn" ? "ডেটা সায়েন্স ট্র্যাকিং" : "Data Science & AI", pct: 32, label: "Module 1 of 12" },
              { name: lang === "bn" ? "ডিজিটাল লিটারেসি বেসিক্স" : "Digital Literacy Fundamentals", pct: 100, label: "Module 6 of 6 Completed" }
            ].map((track, i) => (
              <div key={i} style={{ borderBottom: i < 1 ? `1px solid ${T.border}` : "none", paddingBottom: i < 1 ? 14 : 0, paddingTop: i > 0 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.txt0, marginBottom: 4, fontWeight: 700 }}>
                  <span>{track.name}</span>
                  <span style={{ color: T.accent }}>{track.pct}%</span>
                </div>
                {/* Progress bar line */}
                <div style={{ height: 4, background: T.bg4, borderRadius: 2, marginBottom: 4 }}>
                  <div style={{ width: `${track.pct}%`, height: "100%", background: T.accent, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 10, color: T.txt1 }}>{track.label}</span>
              </div>
            ))}
          </div>

          {/* Weekly progress targets ring */}
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 800, color: T.txt0, alignSelf: "flex-start", margin: "0 0 12px" }}>
              {t.weeklyGoal}
            </h3>
            
            <div style={{ position: "relative", width: 80, height: 80, marginBottom: 10 }}>
              <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="40" cy="40" r="34" fill="none" stroke={T.bg4} strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={T.accent}
                  strokeWidth="6"
                  strokeDasharray={213}
                  strokeDashoffset={213 * (1 - 0.75)}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: T.txt0 }}>3 / 4</span>
                <span style={{ fontSize: 8, color: T.txt1 }}>Classes Done</span>
              </div>
            </div>
            <span style={{ fontSize: 11, color: T.txt1 }}>One more lecture completes this weekly cluster!</span>
          </div>
        </div>

        {/* National demand indexes + Activity trace */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
          
          {/* Local vacancy demand trends index */}
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 13.5, fontWeight: 800, color: T.txt0, margin: 0 }}>
                {t.jobMarket}
              </h3>
              <span style={{ background: T.amberDim, color: T.amber, border: `1px solid ${T.amber}33`, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700 }}>
                {t.liveVia}
              </span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {skills.map(([name, plus]) => (
                <div
                  key={name}
                  style={{
                    background: T.bg2,
                    border: `1px solid ${T.border}`,
                    borderRadius: 6,
                    padding: "6px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.txt0 }}>{name}</span>
                  <span style={{ fontSize: 10, color: T.accent, fontWeight: 850 }}>{plus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity trace log */}
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, boxShadow: T.shadow }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 800, color: T.txt0, margin: "0 0 14px" }}>
              {t.recentActivity}
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {histories.map((hist, idx) => {
                const Icon = hist.icon;
                return (
                  <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: hist.color + "18",
                        color: hist.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Icon size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, color: T.txt0, fontWeight: 600 }}>
                        {lang === "bn" ? hist.textBn : hist.textEn}
                      </div>
                      <div style={{ fontSize: 9.5, color: T.txt2, marginTop: 1 }}>
                        {lang === "bn" ? hist.timeBn : hist.timeEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Templates for evaluation-based learning paths */}
          {evaluation && !evaluation.skipped && evaluation.percentage !== undefined && (
            <ContentTemplates
              T={T}
              t={t}
              lang={lang}
              evaluationPercentage={evaluation.percentage}
            />
          )}

        </div>

      </div>
    </div>
  );
}
