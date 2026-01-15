// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Linkedin, Github, Code2, Sparkles, Zap, Users } from 'lucide-react';
// // import { useTheme } from '../context/theme.context';
// // import { Moon, Sun } from 'lucide-react';

// // const LandingPage: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { isDarkMode, toggleTheme } = useTheme();

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
// //       {/* Header */}
// //       <header className="px-6 py-4 flex justify-between items-center">
// //         <div className="flex items-center space-x-6">
// //           <div className="flex items-center space-x-4">
// //             <a
// //               href="https://linkedin.com"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
// //             >
// //               <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
// //             </a>
// //             <a
// //               href="https://github.com"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
// //             >
// //               <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
// //             </a>
// //           </div>
// //         </div>

// //         <button
// //           onClick={toggleTheme}
// //           className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
// //         >
// //           {isDarkMode ? (
// //             <Sun className="w-5 h-5 text-yellow-500" />
// //           ) : (
// //             <Moon className="w-5 h-5 text-gray-700" />
// //           )}
// //         </button>
// //       </header>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 py-12 max-w-6xl">
// //         <div className="text-center mb-12">
// //           <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-float">
// //             <Sparkles className="w-5 h-5 text-white" />
// //             <span className="text-white font-semibold">Real-time Collaborative Coding</span>
// //           </div>
          
// //           <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
// //             Sync<span className="text-blue-600 dark:text-blue-400">Code</span>
// //           </h1>
          
// //           <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
// //             Code together in real-time with your team
// //           </p>
// //         </div>

// //         {/* Features Grid */}
// //         <div className="grid md:grid-cols-3 gap-8 mb-16">
// //           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
// //             <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
// //               <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
// //             </div>
// //             <h3 className="text-xl font-bold mb-3 dark:text-white">Real-time Collaboration</h3>
// //             <p className="text-gray-600 dark:text-gray-300">
// //               See your teammates' cursors and edits live. Code together seamlessly from anywhere.
// //             </p>
// //           </div>

// //           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
// //             <div className="inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
// //               <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// //             </div>
// //             <h3 className="text-xl font-bold mb-3 dark:text-white">Multi-language Support</h3>
// //             <p className="text-gray-600 dark:text-gray-300">
// //               Write code in JavaScript, Python, and more with syntax highlighting and autocomplete.
// //             </p>
// //           </div>

// //           <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
// //             <div className="inline-flex p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
// //               <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
// //             </div>
// //             <h3 className="text-xl font-bold mb-3 dark:text-white">Built-in Chat</h3>
// //             <p className="text-gray-600 dark:text-gray-300">
// //               Communicate with your team directly in the editor. Share ideas and solve problems together.
// //             </p>
// //           </div>
// //         </div>

// //         {/* CTA Section */}
// //         <div className="text-center">
// //           <button
// //             onClick={() => navigate('/login')}
// //             className="group relative px-12 py-6 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
// //           >
// //             <span className="relative z-10">Get Started →</span>
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //             <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
// //           </button>
          
// //           <p className="mt-6 text-gray-500 dark:text-gray-400">
// //             Join thousands of developers coding together
// //           </p>
// //         </div>
// //       </main>

// //       {/* Floating Background Elements */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
// //         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" />
// //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;


// import Navbar from "../components/navbar";
// import { useNavigate } from "react-router-dom";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//       <Navbar />

//       <div className="flex flex-col items-center justify-center text-center mt-32 px-6">
//         <h1 className="text-5xl font-bold mb-6">
//           SyncCode 🚀
//         </h1>

//         <p className="text-lg max-w-2xl mb-10 opacity-80">
//           SyncCode is a real-time collaborative coding platform where developers
//           can write, chat, execute, and learn together. Designed for students,
//           teams, and educators to code seamlessly in shared rooms.
//         </p>

//         <button
//           onClick={() => navigate("/login")}
//           className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }




// import React from 'react';
// import { LinkedInIcon, GitHubIcon } from '../components/icons';

// interface LandingProps {
//   onGetStarted: () => void;
// }

// const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/20">
//       {/* Background Decor */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-1/2 -left-1/4 w-[100vw] h-[100vh] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute -bottom-1/2 -right-1/4 w-[100vw] h-[100vh] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
//       </div>

