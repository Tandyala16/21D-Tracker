export const LOGICAL_REASONING = [
  { id: "lr1", topic: "Coding-Decoding", sub: "Alphabet coding, letter shifts, symbol codes" },
  { id: "lr2", topic: "Chinese / Number Coding", sub: "Number substitution patterns, mixed codes" },
  { id: "lr3", topic: "Distance & Direction", sub: "Cardinal directions, net displacement" },
  { id: "lr4", topic: "Blood Relations", sub: "Family tree problems, generation mapping" },
  { id: "lr5", topic: "Seating Arrangements", sub: "Linear, circular, row-based arrangements" },
  { id: "lr6", topic: "Critical Reasoning", sub: "Assumptions, conclusions, strengthening arguments" },
  { id: "lr7", topic: "Syllogism", sub: "Venn diagram method, all/some/no statements" },
  { id: "lr8", topic: "Number Series", sub: "Arithmetic, geometric, mixed difference series" },
  { id: "lr9", topic: "Puzzles", sub: "Floor, box, scheduling, assignment puzzles" },
  { id: "lr10", topic: "Data Sufficiency", sub: "Two-statement problems, is data enough?" },
  { id: "lr11", topic: "Non-Verbal: Water & Mirror", sub: "Water images, mirror reflections of figures" },
  { id: "lr12", topic: "Non-Verbal: Paper Folding", sub: "Cut-fold patterns, punched hole positions" },
  { id: "lr13", topic: "Clocks & Calendars", sub: "Angle between hands, day of the week formulas" },
  { id: "lr14", topic: "Ranking & Ordering", sub: "Position-based, height/weight ranking problems" },
];

export const QUANTITATIVE_APTITUDE = [
  { id: "qa1", topic: "Simplification", sub: "BODMAS, surds, approximations" },
  { id: "qa2", topic: "Percentages", sub: "% change, reverse %, percentage points" },
  { id: "qa3", topic: "Simple & Compound Interest + Instalments", sub: "SI/CI formulas, EMI, balloon payments" },
  { id: "qa4", topic: "Profit, Loss & Discount", sub: "CP/SP/MP, successive discounts, false weights" },
  { id: "qa5", topic: "Time & Work + Pipes & Cisterns", sub: "Work efficiency, fill/drain problems" },
  { id: "qa6", topic: "Ratios, Proportions & Ages + Partnership", sub: "Age equations, partner profit split" },
  { id: "qa7", topic: "Mixtures & Alligations", sub: "Mean price, replacement, milk-water problems" },
  { id: "qa8", topic: "Average", sub: "Weighted average, age/score average tricks" },
  { id: "qa9", topic: "Data Interpretation & Set Theory", sub: "Tables, bar/pie charts, Venn sets" },
  { id: "qa10", topic: "Permutation, Combination & Probability (Advanced)", sub: "nPr, nCr, conditional probability" },
  { id: "qa11", topic: "TSD + Boats & Streams", sub: "Relative speed, upstream/downstream formulas" },
  { id: "qa12", topic: "Mensuration", sub: "2D & 3D shapes, area/volume/surface area" },
  { id: "qa13", topic: "Statistics", sub: "Mean, median, mode, variance, standard deviation" },
  { id: "qa14", topic: "Quadratic Equations", sub: "Discriminant, roots, relationship between roots" },
];

export const DSA_TOPICS = [
  { id: "dsa1", topic: "Arrays", sub: "Traversal, two-pointer, sliding window, prefix sum", diff: "Easy", lc: "Two Sum, Best Time Buy/Sell, Contains Duplicate" },
  { id: "dsa2", topic: "Strings", sub: "Reversal, palindrome, anagram, substring search", diff: "Easy", lc: "Valid Anagram, Reverse String, First Unique Char" },
  { id: "dsa3", topic: "Hashing", sub: "HashMap/HashSet, frequency count, group by key", diff: "Easy", lc: "Group Anagrams, Top K Frequent Elements" },
  { id: "dsa4", topic: "Sorting & Searching", sub: "Bubble/Selection/Insertion/Merge Sort, Binary Search", diff: "Easy", lc: "Search Insert Position, First Bad Version" },
  { id: "dsa5", topic: "Linked Lists", sub: "Singly/Doubly LL, reversal, cycle detection, merge", diff: "Easy", lc: "Reverse LL, Middle of LL, Detect Cycle" },
  { id: "dsa6", topic: "Stacks", sub: "LIFO, monotonic stack, valid parentheses, next greater", diff: "Easy", lc: "Valid Parentheses, Min Stack, Daily Temperatures" },
  { id: "dsa7", topic: "Queues", sub: "FIFO, deque, sliding window max, BFS queue", diff: "Easy", lc: "Implement Queue using Stacks, Moving Average" },
  { id: "dsa8", topic: "Recursion", sub: "Base case, call stack, backtracking foundation", diff: "Med", lc: "Fibonacci, Permutations, Subsets" },
  { id: "dsa9", topic: "Binary Trees", sub: "Inorder/Preorder/Postorder, height, LCA, BFS/DFS", diff: "Med", lc: "Max Depth, Invert Tree, Level Order Traversal" },
  { id: "dsa10", topic: "Binary Search (Adv)", sub: "Search in rotated array, answer-range binary search", diff: "Med", lc: "Find Min in Rotated, Search 2D Matrix" },
  { id: "dsa11", topic: "Two Pointers", sub: "Opposite ends, same direction, fast-slow pointer", diff: "Med", lc: "3Sum, Container With Water, Remove Duplicates" },
  { id: "dsa12", topic: "Sliding Window", sub: "Fixed/variable window, max/min subarray", diff: "Med", lc: "Longest Substr No Repeat, Max Subarray Sum K" },
  { id: "dsa13", topic: "Dynamic Programming", sub: "Memoisation, tabulation, state definition, DP on strings", diff: "Med", lc: "Climbing Stairs, House Robber, Coin Change" },
  { id: "dsa14", topic: "Graphs (BFS/DFS)", sub: "Adjacency list/matrix, connected components, cycle", diff: "Med", lc: "Number of Islands, Clone Graph, Course Schedule" },
];

