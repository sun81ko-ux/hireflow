import Link from "next/link"
import { Job } from "@/types"
import Icon from "./Icon"

export default function JobCard({ job, compact = false }: { job: Job; compact?: boolean }) {
  return (
    <article className={`job-card ${compact ? "compact" : ""}`}>
      <div className="job-card-top">
        <div className="company-icon"><Icon name="building" size={19} /></div>
        <div className="job-main">
          <div className="job-title-row"><h3>{job.title}</h3><span className="posted">{job.postedDate}</span></div>
          <p className="company-line">{job.company} <span>·</span> <Icon name="pin" size={13} /> {job.location}</p>
        </div>
      </div>
      <div className="job-meta">
        <span className="salary">{job.salary}</span>
        <span>{job.experience}</span>
        <span>{job.category}</span>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="job-card-footer">
        <span className="job-skills">{job.skills.slice(0, 2).join(" · ")}</span>
        <Link href={`/jobs/${job.id}`} className="btn btn-light">View Details <Icon name="arrow" size={15} /></Link>
      </div>
    </article>
  )
}
