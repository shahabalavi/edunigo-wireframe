import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import styles from "./ImmigrationFooterWidget.module.css";

const ImmigrationFooterWidget = ({ config = {}, isRtl = false }) => {
  const {
    variant = "full",
    whatsAppLink = "",
    showSocialMedia = true,
    showLegalDisclaimer = true,
    contactEmail = "visa@edunigo.com",
  } = config;

  const isMinimal = variant === "minimal";

  return (
    <footer className={`${styles.footer} ${isMinimal ? styles.minimal : ""} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        {!isMinimal && (
          <div className={styles.top}>
            <div className={styles.brand}>
              <h3 className={styles.brandName}>EduniGo Visa</h3>
              <p className={styles.tagline}>Your gateway to study abroad</p>
            </div>
            <div className={styles.contact}>
              <a href={`mailto:${contactEmail}`} className={styles.link}>
                <Mail size={18} />
                {contactEmail}
              </a>
              {whatsAppLink && (
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              )}
            </div>
            {showSocialMedia && (
              <div className={styles.social}>
                <span className={styles.socialLabel}>Follow us</span>
                <div className={styles.socialLinks}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
                </div>
              </div>
            )}
          </div>
        )}
        {showLegalDisclaimer && (
          <p className={styles.disclaimer}>
            This is not legal advice. Visa requirements vary by country. Consult official sources and our advisors for your situation.
          </p>
        )}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} EduniGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ImmigrationFooterWidget;
