- [2026-ITM350-IT-Management-and-DevOps-ClassProject](#2026-itm350-it-management-and-devops-classproject)
  - [Quick Overview](#quick-overview)
  - [Key Files](#key-files)
  - [What's Inside](#whats-inside)
  - [Getting Started](#getting-started)
  - [Learning Outcomes](#learning-outcomes)

---

> Based on project: <https://github.com/dockersamples/node-bulletin-board>

# 2026-ITM350-IT-Management-and-DevOps-ClassProject

A DevOps course project combining **infrastructure-as-code**, **CI/CD automation**, and **containerization** with practical application deployment.

## Quick Overview

- **Application**: Bulletin Board App (Node.js + Vue + PostgreSQL)
- **Infrastructure**: Terraform (AWS)
- **CI/CD**: GitHub Actions (build, test, Docker push)
- **Containers**: Docker with alpine base image
- **License**: Apache 2.0

## Key Files

| Component      | Location                        |
| -------------- | ------------------------------- |
| Dockerfile     | `bulletin-board-app/Dockerfile` |
| CI/CD Pipeline | `.github/workflows/ci-cd.yml`   |
| Terraform      | `iac/main.tf`                   |
| Documentation  | `docs/overview.md`              |

## What's Inside

- ✅ **CI/CD Automation**: Automated build, test, and Docker image push
- ✅ **Infrastructure as Code**: AWS infrastructure with Terraform
- ✅ **Containerization**: Docker setup with best practices
- ✅ **Security Scanning**: Dependabot monitoring
- 🟡 **Observability**: In progress (logging/monitoring planned)

## Getting Started

See `docs/overview.md` for detailed documentation on architecture, security analysis, and improvement roadmap.

## Learning Outcomes

Demonstrates DevOps fundamentals: CI/CD pipelines, IaC, containerization, cloud integration, and security awareness.
