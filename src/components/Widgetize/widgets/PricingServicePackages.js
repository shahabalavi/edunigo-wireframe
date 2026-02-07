import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import styles from "./PricingServicePackages.module.css";

const DEFAULT_PLANS = [
  { id: "basic", name: "Basic", description: "Document review", price: "From $99" },
  { id: "standard", name: "Standard", description: "Full application support", price: "From $299" },
  { id: "premium", name: "Premium", description: "Interview + scholarship guidance", price: "From $499" },
];

const PricingServicePackages = ({ config = {}, isRtl = false }) => {
  const navigate = useNavigate();
  const { featuredPlanId = "standard", plans = DEFAULT_PLANS } = config;

  const handleSelect = (id) => {
    navigate("#consultation");
  };

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Visa Support Packages</h2>
        <p className={styles.subtitle}>Choose the level of support that fits your needs</p>
        <div className={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.id === featuredPlanId ? styles.featured : ""}`}
            >
              {plan.id === featuredPlanId && <span className={styles.badge}>Popular</span>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.description}>{plan.description}</p>
              <p className={styles.price}>{plan.price}</p>
              <button
                type="button"
                className={styles.cta}
                onClick={() => handleSelect(plan.id)}
              >
                Get Started
              </button>
              <ul className={styles.features}>
                <li><Check size={16} /> Document review</li>
                <li><Check size={16} /> Application support</li>
                {plan.id !== "basic" && <li><Check size={16} /> Expert guidance</li>}
                {plan.id === "premium" && <li><Check size={16} /> Interview prep</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingServicePackages;
