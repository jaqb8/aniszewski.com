import { useState, useEffect, useRef } from "react";
import {
  Github,
  Mail,
  Terminal,
  Code2,
  Globe,
  Sparkles,
  BookOpen,
  Download,
  Menu,
  X,
} from "lucide-react";
import Avatar from "./assets/avatar.jpg";
import Resume from "./assets/resume.pdf";
import GitHubCalendar from "react-github-calendar";

const MatrixTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const messages = [
    "echo 'Initializing system...'",
    "sudo apt update",
    "git clone https://github.com/jaqb8/awesome-projects",
    "cd awesome-projects && npm install && npm run dev",
    "Ready to create something amazing! 🚀",
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  useEffect(() => {
    let currentChar = 0;
    let currentMessage = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = messages[currentMessage];

      if (currentChar === current.length) {
        setLines((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] $ ${current}`,
        ]);
        setCurrentLine("");
        currentChar = 0;
        currentMessage = (currentMessage + 1) % messages.length;
        timeout = setTimeout(type, 1000);
      } else {
        setCurrentLine(current.substring(0, currentChar + 1));
        currentChar++;
        timeout = setTimeout(type, 50);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-75"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-75"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-75"></div>
        </div>
        <span className="text-sm">terminal</span>
      </div>
      <div className="flex-1 bg-black/50 rounded-lg p-4 font-mono text-sm relative overflow-hidden">
        <div
          ref={terminalRef}
          className="h-full terminal-text relative space-y-1 overflow-y-auto scrollbar-hide"
        >
          {lines.map((line, i) => (
            <div key={i} className="text-gray-300">
              {line}
            </div>
          ))}
          <div className="text-gray-300">
            <span className="text-green-400">
              [{new Date().toLocaleTimeString()}] $
            </span>{" "}
            <span className="text-purple-400">{currentLine}</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-gray-100 antialiased">
      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,200,0.08),transparent_50%)] pointer-events-none"></div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <button className="md:hidden text-gray-100" onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <span className="text-xl font-semibold"></span>
            <div className="hidden md:flex gap-4 ml-auto">
              <a
                href="#about"
                className="hover:text-gray-400 transition-colors text-sm md:text-base"
              >
                About
              </a>
              <a
                href="#work"
                className="hover:text-gray-400 transition-colors text-sm md:text-base"
              >
                Work
              </a>
              <a
                href="#contact"
                className="hover:text-gray-400 transition-colors text-sm md:text-base"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center justify-center space-y-6 md:hidden">
          <a
            href="#about"
            className="text-gray-100 text-xl font-semibold"
            onClick={toggleSidebar}
          >
            About
          </a>
          <a
            href="#work"
            className="text-gray-100 text-xl font-semibold"
            onClick={toggleSidebar}
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-gray-100 text-xl font-semibold"
            onClick={toggleSidebar}
          >
            Contact
          </a>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="w-64 h-64 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-purple-400/10 mx-auto mb-6">
                <img
                  src={Avatar}
                  alt="Jakub Aniszewski"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Jakub Aniszewski
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto my-4 px-4 ">
                Software Developer specializing in TypeScript and Python with{" "}
                <br />
                <strong className="text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  5+ years of experience
                </strong>
              </p>
              <a
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 mt-8 text-sm font-medium text-white bg-purple-600/20 border border-purple-500/20 rounded-full transition-all duration-300 hover:bg-purple-600/30 hover:border-purple-500/30 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group"
              >
                <Download className="w-4 h-4" />
                Download my Resume!
              </a>
            </div>
          </section>

          {/* Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* About Card */}
            <div
              id="about"
              className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm md:col-span-2 hover:shadow-md transition-shadow border border-zinc-800/50 scroll-mt-20"
            >
              <Terminal className="w-8 h-8 mb-4 text-gray-400 terminal-blink" />
              <h2 className="text-2xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-400 leading-relaxed">
                I'm a passionate software developer focused on building elegant,
                efficient, and user-friendly applications. With expertise in
                TypeScript and Python, I create robust solutions that make a
                difference.
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-zinc-800/50">
              <Code2 className="w-8 h-8 mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    height="512"
                    viewBox="0 0 512 512"
                    width="512"
                  >
                    <rect fill="#fff" rx="50" />
                    <rect fill="#9ca3af" height="512" rx="50" width="512" />
                    <path
                      clipRule="evenodd"
                      d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
                      fill="#000"
                    />
                  </svg>
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 .1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"
                      fill="#9ca3af"
                    />
                  </svg>
                  Python
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
                      fill="#9ca3af"
                    />
                  </svg>
                  React
                </li>
              </ul>
            </div>

            {/* Featured Project */}
            <div
              id="work"
              className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-zinc-800/50 scroll-mt-20"
            >
              <Sparkles className="w-8 h-8 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Featured Project</h2>
              <div className="space-y-8">
                <div>
                  <p className="mb-2">
                    Plantigo - IoT system for plant monitoring
                  </p>
                  <a
                    href="https://plantigo.online"
                    className="text-sm underline"
                    target="_blank"
                  >
                    Visit now →
                  </a>
                </div>
                <div>
                  <p className="mb-2">Michał Kapusz - tennis coach website</p>
                  <a
                    href="https://kapusz-tenis.pl"
                    className="text-sm underline"
                    target="_blank"
                  >
                    Visit now →
                  </a>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-zinc-800/50">
              <BookOpen className="w-8 h-8 mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Senior Python Developer</h3>
                  <p className="">STX Next</p>
                  <p className="text-sm text-gray-400">Jun 2025 - Present</p>
                </div>
                <div>
                  <h3 className="font-bold">Full-Stack Software Engineer</h3>
                  <p className="">NotBug</p>
                  <p className="text-sm text-gray-400">Jan 2024 - Apr 2025</p>
                </div>
                <div>
                  <h3 className="font-bold">Python Software Engineer</h3>
                  <p className="">TietoEvry</p>
                  <p className="text-sm text-gray-400">Nov 2022 - Sep 2024</p>
                </div>
                <div>
                  <h3 className="font-bold">Software Engineer</h3>
                  <p className="">Nokia</p>
                  <p className="text-sm text-gray-400">Jan 2020 - Oct 2022</p>
                </div>
              </div>
            </div>

            {/* Terminal Card */}
            {/* <div className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-zinc-800/50 h-[400px]">
              <MatrixTerminal />
            </div> */}

            {/* GitHub Activity Card */}
            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-zinc-800/50">
              <Github className="w-8 h-8 mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-4">GitHub Activity</h2>
              <div className="overflow-x-auto flex justify-center items-center">
                <GitHubCalendar
                  username="jaqb8"
                  colorScheme="dark"
                  transformData={(contributions) => {
                    const currentDate = new Date();
                    const lastFourMonths = new Date(
                      currentDate.setMonth(currentDate.getMonth() - 4)
                    );

                    return contributions.filter((activity) => {
                      const date = new Date(activity.date);
                      return date >= lastFourMonths;
                    });
                  }}
                  labels={{
                    totalCount: "{{count}} contributions in the last 4 months",
                  }}
                  theme={{
                    dark: [
                      "#161b22",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
                  }}
                />
              </div>
            </div>

            {/* Contact */}
            <div
              id="contact"
              className="bg-zinc-900/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm col-span-1 md:col-span-3 hover:shadow-md transition-shadow border border-zinc-800/50 scroll-mt-20"
            >
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-semibold">Let's Connect</h2>
                <p className="text-gray-400">
                  I'm always interested in hearing about new projects and
                  opportunities.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                  <a
                    href="mailto:jakubaniszewski@pm.me"
                    className="flex items-center justify-center gap-2 hover:text-gray-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                  <a
                    href="https://github.com/jaqb8"
                    className="flex items-center justify-center gap-2 hover:text-gray-400 transition-colors"
                    target="_blank"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jakub-aniszewski/"
                    className="flex items-center justify-center gap-2 hover:text-gray-400 transition-colors"
                    target="_blank"
                  >
                    <Globe className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-400">
          <p>© 2025 Jakub Aniszewski IT Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