//       {/* Social Icons - Top Left */}
//       <div className="absolute top-8 left-8 flex gap-4 z-20">
//         <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
//           <LinkedInIcon className="w-6 h-6" />
//         </a>
//         <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
//           <GitHubIcon className="w-6 h-6" />
//         </a>
//       </div>

//       <div className="relative z-10 max-w-4xl text-center">
//         <div className="mb-6 inline-block">
//           <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium tracking-wide">
//             Real-time Collaborative IDE
//           </span>
//         </div>
        
//         <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-slate-400">
//           SyncCode
//         </h1>
        
//         <p className="text-xl md:text-3xl font-medium text-slate-300 mb-8 italic">
//           "Code together, grow faster, sync smarter."
//         </p>
        
//         <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
//           The ultimate environment for seamless real-time collaborative coding. Build, debug, and ship with your team in shared coding rooms featuring instant synchronization, integrated chat, and secure code execution.
//         </p>

//         <button 
//           onClick={onGetStarted}
//           className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transform hover:-translate-y-1 overflow-hidden"
//         >
//           <span className="relative z-10">Get Started for Free</span>
//           <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-500" />
//         </button>

//         <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
//           <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Live Sync</h3>
//             <p className="text-slate-400 text-sm">Experience sub-millisecond synchronization powered by Socket.IO for fluid collaboration.</p>
//           </div>
//           <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Secure Rooms</h3>
//             <p className="text-slate-400 text-sm">Password-protected rooms with OTP-verified authentication ensuring your code stays private.</p>
//           </div>
//           <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
//             <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Cloud Execution</h3>
//             <p className="text-slate-400 text-sm">Compile and run JavaScript or Python code directly in your browser with instant output.</p>
//           </div>
//         </div>
//       </div>
      
//       <footer className="absolute bottom-8 text-slate-500 text-sm">
//         © {new Date().getFullYear()} SyncCode Platform. Built for developers.
//       </footer>
//     </div>
//   );
// };

// export default Landing;


import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/navbar';
import { motion } from 'framer-motion';
import { Code2, Users, Play, MessageCircle, Zap, Shield, Globe, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Code together with your team in real-time. See changes instantly as they happen.',
  },
  {
    icon: Play,
    title: 'Live Code Execution',
    description: 'Run JavaScript and Python code directly in the browser with instant feedback.',
  },
  {
    icon: MessageCircle,
    title: 'Built-in Chat',
    description: 'Discuss code with your collaborators without leaving the editor.',
  },
  {
    icon: Shield,
    title: 'Secure Rooms',
    description: 'Private coding rooms with secure authentication and access control.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized WebSocket connections for minimal latency sync.',
  },
  {
    icon: Globe,
    title: 'Access Anywhere',
    description: 'Work from any device with a browser. No installation required.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">Now supporting Python & JavaScript</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Code Together,<br />
              <span className="text-gradient">Build Faster</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The real-time collaborative coding platform that lets you write, execute, and discuss code with your team — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-2 min-w-[200px]">
                  Start Coding Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Code Editor Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-card">
              {/* Editor header */}
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">room_abc123</span>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">J</div>
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground -ml-2">A</div>
                    <div className="w-6 h-6 rounded-full bg-warning flex items-center justify-center text-[10px] font-bold text-warning-foreground -ml-2">M</div>
                  </div>
                </div>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-4">
                  <div className="text-muted-foreground/50 select-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <div key={n}>{n}</div>
                    ))}
                  </div>
                  <div className="text-foreground">
                    <div><span className="text-primary">function</span> <span className="text-accent">collaborate</span>() {'{'}</div>
                    <div className="pl-4"><span className="text-primary">const</span> team = [<span className="text-warning">"dev1"</span>, <span className="text-warning">"dev2"</span>];</div>
                    <div className="pl-4"><span className="text-primary">const</span> code = <span className="text-accent">writeCode</span>();</div>
                    <div className="pl-4"><span className="text-primary">const</span> result = <span className="text-accent">execute</span>(code);</div>
                    <div className="pl-4">&nbsp;</div>
                    <div className="pl-4"><span className="text-primary">return</span> <span className="text-accent">shareWith</span>(team, result);</div>
                    <div>{'}'}</div>
                    <div className="opacity-50">|</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to <span className="text-gradient">code together</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for seamless collaboration and productivity.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center bg-gradient-secondary border border-border"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Code2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to start collaborating?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of developers who are already coding together on SyncCode.
              </p>
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-2">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SyncCode</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 SyncCode. Built for developers, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}