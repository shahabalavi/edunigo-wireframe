import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  Clock,
  ShieldCheck,
  Users,
} from "lucide-react";
import styles from "./SupportRolesReport.module.css";

const initialRoles = [
  {
    id: 1,
    name: "Support Agent",
    team: "Support Core",
    activeAgents: 8,
    openTickets: 42,
    responseTimeHours: 3.2,
    resolutionTimeHours: 21.4,
    slaTargetHours: 4,
    resolutionTargetHours: 24,
    breaches: 6,
    breachesThisWeek: 2,
  },
  {
    id: 2,
    name: "Support Supervisor",
    team: "Support Core",
    activeAgents: 3,
    openTickets: 18,
    responseTimeHours: 2.1,
    resolutionTimeHours: 16.7,
    slaTargetHours: 4,
    resolutionTargetHours: 24,
    breaches: 2,
    breachesThisWeek: 0,
  },
  {
    id: 3,
    name: "Escalations Team",
    team: "Priority Desk",
    activeAgents: 4,
    openTickets: 12,
    responseTimeHours: 1.4,
    resolutionTimeHours: 10.2,
    slaTargetHours: 2,
    resolutionTargetHours: 12,
    breaches: 1,
    breachesThisWeek: 1,
  },
];

const defaultPenaltyConfig = {
  responseThresholdHours: 4,
  resolutionThresholdHours: 24,
  pointsPerBreach: 1,
  escalationThreshold: 6,
};

