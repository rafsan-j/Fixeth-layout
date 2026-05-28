import React from 'react';
import { TrendingUp, Award, Clock, Zap, BarChart3, BookOpen } from 'lucide-react';

interface AnalyticsProps {
  T: any;
  t: any;
  lang: string;
  user?: { name: string; email: string };
}

export default function Analytics({ T, t, lang, user }: AnalyticsProps) {
  // Mock analytics data
  const analytics = {
    lessonsCompleted: 24,
    totalTime: 156, // minutes
    averageScore: 78,
    xpEarned: 1240,
    streakDays: 12,
    weeklyActivity: [2, 3, 1, 4, 5, 2, 3], // submissions per day
    trackProgress: [
      { id: 'ds', name: 'Data Science', completed: 8, total: 12, percentage: 67 },
      { id: 'fe', name: 'Frontend Web Dev', completed: 6, total: 10, percentage: 60 },
      { id: 'be', name: 'Backend Systems', completed: 5, total: 10, percentage: 50 },
      { id: 'dl', name: 'Digital Literacy', completed: 5, total: 8, percentage: 62 }
    ]
  };

  const weekDays = lang === 'bn' ? ['সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি', 'রবি'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div
      className="min-h-screen flex flex-col overflow-auto"
      style={{ backgroundColor: T.bg0 }}
    >
      {/* Header */}
      <div
        className="px-6 py-8 border-b"
        style={{ borderColor: T.border, backgroundColor: T.bg1 }}
      >
        <h1 className="text-3xl font-900" style={{ color: T.txt0 }}>
          {lang === 'bn' ? 'আপনার অগ্রগতি' : 'Your Analytics'}
        </h1>
        <p style={{ color: T.txt1 }} className="text-sm mt-1">
          {lang === 'bn' ? 'শিক্ষার যাত্রার পরিসংখ্যান' : 'Track your learning journey'}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Lessons Completed */}
          <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: T.bg2, borderColor: T.border }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ color: T.txt0 }} className="font-bold text-sm">
                {lang === 'bn' ? 'সম্পন্ন পাঠ' : 'Lessons Completed'}
              </h3>
              <BookOpen size={20} style={{ color: T.accent }} />
            </div>
            <div className="text-3xl font-900" style={{ color: T.accent }}>
              {analytics.lessonsCompleted}
            </div>
            <p style={{ color: T.txt2 }} className="text-xs mt-1">
              {lang === 'bn' ? 'এই মাসে' : 'This month'}
            </p>
          </div>

          {/* Average Score */}
          <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: T.bg2, borderColor: T.border }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ color: T.txt0 }} className="font-bold text-sm">
                {lang === 'bn' ? 'গড় স্কোর' : 'Average Score'}
              </h3>
              <Award size={20} style={{ color: '#FF8A3D' }} />
            </div>
            <div className="text-3xl font-900" style={{ color: '#FF8A3D' }}>
              {analytics.averageScore}%
            </div>
            <p style={{ color: T.txt2 }} className="text-xs mt-1">
              {analytics.averageScore >= 80 ? (lang === 'bn' ? 'চমৎকার!' : 'Excellent!') : lang === 'bn' ? 'ভালো' : 'Good'}
            </p>
          </div>

          {/* Total Time */}
          <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: T.bg2, borderColor: T.border }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ color: T.txt0 }} className="font-bold text-sm">
                {lang === 'bn' ? 'সময় ব্যয়' : 'Time Spent'}
              </h3>
              <Clock size={20} style={{ color: '#3AA0FF' }} />
            </div>
            <div className="text-3xl font-900" style={{ color: '#3AA0FF' }}>
              {Math.round(analytics.totalTime / 60)}h {analytics.totalTime % 60}m
            </div>
            <p style={{ color: T.txt2 }} className="text-xs mt-1">
              {lang === 'bn' ? 'মোট' : 'Total'}
            </p>
          </div>

          {/* Streak */}
          <div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: T.bg2, borderColor: T.border }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 style={{ color: T.txt0 }} className="font-bold text-sm">
                {lang === 'bn' ? 'স্ট্রিক' : 'Streak'}
              </h3>
              <Zap size={20} style={{ color: '#FF5B8A' }} />
            </div>
            <div className="text-3xl font-900" style={{ color: '#FF5B8A' }}>
              {analytics.streakDays}
            </div>
            <p style={{ color: T.txt2 }} className="text-xs mt-1">
              {lang === 'bn' ? 'দিনের পর দিন' : 'days running'}
            </p>
          </div>
        </div>

        {/* Weekly Activity */}
        <div
          className="p-6 rounded-xl border mb-8"
          style={{ backgroundColor: T.bg2, borderColor: T.border }}
        >
          <h3 className="font-bold mb-4" style={{ color: T.txt0 }}>
            {lang === 'bn' ? 'সাপ্তাহিক কার্যকলাপ' : 'Weekly Activity'}
          </h3>
          <div className="flex items-end gap-2 h-32">
            {analytics.weeklyActivity.map((count, idx) => {
              const maxHeight = 120;
              const height = (count / Math.max(...analytics.weeklyActivity)) * maxHeight;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${height}px`,
                      backgroundColor: T.accent,
                      opacity: count > 0 ? 1 : 0.3,
                      transition: 'all 0.3s'
                    }}
                  />
                  <span style={{ color: T.txt2 }} className="text-xs font-bold">
                    {weekDays[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track Progress */}
        <div
          className="p-6 rounded-xl border"
          style={{ backgroundColor: T.bg2, borderColor: T.border }}
        >
          <h3 className="font-bold mb-6" style={{ color: T.txt0 }}>
            {lang === 'bn' ? 'ট্র্যাক অগ্রগতি' : 'Track Progress'}
          </h3>
          <div className="space-y-6">
            {analytics.trackProgress.map((track) => (
              <div key={track.id}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ color: T.txt0 }} className="text-sm font-bold">
                    {track.name}
                  </p>
                  <span style={{ color: T.accent }} className="text-sm font-bold">
                    {track.completed}/{track.total}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: T.bg4 }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${track.percentage}%`,
                      backgroundColor: track.percentage >= 70 ? T.accent : track.percentage >= 50 ? '#3AA0FF' : '#FF8A3D'
                    }}
                  />
                </div>
                <p style={{ color: T.txt2 }} className="text-xs mt-1">
                  {track.percentage}% {lang === 'bn' ? 'সম্পন্ন' : 'complete'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* XP Summary */}
        <div
          className="mt-8 p-6 rounded-xl border"
          style={{
            backgroundColor: 'rgba(0, 200, 150, 0.1)',
            borderColor: T.accent,
            borderWidth: 2
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: T.txt1 }} className="text-sm">
                {lang === 'bn' ? 'মোট অভিজ্ঞতা অর্জন' : 'Total XP Earned'}
              </p>
              <p className="text-3xl font-900 mt-1" style={{ color: T.accent }}>
                {analytics.xpEarned} XP
              </p>
            </div>
            <TrendingUp size={48} style={{ color: T.accent, opacity: 0.2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
