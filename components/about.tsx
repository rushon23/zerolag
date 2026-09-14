import { Cpu, Zap, Scale, Gauge, CheckCircle } from "lucide-react"
import styles from "./about.module.css"

const features = [
  {
    icon: <Cpu size={22} />,
    title: "AI Integration",
    description: "Custom-trained models that learn from your data and integrate seamlessly with existing systems.",
    benefits: ["Custom-trained models on your data", "Seamless integration", "Continuous improvement"],
  },
  {
    icon: <Zap size={22} />,
    title: "Intelligent Automation",
    description: "Automated agents that run 24/7 — handling complex tasks with precision at machine speed.",
    benefits: ["24/7 operation", "Consistent quality", "Rapid adaptation"],
  },
  {
    icon: <Scale size={22} />,
    title: "Infinite Scalability",
    description: "Elastic infrastructure that grows with your business — no performance degradation at any scale.",
    benefits: ["Scales on demand", "Microservices architecture", "Built-in redundancy"],
  },
  {
    icon: <Gauge size={22} />,
    title: "Optimized Performance",
    description: "Sub-second response times and optimized queries — your users will never feel lag.",
    benefits: ["Sub-second response times", "Optimized caching", "Efficient resource use"],
  },
]

export default function About() {
  return (
    <section className={styles.about}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.badge}>Why Choose ZeroLag</span>
        <h2 className={styles.title}>
          Transforming Ideas into<br />
          <span className={styles.accent}>Intelligent Solutions</span>
        </h2>
        <p className={styles.subtitle}>
          We combine cutting-edge AI with robust architecture to deliver
          software that scales effortlessly and performs with zero lag.
        </p>
      </div>

      {/* 2×2 Feature Grid */}
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardIcon}>{f.icon}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.description}</p>
            <ul className={styles.benefits}>
              {f.benefits.map((b) => (
                <li key={b}>
                  <CheckCircle size={14} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className={styles.cta}>
        <h3>Ready to <span className={styles.accent}>Transform</span> Your Business?</h3>
        <p>Partner with us to leverage cutting-edge AI and scalable architecture for your next project.</p>
        <a
          href="https://cal.com/zerolag/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Start Your Journey
        </a>
      </div>
    </section>
  )
}
