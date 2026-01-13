# RecoveryOS Overview

## The Complete OS for Cognitive Change

RecoveryOS is a comprehensive platform that transforms individual, professional, and organizational recovery through evidence-based cognitive change algorithms. This document provides the high-level overview of the system architecture and principles.

## Core Principles

### 1. Evidence-First Architecture
- Every decision must be backed by observable proof
- Unknown ≠ Fail: Proper handling of missing data
- Integrity gates prevent over-personalization

### 2. Cognitive Change State Space
The system operates on five latent state dimensions:
- **Arousal (A)**: Nervous system readiness (energy, clarity, connection)
- **Context (C)**: Current situational factors (work, evening, conflict, etc.)
- **Belief (B)**: Schema strength and plasticity for each scope
- **Knowledge (K)**: Available moves and proficiency levels
- **Proof (P)**: Consolidated evidence ledger

### 3. Four Evidence Classes
- **Receipts**: "I did the move" - builds capability
- **Transfer**: "It held in real life" - dissolves schema grip
- **Prediction Errors**: "World contradicted schema" - increases plasticity
- **Stability**: Baseline shift measurement

## System Architecture

### Three Surfaces
1. **Companion**: Individual user experience
2. **Console**: Professional/clinician interface
3. **Command Center**: Organizational oversight

### Nine Rails (Data Flow)
1. Identity & Tenancy
2. Consent & Entitlements
3. Signals & State
4. Context & Risk
5. Candidate Discovery
6. Safety & Policy
7. Ranking & Selection
8. Delivery & Exposure Truth
9. Interaction → Proof → Learning → Reporting

### Integrity Runtime
- **DIS (Data Integrity Score)**: Throttles personalization based on data quality
- **GC (Guidance Confidence)**: Caps confidence by integrity
- **Truth Semantics**: observed/attempted/unknown/not_eligible

## Mathematical Foundation

### Master Equation
```
a*(t) = argmax V(u,t,a) s.t. Safety=allow, Consent=ok, Integrity≥θ
```

### Key Components
- **Normalization**: Everything becomes 0..1 bounded features
- **Gating**: Binary constraints (consent, safety, band, cadence, fatigue)
- **Scoring**: Linear combination of features with exploration bonus
- **Routing**: Bucket logic (DOWN_SHIFT/TRANSFER/GROWTH/SUPPORT)
- **Learning**: Reward = engagement + proof delta - safety penalty

## Implementation Roadmap

### Sprint 1: Trust Foundation
- Entitlements + Device Fabric + Consent Ledger
- Basic integrity runtime
- Core API contracts

### Sprint 2: Safety Closure
- Risk windows, prediction errors
- Safety escalation protocols
- Receipt compliance

### Sprint 3: Proof Translation
- Transfer test orchestration
- Schema plasticity updates
- Evidence-grade reporting

### Sprint 4: Ports & Org Evidence
- Connector bus integration
- Org fleet model
- Evidence packs

### Sprint 5: Professional Spine
- Workflow orchestration
- Editorial QA
- Clinician interfaces

### Sprint 6: Identity & QA
- Identity primitives
- Quality assurance
- System validation

## API Contract Pack

17+ JSON schemas for stable frontend consumption:
- SessionContext, EntitlementsSnapshot, DeviceRegistration
- ConsentSnapshot, StateSnapshot, ContextSnapshot
- QueueItemNow, ContentRenderable, Receipt
- ProofSnapshot, ProofByScope, ProofChainSummary
- EscalationCase, ConnectorStatus, SignalsSummary
- OutcomesSnapshot, SupportGraph, CarePlan

## Integrity Playbook

### Global Integrity Taxonomy
- **Truth Statuses**: observed, attempted, unknown, not_eligible
- **Qualifications**: freshness01, completeness01, confidence01
- **Trace Links**: decision_id, exposure_ack_id, receipt_id, etc.

### Any Angle Views
12 canonical truth views for complete auditability:
1. User Moment Replay
2. Decision Integrity
3. Policy Explanation
4. Consent Proof
5. Delivery Truth
6. Receipt Compliance
7. Transfer Eligibility
8. Proof Delta Attribution
9. Reward Components
10. Clinician Signal Feed
11. Org Evidence Pack
12. Audit Trail

## Next Steps

1. **Implement Integrity Runtime**: DIS + GC in routing
2. **Enforce Exposure Truth**: Split delivery_attempt vs exposure_ack
3. **Receipt Compliance Engine**: Grace windows and resistance signals
4. **Transfer Eligibility Rules**: Proper denominator handling
5. **Evidence-Grade Reporting**: KPI definitions with completeness policy

---

*This document is part of the RecoveryOS specification. All content is versioned and auditable.*