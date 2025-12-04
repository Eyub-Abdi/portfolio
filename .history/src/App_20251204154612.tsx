import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const skills = [
    { name: 'Basic Penetration Testing', icon: 'fa-solid fa-unlock', description: 'Learning structured methodologies, phases, and reporting' },
    { name: 'Network Essentials', icon: 'fa-solid fa-network-wired', description: 'Ports, protocols, routing, scanning and enumeration' },
    { name: 'Linux & Terminal', icon: 'fa-brands fa-linux', description: 'Daily use of Kali Linux and administration basics' },
    { name: 'Python Scripting', icon: 'fa-brands fa-python', description: 'Security automation, basic tooling, and scripting logic' },
    { name: 'Web Security', icon: 'fa-solid fa-shield-halved', description: 'Studying XSS, SQL injection, CSRF & authentication flaws' },
    { name: 'Security Tools', icon: 'fa-solid fa-toolbox', description: 'Using Nmap, Burp Suite, Metasploit, Feroxbuster, Netcat' }
  ]

  const projects = [
    {
      title: 'Port Scanner Tool',
      description: 'Python-based port scanner for learning network reconnaissance',
      tech: ['Python', 'Socket', 'Threading'],
      link: '#'
    },
    {
      title: 'Basic Vulnerability Scanner',
      description: 'Web application scanner to detect common security issues',
      tech: ['Python', 'Requests', 'BeautifulSoup'],
      link: '#'
    },
    {
      title: 'Password Cracker',
      description: 'Educational tool demonstrating hash cracking techniques',
      tech: ['Python', 'Hashlib', 'Dictionary Attack'],
      link: '#'
    },
    {
      title: 'CTF Write-ups & Labs',
      description: 'Collection of solved challenges from TryHackMe and HackTheBox',
      tech: ['Linux', 'Nmap', 'Metasploit', 'Burp Suite'],
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-gray-text">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <ul className="hidden md:flex items-center gap-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={e => {
                      e.preventDefault()
                      scrollToSection(item)
                    }}
                    className={`capitalize text-sm font-medium transition-colors hover:text-red-terminal ${activeSection === item ? 'text-red-terminal' : 'text-gray-text'}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                scrollToSection('contact')
              }}
              className="hidden md:block bg-gradient-to-r from-red-terminal to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Get In Touch
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-bg to-panel-bg"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-terminal rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-terminal rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Hi, I'm <span className="text-red-terminal">Ayub Abdi</span>
              </h1>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-text/90 mb-8">Aspiring Penetration Tester & Security Enthusiast</h2>

              <p className="text-base md:text-lg text-gray-text/80 mb-12 leading-relaxed">I’m building hands-on skills in cybersecurity through labs, CTFs, and real-world practice environments. I focus on learning how systems work, how attackers exploit weaknesses, and how to secure them.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <a
                  href="#projects"
                  onClick={e => {
                    e.preventDefault()
                    scrollToSection('projects')
                  }}
                  className="group relative bg-gradient-to-r from-red-terminal to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-red-terminal/30 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-terminal opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>

                <a
                  href="#contact"
                  onClick={e => {
                    e.preventDefault()
                    scrollToSection('contact')
                  }}
                  className="border-2 border-red-terminal text-red-terminal px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-terminal hover:text-white transition-all duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-terminal to-red-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative">
                  {/* Orbiting Social Icons - Outside the circle */}
                  <div className="absolute -inset-16 z-40">
                    {/* GitHub - Top */}
                    <a href="https://github.com/Eyub-Abdi" target="_blank" rel="noopener noreferrer" className="absolute top-0 left-[45%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-panel-bg border-2 border-red-terminal rounded-full flex items-center justify-center text-red-terminal hover:bg-red-terminal hover:text-white transition-all duration-300 hover:scale-110 animate-orbit-1">
                      <i className="fab fa-github text-xl"></i>
                    </a>

                    {/* LinkedIn - Top Left (between GitHub and Email) */}
                    <a href="https://www.linkedin.com/in/eyub-abdi" target="_blank" rel="noopener noreferrer" className="absolute top-[15%] left-[15%] -translate-x-1/4 -translate-y-1/4 w-14 h-14 bg-panel-bg border-2 border-red-terminal rounded-full flex items-center justify-center text-red-terminal hover:bg-red-terminal hover:text-white transition-all duration-300 hover:scale-110 animate-orbit-2">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>

                    {/* YouTube - Bottom */}
                    <a href="https://www.youtube.com/@Red.Terminal" target="_blank" rel="noopener noreferrer" className="absolute bottom-0 left-[45%] -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-panel-bg border-2 border-red-terminal rounded-full flex items-center justify-center text-red-terminal hover:bg-red-terminal hover:text-white transition-all duration-300 hover:scale-110 animate-orbit-3">
                      <i className="fab fa-youtube text-xl"></i>
                    </a>

                    {/* Email - Left */}
                    <a href="mailto:ayubabdiy@gmail.com" className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-panel-bg border-2 border-red-terminal rounded-full flex items-center justify-center text-red-terminal hover:bg-red-terminal hover:text-white transition-all duration-300 hover:scale-110 animate-orbit-4">
                      <i className="fas fa-envelope text-xl"></i>
                    </a>
                  </div>

                  {/* Main Image */}
                  <img src="/dp.jpeg" alt="Ayub Abdi - Cybersecurity Specialist" className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-panel-bg shadow-2xl relative z-10" />

                  {/* Cyber Grid Overlay */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-terminal/20 via-transparent to-red-terminal/10"></div>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255, 26, 26, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 26, 26, 0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                  </div>

                  {/* Scanning Lines - Clean scan effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-25 pointer-events-none">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-terminal to-transparent shadow-lg shadow-red-terminal/50 animate-scan-down"></div>
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-terminal/60 to-transparent animate-scan-up"></div>
                  </div>

                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-red-terminal z-30 rounded-tl-full"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-red-terminal z-30 rounded-tr-full"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-red-terminal z-30 rounded-bl-full"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-red-terminal z-30 rounded-br-full"></div>

                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-terminal/30 animate-ping z-5"></div>

                  {/* Scanning Line */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-25">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-terminal to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-red-terminal">Me</span>
            </h2>
            <div className="w-20 h-1 bg-red-terminal mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-text/90 leading-relaxed">I'm an aspiring penetration tester actively developing my skills in ethical hacking, network security, and vulnerability analysis. I learn through structured labs, online platforms, and security communities.</p>

              <p className="text-lg text-gray-text/90 leading-relaxed">
                I've showcased my skills in challenges like{' '}
                <a href="https://www.linkedin.com/company/urchinsec/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-red-terminal hover:underline">
                  UrchinSec
                </a>{' '}
                CTF, where I ranked in the top 4.
              </p>

              <p className="text-lg text-gray-text/90 leading-relaxed">I enjoy solving challenges, experimenting with attack paths, and documenting what I learn.</p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-red-terminal mb-4">Quick Facts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-heart text-red-terminal"></i>
                    <span>Passionate about cybersecurity & ethical hacking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-certificate text-red-terminal"></i>
                    <span>Working towards eJPT</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-red-terminal"></i>
                    <span>Based in East Africa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-flag text-red-terminal"></i>
                    <span>Active on TryHackMe & HackTheBox</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-brands fa-node-js text-red-terminal"></i>
                    <span>Comfortable working with REST APIs (Node.js/Express)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-terminal/20 to-transparent rounded-2xl p-8 border border-red-terminal/30">
                <div className="w-full h-full bg-panel-bg rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-shield-halved text-8xl text-red-terminal"></i>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-red-terminal/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-panel-bg/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-red-terminal">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-red-terminal mx-auto mb-6"></div>
            <p className="text-gray-text/80 max-w-2xl mx-auto">Core skills I'm developing in ethical hacking and penetration testing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group bg-panel-bg border-l-4 border-red-terminal p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-red-terminal/20">
                <i className={`${skill.icon} text-4xl text-red-terminal mb-4`}></i>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-terminal transition-colors">{skill.name}</h3>
                <p className="text-gray-text/70 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-red-terminal">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-red-terminal mx-auto mb-6"></div>
            <p className="text-gray-text/80 max-w-2xl mx-auto">Learning projects and practice labs I've completed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-panel-bg rounded-xl overflow-hidden border border-gray-text/10 hover:border-red-terminal/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-terminal/20">
                <div className="aspect-video bg-gradient-to-br from-red-terminal/20 to-panel-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <i className="fa-solid fa-code text-6xl text-red-terminal"></i>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-red-terminal transition-colors">{project.title}</h3>

                  <p className="text-gray-text/80 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-red-terminal/10 text-red-terminal text-sm rounded-full border border-red-terminal/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a href={project.link} className="inline-flex items-center gap-2 text-red-terminal font-semibold hover:gap-3 transition-all">
                    View Project <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-panel-bg/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="text-red-terminal">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-red-terminal mx-auto mb-6"></div>
            <p className="text-gray-text/80 max-w-2xl mx-auto">Interested in collaboration or have questions? Let's connect and learn together.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20">
              <i className="fa-solid fa-envelope text-4xl text-red-terminal mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a href="mailto:ayubabdi@protonmail.com" className="text-red-terminal hover:underline">
                ayubabdiy@gmail.com
              </a>
            </div>

            <div className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20">
              <i className="fa-solid fa-share-nodes text-4xl text-red-terminal mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">Social</h3>
              <div className="flex gap-4">
                <a href="https://github.com/Eyub-Abdi" target="_blank" rel="noopener noreferrer" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/eyub-abdi" target="_blank" rel="noopener noreferrer" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@Red.Terminal" target="_blank" rel="noopener noreferrer" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={e => {
              e.preventDefault()
              setFormStatus('sending')

              // EmailJS configuration
              emailjs
                .send(
                  import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_oux7tbt',
                  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2mcsa1n',
                  {
                    name: formData.name,
                    email: formData.email,
                    title: formData.subject,
                    message: formData.message
                  },
                  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'SaLWLZnowVlRphHoG'
                )
                .then(
                  () => {
                    setFormStatus('success')
                    setFormData({ name: '', email: '', subject: '', message: '' })
                    setTimeout(() => setFormStatus('idle'), 5000)
                  },
                  () => {
                    setFormStatus('error')
                    setTimeout(() => setFormStatus('idle'), 5000)
                  }
                )
            }}
            className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20"
          >
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500">
                <i className="fa-solid fa-check-circle mr-2"></i>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                <i className="fa-solid fa-exclamation-circle mr-2"></i>
                Failed to send message. Please try again or email me directly.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors" />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors" />
            </div>

            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors mb-6" />

            <textarea name="message" rows={6} placeholder="Your Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors mb-6 resize-none"></textarea>

            <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-gradient-to-r from-red-terminal to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-red-terminal/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {formStatus === 'sending' ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-red-terminal/10 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-text/70 text-sm">© 2025 Ayub Abdi. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="https://github.com/Eyub-Abdi" target="_blank" rel="noopener noreferrer" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/eyub-abdi" target="_blank" rel="noopener noreferrer" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.youtube.com/@Red.Terminal" target="_blank" rel="noopener noreferrer" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
