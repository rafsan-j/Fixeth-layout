import { Track, AssessmentQuestion } from "./types";

// ═══════════════════════════════════════════════════════════════════
// UI DESIGN THEMES
// ═══════════════════════════════════════════════════════════════════
export const themes = {
  dark: {
    bg0: "#0B0B0F",
    bg1: "#13131A",
    bg2: "#1A1A24",
    bg3: "#22222E",
    bg4: "#2C2C3A",
    border: "#2E2E3E",
    borderHi: "#44445A",
    txt0: "#EEEEF8",
    txt1: "#8888A8",
    txt2: "#4A4A62",
    accent: "#00C896",
    accentDim: "#00C89618",
    accentHi: "#33D9A8",
    amber: "#F5A623",
    amberDim: "#F5A62318",
    blue: "#4A9EFF",
    blueDim: "#4A9EFF18",
    red: "#FF5B5B",
    redDim: "#FF5B5B18",
    purple: "#A78BFA",
    purpleDim: "#A78BFA18",
    cardBg: "#16161F",
    shadow: "0 4px 20px #00000050",
    navBg: "#0F0F16"
  },
  light: {
    bg0: "#F4F4F8",
    bg1: "#FFFFFF",
    bg2: "#F0F0F6",
    bg3: "#E8E8F2",
    bg4: "#DCDCE8",
    border: "#DCDCE8",
    borderHi: "#C0C0D0",
    txt0: "#18182A",
    txt1: "#5A5A78",
    txt2: "#9898B0",
    accent: "#008A68",
    accentDim: "#008A6812",
    accentHi: "#00A87E",
    amber: "#C07000",
    amberDim: "#C0700012",
    blue: "#2060CC",
    blueDim: "#2060CC12",
    red: "#CC2222",
    redDim: "#CC222212",
    purple: "#6644CC",
    purpleDim: "#6644CC12",
    cardBg: "#FFFFFF",
    shadow: "0 4px 20px #0000000D",
    navBg: "#FFFFFF"
  }
};

