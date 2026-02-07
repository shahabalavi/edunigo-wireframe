import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SuccessStoriesTestimonials.module.css";

const DEFAULT_TESTIMONIALS = [
  { quote: "I got my visa in 6 weeks!", author: "Student", photo: "" },
  { quote: "They helped me with my SOP and embassy interview", author: "Student", photo: "" },
];

const SuccessStoriesTestimonials = ({ config = {}, isRtl = false }) => {
  const { layout = "slider", testimonials = DEFAULT_TESTIMONIALS } = config;
  const [index, setIndex] = useState(0);
  const current = testimonials[index] || testimonials[0];

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Success Stories</h2>
        <p className={styles.subtitle}>What our students say about their visa journey</p>
        {layout === "slider" && testimonials.length > 0 ? (
          <div className={styles.slider}>
            <button
              type="button"
              className={styles.nav}
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className={styles.slide}>
              <Quote className={styles.quoteIcon} size={32} />
              <blockquote className={styles.quote}>{current.quote}</blockquote>
              <cite className={styles.author}>— {current.author}</cite>
              {current.photo && (
                <img src={current.photo} alt="" className={styles.photo} />
              )}
            </div>
            <button
              type="button"
              className={styles.nav}
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.card}>
                <Quote className={styles.quoteIcon} size={24} />
                <p className={styles.quote}>{t.quote}</p>
                <cite className={styles.author}>— {t.author}</cite>
                {t.photo && <img src={t.photo} alt="" className={styles.photo} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesTestimonials;
