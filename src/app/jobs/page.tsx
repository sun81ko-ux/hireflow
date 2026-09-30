"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import JobCard from "@/components/JobCard"
import Icon from "@/components/Icon"
import { getJobs } from "@/lib/storage"
import { Job } from "@/types"

function JobsContent() {
  const params = useSearchParams()

  const [jobs, setJobs] = useState<Job[]>([])
  const [q, setQ] = useState(params.get("q") || "")
  const [location, setLocation] = useState(params.get("location") || "")
  const [category, setCategory] = useState(params.get("category") || "")
  const [experience, setExperience] = useState("")
  const [sort, setSort] = useState("recent")

  useEffect(() => {
    setJobs(getJobs())
  }, [])

  const categories = [...new Set(jobs.map((j) => j.category))]

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const text =
        `${j.title} ${j.company} ${j.description} ${j.skills.join(" ")}`
          .toLowerCase()

      const matchesQ =
        !q || text.includes(q.toLowerCase())

      const matchesLoc =
        !location ||
        j.location.toLowerCase().includes(location.toLowerCase())

      const matchesCat =
        !category ||
        j.category.toLowerCase() === category.toLowerCase()

      const matchesExp =
        !experience ||
        j.experience.toLowerCase().includes(experience.toLowerCase())

      return matchesQ && matchesLoc && matchesCat && matchesExp
    })

    if (sort === "title") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }

    return result
  }, [jobs, q, location, category, experience, sort])

  function clear() {
    setQ("")
    setLocation("")
    setCategory("")
    setExperience("")
  }

  return (
    <div className="page-wash">
      <section className="page-heading">
        <div className="container">
          <div className="breadcrumb">Home / Find Jobs</div>
          <h1>Find Jobs</h1>
        </div>
      </section>

      <section className="jobs-toolbar">
        <div className="container">
          <div className="search-bar">

            <div className="input-wrap">
              <Icon name="search" size={16} />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Medical, Logistics, or Trades"
              />
            </div>

            <div className="input-wrap">
              <Icon name="pin" size={16} />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or area"
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {}}
            >
              <Icon name="search" size={15} />
              Update Results
            </button>

          </div>
        </div>
      </section>

      <div className="container jobs-layout">

        <aside className="filter-panel">

          <div className="filter-head">
            <strong>Filters</strong>

            <button onClick={clear}>
              Clear Filters
            </button>
          </div>

          <div className="filter-group">
            <h4>Job Category</h4>

            {categories.map((c) => (
              <label className="check" key={c}>
                <input
                  type="radio"
                  name="cat"
                  checked={category === c}
                  onChange={() =>
                    setCategory(category === c ? "" : c)
                  }
                />

                {c}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Experience Level</h4>

            {[
              "Entry level",
              "1-2 years",
              "2+ years",
              "3+ years",
            ].map((x) => (
              <label className="check" key={x}>
                <input
                  type="radio"
                  name="exp"
                  checked={experience === x}
                  onChange={() =>
                    setExperience(experience === x ? "" : x)
                  }
                />

                {x}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Sort Results</h4>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-wrap"
              style={{ width: "100%" }}
            >
              <option value="recent">Most Recent</option>
              <option value="title">Job Title</option>
            </select>
          </div>

        </aside>

        <section>

          <div className="results-head">
            <span>
              Showing <strong>{filtered.length}</strong> of{" "}
              {jobs.length} positions
            </span>

            <span>Updated listings</span>
          </div>

          <div className="results-list">

            {filtered.length ? (
              filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))
            ) : (
              <div className="empty">

                <h3>No jobs found</h3>

                <p>
                  Try changing your search or clearing the filters.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={clear}
                >
                  Clear Filters
                </button>

              </div>
            )}

          </div>

        </section>

      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="page-wash">
          <section className="page-heading">
            <div className="container">
              <h1>Find Jobs</h1>
              <p>Loading jobs...</p>
            </div>
          </section>
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  )
}