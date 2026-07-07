// The curriculum — a Python-first track of six independent courses.
// `tint` keys the pen color used for its plotted figure (see ArticleCard).
// `href` links to that course's own route under /curriculum/.
export const tracks = [
  {
    code: "01",
    title: "Fundamentals of Programming & OOPs",
    description:
      "Where it starts. From your first line of Python to full object-oriented design, exception handling, and clean-code principles.",
    modules: [
      "Python setup & fundamentals",
      "Control flow & functions",
      "Recursion & built-in data structures",
      "Object-oriented programming",
      "Exceptions, files & design patterns",
    ],
    duration: "6 weeks",
    projects: "1 project",
    tint: 0,
    href: "/curriculum/python-oops.html",
  },
  {
    code: "02",
    title: "DSA & Placement Training",
    description:
      "Interview-grade data structures and algorithms in Python — from programming & computer fundamentals to every core structure, with daily practice sheets that stand between you and the offer.",
    modules: [
      "Programming & computer fundamentals",
      "Complexity analysis, arrays & strings",
      "Searching, sorting, recursion & backtracking",
      "Linear data structures & hashing",
      "Non-linear data structures",
    ],
    duration: "52 periods",
    projects: "300+ problems",
    tint: 4,
    href: "/curriculum/dsa.html",
  },
  {
    code: "03",
    title: "Competitive Programming",
    description:
      "Contest-oriented training on Codeforces, CodeChef and AtCoder — advanced algorithms, math, and speed, solved fully in Python.",
    modules: [
      "Fast I/O & CP essentials",
      "Number theory & math",
      "Bit manipulation",
      "Advanced graphs & data structures",
      "Contest bootcamp",
    ],
    duration: "6 weeks",
    projects: "100+ problems",
    tint: 2,
    href: "/curriculum/competitive.html",
  },
  {
    code: "04",
    title: "Data Science",
    description:
      "From data wrangling and statistics through classical machine learning to deep learning and Transformers — every model built, evaluated, and deployed.",
    modules: [
      "NumPy, Pandas & visualization",
      "Statistics & math for ML",
      "Machine learning, end to end",
      "Deep learning with PyTorch",
      "MLOps basics",
    ],
    duration: "14 weeks",
    projects: "3 projects",
    tint: 1,
    href: "/curriculum/data-science.html",
  },
  {
    code: "05",
    title: "Generative AI ★",
    description:
      "The headline skill. Ship real LLM products — prompting, RAG, and fine-tuning — the kind of project a recruiter actually clicks on.",
    modules: [
      "LLM foundations",
      "Prompt engineering",
      "Embeddings & RAG",
      "Fine-tuning & open-source LLMs",
      "Multimodal & production GenAI",
    ],
    duration: "6 weeks",
    projects: "1 flagship project",
    tint: 3,
    href: "/curriculum/generative-ai.html",
  },
  {
    code: "06",
    title: "Agentic AI ★",
    description:
      "The 2026 differentiator. Build autonomous multi-agent systems that plan, call tools, and finish real work — across every major framework.",
    modules: [
      "Agent fundamentals",
      "LangChain & LangGraph",
      "CrewAI & AutoGen",
      "Google ADK, MCP & A2A",
      "Production agentic systems",
    ],
    duration: "6 weeks",
    projects: "2 capstones",
    tint: 5,
    href: "/curriculum/agentic-ai.html",
  },
];

// The six-month route. Order is the information here: this is the
// sequence a student actually follows to Gen AI + Agentic AI job-ready.
export const path = [
  { month: "Month 1", label: "Foundations & core ML" },
  { month: "Month 2", label: "Deep learning, hands-on" },
  { month: "Month 3", label: "NLP & transformers" },
  { month: "Month 4", label: "Generative AI — build & ship" },
  { month: "Month 5", label: "Agentic AI — plan, tools, agents" },
  { month: "Month 6", label: "Flagship portfolio & placement drives" },
];
