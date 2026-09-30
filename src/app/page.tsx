"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import JobCard from "@/components/JobCard"
import Icon from "@/components/Icon"
import { getJobs } from "@/lib/storage"
import { Job } from "@/types"

export default function Home() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => setJobs(getJobs()), [])

  const featured = useMemo(() => jobs.slice(0, 6), [jobs])

  function search() {
    const params = new URLSearchParams()
    if (keyword) params.set("q", keyword)
    if (location) params.set("location", location)
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <>
      <div className="announcement"><div className="container">HireFlow employment discovery portal · Simple, practical and accessible job search</div></div>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">REGIONAL WORKFORCE PORTAL</span>
          <h1>Find the right job for you</h1>
          <p>Discover practical local employment opportunities, compare requirements and connect with opportunities in your community.</p>
          <div className="search-bar">
            <div className="input-wrap"><Icon name="search" size={16} /><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Job title, skill, or keyword" /></div>
            <div className="input-wrap"><Icon name="pin" size={16} /><input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location, city, or area" /></div>
            <div className="input-wrap"><Icon name="briefcase" size={16} /><select defaultValue=""><option value="">All categories</option><option>Healthcare</option><option>Logistics</option><option>Technology</option><option>Retail</option><option>Administration</option></select></div>
            <button className="btn btn-primary" onClick={search}>Search Jobs <Icon name="arrow" size={15} /></button>
          </div>
          <div className="quick-tags">{["Healthcare","Logistics","Skilled Trades","Customer Service","Tech"].map(x => <button key={x} onClick={() => router.push(`/jobs?category=${encodeURIComponent(x === "Tech" ? "Technology" : x)}`)}>{x}</button>)}</div>
        </div>
      </section>

      <section className="trust-row">
        <div className="container trust-grid">
          {[
            ["briefcase","Local opportunities","Practical job listings"],
            ["check","Clear information","Simple requirements"],
            ["clock","Updated listings","Recent opportunities"],
            ["user","Easy applications","Applicant-friendly flow"],
          ].map(([icon,a,b]) => <div className="trust-item" key={a}><span className="trust-icon"><Icon name={icon} size={15}/></span><div><strong>{a}</strong><span>{b}</span></div></div>)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="section-kicker">DIRECT OPENINGS</div><h2>Featured Jobs</h2><p>Recently posted opportunities from sample regional employers.</p></div><button className="link-arrow" onClick={() => router.push("/jobs")}>View all jobs →</button></div>
          <div className="jobs-grid">{featured.map(job => <JobCard key={job.id} job={job} />)}</div>
        </div>
      </section>

      <section className="split-section">
        <div className="container split-grid">
          <div><div className="section-kicker">LABOR MARKET TRANSPARENCY</div><h2>Clear wages, direct employers</h2><p className="muted">Compare practical employment information before deciding where to apply.</p>
            <div className="report-box">
              {["Healthcare & Admin Services","Skilled Trades & Logistics","Customer & Retail Services"].map((x,i) => <div className="bar-row" key={x}><label><span>{x}</span><b>{["Open roles","Open roles","Open roles"][i]}</b></label><div className="bar"><i style={{width:`${80-i*18}%`}} /></div></div>)}
            </div>
          </div>
          <div className="photo-placeholder"><div className="photo-caption">Practical employment information for local jobseekers</div></div>
        </div>
      </section>

      <section className="section">
        <div className="container"><div className="section-head"><div><div className="section-kicker">APPLICANT GUIDE</div><h2>How HireFlow Works for Job Seekers</h2><p>A simple three-step path from discovery to application.</p></div></div>
          <div className="steps-grid">
            {[["1","Search & Filter","Find opportunities by location, category, experience and keywords."],["2","Review & Apply","Read the role details and submit your information through the application form."],["3","Track Status","See your submitted applications and their current status from your profile."]].map(([n,t,d]) => <div className="step-card" key={n}><div className="step-number">{n}</div><h3>{t}</h3><p>{d}</p></div>)}
          </div>
          <div className="callout"><div><div className="section-kicker">HIRING IN OUR REGION</div><strong>Employers can manage sample openings here.</strong></div><button className="btn btn-primary" onClick={() => router.push("/admin")}>Post an Opening</button></div>
        </div>
      </section>
    </>
  )
}
