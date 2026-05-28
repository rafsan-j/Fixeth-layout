import React from "react";
import { ArrowRight, Award, BarChart3, BookOpen, CheckCircle2, Clock3, Flame, Gauge, Layers3, Lightbulb, ListChecks, Sparkles, Target, TrendingUp } from "lucide-react";
import { Module, UserEvaluation } from "../types";

interface AnalyticsProps {
  T: any;
  t: any;
  lang: string;
  user?: { name: string; email: string };
  evaluation?: UserEvaluation | null;
  modules?: Module[];
  activeLessonId?: number;
  weeklyGoal?: number;
}

export default function Analytics({ T, t, lang, user, evaluation, modules = [], activeLessonId, weeklyGoal = 4 }: AnalyticsProps) {
  const totalLessons = modules.reduce((count, module) => count + module.lessons.length, 0);
  const completedLessons = modules.reduce((count, module) => count + module.lessons.filter((lesson) => lesson.done).length, 0);
  const completionPct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const remainingLessons = Math.max(0, totalLessons - completedLessons);
  const currentModule = modules.find((module) => module.lessons.some((lesson) => lesson.id === activeLessonId)) ?? modules[0];
  const currentModuleCompleted = currentModule ? currentModule.lessons.filter((lesson) => lesson.done).length : 0;
  const currentModuleTotal = currentModule?.lessons.length ?? 0;
  const currentModulePct = currentModuleTotal ? Math.round((currentModuleCompleted / currentModuleTotal) * 100) : 0;
  const nextLesson = currentModule?.lessons.find((lesson) => !lesson.done) ?? currentModule?.lessons[0];
  const scorePct = typeof evaluation?.percentage === "number"
    ? evaluation.percentage
    : typeof evaluation?.score === "number"
      ? Math.round((evaluation.score / 10) * 100)
      : undefined;
  const hasAssessment = Boolean(evaluation && !evaluation.skipped);
  const completedAt = evaluation?.completedAt ? new Date(evaluation.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : null;
  const assessmentBand = scorePct === undefined
    ? null
    : scorePct >= 80
      ? (lang === "bn" ? "অ্যাডভান্সড রেডি" : "Advanced ready")
      : scorePct >= 60
        ? (lang === "bn" ? "কনসোলিডেশন দরকার" : "Needs consolidation")
        : (lang === "bn" ? "বেসিক রিইনফোর্সমেন্ট" : "Needs reinforcement");

  const moduleRows = modules.map((module) => {
    const done = module.lessons.filter((lesson) => lesson.done).length;
    const total = module.lessons.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const firstOpen = module.lessons.find((lesson) => !lesson.done);
    return {
      id: module.id,
      title: module.title,
      done,
      total,
      pct,
      firstOpen: firstOpen?.title ?? (lang === "bn" ? "সব শেষ" : "All complete"),
      active: currentModule?.id === module.id
    };
  });

  const lessonLedger = modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      module: module.title,
      title: lesson.title,
      done: lesson.done,
      active: lesson.id === activeLessonId,
      duration: lesson.dur
    }))
  );

  const assessmentSummary = (() => {
    if (!hasAssessment) {
      return {
        title: lang === "bn" ? "ডায়াগনস্টিক বাকি" : "Diagnostic pending",
        body: lang === "bn"
          ? "মূল্যায়ন শেষ না হলে শক্তি-দুর্বলতার নির্ভুল বিশ্লেষণ করা যাবে না।"
          : "We cannot infer strengths and weaknesses reliably until the diagnostic is completed.",
        bullets: lang === "bn"
          ? ["এখন শুধু প্রগতি ও লেসনের ডেটা দেখা যাচ্ছে", "স্কোর না থাকায় কাস্টম ট্র্যাকিং সীমিত", "মূল্যায়ন শেষ করলে গভীর রিপোর্ট খুলবে"]
          : ["Only progress and lesson data are visible right now", "No score means personalized tracking is limited", "Complete the diagnostic to unlock a deeper report"]
      };
    }

    if ((scorePct ?? 0) >= 80) {
      return {
        title: lang === "bn" ? "শক্ত কোর স্কিলস" : "Strong core skills",
        body: lang === "bn"
          ? "আপনি মৌলিক ধারণা ধরে রেখেছেন এবং এখন বেশি চ্যালেঞ্জিং কাজের জন্য প্রস্তুত।"
          : "You are retaining the core ideas and are ready for more challenging work.",
        bullets: lang === "bn"
          ? ["ধারণা দ্রুত চিনতে পারছেন", "পরবর্তী ধাপের কাজ নেওয়া উচিত", "প্রকল্পভিত্তিক অনুশীলন দ্রুততর হবে"]
          : ["You identify core concepts quickly", "It is time to take on harder tasks", "Project-based practice will accelerate growth"]
      };
    }

    if ((scorePct ?? 0) >= 60) {
      return {
        title: lang === "bn" ? "মাঝারি স্থিতি" : "Mid-range stability",
        body: lang === "bn"
          ? "বেসিক বোঝা আছে, কিন্তু কিছু ধারণা আরও শক্ত করতে হবে।"
          : "You understand the basics, but a few concepts need to be hardened.",
        bullets: lang === "bn"
          ? ["দুটি দুর্বল বিষয় চিহ্নিত করুন", "রিভিউ + প্র্যাকটিস মিলিয়ে কাজ করুন", "পরবর্তী রিটেকের আগে ছোট সেশন রাখুন"]
          : ["Identify two weak topics", "Mix review with practice", "Keep sessions short before a retake"]
      };
    }

    return {
      title: lang === "bn" ? "ভিত্তি পুনর্গঠন দরকার" : "Base rebuilding needed",
      body: lang === "bn"
        ? "ফলাফল বলছে যে এখনই বেসিক লেসনে ফিরে যাওয়াই সেরা পথ।"
        : "The result suggests it is best to return to the basic lessons right now.",
      bullets: lang === "bn"
        ? ["প্রথম ২-৩ লেসন আবার করুন", "নোটবুকে নিয়ম ও উদাহরণ লিখুন", "কুইজে অল্প সময়ে পুনরায় যাচাই করুন"]
        : ["Redo the first 2-3 lessons", "Write rules and examples in the notebook", "Use short quizzes to re-check quickly"]
    };
  })();

  const learningPulse = [
    {
      label: lang === "bn" ? "সম্পন্ন লেকচার" : "Lessons completed",
      value: `${completedLessons}/${totalLessons || 0}`,
      note: lang === "bn" ? "মোট পাঠের অগ্রগতি" : "Overall syllabus progress",
      icon: BookOpen,
      color: T.accent
    },
    {
      label: lang === "bn" ? "বর্তমান মডিউল" : "Current module",
      value: currentModule ? `${currentModuleCompleted}/${currentModuleTotal}` : "0/0",
      note: currentModule?.title ?? (lang === "bn" ? "মডিউল পাওয়া যায়নি" : "No module selected"),
      icon: Target,
      color: T.blue || "#4A9EFF"
    },
    {
      label: lang === "bn" ? "সাম্প্রতিক মূল্যায়ন" : "Latest assessment",
      value: hasAssessment ? `${scorePct ?? 0}%` : (lang === "bn" ? "অপেক্ষমাণ" : "Pending"),
      note: hasAssessment
        ? (evaluation?.skipped ? (lang === "bn" ? "স্কিপ করা হয়েছে" : "Skipped") : `${completedAt ?? (lang === "bn" ? "সম্পন্ন" : "Completed")}`)
        : (lang === "bn" ? "কাস্টম সুপারিশের জন্য দরকার" : "Needed for personalized guidance"),
      icon: Award,
      color: T.amber || "#F5A623"
    },
    {
      label: lang === "bn" ? "সপ্তাহের লক্ষ্য" : "Weekly goal",
      value: `${Math.min(completedLessons, weeklyGoal)}/${weeklyGoal}`,
      note: lang === "bn" ? "এই সপ্তাহে ফোকাস করুন" : "Keep the weekly streak moving",
      icon: Flame,
      color: T.red || "#FF5B5B"
    }
  ];

  const recommendations = (() => {
    if (!hasAssessment) {
      return lang === "bn"
        ? ["ডায়াগনস্টিক অ্যাসেসমেন্ট শেষ করুন", "বর্তমান মডিউলের প্রথম অসম্পূর্ণ লেসনে যান", "নোটবুকে ১৫ মিনিটের রিভিউ লিখুন"]
        : ["Complete the diagnostic assessment", "Jump to the first unfinished lesson", "Write a 15-minute review in the notebook"];
    }

    if ((scorePct ?? 0) >= 80) {
      return lang === "bn"
        ? ["এডভান্সড প্রজেক্টে যান", "একটি কোডস্পেস ফাইল তৈরি করুন", "একটি কুইজ সেটে নিজেকে পরীক্ষা করুন"]
        : ["Move into an advanced project", "Create one Codespace artifact", "Test yourself with a quiz set"];
    }

    if ((scorePct ?? 0) >= 60) {
      return lang === "bn"
        ? ["দুর্বল অংশের ২টি লেসন পুনরায় পড়ুন", "পরবর্তী কুইজ চেষ্টা করুন", "অ্যাসাইনমেন্টে একটি ছোট অনুশীলন যোগ করুন"]
        : ["Revisit the two weakest lessons", "Try the next quiz", "Add one small practice task to submissions"];
    }

    return lang === "bn"
      ? ["বেসিক লেসন দিয়ে শুরু করুন", "নোটবুকে মূল ধারণা লিখুন", "৭ দিনের মধ্যে পুনরায় অ্যাসেসমেন্ট নিন"]
      : ["Restart from the basic lessons", "Capture the core ideas in the notebook", "Retake the assessment within 7 days"];
  })();

  const focusBand = scorePct === undefined
    ? { title: lang === "bn" ? "কাস্টমাইজেশন আনলক করুন" : "Unlock personalization", body: lang === "bn" ? "এখনো অ্যাসেসমেন্ট সম্পূর্ণ করেননি।" : "Assessment data is still missing." }
    : scorePct >= 80
      ? { title: lang === "bn" ? "আপনি এগোতে প্রস্তুত" : "Ready to advance", body: lang === "bn" ? "নতুন মডিউল ও প্রজেক্ট শুরু করুন।" : "Start higher-level work and projects." }
      : scorePct >= 60
        ? { title: lang === "bn" ? "মধ্যম গতি বজায় রাখুন" : "Keep the pace", body: lang === "bn" ? "দুটি দুর্বল এলাকায় ফোকাস করুন।" : "Focus on the two weakest areas." }
        : { title: lang === "bn" ? "ভিত্তি শক্ত করুন" : "Rebuild the base", body: lang === "bn" ? "প্রথম লেসনগুলোতে ফিরে যান।" : "Go back to the first lessons." };

  const MetricCard = ({ icon: Icon, label, value, note, color }: { icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; label: string; value: string; note: string; color: string }) => (
    <div
      style={{
        background: T.bg1,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        padding: 16,
        boxShadow: T.shadow,
        display: "flex",
        justifyContent: "space-between",
        gap: 12
      }}
    >
      <div>
        <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.txt2, fontWeight: 800 }}>{label}</div>
        <div style={{ marginTop: 6, fontSize: 24, fontWeight: 950, color: T.txt0 }}>{value}</div>
        <div style={{ marginTop: 6, fontSize: 11.5, lineHeight: 1.4, color: T.txt1 }}>{note}</div>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color} strokeWidth={2.2} />
      </div>
    </div>
  );

  const TinyStat = ({ label, value, hint }: { label: string; value: string; hint: string }) => (
    <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, color: T.txt0, fontWeight: 950 }}>{value}</div>
      <div style={{ fontSize: 11, lineHeight: 1.45, color: T.txt1, marginTop: 4 }}>{hint}</div>
    </div>
  );

  const RowCard = ({ title, left, right, active, pct }: { title: string; left: string; right: string; active?: boolean; pct: number }) => (
    <div style={{ padding: 14, borderRadius: 14, background: active ? T.accentDim : T.bg2, border: `1px solid ${active ? T.accent : T.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8, alignItems: "center" }}>
        <div style={{ fontSize: 13.5, fontWeight: 900, color: T.txt0, lineHeight: 1.4 }}>{title}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: active ? T.accent : T.txt1 }}>{pct}%</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 11.5, lineHeight: 1.45, color: T.txt1 }}>
        <span>{left}</span>
        <span style={{ textAlign: "right" }}>{right}</span>
      </div>
    </div>
  );

  const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; children: React.ReactNode }) => (
    <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 18, padding: 18, boxShadow: T.shadow }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${T.accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={T.accent} strokeWidth={2.2} />
        </div>
        <h2 style={{ fontSize: 15, fontWeight: 900, color: T.txt0, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  const ProgressBar = ({ pct, color }: { pct: number; color: string }) => (
    <div style={{ height: 10, background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${color}, ${T.accent})` }} />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: T.bg0 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 16px 40px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${T.bg1} 0%, ${T.accent}10 100%)`,
            border: `1px solid ${T.border}`,
            borderRadius: 18,
            padding: 22,
            boxShadow: T.shadow,
            marginBottom: 18
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ minWidth: 260, flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: T.accentDim, color: T.accent, fontSize: 11, fontWeight: 800, marginBottom: 12 }}>
                <BarChart3 size={14} />
                {lang === "bn" ? "শেখার ড্যাশবোর্ড" : "Learning dashboard"}
              </div>
              <h1 style={{ fontSize: 28, lineHeight: 1.05, fontWeight: 950, letterSpacing: -0.8, color: T.txt0, margin: "0 0 10px" }}>
                {lang === "bn" ? "আপনার অগ্রগতি, ফাঁক, আর পরবর্তী পদক্ষেপ" : "Your progress, gaps, and next move"}
              </h1>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: T.txt1, maxWidth: 640 }}>
                {lang === "bn"
                  ? "এই স্ক্রিনটি এখন আপনার বাস্তব পাঠ-অগ্রগতি, সাম্প্রতিক মূল্যায়ন, এবং পরবর্তী কাজ দেখায় যাতে আপনি অনুমান না করে কাজ করতে পারেন।"
                  : "This screen now reflects your real lesson progress, latest assessment state, and the next action to take so you can move with intent."}
              </p>
            </div>

            <div style={{ minWidth: 220, display: "flex", flexDirection: "column", gap: 10, alignSelf: "center" }}>
              <div style={{ padding: 14, borderRadius: 14, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 6 }}>{focusBand.title}</div>
                <div style={{ fontSize: 13, color: T.txt0, lineHeight: 1.5 }}>{focusBand.body}</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ padding: "7px 10px", borderRadius: 999, background: T.bg2, border: `1px solid ${T.border}`, fontSize: 11, color: T.txt1, fontWeight: 700 }}>
                  {lang === "bn" ? `সক্রিয়: ${user?.name ?? "Learner"}` : `Active: ${user?.name ?? "Learner"}`}
                </div>
                <div style={{ padding: "7px 10px", borderRadius: 999, background: T.bg2, border: `1px solid ${T.border}`, fontSize: 11, color: T.txt1, fontWeight: 700 }}>
                  {lang === "bn" ? `${completionPct}% পূর্ণ` : `${completionPct}% complete`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 18 }}>
          {learningPulse.map((item) => (
            <MetricCard key={item.label} icon={item.icon} label={item.label} value={item.value} note={item.note} color={item.color} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 16 }}>
          <TinyStat label={lang === "bn" ? "সম্পন্ন বনাম বাকি" : "Completed vs remaining"} value={`${completedLessons}/${remainingLessons}`} hint={lang === "bn" ? "লেসন-স্তরের অগ্রগতি" : "Lesson-level balance"} />
          <TinyStat label={lang === "bn" ? "বর্তমান ট্র্যাক" : "Current track"} value={currentModule?.title?.split(" ")[0] ?? "--"} hint={lang === "bn" ? "সক্রিয় অধ্যায়টি ট্র্যাক করুন" : "Track the active chapter"} />
          <TinyStat label={lang === "bn" ? "আসন্ন পাঠ" : "Next lesson"} value={nextLesson?.title?.slice(0, 18) ?? (lang === "bn" ? "নেই" : "None")} hint={lang === "bn" ? "এরপর কী খুলবে" : "What unlocks next"} />
          <TinyStat label={lang === "bn" ? "মূল্যায়ন স্তর" : "Assessment band"} value={assessmentBand ?? (lang === "bn" ? "অপেক্ষমাণ" : "Pending")} hint={lang === "bn" ? "স্কোর-ভিত্তিক ব্যাখ্যা" : "Score-based interpretation"} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
          <SectionCard title={lang === "bn" ? "বর্তমান অধ্যায়ের অবস্থা" : "Current chapter status"} icon={Target}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 12, color: T.txt1, fontWeight: 700, marginBottom: 4 }}>{lang === "bn" ? "চলতি মডিউল" : "Current module"}</div>
                <div style={{ fontSize: 16, color: T.txt0, fontWeight: 900 }}>{currentModule?.title ?? (lang === "bn" ? "মডিউল পাওয়া যায়নি" : "No module selected")}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: T.txt1, fontWeight: 700, marginBottom: 4 }}>{lang === "bn" ? "ক্লাস অগ্রগতি" : "Class progress"}</div>
                <div style={{ fontSize: 16, color: T.accent, fontWeight: 900 }}>{currentModulePct}%</div>
              </div>
            </div>
            <ProgressBar pct={currentModulePct} color={T.accent} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginTop: 14 }}>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800 }}>{lang === "bn" ? "সম্পন্ন" : "Done"}</div>
                <div style={{ fontSize: 20, color: T.txt0, fontWeight: 950, marginTop: 4 }}>{currentModuleCompleted}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800 }}>{lang === "bn" ? "বাকি" : "Remaining"}</div>
                <div style={{ fontSize: 20, color: T.txt0, fontWeight: 950, marginTop: 4 }}>{Math.max(0, currentModuleTotal - currentModuleCompleted)}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800 }}>{lang === "bn" ? "পরবর্তী" : "Next"}</div>
                <div style={{ fontSize: 13, color: T.txt0, fontWeight: 800, marginTop: 4, lineHeight: 1.4 }}>{nextLesson?.title ?? (lang === "bn" ? "আরেকটি পাঠ নেই" : "No remaining lesson")}</div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title={lang === "bn" ? "মূল্যায়ন বুদ্ধিমত্তা" : "Assessment intelligence"} icon={Gauge}>
            {hasAssessment ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-end", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: T.txt1, fontWeight: 700, marginBottom: 4 }}>{lang === "bn" ? "সর্বশেষ স্কোর" : "Latest score"}</div>
                    <div style={{ fontSize: 34, color: T.accent, fontWeight: 950, lineHeight: 1 }}>{scorePct ?? 0}%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "অবস্থা" : "Status"}</div>
                    <div style={{ fontSize: 13, color: T.txt0, fontWeight: 800 }}>{evaluation?.skipped ? (lang === "bn" ? "স্কিপ করা" : "Skipped") : (lang === "bn" ? "সম্পন্ন" : "Completed")}</div>
                  </div>
                </div>
                <ProgressBar pct={scorePct ?? 0} color={scorePct && scorePct >= 80 ? T.accent : scorePct && scorePct >= 60 ? (T.amber || "#F5A623") : (T.red || "#FF5B5B")} />
                <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 6 }}>{lang === "bn" ? "শেষ আপডেট" : "Last update"}</div>
                  <div style={{ fontSize: 13, color: T.txt0, lineHeight: 1.5 }}>{completedAt ?? (lang === "bn" ? "এই সেশনে আপডেট হয়েছে" : "Updated in this session")}</div>
                </div>
              </>
            ) : (
              <div style={{ padding: 14, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 14, color: T.txt0, fontWeight: 850, marginBottom: 6 }}>{lang === "bn" ? "ব্যক্তিগত সুপারিশ লক করা আছে" : "Personalized guidance is locked"}</div>
                <div style={{ fontSize: 13, color: T.txt1, lineHeight: 1.6 }}>
                  {lang === "bn"
                    ? "একবার ডায়াগনস্টিক মূল্যায়ন শেষ করলে এই স্ক্রিনে আপনার শক্তি, দুর্বলতা এবং পরবর্তী পদক্ষেপ দেখা যাবে।"
                    : "Finish the diagnostic assessment once and this screen will show your strengths, weaknesses, and the next step."}
                </div>
              </div>
            )}
          </SectionCard>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <SectionCard title={lang === "bn" ? "মডিউল রিপোর্ট" : "Module report"} icon={Layers3}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {moduleRows.map((module) => (
                <div key={module.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 900, color: T.txt0 }}>{module.title}</div>
                      <div style={{ fontSize: 11.5, color: T.txt1, marginTop: 3 }}>
                        {lang === "bn" ? `${module.done} / ${module.total} সম্পন্ন` : `${module.done} / ${module.total} done`}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: module.active ? T.accent : T.txt0 }}>{module.pct}%</div>
                      <div style={{ fontSize: 11, color: T.txt2, marginTop: 3 }}>{module.active ? (lang === "bn" ? "সক্রিয়" : "Active") : (lang === "bn" ? "নিষ্ক্রিয়" : "Inactive")}</div>
                    </div>
                  </div>
                  <ProgressBar pct={module.pct} color={module.active ? T.accent : (T.blue || "#4A9EFF")} />
                  <div style={{ marginTop: 8, fontSize: 11.5, color: T.txt1, lineHeight: 1.5 }}>
                    {lang === "bn" ? `পরবর্তী খোলা পাঠ: ${module.firstOpen}` : `Next open lesson: ${module.firstOpen}`}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={lang === "bn" ? "দক্ষতা এবং ঝুঁকি" : "Skills and risk"} icon={Lightbulb}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "শক্তিশালী দিক" : "Strength signal"}</div>
                <div style={{ fontSize: 13.5, color: T.txt0, lineHeight: 1.55, fontWeight: 700 }}>
                  {hasAssessment
                    ? (scorePct && scorePct >= 80 ? (lang === "bn" ? "আপনি ধারণা দ্রুত ধরতে পারছেন এবং উন্নত টাস্কে যেতে পারেন।" : "You are picking up concepts quickly and can move to advanced tasks.") : (lang === "bn" ? "ভিত্তি আছে, তবে আরও পুনরাবৃত্তি দরকার।" : "The foundation is there, but more repetition is needed."))
                    : (lang === "bn" ? "সম্পূর্ণ প্রগতি ডেটা না থাকায় এখন লেসন ট্র্যাকিংটাই শক্তিশালী সিগন্যাল।" : "Without assessment data, lesson tracking is the strongest signal we have.")}
                </div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "ঝুঁকি সিগন্যাল" : "Risk signal"}</div>
                <div style={{ fontSize: 13.5, color: T.txt0, lineHeight: 1.55, fontWeight: 700 }}>
                  {remainingLessons > 0
                    ? (lang === "bn" ? "অসম্পূর্ণ পাঠগুলো জমা হতে থাকলে রিভিশন উইন্ডো ছোট হবে।" : "If unfinished lessons stack up, your revision window gets smaller.")
                    : (lang === "bn" ? "সব পাঠ শেষ—এখন গভীর অনুশীলনের পালা।" : "All lessons are done, so the next step is deeper practice.")}
                </div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "ফোকাস সময়" : "Focus time"}</div>
                <div style={{ fontSize: 13.5, color: T.txt0, lineHeight: 1.55, fontWeight: 700 }}>
                  {lang === "bn"
                    ? `সপ্তাহের লক্ষ্য ${weeklyGoal} ক্লাস; অগ্রগতির রেশিও ${Math.min(completedLessons, weeklyGoal)}/${weeklyGoal}।`
                    : `Your weekly goal is ${weeklyGoal} classes; you are at ${Math.min(completedLessons, weeklyGoal)}/${weeklyGoal}.`}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title={lang === "bn" ? "লেসন লেজার" : "Lesson ledger"} icon={ListChecks}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            {lessonLedger.map((lesson, index) => (
              <div key={`${lesson.module}-${index}`} style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${lesson.active ? T.accent : T.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 900, color: T.txt0, lineHeight: 1.45 }}>{lesson.title}</div>
                  <div style={{ fontSize: 11, color: lesson.done ? T.accent : T.txt2, fontWeight: 800 }}>
                    {lesson.done ? (lang === "bn" ? "সম্পন্ন" : "Done") : (lang === "bn" ? "বাকি" : "Open")}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 11.5, color: T.txt1, lineHeight: 1.4 }}>
                  <span>{lesson.module}</span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <SectionCard title={lang === "bn" ? "আপনার জন্য ঠিক এখন কী করা উচিত" : "What to do next"} icon={Sparkles}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recommendations.map((item, index) => (
                <div key={index} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: `${T.accent}18`, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                    {index + 1}
                  </div>
                  <div style={{ fontSize: 13.5, color: T.txt0, lineHeight: 1.5, fontWeight: 700 }}>{item}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title={lang === "bn" ? "অগ্রগতি সিগন্যাল" : "Progress signals"} icon={TrendingUp}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "মোট পাঠ" : "Total lessons"}</div>
                <div style={{ fontSize: 20, color: T.txt0, fontWeight: 950 }}>{totalLessons}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "সম্পন্ন" : "Completed"}</div>
                <div style={{ fontSize: 20, color: T.txt0, fontWeight: 950 }}>{completedLessons}</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "সামগ্রিক হার" : "Overall rate"}</div>
                <div style={{ fontSize: 20, color: T.accent, fontWeight: 950 }}>{completionPct}%</div>
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: T.bg2, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 11, color: T.txt2, fontWeight: 800, marginBottom: 4 }}>{lang === "bn" ? "সাপ্তাহিক লক্ষ্য" : "Weekly goal"}</div>
                <div style={{ fontSize: 20, color: T.txt0, fontWeight: 950 }}>{weeklyGoal}</div>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title={assessmentSummary.title} icon={ArrowRight}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 13.5, color: T.txt0, lineHeight: 1.7, fontWeight: 700, marginBottom: 10 }}>{assessmentSummary.body}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {assessmentSummary.bullets.map((bullet, index) => (
                  <div key={index} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.6, color: T.txt1 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, background: `${T.accent}18`, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>
                      {index + 1}
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              <TinyStat label={lang === "bn" ? "ব্যাখ্যার ধরন" : "Interpretation"} value={assessmentBand ?? (lang === "bn" ? "অপেক্ষমাণ" : "Pending")} hint={lang === "bn" ? "স্কোর থেকে অর্থ বের করে" : "What the score means"} />
              <TinyStat label={lang === "bn" ? "শেষ অ্যাসেসমেন্ট" : "Last assessment"} value={completedAt ?? (lang === "bn" ? "নেই" : "None")} hint={lang === "bn" ? "সর্বশেষ আপডেটের তারিখ" : "Latest update date"} />
            </div>
          </div>
        </SectionCard>

        <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 18, padding: 18, boxShadow: T.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <CheckCircle2 size={18} color={T.accent} />
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: T.txt0 }}>{lang === "bn" ? "সংক্ষিপ্ত সারাংশ" : "Summary"}</h2>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: T.txt1 }}>
            {lang === "bn"
              ? `আপনি ${completedLessons}টি লেসন শেষ করেছেন, ${completionPct}% কারিকুলাম অগ্রগতি আছে, এবং ${hasAssessment ? "সাম্প্রতিক মূল্যায়ন অনুযায়ী পরবর্তী পদক্ষেপ নির্ধারণ করা হয়েছে" : "এখনও ডায়াগনস্টিক শেষ করেননি"}।`
              : `You have completed ${completedLessons} lessons, reached ${completionPct}% curriculum progress, and ${hasAssessment ? "have a personalized next-step path from your latest assessment" : "still need to finish the diagnostic to unlock personalized guidance"}.`}
          </div>
        </div>
      </div>
    </div>
  );
}