// ═══════════════════════════════════════════════════════════════════
// LOCALIZATION (ENGLISH & BENGALI)
// ═══════════════════════════════════════════════════════════════════
export const i18n: { [key: string]: any } = {
  en: {
    brand: "Fixeth",
    tagline: "Learn. Prove. Build.",
    dashboard: "Dashboard",
    guidedVideo: "Guided Video",
    notebook: "Notebook",
    quizAssign: "Quiz & Homework",
    submissions: "Submissions Hub",
    codeSpace: "IDE Codespace",
    tools: "Developer Tools",
    aiMentor: "AI Mentor",
    greeting: "Welcome back",
    continueBtn: "Continue Learning →",
    activeTrack: "Active Tracks",
    weeklyGoal: "Weekly Target",
    streak: "Activity Days",
    certificates: "Credentials",
    quizAvg: "Quiz Standing",
    lessonsCompleted: "Lessons Complete",
    jobMarket: "📈 National Developer Demand",
    liveVia: "Live analytics",
    trending: "Trending Frameworks",
    myTracks: "My Learning Progress",
    recentActivity: "Recent History",
    nextUp: "Coming up next",
    careerIntel: "Bangladesh Skill Index",
    submitWork: "Upload Assignment Content",
    uploadFiles: "Add Workspace Files",
    dragDrop: "Drag files here, or click to browse",
    submissionHistory: "Uploaded files archive",
    rubric: "Academic Rubric",
    aiFeedback: "AI Code Analysis",
    peerReview: "Peer Consensus",
    aiMentorTitle: "AI Studio Mentor",
    askAnything: "Send a message to your mentor...",
    generateQuiz: "Compile interactive practice questions",
    explainConcept: "Deconstruct technical terms",
    multilevel: "Cognitive Levels",
    connectGitHub: "Synchronize remote workspace",
    indeedConnect: "Activate Job Trends",
    cloudConnect: "Configure Self-Hosted Cluster",
    ollamaSetup: "Sync local Ollama client",
    byoaKey: "Bring-Your-Own-Access Keys",
    language: "Current Language",
    darkMode: "Interface Theme",
    onboarding1: "What is your primary technical objective?",
    onboarding2: "What is your starting engineering level?",
    onboarding3: "Choose your professional learning track",
    onboarding4: "Take Baseline Diagnostic Placement Assessment",
    skipAssessment: "Skip Assessment — Load Baseline Curriculum",
    startAssessment: "Run Diagnostic Appraisal (Recommended)",
    completedBadge: "Completed",
    notYetCompletedBadge: "Available",
    gitConnected: "Synced with GitHub",
    fetchLocal: "Drag & Drop or Open Files Local",
    terminalLabel: "Bash Command Interactive Terminal Console",
    community: "Community AI",
    certs: "Certificates"
    ,
    profileView: "View Profile",
    profileSettings: "Account Settings",
    profilePreferences: "Preferences",
    profileSignOut: "Sign out"
  },
  bn: {
    brand: "ফিক্সেথ",
    tagline: "শিখুন। প্রমাণ করুন। গড়ুন।",
    dashboard: "ড্যাশবোর্ড",
    community: "কমিউনিটি এআই",
    certs: "সার্টিফিকেট",
    guidedVideo: "গাইডেড ভিডিও ক্লাস",
    notebook: "নোটবুক ল্যাব",
    quizAssign: "কুইজ ও বাড়ির কাজ",
    submissions: "জমাকৃত কাজসমূহ",
    codeSpace: "আইডিই কোডস্পেস",
    tools: "ডেভেলপার টুলস",
    aiMentor: "এআই মেন্টর",
    greeting: "স্বাগতম",
    continueBtn: "পড়াশোনা চালিয়ে যান ➜",
    activeTrack: "সক্রিয় ট্র্যাকসমূহ",
    weeklyGoal: "সাপ্তাহিক টার্গেট",
    streak: "সক্রিয়তার দিন",
    certificates: "অর্জনসমূহ",
    quizAvg: "পরীক্ষার গড় নম্বর",
    lessonsCompleted: "সম্পন্ন লেকচার",
    jobMarket: "📈 জাতীয় ডেভেলপার নিয়োগ সূচক",
    liveVia: "লাইভ ডাটা বিশ্লেষণ",
    trending: "চাহিদাপূর্ণ টেকনোলজি",
    myTracks: "আমার প্রগতি",
    recentActivity: "সাম্প্রতিক ইতিহাস",
    nextUp: "পরবর্তী পাঠ",
    careerIntel: "বাংলাদেশ স্কিল ইনডেক্স",
    submitWork: "অ্যাসাইনমেন্ট জমা দিন",
    uploadFiles: "ফাইল যুক্ত করুন",
    dragDrop: "এখানে ফাইল টেনে আনুন অথবা ক্লিক করে খুঁজুন",
    submissionHistory: "জমাকৃত ফাইল আর্কাইভ",
    rubric: "মূল্যায়ন রুব্রিক",
    aiFeedback: "এআই কোড বিশ্লেষণ",
    peerReview: "সহপাঠী ফিডব্যাক",
    aiMentorTitle: "এআই স্টুডিও মেন্টর",
    askAnything: "আপনার মেন্টরকে যেকোনো প্রশ্ন করুন...",
    generateQuiz: "অনুশীলনী কুইজ তৈরি করুন",
    explainConcept: "প্রযুক্তিগত পরিভাষা বিশ্লেষণ",
    multilevel: "জ্ঞানীয় স্তরসমূহ",
    connectGitHub: "রিমোট ওয়ার্কস্পেস সিঙ্ক করুন",
    indeedConnect: "চাকরির বাজার মনিটর অন করুন",
    cloudConnect: "সেলফ-হোস্টেড ক্লাস্টার কনফিগার করুন",
    ollamaSetup: "লোকাল ওলামা সিঙ্ক করুন",
    byoaKey: "ইউজার এপিআই কী ব্যবহার করুন (BYOA)",
    language: "চলতি ভাষা",
    darkMode: "থিম পরিবর্তন",
    onboarding1: "আপনার প্রধান কারিগরি বা পেশাদার লক্ষ্য কী?",
    onboarding2: "আপনার বর্তমান কোডিং অভিজ্ঞতা কেমন?",
    onboarding3: "আপনার ক্যারিয়ার লার্নিং ট্র্যাক বেছে নিন",
    onboarding4: "ব্যক্তিগত বেসলাইন ডায়াগনস্টিক প্লেসমেন্ট মূল্যায়ন",
    skipAssessment: "মূল্যায়ন বাদ দিন — বেসিক কোর্স লোড করুন",
    startAssessment: "ডায়াগনস্টিক মূল্যায়ন শুরু করুন (প্রস্তাবিত)",
    completedBadge: "সম্পন্ন",
    notYetCompletedBadge: "অংশগ্রহণযোগ্য",
    gitConnected: "গিটহাব সংযুক্ত আছে",
    fetchLocal: "লোকাল ফাইল টেনে আনুন / ওপেন করুন",
    terminalLabel: "ব্যাশ কমান্ড ইন্টারঅ্যাক্টিভ টার্মিনাল কনসোল"
    ,
    profileView: "প্রোফাইল দেখুন",
    profileSettings: "অ্যাকাউন্ট সেটিংস",
    profilePreferences: "পছন্দসমূহ",
    profileSignOut: "সাইন আউট"
  }
};

