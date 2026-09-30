"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import Icon from "./Icon"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [pathname])

  const nav = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Jobs" },
    { href: "/admin", label: "Post a Job" },
  ]

  function signOut() {
    logoutUser()
    setUser(null)
    setOpen(false)
    router.push("/")
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">H</span>
          <span><strong>HireFlow</strong><small>JOB PORTAL</small></span>
        </Link>

        <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>
          <Icon name={open ? "x" : "menu"} />
        </button>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`header-actions ${open ? "open" : ""}`}>
          {user ? (
            <>
              <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
              <button className="header-icon" onClick={signOut} title="Sign out"><Icon name="logout" size={17} /></button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>Sign In</Link>
              <Link href="/register" className="btn btn-primary btn-small" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
          <Link href={user ? "/profile" : "/login"} className="avatar-button" aria-label="Account"><Icon name="user" size={17} /></Link>
        </div>
      </div>
    </header>
  )
}
