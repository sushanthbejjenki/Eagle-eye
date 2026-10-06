import { FormEvent, PointerEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import "./index.css"
import heroVideo from "./assets/eagle-approach.mp4"
import heroPoster from "./assets/eagle-approach.png"
import monitoringRoom from "./assets/monitoring-room.jpg"
import contentCreation from "./assets/content-creation.svg"
import contentModeration from "./assets/content-moderation.svg"
import itTechnology from "./assets/it-technology.svg"
import eagleLogo from "./assets/eagle-eye-logo.png"
import eagleBootLogo from "./assets/eagle-eye-logo-dark.png"
import eagleEmblem from "./assets/eagle-eye-emblem.png"

const installImage = "https://storage.googleapis.com/content-assistant-images-persistent/technician-installing-an-ip-security-camera-in-a-commercial-setting-5fe96019-5eed-4cab-861f-a5017d191576.webp"
const buildingImage = "https://www.cctvsecuritypros.com/product_images/uploaded_images/profeassional-security-camera-systems.png"
const controlImage = "https://mbjgrupa.com.pl/images/monitoring-systemy-ochrony-mbj.webp"

type IconName = "arrow"|"eye"|"camera"|"shield"|"remote"|"menu"|"search"|"user"|"close"|"chevron"|"lock"|"send"
function Icon({name}:{name:IconName}){
 const p={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round" as const,strokeLinejoin:"round" as const}
 if(name==="arrow")return <svg {...p}><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>
 if(name==="eye")return <svg {...p}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>
 if(name==="camera")return <svg {...p}><path d="M4 8h4l1.6-2h4.8L16 8h4v10H4Z"/><circle cx="12" cy="13" r="3"/></svg>
 if(name==="shield")return <svg {...p}><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>
 if(name==="remote")return <svg {...p}><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 15h8M8 9h.01M12 9h.01M16 9h.01"/></svg>
 if(name==="search")return <svg {...p}><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
 if(name==="user")return <svg {...p}><circle cx="12" cy="8" r="3.2"/><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5"/></svg>
 if(name==="close")return <svg {...p}><path d="M5 5l14 14M19 5 5 19"/></svg>
 if(name==="chevron")return <svg {...p}><path d="m7 9 5 5 5-5"/></svg>
 if(name==="lock")return <svg {...p}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
 return <svg {...p}><path d="m4 12 5 5L20 6"/></svg>
}

const services=[
 {n:"01",icon:"eye" as IconName,title:"CCTV Monitoring",tag:"CONTINUOUS VISIBILITY",desc:"Professional video monitoring for businesses that require dependable oversight across critical areas and operating hours.",image:controlImage},
 {n:"02",icon:"camera" as IconName,title:"CCTV Installation",tag:"SITE → SYSTEM",desc:"Site assessment, camera placement, installation, configuration and verification delivered as one coordinated deployment.",image:installImage},
 {n:"03",icon:"shield" as IconName,title:"Real Estate Promotions",tag:"PROPERTY MARKETING",desc:"Promotional support for real estate properties and developments, helping present listings and opportunities clearly across digital channels.",image:buildingImage},
 {n:"04",icon:"remote" as IconName,title:"Digital Marketing",tag:"DIGITAL GROWTH",desc:"Digital marketing support designed to strengthen brand visibility, audience reach and business presence across online platforms.",image:monitoringRoom},
 {n:"05",icon:"camera" as IconName,title:"Content Creation",tag:"CREATIVE PRODUCTION",desc:"Professional content creation for businesses, including visual and written assets developed for modern digital communication.",image:contentCreation},
 {n:"06",icon:"shield" as IconName,title:"Content Moderation",tag:"CONTENT QUALITY",desc:"Content review and moderation support to help businesses maintain appropriate, consistent and reliable digital environments.",image:contentModeration},
 {n:"07",icon:"remote" as IconName,title:"IT & Technology",tag:"TECHNOLOGY SUPPORT",desc:"IT and technology services that support business systems, digital infrastructure and day-to-day technical requirements.",image:itTechnology}
]
const process=[
 ["01","SCAN","Review the property, operating environment, access points and required coverage."],
 ["02","DESIGN","Translate site requirements into a practical camera and surveillance architecture."],
 ["03","DEPLOY","Install, configure and connect equipment with attention to coverage and reliability."],
 ["04","VERIFY","Test camera views, recording, connectivity and remote access before handover."]
]
const owners=[
 {role:"PROPERTY OWNER",title:"Know the site without being on the site.",text:"A security system should give ownership teams confidence in what is happening across every important area of a property.",metric:"01 / OWNERSHIP VISIBILITY",image:buildingImage},
 {role:"OPERATIONS LEADER",title:"Turn cameras into operational visibility.",text:"Bring entrances, customer areas, service zones and critical assets into one dependable surveillance view.",metric:"02 / OPERATIONAL CONTROL",image:controlImage},
 {role:"FACILITY MANAGER",title:"Build coverage around the way people move.",text:"Good surveillance starts with understanding the building, its access points and the activity patterns inside it.",metric:"03 / SITE INTELLIGENCE",image:installImage},
 {role:"MULTI-SITE OWNER",title:"Standardize security across locations.",text:"Create a repeatable surveillance approach that can scale from one property to a distributed portfolio.",metric:"04 / NETWORKED SITES",image:itTechnology}
]

function MagneticButton({children,onClick,className=""}:{children:ReactNode,onClick?:()=>void,className?:string}){
 const ref=useRef<HTMLButtonElement>(null)
 const move=(e:PointerEvent<HTMLButtonElement>)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.16;const y=(e.clientY-r.top-r.height/2)*.16;el.style.setProperty("--mx",`${x}px`);el.style.setProperty("--my",`${y}px`)}
 const leave=()=>{const el=ref.current;if(el){el.style.setProperty("--mx","0px");el.style.setProperty("--my","0px")}}
 return <button ref={ref} className={`magnetic ${className}`} onClick={onClick} onPointerMove={move} onPointerLeave={leave}>{children}</button>
}

export default function App(){
 const [menu,setMenu]=useState(false),[login,setLogin]=useState(false),[profile,setProfile]=useState(false),[search,setSearch]=useState(false),[sent,setSent]=useState(false)
 const [active,setActive]=useState(0),[rotation,setRotation]=useState(0),[scrolled,setScrolled]=useState(false),[owner,setOwner]=useState(0),[flipped,setFlipped]=useState<number|null>(null)
 const [query,setQuery]=useState("")
 const [boot,setBoot]=useState(true),[progress,setProgress]=useState(0)
 const drag=useRef({down:false,x:0,r:0,moved:false})
 useEffect(()=>{
  const on=()=>{
   setScrolled(scrollY>40)
   const max=document.documentElement.scrollHeight-innerHeight
   setProgress(max>0?Math.min(100,(scrollY/max)*100):0)
  }
  on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)
 },[])
 useEffect(()=>{
  const timer=window.setTimeout(()=>setBoot(false),1250)
  const nodes=[...document.querySelectorAll<HTMLElement>(".reveal")].filter(Boolean)
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -8% 0px"})
  nodes.forEach(n=>io.observe(n))
  return()=>{window.clearTimeout(timer);io.disconnect()}
 },[])
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setSearch(true)}};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[])
 const go=(id:string)=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
 const start=(e:PointerEvent<HTMLDivElement>)=>{
  e.preventDefault()
  drag.current={down:true,x:e.clientX,r:rotation,moved:false}
  e.currentTarget.setPointerCapture(e.pointerId)
 }
 const move=(e:PointerEvent<HTMLDivElement>)=>{
  if(!drag.current.down)return
  const delta=e.clientX-drag.current.x
  if(Math.abs(delta)>3)drag.current.moved=true
  const next=drag.current.r+delta*.4
  setRotation(next)
  const step=360/services.length
  const idx=Math.round((((next%360)+360)%360)/step)%services.length
  setActive((services.length-idx)%services.length)
 }
 const end=(e:PointerEvent<HTMLDivElement>)=>{
  drag.current.down=false
  try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}
 }
 const selectService=(index:number)=>{
  if(drag.current.moved){drag.current.moved=false;return}
  setActive(index)
 }
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setSent(true);e.currentTarget.reset();setTimeout(()=>setSent(false),6000)}
 const results=useMemo(()=>{const q=query.toLowerCase().trim();if(!q)return [{label:"Solutions",id:"services"},{label:"CCTV installation",id:"installation"},{label:"Monitoring intelligence",id:"intelligence"},{label:"Company",id:"company"},{label:"Request a security review",id:"quote"}];return [...services.map(s=>({label:s.title,id:"services"})),{label:"CCTV installation",id:"installation"},{label:"Monitoring intelligence",id:"intelligence"},{label:"Request a security review",id:"quote"}].filter(x=>x.label.toLowerCase().includes(q))},[query])
 return <main className="site">
  {boot&&<div className="boot-screen"><div className="boot-core"><img className="boot-logo" src={eagleBootLogo} alt="Eagle Eye Monitoring" /></div></div>}
  <div className="scroll-progress"><span style={{width:`${progress}%`}}></span></div>
  <header className={`nav ${scrolled?"nav-scrolled":""}`}>
   <button className="brand" onClick={()=>go("home")} aria-label="Eagle Eye Monitoring home"><img className="brand-logo" src={eagleEmblem} alt="" /><span><b className="shimmer">EAGLE EYE</b><small>MONITORING</small></span></button>
   <nav className={menu?"open":""}><button onClick={()=>go("services")}>Solutions</button><button onClick={()=>go("installation")}>Deployment</button><button onClick={()=>go("intelligence")}>Intelligence</button><button onClick={()=>go("company")}>Company</button><MagneticButton className="nav-cta" onClick={()=>setLogin(true)}>Login <Icon name="arrow"/></MagneticButton></nav>
   <div className="nav-actions"><button className="search-trigger" onClick={()=>setSearch(true)}><Icon name="search"/><span>Search</span><kbd>⌘K</kbd></button><div className="profile-wrap"><button className="profile-trigger" onClick={()=>setProfile(v=>!v)}><span className="avatar">EE</span><Icon name="chevron"/></button>{profile&&<div className="profile-menu"><small>SECURE ACCESS</small><strong>Eagle Eye Network</strong><button onClick={()=>{setProfile(false);setLogin(true)}}><Icon name="lock"/> Sign in to monitoring</button><button onClick={()=>{setProfile(false);go("quote")}}><Icon name="send"/> Request access</button></div>}</div><button className="hamb" onClick={()=>setMenu(v=>!v)}><Icon name="menu"/></button></div>
  </header>

  <section id="home" className="hero reveal">
   <video className="hero-video" autoPlay muted playsInline preload="auto" poster={heroPoster} onEnded={e=>e.currentTarget.pause()}><source src={heroVideo} type="video/mp4"/></video>
   <div className="hero-fallback" style={{backgroundImage:`url(${heroPoster})`}}></div><div className="hero-shade"></div><div className="hero-grid"></div>
   <div className="hero-content hero-stagger"><h1><span className="shimmer">SEE</span><br/>WHAT<br/><span className="outline">MATTERS.</span></h1><p>Eagle Eye Monitoring provides professional CCTV monitoring, installation and remote surveillance for commercial properties that require dependable visibility and disciplined security operations.</p><div className="hero-buttons"><MagneticButton className="btn-primary" onClick={()=>go("quote")}>Start a security review <Icon name="arrow"/></MagneticButton><MagneticButton className="slide-btn btn-ghost" onClick={()=>go("services")}><span>Explore systems</span><Icon name="arrow"/></MagneticButton></div></div>
  </section>

  <section id="company" className="section intro">
   <div className="section-line"><span>01 / COMPANY</span><span>PROFESSIONAL SECURITY SERVICES</span></div>
   <div className="intro-grid"><div><div className="micro">BUILT AROUND VISIBILITY</div><h2>Security infrastructure should disappear into the operation — and never disappear from view.</h2></div><div className="intro-copy"><p className="lead">Eagle Eye Monitoring provides professional CCTV monitoring, installation and remote surveillance services for commercial environments.</p><p>We approach each property as a system: understand the site, identify critical visibility points, deploy the right infrastructure and verify that it performs as intended.</p><MagneticButton className="text-link" onClick={()=>go("quote")}>Discuss your property <Icon name="arrow"/></MagneticButton></div></div>
   <div className="scroll-intro"><div className="scroll-intro-track"><span>MONITOR</span><i>✦</i><span>INSTALL</span><i>✦</i><span>VERIFY</span><i>✦</i><span>PROTECT</span><i>✦</i><span>MONITOR</span><i>✦</i><span>INSTALL</span><i>✦</i><span>VERIFY</span><i>✦</i><span>PROTECT</span></div></div>
   <div className="metric-row reveal-stagger"><div><strong>24/7</strong><span>MONITORING CAPABILITY</span></div><div><strong>360°</strong><span>PROPERTY VISIBILITY</span></div><div><strong>01</strong><span>COORDINATED DEPLOYMENT</span></div><div><strong>US</strong><span>BUSINESS OPERATIONS</span></div></div>
  </section>

  <section id="services" className="section services reveal"><div className="section-line"><span>02 / SOLUTIONS</span><span>SPOTLIGHT / RING / FLIP</span></div><div className="service-intro"><div><div className="micro">OUR SERVICES</div><h2>Professional coverage.<br/><em>Built around your property.</em></h2></div><p>From security and surveillance to marketing, content and technology, our services support the operational and digital requirements of modern businesses.</p></div>
   <div className="ring-wrap"><div className="ring-stage" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}><div className="ring-glow"></div><div className="ring" style={{transform:`rotateY(${rotation}deg)`}}>{services.map((s,i)=><article className={`ring-card ${i===active?"active":""}`} key={s.title} style={{transform:`rotateY(${i*(360/services.length)}deg) translateZ(330px)`}} onClick={()=>selectService(i)} onDragStart={e=>e.preventDefault()}><div className="ring-card-header"><span>{s.n}</span><Icon name={s.icon}/></div><div><small>{s.tag}</small><h3>{s.title}</h3><p>{s.desc}</p></div><div className="ring-card-footer">VIEW SERVICE <span>↗</span></div></article>)}</div></div><div className="ring-meta"><span>DRAG TO ROTATE</span><b>{services[active].n} / 07</b><span>DRAG TO EXPLORE SERVICES</span></div></div>
   <div className="spotlight-grid reveal-stagger">{services.map((s,i)=><article className={`spotlight ${i===active?"spotlight-active":""}`} key={s.title} onClick={()=>setActive(i)}><div className="spotlight-image"><img src={s.image} alt=""/><span>{s.n}</span></div><div className="spotlight-copy"><small>{s.tag}</small><h3>{s.title}</h3><p>{s.desc}</p><button className="slide-btn"><span>View capability</span><Icon name="arrow"/></button></div></article>)}</div>
  </section>

  <section id="installation" className="section deployment reveal"><div className="section-line"><span>03 / DEPLOYMENT</span><span>ASSESSMENT → INSTALLATION → VERIFICATION</span></div><div className="deploy-head"><div><div className="micro">CCTV INSTALLATION</div><h2>Designed for the site.<br/><em>Installed for reliability.</em></h2></div><p>We assess the property, identify critical coverage areas, select appropriate equipment and complete installation and system verification before handover.</p></div><div className="process-grid reveal-stagger">{process.map(([n,t,d])=><article key={n}><span>{n}</span><div className="process-icon"><i></i></div><h3>{t}</h3><p>{d}</p></article>)}</div><div className="visual-split"><div className="visual-large"><img src={installImage} alt="Technician installing a commercial security camera"/><div className="visual-overlay"><span>DEPLOYMENT / 01</span><strong>INSTALL<br/>WITH INTENT.</strong></div><div className="corner-data">CAMERA ARRAY / A<br/>COVERAGE / 96%<br/>STATUS / NOMINAL</div></div><div className="visual-small"><img src={buildingImage} alt="Commercial security camera system"/><div className="visual-overlay"><span>SYSTEM / 02</span><strong>SEE<br/>EVERY ANGLE.</strong></div></div></div></section>

  <section id="intelligence" className="section intelligence reveal"><div className="section-line"><span>04 / REMOTE MONITORING</span><span>CONTINUOUS VISIBILITY</span></div><div className="intel-grid"><div className="monitor-card"><div className="monitor-top"><span>PROPERTY / SURVEILLANCE</span><span>● LIVE FEED</span></div><div className="monitor-image"><img src={monitoringRoom} alt="Security monitoring environment"/><div className="scan-line"></div><div className="crosshair"></div><span className="cam-label a">CAM 01 / ENTRY</span><span className="cam-label b">CAM 04 / AISLE</span><span className="cam-label c">CAM 07 / SERVICE</span></div><div className="monitor-bottom"><span>REMOTE ACCESS / AUTHORIZED USERS</span><span>SECURE / ACTIVE</span></div></div><div className="intel-copy"><div className="micro">REMOTE VIDEO SURVEILLANCE</div><h2>Maintain visibility.<br/><em>Wherever your business operates.</em></h2><p>Authorized personnel can access surveillance information remotely, helping property and operations teams maintain awareness beyond the physical site.</p><div className="signal"><span>MONITORING STATUS</span><div><i style={{width:"100%"}}></i></div><b>ACTIVE</b></div></div></div></section>

  <section className="section owners reveal"><div className="section-line"><span>05 / FOR PROPERTY LEADERS</span><span>SECURITY / OPERATIONS / OVERSIGHT</span></div><div className="owners-head"><div><div className="micro">FOR PROPERTY & OPERATIONS LEADERS</div><h2>Security that supports<br/><em>better decisions.</em></h2></div><div className="carousel-controls"><button onClick={()=>setOwner((owner+owners.length-1)%owners.length)}>←</button><span>{String(owner+1).padStart(2,"0")} / {String(owners.length).padStart(2,"0")}</span><button onClick={()=>setOwner((owner+1)%owners.length)}>→</button></div></div><div className="owner-carousel reveal-stagger">{owners.map((o,i)=><article className={`owner-card ${i===owner?"owner-active":""}`} key={o.role} onClick={()=>setFlipped(flipped===i?null:i)}><div className={`owner-inner ${flipped===i?"flipped":""}`}><div className="owner-face owner-front"><img src={o.image} alt=""/><div className="owner-shade"></div><div className="owner-role">{o.role}</div><div className="owner-title">{o.title}</div><div className="owner-hint">CLICK TO EXPLORE ↻</div></div><div className="owner-face owner-back"><span>{o.metric}</span><h3>{o.title}</h3><p>{o.text}</p><button className="slide-btn"><span>Request a security review</span><Icon name="arrow"/></button></div></div></article>)}</div></section>

  <section id="quote" className="quote-section reveal"><div className="quote-glow"></div><div className="section-line"><span>06 / CONTACT</span><span>REQUEST A SECURITY REVIEW</span></div><div className="quote-grid"><div><div className="micro">REQUEST A SECURITY REVIEW</div><h2>Tell us what you need to protect.</h2><p>Share your property type, current CCTV environment or planned installation. Our team will review the requirement and recommend an appropriate next step.</p><div className="contact-line"><span>FOCUS</span><strong>COMMERCIAL CCTV & SURVEILLANCE</strong><span>ENQUIRY</span><strong>PROPERTY REVIEW / INSTALLATION / MONITORING</strong></div></div><form onSubmit={submit}>{sent&&<div className="success full">REQUEST RECEIVED / OUR TEAM WILL REVIEW THE DETAILS.</div>}<label>NAME<input required name="name" placeholder="Your name"/></label><label>BUSINESS<input required name="business" placeholder="Company / property"/></label><label>EMAIL<input required type="email" name="email" placeholder="name@company.com"/></label><label>PHONE<input name="phone" placeholder="+1 (___) ___-____"/></label><label className="full">REQUIREMENT<textarea required name="message" rows={4} placeholder="Tell us about the property, CCTV system or monitoring requirement."/></label><div className="full"><MagneticButton className="btn-primary" >Submit security enquiry <Icon name="send"/></MagneticButton></div></form></div></section>

  <footer><div className="footer-brand"><img className="footer-logo" src={eagleLogo} alt="Eagle Eye Monitoring" /><div><b className="shimmer">EAGLE EYE MONITORING</b><small>SEE • TRACK • MANAGE</small></div></div><p>Professional video security infrastructure for commercial environments that require dependable visibility.</p><div className="footer-links"><button onClick={()=>go("services")}>Solutions</button><button onClick={()=>go("installation")}>Deployment</button><button onClick={()=>setLogin(true)}>Secure Login</button></div><div className="footer-bottom"><span>© 2026 EAGLE EYE MONITORING</span><span>SECURITY / VISIBILITY / CONTROL</span></div></footer>

  {search&&<div className="overlay" onMouseDown={()=>setSearch(false)}><div className="search-panel" onMouseDown={e=>e.stopPropagation()}><div className="search-head"><Icon name="search"/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search solutions, deployment, intelligence..."/><button onClick={()=>setSearch(false)}><Icon name="close"/></button></div><div className="search-results">{results.length?results.map((r,i)=><button key={r.label} onClick={()=>{setSearch(false);setQuery("");go(r.id)}}><span>{String(i+1).padStart(2,"0")}</span>{r.label}<Icon name="arrow"/></button>):<p>NO MATCHES / TRY "CCTV" OR "MONITORING"</p>}</div><div className="search-foot">ACTION SEARCH <kbd>ESC</kbd></div></div></div>}
  <aside className={`login-drawer ${login?"open":""}`}><div className="drawer-top"><span>SECURE ACCESS / 09</span><button onClick={()=>setLogin(false)}><Icon name="close"/></button></div><div className="drawer-body"><div className="micro">EAGLE EYE NETWORK</div><h2>Monitoring<br/><em>access.</em></h2><p>Secure access is reserved for authorized monitoring and operations personnel.</p><label>EMAIL<input type="email" placeholder="name@company.com"/></label><label>PASSWORD<input type="password" placeholder="••••••••••"/></label><MagneticButton className="btn-primary">Continue <Icon name="arrow"/></MagneticButton><small className="drawer-note"><Icon name="lock"/> Protected access / authorized users only</small></div></aside>
  {login&&<div className="drawer-backdrop" onClick={()=>setLogin(false)}></div>}
 </main>
}