// ═══════════════════════════════════════════════════════════════════
// THE 10 COHORT LEARNING TRACKS (NO COST, LOCALIZED COMPLETED HIGHLIGHTS)
// ═══════════════════════════════════════════════════════════════════
export const tracks: Track[] = [
  {
    id: "ds",
    icon: "📊",
    titleEn: "Data Science & AI Engineering",
    titleBn: "ডেটা সায়েন্স ও এআই ইঞ্জিনিয়ারিং",
    completed: false
  },
  {
    id: "fe",
    icon: "🎨",
    titleEn: "Frontend Web Development (React & TS)",
    titleBn: "ফ্রন্টএন্ড ওয়েব ডেভেলপমেন্ট (React & TS)",
    completed: true
  },
  {
    id: "be",
    icon: "⚙️",
    titleEn: "Backend Systems & Database Design",
    titleBn: "ব্যাকএন্ড সিস্টেম ও ডাটাবেজ ডিজাইন",
    completed: false
  },
  {
    id: "dl",
    icon: "💻",
    titleEn: "Digital Literacy & Professional Office Tools",
    titleBn: "ডিজিটাল লিটারেসি ও অফিস টুলস",
    completed: true
  },
  {
    id: "uiux",
    icon: "✨",
    titleEn: "UI/UX Product Design & Wireframing",
    titleBn: "ইউআই/ইউএক্স প্রোডাক্ট ডিজাইন ও ওয়্যারফ্রেমিং",
    completed: true
  },
  {
    id: "mobile",
    icon: "📱",
    titleEn: "Cross-Platform Mobile Apps (Flutter & Dart)",
    titleBn: "মোবাইল অ্যাপস ডেভেলপমেন্ট (Flutter)",
    completed: false
  },
  {
    id: "cyber",
    icon: "🛡️",
    titleEn: "Cyber Security & Defensive Networks",
    titleBn: "সাইবার সিকিউরিটি ও ডিফেন্সিভ নেটওয়ার্কিং",
    completed: false
  },
  {
    id: "devops",
    icon: "☁️",
    titleEn: "DevOps Engineering & Cloud Computing",
    titleBn: "ডেভঅপ্স ইঞ্জিনিয়ারিং ও ক্লাউড কম্পিউটিং",
    completed: false
  },
  {
    id: "marketing",
    icon: "📈",
    titleEn: "Technical SEO & Data-Driven Marketing",
    titleBn: "টেকনিক্যাল এসইও ও ডাটা-ড্রিভেন মার্কেটিং",
    completed: false
  },
  {
    id: "fullstack",
    icon: "🚀",
    titleEn: "Full Stack Web Software Engineering",
    titleBn: "ফুল স্ট্যাক ওয়েব সফটওয়্যার ইঞ্জিনিয়ারিং",
    completed: false
  }
];

