"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  getJobs,
  getApplications,
  saveApplications,
} from "@/lib/storage"
import { getCurrentUser } from "@/lib/auth"
import type { Application, Job } from "@/types"
import Icon from "@/components/Icon"

export default function JobDetails() {
  const params = useParams<{ id: string }>()
  const router = useRouter()

  const [job, setJob] = useState<Job | null>(null)
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    location: "",
    skills: "",
    coverLetter: "",
  })

  useEffect(() => {
    const found = getJobs().find((j) => j.id === params.id) || null
    setJob(found)

    const user = getCurrentUser()

    if (user) {
      setForm((current) => ({
        ...current,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [params.id])

  if (!job) {
    return (
      <div className="page-wash">
        <section className="page-heading">
          <div className="container">
            <div className="breadcrumb">
              Home / Find Jobs
            </div>

            <h1>Job Not Found</h1>

            <p>
              The job you are looking for does not exist or
              may have been removed.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => router.push("/jobs")}
            >
              <Icon name="arrow-left" size={16} />
              Back to Jobs
            </button>
          </div>
        </section>
      </div>
    )
  }

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setError("")
    setSubmitted(null)

    if (!job) {
      setError("Job not found.")
      return
    }

    const currentUser = getCurrentUser()

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError("Please complete all required fields.")
      return
    }

    const applicationId =
      "HF-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()

    const application: Application = {
      id: applicationId,
      fullName: form.fullName,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: currentUser?.email || "guest",
      email: form.email,
      phone: form.phone,
      education: form.education,
      experience: form.experience,
      location: form.location,
      skills: form.skills,
      coverLetter: form.coverLetter,
      status: "Submitted",
      submittedAt: new Date().toISOString(),
    }

    const existingApplications = getApplications()

    saveApplications([
      ...existingApplications,
      application,
    ])

    setSubmitted(applicationId)
  }

  return (
    <div className="page-wash">

      <section className="page-heading">
        <div className="container">

          <div className="breadcrumb">
            Home / Find Jobs / {job.title}
          </div>

          <div className="job-detail-header">

            <div>

              <div className="job-category">
                {job.category}
              </div>

              <h1>
                {job.title}
              </h1>

              <p className="job-meta">
                {job.company} · {job.location} ·{" "}
                {job.experience}
              </p>

            </div>

            <div className="job-salary">
              {job.salary}
            </div>

          </div>

        </div>
      </section>


      <section className="container">

        <div className="job-detail-layout">

          <main>

            <div className="detail-card">
              <h2>About This Role</h2>

              <p>
                {job.description}
              </p>
            </div>


            <div className="detail-card">

              <h2>Key Responsibilities</h2>

              {job.responsibilities &&
              job.responsibilities.length > 0 ? (

                <ul className="detail-list">

                  {job.responsibilities.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              ) : (

                <p>
                  Responsibilities will be discussed
                  during the hiring process.
                </p>

              )}

            </div>


            <div className="detail-card">

              <h2>Requirements & Qualifications</h2>

              {job.requirements &&
              job.requirements.length > 0 ? (

                <ul className="detail-list">

                  {job.requirements.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>

              ) : (

                <p>
                  Basic qualifications and relevant
                  experience are preferred.
                </p>

              )}

            </div>


            <div className="detail-card">

              <h2>Required Skills & Proficiencies</h2>

              <div className="skill-tags">

                {job.skills &&
                job.skills.length > 0 ? (

                  job.skills.map(
                    (skill, index) => (
                      <span
                        className="skill-tag"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )

                ) : (

                  <span className="skill-tag">
                    General workplace skills
                  </span>

                )}

              </div>

            </div>


            <div className="detail-card">

              <h2>Benefits & Perks</h2>

              {job.benefits &&
              job.benefits.length > 0 ? (

                <div className="benefits-grid">

                  {job.benefits.map(
                    (benefit, index) => (
                      <div
                        className="benefit-card"
                        key={index}
                      >
                        {benefit}
                      </div>
                    )
                  )}

                </div>

              ) : (

                <p>
                  Benefits and perks may vary by
                  employer.
                </p>

              )}

            </div>

          </main>


          <aside>

            {!submitted ? (

              <div className="apply-card">

                <h2>Ready to Apply?</h2>

                <p>
                  Complete the form below. You can
                  apply without creating an account.
                </p>

                {error && (
                  <div className="form-error">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      updateField(
                        "fullName",
                        e.target.value
                      )
                    }
                    placeholder="Your full name"
                  />


                  <label>
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="name@example.com"
                  />


                  <label>
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Your mobile number"
                  />


                  <label>
                    Education
                  </label>

                  <input
                    type="text"
                    value={form.education}
                    onChange={(e) =>
                      updateField(
                        "education",
                        e.target.value
                      )
                    }
                    placeholder="Example: 12th Pass / Graduate"
                  />


                  <label>
                    Experience
                  </label>

                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) =>
                      updateField(
                        "experience",
                        e.target.value
                      )
                    }
                    placeholder="Example: Fresher / 1 year"
                  />


                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      updateField(
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="City / Area"
                  />


                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    value={form.skills}
                    onChange={(e) =>
                      updateField(
                        "skills",
                        e.target.value
                      )
                    }
                    placeholder="Example: MS Office, Communication"
                  />


                  <label>
                    Cover Letter
                  </label>

                  <textarea
                    value={form.coverLetter}
                    onChange={(e) =>
                      updateField(
                        "coverLetter",
                        e.target.value
                      )
                    }
                    placeholder="Tell the employer briefly about yourself..."
                    rows={5}
                  />


                  <label>
                    Resume
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  {file && (
                    <p className="file-name">
                      Selected: {file.name}
                    </p>
                  )}


                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                  >
                    Submit Application

                    <Icon
                      name="arrow-right"
                      size={16}
                    />
                  </button>

                </form>

              </div>

            ) : (

              <div className="success-card">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Application submitted
                  successfully
                </h2>

                <p>
                  Application ID:
                </p>

                <strong>
                  {submitted}
                </strong>

                <p>
                  Your application is stored locally
                  in this browser.
                </p>

                <button
                  className="btn btn-primary btn-full"
                  onClick={() =>
                    router.push("/profile")
                  }
                >
                  View My Applications
                </button>

              </div>

            )}


            <div className="detail-card job-summary">

              <h2>
                Job Summary
              </h2>

              <p>
                <strong>Category:</strong>{" "}
                {job.category}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {job.experience}
              </p>

              <p>
                <strong>Salary:</strong>{" "}
                {job.salary}
              </p>

            </div>

          </aside>

        </div>

      </section>

    </div>
  )
}