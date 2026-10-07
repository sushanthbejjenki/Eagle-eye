import { FormEvent, KeyboardEvent, ReactNode, useEffect, useState } from "react"
import "./index.css"
import heroVideo from "./assets/eagle-approach.mp4"
import heroPoster from "./assets/eagle-approach.png"
import heroFallback from "./assets/eagle-extreme-closeup.png"
import monitoringRoom from "./assets/monitoring-room.jpg"
import eagleEyeLogo from "./assets/eagle-eye-logo.png"

const ENQUIRY_EMAIL = "hr@andsolutions.com"
const ADDRESS = "Fuel Trips 1, 481 US HWY 1S, Rockingham, NC 28379"

const services = [
  { title: "CCTV Monitoring", tag: "SECURITY & SURVEILLANCE", text: "Professional video monitoring that helps businesses maintain dependable visibility across their properties and critical operating areas.", image: monitoringRoom },
  { title: "CCTV Installation", tag: "SECURITY & INSTALLATION", text: "Site assessment, camera placement, installation, configuration and system testing tailored to the property.", image: "https://www.cctvsecuritypros.com/product_images/uploaded_images/profeassional-security-camera-systems.png" },
  { title: "Real Estate Promotions", tag: "REAL ESTATE", text: "Digital and promotional support that helps real estate properties, projects and developments reach the right audiences.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { title: "Digital Marketing", tag: "DIGITAL", text: "Digital marketing support focused on online visibility, audience reach, brand presence and promotional activity.", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80" },
  { title: "Content Creation", tag: "CONTENT", text: "Professional visual and written content developed for business communication, marketing and digital channels.", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80" },
  { title: "Content Moderation", tag: "CONTENT OPERATIONS", text: "Content review and moderation support designed to help maintain consistent and appropriate digital environments.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" },
  { title: "IT & Technology", tag: "TECHNOLOGY", text: "Technology support for business systems, digital infrastructure, software and day-to-day technical requirements.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
]

const industries = ["Retail & Supermarkets", "Commercial Properties", "Warehouses & Distribution", "Property & Real Estate", "Growing Businesses", "Digital Operations"]

function Arrow(){return <span className="arrow">→</span>}
function Button({children,onClick,secondary=false}:{children:ReactNode,onClick?:()=>void,secondary?:boolean}){return <button className={`cta ${secondary?"secondary":""}`} onClick={onClick}>{children}<Arrow/></button>}

export default function App(){
  const [flippedServices,setFlippedServices]=useState<number[]>([])
  const [policy,setPolicy]=useState<"privacy"|"terms"|null>(null)
  const [menu,setMenu]=useState(false)
  const [sent,setSent]=useState(false)

  useEffect(()=>{document.body.style.overflow=policy!==null?"hidden":"";return()=>{document.body.style.overflow=""}},[policy])
  const go=(id:string)=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    const subject=`Eagle Eye Monitoring enquiry — ${data.get("service")}`
    const body=[`Name: ${data.get("name")}`,`Company / Property: ${data.get("company")}`,`Email: ${data.get("email")}`,`Phone: ${data.get("phone")||"Not provided"}`,`Service: ${data.get("service")}`,`Message: ${data.get("message")}`].join("\n")
    window.location.href=`mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    e.currentTarget.reset()
  }

  return <main className="site">
    <header className="nav">
      <button className="brand" onClick={()=>go("home")} aria-label="Eagle Eye Monitoring home"><img src={eagleEyeLogo} alt="Eagle Eye Monitoring"/></button>
      <nav className={menu?"open":""}>
        <button onClick={()=>go("services")}>Services</button><button onClick={()=>go("industries")}>Industries</button><button onClick={()=>go("about")}>About</button><button onClick={()=>go("contact")}>Contact</button>
        <Button onClick={()=>go("contact")}>Request a Quote</Button>
      </nav>
      <button className="hamb" onClick={()=>setMenu(v=>!v)}>☰</button>
    </header>

    <section id="home" className="hero">
      <video className="hero-video" autoPlay muted loop playsInline poster={heroPoster}><source src={heroVideo} type="video/mp4"/></video>
      <img className="hero-fallback" src={heroFallback} alt="Eagle Eye"/>
      <div className="hero-shade"/>
      <div className="hero-content">
        <span className="eyebrow">SECURITY • DIGITAL • TECHNOLOGY</span>
        <h1>SEE WHAT<br/><em>MATTERS.</em></h1>
        <p>Eagle Eye Monitoring provides professional security, real estate, digital marketing, content and technology services for modern businesses.</p>
        <div className="hero-actions"><Button onClick={()=>go("contact")}>Request a Security Review</Button><Button secondary onClick={()=>go("services")}>Explore Our Services</Button></div>
      </div>
    </section>

    <section id="about" className="intro section">
      <div><span className="eyebrow">WHO WE ARE</span><h2>A multi-domain business built around <em>visibility, capability and service.</em></h2></div>
      <div><p>Eagle Eye Monitoring brings together security operations, property promotion, digital marketing, content services and IT & technology support.</p><p>Our approach is practical: understand the requirement, build the right solution and deliver dependable support.</p><Button secondary onClick={()=>go("contact")}>Talk to Our Team</Button></div>
    </section>

    <section id="services" className="section services">
      <div className="section-head"><div><span className="eyebrow">OUR SERVICES</span><h2>Multiple domains.<br/><em>One trusted partner.</em></h2></div><p>Explore the services Eagle Eye Monitoring provides across security, property, digital, content and technology.</p></div>
      <div className="service-grid">{services.map((s,i)=>{
        const flipped=flippedServices.includes(i)
        const toggle=()=>setFlippedServices(current=>current.includes(i)?current.filter(x=>x!==i):[...current,i])
        const keyToggle=(e:KeyboardEvent<HTMLElement>)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}}
        return <article className={`service-card ${flipped?"is-flipped":""}`} key={s.title} tabIndex={0} aria-pressed={flipped} onClick={toggle} onKeyDown={keyToggle}>
          <div className="service-flip-inner">
            <div className="service-face service-front">
              <div className="service-image"><img src={s.image} alt=""/></div>
              <div className="service-front-copy"><span>{s.tag}</span><h3>{s.title}</h3><div className="flip-hint"><span>Hover or tap to explore</span><Arrow/></div></div>
            </div>
            <div className="service-face service-back">
              <span className="eyebrow">{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p>
              <div className="back-actions"><button className="flip-back" type="button" onClick={e=>{e.stopPropagation();toggle()}}>Back</button><Button onClick={()=>go("contact")}>Request a Quote</Button></div>
            </div>
          </div>
        </article>
      })}</div>
    </section>

    <section id="industries" className="section industries"><div className="section-head"><div><span className="eyebrow">INDUSTRIES</span><h2>Services designed for<br/><em>real business environments.</em></h2></div><p>From retail and commercial properties to growing digital businesses, our capabilities can be combined around the requirement.</p></div><div className="industry-grid">{industries.map((x,i)=><div className="industry" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Professional support aligned with operational and business requirements.</p></div>)}</div></section>

    <section className="section process"><span className="eyebrow">HOW WE WORK</span><h2>Understand. Build. <em>Deliver.</em></h2><div className="process-grid">{[["01","Understand","Review the business requirement and operating environment."],["02","Plan","Select the right service mix and practical approach."],["03","Deliver","Execute the work with attention to quality and consistency."],["04","Support","Stay available for follow-up requirements and ongoing support."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

    <section id="contact" className="contact section"><div className="contact-copy"><span className="eyebrow">CONTACT EAGLE EYE</span><h2>Tell us what your business <em>needs.</em></h2><p>Send an enquiry and your email application will open with the details prepared for our team.</p><div className="address"><strong>Business Address</strong><span>{ADDRESS}</span></div><div className="address"><strong>Enquiry Email</strong><span>{ENQUIRY_EMAIL}</span></div></div><form onSubmit={submit}><label>NAME<input name="name" required placeholder="Your name"/></label><label>COMPANY / PROPERTY<input name="company" required placeholder="Company or property name"/></label><label>EMAIL<input name="email" required type="email" placeholder="you@example.com"/></label><label>PHONE<input name="phone" placeholder="Phone number"/></label><label>SERVICE<select name="service"><option>CCTV Monitoring</option><option>CCTV Installation</option><option>Real Estate Promotions</option><option>Digital Marketing</option><option>Content Creation</option><option>Content Moderation</option><option>IT & Technology</option><option>General Enquiry</option></select></label><label>MESSAGE<textarea name="message" required rows={5} placeholder="Tell us what you need..."/></label><Button>Send Enquiry</Button>{sent&&<div className="sent">Your email application has been prepared. Complete the send action in your email app.</div>}<small className="form-note">By submitting, you agree that Eagle Eye Monitoring may use the information provided to respond to your enquiry. See our Privacy Policy.</small></form></section>

    <footer><div className="footer-main"><div className="footer-brand"><img src={eagleEyeLogo} alt="Eagle Eye Monitoring"/><h3>EAGLE EYE MONITORING</h3><p>Security, digital, property, content and technology services for modern businesses.</p></div><div><strong>Explore</strong><button onClick={()=>go("services")}>Services</button><button onClick={()=>go("industries")}>Industries</button><button onClick={()=>go("about")}>About</button></div><div><strong>Legal</strong><button onClick={()=>setPolicy("privacy")}>Privacy Policy</button><button onClick={()=>setPolicy("terms")}>Terms of Use</button></div><div><strong>Location</strong><p>{ADDRESS}</p></div></div><div className="footer-bottom"><span>© 2026 Eagle Eye Monitoring</span><span>SEE • TRACK • MANAGE</span></div></footer>

    {policy&&<div className="modal-backdrop" onClick={()=>setPolicy(null)}><div className="policy-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setPolicy(null)}>×</button><span className="eyebrow">LEGAL</span><h2>{policy==="privacy"?"Privacy Policy":"Terms of Use"}</h2>{policy==="privacy"?<><p><strong>Effective date: October 2026</strong></p><p>Eagle Eye Monitoring respects your privacy. When you submit an enquiry, we may collect information such as your name, company or property name, email address, phone number and message.</p><p>We use this information to review and respond to your enquiry, communicate about requested services and maintain appropriate business records.</p><p>We do not ask visitors to create a public account to use this website. Information submitted through the enquiry form is intended for business communication and should not include passwords, financial credentials or other sensitive information.</p><p>We may use essential website technologies and third-party services needed to operate the site. If analytics, advertising or additional tracking is introduced, this policy should be updated accordingly.</p><p>You may contact us to ask about the personal information you have submitted or to request correction of inaccurate information.</p><p>Privacy questions can be directed to <strong>{ENQUIRY_EMAIL}</strong>.</p></>:<><p>By using this website, you agree to use it lawfully and respectfully.</p><p>Website content is provided for general business information. Service descriptions and availability may change without notice.</p><p>Information submitted through the enquiry form should be accurate and should not contain unlawful, abusive or confidential third-party material.</p><p>Nothing on this website creates a contractual commitment unless separately agreed in writing by Eagle Eye Monitoring.</p><p>Questions about these terms can be directed to <strong>{ENQUIRY_EMAIL}</strong>.</p></>}</div></div>}
  </main>
}
