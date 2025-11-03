import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, FileText, Save, Check } from "lucide-react";
import styles from "./UniversityDocuments.module.css";

const UniversityDocuments = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const sampleUniversity = {
        id: parseInt(id),
        name: "Harvard University",
        logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=H",
      };

      const sampleDocuments = [
        {
          id: 3,
          name: "IELTS Certificate",
          description:
            "International English Language Testing System certificate",
          category: { name: "Language Certificates" },
          universitySpecific: true,
        },
        {
          id: 4,
          name: "TOEFL Score Report",
          description: "Test of English as a Foreign Language score report",
          category: { name: "Language Certificates" },
          universitySpecific: true,
        },
        {
          id: 6,
          name: "Bank Statement",
          description: "Financial proof document",
          category: { name: "Financial Documents" },
          universitySpecific: true,
        },
        {
          id: 7,
          name: "Letter of Recommendation",
          description: "Academic or professional recommendation letter",
          category: { name: "Recommendation Letters" },
          universitySpecific: true,
        },
      ];

      // Sample selected documents for this university
      const sampleSelected = [3, 4];

      setUniversity(sampleUniversity);
      setDocuments(sampleDocuments);
      setSelectedDocuments(sampleSelected);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDocumentToggle = (documentId) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving university documents:", {
      universityId: university.id,
      documentIds: selectedDocuments,
    });
    setIsSaving(false);
    // Show success message
    alert("University documents saved successfully!");
  };

  const handleBack = () => {
    navigate(`/admin/universities/manage/${id}`);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className={styles["error-container"]}>
        <h3>University Not Found</h3>
        <button onClick={handleBack} className={styles["back-btn"]}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles["university-documents-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <FileText size={24} />
          </div>
          <div>
            <h1>Required Documents</h1>
            <p>Select documents required for {university.name}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className={styles["save-btn"]}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className={styles["loading-spinner"]}></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className={styles["info-box"]}>
        <p>
          Select the documents that students must submit when applying to{" "}
          {university.name}. Only university-specific documents are shown here.
          Auto-attached documents are automatically included for all
          applications.
        </p>
      </div>

      {/* Documents List */}
      <div className={styles["documents-section"]}>
        {documents.length === 0 ? (
          <div className={styles["empty-state"]}>
            <FileText size={48} className={styles["empty-icon"]} />
            <h3>No University-Specific Documents Available</h3>
            <p>
              Create university-specific documents in the Documents module to
              assign them here.
            </p>
          </div>
        ) : (
          <div className={styles["documents-grid"]}>
            {documents.map((document) => (
              <div
                key={document.id}
                className={[
                  styles["document-card"],
                  selectedDocuments.includes(document.id)
                    ? styles["selected"]
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleDocumentToggle(document.id)}
              >
                <div className={styles["document-checkbox"]}>
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={() => handleDocumentToggle(document.id)}
                  />
                  {selectedDocuments.includes(document.id) && (
                    <Check size={16} className={styles["check-icon"]} />
                  )}
                </div>
                <div className={styles["document-content"]}>
                  <div className={styles["document-header"]}>
                    <h3>{document.name}</h3>
                    <span className={styles["category-badge"]}>
                      {document.category.name}
                    </span>
                  </div>
                  <p className={styles["document-description"]}>
                    {document.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDocuments;
