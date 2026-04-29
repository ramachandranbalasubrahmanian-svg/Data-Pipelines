# Data Pipelines

**Enterprise-Grade Data Pipeline Management Platform**

Data Pipelines is a high-performance orchestration and monitoring platform designed for managing complex, multi-tenant data workflows. It provides real-time visibility into job execution, resource utilization, and client billing across a global infrastructure.

---

## 🚀 Key Features

### 1. Job Manager & Orchestration
*   **Multi-Status Tracking**: Real-time status monitoring (Running, Completed, Errored Out, Cancelled, Initialising, Queueing).
*   **Resource Allocation**: Fine-grained control over CPU, RAM, and Parallel Thread mapping (up to 400 threads/job).
*   **Execution Auditing**: Deep-dive logs and execution metrics for every job run.
*   **Configuration Upload**: Support for ZIP-based pipeline definitions directly from the dashboard.

### 2. Pipeline Lineage & Mapping
*   **Visual Blueprints**: Node-based lineage maps showing data flow from Extraction to Visualization.
*   **Topology Health**: Real-time monitoring of synchronization links between pipeline stages.
*   **Metadata Inventory**: Consolidated view of source systems (Salesforce, SAP) and downstream warehouses (BigQuery, Snowflake).

### 3. Data Freshness & SLA Tracking
*   **Freshness Scoreboard**: Real-time SLA monitoring for mission-critical data sources.
*   **Health Metrics**: Percentage-based health scoring for every synchronization link.
*   **Historical Trends**: 30-day velocity tracking to detect performance degradation before it impacts the business.

### 4. Tenant Management & Multi-Tenancy
*   **Isolated Data Views**: Seamless switching between multiple enterprise clients.
*   **Governance**: Role-Based Access Control (RBAC) and data isolation across tenants.
*   **Onboarding**: Automated tenant onboarding with specific capacity limits.

### 3. Billing & Predictive Usage
*   **Metered Billing**: Real-time tracking of execution hours against onboarded capacity.
*   **Predictive Analytics**: Machine learning-based usage forecasting to identify right-sizing opportunities.
*   **Overage Management**: Automated alerting and action-oriented workflows for over-utilization.

### 4. AI-Powered Incident Center
*   **Error Analysis**: Integrated Gemini AI for real-time root cause analysis of job failures.
*   **Automated KB Generation**: Instant creation of Knowledge Base (KB) articles and remediation plans.
*   **ServiceNow Integration**: Native ticketing hooks for enterprise support environments.

---

## 🎬 Product Demo Guide (Executive Summary)

This guide is designed for high-impact recording (GIF/Video) to showcase the platform to C-level stakeholders.

### Step 1: The Command Center (Overview Dashboard)
*   **Focus**: Global visibility and operational health.
*   **Visuals**: Highlight the **Success Rate (98.2%)** and the **Data Freshness Scoreboard**.
*   **Narrative**: "One view to rule all pipelines. We track data freshness in real-time, ensuring business decisions are made on current data, not stale logs."

### Step 2: Visual Lineage (Pipeline Maps)
*   **Focus**: Infrastructure control and transparency.
*   **Visuals**: Hover over the **Extract -> Transform -> Load** nodes. Show the active flow animations.
*   **Narrative**: "Complete observability. Our visual blueprints eliminate the 'black box' of data engineering, showing exactly how source data becomes business intelligence."

### Step 3: AI-Driven Resilience (Incidents)
*   **Focus**: Cost reduction and reduced MTTR (Mean Time To Recovery).
*   **Visuals**: Click into a 'Failed' job and trigger the **"Analyze with Gemini AI"** feature.
*   **Narrative**: "Self-healing infrastructure. When a pipeline breaks at 3 AM, our integrated AI performs an instant RCA and generates a remediation plan before the engineer even wakes up."

### Step 4: Revenue & Capacity (Billing)
*   **Focus**: Financial predictability and right-sizing.
*   **Visuals**: Expand a **"Client in Overage"** card. Point to the **"Predicted Usage"** metric.
*   **Narrative**: "Predictive P&L. We don't just bill; we forecast. The platform identifies which enterprise clients are scaling beyond their contract, turning overages into upsell opportunities."

---

## 🏛 Technical Architecture & Documentation

For a deep dive into the system internals and how to present the platform to stakeholders, please refer to the following documents:

*   **[Executive Demo Script](./EXECUTIVE_DEMO.md)**: A step-by-step narrative for showcasing the platform's value proposition.
*   **[Architectural Diagrams](./DIAGRAMS.md)**: Comprehensive technical blueprints including:
    *   **Data Flow Diagram (DFD)**: End-to-end data lifecycle.
    *   **C4 Model (Context & Container)**: High-level architectural boundaries.
    *   **Semantic Layer Blueprint**: Abstraction layer for metric consistency.

---

## 🛠 Tech Stack

*   **Frontend**: React (TypeScript), Tailwind CSS, Shadcn UI, Framer Motion (animations).
*   **Backend**: Vite (SPA/Client-Side), Firestore (Real-time NoSQL), Firebase Auth.
*   **Infrastructure**: Cloud-native architecture with Enterprise Edition Firestore governance.
*   **AI Engine**: Google Gemini for automated incident remediation.

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   NPM
*   Firebase CLI (for deployment)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/data-pipelines.git
   cd data-pipelines
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Firebase configuration.

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

---

## 🛡 Security & Compliance
*   **Security Rules**: Industry-standard Firestore security rules protecting all PII and sensitive metering data.
*   **Default Deny**: All cloud resources are restricted by default to authorized administrative accounts.

---

## 🤝 Contributing
For internal contributions, please follow our standard git-flow workflow. For external feature requests, please open an issue in the repository.

---

*Built with ❤️ on Google AI Studio*
