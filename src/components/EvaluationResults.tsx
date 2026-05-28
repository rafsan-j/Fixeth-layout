import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface EvaluationResultsProps {
  T: any;
  t: any;
  score: number;
  totalQuestions: number;
  trackName: string;
  onContinue: () => void;
}

export default function EvaluationResults({
  T,
  t,
  score,
  totalQuestions,
  trackName,
  onContinue
}: EvaluationResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine performance level
  const getPerformanceLevel = (percent: number) => {
    if (percent >= 80) return { label: 'Excellent', color: T.accent || '#00C896', icon: '🎯' };
    if (percent >= 60) return { label: 'Good', color: '#3AA0FF', icon: '✨' };
    if (percent >= 40) return { label: 'Fair', color: '#FF8A3D', icon: '📈' };
    return { label: 'Needs Improvement', color: '#FF5B8A', icon: '🚀' };
  };

  const performance = getPerformanceLevel(percentage);

  // Mock strength/weakness breakdown (based on score)
  const getInsights = () => {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (percentage >= 70) {
      strengths.push('Strong fundamental understanding');
      strengths.push('Solid conceptual grasp');
    } else {
      weaknesses.push('Core concepts need reinforcement');
    }

    if (percentage >= 60) {
      strengths.push('Good practical knowledge');
    } else {
      weaknesses.push('Practical application needs work');
    }

    if (percentage < 50) {
      weaknesses.push('Comprehensive review recommended');
    } else {
      strengths.push('Ready for intermediate content');
    }

    return { strengths, weaknesses };
  };

  const insights = getInsights();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
      style={{ backgroundColor: T.bg0 }}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: T.accent }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: performance.color }}
      />

      {/* Main content */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{performance.icon}</div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: T.txt0 }}
          >
            Assessment Complete
          </h1>
          <p
            className="text-lg"
            style={{ color: T.txt1 }}
          >
            Here's how you performed
          </p>
        </div>

        {/* Score display card */}
        <div
          className="rounded-3xl p-8 mb-8 border transition-all duration-300 shadow-xl"
          style={{
            backgroundColor: T.bg1,
            borderColor: performance.color,
          }}
        >
          {/* Score circle and percentage */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                {/* Circular progress */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke={T.border}
                      strokeWidth="8"
                      fill="none"
                      opacity="0.2"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke={performance.color}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(percentage / 100) * 339.3} 339.3`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  {/* Center percentage */}
                  <div className="absolute text-center">
                    <div
                      className="text-5xl font-bold"
                      style={{ color: performance.color }}
                    >
                      {percentage}%
                    </div>
                    <div
                      className="text-xs font-medium mt-1"
                      style={{ color: T.txt1 }}
                    >
                      {score}/{totalQuestions}
                    </div>
                  </div>
                </div>

                {/* Performance details */}
                <div className="flex-1">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ color: T.txt0 }}
                  >
                    {performance.label}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: T.txt1 }}
                  >
                    {percentage >= 80
                      ? 'Outstanding performance! You\'ve demonstrated strong mastery of the core concepts.'
                      : percentage >= 60
                        ? 'Solid understanding. You\'re ready to move forward with some areas for refinement.'
                        : percentage >= 40
                          ? 'You have a foundation to build on. Focus on the highlighted areas.'
                          : 'Start with fundamentals. We\'ve tailored content to match your level.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Track info */}
          <div
            className="px-4 py-3 rounded-lg mb-8 border"
            style={{
              backgroundColor: T.accentDim || 'rgba(0, 200, 150, 0.1)',
              borderColor: T.accent,
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: T.txt0 }}
            >
              {trackName} Diagnostic Assessment
            </p>
          </div>

          {/* Strengths and weaknesses grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} style={{ color: T.accent }} />
                <h3
                  className="font-bold"
                  style={{ color: T.txt0 }}
                >
                  Strengths
                </h3>
              </div>
              <ul className="space-y-2">
                {insights.strengths.map((strength, idx) => (
                  <li
                    key={idx}
                    className="text-sm p-3 rounded-lg"
                    style={{
                      backgroundColor: T.accentDim || 'rgba(0, 200, 150, 0.1)',
                      color: T.txt0,
                    }}
                  >
                    ✓ {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} style={{ color: '#FF8A3D' }} />
                <h3
                  className="font-bold"
                  style={{ color: T.txt0 }}
                >
                  Areas to Focus
                </h3>
              </div>
              <ul className="space-y-2">
                {insights.weaknesses.map((weakness, idx) => (
                  <li
                    key={idx}
                    className="text-sm p-3 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(255, 138, 61, 0.1)',
                      color: T.txt0,
                    }}
                  >
                    → {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div
          className="rounded-2xl p-6 mb-8 border"
          style={{
            backgroundColor: T.bg2,
            borderColor: T.border,
          }}
        >
          <h3
            className="font-bold mb-3"
            style={{ color: T.txt0 }}
          >
            What's Next
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: T.txt1 }}
          >
            We've personalized your learning path based on your performance. Your dashboard will show:
          </p>
          <ul
            className="space-y-2 text-sm"
            style={{ color: T.txt1 }}
          >
            <li>✓ Recommended lessons matched to your level</li>
            <li>✓ Focused practice on areas that need work</li>
            <li>✓ Progressive difficulty as you improve</li>
          </ul>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
          style={{
            backgroundColor: T.accent,
            color: T.accentTxt || '#fff',
          }}
        >
          Continue to Dashboard
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