export const CORE_CS = [
  { id: "cs1", topic: "Java OOP Pillars", sub: "Encapsulation, Abstraction, Inheritance, Polymorphism" },
  { id: "cs2", topic: "Java: Exception & I/O", sub: "try/catch/finally, checked vs unchecked, file I/O" },
  { id: "cs3", topic: "Java Collections", sub: "ArrayList, LinkedList, HashMap, HashSet, TreeMap" },
  { id: "cs4", topic: "Java Multithreading", sub: "Thread lifecycle, synchronization, deadlock, wait/notify" },
  { id: "cs5", topic: "SQL: Basics & Joins", sub: "SELECT, WHERE, GROUP BY, HAVING, INNER/LEFT/RIGHT JOIN" },
  { id: "cs6", topic: "SQL: Subqueries & Indexes", sub: "Correlated subquery, indexing, EXPLAIN, query optimization" },
  { id: "cs7", topic: "DBMS: Fundamentals", sub: "ACID, ER diagrams, schema, relational model" },
  { id: "cs8", topic: "DBMS: Normalisation", sub: "1NF, 2NF, 3NF, BCNF — definitions and examples" },
  { id: "cs9", topic: "OS: Processes & Threads", sub: "Process vs Thread, PCB, context switching, states" },
  { id: "cs10", topic: "OS: CPU Scheduling", sub: "FCFS, SJF, Round Robin, Priority — Gantt charts" },
  { id: "cs11", topic: "OS: Memory Management", sub: "Paging, segmentation, virtual memory, page replacement" },
  { id: "cs12", topic: "OS: Deadlock", sub: "4 conditions, prevention, banker's algorithm" },
  { id: "cs13", topic: "Networks: OSI & TCP/IP", sub: "7 layers of OSI, TCP/IP 4-layer, protocols per layer" },
  { id: "cs14", topic: "Networks: HTTP/HTTPS/DNS", sub: "HTTP methods, status codes, DNS resolution, TLS" },
  { id: "cs15", topic: "React: Core Concepts", sub: "Virtual DOM, JSX, components, props vs state" },
  { id: "cs16", topic: "React: Hooks & Lifecycle", sub: "useState, useEffect, useContext, custom hooks, cleanup" },
  { id: "cs17", topic: "System Design Basics", sub: "Client-server, REST API, SQL vs NoSQL, caching, CDN" },
];

export const HOURLY_BLOCKS = [
  { id: "h1", time: "10:15–11:45 AM", label: "DSA Practice", detail: "LeetCode problems — focus on current week's DSA topic", icon: "🧩", color: "#f59e0b", mins: 90 },
  { id: "h2", time: "11:45–1:15 PM", label: "Aptitude (LR + QA)", detail: "IndiaBIX + practice sets — alternate LR and QA daily", icon: "🧮", color: "#a78bfa", mins: 90 },
  { id: "h3", time: "1:15–2:15 PM", label: "Job Applications", detail: "LinkedIn, Naukri, Indeed, official career pages — 8-10/day", icon: "📤", color: "#10b981", mins: 60 },
  { id: "h4", time: "3:15–4:45 PM", label: "Core CS / Tech Concepts", detail: "OS, DBMS, Networks, Java, React — topic-by-topic revision", icon: "📚", color: "#3b82f6", mins: 90 },
  { id: "h5", time: "4:45–5:15 PM", label: "Projects, Resume & Mock", detail: "Portfolio polish, verbal answers practice, mock interviews", icon: "🎯", color: "#ec4899", mins: 30 },
  { id: "h6", time: "5:15–5:45 PM", label: "Daily Review & Plan", detail: "Check tracker, log notes, plan tomorrow's priority topics", icon: "✅", color: "#34d399", mins: 30 },
];