const SupportRolesReport = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRoleId, setSelectedRoleId] = useState(initialRoles[0].id);
  const [penaltyConfig, setPenaltyConfig] = useState({
    1: { ...defaultPenaltyConfig },
    2: { ...defaultPenaltyConfig },
    3: {
      responseThresholdHours: 2,
      resolutionThresholdHours: 12,
      pointsPerBreach: 2,
      escalationThreshold: 4,
    },
  });

  const selectedRole = roles.find((role) => role.id === selectedRoleId);

  const slaSummary = useMemo(() => {
    const totalTickets = roles.reduce((sum, role) => sum + role.openTickets, 0);
    const avgResponse =
      roles.reduce((sum, role) => sum + role.responseTimeHours, 0) /
      roles.length;
    const avgResolution =
      roles.reduce((sum, role) => sum + role.resolutionTimeHours, 0) /
      roles.length;
    const totalBreaches = roles.reduce((sum, role) => sum + role.breaches, 0);

    return {
      totalTickets,
      avgResponse: avgResponse.toFixed(1),
      avgResolution: avgResolution.toFixed(1),
      totalBreaches,
    };
  }, [roles]);

  const handlePenaltyChange = (field, value) => {
    setPenaltyConfig((prev) => ({
      ...prev,
      [selectedRoleId]: {
        ...prev[selectedRoleId],
        [field]: Number(value),
      },
    }));
  };

  const currentPenaltyPoints = useMemo(() => {
    if (!selectedRole) return 0;
    const config = penaltyConfig[selectedRoleId] || defaultPenaltyConfig;
    const breaches = selectedRole.breaches;
    return breaches * config.pointsPerBreach;
  }, [penaltyConfig, selectedRole, selectedRoleId]);

  const shouldEscalate = useMemo(() => {
    if (!selectedRole) return false;
    const config = penaltyConfig[selectedRoleId] || defaultPenaltyConfig;
    return selectedRole.breaches >= config.escalationThreshold;
  }, [penaltyConfig, selectedRole, selectedRoleId]);

  return (
    <div className={styles["report-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <BarChart3 size={24} />
          </div>
          <div>
            <h1>Support Role SLA Report</h1>
            <p>Monitor SLA performance and configure point-based penalties</p>
          </div>
        </div>
      </div>

      <div className={styles["summary-grid"]}>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-icon"]}>
            <Users size={18} />
          </div>
          <div>
            <p>Total Open Tickets</p>
            <h3>{slaSummary.totalTickets}</h3>
          </div>
        </div>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-icon"]}>
            <Clock size={18} />
          </div>
          <div>
            <p>Avg Response Time</p>
            <h3>{slaSummary.avgResponse}h</h3>
          </div>
        </div>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-icon"]}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <p>Avg Resolution Time</p>
            <h3>{slaSummary.avgResolution}h</h3>
          </div>
        </div>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-icon"]}>
            <AlertCircle size={18} />
          </div>
          <div>
            <p>Total SLA Breaches</p>
            <h3>{slaSummary.totalBreaches}</h3>
          </div>
        </div>
      </div>

      <div className={styles["content-grid"]}>
        <div className={styles["table-card"]}>
          <h2>Role Performance</h2>
          <table className={styles["roles-table"]}>
            <thead>
              <tr>
                <th>Role</th>
                <th>Team</th>
                <th>Open Tickets</th>
                <th>Avg Response</th>
                <th>Avg Resolution</th>
                <th>SLA Breaches</th>
                <th>Weekly Breaches</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className={
                    role.id === selectedRoleId ? styles["active-row"] : ""
                  }
                  onClick={() => setSelectedRoleId(role.id)}
                >
                  <td>{role.name}</td>
                  <td>{role.team}</td>
                  <td>{role.openTickets}</td>
                  <td>{role.responseTimeHours}h</td>
                  <td>{role.resolutionTimeHours}h</td>
                  <td>{role.breaches}</td>
                  <td>{role.breachesThisWeek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles["penalty-card"]}>
          <h2>Point Penalty Rules</h2>
          {selectedRole ? (
            <>
              <div className={styles["penalty-header"]}>
                <div>
                  <h3>{selectedRole.name}</h3>
                  <p>{selectedRole.team}</p>
                </div>
                <div className={styles["penalty-value"]}>
                  Accumulated Negative Points
                  <span>{currentPenaltyPoints}</span>
                </div>
              </div>

              <div className={styles["form-grid"]}>
                <label>
                  Response SLA (hours)
                  <input
                    type="number"
                    min="1"
                    value={penaltyConfig[selectedRoleId]?.responseThresholdHours}
                    onChange={(event) =>
                      handlePenaltyChange(
                        "responseThresholdHours",
                        event.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Resolution SLA (hours)
                  <input
                    type="number"
                    min="1"
                    value={
                      penaltyConfig[selectedRoleId]?.resolutionThresholdHours
                    }
                    onChange={(event) =>
                      handlePenaltyChange(
                        "resolutionThresholdHours",
                        event.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Points per Breach
                  <input
                    type="number"
                    min="0"
                    value={penaltyConfig[selectedRoleId]?.pointsPerBreach}
                    onChange={(event) =>
                      handlePenaltyChange(
                        "pointsPerBreach",
                        event.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Escalation Threshold (breaches)
                  <input
                    type="number"
                    min="0"
                    value={penaltyConfig[selectedRoleId]?.escalationThreshold}
                    onChange={(event) =>
                      handlePenaltyChange(
                        "escalationThreshold",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>

              <div className={styles["sla-details"]}>
                <div>
                  <span>Current SLA Targets</span>
                  <strong>
                    {penaltyConfig[selectedRoleId]?.responseThresholdHours}h / {" "}
                    {penaltyConfig[selectedRoleId]?.resolutionThresholdHours}h
                  </strong>
                </div>
                <div>
                  <span>Role SLA Targets</span>
                  <strong>
                    {selectedRole.slaTargetHours}h / {" "}
                    {selectedRole.resolutionTargetHours}h
                  </strong>
                </div>
                <div>
                  <span>Escalation Status</span>
                  <strong>
                    {shouldEscalate
                      ? "Escalated to Support Director"
                      : "Within threshold"}
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <p>Select a role to configure penalties.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportRolesReport;
