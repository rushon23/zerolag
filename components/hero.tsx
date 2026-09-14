import { Calendar, CheckCircle } from "lucide-react"
import styles from "./hero.module.css"

export default function Hero() {
  return (
    <div className={styles.hero}>
      {/* Pure CSS animated lines — GPU only, no JS */}
      <div className={styles.lines} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.line} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      {/* Fade-to-dark gradient at the bottom so next section looks seamless */}
      <div className={styles.fadeOut} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          Zero Lag.<br />
          <span className={styles.accent}>Maximum Impact.</span>
        </h1>

        <p className={styles.subline}>
          Partner with us to transform your ideas into{" "}
          <strong className={styles.highlight}>scalable</strong> and{" "}
          <strong className={styles.highlight}>intelligent</strong> software solutions.
        </p>

        <a
          href="https://cal.com/zerolag/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <Calendar size={18} />
          Schedule a Call
        </a>

        <ul className={styles.pills}>
          {["AI-Driven Development", "Scalable Architecture", "Intelligent Automation"].map((item) => (
            <li key={item} className={styles.pill}>
              <CheckCircle size={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
