import Link from "next/link"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><span className="brand-mark small">H</span><strong>HireFlow</strong></div>
          <p>Connecting local jobseekers with practical employment opportunities through a simple, accessible portal.</p>
        </div>
        <div><h4>FOR JOB SEEKERS</h4><Link href="/jobs">Find Jobs</Link><Link href="/jobs">Browse Categories</Link><Link href="/profile">Application Help</Link><Link href="/jobs">Salary Guide</Link></div>
        <div><h4>FOR EMPLOYERS</h4><Link href="/admin">Post a Job</Link><Link href="/admin">Employer Dashboard</Link><Link href="/admin">Hiring Guidelines</Link></div>
        <div><h4>SUPPORT & LEGAL</h4><Link href="/">Accessibility Statement</Link><Link href="/">Privacy Policy</Link><Link href="/">Terms of Service</Link><Link href="/">Help Desk</Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 HireFlow Employment Services. All rights reserved.</span><span>Accessibility support · Local employment portal</span></div>
    </footer>
  )
}