export const WEEKLY_KPIS = [
  {
    week: 1, color: "#3b82f6", bg: "#1e3a5f", label: "WEEK 1", sub: "Build the Foundation", days: "Days 1–7",
    goal: "Resume & profiles interview-ready. 50+ applications sent. 20+ DSA problems solved. Aptitude fundamentals covered. 1 mock interview.",
    kpis: [
      { id: "w1k1", text: "Resume Polished & ATS-Optimised", target: "Zero red flags on resumeworded.com" },
      { id: "w1k2", text: "LinkedIn & Naukri 100% Complete", target: "Headline, skills, projects, open to work ON" },
      { id: "w1k3", text: "50+ Companies Applied", target: "Tracked in spreadsheet with status" },
      { id: "w1k4", text: "20+ DSA Problems Solved (LeetCode Easy)", target: "Arrays, Strings, Loops, Sorting, Hashing" },
      { id: "w1k5", text: "Aptitude: 5 LR Topics — Not Started → Done", target: "Coding-Decoding, Direction, Blood Relations, Seating, Syllogism" },
      { id: "w1k6", text: "Aptitude: 4 QA Topics — Not Started → Done", target: "Simplification, Percentages, SI/CI, Profit & Loss" },
      { id: "w1k7", text: "Java OOP + SQL Basics Revised", target: "All 4 OOP pillars + write 10 SQL queries from scratch" },
      { id: "w1k8", text: "1 Full Mock Interview Completed", target: "Recorded, reviewed, feedback logged" },
    ]
  },
  {
    week: 2, color: "#0d9488", bg: "#0f3330", label: "WEEK 2", sub: "Sharpen & Interview-Ready", days: "Days 8–14",
    goal: "50+ LeetCode total. All Core CS subjects covered. 3+ mock interviews. First interview calls received. 100+ total applications.",
    kpis: [
      { id: "w2k1", text: "100+ Total Applications Sent", target: "By end of Day 14 in tracker" },
      { id: "w2k2", text: "1–2 Interview Calls Received", target: "Company called, emailed, or sent OA link" },
      { id: "w2k3", text: "50+ LeetCode Problems Solved (Total)", target: "Easy: 40+, Medium: 10+" },
      { id: "w2k4", text: "Aptitude: 5 more LR Topics Mastered", target: "Puzzles, Data Sufficiency, Non-Verbal, Clocks, Number Series" },
      { id: "w2k5", text: "Aptitude: 5 more QA Topics Mastered", target: "Time/Work, Ratios/Ages, Mixtures, Average, DI" },
      { id: "w2k6", text: "OS Fully Revised", target: "Processes, Scheduling, Memory Management, Deadlock" },
      { id: "w2k7", text: "DBMS + Networks Revised", target: "Normalisation, ACID, OSI model, TCP/IP, HTTP/DNS" },
      { id: "w2k8", text: "3 Mock Interviews Done (Total)", target: "One focused on DSA, one on CS, one full simulation" },
    ]
  },
  {
    week: 3, color: "#d97706", bg: "#3b1f00", label: "WEEK 3", sub: "Close the Deal", days: "Days 15–21",
    goal: "3+ interviews attended. Technical round cleared. 150+ total applications. Offer received or imminent. Negotiation ready.",
    kpis: [
      { id: "w3k1", text: "3+ Interviews / OAs Attended", target: "Online assessments count" },
      { id: "w3k2", text: "1 Technical Round Cleared", target: "Advanced to next stage at any company" },
      { id: "w3k3", text: "150+ Total Applications Sent", target: "By end of Day 21" },
      { id: "w3k4", text: "Offer Received or Pending", target: "Written offer or strong verbal confirmation" },
      { id: "w3k5", text: "80+ LeetCode Problems (Total)", target: "Easy: 60+, Medium: 20+" },
      { id: "w3k6", text: "All Aptitude Topics — At Least In Progress", target: "No topic left at 'Not Started' by Day 21" },
      { id: "w3k7", text: "Salary Negotiation Script Prepared", target: "Walk-away number, target, counter-offer phrase ready" },
      { id: "w3k8", text: "5+ Total Mock Interviews Done", target: "Across all 3 weeks" },
    ]
  },
];

// Status: 0=not started, 1=in progress, 2=done
export const STATUS_LABELS = ["Not Started", "In Progress", "Mastered"];
export const STATUS_COLORS = ["#2a2a3a", "#f59e0b", "#10b981"];
export const STATUS_TEXT = ["#666", "#fbbf24", "#34d399"];

export const STORAGE_KEY = "vasanth_adv_v1";
