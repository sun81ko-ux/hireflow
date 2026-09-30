import { User } from "@/types"

const USERS_KEY = "hireflow-users"
const SESSION_KEY = "hireflow-session"

type StoredUser = User & { password: string }

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[]
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(input: {
  name: string
  email: string
  phone: string
  password: string
}): { ok: boolean; message: string; user?: User } {
  const users = getUsers()
  const email = input.email.trim().toLowerCase()

  if (users.some((u) => u.email === email)) {
    return { ok: false, message: "An account with this email already exists." }
  }

  const user: User = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
  }

  users.push({ ...user, password: input.password })
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))

  return { ok: true, message: "Account created successfully.", user }
}

export function loginUser(emailInput: string, password: string): { ok: boolean; message: string; user?: User } {
  const email = emailInput.trim().toLowerCase()
  const user = getUsers().find((u) => u.email === email)

  if (!user || user.password !== password) {
    return { ok: false, message: "Invalid email address or password." }
  }

  const session: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { ok: true, message: "Signed in successfully.", user: session }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

export function updateCurrentUser(updates: Partial<Pick<User, "name" | "phone">>) {
  const current = getCurrentUser()
  if (!current) return null

  const updated = { ...current, ...updates }
  const users = getUsers().map((u) => u.id === current.id ? { ...u, ...updates } : u)
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
  return updated
}