// ═══════════════════════════════════════════════════════════════════
// MULTILINGUAL TRACK DIAGNOSTIC TESTS (4 TYPE ASSESSMENTS)
// ═══════════════════════════════════════════════════════════════════
export const assessments: { [trackId: string]: AssessmentQuestion[] } = {
  ds: [
    {
      qEn: "Which Python package provides highly optimized multi-dimensional vector array object interfaces?",
      qBn: "পাইথনে মাল্টি-ডাইমেনশনাল ভেক্টর অ্যারে অবজেক্ট অপারেশনের জন্য মূলত কোন লাইব্রেরি ব্যবহার করা হয়?",
      optsEn: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
      optsBn: ["প্যান্ডাস (Pandas)", "নামপাই (NumPy)", "সাইকিট-লার্ন (Scikit-Learn)", "ম্যাটপ্লটলিব"],
      ans: 1
    },
    {
      qEn: "In Machine Learning, how is 'supervised learning' defined?",
      qBn: "মেশিন লার্নিং-এর ক্ষেত্রে 'সুপারভাইজড লার্নিং' (Supervised Learning) বলতে কী বোঝায়?",
      optsEn: [
        "Analyzing systems with unlabeled input parameters",
        "Training prediction models on labeled supervisor data patterns",
        "Evolving game characters using continuous randomized score increments",
        "Initiating training code completely void of initial source data arrays"
      ],
      optsBn: [
        "যেকোনো লেবেলবিহীন ইনপুট প্যারামিটার নিয়ে কাজ করা",
        "লেবেলযুক্ত চিহ্নিত ডাটা ব্যবহার করে প্রেডিকশন মডেল ট্রেইন করা",
        "ক্রমাগত র‍্যান্ডম স্কোর বৃদ্ধির মাধ্যমে গেম ক্যারেক্টার ইভলভ করা",
        "কোনো রকম ইনপুট ডাটা অ্যারে ছাড়াই প্রোগ্রাম চালানো"
      ],
      ans: 1
    }
  ],
  fe: [
    {
      qEn: "Which CSS layout model allows flexible arrangement of items in rows or columns?",
      qBn: "কোন CSS লেআউট মডেল আইটেমগুলোকে সারি বা কলামে নমনীয় ব্যবস্থা করার সুবিধা দেয়?",
      optsEn: ["Grid", "Flexbox", "Float", "Absolute positioning"],
      optsBn: ["গ্রিড (Grid)", "ফ্লেক্সবক্স (Flexbox)", "ফ্লোট (Float)", "অ্যাবসলিউট পজিশনিং"],
      ans: 1
    },
    {
      qEn: "What is the purpose of the 'key' prop in React list rendering?",
      qBn: "React তালিকা রেন্ডারিংয়ে 'key' প্রপের উদ্দেশ্য কী?",
      optsEn: ["To store encrypted data in the DOM", "To help React identify which items have changed, been added, or been removed", "To specify keyboard shortcuts for accessibility", "To define CSS animation keyframes"],
      optsBn: ["DOM-এ এনক্রিপ্টেড ডাটা সংরক্ষণ করা", "React কে চিহ্নিত করতে সাহায্য করা কোন আইটেম পরিবর্তন হয়েছে বা যোগ/অপসারণ হয়েছে", "অ্যাক্সেসিবিলিটির জন্য কীবোর্ড শর্টকাট নির্ধারণ করা", "CSS অ্যানিমেশন কীফ্রেম সংজ্ঞায়িত করা"],
      ans: 1
    },
    {
      qEn: "Which technique is used to optimize web page load time?",
      qBn: "ওয়েব পেজ লোড সময় অপ্টিমাইজ করার জন্য কোন কৌশল ব্যবহার করা হয়?",
      optsEn: ["Adding more images and videos", "Code splitting, lazy loading, and minification", "Increasing server bandwidth", "Using more JavaScript frameworks"],
      optsBn: ["আরও বেশি ছবি এবং ভিডিও যোগ করা", "কোড স্প্লিটিং, লেজি লোডিং এবং মিনিফিকেশন", "সার্ভার ব্যান্ডউইথ বৃদ্ধি করা", "আরও বেশি জাভাস্ক্রিপ্ট ফ্রেমওয়ার্ক ব্যবহার করা"],
      ans: 1
    },
    {
      qEn: "What is 'prop drilling' in React?",
      qBn: "React-এ 'prop drilling' কী?",
      optsEn: ["Passing props through multiple levels of nested components", "Drilling holes into the hardware to install servers", "A method of styling components with CSS", "A technique for database optimization"],
      optsBn: ["একাধিক স্তরের নেস্টেড কম্পোনেন্টের মাধ্যমে প্রপ পাস করা", "সার্ভার ইনস্টলের জন্য হার্ডওয়্যারে গর্ত ড্রিল করা", "কম্পোনেন্ট স্টাইলিংয়ের একটি পদ্ধতি", "ডাটাবেস অপ্টিমাইজেশনের একটি কৌশল"],
      ans: 0
    },
    {
      qEn: "Which testing library is commonly used for React component unit testing?",
      qBn: "React কম্পোনেন্ট ইউনিট টেস্টিংয়ের জন্য সাধারণত কোন টেস্টিং লাইব্রেরি ব্যবহার করা হয়?",
      optsEn: ["Selenium", "React Testing Library", "Postman", "LoadRunner"],
      optsBn: ["সেলেনিয়াম", "React Testing Library", "পোস্টম্যান", "লোডরানার"],
      ans: 1
    },
    {
      qEn: "What does event delegation mean in JavaScript?",
      qBn: "জাভাস্ক্রিপ্টে ইভেন্ট ডেলিগেশন মানে কী?",
      optsEn: ["Delegating all events to the browser", "Assigning tasks to different team members", "Using parent element event handlers to manage events from child elements", "Creating separate events for each element"],
      optsBn: ["সমস্ত ইভেন্ট ব্রাউজারে প্রেরণ করা", "বিভিন্ন টিম সদস্যের কাছে কাজ বরাদ্দ করা", "পিতা উপাদানের ইভেন্ট হ্যান্ডলার ব্যবহার করে শিশু উপাদানের ইভেন্ট পরিচালনা করা", "প্রতিটি উপাদানের জন্য আলাদা ইভেন্ট তৈরি করা"],
      ans: 2
    },
    {
      qEn: "What is the difference between state and props in React?",
      qBn: "React-এ state এবং props এর মধ্যে পার্থক্য কী?",
      optsEn: ["State is external data; props are internal data", "Props are passed from parent to child; state is managed within a component", "They are exactly the same thing with different names", "State can only be used in class components"],
      optsBn: ["State বাহ্যিক ডাটা; props অভ্যন্তরীণ ডাটা", "Props পিতা থেকে শিশুতে পাস করা হয়; state একটি কম্পোনেন্টের মধ্যে পরিচালিত হয়", "তারা একই জিনিস শুধু বিভিন্ন নামে", "State শুধুমাত্র ক্লাস কম্পোনেন্টে ব্যবহার করা যায়"],
      ans: 1
    },
    {
      qEn: "What does the 'map' function do when used with array rendering in React?",
      qBn: "React-এ অ্যারে রেন্ডারিংয়ের সাথে 'map' ফাংশন কী করে?",
      optsEn: ["It creates a geographical map of the website", "It transforms each array element into a JSX element for rendering", "It sorts the array in descending order", "It removes duplicate elements from the array"],
      optsBn: ["এটি ওয়েবসাইটের একটি ভৌগোলিক মানচিত্র তৈরি করে", "এটি প্রতিটি অ্যারে এলিমেন্টকে JSX এলিমেন্টে রূপান্তরিত করে রেন্ডারিংয়ের জন্য", "এটি অ্যারেকে অবরোহী ক্রমে বাছাই করে", "এটি অ্যারে থেকে ডুপ্লিকেট এলিমেন্ট অপসারণ করে"],
      ans: 1
    }
  ],
  be: [
    {
      qEn: "How does 'load balancing' work in distributed server architectures?",
      qBn: "বিতরণকৃত সার্ভার আর্কিটেকচারে লোড ব্যালান্সিং কীভাবে কাজ করে?",
      optsEn: ["Directing network traffic evenly across multiple servers to prevent overload", "Storing all data on a single server for simplicity", "Removing servers from the network when they get busy", "Using only one server to handle all requests"],
      optsBn: ["নেটওয়ার্ক ট্রাফিক একাধিক সার্ভারে সমানভাবে বিতরণ করা", "সরলতার জন্য সব ডাটা একটি সার্ভারে সংরক্ষণ করা", "সার্ভার ব্যস্ত হলে নেটওয়ার্ক থেকে সরিয়ে দেওয়া", "সব রিকোয়েস্ট হ্যান্ডেল করার জন্য শুধু একটি সার্ভার ব্যবহার করা"],
      ans: 0
    },
    {
      qEn: "What is 'middleware' in web application development?",
      qBn: "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টে 'middleware' কী?",
      optsEn: ["Software between the user interface and database", "A physical cable connecting servers", "A programming language", "A type of database"],
      optsBn: ["ব্যবহারকারী ইন্টারফেস এবং ডাটাবেসের মধ্যে সফটওয়্যার", "সার্ভারগুলিকে সংযুক্ত করার একটি ফিজিক্যাল ক্যাবল", "একটি প্রোগ্রামিং ভাষা", "একটি ডাটাবেসের ধরন"],
      ans: 0
    },
    {
      qEn: "What is 'horizontal scaling' vs 'vertical scaling' in backend systems?",
      qBn: "ব্যাকএন্ড সিস্টেমে 'horizontal scaling' এবং 'vertical scaling' কী?",
      optsEn: ["Horizontal: adding more servers; Vertical: increasing server resources", "Horizontal: decreasing servers; Vertical: increasing servers", "Horizontal: for databases only; Vertical: for applications only", "They are the same thing with different names"],
      optsBn: ["হরাইজন্টাল: আরও সার্ভার যোগ করা; ভার্টিকাল: সার্ভারের রিসোর্স বৃদ্ধি করা", "হরাইজন্টাল: সার্ভার হ্রাস; ভার্টিকাল: সার্ভার বৃদ্ধি", "হরাইজন্টাল: শুধু ডাটাবেজের জন্য; ভার্টিকাল: শুধু অ্যাপ্লিকেশনের জন্য", "তারা একই জিনিস বিভিন্ন নামে"],
      ans: 0
    },
    {
      qEn: "What does idempotency mean in API design?",
      qBn: "API ডিজাইনে idempotency মানে কী?",
      optsEn: ["Ability to perform an operation multiple times with the same result", "Making the API faster", "Encrypting all API calls", "Reducing database size"],
      optsBn: ["একাধিকবার একটি অপারেশন একই ফলাফলের সাথে সম্পাদন করার ক্ষমতা", "API কে দ্রুততর করা", "সব API কল এনক্রিপ্ট করা", "ডাটাবেসের আকার হ্রাস করা"],
      ans: 0
    },
    {
      qEn: "What is 'rate limiting' used for in backend services?",
      qBn: "ব্যাকএন্ড সেবায় 'rate limiting' কীসের জন্য ব্যবহার করা হয়?",
      optsEn: ["Controlling the number of requests a client can make in a given time", "Limiting the physical rate of server operation", "Reducing the cost of cloud services", "Improving database performance"],
      optsBn: ["একটি নির্দিষ্ট সময়ে ক্লায়েন্ট করতে পারে এমন রিকোয়েস্টের সংখ্যা নিয়ন্ত্রণ করা", "সার্ভার অপারেশনের ফিজিক্যাল রেট সীমাবদ্ধ করা", "ক্লাউড সেবার খরচ হ্রাস করা", "ডাটাবেস পারফরম্যান্স উন্নত করা"],
      ans: 0
    },
    {
      qEn: "What is the 'OAuth 2.0' protocol used for?",
      qBn: "'OAuth 2.0' প্রোটোকল কীসের জন্য ব্যবহার করা হয়?",
      optsEn: ["Direct password sharing between applications", "Secure authorization and delegation without sharing passwords", "Encrypting email communications", "Creating secure WiFi networks"],
      optsBn: ["অ্যাপ্লিকেশনগুলির মধ্যে সরাসরি পাসওয়ার্ড শেয়ার করা", "পাসওয়ার্ড শেয়ার না করে নিরাপদ অনুমোদন এবং ক্ষমতা অর্পণ", "ইমেল যোগাযোগ এনক্রিপ্ট করা", "নিরাপদ WiFi নেটওয়ার্ক তৈরি করা"],
      ans: 1
    },
    {
      qEn: "How does connection pooling improve database performance?",
      qBn: "কানেকশন পুলিং ডাটাবেস পারফরম্যান্স কীভাবে উন্নত করে?",
      optsEn: ["It stores data in memory instead of disk", "It reuses existing database connections instead of creating new ones", "It deletes unused data from the database", "It prevents users from accessing the database"],
      optsBn: ["এটি ডিস্কের পরিবর্তে মেমোরিতে ডাটা সংরক্ষণ করে", "এটি নতুন কানেকশন তৈরি করার পরিবর্তে বিদ্যমান ডাটাবেস কানেকশন পুনর্ব্যবহার করে", "এটি ডাটাবেস থেকে অব্যবহৃত ডাটা মুছে দেয়", "এটি ব্যবহারকারীদের ডাটাবেসে অ্যাক্সেস করতে বাধা দেয়"],
      ans: 1
    },
    {
      qEn: "What is 'stateless' design in backend architecture?",
      qBn: "ব্যাকএন্ড আর্কিটেকচারে 'stateless' ডিজাইন কী?",
      optsEn: ["Servers maintain permanent user session data", "Each request contains all information needed without relying on server memory", "Applications cannot store any information", "Users cannot maintain login sessions"],
      optsBn: ["সার্ভার স্থায়ী ব্যবহারকারীর সেশন ডাটা বজায় রাখে", "প্রতিটি রিকোয়েস্ট সার্ভার মেমোরির উপর নির্ভর না করে প্রয়োজনীয় সব তথ্য ধারণ করে", "অ্যাপ্লিকেশন কোনো তথ্য সংরক্ষণ করতে পারে না", "ব্যবহারকারীরা লগইন সেশন বজায় রাখতে পারে না"],
      ans: 1
    }
  ],
  dl: [
    {
      qEn: "What is a 'phishing' attack?",
      qBn: "'phishing' অ্যাটাক কী?",
      optsEn: ["A method of catching fish", "Fraudulent attempt to obtain sensitive information by disguising as trustworthy entity", "A type of computer virus", "A database query technique"],
      optsBn: ["মাছ ধরার একটি পদ্ধতি", "বিশ্বাসযোগ্য সত্তার ছদ্মবেশে সংবেদনশীল তথ্য প্রাপ্তির জালিয়াতিপূর্ণ প্রচেষ্টা", "এক ধরনের কম্পিউটার ভাইরাস", "একটি ডাটাবেস কোয়েরি কৌশল"],
      ans: 1
    },
    {
      qEn: "How should sensitive files like passwords be protected?",
      qBn: "পাসওয়ার্ডের মতো সংবেদনশীল ফাইলগুলি কীভাবে রক্ষা করা উচিত?",
      optsEn: ["Store them in plain text files", "Use encryption, secure storage, and access controls", "Share them with IT staff regularly", "Write them on sticky notes"],
      optsBn: ["সেগুলি প্লেইন টেক্সট ফাইলে সংরক্ষণ করা", "এনক্রিপশন, নিরাপদ সংরক্ষণ এবং অ্যাক্সেস নিয়ন্ত্রণ ব্যবহার করা", "নিয়মিতভাবে সেগুলি IT কর্মীদের সাথে শেয়ার করা", "আঠালো নোটে সেগুলি লেখা"],
      ans: 1
    },
    {
      qEn: "What is 'cloud computing'?",
      qBn: "'cloud computing' কী?",
      optsEn: ["Computing done only on computers in the sky", "On-demand access to computing resources (storage, processing) over the internet", "A type of weather forecasting", "Storage of data only on local devices"],
      optsBn: ["শুধুমাত্র আকাশে কম্পিউটারে করা কম্পিউটিং", "ইন্টারনেটের মাধ্যমে কম্পিউটিং রিসোর্স (স্টোরেজ, প্রসেসিং) অন-ডিমান্ড অ্যাক্সেস", "আবহাওয়া পূর্বাভাসের একটি ধরন", "শুধুমাত্র স্থানীয় ডিভাইসে ডাটা সংরক্ষণ"],
      ans: 1
    },
    {
      qEn: "What is 'two-factor authentication' (2FA)?",
      qBn: "'two-factor authentication' (2FA) কী?",
      optsEn: ["Using two different passwords", "Combining two verification methods (e.g., password + phone verification)", "Using two devices to access one account", "Logging in twice a day"],
      optsBn: ["দুটি ভিন্ন পাসওয়ার্ড ব্যবহার করা", "দুটি যাচাইকরণ পদ্ধতি একত্রিত করা (যেমন পাসওয়ার্ড + ফোন যাচাইকরণ)", "একটি অ্যাকাউন্ট অ্যাক্সেস করতে দুটি ডিভাইস ব্যবহার করা", "দিনে দুইবার লগইন করা"],
      ans: 1
    },
    {
      qEn: "What is 'version control' (Git) used for?",
      qBn: "'version control' (Git) কীসের জন্য ব্যবহার করা হয়?",
      optsEn: ["Controlling the version numbers of software releases", "Tracking changes to code, enabling collaboration and history management", "Managing file sizes", "Automating software testing"],
      optsBn: ["সফটওয়্যার রিলিজের সংস্করণ সংখ্যা নিয়ন্ত্রণ করা", "কোড পরিবর্তন ট্র্যাক করা, সহযোগিতা এবং ইতিহাস পরিচালনা সক্ষম করা", "ফাইল সাইজ পরিচালনা করা", "সফটওয়্যার টেস্টিং স্বয়ংক্রিয় করা"],
      ans: 1
    },
    {
      qEn: "What is 'data backup' and why is it important?",
      qBn: "'data backup' কী এবং কেন এটি গুরুত্বপূর্ণ?",
      optsEn: ["Creating copies of data to prevent loss in case of failure or disaster", "Deleting old files to save space", "Compressing files to reduce size", "Sharing data with other users"],
      optsBn: ["ব্যর্থতা বা দুর্যোগের ক্ষেত্রে ডাটা হারানো প্রতিরোধ করতে ডাটা অনুলিপি তৈরি করা", "স্থান সাশ্রয় করতে পুরানো ফাইল মুছে দেওয়া", "সাইজ হ্রাস করতে ফাইল কম্প্রেস করা", "অন্যান্য ব্যবহারকারীদের সাথে ডাটা শেয়ার করা"],
      ans: 0
    },
    {
      qEn: "What makes a strong password?",
      qBn: "একটি শক্তিশালী পাসওয়ার্ড কী বৈশিষ্ট্যযুক্ত?",
      optsEn: ["Short and easy to remember", "Combination of uppercase, lowercase, numbers, and special characters, minimum 12 characters", "Your birth date or name", "Same password for all accounts"],
      optsBn: ["ছোট এবং মনে রাখা সহজ", "বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ অক্ষরের সমন্বয়, ন্যূনতম ১২ অক্ষর", "আপনার জন্মতারিখ বা নাম", "সব অ্যাকাউন্টের জন্য একই পাসওয়ার্ড"],
      ans: 1
    },
    {
      qEn: "What is 'ransomware'?",
      qBn: "'ransomware' কী?",
      optsEn: ["Software that helps organize files", "Malicious software that encrypts data and demands payment for decryption", "A type of backup software", "A cloud storage service"],
      optsBn: ["ফাইল সংগঠিত করতে সাহায্য করার সফটওয়্যার", "ডাটা এনক্রিপ্ট করে এবং ডিক্রিপশনের জন্য অর্থ দাবি করে এমন ক্ষতিকর সফটওয়্যার", "ব্যাকআপ সফটওয়্যারের একটি ধরন", "একটি ক্লাউড স্টোরেজ সেবা"],
      ans: 1
    }
  ]
};

