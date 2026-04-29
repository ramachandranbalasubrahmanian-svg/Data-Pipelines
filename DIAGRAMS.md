# 🏗 System Architecture & Data Flow

This document outlines the technical blueprints of the Enterprise Data Pipeline platform using Mermaid.js.

---

## 1. Data Flow Diagram (DFD)
This diagram illustrates the movement of data from external source systems through the internal processing layers to the final visualization endpoints.

```mermaid
graph LR
    subgraph External_Sources [External Data Sources]
        direction TB
        CRM[Salesforce CRM]
        ERP[SAP HANA ERP]
        LAKE[AWS S3 / GCS]
    end

    subgraph Platform_Ingestion [Ingestion & Extraction]
        direction TB
        ING[Ingestion Service]
        VAL[Schema Validation]
        CRYP[PII Encryption]
    end

    subgraph Processing_Layer [Processing & Transformation]
        direction TB
        SPARK[Apache Spark]
        DBT[dbt Core Models]
        SEM[Semantic Logic Engine]
    end

    subgraph Storage_Analytics [Analytics Store]
        direction TB
        BQ[Google BigQuery]
        SNOW[Snowflake]
    end

    subgraph Presentation [Visualization]
        direction TB
        BI[Looker / PowerBI]
        APP[Custom Data Apps]
    end

    CRM & ERP & LAKE --> ING
    ING --> VAL --> CRYP
    CRYP --> SPARK
    SPARK --> DBT
    DBT --> SEM
    SEM --> BQ & SNOW
    BQ & SNOW --> BI & APP
```

---

## 2. Semantic Layer Diagram
The Semantic Layer acts as an abstraction between physical warehouse tables and business consumption, centralizing metric definitions.

```mermaid
graph TD
    subgraph Warehouse_Tables [Physical Data Store]
        T1[(fct_sales)]
        T2[(dim_customers)]
        T3[(fct_subscriptions)]
    end

    subgraph Semantic_Layer [The Semantic Layer]
        direction TB
        MAP[Metadata Mapping Layer]
        LOGIC[Business Logic / Metrics]
        GOV[Governance & Masking]
        
        MAP --- LOGIC
        LOGIC --- GOV
    end

    subgraph Consistency_Out [Consumption Connectors]
        direction LR
        SQL[SQL Connector]
        GQL[GraphQL API]
        REST[REST Metrics Export]
    end

    T1 & T2 & T3 --> MAP
    GOV --> SQL & GQL & REST
    
    style Semantic_Layer fill:#f0f7ff,stroke:#3b82f6,stroke-width:2px
```

---

## 3. C4 Model Diagrams

### Level 1: System Context Diagram
Shows the platform's relationship with external users and systems.

```mermaid
C4Context
    title System Context Diagram for Enterprise Data Pipeline
    
    Person(admin, "Data Engineer", "Manages pipelines and monitors health.")
    Person(analyst, "Business Analyst", "Consumes processed data for BI.")
    
    System(platform, "Pipeline Platform", "Orchestrates data flow, manages tenants, and runs AI diagnostics.")
    
    System_Ext(sources, "Source Systems", "Salesforce, SAP, AWS S3.")
    System_Ext(warehouses, "Data Warehouses", "BigQuery, Snowflake.")
    System_Ext(auth, "Identity Provider", "Firebase / Google Auth.")

    Rel(admin, platform, "Configures and monitors")
    Rel(analyst, warehouses, "Queries cleaned data")
    Rel(platform, sources, "Extracts data from")
    Rel(platform, warehouses, "Loads data into")
    Rel(platform, auth, "Authenticates users via")
```

### Level 2: Container Diagram
Shows the high-level internal structure of the platform.

```mermaid
C4Container
    title Container Diagram for Enterprise Data Pipeline

    Person(user, "User", "Data Engineer / Architect")

    Container_Boundary(c1, "Platform Containers") {
        Container(spa, "Single Page App", "React, Tailwind", "Provides the dashboard UI for monitoring.")
        Container(api, "API Gateway", "Node.js / Express", "Handles requests, management logic, and AI analysis.")
        Container(db_meta, "Metadata Store", "Firestore", "Stores tenant config, job logs, and pipeline blueprints.")
        Container(engine, "Execution Engine", "Worker Cluster", "The runner that triggers and monitors actual data jobs.")
    }

    System_Ext(ext_api, "Source APIs", "REST/GraphQL")
    System_Ext(ext_wh, "Warehouse APIs", "gRPC/SQL")

    Rel(user, spa, "Uses", "HTTPS")
    Rel(spa, api, "Calls", "JSON/HTTPS")
    Rel(api, db_meta, "Reads/Writes", "Firestore SDK")
    Rel(api, engine, "Triggers Jobs", "Internal RPC")
    Rel(engine, ext_api, "Extracts from")
    Rel(engine, ext_wh, "Loads to")
```

---

## 4. Key Architectural Pillars
1.  **Multi-Tenancy**: Data is strictly logically isolated at the API and Metadata layers.
2.  **AI-Resilience**: Gemini AI is integrated into the API gateway to analyze error logs fetched from the Metadata Store.
3.  **Stateless Compute**: The Execution Engine uses short-lived worker nodes for scalability.
4.  **Observer Pattern**: Every job emits events to the Metadata Store, which the SPA listens to in real-time.

---

## 🛠 Freeware Diagramming Tools
The diagrams above are written in **Mermaid.js** syntax. This is the industry standard for "Diagrams as Code."

*   **Viewing/Editing**: You can copy-paste the code blocks into the [Mermaid Live Editor](https://mermaid.live/) (Free/Open Source).
*   **Documentation**: Mermaid is natively supported by GitHub, GitLab, and VS Code (via plugins), allowing you to keep diagrams in sync with your source code.
*   **Exporting**: These tools allow you to export high-resolution PNG, SVG, or PDF files for inclusion in slide decks.
