import { Application, Job } from "@/types"
import { seedJobs } from "@/data/jobs"

const JOBS_KEY = "hireflow-jobs"
const APPLICATIONS_KEY = "hireflow-applications"

export function getJobs(): Job[] {
  if (typeof window === "undefined") return seedJobs
  const raw = localStorage.getItem(JOBS_KEY)
  if (!raw) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(seedJobs))
    return seedJobs
  }
  try {
    return JSON.parse(raw) as Job[]
  } catch {
    localStorage.setItem(JOBS_KEY, JSON.stringify(seedJobs))
    return seedJobs
  }
}

export function saveJobs(jobs: Job[]) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs))
}

export function getApplications(): Application[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]") as Application[]
  } catch {
    return []
  }
}

export function saveApplications(applications: Application[]) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications))
}