// If other tracks are picked, we present a standardized general programming test.
export const fallbackAssessment: AssessmentQuestion[] = [
  {
    qEn: "What is a variable in programming syntax?",
    qBn: "প্রোগ্রামিংয়ের পরিভাষায় ভ্যারিয়েবল (Variable) বলতে নিচের কোনটি বোঝায়?",
    optsEn: [
      "A completely hard-sealed unalterable logic parameter",
      "A designated name allocated as a container in system ram holding reference data values",
      "A continuously looping syntax module",
      "A script running outside the program process"
    ],
    optsBn: [
      "সম্পূর্ণ পরিবর্তনহীন ও লক করা একটি লজিক প্যারামিটার",
      "কম্পিউটার মেমোরিতে ডাটা মান সাময়িকভাবে ধরে রাখার নামযুক্ত স্থান",
      "একটি অবিরাম চলমান লুপের অংশ",
      "অ্যাপ্লিকেশন প্রসেসের বাইরে চলমান এক্সটারনাল স্ক্রিপ্ট"
    ],
    ans: 1
  },
  {
    qEn: "Which coding construct allows repetitive command iterations until target checks resolve?",
    qBn: "নির্দিষ্ট শর্ত পূরণ না হওয়া পর্যন্ত বারবার একই কোডের অংশ চালানোর জন্য কোনটি ব্যবহার করা হয়?",
    optsEn: ["Conditional If-Else route", "Constant declaration assignment", "Looping structures (For/While)", "Global function pointers"],
    optsBn: ["কন্ডিশনাল ইফ-এলস (If-Else) রুট", "কনস্ট্যান্ট ডিক্লারেশন অ্যাসাইনমেন্ট", "লুপিং মেকানিজম (যেমন For/While লুপ)", "গ্লোবাল ফাংশন পয়েন্টার"],
    ans: 2
  }
];
