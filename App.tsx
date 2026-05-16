import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, ExternalLink, Mail, Menu, X, Terminal, Code, Cpu } from "lucide-react";
import { SiJavascript, SiTypescript, SiPython, SiReact, SiNodedotjs, SiExpress, SiNextdotjs, SiGit, SiDocker, SiPostgresql, SiFigma, SiPhp } from "react-icons/si";
import "./portfolio.css";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

const navItems = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const projects = [
  {
    title: "TaskFlow",
    description: "A full-stack task management app with real-time updates and collaborative features.",
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    github: "#",
    live: "#",
  },
  {
    title: "WeatherNow",
    description: "Clean weather dashboard with geolocation and interactive forecasting.",
    tags: ["React", "TypeScript", "OpenWeatherMap API"],
    github: "#",
    live: "#",
  },
  {
    title: "DevBlog",
    description: "A markdown-powered personal blog with syntax highlighting and SEO optimization.",
    tags: ["Next.js", "MDX", "CSS"],
    github: "#",
    live: "#",
  },
  {
    title: "ShopCart",
    description: "E-commerce storefront with cart, checkout, and inventory management.",
    tags: ["React", "PHP", "MySQL", "Stripe"],
    github: "#",
    live: "#",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormMsg(data.message);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
        setFormMsg(data.errors?.join(" ") ?? "Something went wrong.");
      }
    } catch {
      setFormStatus("error");
      setFormMsg("Could not reach the server. Please try again.");
    }
  };

  return (
    <div className="page">
      {/* ── Navigation ── */}
      <header className={`nav-header${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollToSection("hero")}>AR.</button>

          <nav className="nav-links">
            {navItems.map((item) => (
              <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}>
                {item.name}
              </button>
            ))}
            <button className="btn btn-outline-pill" onClick={() => scrollToSection("contact")}>
              Say Hello
            </button>
          </nav>

          <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className="mobile-menu-link"
                onClick={() => { scrollToSection(item.id); setMobileOpen(false); }}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="section hero-section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeIn} className="hero-eyebrow">
                <span className="eyebrow-line" /> Hello, my name is
              </motion.p>
              <motion.h1 variants={fadeIn} className="hero-name">Alex Rivera.</motion.h1>
              <motion.h2 variants={fadeIn} className="hero-tagline">
                I build things for the web.
              </motion.h2>
              <motion.p variants={fadeIn} className="hero-bio">
                I'm a full-stack developer specializing in building exceptional digital experiences.
                Currently focused on accessible, human-centered products with precision and care.
              </motion.p>
              <motion.div variants={fadeIn} className="hero-cta">
                <button className="btn btn-primary" onClick={() => scrollToSection("projects")}>
                  View Projects
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("contact")}>
                  Contact Me
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="section about-section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.div variants={fadeIn} className="section-heading">
                <h2>About Me</h2>
                <div className="heading-rule" />
              </motion.div>

              <div className="about-grid">
                <motion.div variants={fadeIn} className="about-text">
                  <p>
                    Hello! I'm Alex, a developer who enjoys creating things that live on the internet.
                    My interest in web development started back when I decided to try editing custom Tumblr
                    themes — turns out hacking together HTML and CSS taught me a lot about architecture and design.
                  </p>
                  <p>
                    Fast-forward to today, and I've had the privilege of working at an advertising agency,
                    a start-up, a huge corporation, and a student-led design studio. My main focus these days
                    is building accessible, inclusive products and digital experiences.
                  </p>
                  <p>
                    When I'm not at the computer, I'm usually reading, hanging out with my cats, or exploring
                    local coffee shops to find the perfect pour-over.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn} className="about-avatar-wrap">
                  <div className="about-avatar-inner">
                    <div className="about-avatar-placeholder">AR</div>
                    <div className="about-avatar-overlay" />
                  </div>
                  <div className="about-avatar-border" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.div variants={fadeIn} className="section-heading section-heading--right">
                <div className="heading-rule" />
                <h2>The Toolkit</h2>
              </motion.div>

              <div className="skills-grid">
                <motion.div variants={fadeIn} className="skill-card">
                  <div className="skill-icon"><Terminal size={24} /></div>
                  <h3>Languages</h3>
                  <ul className="skill-list">
                    <li><SiJavascript className="icon-js" /> JavaScript (ES6+)</li>
                    <li><SiTypescript className="icon-ts" /> TypeScript</li>
                    <li><SiPython className="icon-py" /> Python</li>
                    <li><SiPhp className="icon-php" /> PHP</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="skill-card">
                  <div className="skill-icon"><Code size={24} /></div>
                  <h3>Frameworks</h3>
                  <ul className="skill-list">
                    <li><SiReact className="icon-react" /> React &amp; React Native</li>
                    <li><SiNextdotjs /> Next.js</li>
                    <li><SiNodedotjs className="icon-node" /> Node.js</li>
                    <li><SiExpress /> Express</li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="skill-card">
                  <div className="skill-icon"><Cpu size={24} /></div>
                  <h3>Tools</h3>
                  <ul className="skill-list">
                    <li><SiGit className="icon-git" /> Git &amp; GitHub</li>
                    <li><SiDocker className="icon-docker" /> Docker</li>
                    <li><SiPostgresql className="icon-pg" /> PostgreSQL</li>
                    <li><SiFigma className="icon-figma" /> Figma</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.div variants={fadeIn} className="section-heading">
                <h2>Featured Work</h2>
                <div className="heading-rule" />
              </motion.div>

              <div className="projects-grid">
                {projects.map((proj, i) => (
                  <motion.div key={i} variants={fadeIn} className="project-card">
                    <div className="project-card-top">
                      <div className="project-icon"><ExternalLink size={20} /></div>
                      <div className="project-links">
                        <a href={proj.github} aria-label="GitHub" className="project-link"><Github size={20} /></a>
                        <a href={proj.live} aria-label="Live Demo" className="project-link"><ExternalLink size={20} /></a>
                      </div>
                    </div>
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>
                    <ul className="project-tags">
                      {proj.tags.map((tag, j) => <li key={j} className="project-tag">{tag}</li>)}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section contact-section">
          <div className="container container--narrow">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeIn} className="contact-eyebrow">What's Next?</motion.p>
              <motion.h2 variants={fadeIn} className="contact-title">Get In Touch</motion.h2>
              <motion.p variants={fadeIn} className="contact-bio">
                Although I'm not currently looking for any new opportunities, my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </motion.p>

              <motion.form variants={fadeIn} className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    className="form-input form-textarea"
                    placeholder="Hello..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>

                {formStatus === "success" && <p className="form-feedback form-feedback--ok">{formMsg}</p>}
                {formStatus === "error"   && <p className="form-feedback form-feedback--err">{formMsg}</p>}

                <button type="submit" className="btn btn-primary btn--full" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending…" : "Send Message"}
                </button>
              </motion.form>

              <motion.div variants={fadeIn} className="social-links">
                <a href="#" className="social-link" aria-label="GitHub"><Github size={24} /></a>
                <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={24} /></a>
                <a href="#" className="social-link" aria-label="Twitter"><Twitter size={24} /></a>
                <a href="#" className="social-link" aria-label="Email"><Mail size={24} /></a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Designed &amp; Built by Alex Rivera</p>
        <span>&copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
