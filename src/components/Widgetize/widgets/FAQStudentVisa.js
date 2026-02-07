import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQStudentVisa.module.css";

const DEFAULT_FAQS = [
  { q: "How long does it take?", a: "Typically 4–12 weeks depending on country." },
  { q: "Can I work while studying?", a: "Most countries allow part-time work for students." },
  { q: "What if my visa is rejected?", a: "We help you reapply with stronger documentation." },
  { q: "Do I need IELTS?", a: "Most English-speaking destinations require proof of English proficiency." },
];

const FAQStudentVisa = ({ config = {}, isRtl = false }) => {
  const { accordionStyle = true, faqs = DEFAULT_FAQS } = config;
  const [openId, setOpenId] = useState(0);

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>FAQ for Student Visa</h2>
        <p className={styles.subtitle}>Common questions about studying abroad</p>
        <div className={accordionStyle ? styles.accordion : styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${accordionStyle && openId === i ? styles.open : ""}`}
            >
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpenId(accordionStyle ? (openId === i ? -1 : i) : null)}
                aria-expanded={accordionStyle && openId === i}
              >
                <span>{faq.q}</span>
                {accordionStyle && (
                  <span className={styles.icon}>
                    {openId === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                )}
              </button>
              {(accordionStyle ? openId === i : true) && (
                <div className={styles.answer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQStudentVisa;
