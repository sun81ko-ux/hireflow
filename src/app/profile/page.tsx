"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logoutUser, updateCurrentUser } from "@/lib/auth"
import { getApplications } from "@/lib/storage"
import { Application, User } from "@/types"
import Icon from "@/components/Icon"

export default function ProfilePage() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [apps, setApps] = useState<Application[]>([])
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const u = getCurrentUser()

    if (!u) {
      router.replace("/login")
      return
    }

    setUser(u)
    setName(u.name)
    setPhone(u.phone)

    const applications = getApplications()

    // Support applications saved with either the user's ID or email.
    const userApplications = applications.filter(
      (a) => a.userId === u.id || a.userId === u.email
    )

    setApps(userApplications)
  }, [router])

  if (!user) {
    return (
      <div className="form-page">
        <div className="container">Loading...</div>
      </div>
    )
  }

  function save() {
    const updatedUser = updateCurrentUser({ name, phone })

    if (updatedUser) {
      setUser(updatedUser)
      setEditing(false)
    }
  }

  function signOut() {
    logoutUser()
    router.push("/")
  }

  return (
    <div className="page-wash">
      <div className="container profile-layout">

        <aside className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>
          <p className="muted">{user.email}</p>
          <p className="muted">
            {user.phone || "No phone added"}
          </p>

          <button
            className="btn btn-outline"
            style={{ width: "100%", marginTop: 12 }}
            onClick={signOut}
          >
            <Icon name="logout" size={15} />
            Log Out
          </button>
        </aside>

        <section>

          <div className="panel">
            <div className="admin-toolbar">
              <div>
                <h2 style={{ marginBottom: 4 }}>My Profile</h2>
                <span className="muted">
                  Manage your basic account information.
                </span>
              </div>

              <button
                className="btn btn-light"
                onClick={() => setEditing(!editing)}
              >
                <Icon name="edit" size={15} />
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {editing ? (
              <>
                <div className="two-col">

                  <div className="field">
                    <label>Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                </div>

                <button
                  className="btn btn-primary"
                  onClick={save}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <div className="two-col">

                <div>
                  <span className="muted">Name</span>
                  <p>{user.name}</p>
                </div>

                <div>
                  <span className="muted">Email</span>
                  <p>{user.email}</p>
                </div>

                <div>
                  <span className="muted">Phone</span>
                  <p>{user.phone || "Not provided"}</p>
                </div>

              </div>
            )}
          </div>

          <div className="panel">

            <div className="admin-toolbar">
              <div>
                <h2>Submitted Applications</h2>
                <span className="muted">
                  Your applications stored on this device.
                </span>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => router.push("/jobs")}
              >
                Browse Jobs
              </button>
            </div>

            {apps.length ? (
              apps.map((a) => (
                <div
                  className="application-row"
                  key={a.id}
                >
                  <div>
                    <h3>{a.jobTitle}</h3>
                    <p>
                      {a.company} · Application {a.id}
                    </p>
                  </div>

                  <span className="status">
                    {a.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty">
                <h3>No applications yet.</h3>
                <p>
                  Browse jobs and submit an application to see it here.
                </p>
              </div>
            )}

          </div>

        </section>
      </div>
    </div>
  )
}