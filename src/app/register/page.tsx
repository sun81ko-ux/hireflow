"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Icon from "@/components/Icon"
import { registerUser } from "@/lib/auth"

export default function RegisterPage(){
  const router=useRouter()
  const [form,setForm]=useState({name:"",email:"",phone:"",password:"",confirm:""})
  const [error,setError]=useState("")
  function update(k:string,v:string){setForm(f=>({...f,[k]:v}))}
  function submit(e:React.FormEvent){e.preventDefault();setError("");if(form.name.trim().length<2)return setError("Please enter your full name.");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))return setError("Please enter a valid email address.");if(form.password.length<6)return setError("Password must be at least 6 characters.");if(form.password!==form.confirm)return setError("Passwords do not match.");const r=registerUser(form);if(!r.ok)return setError(r.message);router.push("/profile")}
  return <div className="form-page"><div className="container"><div className="form-card">
    <div className="form-brand"><span className="brand-mark">H</span><h1>Create Account</h1><p>Create your HireFlow account to discover and apply for jobs.</p></div>
    {error&&<div className="form-message">{error}</div>}
    <form onSubmit={submit}>
      {[
        ["name","Full Name","text","Your full name"],["email","Email Address","email","name@example.com"],["phone","Phone Number","tel","Your mobile number"],["password","Password","password","At least 6 characters"],["confirm","Confirm Password","password","Repeat your password"]
      ].map(([k,l,t,p])=><div className="field" key={k}><label>{l} *</label><div className="input-wrap">{k==="email"?<Icon name="mail" size={16}/>:k.includes("password")?<Icon name="lock" size={16}/>:k==="phone"?<Icon name="phone" size={16}/>:<Icon name="user" size={16}/>}<input type={t} value={form[k as keyof typeof form]} onChange={e=>update(k,e.target.value)} placeholder={p} /></div></div>)}
      <button className="btn btn-primary" style={{width:"100%"}}>Create Account <Icon name="arrow" size={15}/></button>
    </form>
    <p style={{textAlign:"center",marginTop:22,fontSize:11}}>Already have an account? <Link href="/login" className="link-arrow">Sign In</Link></p>
  </div></div></div>
}
