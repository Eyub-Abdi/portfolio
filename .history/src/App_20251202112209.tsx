import { useState, useEffect } from 'react'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

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
    { name: 'Penetration Testing', icon: '🔓', description: 'Ethical hacking & vulnerability assessment' },
    { name: 'Network Security', icon: '🌐', description: 'Firewalls, IDS/IPS, VPN configuration' },
    { name: 'Linux & Kali', icon: '🐧', description: 'Advanced Linux systems & security tools' },
    { name: 'Python & Scripting', icon: '🐍', description: 'Security automation & exploit development' },
    { name: 'Web Security', icon: '🔒', description: 'OWASP Top 10, SQL injection, XSS' },
    { name: 'Malware Analysis', icon: '🦠', description: 'Reverse engineering & threat analysis' }
  ]

  const projects = [
    {
      title: 'Network Vulnerability Scanner',
      description: 'Automated tool for detecting security vulnerabilities in networks',
      tech: ['Python', 'Nmap', 'Scapy', 'SQLite'],
      link: '#'
    },
    {
      title: 'Password Strength Analyzer',
      description: 'Advanced password security tool with breach detection',
      tech: ['Python', 'HIBP API', 'Flask', 'React'],
      link: '#'
    },
    {
      title: 'Web Application Firewall',
      description: 'Custom WAF for detecting and blocking malicious requests',
      tech: ['Python', 'ModSecurity', 'Nginx', 'ML'],
      link: '#'
    },
    {
      title: 'Security Awareness Platform',
      description: 'Educational platform for cybersecurity training',
      tech: ['React', 'Node.js', 'MongoDB', 'Gamification'],
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-gray-text">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-red-terminal/10' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={e => {
                e.preventDefault()
                scrollToSection('home')
              }}
              className="text-red-terminal text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              &lt;Ayub Abdi /&gt;
            </a>

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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-bg to-panel-bg"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-terminal rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-terminal rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 overflow-hidden">
            <p className="text-red-terminal text-sm md:text-base font-semibold uppercase tracking-widest mb-4 animate-fade-in">Welcome to My Portfolio</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm <span className="text-red-terminal">Your Name</span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-gray-text/90 mb-8">Full Stack Developer & Designer</h2>

          <p className="text-lg md:text-xl text-gray-text/80 max-w-2xl mx-auto mb-12 leading-relaxed">I craft beautiful, functional, and user-centered digital experiences. Let's build something amazing together.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              <p className="text-lg text-gray-text/90 leading-relaxed">
                I'm a passionate cybersecurity professional specializing in penetration testing, vulnerability assessment, 
                and ethical hacking. With a deep understanding of both offensive and defensive security, I help organizations 
                protect their digital assets.
              </p>

              <p className="text-lg text-gray-text/90 leading-relaxed">
                My journey in cybersecurity started with a fascination for how systems work and how they can be secured. 
                Today, I focus on identifying vulnerabilities before malicious actors can exploit them.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-red-terminal mb-4">Quick Facts</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="text-red-terminal">▹</span>
                    <span>🎓 Certified Ethical Hacker (CEH)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-terminal">▹</span>
                    <span>🛡️ OSCP & Security+</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-terminal">▹</span>
                    <span>📍 Based in East Africa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-terminal">▹</span>
                    <span>💻 Kali Linux Enthusiast</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-terminal/20 to-transparent rounded-2xl p-8 border border-red-terminal/30">
                <div className="w-full h-full bg-panel-bg rounded-xl flex items-center justify-center text-8xl">🛡️</div>
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
            <p className="text-gray-text/80 max-w-2xl mx-auto">
              Core competencies in offensive security, vulnerability research, and security architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group bg-panel-bg border-l-4 border-red-terminal p-6 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-red-terminal/20">
                <div className="text-4xl mb-4">{skill.icon}</div>
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
            <p className="text-gray-text/80 max-w-2xl mx-auto">A selection of my recent work and side projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-panel-bg rounded-xl overflow-hidden border border-gray-text/10 hover:border-red-terminal/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-terminal/20">
                <div className="aspect-video bg-gradient-to-br from-red-terminal/20 to-panel-bg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">💻</div>

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
            <p className="text-gray-text/80 max-w-2xl mx-auto">
              Need a security assessment or penetration test? Let's discuss how I can help secure your infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a href="mailto:ayubabdi@protonmail.com" className="text-red-terminal hover:underline">
                ayubabdi@protonmail.com
              </a>
            </div>

            <div className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-white mb-2">Social</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-text hover:text-red-terminal transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form className="bg-panel-bg p-8 rounded-xl border border-red-terminal/20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors" />
            </div>

            <input type="text" placeholder="Subject" className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors mb-6" />

            <textarea rows={6} placeholder="Your Message" className="w-full px-4 py-3 bg-dark-bg border border-gray-text/20 rounded-lg text-white placeholder-gray-text/50 focus:border-red-terminal focus:outline-none transition-colors mb-6 resize-none"></textarea>

            <button type="submit" className="w-full bg-gradient-to-r from-red-terminal to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-red-terminal/30">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-red-terminal/10 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-text/70 text-sm">© 2025 Your Name. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-text/70 hover:text-red-terminal transition-colors text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
