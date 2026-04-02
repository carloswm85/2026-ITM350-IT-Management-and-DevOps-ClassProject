- [Workplan for .NET Core DevOps Final Project](#workplan-for-net-core-devops-final-project)
  - [Project Overview](#project-overview)
  - [Milestones](#milestones)
    - [1. Repository \& Source Control Setup](#1-repository--source-control-setup)
    - [2. Project Initialization](#2-project-initialization)
    - [3. Containerization (Docker)](#3-containerization-docker)
    - [4. Testing Strategy (Quality Assurance)](#4-testing-strategy-quality-assurance)
    - [5. CI Pipeline (Build Automation)](#5-ci-pipeline-build-automation)
    - [6. Docker Hub Integration](#6-docker-hub-integration)
    - [7. Infrastructure as Code (IaC)](#7-infrastructure-as-code-iac)
    - [8. CD Pipeline (Release Automation)](#8-cd-pipeline-release-automation)
    - [9. Deployment Validation](#9-deployment-validation)
    - [10. Documentation \& Final Report](#10-documentation--final-report)
  - [Timeline](#timeline)
    - [Suggested Next Steps](#suggested-next-steps)
  - [Resources](#resources)
  - [Review Process](#review-process)
  - [Compliance Checklist (Final Validation)](#compliance-checklist-final-validation)
  - [Success Criteria](#success-criteria)
  - [Requirements covered](#requirements-covered)

---

# Workplan for .NET Core DevOps Final Project

## Project Overview

This workplan aligns the project execution with all **Final Project requirements**: Git collaboration, automated testing, containerization, CI/CD, Infrastructure as Code (IaC), and **fully automated AWS deployment without manual access**.

---

## Milestones

### 1. Repository & Source Control Setup

- Create a **team GitHub repository**
- Define branching strategy:
  - `main` (protected)
  - `develop`
  - feature branches (`feature/*`)

- Enforce:
  - Pull Requests (PRs) for all changes
  - Code reviews before merge

- Configure:
  - Branch protection rules (require PR + checks)

---

### 2. Project Initialization

- Create a **.NET Core Web Application**
- Define clean architecture structure
- Add initial endpoints (health check, sample feature)
- Configure environment-based settings

---

### 3. Containerization (Docker)

- Create `Dockerfile`
- Optimize build using multi-stage builds
- Test container locally
- Tag image using versioning strategy

---

### 4. Testing Strategy (Quality Assurance)

- Implement:
  - Unit tests (business logic)
  - Integration tests (API / DB if applicable)

- Ensure:
  - Tests run automatically in CI
  - All tests must pass before merge

---

### 5. CI Pipeline (Build Automation)

Using **GitHub Actions**:

- Trigger on PR and push
- Steps:
  - Restore dependencies
  - Build project
  - Run tests
  - Fail pipeline on errors

---

### 6. Docker Hub Integration

- Create Docker Hub repository
- Automate:
  - Build Docker image in CI
  - Push image to Docker Hub

- Use secure credentials (GitHub Secrets)

---

### 7. Infrastructure as Code (IaC)

Using **Terraform**:

- Define AWS infrastructure:
  - EC2 instance
  - Security groups
  - Networking (basic VPC or default)

- Parameterize configuration
- Ensure:
  - No manual AWS setup required

---

### 8. CD Pipeline (Release Automation)

- Extend GitHub Actions pipeline:

Steps:

- Provision infrastructure via Terraform
- Pull Docker image from Docker Hub
- Deploy container to EC2

Constraints:

- **No manual login to AWS allowed**
- Everything must run via pipeline

---

### 9. Deployment Validation

- Verify application is running on EC2
- Capture:
  - Public URL
  - Running application screenshot

---

### 10. Documentation & Final Report

Prepare final report including:

- Project description
  - Problem being solved

- AWS deployment:
  - EC2 public URL
  - Screenshot of running app

- Links:
  - GitHub repository
  - Docker Hub image

- Lessons learned

---

## Timeline

| Phase  | Focus                               |
| ------ | ----------------------------------- |
| Step 1 | Repo setup + Project initialization |
| Step 2 | Docker + Testing                    |
| Step 3 | CI pipeline + Docker Hub            |
| Step 4 | Terraform (IaC)                     |
| Step 5 | CD pipeline (AWS deployment)        |
| Step 6 | Validation + Report                 |

### Suggested Next Steps

Generate:

- A ready-to-use **GitHub Actions workflow**
- A **Terraform template for EC2**
- A **Dockerfile optimized for .NET**

---

## Resources

- .NET Documentation
- Docker Documentation
- Terraform Documentation
- GitHub Actions Documentation
- AWS EC2 Documentation

---

## Review Process

- Weekly team reviews
- PR-based validation of all changes
- Pipeline must pass before merging
- Continuous improvement based on feedback

---

## Compliance Checklist (Final Validation)

| Requirement                         | Status Check |
| ----------------------------------- | ------------ |
| GitHub repo with PR workflow        | On progress  |
| Unit & Integration tests            | On progress  |
| Docker image in Docker Hub          | On progress  |
| CI pipeline (build + test)          | On progress  |
| CD pipeline (deploy)                | On progress  |
| IaC executed in pipeline            | On progress  |
| AWS deployment without manual login | On progress  |
| EC2 URL accessible                  | On progress  |
| Final report completed              | On progress  |

---

## Success Criteria

- Fully automated pipeline from commit → deployment
- No manual AWS interaction
- All tests passing
- Application publicly accessible
- All deliverables submitted

---

## Requirements covered

- Git workflow (PRs + branch protection)
- Automated testing (unit + integration)
- Docker + Docker Hub
- CI/CD pipelines (GitHub Actions)
- Terraform IaC executed in pipeline
- Fully automated AWS deployment (no manual login)
- Final report requirements
- Rubric-aligned checklist
