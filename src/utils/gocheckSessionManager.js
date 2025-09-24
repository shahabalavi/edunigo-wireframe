// GoCheck Session Manager Utility
// This utility helps manage GoCheck questionnaire sessions and data

export const generateSessionId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Get current active session ID
export const getCurrentSessionId = () => {
  return localStorage.getItem("currentGoCheckSession");
};

// Get session data by ID
export const getSessionData = (sessionId) => {
  try {
    const data = localStorage.getItem(sessionId);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing session data:", error);
    return null;
  }
};

// Get all completed sessions
export const getCompletedSessions = () => {
  try {
    const completedIds = JSON.parse(
      localStorage.getItem("completedGoCheckSessions") || "[]"
    );
    return completedIds
      .map((id) => getSessionData(id))
      .filter((data) => data !== null);
  } catch (error) {
    console.error("Error getting completed sessions:", error);
    return [];
  }
};

// Get the most recent completed session
export const getLatestCompletedSession = () => {
  const completedSessions = getCompletedSessions();
  if (completedSessions.length === 0) return null;

  // Sort by completion time and return the most recent
  return completedSessions.sort(
    (a, b) => new Date(b.completedTime) - new Date(a.completedTime)
  )[0];
};

// Update session data
export const updateSessionData = (sessionId, updates) => {
  try {
    const existingData = getSessionData(sessionId) || {};
    const updatedData = {
      ...existingData,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(sessionId, JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    console.error("Error updating session data:", error);
    return null;
  }
};

// Clear session data (for logout or cleanup)
export const clearSessionData = (sessionId) => {
  try {
    localStorage.removeItem(sessionId);
    const completedSessions = JSON.parse(
      localStorage.getItem("completedGoCheckSessions") || "[]"
    );
    const updatedSessions = completedSessions.filter((id) => id !== sessionId);
    localStorage.setItem(
      "completedGoCheckSessions",
      JSON.stringify(updatedSessions)
    );
  } catch (error) {
    console.error("Error clearing session data:", error);
  }
};

// Check if user has completed GoCheck questionnaire
export const hasCompletedGoCheck = () => {
  const completedSessions = getCompletedSessions();
  return completedSessions.length > 0;
};

// Get user's GoCheck answers for profile display
export const getUserGoCheckAnswers = () => {
  const latestSession = getLatestCompletedSession();
  return latestSession ? latestSession.answers : null;
};

// Get user's selected university
export const getUserSelectedUniversity = () => {
  const latestSession = getLatestCompletedSession();
  return latestSession ? latestSession.selectedUniversity : null;
};

// Get user's additional Go Check answers (dashboard questions)
export const getUserAdditionalAnswers = () => {
  const latestSession = getLatestCompletedSession();
  return latestSession ? latestSession.additionalAnswers : null;
};

// Check if user has completed additional questions
export const hasCompletedAdditionalQuestions = () => {
  const latestSession = getLatestCompletedSession();
  return latestSession ? latestSession.additionalQuestionsCompleted : false;
};

// Get user's top matches
export const getUserTopMatches = () => {
  const latestSession = getLatestCompletedSession();
  return latestSession ? latestSession.topMatches : null;
};

// Reset GoCheck state - clears current session and all data
export const resetGoCheckState = () => {
  try {
    // Get current session ID
    const currentSessionId = getCurrentSessionId();

    // Clear current session data if it exists
    if (currentSessionId) {
      localStorage.removeItem(currentSessionId);
    }

    // Clear current session ID
    localStorage.removeItem("currentGoCheckSession");

    // Clear all completed sessions
    localStorage.removeItem("completedGoCheckSessions");

    // Clear any auth continuation flags
    localStorage.removeItem("continueGoCheckAfterAuth");

    console.log("GoCheck state has been reset");
    return true;
  } catch (error) {
    console.error("Error resetting GoCheck state:", error);
    return false;
  }
};
