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

### 2. Tenant Management & Multi-Tenancy
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
