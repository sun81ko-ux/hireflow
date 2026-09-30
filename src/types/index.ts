export type Job = {
  id: string
  title: string
  company: string
  location: string
  salary: string
  category: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  skills: string[]
  benefits: string[]
  postedDate: string
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
}

export type Application = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  userId: string
  fullName: string
  email: string
  phone: string
  education: string
  experience: string
  location: string
  skills: string
  resumeName?: string
  resumeSize?: number
  coverLetter: string
  status: "Submitted" | "Under Review" | "Shortlisted" | "Rejected"
  submittedAt: string
}
