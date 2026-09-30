"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Icon from "@/components/Icon"
import { loginUser } from "@/lib/auth"

export default function LoginPage(){
  const router=useRouter()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  function submit(e:React.FormEvent){e.preventDefault();setError("");const r=loginUser(email,password);if(!r.ok){setError(r.message);return}router.push("/profile")}
  return <div className="form-page"><div className="container"><div className="form-card">
    <div className="form-brand"><span className="brand-mark">H</span><h1>Sign In</h1><p>Access your HireFlow account.</p></div>
    {error&&<div className="form-message">{error}</div>}
    <form onSubmit={submit}>
      <div className="field"><label>Email Address *</label><div className="input-wrap"><Icon name="mail" size={16}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="name@example.com"/></div></div>
      <div className="field"><label>Password *</label><div className="input-wrap"><Icon name="lock" size={16}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Enter your password"/></div></div>
      <div className="form-options"><label className="checkbox-line"><input type="checkbox"/> Remember me</label><button type="button" className="link-arrow" onClick={()=>setError("Password recovery requires an account email and a backend service.")}>Forgot password?</button></div>
      <button className="btn btn-primary" style={{width:"100%"}}>Sign In <Icon name="arrow" size={15}/></button>
    </form>
    <p style={{textAlign:"center",marginTop:22,fontSize:11}}>Don't have an account? <Link href="/register" className="link-arrow">Register</Link></p>
  </div></div></div>
}
