import React from 'react';
import { TrendingUp, Award, Clock, Zap, BarChart3, BookOpen, Target, Flame, Brain, Lightbulb } from 'lucide-react';

interface AnalyticsProps {
  T: any;
  t: any;
  lang: string;
  user?: { name: string; email: string };
}

export default function Analytics({ T, t, lang, user }: AnalyticsProps) {
  const analytics = {
    lessonsCompleted: 24,
    totalTime: 156,
    averageScore: 78,
    xpEarned: 1240,
    streakDays: 12,
    weeklyActivity: [2, 3, 1, 4, 5, 2, 3],
    trackProgress: [
      { id: 'ds', name: 'Data Science', completed: 8, total: 12, percentage: 67, icon: Brain },
      { id: 'fe', name: 'Frontend Web Dev', completed: 6, total: 10, percentage: 60, icon: Lightbulb },
      { id: 'be', name: 'Backend Systems', completed: 5, total: 10, percentage: 50, icon: Zap },
      { id: 'dl', name: 'Digital Literacy', completed: 5, total: 8, percentage: 62, icon: BookOpen }
    ],
    performanceBySkill: [
      { skill: 'Problem Solving', score: 85, improvement: '+12%' },
      { skill: 'Code Quality', score: 72, improvement: '+5%' },
      { skill: 'Performance Optimization', score: 68, improvement: '+8%' },
      { skill: 'Debugging', score: 78, improvement: '+15%' }
    ],
    assessmentInsights: {
      totalAttempts: 12,
      avgFirstAttemptScore: 65,
      improvementRate: 18,
      masteredTopics: ['React Hooks', 'REST APIs', 'SQL Basics']
    }
  };

  const weekDays = lang === 'bn' ? ['সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি', 'রবি'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return lang === 'bn' ? 'দুর্দান্ত' : 'Excellent';
    if (score >= 70) return lang === 'bn' ? 'ভালো' : 'Good';
    if (score >= 60) return lang === 'bn' ? 'মধ্যম' : 'Average';
    return lang === 'bn' ? 'উন্নতির প্রয়োজন' : 'Needs Work';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return T.accent;
    if (score >= 70) return T.blue || '#3AA0FF';
    if (score >= 60) return T.amber || '#FF8A3D';
    return T.red || '#FF5B8A';
  };

  const MetricCard = ({ icon: Icon, value, label, subtext, gradient }: any) => (
    <div
      className="p-6 rounded-xl border flex flex-col gap-3 hover:shadow-lg transition-all"
      style={{
        backgroundColor: T.bg2,
        borderColor: `${gradient}33`,
        borderWidth: '2px',
        boxShadow: `inset 0 0 20px ${gradient}08`
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-900" style={{ color: T.txt0 }}>
            {value}
          </div>
          <div className="text-xs mt-1" style={{ color: T.txt2 }}>
            {label}
          </div>
          {subtext && (
            <div className="text-xs mt-2 font-600" style={{ color: gradient }}>
              {subtext}
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${gradient}15` }}
        >
          <Icon size={20} color={gradient} />
        </div>
      </div>
    </div>
  );

  const SkillBar = ({ skill, score, improvement }: any) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-700" style={{ color: T.txt0 }}>
          {skill}
        </span>
        <span className="text-xs font-600" style={{ color: getPerformanceColor(score) }}>
          {score}% {improvement}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: T.bg3, border: `1px solid ${T.border}` }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${getPerformanceColor(score)}, ${T.accent})`
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col overflow-auto"
      style={{ backgroundColor: T.bg0 }}
    >
      <div
        className="px-6 py-8 border-b"
        style={{
          borderColor: T.border,
          background: `linear-gradient(135deg, ${T.bg1}, ${T.bg2})`
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${T.accent}20` }}
          >
            <BarChart3 size={24} color={T.accent} />
          </div>
          <div>
            <h1 className="text-3xl font-900" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'আপনার বিশ্লেষণ' : 'Your Analytics'}
            </h1>
            <p style={{ color: T.txt2 }} className="text-xs mt-0.5">
              {lang === 'bn' ? 'শেখার যাত্রার বিস্তারিত অন্তর্দৃষ্টি' : 'Detailed insights into your learning'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={Award}
            value={analytics.averageScore}
            label={lang === 'bn' ? 'গড় স্কোর' : 'Average Score'}
            subtext={getPerformanceLevel(analytics.averageScore)}
            gradient={T.accent}
          />
          <MetricCard
            icon={Flame}
            value={analytics.streakDays}
            label={lang === 'bn' ? 'দিনের ধারা' : 'Day Streak'}
            subtext={lang === 'bn' ? 'চলমান' : 'Active'}
            gradient={T.amber || '#FF8A3D'}
          />
          <MetricCard
            icon={Clock}
            value={`${Math.round(analytics.totalTime / 60)}h`}
            label={lang === 'bn' ? 'মোট সময়' : 'Total Time'}
            subtext={`${analytics.totalTime} min`}
            gradient={T.blue || '#3AA0FF'}
          />
          <MetricCard
            icon={Zap}
            value={analytics.xpEarned}
            label={lang === 'bn' ? 'পয়েন্ট অর্জিত' : 'XP Earned'}
            subtext="+240 this week"
            gradient={T.purple || '#A855F7'}
          />
        </div>

        <div
          className="p-6 rounded-2xl border"
          style={{ borderColor: T.border, backgroundColor: T.bg2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} color={T.txt0} />
            <h2 className="text-lg font-900" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'সাপ্তাহিক কার্যকলাপ' : 'Weekly Activity'}
            </h2>
          </div>
          <div className="flex items-end justify-around h-32 gap-1">
            {analytics.weeklyActivity.map((count: number, i: number) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-md transition-all hover:scale-105"
                  style={{
                    height: `${(count / Math.max(...analytics.weeklyActivity)) * 100}%`,
                    background: `linear-gradient(180deg, ${T.accent}, ${T.accentDim})`
                  }}
                />
                <span className="text-xs" style={{ color: T.txt2 }}>
                  {weekDays[i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs" style={{ color: T.txt2 }}>
            {lang === 'bn' ? 'সর্বোচ্চ কার্যকলাপ: শুক্রবার (৫টি জমা)' : 'Peak activity: Friday (5 submissions)'}
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border"
          style={{ borderColor: T.border, backgroundColor: T.bg2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target size={18} color={T.txt0} />
            <h2 className="text-lg font-900" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'ট্র্যাক অগ্রগতি' : 'Track Progress'}
            </h2>
          </div>
          <div className="space-y-5">
            {analytics.trackProgress.map((track: any) => {
              const Icon = track.icon;
              return (
                <div key={track.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${getPerformanceColor(track.percentage)}20` }}
                      >
                        <Icon size={14} color={getPerformanceColor(track.percentage)} />
                      </div>
                      <div>
                        <div className="text-sm font-700" style={{ color: T.txt0 }}>
                          {track.name}
                        </div>
                        <div className="text-xs" style={{ color: T.txt2 }}>
                          {track.completed} of {track.total} {lang === 'bn' ? 'সম্পূর্ণ' : 'completed'}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-900" style={{ color: getPerformanceColor(track.percentage) }}>
                      {track.percentage}%
                    </div>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden border"
                    style={{ backgroundColor: T.bg3, borderColor: T.border }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${track.percentage}%`,
                        background: `linear-gradient(90deg, ${getPerformanceColor(track.percentage)}, ${T.accent})`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border"
          style={{ borderColor: T.border, backgroundColor: T.bg2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Brain size={18} color={T.txt0} />
            <h2 className="text-lg font-900" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'দক্ষতা কর্মক্ষমতা' : 'Skill Performance'}
            </h2>
          </div>
          <div className="space-y-1">
            {analytics.performanceBySkill.map((item: any, i: number) => (
              <SkillBar key={i} skill={item.skill} score={item.score} improvement={item.improvement} />
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg border-l-4" style={{
            backgroundColor: `${T.accent}10`,
            borderColor: T.accent
          }}>
            <div className="text-xs font-700 mb-2" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'অন্তর্দৃষ্টি' : 'Insight'}
            </div>
            <div className="text-xs" style={{ color: T.txt2 }}>
              {lang === 'bn' 
                ? 'আপনার ডিবাগিং দক্ষতা সবচেয়ে দ্রুত উন্নতি করছে। এই গতিশীলতা বজায় রাখুন!'
                : 'Your debugging skills are improving fastest. Keep this momentum!'}
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border"
          style={{ borderColor: T.border, backgroundColor: T.bg2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb size={18} color={T.txt0} />
            <h2 className="text-lg font-900" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'মূল্যায়ন অন্তর্দৃষ্টি' : 'Assessment Insights'}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div
              className="p-4 rounded-lg border"
              style={{ borderColor: T.border, backgroundColor: T.bg3 }}
            >
              <div className="text-2xl font-900" style={{ color: T.accent }}>
                {analytics.assessmentInsights.totalAttempts}
              </div>
              <div className="text-xs mt-1" style={{ color: T.txt2 }}>
                {lang === 'bn' ? 'মোট প্রচেষ্টা' : 'Total Attempts'}
              </div>
            </div>
            <div
              className="p-4 rounded-lg border"
              style={{ borderColor: T.border, backgroundColor: T.bg3 }}
            >
              <div className="text-2xl font-900" style={{ color: T.amber || '#FF8A3D' }}>
                +{analytics.assessmentInsights.improvementRate}%
              </div>
              <div className="text-xs mt-1" style={{ color: T.txt2 }}>
                {lang === 'bn' ? 'উন্নতির হার' : 'Improvement Rate'}
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg border" style={{ borderColor: T.border, backgroundColor: T.bg3 }}>
            <div className="text-xs font-700 mb-2" style={{ color: T.txt0 }}>
              {lang === 'bn' ? 'আয়ত্ত করা বিষয়' : 'Mastered Topics'}
            </div>
            <div className="flex flex-wrap gap-2">
              {analytics.assessmentInsights.masteredTopics.map((topic: string, i: number) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full font-600 border"
                  style={{
                    backgroundColor: `${T.accent}20`,
                    borderColor: T.accent,
                    color: T.accent
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
