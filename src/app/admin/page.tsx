"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Icon from "@/components/Icon"
import { getCurrentUser } from "@/lib/auth"
import { getJobs, saveJobs, getApplications, saveApplications } from "@/lib/storage"
import { Application, Job } from "@/types"

const blankJob: Job = {id:"",title:"",company:"",location:"",salary:"",category:"",experience:"",description:"",responsibilities:[],requirements:[],skills:[],benefits:[],postedDate:"Just now"}

export default function AdminPage(){
  const router=useRouter()
  const [jobs,setJobs]=useState<Job[]>([])
  const [apps,setApps]=useState<Application[]>([])
  const [editing,setEditing]=useState(false)
  const [form,setForm]=useState<Job>(blankJob)
  useEffect(()=>{if(!getCurrentUser()){router.replace("/login");return}setJobs(getJobs());setApps(getApplications())},[router])
  function update(k:keyof Job,v:string){setForm(f=>({...f,[k]:v as never}))}
  function save(){if(!form.title||!form.company||!form.location||!form.category){alert("Please fill title, company, location and category.");return}const clean={...form,id:form.id||`${form.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,responsibilities:Array.isArray(form.responsibilities)?form.responsibilities:[],requirements:Array.isArray(form.requirements)?form.requirements:[],skills:Array.isArray(form.skills)?form.skills:[],benefits:Array.isArray(form.benefits)?form.benefits:[]};const next=form.id?jobs.map(j=>j.id===form.id?clean:j):[clean,...jobs];setJobs(next);saveJobs(next);setForm(blankJob);setEditing(false)}
  function edit(j:Job){setForm(j);setEditing(true)}
  function remove(id:string){if(!confirm("Delete this job?"))return;const next=jobs.filter(j=>j.id!==id);setJobs(next);saveJobs(next)}
  function updateStatus(id:string,status:Application["status"]){const next=apps.map(a=>a.id===id?{...a,status}:a);setApps(next);saveApplications(next)}
  return <div className="page-wash"><div className="container admin-layout">
    <div className="breadcrumb">Home / Admin</div><div className="admin-toolbar"><div><div className="section-kicker">EMPLOYER WORKSPACE</div><h1 style={{fontSize:25,margin:"4px 0"}}>Admin Dashboard</h1><p className="muted">Manage sample job listings and applicant statuses locally.</p></div><button className="btn btn-primary" onClick={()=>{setForm(blankJob);setEditing(true)}}><Icon name="plus" size={15}/> Create Job</button></div>
    <div className="admin-grid"><div className="admin-stat"><span>Active Jobs</span><strong>{jobs.length}</strong></div><div className="admin-stat"><span>Applications</span><strong>{apps.length}</strong></div><div className="admin-stat"><span>Under Review</span><strong>{apps.filter(a=>a.status==="Under Review").length}</strong></div></div>
    {editing&&<div className="admin-form"><div className="admin-toolbar"><h2 style={{fontSize:15}}>{form.id?"Edit Job":"Create Job"}</h2><button className="icon-btn" onClick={()=>setEditing(false)}><Icon name="x" size={15}/></button></div>
      <div className="two-col">
        <div className="field"><label>Title *</label><input value={form.title} onChange={e=>update("title",e.target.value)}/></div><div className="field"><label>Company *</label><input value={form.company} onChange={e=>update("company",e.target.value)}/></div>
        <div className="field"><label>Location *</label><input value={form.location} onChange={e=>update("location",e.target.value)}/></div><div className="field"><label>Salary</label><input value={form.salary} onChange={e=>update("salary",e.target.value)}/></div>
        <div className="field"><label>Category *</label><input value={form.category} onChange={e=>update("category",e.target.value)}/></div><div className="field"><label>Experience</label><input value={form.experience} onChange={e=>update("experience",e.target.value)}/></div>
      </div>
      <div className="field"><label>Description</label><textarea value={form.description} onChange={e=>update("description",e.target.value)}/></div>
      <div className="two-col"><div className="field"><label>Skills (comma separated)</label><input value={form.skills.join(", ")} onChange={e=>setForm(f=>({...f,skills:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)}))}/></div><div className="field"><label>Benefits (comma separated)</label><input value={form.benefits.join(", ")} onChange={e=>setForm(f=>({...f,benefits:e.target.value.split(",").map(s=>s.trim()).filter(Boolean)}))}/></div></div>
      <button className="btn btn-primary" onClick={save}>Save Job</button>
    </div>}
    <section className="panel"><h2>Job Listings</h2><div className="table-wrap"><table className="admin-table"><thead><tr><th>Job</th><th>Company</th><th>Location</th><th>Category</th><th>Actions</th></tr></thead><tbody>{jobs.map(j=><tr key={j.id}><td><strong>{j.title}</strong></td><td>{j.company}</td><td>{j.location}</td><td>{j.category}</td><td><div className="admin-actions"><button className="icon-btn" onClick={()=>edit(j)} title="Edit"><Icon name="edit" size={14}/></button><button className="icon-btn danger" onClick={()=>remove(j.id)} title="Delete"><Icon name="trash" size={14}/></button></div></td></tr>)}</tbody></table></div></section>
    <section className="panel"><h2>Applications</h2>{apps.length?<div className="table-wrap"><table className="admin-table"><thead><tr><th>Applicant</th><th>Job</th><th>Email</th><th>Status</th></tr></thead><tbody>{apps.map(a=><tr key={a.id}><td><strong>{a.fullName}</strong><br/><small>{a.id}</small></td><td>{a.jobTitle}</td><td>{a.email}</td><td><select value={a.status} onChange={e=>updateStatus(a.id,e.target.value as Application["status"])}><option>Submitted</option><option>Under Review</option><option>Shortlisted</option><option>Rejected</option></select></td></tr>)}</tbody></table></div>:<div className="empty"><h3>No applications yet.</h3><p>Applications submitted from this browser will appear here.</p></div>}</section>
  </div></div>
}
