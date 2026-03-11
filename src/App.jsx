function SettingsSheet({ title, onClose, children }) {
  return (
    <div style={{position:"absolute",inset:0,zIndex:3000,background:"#F2F2F7",display:"flex",flexDirection:"column",animation:"fadeIn .2s ease"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:"white",borderBottom:"1px solid #E5E5EA",flexShrink:0}}>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",alignItems:"center",gap:6,color:"#34C78A",fontWeight:700,fontSize:15,fontFamily:"'Nunito',sans-serif"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#34C78A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Geri
        </button>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:"#1C1C1E"}}>{title}</div>
        <div style={{width:52}}/>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 20px 40px"}}>
        {children}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   AUTH SCREEN — bileşen ve stilleri
═══════════════════════════════════════════════════════════ */
const authGlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

  @keyframes orbitSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes glowPulse  { 0%,100%{opacity:.25} 50%{opacity:.55} }
  @keyframes logoReveal { from{opacity:0;transform:scale(.78) translateY(-18px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes floatUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blobDrift1 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(28px,-18px) scale(1.07)} 70%{transform:translate(-16px,12px) scale(.96)} }
  @keyframes blobDrift2 { 0%,100%{transform:translate(0,0) scale(1)} 35%{transform:translate(-22px,16px) scale(1.04)} 65%{transform:translate(18px,-12px) scale(.98)} }
  @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes authSlideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes authFadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes spin        { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes scaleIn     { from{transform:scale(.88);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes shake       { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  @keyframes codeSuccess { from{transform:scale(.9);opacity:0} to{transform:scale(1);opacity:1} }

  * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  ::-webkit-scrollbar { display:none; }
`;

/* ── LOGO ── */
function SwapLogo() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
      <circle cx="42" cy="42" r="40" fill="#34C78A" opacity="0.13"
        style={{animation:"glowPulse 3.2s ease-in-out infinite"}}/>
      <circle cx="42" cy="42" r="34" stroke="url(#og)" strokeWidth="1.6"
        strokeDasharray="7 5" opacity="0.5"
        style={{animation:"orbitSpin 14s linear infinite",transformOrigin:"42px 42px"}}/>
      <rect x="12" y="12" width="60" height="60" rx="20" fill="url(#lg)"/>
      <text x="42" y="52" textAnchor="middle"
        style={{fontFamily:"'DM Serif Display',serif",fontSize:"30px",fill:"white",fontStyle:"italic"}}>S</text>
      <path d="M22 28 C22 21 29 17 36 19.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity=".75"/>
      <path d="M36 19.5 L33 15.5 M36 19.5 L39.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".75"/>
      <path d="M62 56 C62 63 55 67 48 64.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity=".75"/>
      <path d="M48 64.5 L51 68.5 M48 64.5 L44.5 66.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".75"/>
      <defs>
        <linearGradient id="lg" x1="12" y1="12" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34C78A"/><stop offset="100%" stopColor="#0CBFBA"/>
        </linearGradient>
        <linearGradient id="og" x1="0" y1="0" x2="84" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34C78A"/><stop offset="100%" stopColor="#2DD4BF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── ICONS ── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

/* ── SPINNER ── */
function Spinner({size=22, color="white"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{animation:"spin .8s linear infinite"}}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeOpacity=".25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ═══════════════════════════════
   GOOGLE OAUTH MODAL (Tam Ekran Mobil Sayfa)
═══════════════════════════════ */
function GoogleModal({ onSuccess, onClose }) {
  const [phase, setPhase] = useState("accounts");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const ref0 = useRef(null); const ref1 = useRef(null); const ref2 = useRef(null);
  const ref3 = useRef(null); const ref4 = useRef(null); const ref5 = useRef(null);
  const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5];

  const handleDefaultLogin = () => {
    setPhase("loading");
    setTimeout(() => onSuccess({name:"Sena Yılmaz", email:"sena.ylmz@gmail.com", avatar:"https://i.pravatar.cc/150?img=68"}), 1500);
  };

  const handleOtpKey = (idx, val) => {
    if (!/^[0-9]*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5 && inputRefs[idx+1].current) inputRefs[idx+1].current.focus();
    if (next.every(d => d !== "")) {
      setTimeout(() => setPhase("profile"), 400);
    }
  };

  const finishProfile = () => {
    if (fullName.length < 3 || username.length < 3) return;
    setPhase("loading");
    setTimeout(() => onSuccess({name: fullName, username: username, email: email, avatar: "https://i.pravatar.cc/150?img=11"}), 1500);
  };

  return (
    <div style={{
      position:"fixed", top:0, bottom:0, left:0, right:0, margin:"0 auto",
      width:"100%", maxWidth:384,
      background:"white", zIndex:9000,
      display:"flex", flexDirection:"column",
      animation:"fadeIn .2s ease", overflow:"hidden"
    }}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px",borderBottom:"1px solid #F2F2F7",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:24,height:24,background:"white",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"}}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          </div>
          <span style={{fontFamily:"'Nunito',sans-serif",fontSize:16,fontWeight:800,color:"#1C1C1E"}}>Google ile Giriş Yap</span>
        </div>
        <button onClick={onClose} style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Kaydırılabilir İçerik Alanı */}
      <div style={{flex:1,overflowY:"auto"}}>

        {phase === "accounts" && (
          <div style={{padding:"20px",animation:"fadeIn .3s ease"}}>
            <div style={{fontSize:14,color:"#6D6D72",marginBottom:16,fontWeight:600}}>Bir hesap seçin:</div>
            <div onClick={handleDefaultLogin} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:16,cursor:"pointer",marginBottom:12,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#34C78A"} onMouseLeave={e=>e.currentTarget.style.borderColor="#E5E5EA"}>
              <img src="https://i.pravatar.cc/150?img=68" style={{width:40,height:40,borderRadius:"50%"}} alt=""/>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E"}}>Sena Yılmaz</div>
                <div style={{fontSize:13,color:"#8E8E93"}}>sena.ylmz@gmail.com</div>
              </div>
            </div>
            <button onClick={()=>setPhase("email")} style={{width:"100%",padding:"14px",background:"transparent",border:"1.5px solid #E5E5EA",borderRadius:16,color:"#3A3A3C",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Farklı bir hesap kullan
            </button>
          </div>
        )}

        {phase === "email" && (
          <div style={{padding:"24px 20px",animation:"slideInRight .3s ease"}}>
            <div style={{fontSize:20,fontWeight:900,color:"#1C1C1E",marginBottom:8}}>Oturum aç</div>
            <div style={{fontSize:14,color:"#6D6D72",marginBottom:24}}>TakasApp uygulamasına devam etmek için</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta veya telefon" autoFocus style={{width:"100%",padding:"16px",borderRadius:12,border:"1px solid #D1D1D6",outline:"none",fontSize:16,marginBottom:24,boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#007AFF"} onBlur={e=>e.target.style.borderColor="#D1D1D6"}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#007AFF",fontSize:14,fontWeight:700,cursor:"pointer"}}>E-postanızı mı unuttunuz?</span>
              <button onClick={()=>setPhase("password")} disabled={!email.includes("@")} style={{padding:"10px 24px",background:email.includes("@")?"#007AFF":"#E5E5EA",color:"white",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:email.includes("@")?"pointer":"default"}}>İleri</button>
            </div>
          </div>
        )}

        {phase === "password" && (
          <div style={{padding:"24px 20px",animation:"slideInRight .3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20,padding:"8px 12px",border:"1px solid #E5E5EA",borderRadius:30,width:"fit-content",cursor:"pointer"}} onClick={()=>setPhase("email")}>
              <div style={{width:20,height:20,background:"#F2F2F7",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>👤</div>
              <span style={{fontSize:12,fontWeight:700,color:"#3A3A3C"}}>{email}</span>
            </div>
            <div style={{fontSize:20,fontWeight:900,color:"#1C1C1E",marginBottom:24}}>Hoş geldiniz</div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Şifrenizi girin" autoFocus style={{width:"100%",padding:"16px",borderRadius:12,border:"1px solid #D1D1D6",outline:"none",fontSize:16,marginBottom:24,boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#007AFF"} onBlur={e=>e.target.style.borderColor="#D1D1D6"}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#007AFF",fontSize:14,fontWeight:700,cursor:"pointer"}}>Şifrenizi mi unuttunuz?</span>
              <button onClick={()=>setPhase("otp")} disabled={password.length<4} style={{padding:"10px 24px",background:password.length>=4?"#007AFF":"#E5E5EA",color:"white",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:password.length>=4?"pointer":"default"}}>İleri</button>
            </div>
          </div>
        )}

        {phase === "otp" && (
          <div style={{padding:"24px 20px",animation:"slideInRight .3s ease"}}>
            <div style={{fontSize:20,fontWeight:900,color:"#1C1C1E",marginBottom:8}}>2 Adımlı Doğrulama</div>
            <div style={{fontSize:14,color:"#6D6D72",marginBottom:24,lineHeight:1.5}}>Cihazınıza gönderilen 6 haneli Google doğrulama kodunu girin.</div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:32}}>
              {otp.map((d,i) => (
                <input key={i} ref={inputRefs[i]} type="text" inputMode="numeric" maxLength={1} value={d} onChange={e=>handleOtpKey(i,e.target.value)} style={{width:40,height:50,textAlign:"center",fontSize:20,fontWeight:700,border:"1px solid #D1D1D6",borderRadius:8,outline:"none",color:"#1C1C1E"}} onFocus={e=>e.target.style.borderColor="#007AFF"} onBlur={e=>e.target.style.borderColor="#D1D1D6"}/>
              ))}
            </div>
          </div>
        )}

        {phase === "profile" && (
          <div style={{padding:"24px 20px",animation:"slideInRight .3s ease"}}>
            <div style={{fontSize:20,fontWeight:900,color:"#1C1C1E",marginBottom:8}}>Profilini Tamamla</div>
            <div style={{fontSize:14,color:"#6D6D72",marginBottom:24,lineHeight:1.5}}>TakasApp topluluğunda diğer kullanıcıların seni nasıl göreceğini belirle.</div>
            <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Ad Soyad" style={{width:"100%",padding:"16px",borderRadius:12,border:"1px solid #D1D1D6",outline:"none",fontSize:16,marginBottom:16,boxSizing:"border-box",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#1C1C1E"}} onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#D1D1D6"}/>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Kullanıcı Adı (Örn: takas_ustasi)" style={{width:"100%",padding:"16px",borderRadius:12,border:"1px solid #D1D1D6",outline:"none",fontSize:16,marginBottom:24,boxSizing:"border-box",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#1C1C1E"}} onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#D1D1D6"}/>
            <button onClick={finishProfile} disabled={fullName.length<3||username.length<3} style={{width:"100%",padding:"16px",background:(fullName.length>=3&&username.length>=3)?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",color:(fullName.length>=3&&username.length>=3)?"white":"#8E8E93",border:"none",borderRadius:16,fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:(fullName.length>=3&&username.length>=3)?"pointer":"default",boxShadow:(fullName.length>=3&&username.length>=3)?"0 8px 24px #34C78A44":"none",transition:"all .2s"}}>
              Takaslamaya Başla 🚀
            </button>
          </div>
        )}

        {phase === "loading" && (
          <div style={{padding:"60px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
            <Spinner size={32} color="#34C78A"/>
            <div style={{fontSize:14,fontWeight:800,color:"#6D6D72",fontFamily:"'Nunito',sans-serif"}}>Senin için her şey hazırlanıyor...</div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ═══════════════════════════════
   APPLE BOTTOM SHEET
═══════════════════════════════ */
function AppleSheet({ onSuccess, onClose }) {
  const [phase, setPhase] = useState("idle"); // idle | loading

  const proceed = () => {
    setPhase("loading");
    setTimeout(() => onSuccess(), 1400);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:9000,display:"flex",flexDirection:"column",justifyContent:"flex-end",animation:"authFadeIn .2s ease"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(8px)"}}/>

      <div style={{
        position:"relative", background:"#1C1C1E",
        borderRadius:"28px 28px 0 0",
        padding:"0 0 40px",
        boxShadow:"0 -8px 40px rgba(0,0,0,.5)",
        animation:"authSlideUp .4s cubic-bezier(0.32,0.72,0,1)",
        maxWidth:390, width:"100%", margin:"0 auto",
      }}>
        {/* Handle */}
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
          <div style={{width:36,height:4,background:"rgba(255,255,255,.2)",borderRadius:99}}/>
        </div>

        {/* Apple ID card */}
        <div style={{padding:"20px 24px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <div style={{
              width:52,height:52,borderRadius:14,background:"white",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#1C1C1E">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:"white",fontFamily:"'Nunito',sans-serif"}}>Apple ID ile Sürdür</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:2}}>{currentUser?.email?.replace("gmail","icloud") || "icloud@example.com"}</div>
            </div>
          </div>

          <div style={{background:"rgba(255,255,255,.07)",borderRadius:16,padding:"14px 16px",marginBottom:16}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:6}}>Swapla uygulamasına şununla giriş yap:</div>
            <div style={{fontSize:14,fontWeight:700,color:"white",fontFamily:"'Nunito',sans-serif"}}>Ad, e-posta adresi</div>
          </div>

          <button onClick={proceed} disabled={phase==="loading"}
            style={{
              width:"100%", padding:"16px", borderRadius:16, border:"none",
              background: phase==="loading" ? "rgba(255,255,255,.2)" : "white",
              color:"#1C1C1E", fontSize:15, fontWeight:800,
              cursor: phase==="loading" ? "default" : "pointer",
              fontFamily:"'Nunito',sans-serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              transition:"all .2s",
            }}>
            {phase==="loading" ? <><Spinner size={18} color="#1C1C1E"/>Giriş yapılıyor...</> : "Parola ile Sürdür"}
          </button>

          <button onClick={onClose} style={{
            width:"100%", padding:"14px", borderRadius:16, border:"none", marginTop:10,
            background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.7)",
            fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Nunito',sans-serif",
          }}>
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   EMAIL OTP FLOW (Giriş & Kayıt Ol)
═══════════════════════════════ */
function EmailFlow({ initialMode="login", onSuccess, onClose }) {
  const [mode, setMode]         = useState(initialMode);
  const [phase, setPhase]       = useState("email");
  const [email, setEmail]       = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp]           = useState(["","","","","",""]);
  const [shake, setShake]       = useState(false);
  const [sending, setSending]   = useState(false);
  const ref0 = useRef(null); const ref1 = useRef(null); const ref2 = useRef(null);
  const ref3 = useRef(null); const ref4 = useRef(null); const ref5 = useRef(null);
  const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5];

  const sendCode = () => {
    if (!email.includes("@")) return;
    if (mode === "register" && fullName.trim().length < 3) return;
    setSending(true);
    setTimeout(() => { setSending(false); setPhase("otp"); }, 900);
  };

  const handleOtpKey = (idx, val) => {
    if (!/^[0-9]*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5 && inputRefs[idx+1].current) inputRefs[idx+1].current.focus();
    if (next.every(d => d !== "")) {
      setTimeout(() => {
        setPhase("loading");
        const finalName = mode === "register" ? fullName : email.split("@")[0];
        setTimeout(() => onSuccess({ name: finalName, email: email, avatar: "https://i.pravatar.cc/150?img=" + (mode==="register"?1:3) }), 1200);
      }, 200);
    }
  };

  const handleOtpBackspace = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) inputRefs[idx-1].current.focus();
  };

  const isReady = email.includes("@") && (mode === "login" || fullName.trim().length >= 3);

  return (
    <div style={{position:"fixed",inset:0,zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",animation:"authFadeIn .2s ease"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)"}}/>
      <div style={{position:"relative",width:340,background:"white",borderRadius:28,padding:"28px 24px 24px",boxShadow:"0 24px 80px rgba(0,0,0,.28)",animation:"scaleIn .3s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"#F2F2F7",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </button>

        {phase === "email" && (
          <div style={{animation:"fadeIn .3s ease"}}>
            <div style={{fontSize:22,fontWeight:900,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",marginBottom:6}}>
              {mode === "login" ? "Tekrar Ho\u015f Geldin" : "Aram\u0131za Kat\u0131l"}
            </div>
            <div style={{fontSize:13,color:"#8E8E93",marginBottom:20}}>
              {mode === "login" ? "Hesab\u0131na giri\u015f yapmak i\u00e7in e-posta adresini gir." : "Takaslamaya ba\u015flamak i\u00e7in bir hesap olu\u015ftur."}
            </div>
            {mode === "register" && (
              <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Ad Soyad"
                style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid #E5E5EA",outline:"none",fontSize:15,fontFamily:"'Nunito',sans-serif",color:"#1C1C1E",fontWeight:600,marginBottom:12,boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}
              />
            )}
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendCode();}} placeholder="E-posta adresin" autoFocus={mode==="login"}
              style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid #E5E5EA",outline:"none",fontSize:15,fontFamily:"'Nunito',sans-serif",color:"#1C1C1E",fontWeight:600,marginBottom:14,boxSizing:"border-box"}}
              onFocus={e=>{e.target.style.borderColor="#34C78A";e.target.style.boxShadow="0 0 0 4px #34C78A18";}} onBlur={e=>{e.target.style.borderColor="#E5E5EA";e.target.style.boxShadow="none";}}
            />
            <button onClick={sendCode} disabled={!isReady||sending}
              style={{width:"100%",padding:"15px",borderRadius:14,border:"none",background:isReady?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",color:isReady?"white":"#C7C7CC",fontSize:15,fontWeight:800,cursor:isReady?"pointer":"default",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:isReady?"0 8px 24px #34C78A44":"none",transition:"all .2s"}}>
              {sending ? <><Spinner size={16} color="white"/>G\u00f6nderiliyor...</> : "Kod G\u00f6nder \u2192"}
            </button>
            <div style={{textAlign:"center",marginTop:20,fontSize:13,color:"#8E8E93",fontWeight:600}}>
              {mode === "login" ? "Hesab\u0131n yok mu? " : "Zaten hesab\u0131n var m\u0131? "}
              <span onClick={()=>{setMode(mode==="login"?"register":"login");setEmail("");setFullName("");}} style={{color:"#34C78A",fontWeight:800,cursor:"pointer"}}>
                {mode === "login" ? "Kay\u0131t Ol" : "Giri\u015f Yap"}
              </span>
            </div>
          </div>
        )}

        {(phase === "otp" || phase === "loading") && (
          <div style={{animation:"slideInRight .3s ease"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:36,marginBottom:8}}>&#128236;</div>
              <div style={{fontSize:19,fontWeight:900,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",marginBottom:6}}>Kodu Gir</div>
              <div style={{fontSize:12,color:"#8E8E93",lineHeight:1.5}}>
                <span style={{color:"#34C78A",fontWeight:700}}>{email}</span> adresine<br/>6 haneli do\u011frulama kodu g\u00f6nderildi.
              </div>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>
              {otp.map((d,i) => (
                <input key={i} ref={inputRefs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={e=>handleOtpKey(i,e.target.value)} onKeyDown={e=>handleOtpBackspace(i,e)}
                  style={{width:42,height:52,textAlign:"center",fontSize:22,fontWeight:800,fontFamily:"'Nunito',sans-serif",border:d?"2px solid #34C78A":"2px solid #E5E5EA",borderRadius:12,outline:"none",color:"#1C1C1E",background:d?"#F0FDF8":"white",transition:"all .15s",boxShadow:d?"0 0 0 3px #34C78A18":"none"}}
                />
              ))}
            </div>
            {phase === "loading" && (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px",background:"#F0FDF8",borderRadius:12}}>
                <Spinner size={16} color="#34C78A"/>
                <span style={{fontSize:13,fontWeight:700,color:"#28A876",fontFamily:"'Nunito',sans-serif"}}>Do\u011frulan\u0131yor...</span>
              </div>
            )}
            {phase === "otp" && (
              <div style={{textAlign:"center",fontSize:12,color:"#8E8E93"}}>
                Kod gelmedi mi? <span style={{color:"#34C78A",fontWeight:700,cursor:"pointer"}} onClick={()=>setPhase("email")}>Tekrar g\u00f6nder</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════
   MAIN AUTH SCREEN
═══════════════════════════════ */
function AuthScreen({ onLogin }) {
  const [hovered,   setHovered]   = useState(null);
  const [modal,     setModal]     = useState(null); // null | "google" | "apple" | "email"

  const done = () => { setModal(null); if(onLogin) onLogin(); };

  const buttons = [
    { key:"google", icon:<GoogleIcon/>, label:"Google ile Devam Et",  bg:"white",      color:"#1C1C1E", border:"1.5px solid #E5E5EA",    shadow:"0 2px 16px rgba(0,0,0,.07)" },
    { key:"apple",  icon:<AppleIcon/>,  label:"Apple ile Devam Et",   bg:"#1C1C1E",    color:"white",   border:"none",                   shadow:"0 4px 24px rgba(0,0,0,.22)" },
    { key:"email",  icon:<EmailIcon/>,  label:"E-posta ile Devam Et", bg:"transparent",color:"#34C78A", border:"1.5px solid #34C78A",    shadow:"none" },
  ];

  return (
    <>
      <style>{authGlobalStyles}</style>

      <div style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        background:"#F0F0F0", fontFamily:"'Nunito', sans-serif",
      }}>
        <div style={{
          width:390, minHeight:720, borderRadius:52, overflow:"hidden",
          position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.08)",
          display:"flex", flexDirection:"column", background:"#FAFAF8",
        }}>
          {/* Blobs */}
          <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
            <div style={{position:"absolute",width:420,height:420,borderRadius:"50%",top:-140,left:-100,background:"radial-gradient(circle,#34C78A33 0%,transparent 70%)",animation:"blobDrift1 9s ease-in-out infinite"}}/>
            <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",bottom:-100,right:-80,background:"radial-gradient(circle,#2DD4BF28 0%,transparent 70%)",animation:"blobDrift2 11s ease-in-out infinite"}}/>
          </div>

          {/* Status bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 28px 0",position:"relative",zIndex:1}}>
            <span style={{fontSize:13,fontWeight:700,color:"#1C1C1E"}}>9:41</span>
            <div style={{width:26,height:13,border:"1.5px solid #1C1C1E",borderRadius:4,position:"relative",opacity:.7}}>
              <div style={{position:"absolute",left:2,top:2,bottom:2,width:"75%",background:"#34C78A",borderRadius:2}}/>
            </div>
          </div>

          {/* Content */}
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"0 32px 48px",position:"relative",zIndex:1}}>

            {/* Logo + headline */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:48,gap:0}}>
              <div style={{animation:"logoReveal .7s cubic-bezier(0.34,1.56,0.64,1) both"}}><SwapLogo/></div>
              <div style={{
                marginTop:18, fontFamily:"'DM Serif Display',serif", fontSize:38,
                fontWeight:400, letterSpacing:"-1.5px",
                background:"linear-gradient(90deg,#1A1A1A 0%,#34C78A 50%,#0CBFBA 100%)",
                backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                animation:"logoReveal .8s .1s cubic-bezier(0.34,1.56,0.64,1) both, shimmer 4s 1s linear infinite",
              }}>Swapla</div>
              <div style={{marginTop:12,fontSize:15,fontWeight:500,color:"#6D6D72",letterSpacing:"0.1px",textAlign:"center",lineHeight:1.5,animation:"floatUp .7s .25s both"}}>
                Nakit bitti,{" "}
                <span style={{color:"#34C78A",fontWeight:800,fontFamily:"'DM Serif Display',serif",fontStyle:"italic"}}>takas başladı.</span>
              </div>

              {/* Badges */}
              <div style={{display:"flex",gap:8,marginTop:28,animation:"floatUp .7s .35s both"}}>
                {["♻️ Sürdürülebilir","🤝 Güvenli","💚 Ücretsiz"].map((tag,i)=>(
                  <div key={i} style={{padding:"5px 11px",borderRadius:99,background:"rgba(52,199,138,0.10)",border:"1px solid rgba(52,199,138,0.22)",fontSize:11,fontWeight:700,color:"#28A876",whiteSpace:"nowrap"}}>{tag}</div>
                ))}
              </div>

              {/* Showcase cards */}
              <div style={{marginTop:36,display:"flex",alignItems:"center",animation:"floatUp .7s .42s both"}}>
                {[{emoji:"📷",name:"Kamera",pts:"1200"},{emoji:"👟",name:"Sneaker",pts:"900"},{emoji:"🎸",name:"Gitar",pts:"1500"}].map((item,i)=>(
                  <div key={i} style={{
                    width:80,height:96,background:"white",borderRadius:18,
                    boxShadow:"0 4px 24px rgba(0,0,0,.09)",
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
                    border:"1.5px solid rgba(0,0,0,.05)",
                    transform:`rotate(${(i-1)*7}deg) translateY(${i===1?-8:4}px)`,
                    marginLeft:i===0?0:-14, zIndex:i===1?3:i===0?2:1, position:"relative",
                  }}>
                    <span style={{fontSize:28}}>{item.emoji}</span>
                    <span style={{fontSize:9,fontWeight:700,color:"#8E8E93"}}>{item.name}</span>
                    <div style={{background:"linear-gradient(135deg,#34C78A,#2DD4BF)",borderRadius:99,padding:"2px 8px",fontSize:9,fontWeight:900,color:"white"}}>{item.pts}P</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
              {buttons.map((btn,i)=>(
                <button key={btn.key}
                  onClick={()=>setModal(btn.key)}
                  onMouseEnter={()=>setHovered(btn.key)}
                  onMouseLeave={()=>setHovered(null)}
                  style={{
                    width:"100%", padding:"16px 20px", borderRadius:18, border:btn.border,
                    background: hovered===btn.key
                      ? (btn.key==="google" ? "#F8F8F8" : btn.key==="apple" ? "#2C2C2E" : "rgba(52,199,138,.08)")
                      : btn.bg,
                    color:btn.color, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:12,
                    fontSize:15, fontWeight:800, fontFamily:"'Nunito',sans-serif",
                    boxShadow:btn.shadow,
                    transform:hovered===btn.key?"translateY(-2px)":"none",
                    transition:"all .2s cubic-bezier(0.34,1.56,0.64,1)",
                    animation:`floatUp .6s ${0.5+i*.08}s both`,
                  }}>
                  <span style={{display:"flex",alignItems:"center"}}>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}

              <div style={{textAlign:"center", marginTop:16, fontSize:14, color:"#8E8E93", fontWeight:700, animation:"floatUp .6s .7s both"}}>
                Hesabın yok mu? <span onClick={()=>setModal("register")} style={{color:"#34C78A", cursor:"pointer", fontWeight:900, textDecoration:"underline"}}>Kayıt Ol</span>
              </div>

          <p style={{textAlign:"center",fontSize:11,color:"#C7C7CC",margin:"16px 0 0",lineHeight:1.5,animation:"floatUp .6s .8s both"}}>
                Devam ederek{" "}
                <span style={{color:"#8E8E93",textDecoration:"underline",cursor:"pointer"}}>Kullanım Şartları</span>
                {" "}ve{" "}
                <span style={{color:"#8E8E93",textDecoration:"underline",cursor:"pointer"}}>Gizlilik Politikası</span>'nı kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals — rendered outside phone frame */}
      {modal==="google" && <GoogleModal onSuccess={done} onClose={()=>setModal(null)}/>}
      {modal==="apple" && <AppleSheet  onSuccess={done} onClose={()=>setModal(null)}/>}
      {modal==="email" && <EmailFlow initialMode="login" onSuccess={done} onClose={()=>setModal(null)}/>}
      {modal==="register" && <EmailFlow initialMode="register" onSuccess={done} onClose={()=>setModal(null)}/>}
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   ANA UYGULAMA
═══════════════════════════════════════════════════════════ */

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

  @keyframes slideUp      { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes slideInRight { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes fadeIn       { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn      { from{transform:scale(0.88);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes bounceIn     { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.12)} 70%{transform:scale(0.93)} 100%{transform:scale(1);opacity:1} }
  @keyframes countUp      { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes shimmerBg    { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes pulse        { 0%,100%{box-shadow:0 8px 32px #34C78A55} 50%{box-shadow:0 8px 48px #34C78A99} }
  @keyframes float        { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
  @keyframes fadeSlideUp  { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes ripple       { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(4);opacity:0} }
  @keyframes heroFadeIn   { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
  @keyframes stickyIn     { from{transform:translateY(80px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes heartPop     { 0%{transform:scale(1)} 30%{transform:scale(1.45)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
  @keyframes confettiDrop { 0%{transform:translateY(-30px) rotate(0deg) scale(1);opacity:1} 100%{transform:translateY(120px) rotate(720deg) scale(0.5);opacity:0} }
  @keyframes sparkle      { 0%{transform:scale(0) rotate(0deg);opacity:1} 60%{transform:scale(1.4) rotate(180deg);opacity:1} 100%{transform:scale(0) rotate(360deg);opacity:0} }

  /* Match screen specific */
  @keyframes darkOverlay  { from{opacity:0} to{opacity:1} }
  @keyframes dropFromTop  { from{transform:translateY(-260px) scale(0.8) rotate(-6deg);opacity:0} to{transform:translateY(0) scale(1) rotate(-4deg);opacity:1} }
  @keyframes riseFromBot  { from{transform:translateY(260px) scale(0.8) rotate(6deg);opacity:0} to{transform:translateY(0) scale(1) rotate(5deg);opacity:1} }
  @keyframes collide      { 0%{transform:scale(1)} 30%{transform:scale(1.08)} 60%{transform:scale(0.97)} 100%{transform:scale(1)} }
  @keyframes matchText    { 0%{transform:scale(0.4) translateY(20px);opacity:0;letter-spacing:-4px}
                            60%{transform:scale(1.06) translateY(-4px);opacity:1;letter-spacing:6px}
                            100%{transform:scale(1) translateY(0);opacity:1;letter-spacing:4px} }
  @keyframes subText      { from{transform:translateY(12px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes btnReveal    { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes glowPulse    { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes ringExpand   { 0%{transform:translate(-50%,-50%) scale(0);opacity:.8} 100%{transform:translate(-50%,-50%) scale(3);opacity:0} }
  @keyframes barFill      { from{width:0} to{width:var(--target-w)} }
  @keyframes tabSlideIn   { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes profileDrop  { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes offerPop     { 0%{transform:scale(0.85);opacity:0} 60%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
  @keyframes swipeHint    { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-6px)} }
  @keyframes editBadge    { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes chatSlideIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes bubbleIn     { from{transform:scale(0.7) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
  @keyframes typingDot    { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }
  @keyframes cardReveal   { from{transform:translateY(12px) scale(0.96);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }

  ::-webkit-scrollbar{display:none}
  *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
`;

/* ─── DATA ───────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all",   label: "Tümü",       icon: "✨" },
  { id: "giyim", label: "Giyim",      icon: "👕" },
  { id: "elec",  label: "Elektronik", icon: "📱" },
  { id: "ev",    label: "Ev",         icon: "🏠" },
  { id: "spor",  label: "Spor",       icon: "🏀" },
  { id: "hobi",  label: "Hobi",       icon: "🎨" },
];
const PRODUCTS = [
  {id:1,name:"Vintage Deri Ceket", points:850, category:"Giyim",      condition:"ciziksiz",emoji:"🧥",bg:"linear-gradient(135deg,#8B4513,#D2691E)",owner:"Ayşe K.", ownerAvatar:"https://i.pravatar.cc/80?img=47"},
  {id:2,name:"Polaroid Kamera",    points:1200,category:"Elektronik", condition:"sifir",   emoji:"📷",bg:"linear-gradient(135deg,#2C3E50,#4A6FA5)",owner:"Mert D.", ownerAvatar:"https://i.pravatar.cc/80?img=12"},
  {id:3,name:"Ahşap Masa Lambası", points:500, category:"Ev",          condition:"ciziksiz",emoji:"🪔",bg:"linear-gradient(135deg,#F4A460,#DEB887)",owner:"Zeynep A.",ownerAvatar:"https://i.pravatar.cc/80?img=9"},
  {id:4,name:"Bisiklet Kaskı",     points:420, category:"Spor",        condition:"yorgun",  emoji:"🪖",bg:"linear-gradient(135deg,#E74C3C,#C0392B)",owner:"Can B.",  ownerAvatar:"https://i.pravatar.cc/80?img=33"},
  {id:5,name:"Saksı Koleksiyonu",  points:300, category:"Ev",          condition:"ciziksiz",emoji:"🪴",bg:"linear-gradient(135deg,#27AE60,#2ECC71)",owner:"Elif S.", ownerAvatar:"https://i.pravatar.cc/80?img=25"},
  {id:6,name:"Retro Tenis Raketi", points:650, category:"Spor",        condition:"yorgun",  emoji:"🎾",bg:"linear-gradient(135deg,#F39C12,#E67E22)",owner:"Burak T.",ownerAvatar:"https://i.pravatar.cc/80?img=54"},
];
const MY_ITEMS = [
  {id:10,name:"Filtre Kahve Makinesi",points:850, emoji:"☕", bg:"linear-gradient(135deg,#6F4E37,#A67B5B)"},
  {id:11,name:"Mekanik Klavye",        points:500, emoji:"⌨️",bg:"linear-gradient(135deg,#4B0082,#8A2BE2)"},
  {id:12,name:"Retro Pikap",           points:1200,emoji:"📻",bg:"linear-gradient(135deg,#800000,#A52A2A)"},
];
const CONDITION_MAP = {sifir:{label:"✨ Sıfır",color:"#34C78A"},ciziksiz:{label:"👍 Çiziksiz",color:"#007AFF"},yorgun:{label:"🛠 Yorgun",color:"#FF9500"}};
const DESCRIPTIONS = {
  1:"Gerçek vintage severlerin arayıp bulamayacağı türden kalın, sertlenmiş bir deri ceket. 1990'lardan kalma orjinal dikişler ve düğmeler korunmuş.",
  2:"Orijinal kutusunda, filmleriyle birlikte satılık Polaroid Now+ kamera. Bluetooth bağlantılı, çift mercekli, filtre destekli. Yalnızca 3 film kartuşu kullanıldı.",
  3:"Solid teak ağacından el yapımı masa lambası. Doğal ahşap dokusu, mat siyah metal aplik. Sarı ışık, çalışma masanıza sıcak bir atmosfer katar.",
  4:"İyi marka bisiklet kaskı — boyut M/L. Birkaç ufak çizik dışında sağlam.",
  5:"El yapımı çimento ve seramik saksı koleksiyonu, 5 adet. Boyutlar 8–24cm.",
  6:"Wilson marka klasik tahta tenis raketi, orijinal kılıfıyla. Koleksiyonluk.",
};

/* ─── MESSAGES & PROFILE DATA ───────────────────────────────── */
const PENDING_OFFERS = [
  {id:1, myItem:{name:"Mekanik Klavye",        emoji:"⌨️",bg:"linear-gradient(135deg,#4B0082,#8A2BE2)"},
         theirItem:{name:"Retro Tenis Raketi",  emoji:"🎾",bg:"linear-gradient(135deg,#F39C12,#E67E22)"},
         from:"Burak T.", avatar:"https://i.pravatar.cc/80?img=54", points:"500 ⇄ 650"},
  {id:2, myItem:{name:"Filtre Kahve Makinesi", emoji:"☕",bg:"linear-gradient(135deg,#6F4E37,#A67B5B)"},
         theirItem:{name:"Vintage Deri Ceket",  emoji:"🧥",bg:"linear-gradient(135deg,#8B4513,#D2691E)"},
         from:"Ayşe K.",  avatar:"https://i.pravatar.cc/80?img=47", points:"850 ⇄ 850"},
  {id:3, myItem:{name:"Retro Pikap",            emoji:"📻",bg:"linear-gradient(135deg,#800000,#A52A2A)"},
         theirItem:{name:"Polaroid Kamera",      emoji:"📷",bg:"linear-gradient(135deg,#2C3E50,#4A6FA5)"},
         from:"Mert D.",  avatar:"https://i.pravatar.cc/80?img=12", points:"1200 ⇄ 1200"},
];
const CONVERSATIONS = [
  { id:1, name:"Mert D.", avatar:"https://i.pravatar.cc/80?img=12", last:"Harika! Yarın teslim edebiliriz 🎉", time:"şimdi", unread:true },
  { id:2, name:"Ayşe K.", avatar:"https://i.pravatar.cc/80?img=47", last:"Ceketim hâlâ çok temiz, hiç çizik yok.", time:"2d", unread:true },
  { id:3, name:"Zeynep A.", avatar:"https://i.pravatar.cc/80?img=9",  last:"Tamam, yarın bakarım!", time:"Dün", unread:false },
  { id:4, name:"Can B.",  avatar:"https://i.pravatar.cc/80?img=33", last:"Kasktaki çizikler küçük ama var.", time:"Pzt", unread:false },
  { id:5, name:"Elif S.", avatar:"https://i.pravatar.cc/80?img=25", last:"Saksılar sağlam, merak etme.", time:"Paz", unread:false },
];

/* ─── ICONS ─────────────────────────────────────────────────── */
const ChevronLeft=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const HeartFill=({filled})=><svg width="20" height="20" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill={filled?"#FF3B30":"none"} stroke={filled?"#FF3B30":"white"} strokeWidth="1.8" strokeLinejoin="round"/></svg>;
const ShareIcon=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MsgIcon=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#34C78A" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8 10h8M8 13h5" stroke="#34C78A" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const CheckIcon=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const HomeIcon=({active})=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={active?"#34C78A":"#8E8E93"} strokeWidth="1.8" strokeLinejoin="round" fill={active?"#34C78A18":"none"}/><path d="M9 21V12h6v9" stroke={active?"#34C78A":"#8E8E93"} strokeWidth="1.8" strokeLinecap="round"/></svg>;
const ChatIconNav=({active})=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={active?"#34C78A":"#8E8E93"} strokeWidth="1.8" strokeLinejoin="round" fill={active?"#34C78A18":"none"}/></svg>;
const ProfileIcon=({active})=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={active?"#34C78A":"#8E8E93"} strokeWidth="1.8" fill={active?"#34C78A18":"none"}/><path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke={active?"#34C78A":"#8E8E93"} strokeWidth="1.8" strokeLinecap="round"/></svg>;
const CameraIcon=()=><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke="#34C78A" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="#34C78A" strokeWidth="1.6"/><circle cx="12" cy="13" r="1.5" fill="#34C78A" opacity="0.3"/></svg>;

/* ─── CONFETTI ───────────────────────────────────────────────── */
function Confetti({count=28}) {
  const particles = Array.from({length:count},(_,i)=>({
    id:i,
    left:`${5+(i*3.4)%90}%`,
    top:`${-10+(i%4)*5}%`,
    color:["#34C78A","#2DD4BF","#FFD60A","#FF6B6B","#5E5CE6","#FF9F0A","#BF5AF2"][i%7],
    delay:`${(i*0.06).toFixed(2)}s`,
    duration:`${0.9+Math.random()*0.6}s`,
    size:i%3===0?12:8,
    shape:i%4===0?"50%":"3px",
  }));
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:5}}>
      {particles.map(p=>(
        <div key={p.id} style={{
          position:"absolute",left:p.left,top:p.top,
          width:p.size,height:p.size,
          background:p.color,borderRadius:p.shape,
          animation:`confettiDrop ${p.duration} ${p.delay} ease-out forwards`,
        }}/>
      ))}
    </div>
  );
}

/* ─── SPARKLES ───────────────────────────────────────────────── */
function Sparkles() {
  const sparks = Array.from({length:16},(_,i)=>({
    id:i,
    x:`${10+(i*5.8)%80}%`,
    y:`${15+(i*7.3)%70}%`,
    delay:`${(i*0.09).toFixed(2)}s`,
    size:i%3===0?16:10,
  }));
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:4}}>
      {sparks.map(s=>(
        <div key={s.id} style={{
          position:"absolute",left:s.x,top:s.y,
          width:s.size,height:s.size,
          color:"#FFD60A",fontSize:s.size,
          animation:`sparkle .8s ${s.delay} ease-out forwards`,
        }}>✦</div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MATCH SCREEN
══════════════════════════════════════════════════════════════ */
function MatchScreen({targetProduct, selectedItems, onMessage, onContinue}) {
  const [phase, setPhase] = useState("drop");   // drop → collide → text → buttons
  const [showRings, setShowRings]   = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(()=>{
    const t1 = setTimeout(()=>setPhase("collide"), 900);
    const t2 = setTimeout(()=>{ setShowRings(true); setShowConfetti(true); }, 1050);
    const t3 = setTimeout(()=>setPhase("text"), 1100);
    const t4 = setTimeout(()=>setPhase("buttons"), 1700);
    return ()=>[t1,t2,t3,t4].forEach(clearTimeout);
  },[]);

  const collided = phase !== "drop";

  return (
    <div style={{
      position:"fixed",inset:0,zIndex:100,
      background:"#0A0A0F",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      animation:"darkOverlay .35s ease",
      overflow:"hidden",
      maxWidth:384,left:"50%",transform:"translateX(-50%)",
    }}>
      {/* Background glow orb */}
      <div style={{
        position:"absolute",top:"50%",left:"50%",
        transform:"translate(-50%,-50%)",
        width:300,height:300,borderRadius:"50%",
        background:"radial-gradient(circle, #34C78A33 0%, #34C78A11 50%, transparent 75%)",
        animation:"glowPulse 2s ease-in-out infinite",
        pointerEvents:"none",
      }}/>

      {/* Expanding rings on collision */}
      {showRings && [0,1,2].map(i=>(
        <div key={i} style={{
          position:"absolute",top:"50%",left:"50%",
          width:80,height:80,borderRadius:"50%",
          border:`2px solid #34C78A`,
          animation:`ringExpand ${0.8+i*0.3}s ${i*0.15}s ease-out forwards`,
          pointerEvents:"none",
          zIndex:3,
        }}/>
      ))}

      {showConfetti && <><Confetti count={36}/><Sparkles/></>}

      {/* ── Collision Zone ── */}
      <div style={{
        position:"relative",
        display:"flex",flexDirection:"column",alignItems:"center",
        gap:0,marginBottom:24,
        animation: collided ? `collide .4s ease` : "none",
      }}>

        {/* Target product — drops from top */}
        <div style={{
          animation:`dropFromTop .75s cubic-bezier(0.34,1.28,0.64,1) forwards`,
          transformOrigin:"center bottom",
          position:"relative",zIndex:6,
        }}>
          <div style={{
            width:130,height:130,borderRadius:24,overflow:"hidden",
            border:"3px solid rgba(255,255,255,0.15)",
            boxShadow:"0 20px 60px rgba(0,0,0,0.6), 0 0 30px #34C78A33",
            transform:"rotate(-4deg)",
          }}>
            <span style={{fontSize:56}}>{targetProduct.emoji||"📦"}</span>
          </div>
          {/* Label */}
          <div style={{
            position:"absolute",bottom:-10,left:"50%",transform:"translateX(-50%)",
            background:"rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",
            border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:99,padding:"3px 10px",whiteSpace:"nowrap",
          }}>
            <span style={{color:"white",fontSize:11,fontWeight:700}}>{targetProduct.points.toLocaleString("tr-TR")} P</span>
          </div>
        </div>

        {/* ⟷ Swap icon between */}
        {collided && (
          <div style={{
            width:36,height:36,borderRadius:"50%",
            background:"linear-gradient(135deg,#34C78A,#2DD4BF)",
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 0 24px #34C78A88",
            zIndex:7,position:"relative",
            animation:"bounceIn .4s ease",
            margin:"-6px 0",
          }}>
            <span style={{fontSize:16}}>⇄</span>
          </div>
        )}

        {/* Selected items — rise from bottom */}
        <div style={{
          display:"flex",gap:8,
          animation:`riseFromBot .75s .05s cubic-bezier(0.34,1.28,0.64,1) forwards`,
          transformOrigin:"center top",
          position:"relative",zIndex:6,
          marginTop: collided ? 0 : 8,
        }}>
          {selectedItems.slice(0,3).map((item,i)=>(
            <div key={item.id} style={{position:"relative"}}>
              <div style={{
                width:selectedItems.length===1?130:selectedItems.length===2?100:80,
                height:selectedItems.length===1?130:selectedItems.length===2?100:80,
                borderRadius:18,overflow:"hidden",
                border:"3px solid rgba(255,255,255,0.15)",
                boxShadow:"0 20px 60px rgba(0,0,0,0.6), 0 0 20px #34C78A22",
                transform:`rotate(${[5,-3,4][i]||0}deg)`,
              }}>
                <span style={{fontSize:56}}>{item.emoji||"📦"}</span>
              </div>
            </div>
          ))}
          {/* Points total label */}
          <div style={{
            position:"absolute",bottom:-10,left:"50%",transform:"translateX(-50%)",
            background:"rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",
            border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:99,padding:"3px 12px",whiteSpace:"nowrap",
          }}>
            <span style={{color:"white",fontSize:11,fontWeight:700}}>
              {selectedItems.reduce((a,b)=>a+b.points,0).toLocaleString("tr-TR")} P
            </span>
          </div>
        </div>
      </div>

      {/* ── Match Text ── */}
      {(phase==="text"||phase==="buttons") && (
        <div style={{textAlign:"center",position:"relative",zIndex:8,marginTop:36}}>
          <div style={{
            fontFamily:"'Nunito',sans-serif",
            fontSize:38,fontWeight:900,
            background:"linear-gradient(90deg, #34C78A, #2DD4BF, #34C78A)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            animation:"matchText .6s cubic-bezier(0.34,1.28,0.64,1) both, shimmer 2s 0.6s linear infinite",
            letterSpacing:4,
            textShadow:"none",
            lineHeight:1.1,
          }}>
            TAKAS
          </div>
          <div style={{
            fontFamily:"'Nunito',sans-serif",
            fontSize:38,fontWeight:900,
            background:"linear-gradient(90deg, #2DD4BF, #34C78A, #2DD4BF)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            animation:"matchText .6s .08s cubic-bezier(0.34,1.28,0.64,1) both, shimmer 2s .7s linear infinite",
            letterSpacing:4,
          }}>
            EŞLEŞTİ!
          </div>
          <div style={{
            color:"rgba(255,255,255,0.55)",fontSize:14,fontWeight:600,marginTop:8,
            animation:"subText .5s .6s both",
          }}>
            {targetProduct.owner} teklifini kabul etti 🎉
          </div>
        </div>
      )}

      {/* ── Buttons ── */}
      {phase==="buttons" && (
        <div style={{
          position:"absolute",bottom:48,left:0,right:0,
          padding:"0 28px",display:"flex",flexDirection:"column",gap:12,
          animation:"btnReveal .5s .1s both",
          zIndex:9,
        }}>
          <button onClick={onMessage} style={{
            width:"100%",padding:"17px",
            background:"linear-gradient(135deg,#34C78A,#2DD4BF)",
            border:"none",borderRadius:18,
            color:"white",fontSize:16,fontWeight:900,
            fontFamily:"'Nunito',sans-serif",cursor:"pointer",
            boxShadow:"0 10px 36px #34C78A66",
            animation:"pulse 2.5s ease-in-out infinite",
            display:"flex",alignItems:"center",justifyContent:"center",gap:8,
          }}>
            <span>💬</span> Mesaj Gönder
          </button>
          <button onClick={onContinue} style={{
            width:"100%",padding:"15px",
            background:"rgba(255,255,255,0.08)",
            border:"1.5px solid rgba(255,255,255,0.18)",
            borderRadius:18,
            color:"rgba(255,255,255,0.8)",fontSize:15,fontWeight:700,
            fontFamily:"'Nunito',sans-serif",cursor:"pointer",
            backdropFilter:"blur(12px)",
          }}>
            Keşfetmeye Devam Et
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRADE DESK (TAKAS MASASI) - Butonlu Cüzdan Akışı
══════════════════════════════════════════════════════════════ */
function TradeDesk({targetProduct, initialSelected = [], onClose, onMatch}) {
  const [selected,   setSelected]   = useState(initialSelected);
  const [sendAnim,   setSendAnim]   = useState(false);
  const [walletAnim, setWalletAnim] = useState(false);

  const totalPoints  = selected.reduce((a,b)=>a+b.points,0);
  const target       = targetProduct.points;
  const fillPct      = Math.min((totalPoints/target)*100,120);
  const overfill     = totalPoints >= target;
  const excessPoints = totalPoints - target;
  const canSend      = overfill;

  const toggle = (item) => {
    setSelected(prev =>
      prev.find(x=>x.id===item.id)
        ? prev.filter(x=>x.id!==item.id)
        : [...prev, item]
    );
  };

  const handleSend = (actionType = "exact") => {
    if (!canSend) return;
    if (actionType === "wallet") {
      setWalletAnim(true);
    } else {
      setSendAnim(true);
      setTimeout(()=> onMatch(selected, actionType, excessPoints), 700);
    }
  };

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:80,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",animation:"fadeIn .25s ease"}}/>
      <div style={{position:"fixed",bottom:0,left:0,right:0,margin:"0 auto",width:"100%",maxWidth:384,zIndex:90,background:"#F2F2F7",borderRadius:"28px 28px 0 0",animation:"slideUp .25s ease-out",maxHeight:"88vh",overflowY:"auto",paddingBottom:40}}>

        {/* 👛 CÜZDAN ANİMASYON EKRANI (BUTONLU) */}
        {walletAnim && (
          <div style={{position:"absolute",inset:0,background:"#F2F2F7",zIndex:100,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeIn .3s ease",minHeight:400,borderRadius:"28px 28px 0 0"}}>
            <div style={{fontSize:72,marginBottom:16,animation:"bounceIn .5s ease"}}>👛</div>
            <div style={{fontSize:24,fontWeight:900,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",marginBottom:8}}>Cüzdana Aktarıldı!</div>
            <div style={{fontSize:14,color:"#6D6D72",textAlign:"center",padding:"0 32px",lineHeight:1.5,marginBottom:32}}>
              Fazladan verdiğin <strong style={{color:"#34C78A"}}>{excessPoints} Puan</strong> güvence altına alındı ve Takas Cüzdanına eklendi.
            </div>
            <button onClick={()=>onMatch(selected,"wallet",excessPoints)} style={{padding:"16px 32px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:16,fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 8px 24px #34C78A44",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              Devam Et ve Teklifi Gönder 🚀
            </button>
          </div>
        )}

        <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"14px auto 20px"}}/>
        <div style={{padding:"0 20px"}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:22,fontWeight:900,color:"#1C1C1E",letterSpacing:"-0.5px"}}>Takas Masası<span style={{color:"#34C78A"}}>.</span></div>
              <div style={{fontSize:12,color:"#8E8E93",marginTop:1}}>Teklif oluştur, denge kur</div>
            </div>
            <button onClick={onClose} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Target product card */}
          <div style={{background:"white",borderRadius:20,padding:"12px",display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",border:"1.5px solid #34C78A33",marginBottom:18}}>
            <span style={{fontSize:56}}>{targetProduct.emoji||"📦"}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"#8E8E93",fontWeight:600,marginBottom:2}}>İSTEDİĞİN ÜRÜN</div>
              <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E",lineHeight:1.2}}>{targetProduct.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
                <img src={targetProduct.ownerAvatar} style={{width:18,height:18,borderRadius:"50%",objectFit:"cover"}} alt=""/>
                <span style={{fontSize:12,color:"#6D6D72",fontWeight:600}}>{targetProduct.owner}</span>
              </div>
            </div>
            <div style={{background:"linear-gradient(135deg,#34C78A18,#2DD4BF18)",border:"1.5px solid #34C78A55",borderRadius:12,padding:"6px 10px",textAlign:"center"}}>
              <div style={{color:"#34C78A",fontSize:16,fontWeight:900,lineHeight:1}}>{targetProduct.points.toLocaleString("tr-TR")}</div>
              <div style={{color:"#34C78A",fontSize:10,fontWeight:700,opacity:.7}}>Puan</div>
            </div>
          </div>

          {/* Balance bar */}
          <div style={{background:"white",borderRadius:18,padding:"14px",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.4px"}}>Denge Çubuğu</div>
              <div style={{fontSize:13,fontWeight:800,color:overfill?"#34C78A":"#8E8E93",transition:"color .3s"}}>
                {totalPoints.toLocaleString("tr-TR")}<span style={{color:"#C7C7CC",fontWeight:500}}> / </span>{target.toLocaleString("tr-TR")} P
              </div>
            </div>
            <div style={{background:"#F2F2F7",borderRadius:99,height:14,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${Math.min(fillPct,100)}%`,background:overfill?"linear-gradient(90deg,#34C78A,#2DD4BF,#34C78A)":"linear-gradient(90deg,#34C78A88,#34C78A)",backgroundSize:"200% auto",borderRadius:99,transition:"width .4s cubic-bezier(0.34,1.56,0.64,1), background .3s",animation:overfill?"shimmer 1.5s linear infinite":"none",boxShadow:overfill?"0 0 14px #34C78A99":"none"}}/>
              {overfill && <div style={{position:"absolute",right:0,top:-2,bottom:-2,width:24,background:"linear-gradient(90deg,transparent,#2DD4BFcc)",animation:"glowPulse 1s ease-in-out infinite"}}/>}
              <div style={{position:"absolute",right:0,top:-4,width:2,height:22,background:"#1C1C1E33",borderRadius:1}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                {selected.length > 0 && <div style={{width:6,height:6,borderRadius:"50%",background:"#34C78A"}}/>}
                <span style={{fontSize:11,color:overfill?"#34C78A":"#8E8E93",fontWeight:700,transition:"color .3s"}}>
                  {selected.length===0 ? "Ürün seç" : excessPoints > 0 ? `✅ Fazladan ${excessPoints} P var` : overfill ? "✅ Teklif hazır!" : `${target-totalPoints} puan daha gerekli`}
                </span>
              </div>
              <span style={{fontSize:11,color:"#3A3A3C",fontWeight:700}}>Hedef: {target.toLocaleString("tr-TR")} P</span>
            </div>
          </div>

          {/* My items */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:12}}>Garajım</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {MY_ITEMS.map((item,i)=>{
                const isSelected = !!selected.find(x=>x.id===item.id);
                return (
                  <div key={item.id} onClick={()=>toggle(item)} style={{background:"white",borderRadius:18,padding:"10px 14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",border:isSelected?"2px solid #34C78A":"2px solid transparent",boxShadow:isSelected?"0 4px 20px #34C78A44, 0 0 0 1px #34C78A33":"0 2px 12px rgba(0,0,0,0.06)",transition:"all .22s cubic-bezier(0.34,1.56,0.64,1)",transform:isSelected?"scale(1.01)":"scale(1)",position:"relative",overflow:"hidden"}}>
                    {isSelected && <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#34C78A08,#2DD4BF08)",pointerEvents:"none"}}/>}
                    <span style={{fontSize:56}}>{item.emoji||"📦"}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:"#1C1C1E"}}>{item.name}</div>
                      <div style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:3,background:isSelected?"#34C78A18":"#F2F2F7",borderRadius:8,padding:"2px 8px",transition:"background .2s"}}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:isSelected?"#34C78A":"#C7C7CC",transition:"background .2s"}}/>
                        <span style={{fontSize:12,fontWeight:800,color:isSelected?"#34C78A":"#6D6D72",transition:"color .2s"}}>{item.points} Puan</span>
                      </div>
                    </div>
                    <div style={{width:26,height:26,borderRadius:"50%",background:isSelected?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#F2F2F7",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .22s cubic-bezier(0.34,1.56,0.64,1)",transform:isSelected?"scale(1.1)":"scale(1)",boxShadow:isSelected?"0 3px 10px #34C78A55":"none",flexShrink:0}}>
                      {isSelected && <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Area */}
          {!canSend ? (
            <button disabled style={{width:"100%",padding:"19px",border:"none",borderRadius:18,background:"#E5E5EA",color:"#C7C7CC",fontSize:17,fontWeight:900,fontFamily:"'Nunito',sans-serif",cursor:"default",letterSpacing:"-0.2px"}}>
              🔒 {(target-totalPoints)} P daha seç
            </button>
          ) : excessPoints > 0 ? (
            <div style={{animation:"slideUp .3s ease"}}>
              <div style={{background:"#FFF3CD",border:"1px solid #FFD60A44",borderRadius:16,padding:"14px",marginBottom:12}}>
                <div style={{fontSize:13,fontWeight:800,color:"#856404",marginBottom:4,display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:18}}>⚖️</span> {excessPoints} Puan Fazla Veriyorsun
                </div>
                <div style={{fontSize:12,color:"#856404",fontWeight:600,lineHeight:1.4}}>
                  Takası eşitlemek için fazladan verdiğin bu değeri nasıl değerlendirmek istersin?
                  <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #FFD60A44",fontSize:10,opacity:0.85,lineHeight:1.3}}>
                    <strong>💡 Kural:</strong> Cüzdana eklenen puanlar tek başına ürün almak için kullanılamaz. Sadece bir sonraki takasta ürününün değerini yükseltmek içindir.
                  </div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button onClick={()=>handleSend("wallet")} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",borderRadius:16,color:"white",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 6px 20px #34C78A44",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span>💰</span> {excessPoints} Puanı Cüzdanıma Ekle
                </button>
                <button onClick={()=>handleSend("extra_item")} style={{width:"100%",padding:"16px",background:"#1C1C1E",border:"none",borderRadius:16,color:"white",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 6px 20px rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span>🛒</span> Karşı Taraftan Ek Ürün İste
                </button>
              </div>
            </div>
          ) : (
            <button onClick={()=>handleSend("exact")} style={{width:"100%",padding:"19px",border:"none",borderRadius:18,background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",fontSize:17,fontWeight:900,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 10px 36px #34C78A66",animation:"pulse 2.5s ease-in-out infinite",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {sendAnim ? "⏳ Gönderiliyor..." : "⚡ Tam Eşleşme! Teklifi Gönder"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}


/* ══════════════════════════════════════════════════════════════
   PRODUCT DETAIL SCREEN (Çoklu Fotoğraf + Detaylar)
══════════════════════════════════════════════════════════════ */
function ProductDetail({ product, onBack, onOpenChat }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(false);

  const images = product.images || [
    product.bg || "linear-gradient(135deg, #E5E5EA, #D1D1D6)",
    "linear-gradient(135deg, #F2F2F7, #E5E5EA)",
    "linear-gradient(135deg, #FFFFFF, #F2F2F7)"
  ];

  return (
    <div style={{position:"fixed",top:0,bottom:0,left:0,right:0,margin:"0 auto",width:"100%",maxWidth:384,background:"#F2F2F7",zIndex:200,display:"flex",flexDirection:"column",animation:"slideUp .25s ease-out"}}>
      {/* ÜST BAR */}
      <div style={{position:"absolute",top:0,left:0,right:0,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:210,background:"linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",backdropFilter:"blur(10px)",border:"none",borderRadius:"50%",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{background:"rgba(255,255,255,0.2)",backdropFilter:"blur(10px)",padding:"6px 12px",borderRadius:99,color:"white",fontSize:12,fontWeight:800,letterSpacing:"1px"}}>
          {currentImg + 1} / {images.length}
        </div>
      </div>

      {/* FOTOĞRAF GALERİSİ (CAROUSEL) */}
      <div style={{width:"100%",height:"45vh",position:"relative",background:"#1C1C1E"}}>
        <div style={{display:"flex",overflowX:"auto",scrollSnapType:"x mandatory",height:"100%",width:"100%",scrollbarWidth:"none",msOverflowStyle:"none"}} onScroll={(e)=>{
          const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
          setCurrentImg(index);
        }}>
          {images.map((img,i)=>(
            <div key={i} style={{flex:"0 0 100%",height:"100%",scrollSnapAlign:"start",background:img,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              {!product.image && <span style={{fontSize:120,filter:"drop-shadow(0 10px 20px rgba(0,0,0,0.2))",transform:`scale(${i===currentImg?1:0.8})`,transition:"transform .3s"}}>{product.emoji||"📦"}</span>}
              {product.image && <img src={product.image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>}
            </div>
          ))}
        </div>
        {/* Nokta Göstergeler */}
        <div style={{position:"absolute",bottom:16,left:0,right:0,display:"flex",justifyContent:"center",gap:6}}>
          {images.map((_,i)=>(
            <div key={i} style={{width:i===currentImg?18:6,height:6,borderRadius:99,background:"white",opacity:i===currentImg?1:0.5,transition:"all .3s"}}/>
          ))}
        </div>
      </div>

      {/* DETAYLAR ALANI */}
      <div style={{flex:1,background:"#F2F2F7",marginTop:"-20px",borderRadius:"24px 24px 0 0",position:"relative",zIndex:205,padding:"24px 20px",overflowY:"auto",paddingBottom:100}}>

        {/* Başlık ve Puan */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div style={{flex:1,paddingRight:16}}>
            <h1 style={{fontSize:24,fontWeight:900,color:"#1C1C1E",marginBottom:6,lineHeight:1.2}}>{product.name}</h1>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <img src={product.ownerAvatar||"https://i.pravatar.cc/100"} style={{width:24,height:24,borderRadius:"50%"}} alt=""/>
              <span style={{fontSize:13,color:"#6D6D72",fontWeight:700}}>{product.owner||"Senin Ürünün"}</span>
            </div>
          </div>
          <div style={{background:"linear-gradient(135deg,#34C78A18,#2DD4BF18)",border:"2px solid #34C78A44",borderRadius:16,padding:"10px 14px",textAlign:"center",boxShadow:"0 4px 12px #34C78A15"}}>
            <div style={{color:"#34C78A",fontSize:22,fontWeight:900,lineHeight:1}}>{product.points}</div>
            <div style={{color:"#34C78A",fontSize:11,fontWeight:800,textTransform:"uppercase",marginTop:2}}>Puan</div>
          </div>
        </div>

        {/* AI Raporu Etiketleri */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
          <div style={{background:"#E5E5EA",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:800,color:"#3A3A3C",display:"flex",alignItems:"center",gap:4}}>✨ {product.condition||"Kusursuz"}</div>
          <div style={{background:"#E5E5EA",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:800,color:"#3A3A3C",display:"flex",alignItems:"center",gap:4}}>📅 {product.age||"1-3 Yıl"}</div>
          <div style={{background:"#E5E5EA",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:800,color:"#3A3A3C",display:"flex",alignItems:"center",gap:4}}>📦 {product.box||"Kutu/Fatura Var"}</div>
        </div>

        {/* Açıklama (Accordion) */}
        <div style={{marginBottom:24}}>
          <button onClick={()=>setIsDescOpen(!isDescOpen)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",background:"white",padding:"16px 20px",borderRadius:16,border:"1.5px solid #E5E5EA",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.02)"}}>
            <span style={{fontSize:14,fontWeight:900,color:"#1C1C1E",textTransform:"uppercase",letterSpacing:"0.5px"}}>Ürün Özellikleri & Açıklama</span>
            <span style={{fontSize:18,color:"#8E8E93",transform:isDescOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .3s"}}>▼</span>
          </button>
          {isDescOpen && (
            <div style={{padding:"16px 4px",animation:"fadeIn .3s ease"}}>
              <p style={{fontSize:15,color:"#3A3A3C",lineHeight:1.6,fontWeight:500,margin:0}}>
                {product.desc||"Bu ürün için henüz detaylı bir açıklama girilmedi. Ancak AI analizine göre ürün kozmetik olarak iyi durumdadır ve takasa uygundur."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AKSİYON BUTONU (Sabit Alt Bar) */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top, #F2F2F7 60%, transparent)",zIndex:220}}>
        {product.owner ? (
          <button onClick={()=>onOpenChat(product)} style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#1C1C1E,#2C2C2E)",color:"white",border:"none",borderRadius:20,fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 10px 30px rgba(0,0,0,0.2)",display:"flex",justifyContent:"center",alignItems:"center",gap:8}}>
            <span style={{fontSize:20}}>🤝</span> Takas Teklifi Gönder
          </button>
        ) : (
          <button onClick={onBack} style={{width:"100%",padding:"18px",background:"#E5E5EA",color:"#1C1C1E",border:"none",borderRadius:20,fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>
            Garaja Geri Dön
          </button>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   MESSAGES SCREEN
══════════════════════════════════════════════════════════════ */
function MessagesScreen({ onOpenChat, onOpenProduct, initialOffers=[], initialConvos=[] }) {
  const [offers, setOffers]   = useState(initialOffers);
  const [convos, setConvos]   = useState(initialConvos);
  const [dismissed, setDismissed] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const filteredConvos = convos.filter(c =>
    c.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    c.last.toLowerCase().includes(searchQ.toLowerCase())
  );

  // Her konuşmacıya ait ürün eşleşmesi
  const CHAT_PRODUCT_MAP = {
    "Mert D.":   PRODUCTS.find(p=>p.id===2) || PRODUCTS[1],
    "Ayşe K.":   PRODUCTS.find(p=>p.id===1) || PRODUCTS[0],
    "Zeynep A.": PRODUCTS.find(p=>p.id===3) || PRODUCTS[2],
    "Can B.":    PRODUCTS.find(p=>p.id===4) || PRODUCTS[3],
    "Elif S.":   PRODUCTS.find(p=>p.id===5) || PRODUCTS[4],
    "Burak T.":  PRODUCTS.find(p=>p.id===6) || PRODUCTS[5],
  };

  const dismissOffer = (id, action) => {
    setDismissed(p=>({...p,[id]:action}));
    if (action === "accept") {
      const offer = offers.find(o=>o.id===id);
      if (offer && onOpenChat) {
        const prod = PRODUCTS.find(p=>p.name===offer.theirItem.name) || PRODUCTS[0];
        setTimeout(()=>{
          onOpenChat({
            owner: offer.from,
            ownerAvatar: offer.avatar,
            name: prod.name,
            emoji: prod.emoji,
            bg: prod.bg,
            points: prod.points,
            selectedItems: [MY_ITEMS[0]],
          });
        }, 500);
      }
    }
    setTimeout(()=>setOffers(prev=>prev.filter(o=>o.id!==id)), 600);
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 0 110px",animation:"tabSlideIn .3s ease"}}>

      {/* Header */}
      <div style={{padding:"8px 22px 0"}}>
        <div style={{fontSize:32,fontWeight:900,color:"#1C1C1E",letterSpacing:"-1px"}}>
          Mesajlar<span style={{color:"#34C78A"}}>.</span>
        </div>
        <div style={{fontSize:12,color:"#8E8E93",marginTop:1,marginBottom:16}}>Teklifler ve sohbetler</div>

        {/* Arama Çubuğu */}
        <div style={{position:"relative",marginBottom:20}}>
          <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:15,opacity:0.4}}>🔍</div>
          <input
            value={searchQ}
            onChange={e=>setSearchQ(e.target.value)}
            placeholder="Sohbetlerde ara..."
            style={{width:"100%",padding:"11px 16px 11px 40px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:16,fontSize:14,color:"#1C1C1E",outline:"none",fontFamily:"'Nunito',sans-serif",fontWeight:600,boxSizing:"border-box",transition:"border-color .2s"}}
            onFocus={e=>e.target.style.borderColor="#34C78A"}
            onBlur={e=>e.target.style.borderColor="#E5E5EA"}
          />
        </div>

        {/* ── Pending Offers Carousel ── */}
        {offers.length > 0 && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px"}}>
              Bekleyen Teklifler
            </div>
            <div style={{fontSize:11,color:"#8E8E93",fontWeight:600}}>{offers.length} teklif</div>
          </div>
        </>}
      </div>

      {offers.length > 0 && (
        <div style={{overflowX:"auto",paddingLeft:22,paddingRight:8,paddingBottom:4}}>
          <div style={{display:"flex",gap:12,width:"max-content"}}>
            {offers.map((offer,i)=>{
              const isGone = dismissed[offer.id];
              return (
                <div key={offer.id} style={{
                  width:180,background:"white",borderRadius:22,overflow:"hidden",flexShrink:0,
                  boxShadow:"0 4px 20px rgba(0,0,0,0.08)",
                  border:"1.5px solid #F0F0F0",
                  animation:`offerPop .4s ${i*0.08}s both`,
                  opacity: isGone ? 0 : 1,
                  transform: isGone ? (dismissed[offer.id]==="accept"?"scale(1.05) translateY(-4px)":"scale(0.9)") : "scale(1)",
                  transition:"all .4s cubic-bezier(0.34,1.56,0.64,1)",
                }}>
                  {/* Product images */}
                  <div style={{display:"flex",height:90,position:"relative",borderRadius:"22px 22px 0 0",overflow:"hidden"}}>
                    {/* SOL: BENİM ÜRÜNÜM */}
                    <div onClick={()=>{const myProd=MY_ITEMS.find(p=>p.name===offer.myItem.name)||MY_ITEMS[0];const myProdDetail={...myProd,category:"Senin Ürünün",owner:currentUser?.name||"Sen",ownerAvatar:currentUser?.avatar||"https://i.pravatar.cc/150?img=68",condition:"ciziksiz"};if(onOpenProduct)onOpenProduct(myProdDetail);}}
                      style={{width:"50%",height:"100%",background:offer.myItem.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:"pointer",transition:"opacity .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <span style={{fontSize:42,filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.2))"}}>{offer.myItem.emoji}</span>
                      <div style={{position:"absolute",top:6,left:8,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)",borderRadius:6,padding:"3px 6px",fontSize:9,fontWeight:800,color:"white",textTransform:"uppercase",letterSpacing:"0.5px"}}>Senin</div>
                    </div>
                    {/* SAĞ: KARŞI TARAFIN ÜRÜNÜ */}
                    <div onClick={()=>{const theirProd=PRODUCTS.find(p=>p.name===offer.theirItem.name)||PRODUCTS[1];if(onOpenProduct)onOpenProduct(theirProd);}}
                      style={{width:"50%",height:"100%",background:offer.theirItem.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:"pointer",transition:"opacity .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <span style={{fontSize:42,filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.2))"}}>{offer.theirItem.emoji}</span>
                      <div style={{position:"absolute",top:6,right:8,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)",borderRadius:6,padding:"3px 6px",fontSize:9,fontWeight:800,color:"white",textTransform:"uppercase",letterSpacing:"0.5px"}}>Teklif</div>
                    </div>
                    {/* Swap badge */}
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px #34C78A66",border:"2px solid white",fontSize:13,color:"white",zIndex:2,fontWeight:900,pointerEvents:"none"}}>⇄</div>
                  </div>

                  {/* Info */}
                  <div style={{padding:"10px 12px 0"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                      <img src={offer.avatar} style={{width:18,height:18,borderRadius:"50%",objectFit:"cover"}} alt=""/>
                      <span style={{fontSize:11,fontWeight:700,color:"#1C1C1E"}}>{offer.from}</span>
                    </div>
                    <div style={{fontSize:11,color:"#34C78A",fontWeight:800,marginBottom:10}}>{offer.points} P</div>
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",gap:6,padding:"0 10px 12px"}}>
                    <button onClick={()=>dismissOffer(offer.id,"reject")}
                      style={{flex:1,padding:"7px 0",background:"#F2F2F7",border:"none",borderRadius:10,
                        fontSize:12,fontWeight:700,color:"#FF3B30",cursor:"pointer",transition:"background .15s"}}>
                      ✕ Reddet
                    </button>
                    <button onClick={()=>dismissOffer(offer.id,"accept")}
                      style={{flex:1,padding:"7px 0",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",
                        border:"none",borderRadius:10,fontSize:12,fontWeight:700,color:"white",
                        cursor:"pointer",boxShadow:"0 3px 10px #34C78A44"}}>
                      ✓ Onayla
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Conversations ── */}
      <div style={{padding:"20px 22px 0"}}>
        <div style={{fontSize:13,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:12}}>
          Sohbetler
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {filteredConvos.length === 0 && searchQ !== "" && (
            <div style={{textAlign:"center",padding:"32px 0",color:"#8E8E93",fontSize:13,fontWeight:600}}>
              Sonuç bulunamadı
            </div>
          )}
          {filteredConvos.map((c,i)=>(
            <div key={c.id}
              onClick={()=>{
                const prod = CHAT_PRODUCT_MAP[c.name] || PRODUCTS[0];
                onOpenChat && onOpenChat({
                  owner: c.name,
                  ownerAvatar: c.avatar,
                  name: prod.name,
                  emoji: prod.emoji,
                  bg: prod.bg,
                  points: prod.points,
                  selectedItems: [MY_ITEMS[0]],
                });
              }}
              style={{
              display:"flex",alignItems:"center",gap:14,padding:"12px 14px",
              background:"white",borderRadius:18,cursor:"pointer",
              boxShadow:"0 1px 8px rgba(0,0,0,0.04)",
              animation:`fadeSlideUp .3s ${0.05+i*0.06}s both`,
              transition:"background .15s",
            }}
            onMouseDown={e=>e.currentTarget.style.background="#F8F8FA"}
            onMouseUp={e=>e.currentTarget.style.background="white"}>
              {/* Avatar */}
              <div style={{position:"relative",flexShrink:0}}>
                <img src={c.avatar} style={{
                  width:48,height:48,borderRadius:"50%",objectFit:"cover",
                  border: c.unread ? "2.5px solid #34C78A" : "2.5px solid transparent",
                }} alt={c.name}/>
                {c.unread && (
                  <div style={{
                    position:"absolute",bottom:0,right:0,
                    width:12,height:12,borderRadius:"50%",
                    background:"#34C78A",border:"2px solid white",
                  }}/>
                )}
              </div>

              {/* Text */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <div style={{fontSize:14,fontWeight: c.unread ? 800 : 600,color:"#1C1C1E"}}>{c.name}</div>
                  <div style={{fontSize:11,color: c.unread ? "#34C78A" : "#8E8E93",fontWeight: c.unread ? 700 : 400,flexShrink:0,marginLeft:8}}>{c.time}</div>
                </div>
                <div style={{
                  fontSize:12,color: c.unread ? "#3A3A3C" : "#8E8E93",
                  fontWeight: c.unread ? 600 : 400,
                  overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",
                  maxWidth:"100%",
                }}>{c.last}</div>
              </div>

              {/* Unread badge */}
              {c.unread && (
                <div style={{
                  width:8,height:8,borderRadius:"50%",background:"#34C78A",flexShrink:0,
                  boxShadow:"0 0 6px #34C78A88",
                }}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   KYC / KİMLİK DOĞRULAMA EKRANI (Manuel Kapanan Akış)
══════════════════════════════════════════════════════════════ */
function KYCModal({ onClose, onSuccess }) {
  const [phase, setPhase] = useState("intro");

  const startScan = () => {
    setPhase("scanning");
    setTimeout(()=>{
      setPhase("success");
      // Otomatik kapanma iptal edildi. Kullanıcı butona basacak.
    }, 3000);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:11000,display:"flex",alignItems:"center",justifyContent:"center",background:"#1C1C1E"}}>
      <div style={{position:"absolute",top:0,bottom:0,left:0,right:0,margin:"0 auto",width:"100%",maxWidth:384,background:"#1C1C1E",display:"flex",flexDirection:"column",padding:24,color:"white",animation:"authFadeIn .25s ease-out"}}>

        {phase === "intro" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",animation:"scaleIn .4s ease"}}>
            <div style={{fontSize:64,marginBottom:16}}>🛡️</div>
            <div style={{fontSize:24,fontWeight:900,fontFamily:"'Nunito',sans-serif",marginBottom:12}}>Güvenilir Kullanıcı Ol</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,0.7)",lineHeight:1.6,marginBottom:32}}>Mavi tik alarak diğer kullanıcıların sana daha fazla güvenmesini sağla ve tekliflerinin kabul edilme oranını %80 artır.</div>
            <div style={{background:"rgba(52,199,138,0.15)",border:"1px solid rgba(52,199,138,0.3)",borderRadius:16,padding:"16px",width:"100%",marginBottom:32}}>
              <div style={{fontSize:13,fontWeight:700,color:"#34C78A",display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span>✓</span> Hızlı Eşleşme</div>
              <div style={{fontSize:13,fontWeight:700,color:"#34C78A",display:"flex",alignItems:"center",gap:8}}><span>✓</span> Platform Güvencesi</div>
            </div>
            <div style={{width:"100%",display:"flex",gap:12}}>
              <button onClick={onClose} style={{flex:1,padding:"16px",background:"rgba(255,255,255,0.1)",color:"white",border:"none",borderRadius:20,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Vazgeç</button>
              <button onClick={startScan} style={{flex:2,padding:"16px",background:"linear-gradient(135deg,#007AFF,#0066DD)",color:"white",border:"none",borderRadius:20,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 8px 24px rgba(0,122,255,0.4)"}}>Taramayı Başlat</button>
            </div>
          </div>
        )}

        {phase === "scanning" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",animation:"fadeIn .3s ease"}}>
            <div style={{position:"relative",width:220,height:220,borderRadius:"50%",border:"4px dashed rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",marginBottom:32}}>
              <div style={{fontSize:100,opacity:0.8}}>👤</div>
              <div style={{position:"absolute",left:0,right:0,height:4,background:"#007AFF",boxShadow:"0 0 20px 8px rgba(0,122,255,0.6)",animation:"scanLine 1.5s linear infinite"}}/>
              <style>{`@keyframes scanLine { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }`}</style>
            </div>
            <div style={{fontSize:20,fontWeight:800,fontFamily:"'Nunito',sans-serif",color:"white",marginBottom:8}}>Yüzünüz Taranıyor...</div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.5)"}}>Lütfen kameraya doğru bakın</div>
          </div>
        )}

        {phase === "success" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",animation:"bounceIn .5s ease"}}>
            <div style={{width:100,height:100,borderRadius:"50%",background:"#007AFF",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:"0 12px 32px rgba(0,122,255,0.5)"}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{fontSize:28,fontWeight:900,fontFamily:"'Nunito',sans-serif",color:"white",marginBottom:12}}>Doğrulandı!</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,0.7)",marginBottom:40}}>Kimliğiniz başarıyla onaylandı. Profilinize mavi tik eklendi.</div>
            <button onClick={onSuccess} style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:20,fontSize:16,fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 8px 24px rgba(52,199,138,0.4)",animation:"floatUp .5s ease"}}>
              İşlemi Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   KAYITLI KARTLAR (Saved Cards Sheet)
══════════════════════════════════════════════════════════════ */
function SavedCardsSheet({ onClose, currentUser }) {
  const defaultName = currentUser?.name?.toUpperCase() || "KULLANICI";
  const isSena = currentUser?.email === "sena.ylmz@gmail.com";
  const [cards, setCards] = useState(() => isSena ? [
    { id:1, name:defaultName, number:"•••• •••• •••• 4242", exp:"12/27", type:"visa" },
    { id:2, name:defaultName, number:"•••• •••• •••• 8731", exp:"09/26", type:"mastercard" },
  ] : []);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({name:"",number:"",exp:"",cvv:""});

  const detectType = n => n.startsWith("4") ? "visa" : n.startsWith("5") ? "mastercard" : "card";
  const maskNum = n => {
    const d = n.replace(/\D/g,"").slice(0,16);
    return d.replace(/(.{4})/g,"$1 ").trim();
  };

  const addCard = () => {
    if (!form.number || !form.exp) return;
    setCards(prev => [...prev, { id:Date.now(), name:form.name||defaultName, number:"•••• •••• •••• "+form.number.replace(/\D/g,"").slice(-4), exp:form.exp, type:detectType(form.number.replace(/\D/g,"")) }]);
    setForm({name:"",number:"",exp:"",cvv:""});
    setIsAdding(false);
  };

  return (
    <div style={{position:"absolute",bottom:0,left:0,right:0,margin:"0 auto",maxWidth:"100%",zIndex:3500,height:"92vh",background:"#F2F2F7",borderRadius:"28px 28px 0 0",animation:"slideUp .25s ease-out",display:"flex",flexDirection:"column",boxShadow:"0 -10px 40px rgba(0,0,0,0.15)"}}>
      <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"12px auto 0",flexShrink:0}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",flexShrink:0}}>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:"#1C1C1E"}}>Kayıtlı Kartlar</div>
        <button onClick={onClose} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 40px"}}>
        {!isAdding ? (
          <>
            <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:20}}>
              {cards.map(card => (
                <div key={card.id} style={{background:"linear-gradient(135deg,#1C1C2E,#2D2D44)",borderRadius:20,padding:"20px 22px",color:"white",position:"relative",boxShadow:"0 8px 24px rgba(0,0,0,0.2)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                    <div style={{fontSize:11,fontWeight:700,opacity:0.7,textTransform:"uppercase",letterSpacing:"1px"}}>{card.type.toUpperCase()}</div>
                    <button onClick={()=>setCards(prev=>prev.filter(x=>x.id!==card.id))} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white",fontSize:14}}>🗑️</button>
                  </div>
                  <div style={{fontSize:18,fontWeight:800,letterSpacing:"2px",marginBottom:16}}>{card.number}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <div><div style={{fontSize:10,opacity:0.6,marginBottom:2}}>KART SAHİBİ</div><div style={{fontSize:13,fontWeight:700}}>{card.name}</div></div>
                    <div><div style={{fontSize:10,opacity:0.6,marginBottom:2}}>SON TARİH</div><div style={{fontSize:13,fontWeight:700}}>{card.exp}</div></div>
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div style={{textAlign:"center",padding:"40px 0",color:"#8E8E93"}}>
                  <div style={{fontSize:48,marginBottom:12}}>💳</div>
                  <div style={{fontSize:15,fontWeight:700}}>Kayıtlı kart yok</div>
                </div>
              )}
            </div>
            <button onClick={()=>setIsAdding(true)} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:16,fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 8px 24px rgba(52,199,138,0.3)"}}>
              + Yeni Kart Ekle
            </button>
          </>
        ) : (
          <div style={{animation:"fadeIn .3s ease"}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:"#1C1C1E",marginBottom:20}}>Yeni Kart</div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
              {[
                {key:"name",label:"Kart Üzerindeki İsim",placeholder:"AD SOYAD"},
                {key:"number",label:"Kart Numarası",placeholder:"0000 0000 0000 0000"},
                {key:"exp",label:"Son Kullanma Tarihi",placeholder:"MM/YY"},
                {key:"cvv",label:"CVV",placeholder:"•••"},
              ].map(f => (
                <div key={f.key}>
                  <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.label}</label>
                  <input value={f.key==="number"?maskNum(form[f.key]):form[f.key]} onChange={e=>setForm(prev=>({...prev,[f.key]:e.target.value}))} placeholder={f.placeholder}
                    style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",fontWeight:700,outline:"none",boxSizing:"border-box"}}
                    onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setIsAdding(false)} style={{flex:1,padding:"16px",background:"#E5E5EA",border:"none",borderRadius:14,fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>İptal</button>
              <button onClick={addCard} style={{flex:2,padding:"16px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:14,fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>Kartı Kaydet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   ADRESLER (Addresses Sheet)
══════════════════════════════════════════════════════════════ */
function AddressesSheet({ onClose }) {
  const [addresses, setAddresses] = useState([
    { id:1, title:"Ev Adresi", city:"İstanbul", district:"Kadıköy", detail:"Moda Cad. No:42 D:8", isDefault:true, icon:"🏠" },
    { id:2, title:"İş Adresi", city:"İstanbul", district:"Levent", detail:"Büyükdere Cad. No:127 Kat:5", isDefault:false, icon:"🏢" },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({title:"",city:"",district:"",detail:""});

  const addAddress = () => {
    if (!form.title || !form.city) return;
    setAddresses(prev => [...prev, { id:Date.now(), ...form, isDefault:false, icon:"📍" }]);
    setForm({title:"",city:"",district:"",detail:""});
    setIsAdding(false);
  };

  return (
    <div style={{position:"absolute",bottom:0,left:0,right:0,margin:"0 auto",maxWidth:"100%",zIndex:3500,height:"92vh",background:"#F2F2F7",borderRadius:"28px 28px 0 0",animation:"slideUp .25s ease-out",display:"flex",flexDirection:"column",boxShadow:"0 -10px 40px rgba(0,0,0,0.15)"}}>
      <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"12px auto 0",flexShrink:0}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",flexShrink:0}}>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:"#1C1C1E"}}>Adreslerim</div>
        <button onClick={onClose} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 40px"}}>
        {!isAdding ? (
          <>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
              {addresses.map(addr => (
                <div key={addr.id} onClick={()=>setAddresses(prev=>prev.map(a=>({...a,isDefault:a.id===addr.id})))} style={{background:"white",borderRadius:20,padding:"16px 18px",border:addr.isDefault?"2px solid #34C78A":"2px solid transparent",cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.04)",transition:"all .2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start",flex:1}}>
                      <div style={{fontSize:24}}>{addr.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                          <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E"}}>{addr.title}</div>
                          {addr.isDefault && <div style={{fontSize:10,fontWeight:800,color:"#34C78A",background:"#F0FDF8",padding:"2px 8px",borderRadius:99}}>VARSAYILAN</div>}
                        </div>
                        <div style={{fontSize:13,color:"#8E8E93",fontWeight:600}}>{addr.city} / {addr.district}</div>
                        <div style={{fontSize:12,color:"#C7C7CC",marginTop:2}}>{addr.detail}</div>
                      </div>
                    </div>
                    <button onClick={e=>{e.stopPropagation();setAddresses(prev=>prev.filter(x=>x.id!==addr.id));}} style={{background:"#FFF0F0",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:14}}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:"#F0FDF8",borderRadius:16,padding:"12px 16px",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{fontSize:20}}>🚚</div>
              <div style={{fontSize:12,color:"#28A876",fontWeight:700,lineHeight:1.5}}>Varsayılan adresiniz kargo etiketlerinde otomatik kullanılır.</div>
            </div>
            <button onClick={()=>setIsAdding(true)} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:16,fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",boxShadow:"0 8px 24px rgba(52,199,138,0.3)"}}>
              + Yeni Adres Ekle
            </button>
          </>
        ) : (
          <div style={{animation:"fadeIn .3s ease"}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:17,fontWeight:900,color:"#1C1C1E",marginBottom:20}}>Yeni Adres</div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
              {[
                {key:"title",label:"Adres Başlığı",placeholder:"Örn: Ev, İş, Anne..."},
                {key:"city",label:"İl",placeholder:"İstanbul"},
                {key:"district",label:"İlçe",placeholder:"Kadıköy"},
              ].map(f => (
                <div key={f.key}>
                  <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.label}</label>
                  <input value={form[f.key]} onChange={e=>setForm(prev=>({...prev,[f.key]:e.target.value}))} placeholder={f.placeholder}
                    style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",fontWeight:700,outline:"none",boxSizing:"border-box"}}
                    onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>Açık Adres</label>
                <textarea value={form.detail} onChange={e=>setForm(prev=>({...prev,detail:e.target.value}))} placeholder="Cadde, sokak, kapı no..." rows={3}
                  style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:14,fontFamily:"'Nunito',sans-serif",fontWeight:600,outline:"none",resize:"none",boxSizing:"border-box"}}
                  onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setIsAdding(false)} style={{flex:1,padding:"16px",background:"#E5E5EA",border:"none",borderRadius:14,fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>İptal</button>
              <button onClick={addAddress} style={{flex:2,padding:"16px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",color:"white",border:"none",borderRadius:14,fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>Adresi Kaydet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   BİLDİRİMLER EKRANI (Notifications Sheet)
══════════════════════════════════════════════════════════════ */
function NotificationsSheet({ onClose }) {
  const [settings, setSettings] = useState({
    newOffers: true, messages: true, tradeUpdates: true, marketing: false, emailNotifs: true,
  });
  const toggle = key => setSettings(prev => ({...prev, [key]: !prev[key]}));

  return (
    <SettingsSheet title="Bildirimler" onClose={onClose}>
      <div style={{fontSize:13,color:"#8E8E93",marginBottom:24,lineHeight:1.5}}>
        TakasApp'ten alacağın anlık bildirimleri ve e-posta tercihlerini buradan yönetebilirsin.
      </div>
      <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8,paddingLeft:4}}>Uygulama İçi (Push)</div>
      <div style={{background:"white",borderRadius:20,overflow:"hidden",border:"1.5px solid #E5E5EA",marginBottom:28,boxShadow:"0 4px 16px rgba(0,0,0,0.02)"}}>
        {[
          {key:"newOffers",label:"Yeni Teklifler",desc:"Ürünlerine yeni bir teklif geldiğinde."},
          {key:"messages",label:"Mesajlar",desc:"Yeni bir sohbet mesajı aldığında."},
          {key:"tradeUpdates",label:"Takas Durumu",desc:"Kargo ve onay süreçlerindeki güncellemeler."},
        ].map((item,i,arr) => (
          <div key={item.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px",borderBottom:i<arr.length-1?"1.5px solid #F2F2F7":"none"}}>
            <div style={{flex:1,paddingRight:16}}>
              <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E",marginBottom:2}}>{item.label}</div>
              <div style={{fontSize:12,color:"#8E8E93",lineHeight:1.3,fontWeight:600}}>{item.desc}</div>
            </div>
            <div onClick={()=>toggle(item.key)} style={{width:52,height:32,borderRadius:16,background:settings[item.key]?"#34C78A":"#E5E5EA",position:"relative",cursor:"pointer",transition:"background .3s ease",flexShrink:0}}>
              <div style={{position:"absolute",top:3,left:settings[item.key]?23:3,width:26,height:26,borderRadius:"50%",background:"white",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",transition:"left .3s cubic-bezier(0.34,1.56,0.64,1)"}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8,paddingLeft:4}}>E-Posta Bülteni</div>
      <div style={{background:"white",borderRadius:20,overflow:"hidden",border:"1.5px solid #E5E5EA",marginBottom:24,boxShadow:"0 4px 16px rgba(0,0,0,0.02)"}}>
        {[
          {key:"emailNotifs",label:"Takas Özetleri",desc:"Haftalık garaj raporları ve istatistikler."},
          {key:"marketing",label:"Kampanyalar",desc:"Özel indirimler ve kargo fırsatları."},
        ].map((item,i,arr) => (
          <div key={item.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px",borderBottom:i<arr.length-1?"1.5px solid #F2F2F7":"none"}}>
            <div style={{flex:1,paddingRight:16}}>
              <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E",marginBottom:2}}>{item.label}</div>
              <div style={{fontSize:12,color:"#8E8E93",lineHeight:1.3,fontWeight:600}}>{item.desc}</div>
            </div>
            <div onClick={()=>toggle(item.key)} style={{width:52,height:32,borderRadius:16,background:settings[item.key]?"#007AFF":"#E5E5EA",position:"relative",cursor:"pointer",transition:"background .3s ease",flexShrink:0}}>
              <div style={{position:"absolute",top:3,left:settings[item.key]?23:3,width:26,height:26,borderRadius:"50%",background:"white",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",transition:"left .3s cubic-bezier(0.34,1.56,0.64,1)"}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",padding:"10px 0"}}>
        <div style={{fontSize:12,color:"#C7C7CC",fontWeight:700}}>Cihaz ayarlarından bildirim izni verilmiştir.</div>
      </div>
    </SettingsSheet>
  );
}

/* ══════════════════════════════════════════════════════════════
   İTİRAZ TAKİP PANELİ (Disputes Sheet)
══════════════════════════════════════════════════════════════ */
function DisputesSheet({ onClose, currentUser }) {
  const [tab, setTab] = useState("active");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const isSena = currentUser?.email === "sena.ylmz@gmail.com";

  const disputes = isSena ? {
    active: [
      { id:1, title:"MacBook Air M2", partner:"Cem B.", status:"Hakem Heyetinde", statusColor:"#FF9500", emoji:"💻", date:"3 gün önce",
        logs:[
          {label:"İtiraz Açıldı",date:"06 Mar",done:true},
          {label:"Belgeler İnceleniyor",date:"07 Mar",done:true},
          {label:"Hakem Heyeti",date:"08 Mar",done:false},
          {label:"Karar",date:"Bekleniyor",done:false},
        ]
      },
    ],
    resolved: [
      { id:2, title:"Mekanik Klavye K2", partner:"Ali K.", status:"Lehinize Sonuçlandı", statusColor:"#34C78A", emoji:"⌨️", date:"2 hafta önce",
        logs:[{label:"İtiraz Açıldı",date:"20 Şub",done:true},{label:"İnceleme",date:"22 Şub",done:true},{label:"Karar",date:"25 Şub",done:true}]
      },
      { id:3, title:"Akıllı Saat S9", partner:"Zeynep M.", status:"Aleyhine Sonuçlandı", statusColor:"#FF3B30", emoji:"⌚", date:"1 ay önce",
        logs:[{label:"İtiraz Açıldı",date:"10 Şub",done:true},{label:"İnceleme",date:"12 Şub",done:true},{label:"Karar",date:"15 Şub",done:true}]
      },
    ]
  } : { active: [], resolved: [] };

  if (selectedDispute) {
    return (
      <SettingsSheet title="İtiraz Detayı" onClose={()=>setSelectedDispute(null)}>
        <div style={{background:"white",borderRadius:20,padding:"18px",marginBottom:20,border:"1.5px solid #E5E5EA"}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{fontSize:36}}>{selectedDispute.emoji}</div>
            <div>
              <div style={{fontSize:16,fontWeight:900,color:"#1C1C1E",marginBottom:4}}>{selectedDispute.title}</div>
              <div style={{fontSize:12,color:"#8E8E93",fontWeight:600}}>Karşı Taraf: {selectedDispute.partner}</div>
              <div style={{fontSize:12,fontWeight:800,color:selectedDispute.statusColor,marginTop:4}}>{selectedDispute.status}</div>
            </div>
          </div>
        </div>
        <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:12}}>Süreç Zaman Çizelgesi</div>
        <div style={{background:"white",borderRadius:20,padding:"20px",marginBottom:20,border:"1.5px solid #E5E5EA",position:"relative"}}>
          {selectedDispute.logs.map((log, i) => (
            <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:i<selectedDispute.logs.length-1?20:0,position:"relative"}}>
              {i < selectedDispute.logs.length-1 && <div style={{position:"absolute",left:10,top:22,width:2,height:30,background:log.done?"#34C78A":"#E5E5EA"}}/>}
              <div style={{width:20,height:20,borderRadius:"50%",background:log.done?"#34C78A":"#E5E5EA",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {log.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>}
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:log.done?"#1C1C1E":"#C7C7CC"}}>{log.label}</div>
                <div style={{fontSize:11,color:"#8E8E93",fontWeight:600}}>{log.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#FFF8E7",borderRadius:16,padding:"14px",border:"1px solid #FFEAA7",display:"flex",gap:10}}>
          <div style={{fontSize:20}}>💡</div>
          <div style={{fontSize:12,color:"#856404",fontWeight:700,lineHeight:1.5}}>Hakem kararları kesindir. Sonuç size iletildiğinde puanlar otomatik güncellenir.</div>
        </div>
      </SettingsSheet>
    );
  }

  return (
    <SettingsSheet title="İtirazlarım" onClose={onClose}>
      <div style={{display:"flex",gap:8,marginBottom:24,background:"white",padding:4,borderRadius:14,border:"1.5px solid #E5E5EA"}}>
        {[{key:"active",label:`Açık (${disputes.active.length})`},{key:"resolved",label:`Geçmiş (${disputes.resolved.length})`}].map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} style={{flex:1,padding:"10px",border:"none",borderRadius:10,fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:tab===t.key?"linear-gradient(135deg,#34C78A,#2DD4BF)":"transparent",color:tab===t.key?"white":"#8E8E93",transition:"all .2s"}}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {disputes[tab].map(d => (
          <div key={d.id} style={{background:"white",borderRadius:20,padding:"16px 18px",border:"1.5px solid #E5E5EA",boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:32}}>{d.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:900,color:"#1C1C1E",marginBottom:2}}>{d.title}</div>
                <div style={{fontSize:12,color:"#8E8E93",fontWeight:600}}>{d.partner} · {d.date}</div>
              </div>
              <div style={{fontSize:11,fontWeight:800,color:d.statusColor,background:d.statusColor+"18",padding:"4px 10px",borderRadius:99,textAlign:"center"}}>{d.status}</div>
            </div>
            <button onClick={()=>setSelectedDispute(d)} style={{width:"100%",padding:"10px",background:"#F2F2F7",border:"none",borderRadius:12,fontSize:13,fontWeight:800,color:"#34C78A",cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
              Detayları Gör →
            </button>
          </div>
        ))}
      </div>
    </SettingsSheet>
  );
}


/* ══════════════════════════════════════════════════════════════
   EDIT PROFILE SHEET
══════════════════════════════════════════════════════════════ */
function EditProfileSheet({ currentUser, onClose, onUpdateUser }) {
  const [name, setName]     = useState(currentUser?.name || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [bio, setBio]       = useState("Takas sever 🔁");
  const [isSaving, setIsSaving] = useState(false);

  const save = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (onUpdateUser) onUpdateUser({ name: name.trim(), username: username.trim() });
      setIsSaving(false);
      onClose();
    }, 900);
  };

  return (
    <SettingsSheet title="Profili Düzenle" onClose={onClose}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:28}}>
        <div style={{position:"relative",marginBottom:12}}>
          <img src={currentUser?.avatar||"https://i.pravatar.cc/150?img=68"} style={{width:88,height:88,borderRadius:"50%",objectFit:"cover",border:"3px solid #34C78A"}} alt=""/>
          <div style={{position:"absolute",bottom:0,right:0,background:"#34C78A",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px solid white"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.83a4 4 0 01-1.897 1.05l-2.928.731.731-2.928A4 4 0 019 13z" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div style={{fontSize:12,color:"#8E8E93",fontWeight:700}}>Fotoğrafı değiştir</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>Ad Soyad</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Adın ve soyadın"
            style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",fontWeight:700,outline:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
        </div>
        <div>
          <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>Kullanıcı Adı</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="kullanici_adi"
            style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",fontWeight:700,outline:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
        </div>
        <div>
          <label style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",display:"block",marginBottom:6}}>Biyografi</label>
          <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} placeholder="Kendin hakkında bir şeyler yaz..."
            style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:14,fontFamily:"'Nunito',sans-serif",fontWeight:600,outline:"none",resize:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
        </div>
      </div>

      <button onClick={save} style={{width:"100%",marginTop:24,padding:"16px",background:name.trim().length>=2?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",color:name.trim().length>=2?"white":"#8E8E93",border:"none",borderRadius:16,fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:name.trim().length>=2?"pointer":"default",boxShadow:name.trim().length>=2?"0 8px 24px #34C78A44":"none",transition:"all .2s"}}>
        {isSaving ? "⏳ Kaydediliyor..." : "✓ Güncelle"}
      </button>
    </SettingsSheet>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROFILE SCREEN
══════════════════════════════════════════════════════════════ */
function ProfileScreen({ likedItems, userPoints=0, walletBalance=0, currentUser=null, myGarage=[], onLogout, onProductClick, onUpdateUser }) {
  const [profileTab,    setProfileTab]    = useState("garage");
  const [showSettings,  setShowSettings]  = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [showAddresses,  setShowAddresses]  = useState(false);
  const [showDisputes,   setShowDisputes]   = useState(false);
  const [showNotifs,     setShowNotifs]     = useState(false);
  const [editingItem,   setEditingItem]   = useState(null);
  const [isVerified,    setIsVerified]    = useState(false);
  const [showKYC,       setShowKYC]       = useState(false);

  // MY_POINTS_TOTAL → userPoints prop
  const likedProducts   = PRODUCTS.filter(p=>likedItems[p.id]);

  // ── Settings groups data ──
  const SETTINGS_GROUPS = [
    {
      label:"Hesap",
      items:[
        {icon:"🛡️", label:"Kimlik Doğrulama", sub:"Mavi tik al", accent:"#007AFF"},
        {icon:"👤", label:"Profilimi Düzenle", sub:null, accent:null},
      ]
    },
    {
      label:"Takas & Finans",
      items:[
        {icon:"👛", label:"Takas Cüzdanım", sub: walletBalance > 0 ? `Bekleyen: ${walletBalance} P` : "0 Puan", accent:"#34C78A"},
        {icon:"💳", label:"Kayıtlı Kartlar",     sub:null, accent:null},
        {icon:"📍", label:"Adreslerim",           sub:null, accent:null},
        {icon:"⚖️", label:"İtirazlarım",         sub:null, accent:null},
      ]
    },
    {
      label:"Sistem",
      items:[
        {icon:"🔔", label:"Bildirimler", sub:null,   accent:null},
        {icon:"🚪", label:"Çıkış Yap",  sub:null,   accent:"#FF3B30", danger:true},
      ]
    },
  ];

  const GearIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="rgba(255,255,255,0.8)" strokeWidth="1.8"/>
    </svg>
  );

  const ChevronRight = ({color="#C7C7CC"}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{flex:1,overflowY:"auto",padding:"0 0 110px",animation:"tabSlideIn .3s ease",position:"relative"}}>

      {/* ── Hero / Identity ── */}
      <div style={{background:"linear-gradient(170deg,#1C1C1E 0%,#2C2C2E 60%,#34C78A22 100%)",padding:"14px 22px 28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"radial-gradient(circle,#34C78A33,transparent 70%)",pointerEvents:"none"}}/>

        {/* Settings icon top-right — NOW WIRED */}
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
          <button onClick={()=>setShowSettings(true)} style={{
            background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",
            backdropFilter:"blur(8px)",borderRadius:"50%",width:36,height:36,
            display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
            transition:"background .2s",
          }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
            <GearIcon/>
          </button>
        </div>

        {/* Avatar + name */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",animation:"profileDrop .4s ease"}}>
          <div style={{position:"relative",marginBottom:14}}>
            <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=68"}
              style={{width:88,height:88,borderRadius:"50%",objectFit:"cover",
                border:"3px solid #34C78A",boxShadow:"0 0 0 4px #34C78A33, 0 8px 32px rgba(0,0,0,0.4)"}}
              alt="profil"/>
            {/* Online dot */}
            <div style={{position:"absolute",bottom:4,right:4,width:14,height:14,borderRadius:"50%",
              background:"#34C78A",border:"2.5px solid #1C1C1E",boxShadow:"0 0 8px #34C78A"}}/>
          </div>

          {/* Name + verified badge */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <div style={{fontSize:20,fontWeight:900,color:"white",letterSpacing:"-0.5px"}}>
              {currentUser?.name || "Kullanıcı"}
            </div>
            {/* SADECE isVerified TRUE İSE MAVİ TİK GÖSTER */}
            {isVerified && (
              <div style={{background:"#007AFF",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px #007AFF66",animation:"scaleIn .4s ease"}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:20}}>{currentUser?.username ? "@"+currentUser.username : "@kullanici"} · İstanbul</div>

          {/* Total Points */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:4}}>
              Toplam Bakiyem
            </div>
            <div style={{
              fontFamily:"'Nunito',sans-serif",fontSize:44,fontWeight:900,
              letterSpacing:"-2px",lineHeight:1,
              background:"linear-gradient(90deg,#34C78A,#2DD4BF,#34C78A)",
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:"shimmer 3s linear infinite",
            }}>
              {userPoints.toLocaleString("tr-TR")}
            </div>
            <div style={{fontSize:14,color:"rgba(255,255,255,0.5)",fontWeight:700,marginTop:2}}>Takas Puanı</div>
          </div>

          {/* Stats row */}
          <div style={{display:"flex",gap:0,marginTop:22,background:"rgba(255,255,255,0.07)",
            borderRadius:18,overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)",width:"100%"}}>
            {[{label:"Takas",val:"23"},{label:"Puan",val:"4.5K"},{label:"Favori",val:Object.values({2:true,5:true}).filter(Boolean).length}].map((s,i)=>(
              <div key={s.label} style={{flex:1,padding:"12px 0",textAlign:"center",
                borderRight:i<2?"1px solid rgba(255,255,255,0.08)":"none"}}>
                <div style={{fontSize:18,fontWeight:900,color:"white"}}>{s.val}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontWeight:600,marginTop:1}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Segmented Control ── */}
      <div style={{padding:"18px 22px 0"}}>
        <div style={{background:"#E5E5EA",borderRadius:14,padding:3,display:"flex",gap:2,marginBottom:18}}>
          {[{key:"garage",label:"🚗  Garajım"},{key:"favorites",label:"❤️  Favorilerim"}].map(tab=>{
            const a = profileTab===tab.key;
            return (
              <button key={tab.key} onClick={()=>setProfileTab(tab.key)} style={{
                flex:1,padding:"10px 0",borderRadius:11,border:"none",cursor:"pointer",
                fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:a?800:600,
                color:a?"white":"#6D6D72",
                background:a?"linear-gradient(135deg,#34C78A,#2DD4BF)":"transparent",
                boxShadow:a?"0 4px 14px #34C78A55":"none",
                transition:"all .25s cubic-bezier(0.34,1.56,0.64,1)",
                transform:a?"scale(1.02)":"scale(1)",
              }}>{tab.label}</button>
            );
          })}
        </div>

        {/* ── Garage Grid ── */}
        {profileTab==="garage" && (
          <div style={{animation:"tabSlideIn .25s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {myGarage.map((item,i)=>(
                <div key={item.id} onClick={()=>onProductClick&&onProductClick(item)} style={{
                  background:"white",borderRadius:20,overflow:"hidden",
                  boxShadow:"0 2px 14px rgba(0,0,0,0.07)",
                  animation:`fadeSlideUp .3s ${i*0.06}s both`,
                  position:"relative",cursor:"pointer",
                }}>
                  <div style={{position:"relative",width:"100%",aspectRatio:"1/1",background:item.bg||"linear-gradient(135deg,#E5E5EA,#D1D1D6)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:52,lineHeight:1}}>{item.emoji||"📦"}</span>
                    {/* Edit badge */}
                    <button onClick={(e)=>{e.stopPropagation();setEditingItem(item);}} style={{
                      position:"absolute",top:8,right:8,
                      background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",
                      borderRadius:"50%",width:30,height:30,border:"none",cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 2px 8px rgba(0,0,0,0.12)",
                      animation:"editBadge .4s ease",
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#34C78A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#34C78A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div style={{padding:"10px 12px"}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#1C1C1E",marginBottom:6,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.name}</div>
                    <div style={{background:"#34C78A12",borderRadius:8,padding:"3px 8px",display:"inline-flex",alignItems:"center",gap:4}}>
                      <div style={{width:5,height:5,background:"#34C78A",borderRadius:"50%"}}/>
                      <span style={{color:"#34C78A",fontSize:12,fontWeight:800}}>{item.points} P</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Favorites Grid ── */}
        {profileTab==="favorites" && (
          <div style={{animation:"tabSlideIn .25s ease"}}>
            {likedProducts.length === 0 ? (
              <div style={{textAlign:"center",padding:"48px 0",color:"#8E8E93"}}>
                <div style={{fontSize:40,marginBottom:12}}>🤍</div>
                <div style={{fontSize:15,fontWeight:700,color:"#3A3A3C",marginBottom:4}}>Henüz favori yok</div>
                <div style={{fontSize:13}}>Beğendiğin ürünlerin burada görünür</div>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {likedProducts.map((product,i)=>(
                  <div key={product.id} style={{
                    background:"white",borderRadius:20,overflow:"hidden",
                    boxShadow:"0 2px 14px rgba(0,0,0,0.07)",
                    animation:`fadeSlideUp .3s ${i*0.06}s both`,
                  }}>
                    <div style={{position:"relative",width:"100%",aspectRatio:"1/1",background:product.bg||"linear-gradient(135deg,#E5E5EA,#D1D1D6)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:52,lineHeight:1}}>{product.emoji||"📦"}</span>
                      <div style={{position:"absolute",top:8,right:8,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF3B30"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#FF3B30" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                      </div>
                      <div style={{position:"absolute",bottom:8,left:8,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(8px)",borderRadius:99,padding:"2px 8px",fontSize:10,color:"#6D6D72",fontWeight:600}}>{product.owner}</div>
                    </div>
                    <div style={{padding:"10px 12px"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#1C1C1E",marginBottom:6,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{product.name}</div>
                      <div style={{background:"#34C78A12",borderRadius:8,padding:"3px 8px",display:"inline-flex",alignItems:"center",gap:4}}>
                        <div style={{width:5,height:5,background:"#34C78A",borderRadius:"50%"}}/>
                        <span style={{color:"#34C78A",fontSize:12,fontWeight:800}}>{product.points.toLocaleString("tr-TR")} P</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══ SETTINGS BOTTOM SHEET ══ */}
      {showSettings && (<>
        {/* Backdrop */}
        <div onClick={()=>setShowSettings(false)} style={{position:"fixed",inset:0,zIndex:80,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(6px)",animation:"fadeIn .25s ease"}}/>

        {/* Sheet */}
        <div style={{
          position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
          width:"100%",maxWidth:384,zIndex:90,
          background:"#F2F2F7",
          borderRadius:"28px 28px 0 0",
          animation:"slideUp .4s cubic-bezier(0.32,0.72,0,1)",
          maxHeight:"88vh",overflowY:"auto",
          paddingBottom:40,
        }}>
          {/* Handle */}
          <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"14px auto 0"}}/>

          {/* Header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px 10px"}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:22,fontWeight:900,color:"#1C1C1E",letterSpacing:"-0.5px"}}>
              Ayarlar<span style={{color:"#34C78A"}}>.</span>
            </div>
            <button onClick={()=>setShowSettings(false)} style={{
              background:"#E5E5EA",border:"none",borderRadius:99,
              padding:"6px 16px",cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",fontSize:14,fontWeight:700,color:"#3A3A3C",
            }}>Bitti</button>
          </div>

          {/* Profile mini-card inside settings */}
          <div style={{margin:"8px 16px 20px",background:"white",borderRadius:18,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=68"} style={{width:48,height:48,borderRadius:"50%",objectFit:"cover",border:"2px solid #34C78A44"}} alt=""/>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E",display:"flex",alignItems:"center",gap:5}}>
                {currentUser?.name || "Kullanıcı"}
                <div style={{background:"#007AFF",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div style={{fontSize:12,color:"#8E8E93",marginTop:1}}>{(currentUser?.username?"@"+currentUser.username:"@kullanici")} · {userPoints.toLocaleString("tr-TR")} Puan</div>
            </div>
            <ChevronRight/>
          </div>

          {/* Settings groups */}
          <div style={{padding:"0 16px",display:"flex",flexDirection:"column",gap:28}}>
            {SETTINGS_GROUPS.map((group,gi)=>(
              <div key={group.label}>
                {/* Group label */}
                <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:8,paddingLeft:4}}>
                  {group.label}
                </div>

                {/* Inset grouped list */}
                <div style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
                  {group.items.map((item,ii)=>{
                    const isLast = ii === group.items.length - 1;
                    return (
                      <button key={item.label}
                        onClick={()=>{
                          if (item.label === "Kimlik Doğrulama") { setShowSettings(false); setShowKYC(true); }
                          else if (item.label === "Profilimi Düzenle") { setShowSettings(false); setShowEditProfile(true); }
                          else if (item.label === "Kayıtlı Kartlar") { setShowSettings(false); setShowSavedCards(true); }
                          else if (item.label === "Adreslerim") { setShowSettings(false); setShowAddresses(true); }
                          else if (item.label === "İtirazlarım") { setShowSettings(false); setShowDisputes(true); }
                          else if (item.label === "Bildirimler") { setShowSettings(false); setShowNotifs(true); }
                          else if (item.label === "Çıkış Yap" && onLogout) { onLogout(); }
                          else { alert(item.label + " ekranı yapım aşamasında."); }
                        }}
                        style={{
                          width:"100%",background:"none",border:"none",cursor:"pointer",
                          padding:"14px 16px",
                          display:"flex",alignItems:"center",gap:14,
                          borderBottom: isLast ? "none" : "1px solid #F2F2F7",
                          transition:"background .15s",
                          fontFamily:"'Nunito',sans-serif",
                        }}
                        onMouseEnter={e=>e.currentTarget.style.background="#F8F8F8"}
                        onMouseLeave={e=>e.currentTarget.style.background="none"}>

                        {/* Emoji icon in colored pill */}
                        <div style={{
                          width:34,height:34,borderRadius:10,
                          background: item.danger ? "#FF3B3018" : item.accent ? item.accent+"18" : "#34C78A12",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:17,flexShrink:0,
                        }}>{item.icon}</div>

                        {/* Label + sub */}
                        <div style={{flex:1,textAlign:"left"}}>
                          <div style={{
                            fontSize:15,fontWeight:600,
                            color: item.danger ? "#FF3B30" : "#1C1C1E",
                          }}>{item.label}</div>
                          {item.sub && (
                            <div style={{fontSize:11,color:item.accent||"#8E8E93",fontWeight:600,marginTop:1}}>
                              {item.sub}
                            </div>
                          )}
                        </div>

                        {/* Chevron */}
                        <ChevronRight color={item.danger ? "#FF3B3088" : "#C7C7CC"}/>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* App version footer */}
            <div style={{textAlign:"center",paddingBottom:8}}>
              <div style={{fontSize:12,color:"#C7C7CC",fontWeight:500}}>Takas v1.0.0</div>
              <div style={{fontSize:11,color:"#D1D1D6",marginTop:2}}>Para değil, değer değiş tokuşu ♻️</div>
            </div>
          </div>
        </div>
      </>)}
    {editingItem && <EditProductSheet item={editingItem} onClose={()=>setEditingItem(null)}/>}
    {showEditProfile && <EditProfileSheet currentUser={currentUser} onClose={()=>setShowEditProfile(false)} onUpdateUser={(newData)=>{ if(typeof onUpdateUser==="function") onUpdateUser(newData); }}/>}
    {showKYC && <KYCModal onClose={()=>setShowKYC(false)} onSuccess={()=>{setIsVerified(true);setShowKYC(false);}}/>}
    {showSavedCards && <SavedCardsSheet onClose={()=>setShowSavedCards(false)} currentUser={currentUser}/>}
    {showAddresses && <AddressesSheet onClose={()=>setShowAddresses(false)}/>}
    {showDisputes && <DisputesSheet onClose={()=>setShowDisputes(false)} currentUser={currentUser}/>}
    {showNotifs && <NotificationsSheet onClose={()=>setShowNotifs(false)}/>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHAT DETAIL SCREEN
══════════════════════════════════════════════════════════════ */
function ChatDetailScreen({ chat, onBack, setWalletBalance }) {
  const [messages, setMessages] = useState(() => {
    const initial = [
      { id:1, from:"me",   text:"Merhaba! Takas teklifi için ne zaman müsaitsin? 😊", time:"09:41", anim:true },
      { id:2, from:"them", text:"Merhaba! Harika bir teklif! Yarın öğleden sonra uygun olur mu?", time:"09:42", anim:false },
    ];
    if (chat.actionType === "extra_item") {
      initial.push({ id:3, from:"me", text:`📍 Teklifimi eşitlemek için fazladan verdiğim ${chat.excessPoints} puana karşılık garajından bir ürün daha seçmek istiyorum. Neler var bakalım? 👀`, time:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}), anim:true });
    } else if (chat.actionType === "wallet" || chat.actionType === "exact") {
      initial.push({ id:3, from:"me", text:`📍 Ürünlerin için harika bir teklif gönderdim! İnceleyip dönüş yaparsan sevinirim. 🤝`, time:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}), anim:true });
    }
    return initial;
  });
  const [input,         setInput]        = useState("");
  const [showTyping,    setShowTyping]    = useState(false);
  const [showEmojis,    setShowEmojis]    = useState(false);
  const [deliveryState, setDeliveryState] = useState("choose");
  const [tradeStatus,   setTradeStatus]   = useState(chat.actionType ? "pending" : "accepted");

  const simulateReply = (type) => {
    setShowTyping(true);
    setTimeout(()=>{
      setShowTyping(false);
      if (type === "reject") {
        setTradeStatus("cancelled");
        if (chat.actionType === "wallet" && chat.excessPoints) {
          setWalletBalance(prev => Math.max(0, prev - chat.excessPoints));
        }
        const t = new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
        setMessages(prev=>[...prev,{id:Date.now(),from:"them",text:"Maalesef ürünlerimi bölmek istemiyorum, bu yüzden teklifi reddediyorum. Başka sefere! 🙏",time:t,anim:true}]);
      } else {
        setTradeStatus("accepted");
        const t = new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
        setMessages(prev=>[...prev,{id:Date.now(),from:"them",text:"Teklifini inceledim ve kesinlikle kabul ediyorum! Harika bir takas olacak. 🤝",time:t,anim:true}]);
      }
    }, 1500);
  };
  const [showDispute,   setShowDispute]   = useState(false);
  const [disputeText,   setDisputeText]   = useState("");
  const [disputeFile,   setDisputeFile]   = useState(null);
  const [showAttach,    setShowAttach]    = useState(false);
  const [disputeSent,   setDisputeSent]   = useState(false);
  const [showSafeSpots, setShowSafeSpots] = useState(false);
  const [meetupSpot,    setMeetupSpot]    = useState(null);
  const [safeSpotMode,  setSafeSpotMode]  = useState("chat");
  const QUICK_EMOJIS = ["👍","❤️","😊","🔥","🤝"];

  const scrollRef  = useRef(null);
  const inputRef   = useRef(null);
  const cameraRef  = useRef(null);
  const galleryRef = useRef(null);
  const docRef     = useRef(null);
  const fileRef    = useRef(null);
  const provisionAmount = chat.points || 1200;

  useEffect(()=>{
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, showTyping, deliveryState]);

  const sendMessage = () => {
    const userMsg = input.trim();
    if (!userMsg) return;
    const t = new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
    setMessages(prev=>[...prev,{id:Date.now(),from:"me",text:userMsg,time:t,anim:true}]);
    setInput("");
    setShowTyping(true);
    setTimeout(()=>{
      setShowTyping(false);
      let replyText = "Anladım, peki takas işlemini nasıl ilerletmek istersin? 😊";
      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes("merhaba") || lowerMsg.includes("selam")) {
        replyText = "Selam! Teklifini inceledim, gerçekten harika duruyor. 🤝";
      } else if (lowerMsg.includes("kargo") || lowerMsg.includes("gönder")) {
        replyText = "Kargo benim için de çok uygun. Anlaşmalı kodla ücretsiz gönderebiliriz.";
      } else if (lowerMsg.includes("konum") || lowerMsg.includes("nerede") || lowerMsg.includes("buluş")) {
        replyText = "Ben merkezdeyim. İstersen TakasApp'in önerdiği güvenli noktalardan birinde buluşabiliriz. 📍";
      } else if (lowerMsg.includes("durum") || lowerMsg.includes("hasar") || lowerMsg.includes("çizik")) {
        replyText = "Ürünüm AI raporunda belirtildiği gibi temizdir, aklında hiç şüphe kalmasın. ✨";
      } else if (lowerMsg.includes("tamam") || lowerMsg.includes("olur") || lowerMsg.includes("kabul")) {
        replyText = "Süper! O zaman yukarıdaki menüden teslimat yöntemini seçip süreci başlatalım. 🚀";
      }
      setMessages(prev=>[...prev,{id:Date.now()+1,from:"them",text:replyText,time:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}),anim:true}]);
    }, 1500 + Math.random() * 1000);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const t = new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
    let msgText = `📎 ${file.name} gönderildi.`;
    if (type === "camera")  msgText = "📸 Yeni fotoğraf gönderildi.";
    if (type === "gallery") msgText = "🖼️ Medya gönderildi.";
    setMessages(prev=>[...prev,{id:Date.now(),from:"me",text:msgText,time:t,anim:true}]);
    e.target.value = null;
  };

  const handleAttachment = (label) => {
    setShowAttach(false);
    if (label === "Kamera")             cameraRef.current?.click();
    if (label === "Fotoğraf & Video")   galleryRef.current?.click();
    if (label === "Belge")              docRef.current?.click();
    if (label === "Güvenli Nokta Öner") {
      setSafeSpotMode("chat");
      setShowSafeSpots(true);
    }
  };

  const TradeCard = () => {
    const prov = provisionAmount.toLocaleString("tr-TR");
    const [pin, setPin] = useState("");
    const [showItemsDetail, setShowItemsDetail] = useState(false);

    const myItems = chat.selectedItems || [];
    const isMulti = myItems.length > 1;
    const rawTotalPoints = myItems.reduce((sum, item) => sum + item.points, 0);
    const myTotalPoints = chat.actionType === "wallet" ? rawTotalPoints - (chat.excessPoints || 0) : rawTotalPoints;
    const myName = isMulti ? `${myItems.length} Ürün Seçildi` : (myItems[0]?.name || "Ürün");

    if (tradeStatus === "cancelled") {
      return (
        <div style={{background:"#FFF0F0",borderRadius:20,padding:"16px",border:"1.5px solid #FF3B3044",textAlign:"center",marginBottom:12,animation:"cardReveal .5s ease"}}>
          <div style={{fontSize:28,marginBottom:8}}>🚫</div>
          <div style={{fontSize:14,fontWeight:900,color:"#FF3B30",marginBottom:4}}>Takas İptal Edildi</div>
          <div style={{fontSize:12,color:"#6D6D72",fontWeight:600,lineHeight:1.4}}>
            Karşı taraf teklifi reddetti.<br/>Ürünlerindeki bloke kaldırıldı ve garajına iade edildi.
          </div>
          {chat.actionType === "wallet" && chat.excessPoints > 0 && (
            <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #FF3B3022",fontSize:12,color:"#FF3B30",fontWeight:800}}>
              👛 Cüzdana aktarılan {chat.excessPoints} Puanlık işlem iptal edildi.
            </div>
          )}
        </div>
      );
    }

    const isPending = tradeStatus === "pending";
    const borderColor = isPending ? "#FF950055"
      : deliveryState==="done" ? "#34C78A55"
      : (deliveryState==="cargo_confirm"||deliveryState==="cargo_code"||deliveryState==="cargo_sent") ? "#007AFF33"
      : (deliveryState==="meetup_confirm"||deliveryState==="enter_pin") ? "#34C78A44"
      : "#34C78A33";

    return (
      <>
        <div style={{background:"white",borderRadius:20,padding:"14px",border:`1.5px solid ${borderColor}`,boxShadow:"0 4px 20px rgba(0,0,0,0.07)",marginBottom:12,animation:"cardReveal .5s cubic-bezier(0.34,1.56,0.64,1)",transition:"border-color .4s"}}>
          <div style={{fontSize:10,fontWeight:800,color:isPending?"#FF9500":"#8E8E93",textTransform:"uppercase",letterSpacing:"0.6px",textAlign:"center",marginBottom:12}}>
            {isPending ? "⏳ Karşı Tarafın Onayı Bekleniyor" : "Onaylanan Takas"}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            {/* SENİN TARAFIN */}
            <div style={{flex:1,textAlign:"center"}}>
              <div onClick={()=>isMulti&&setShowItemsDetail(true)} style={{width:60,height:60,borderRadius:14,margin:"0 auto 5px",border:"2px solid #E5E5EA",background:isMulti?"#F2F2F7":(myItems[0]?.bg||"linear-gradient(135deg,#E5E5EA,#D1D1D6)"),display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:isMulti?"pointer":"default",transition:"transform .2s"}} onMouseEnter={e=>isMulti&&(e.currentTarget.style.transform="scale(1.05)")} onMouseLeave={e=>isMulti&&(e.currentTarget.style.transform="scale(1)")}>
                {isMulti ? (
                  <>
                    <div style={{position:"absolute",top:6,left:6,fontSize:22,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"}}>{myItems[0]?.emoji}</div>
                    <div style={{position:"absolute",bottom:6,right:6,fontSize:22,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"}}>{myItems[1]?.emoji}</div>
                    {myItems.length > 2 && <div style={{position:"absolute",top:-6,right:-6,background:"#FF3B30",color:"white",fontSize:10,fontWeight:800,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid white"}}>+{myItems.length-2}</div>}
                    <div style={{position:"absolute",bottom:-8,background:"#1C1C1E",color:"white",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:6,letterSpacing:"0.5px"}}>Tıkla İncele</div>
                  </>
                ) : (
                  <span style={{fontSize:32}}>{myItems[0]?.emoji||"📦"}</span>
                )}
              </div>
              <div style={{fontSize:10,fontWeight:700,color:"#1C1C1E",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:76,margin:"0 auto"}}>{myName}</div>
              <div style={{fontSize:10,color:"#34C78A",fontWeight:800,marginTop:1}}>{myTotalPoints} P</div>
            </div>

            {/* ORTA İKON */}
            <div style={{width:30,height:30,borderRadius:"50%",background:isPending?"#E5E5EA":"linear-gradient(135deg,#34C78A,#2DD4BF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:isPending?"none":"0 4px 12px #34C78A55",flexShrink:0,fontSize:14,color:isPending?"#8E8E93":"white"}}>⇄</div>

            {/* KARŞI TARAF */}
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{width:60,height:60,borderRadius:14,margin:"0 auto 5px",border:isPending?"2px solid #FF950044":"2px solid #34C78A44",background:chat.bg||"linear-gradient(135deg,#E5E5EA,#D1D1D6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:32}}>{chat.emoji||"📦"}</span>
              </div>
              <div style={{fontSize:10,fontWeight:700,color:"#1C1C1E",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:76,margin:"0 auto"}}>{chat.name}</div>
              <div style={{fontSize:10,color:"#34C78A",fontWeight:800,marginTop:1}}>{chat.points} P</div>
            </div>
          </div>

          {isPending && (
            <div style={{background:"#F8F8FA",borderRadius:12,padding:"10px",marginTop:10,animation:"fadeSlideUp .3s ease"}}>
              <div style={{fontSize:10,fontWeight:800,color:"#8E8E93",textAlign:"center",marginBottom:8}}>🧪 DEMO: Karşı Tarafı Simüle Et</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>simulateReply("reject")} style={{flex:1,padding:"8px",background:"#FF3B3018",border:"none",borderRadius:10,color:"#FF3B30",fontSize:12,fontWeight:800,cursor:"pointer"}}>Reddettir</button>
                <button onClick={()=>simulateReply("accept")} style={{flex:1,padding:"8px",background:"#34C78A18",border:"none",borderRadius:10,color:"#34C78A",fontSize:12,fontWeight:800,cursor:"pointer"}}>Kabul Ettir</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="choose") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#3A3A3C",textAlign:"center",marginBottom:10}}>Teslimat Yöntemi Seçin</div>
              <div style={{display:"flex",gap:8}}>
                {[{label:"📍 Güvenli\nNoktada Buluş",action:()=>{setSafeSpotMode("trade");setShowSafeSpots(true);},hover:"#34C78A"},{label:"📦 Kargo ile\nTakasla",action:()=>setDeliveryState("cargo_confirm"),hover:"#007AFF"}].map((btn,i)=>(
                  <button key={i} onClick={btn.action} style={{flex:1,padding:"10px 6px",background:"#F2F2F7",border:"1.5px solid #E5E5EA",borderRadius:14,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,color:"#1C1C1E",transition:"all .2s",whiteSpace:"pre-line",lineHeight:1.4}}
                    onMouseEnter={e=>{e.currentTarget.style.background=btn.hover+"18";e.currentTarget.style.borderColor=btn.hover+"44";e.currentTarget.style.color=btn.hover;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="#F2F2F7";e.currentTarget.style.borderColor="#E5E5EA";e.currentTarget.style.color="#1C1C1E";}}>{btn.label}</button>
                ))}
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="cargo_confirm") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{background:"#F2F2F7",border:"1px solid #E5E5EA",borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:11,fontWeight:800,color:"#8E8E93",textTransform:"uppercase"}}>Teslimat Adresi</div><div style={{fontSize:13,fontWeight:700,color:"#1C1C1E",marginTop:2}}>Ev Adresim (Kadıköy)</div></div>
                <div style={{fontSize:12,color:"#007AFF",fontWeight:800,cursor:"pointer"}}>Değiştir</div>
              </div>
              <div style={{background:"#FF950018",border:"1px solid #FF950044",borderRadius:12,padding:"10px 12px",marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:800,color:"#FF9500",marginBottom:4}}>⚠️ Provizyon Bildirimi</div>
                <div style={{fontSize:12,color:"#3A3A3C",lineHeight:1.5,fontWeight:500}}>Güvenliğiniz için kredi kartınızdan ürün değeri kadar <span style={{color:"#1C1C1E",fontWeight:800}}>({prov} TL)</span> geçici provizyon alınacaktır.</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDeliveryState("choose")} style={{flex:0,padding:"10px 14px",background:"#F2F2F7",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,color:"#8E8E93"}}>← Geri</button>
                <button onClick={()=>setDeliveryState("cargo_code")} style={{flex:1,padding:"11px",background:"linear-gradient(135deg,#007AFF,#0066DD)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800,color:"white",boxShadow:"0 4px 16px #007AFF44"}}>✓ Onaylıyorum</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="cargo_code") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{background:"#F0F8FF",border:"1px solid #007AFF44",borderRadius:12,padding:"14px",marginBottom:10,textAlign:"center"}}>
                <div style={{fontSize:12,fontWeight:800,color:"#007AFF",marginBottom:4}}>Anlaşmalı Kargo Kodun</div>
                <div style={{fontSize:11,color:"#6D6D72",marginBottom:10}}>Bu kodu PTT Kargo şubesine vererek ücretsiz gönderim yapabilirsin.</div>
                <div style={{display:"inline-block",background:"white",border:"2px dashed #007AFF",borderRadius:12,padding:"8px 16px",fontSize:22,fontWeight:900,color:"#1C1C1E",letterSpacing:2}}>PTT-849201</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDeliveryState("cargo_confirm")} style={{flex:0,padding:"10px 14px",background:"#F2F2F7",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,color:"#8E8E93"}}>← Geri</button>
                <button onClick={()=>setDeliveryState("cargo_sent")} style={{flex:1,padding:"11px",background:"linear-gradient(135deg,#007AFF,#0066DD)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800,color:"white",boxShadow:"0 4px 16px #007AFF44"}}>📦 Kargoya Verdim</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="cargo_sent") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{background:"#007AFF18",border:"1px solid #007AFF33",borderRadius:12,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:22,flexShrink:0}}>📦</div>
                <div><div style={{fontSize:12,fontWeight:800,color:"#007AFF"}}>Kargo Yolda (Takip No: 3829)</div><div style={{fontSize:11,color:"#6D6D72",fontWeight:500,marginTop:1}}>Ürün teslim edildiğinde onaylayın.</div></div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDeliveryState("done")} style={{flex:1,padding:"11px 6px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:800,color:"white",boxShadow:"0 4px 16px #34C78A44",lineHeight:1.3}}>✅ Onaylıyorum</button>
                <button onClick={()=>setShowDispute(true)} style={{flex:1,padding:"11px 6px",background:"linear-gradient(135deg,#FF6B6B,#FF3B30)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:800,color:"white",boxShadow:"0 4px 16px #FF3B3044",lineHeight:1.3}}>🚨 İtiraz Et</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="meetup_confirm") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{background:"#34C78A18",border:"1px solid #34C78A44",borderRadius:12,padding:"10px 12px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:22,flexShrink:0}}>📍</div>
                <div>
                  <div style={{fontSize:12,fontWeight:800,color:"#34C78A"}}>Güvenli Nokta Seçildi</div>
                  <div style={{fontSize:11,color:"#6D6D72",fontWeight:500,marginTop:1}}>{meetupSpot ? `${meetupSpot.name} (${meetupSpot.desc})` : "Seçilen güvenli nokta"} — Buluşma zamanını sohbetten belirleyin.</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDeliveryState("choose")} style={{flex:0,padding:"10px 14px",background:"#F2F2F7",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,color:"#8E8E93"}}>← Geri</button>
                <button onClick={()=>setDeliveryState("enter_pin")} style={{flex:1,padding:"11px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800,color:"white",boxShadow:"0 4px 16px #34C78A44"}}>✅ Takası Tamamla</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="enter_pin") && (
            <div style={{animation:"fadeSlideUp .3s ease"}}>
              <div style={{background:"#F0FDF8",border:"1px solid #34C78A44",borderRadius:12,padding:"14px",marginBottom:10}}>
                <div style={{fontSize:12,fontWeight:800,color:"#1C1C1E",textAlign:"center",marginBottom:4}}>Alıcıdan Kodu İste</div>
                <div style={{fontSize:11,color:"#6D6D72",textAlign:"center",marginBottom:12}}>Takası güvenle bitirmek için ürünü teslim alan kişideki 4 haneli kodu girin.</div>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <input type="text" maxLength={4} value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,""))} placeholder="0000" style={{width:110,textAlign:"center",fontSize:26,fontWeight:900,letterSpacing:6,padding:"8px 0",borderRadius:12,border:"2.5px solid #34C78A",outline:"none",color:"#1C1C1E",background:"white"}}/>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setDeliveryState("meetup_confirm")} style={{flex:0,padding:"10px 14px",background:"#F2F2F7",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:700,color:"#8E8E93"}}>← Geri</button>
                <button disabled={pin.length!==4} onClick={()=>setDeliveryState("done")} style={{flex:1,padding:"11px",background:pin.length===4?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",border:"none",borderRadius:12,cursor:pin.length===4?"pointer":"default",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800,color:pin.length===4?"white":"#C7C7CC"}}>🛡️ Kodu Doğrula</button>
              </div>
            </div>
          )}

          {(!isPending && deliveryState==="done") && (
            <div style={{animation:"bounceIn .4s cubic-bezier(0.34,1.56,0.64,1)"}}>
              <div style={{background:"linear-gradient(135deg,#34C78A18,#2DD4BF18)",border:"1px solid #34C78A44",borderRadius:99,padding:"8px 14px",textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:800,color:"#34C78A"}}>🎉 Takas Başarıyla Tamamlandı!</span>
              </div>
            </div>
          )}
        </div>

        {/* ÇOKLU ÜRÜN DETAY MODALI */}
        {showItemsDetail && (
          <div style={{position:"fixed",inset:0,zIndex:11000,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn .2s ease"}} onClick={()=>setShowItemsDetail(false)}>
            <div style={{background:"white",borderRadius:24,padding:20,width:"100%",maxWidth:320,animation:"bounceIn .3s ease",boxShadow:"0 12px 40px rgba(0,0,0,0.15)"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontSize:16,fontWeight:800,color:"#1C1C1E"}}>Teklif İçeriği</div>
                <button onClick={()=>setShowItemsDetail(false)} style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#1C1C1E",fontWeight:"bold"}}>✕</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10,maxHeight:300,overflowY:"auto"}}>
                {myItems.map(item=>(
                  <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px",background:"#F9F9FB",borderRadius:16,border:"1px solid #E5E5EA"}}>
                    <div style={{fontSize:32}}>{item.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:"#1C1C1E"}}>{item.name}</div>
                      <div style={{fontSize:12,fontWeight:800,color:"#34C78A"}}>{item.points} Puan</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:16,paddingTop:16,borderTop:"1.5px dashed #E5E5EA"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}>
                  <span style={{color:"#6D6D72",fontWeight:600}}>Ürünlerin Toplamı:</span>
                  <span style={{fontWeight:800,color:"#1C1C1E"}}>{rawTotalPoints} P</span>
                </div>
                {chat.actionType === "wallet" && (
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#856404",marginBottom:6}}>
                    <span style={{fontWeight:600}}>Cüzdana Aktarılan:</span>
                    <span style={{fontWeight:800}}>- {chat.excessPoints} P</span>
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"space-between",fontSize:15,marginTop:8}}>
                  <span style={{color:"#1C1C1E",fontWeight:800}}>Net Teklif Değeri:</span>
                  <span style={{fontWeight:900,color:"#34C78A"}}>{myTotalPoints} P</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{position:"fixed",top:0,bottom:0,left:0,right:0,margin:"0 auto",width:"100%",maxWidth:384,zIndex:100,background:"#F2F2F7",display:"flex",flexDirection:"column",animation:"slideInRight .25s ease-out"}}>
      {/* Header */}
      <div style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,0,0,0.06)",padding:"52px 16px 12px",flexShrink:0,position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onBack} style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{position:"relative",flexShrink:0}}>
            <img src={chat.ownerAvatar} alt={chat.owner} style={{width:42,height:42,borderRadius:"50%",objectFit:"cover",border:"2px solid #34C78A44"}}/>
            <div style={{position:"absolute",bottom:0,right:0,width:11,height:11,borderRadius:"50%",background:"#34C78A",border:"2px solid white",boxShadow:"0 0 6px #34C78A88"}}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E"}}>{chat.owner}</div>
            <div style={{fontSize:11,color:"#34C78A",fontWeight:600}}>● Çevrimiçi</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{flex:1,overflowY:"auto",padding:"16px 16px 0",display:"flex",flexDirection:"column",gap:4}}>
        {TradeCard()}
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"4px 0 8px"}}>
          <div style={{flex:1,height:1,background:"#E5E5EA"}}/>
          <span style={{fontSize:11,color:"#8E8E93",fontWeight:600,whiteSpace:"nowrap"}}>Bugün</span>
          <div style={{flex:1,height:1,background:"#E5E5EA"}}/>
        </div>
        {messages.map((msg,i)=>{
          const isMe = msg.from==="me";
          return (
            <div key={msg.id} style={{display:"flex",flexDirection:isMe?"row-reverse":"row",alignItems:"flex-end",gap:8,marginBottom:4,animation:msg.anim?`bubbleIn .3s ${i*0.04}s both cubic-bezier(0.34,1.56,0.64,1)`:"none"}}>
              {!isMe && <img src={chat.ownerAvatar} alt="" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",border:"1.5px solid #E5E5EA",flexShrink:0,marginBottom:2}}/>}
              <div style={{maxWidth:"72%"}}>
                <div style={{padding:"10px 14px",background:isMe?"linear-gradient(135deg,#34C78A,#2DD4BF)":"white",color:isMe?"white":"#1C1C1E",borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px",fontSize:14,lineHeight:1.45,fontWeight:500,boxShadow:isMe?"0 4px 16px #34C78A44":"0 2px 10px rgba(0,0,0,0.07)",whiteSpace:"pre-wrap"}}>{msg.text}</div>
                <div style={{fontSize:10,color:"#C7C7CC",fontWeight:500,marginTop:4,textAlign:isMe?"right":"left",paddingLeft:isMe?0:4,paddingRight:isMe?4:0}}>{msg.time} {isMe&&"✓✓"}</div>
              </div>
            </div>
          );
        })}
        {showTyping && (
          <div style={{display:"flex",alignItems:"flex-end",gap:8,marginBottom:4,animation:"bubbleIn .3s ease"}}>
            <img src={chat.ownerAvatar} alt="" style={{width:28,height:28,borderRadius:"50%",objectFit:"cover",border:"1.5px solid #E5E5EA",flexShrink:0}}/>
            <div style={{background:"white",borderRadius:"18px 18px 18px 4px",padding:"12px 16px",boxShadow:"0 2px 10px rgba(0,0,0,0.07)",display:"flex",alignItems:"center",gap:4}}>
              {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#C7C7CC",animation:`typingDot 1.4s ${i*0.2}s ease-in-out infinite`}}/>)}
            </div>
          </div>
        )}
        <div style={{height:16}}/>
      </div>

      {/* Hidden file inputs */}
      <input ref={cameraRef}  type="file" accept="image/*,video/*" capture="environment" style={{display:"none"}} onChange={e=>handleFileChange(e,"camera")}/>
      <input ref={galleryRef} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={e=>handleFileChange(e,"gallery")}/>
      <input ref={docRef}     type="file" accept=".pdf,.doc,.docx,.txt" style={{display:"none"}} onChange={e=>handleFileChange(e,"doc")}/>

      {/* Attachment menu */}
      {showAttach && (
        <div style={{position:"absolute",bottom:96,left:16,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(0,0,0,0.08)",borderRadius:20,padding:"14px",display:"flex",flexDirection:"column",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,0.14)",animation:"bounceIn .28s cubic-bezier(0.34,1.56,0.64,1)",zIndex:10,width:200}}>
          <div style={{position:"absolute",bottom:-7,left:20,width:14,height:14,background:"rgba(255,255,255,0.92)",border:"1px solid rgba(0,0,0,0.08)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",borderRadius:"0 0 3px 0"}}/>
          {[{icon:"📸",label:"Kamera",color:"#007AFF"},{icon:"🖼️",label:"Fotoğraf & Video",color:"#34C78A"},{icon:"📍",label:"Güvenli Nokta Öner",color:"#FF9500"},{icon:"📄",label:"Belge",color:"#8E8E93"}].map(act=>(
            <button key={act.label} onClick={()=>handleAttachment(act.label)} style={{display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer",padding:"4px 0",fontFamily:"'Nunito',sans-serif",textAlign:"left",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <div style={{width:32,height:32,borderRadius:10,background:act.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{act.icon}</div>
              <span style={{fontSize:15,fontWeight:700,color:"#1C1C1E"}}>{act.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Emoji tray */}
      {showEmojis && (
        <div style={{position:"absolute",bottom:96,right:68,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"1px solid rgba(0,0,0,0.08)",borderRadius:20,padding:"10px 14px",display:"flex",gap:6,boxShadow:"0 8px 32px rgba(0,0,0,0.14)",animation:"bounceIn .28s cubic-bezier(0.34,1.56,0.64,1)",zIndex:10}}>
          <div style={{position:"absolute",bottom:-7,right:20,width:14,height:14,background:"rgba(255,255,255,0.92)",border:"1px solid rgba(0,0,0,0.08)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",borderRadius:"0 0 3px 0"}}/>
          {QUICK_EMOJIS.map((emoji,i)=>(
            <button key={emoji} onClick={()=>{setInput(prev=>prev+emoji);setShowEmojis(false);if(inputRef.current)inputRef.current.focus();}} style={{background:"none",border:"none",cursor:"pointer",fontSize:26,lineHeight:1,padding:"4px 6px",borderRadius:12,transition:"transform .15s, background .15s",animation:`bubbleIn .25s ${i*0.04}s both cubic-bezier(0.34,1.56,0.64,1)`}}
              onMouseEnter={e=>{e.currentTarget.style.background="#F2F2F7";e.currentTarget.style.transform="scale(1.25)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.transform="scale(1)";}}>
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(0,0,0,0.06)",padding:"12px 16px 32px",flexShrink:0,display:"flex",alignItems:"center",gap:10,position:"relative"}}>
        <button onClick={()=>{setShowAttach(v=>!v);setShowEmojis(false);}} style={{background:showAttach?"#34C78A18":"#F2F2F7",border:showAttach?"1.5px solid #34C78A44":"1.5px solid transparent",borderRadius:"50%",width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s cubic-bezier(0.34,1.56,0.64,1)",transform:showAttach?"scale(1.1)":"scale(1)",color:showAttach?"#34C78A":"#8E8E93"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </button>
        <div style={{flex:1,background:"#F2F2F7",borderRadius:22,padding:"6px 14px 6px 16px",display:"flex",alignItems:"center",border:"1.5px solid transparent",transition:"border-color .2s"}}>
          <input ref={inputRef} value={input} onChange={e=>{setInput(e.target.value);if(showEmojis||showAttach){setShowEmojis(false);setShowAttach(false);}}} onKeyDown={e=>{if(e.key==="Enter")sendMessage();}} placeholder="Mesaj yaz..." style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:14,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",fontWeight:500,padding:"6px 0"}}/>
          <button onClick={()=>{setShowEmojis(v=>!v);setShowAttach(false);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,marginLeft:6,opacity:showEmojis?1:0.6,transition:"opacity .2s",transform:showEmojis?"scale(1.1)":"scale(1)"}}>😊</button>
        </div>
        <button onClick={sendMessage} style={{width:42,height:42,borderRadius:"50%",border:"none",cursor:"pointer",background:input.trim()?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:input.trim()?"0 4px 16px #34C78A55":"none",transition:"all .25s cubic-bezier(0.34,1.56,0.64,1)",transform:input.trim()?"scale(1.05)":"scale(1)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={input.trim()?"white":"#C7C7CC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dispute Panel */}
      {showDispute && (<>
        <div onClick={()=>setShowDispute(false)} style={{position:"fixed",inset:0,zIndex:11000,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",animation:"fadeIn .25s ease"}}/>
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:384,zIndex:11001,background:"#FFF8F8",borderRadius:"28px 28px 0 0",animation:"slideUp .4s cubic-bezier(0.32,0.72,0,1)",paddingBottom:36,maxHeight:"88vh",overflowY:"auto"}}>
          <div style={{width:36,height:4,background:"#FFCDD2",borderRadius:99,margin:"14px auto 0"}}/>
          <div style={{padding:"16px 20px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:22,fontWeight:900,color:"#1C1C1E",letterSpacing:"-0.5px"}}>İtiraz Paneli<span style={{color:"#FF3B30"}}>.</span></div>
                <div style={{fontSize:12,color:"#8E8E93",marginTop:1}}>Hakem heyeti sorununuzu çözecek</div>
              </div>
              <button onClick={()=>setShowDispute(false)} style={{background:"#FFE5E5",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            {!disputeSent ? (<>
              <div style={{background:"linear-gradient(135deg,#FF3B3018,#FF6B6B18)",border:"1.5px solid #FF3B3033",borderRadius:16,padding:"12px 14px",marginBottom:18,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:22,flexShrink:0}}>🚨</div>
                <div><div style={{fontSize:13,fontWeight:800,color:"#FF3B30",marginBottom:3}}>Provizyon Blokede</div><div style={{fontSize:12,color:"#6D6D72",lineHeight:1.5,fontWeight:500}}>{provisionAmount.toLocaleString("tr-TR")} TL blokelidir.</div></div>
              </div>
              <input ref={fileRef} type="file" accept="video/*,image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files&&e.target.files[0];if(f)setDisputeFile(f.name);}}/>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>Kanıt Yükle <span style={{color:"#FF3B30",fontSize:10,fontWeight:700,textTransform:"none",letterSpacing:0}}>(kutu açılış videosu zorunlu)</span></div>
                <button onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:"100%",padding:"16px",background:disputeFile?"#34C78A08":"white",border:`2px dashed ${disputeFile?"#34C78A":"#FFCDD2"}`,borderRadius:16,cursor:"pointer",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all .2s"}}>
                  <span style={{fontSize:22}}>{disputeFile?"✅":"📹"}</span>
                  <div style={{textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:disputeFile?"#34C78A":"#1C1C1E"}}>{disputeFile||"Video veya Fotoğraf Seç"}</div><div style={{fontSize:11,color:"#8E8E93",marginTop:1}}>{disputeFile?"Değiştirmek için tekrar tıkla":"MP4, MOV, JPG — Maks. 50MB"}</div></div>
                </button>
              </div>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>Sorunu Açıkla</div>
                <textarea value={disputeText} onChange={e=>setDisputeText(e.target.value)} placeholder="Ürün hasarlı geldi, eksik parça var..." style={{width:"100%",minHeight:110,padding:"12px 14px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:16,fontSize:13,fontFamily:"'Nunito',sans-serif",color:"#1C1C1E",lineHeight:1.6,outline:"none",resize:"none",fontWeight:500,boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#FF3B3066"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
              </div>
              <button onClick={()=>{if(disputeFile&&disputeText.trim())setDisputeSent(true);}} disabled={!disputeFile||!disputeText.trim()} style={{width:"100%",padding:"19px",border:"none",borderRadius:18,background:disputeFile&&disputeText.trim()?"linear-gradient(135deg,#FF3B30,#FF6B6B)":"#E5E5EA",color:disputeFile&&disputeText.trim()?"white":"#C7C7CC",fontSize:16,fontWeight:900,cursor:disputeFile&&disputeText.trim()?"pointer":"default",fontFamily:"'Nunito',sans-serif",letterSpacing:"-0.2px",boxShadow:disputeFile&&disputeText.trim()?"0 8px 28px #FF3B3055":"none",transition:"all .3s cubic-bezier(0.34,1.56,0.64,1)"}}>⚖️ Hakem Heyetine Gönder</button>
            </>) : (
              <div style={{textAlign:"center",padding:"24px 0 8px",animation:"bounceIn .5s ease"}}>
                <div style={{fontSize:52,marginBottom:12}}>⚖️</div>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:"#1C1C1E",marginBottom:6}}>İtiraz Alındı</div>
                <div style={{fontSize:13,color:"#6D6D72",lineHeight:1.6,marginBottom:24}}>Hakem heyeti 48 saat içinde karar verecek. Provizyon ({provisionAmount.toLocaleString("tr-TR")} TL) süreç boyunca blokede kalacak.</div>
                <div style={{background:"#FFF3CD",border:"1px solid #FFD60A44",borderRadius:14,padding:"10px 14px",fontSize:12,color:"#856404",fontWeight:600}}>📩 Karar e-posta ve bildirim ile iletilecektir.</div>
                <button onClick={()=>setShowDispute(false)} style={{marginTop:20,width:"100%",padding:14,background:"#F2F2F7",border:"none",borderRadius:14,fontSize:14,fontWeight:700,color:"#6D6D72",cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Kapat</button>
              </div>
            )}
          </div>
        </div>
      </>)}

      {/* ══ GÜVENLİ NOKTA SEÇİCİ ══ */}
      {showSafeSpots && (<>
        <div onClick={()=>setShowSafeSpots(false)} style={{position:"fixed",inset:0,zIndex:11000,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",animation:"fadeIn .25s ease"}}/>
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:384,zIndex:11001,background:"#F2F2F7",borderRadius:"28px 28px 0 0",animation:"slideUp .4s cubic-bezier(0.32,0.72,0,1)",paddingBottom:36,maxHeight:"85vh",overflowY:"auto"}}>
          <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"14px auto 0"}}/>
          <div style={{padding:"16px 20px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:22,fontWeight:900,color:"#1C1C1E",letterSpacing:"-0.5px"}}>{"Güvenli Nokta Seç"}<span style={{color:"#34C78A"}}>.</span></div>
                <div style={{fontSize:12,color:"#8E8E93",marginTop:1}}>{"Kalabalık ve kameralı buluşma noktaları"}</div>
              </div>
              <button onClick={()=>setShowSafeSpots(false)} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[
                {name:"Kadıköy Boğa Heykeli",  desc:"Kadıköy Meydan",               icon:"🐂"},
                {name:"Beşiktaş Meydan",        desc:"Barbaros Anıtı Önü",            icon:"🦅"},
                {name:"Şişli Cevahir AVM",      desc:"Ana Giriş Kapısı",              icon:"🛍️"},
                {name:"Üsküdar Marmaray",        desc:"Meydan Çıkışı",                icon:"🚆"},
                {name:"Taksim Metro",            desc:"Gezi Parkı Alt Geçidi",         icon:"🚇"},
                {name:"Bostancı İskelesi",       desc:"İDO Yolcu Bekleme Salonu",     icon:"⛴️"},
                {name:"Bakırköy Meydan",         desc:"Özgürlük Meydanı Atlıkarınca", icon:"⛲"},
                {name:"Zincirlikuyu Metrobüs",   desc:"Zorlu Center Bağlantısı",      icon:"🚌"},
              ].map((spot,i)=>(
                <button key={i} onClick={()=>{
                  setShowSafeSpots(false);
                  const t = new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
                  if (safeSpotMode === "trade") {
                    setMeetupSpot(spot);
                    setDeliveryState("meetup_confirm");
                    setMessages(prev=>[...prev,{id:Date.now(),from:"me",text:`📍 Takas için ${spot.name} noktasını seçtim. Saat kaçta buluşalım?`,time:t,anim:true}]);
                  } else {
                    setMessages(prev=>[...prev,{id:Date.now(),from:"me",text:`📍 Güvenli Nokta Önerisi: ${spot.name} (${spot.desc}). Sana uyar mı?`,time:t,anim:true}]);
                  }
                }} style={{background:"white",border:"none",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",transition:"transform .2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                  <div style={{width:40,height:40,borderRadius:12,background:"#34C78A18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{spot.icon}</div>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:15,fontWeight:800,color:"#1C1C1E"}}>{spot.name}</div>
                    <div style={{fontSize:12,color:"#8E8E93",marginTop:2,fontWeight:600}}>{spot.desc}</div>
                  </div>
                  <div style={{marginLeft:"auto",color:"#C7C7CC"}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ADD PRODUCT SHEET
══════════════════════════════════════════════════════════════ */
function EmptyGarageWarning({ onAction, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:12000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn .3s ease"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)"}}/>
      <div style={{position:"relative",width:"100%",maxWidth:340,background:"white",borderRadius:32,padding:32,textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",animation:"bounceIn .5s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <div style={{fontSize:64,marginBottom:20}}>🚗</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:24,fontWeight:900,color:"#1C1C1E",marginBottom:12,lineHeight:1.2}}>Garajın Henüz Boş!</div>
        <p style={{fontSize:15,color:"#6D6D72",lineHeight:1.6,marginBottom:32,fontWeight:500}}>
          Takas yapabilmek için senin de masaya bir değer koyman gerekiyor. Hadi, garajına ilk ürününü ekle ve takasın kapılarını aç!
        </p>
        <button onClick={onAction} style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",borderRadius:20,color:"white",fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 24px rgba(52,199,138,0.4)"}}>
          Ürün Eklemeye Git 🚀
        </button>
      </div>
    </div>
  );
}

function AddProductSheet({onClose, setUserPoints}) {
  const [condition, setCondition] = useState("ciziksiz");
  const [tlValue,   setTlValue]   = useState("");
  const [age,       setAge]       = useState("");
  const [photo,     setPhoto]     = useState(null);
  const [phase,     setPhase]     = useState("idle");
  const [points,    setPoints]    = useState(0);

  const [showGallery, setShowGallery] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress,    setProgress]    = useState(0);

  const handleSelectImage = (seed) => {
    setShowGallery(false);
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPhoto(seed);
          setIsUploading(false);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  const calculatePoints = () => {
    const fiyat = parseFloat(tlValue) || 0;
    const yil   = parseFloat(age)     || 0;
    let katsayi = 1.0;
    if (condition === "sifir")   katsayi = 1.2;
    if (condition === "yorgun")  katsayi = 0.6;
    const yasKaybi   = Math.max(0.1, 1 - (yil * 0.1));
    const hesaplanan = Math.round((fiyat * 0.15) * katsayi * yasKaybi);
    const finalPuan  = Math.max(50, hesaplanan);
    setPoints(finalPuan);
    if (setUserPoints) setUserPoints(prev => prev + finalPuan);
    setPhase("success");
    setTimeout(() => { onClose(); }, 2500);
  };

  const canPublish = tlValue !== "" && age !== "";

  if (phase === "success") {
    return (
      <div style={{position:"fixed",inset:0,zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",background:"#F8F8FA",animation:"scaleIn .4s ease"}}>
        <Confetti count={40}/>
        <div style={{textAlign:"center",padding:20}}>
          <div style={{fontSize:64,marginBottom:16}}>🚀</div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:26,fontWeight:900,color:"#1C1C1E",marginBottom:8}}>Tebrikler Arif!</div>
          <div style={{fontSize:15,color:"#8E8E93",marginBottom:28}}>İlanın artık yayında.</div>
          <div style={{
            background:"linear-gradient(135deg,#34C78A,#2DD4BF)",
            borderRadius:24,padding:"22px 48px",
            boxShadow:"0 10px 30px rgba(52,199,138,0.4)",
            display:"inline-block",
          }}>
            <div style={{color:"white",fontSize:13,fontWeight:700,opacity:0.8,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4}}>Kazanılan Puan</div>
            <div style={{color:"white",fontSize:48,fontWeight:900,letterSpacing:"-2px"}}>+{points} P</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)"}}/>

      <div style={{position:"relative",zIndex:10000,width:"100%",maxWidth:384,background:"#F8F8FA",borderRadius:"28px 28px 0 0",padding:"24px 20px 40px",animation:"slideUp .4s cubic-bezier(0.32,0.72,0,1)",maxHeight:"90vh",overflowY:"auto"}}>

        <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"0 auto 20px"}}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:22,fontWeight:900,color:"#1C1C1E"}}>Ürün Ekle<span style={{color:"#34C78A"}}>.</span></div>
            <div style={{fontSize:13,color:"#8E8E93",marginTop:2}}>Doğru bilgiler daha hızlı takas sağlar.</div>
          </div>
          <button onClick={onClose} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* ── Fotoğraf alanı ── */}
        <div onClick={() => !isUploading && !photo && setShowGallery(true)}
          style={{width:"100%",height:200,background:photo?"transparent":"white",borderRadius:20,
            border:photo?"none":"2px dashed #34C78A44",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:10,cursor:photo?"default":"pointer",
            overflow:"hidden",position:"relative",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",marginBottom:20}}>
          {photo ? (
            <>
              <img src={photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="urun"/>
              <button onClick={e=>{e.stopPropagation();setPhoto(null);}}
                style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",border:"none",borderRadius:99,padding:"5px 12px",color:"white",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
                Değiştir
              </button>
            </>
          ) : isUploading ? (
            <div style={{width:"80%",textAlign:"center"}}>
              <div style={{height:8,width:"100%",background:"#E5E5EA",borderRadius:10,overflow:"hidden",marginBottom:12}}>
                <div style={{height:"100%",width:progress+"%",background:"linear-gradient(90deg,#34C78A,#2DD4BF)",transition:"width 0.3s ease"}}/>
              </div>
              <div style={{color:"#34C78A",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif"}}>Yükleniyor... %{progress}</div>
            </div>
          ) : (
            <>
              <div style={{width:64,height:64,background:"#34C78A12",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>📸</div>
              <div style={{textAlign:"center",fontFamily:"'Nunito',sans-serif"}}>
                <div style={{color:"#1C1C1E",fontWeight:800,fontSize:15}}>Fotoğraf Ekle</div>
                <div style={{color:"#8E8E93",fontSize:12,marginTop:3}}>Galeriden seçmek için dokun</div>
              </div>
            </>
          )}
        </div>

        {/* ── Güncel Piyasa Fiyatı ── */}
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:8}}>Güncel Piyasa Fiyatı (TL)</label>
          <div style={{display:"flex",alignItems:"center",background:"white",borderRadius:16,border:"1.5px solid #E5E5EA",padding:"0 18px",gap:8}}>
            <span style={{fontSize:22,fontWeight:300,color:"#C7C7CC"}}>₺</span>
            <input type="number" value={tlValue} onChange={e=>setTlValue(e.target.value)}
              placeholder="Örn: 5000"
              style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:20,fontWeight:800,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",padding:"16px 0"}}/>
          </div>
        </div>

        {/* ── Ürün Yaşı ── */}
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:8}}>Ürün Kaç Yıllık?</label>
          <div style={{display:"flex",alignItems:"center",background:"white",borderRadius:16,border:"1.5px solid #E5E5EA",padding:"0 18px",gap:8}}>
            <span style={{fontSize:20}}>🗓</span>
            <input type="number" value={age} onChange={e=>setAge(e.target.value)}
              placeholder="Örn: 2"
              style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:20,fontWeight:800,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif",padding:"16px 0"}}/>
            <span style={{fontSize:13,color:"#C7C7CC",fontWeight:600}}>yıl</span>
          </div>
        </div>

        {/* ── Hasar Durumu ── */}
        <div style={{marginBottom:24}}>
          <label style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:8}}>Hasar Durumu</label>
          <div style={{display:"flex",background:"#E5E5EA",borderRadius:14,padding:3,gap:2}}>
            {[{key:"sifir",label:"✨ Sıfır"},{key:"ciziksiz",label:"👍 Temiz"},{key:"yorgun",label:"🛠 Yıpranmış"}].map(c => {
              const active = condition === c.key;
              return (
                <button key={c.key} onClick={()=>setCondition(c.key)} style={{
                  flex:1,padding:"10px 6px",borderRadius:11,border:"none",cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:active?800:600,
                  color:active?"white":"#6D6D72",
                  background:active?"linear-gradient(135deg,#34C78A,#2DD4BF)":"transparent",
                  boxShadow:active?"0 4px 14px #34C78A55":"none",
                  transition:"all .22s",
                }}>{c.label}</button>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <button onClick={calculatePoints} disabled={!canPublish}
          style={{
            width:"100%",padding:"18px",borderRadius:18,border:"none",
            background:canPublish?"linear-gradient(135deg,#34C78A,#2DD4BF)":"#E5E5EA",
            color:canPublish?"white":"#C7C7CC",fontSize:16,fontWeight:900,
            cursor:canPublish?"pointer":"default",fontFamily:"'Nunito',sans-serif",
            boxShadow:canPublish?"0 8px 24px rgba(52,199,138,0.3)":"none",
            transition:"all .25s",
          }}>
          İlanı Yayınla 🚀
        </button>
      </div>

      {/* ── Galeri Modalı ── */}
      {showGallery && (
        <div style={{position:"fixed",inset:0,zIndex:11000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div onClick={()=>setShowGallery(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(5px)"}}/>
          <div style={{position:"relative",zIndex:11001,width:"100%",maxWidth:384,background:"white",borderRadius:"28px 28px 0 0",padding:24,animation:"slideUp .3s cubic-bezier(0.32,0.72,0,1)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <div style={{fontSize:20,fontWeight:900,color:"#1C1C1E",fontFamily:"'Nunito',sans-serif"}}>Film Rulosu</div>
                <div style={{fontSize:13,color:"#8E8E93"}}>Örnek bir ürün fotoğrafı seç</div>
              </div>
              <button onClick={()=>setShowGallery(false)} style={{background:"#F2F2F7",border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              {[
                {kw:"sneakers",url:"https://picsum.photos/seed/item/400/400"},
                {kw:"watch",   url:"https://picsum.photos/seed/item/400/400"},
                {kw:"phone",   url:"https://picsum.photos/seed/item/400/400"},
                {kw:"backpack",url:"https://picsum.photos/seed/item/400/400"},
                {kw:"glasses", url:"https://picsum.photos/seed/item/400/400"},
                {kw:"guitar",  url:"https://picsum.photos/seed/item/400/400"},
              ].map(item => (
                <div key={item.kw} onClick={()=>handleSelectImage(item.url)}
                  style={{aspectRatio:"1/1",borderRadius:16,overflow:"hidden",cursor:"pointer",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.08)",border:"2px solid transparent",transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#34C78A"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}>
                  <img src={item.url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt={item.kw}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   EDIT PRODUCT SHEET (Ürün Düzenleme - Puan Kilitli + Açıklamalı)
══════════════════════════════════════════════════════════════ */
function EditProductSheet({ item, onClose }) {
  const [name,     setName]     = useState(item.name || "");
  const [desc,     setDesc]     = useState(item.desc || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(()=>{
      item.name = name;
      item.desc = desc;
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    alert("Ürün başarıyla silindi (Demo simülasyonu)");
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",animation:"fadeIn .2s ease"}}/>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:384,zIndex:301,background:"#F2F2F7",borderRadius:"28px 28px 0 0",animation:"slideUp .35s cubic-bezier(0.32,0.72,0,1)",paddingBottom:32,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:"#D1D1D6",borderRadius:99,margin:"12px auto 20px"}}/>
        <div style={{padding:"0 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:"#1C1C1E"}}>Ürünü Düzenle<span style={{color:"#34C78A"}}>.</span></div>
            <button onClick={onClose} style={{background:"#E5E5EA",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:16,background:"white",padding:16,borderRadius:20,marginBottom:20,border:"1.5px solid #E5E5EA"}}>
            <div style={{width:64,height:64,borderRadius:16,background:item.bg||"#F2F2F7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>{item.emoji||"📦"}</div>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase"}}>Mevcut Ürün</div>
              <div style={{fontSize:16,fontWeight:800,color:"#1C1C1E"}}>{item.name}</div>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* Ürün Adı */}
            <div>
              <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>Ürün Adı</div>
              <input value={name} onChange={e=>setName(e.target.value)} style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",color:"#1C1C1E",fontWeight:600,outline:"none",boxSizing:"border-box",transition:"all .2s"}} onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
            </div>

            {/* Ürün Açıklaması (YENİ) */}
            <div>
              <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>Ürün Açıklaması</div>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Ürününle ilgili ekstra detayları yazabilirsin (Örn: Garantisi devam ediyor, kutusu mevcut...)" style={{width:"100%",padding:"14px 16px",background:"white",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:14,fontFamily:"'Nunito',sans-serif",color:"#1C1C1E",fontWeight:600,outline:"none",boxSizing:"border-box",transition:"all .2s",minHeight:80,resize:"none"}} onFocus={e=>e.target.style.borderColor="#34C78A"} onBlur={e=>e.target.style.borderColor="#E5E5EA"}/>
            </div>

            {/* Puan (Kilitli) */}
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
                <div style={{fontSize:12,fontWeight:800,color:"#8E8E93",textTransform:"uppercase",letterSpacing:"0.5px"}}>Değeri (Puan)</div>
                <div style={{fontSize:10,fontWeight:800,color:"#FF9500"}}>🔒 Sistem Onaylı</div>
              </div>
              <div style={{position:"relative"}}>
                <input value={item.points} disabled style={{width:"100%",padding:"14px 16px",background:"#F2F2F7",border:"1.5px solid #E5E5EA",borderRadius:14,fontSize:15,fontFamily:"'Nunito',sans-serif",color:"#8E8E93",fontWeight:900,outline:"none",boxSizing:"border-box",cursor:"not-allowed"}}/>
                <div style={{position:"absolute",right:16,top:14,color:"#C7C7CC",fontWeight:700}}>P</div>
              </div>
              <div style={{fontSize:11,color:"#8E8E93",marginTop:6,lineHeight:1.4}}>Bu ürünün değeri TakasApp AI tarafından belirlenmiştir ve manuel olarak değiştirilemez.</div>
            </div>

            {/* Butonlar */}
            <div style={{display:"flex",gap:10,marginTop:10}}>
              <button onClick={handleDelete} style={{flex:0.8,padding:"18px",background:"#FF3B3018",color:"#FF3B30",border:"none",borderRadius:16,fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#FF3B3025"} onMouseLeave={e=>e.currentTarget.style.background="#FF3B3018"}>
                🗑️ Sil
              </button>
              <button onClick={handleSave} disabled={isSaving||!name.trim()} style={{flex:2,padding:"18px",background:(isSaving||!name.trim())?"#E5E5EA":"linear-gradient(135deg,#34C78A,#2DD4BF)",color:(isSaving||!name.trim())?"#8E8E93":"white",border:"none",borderRadius:16,fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:(isSaving||!name.trim())?"default":"pointer",boxShadow:(isSaving||!name.trim())?"none":"0 8px 24px #34C78A44",transition:"all .3s"}}>
                {isSaving ? "⏳ Kaydediliyor..." : "✓ Güncelle"}
              </button>
            </div>
          </div>
        </div>
      </div>

    {/* ── Sheet Modals ── */}
    {showNotifs && <NotificationsSheet onClose={()=>setShowNotifs(false)}/>}
    {showSavedCards && <SavedCardsSheet onClose={()=>setShowSavedCards(false)} currentUser={currentUser}/>}
    {showAddresses && <AddressesSheet onClose={()=>setShowAddresses(false)}/>}
    {showDisputes && <DisputesSheet onClose={()=>setShowDisputes(false)} currentUser={currentUser}/>}
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   ONBOARDING (NEEDS & AUTO-MATCH) SCREEN
═══════════════════════════════════════════════════════════ */
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const needs = [
    {id:1, name:"Polaroid Kamera", emoji:"📷", bg:"linear-gradient(135deg,#2C3E50,#4A6FA5)"},
    {id:2, name:"Elektro Gitar",   emoji:"🎸", bg:"linear-gradient(135deg,#8B4513,#D2691E)"},
    {id:3, name:"Oyun Konsolu",    emoji:"🎮", bg:"linear-gradient(135deg,#4B0082,#8A2BE2)"},
    {id:4, name:"Akıllı Saat",     emoji:"⌚", bg:"linear-gradient(135deg,#34495E,#7F8C8D)"},
  ];
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"#F2F2F7",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      {step === 1 && (
        <div style={{animation:"floatUp .6s ease-out",width:"100%",maxWidth:360}}>
          <div style={{fontSize:48,textAlign:"center",marginBottom:10}}>👋</div>
          <h1 style={{fontFamily:"'Nunito',sans-serif",fontSize:26,fontWeight:900,color:"#1C1C1E",textAlign:"center",marginBottom:8,lineHeight:1.2}}>Aramıza Hoş Geldin!</h1>
          <p style={{fontSize:15,color:"#6D6D72",textAlign:"center",marginBottom:32,fontWeight:500}}>Seni doğru kişilerle eşleştirebilmemiz için öncelikli olarak neye ihtiyacın olduğunu seç.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {needs.map(item=>(
              <button key={item.id} onClick={()=>{setSelected(item);setTimeout(()=>setStep(2),600);}} style={{background:"white",border:selected?.id===item.id?"2.5px solid #34C78A":"2px solid transparent",borderRadius:24,padding:"24px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:12,cursor:"pointer",boxShadow:"0 8px 24px rgba(0,0,0,0.05)",transition:"all .2s",transform:selected?.id===item.id?"scale(0.95)":"scale(1)"}}>
                <div style={{width:64,height:64,borderRadius:20,background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:"0 8px 16px rgba(0,0,0,0.15)"}}>{item.emoji}</div>
                <span style={{fontSize:15,fontWeight:800,color:"#1C1C1E",textAlign:"center"}}>{item.name}</span>
              </button>
            ))}
          </div>
          <button onClick={()=>onComplete(null,"skip")} style={{width:"100%",marginTop:32,padding:"16px",background:"transparent",border:"none",borderRadius:20,color:"#8E8E93",fontSize:15,fontWeight:800,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#E5E5EA";e.currentTarget.style.color="#1C1C1E";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#8E8E93";}}>
            Adımı Atla, Vitrini Keşfet →
          </button>
        </div>
      )}
      {step === 2 && (
        <div style={{animation:"bounceIn .6s cubic-bezier(0.34,1.56,0.64,1)",width:"100%",maxWidth:360,background:"white",borderRadius:32,padding:"36px 24px",boxShadow:"0 20px 60px rgba(0,0,0,0.08)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-50,left:"50%",transform:"translateX(-50%)",width:150,height:150,background:"radial-gradient(circle, rgba(52,199,138,0.15) 0%, rgba(255,255,255,0) 70%)",zIndex:0}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px",boxShadow:"0 8px 24px #34C78A44"}}>✨</div>
            <h2 style={{fontFamily:"'Nunito',sans-serif",fontSize:24,fontWeight:900,color:"#1C1C1E",marginBottom:12,letterSpacing:"-0.5px"}}>Sihirli Bir Eşleşme!</h2>
            <p style={{fontSize:14,color:"#6D6D72",lineHeight:1.6,marginBottom:24,fontWeight:500}}>
              Senin garajındaki <strong>"Mekanik Klavye"yi</strong> arayan birinde, tam da istediğin <strong>"{selected?.name}"</strong> var.
            </p>
            <div style={{background:"#F9F9FB",border:"1.5px solid #F2F2F7",borderRadius:24,padding:"20px 16px",marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"inset 0 2px 8px rgba(0,0,0,0.02)"}}>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:36,marginBottom:6,filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.1))"}}>⌨️</div>
                <div style={{fontSize:12,fontWeight:800,color:"#8E8E93"}}>Klavye<br/><span style={{color:"#1C1C1E"}}>500 P</span></div>
              </div>
              <div style={{color:"#FF3B30",fontWeight:900,fontSize:13,display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0,background:"#FF3B3011",borderRadius:12,padding:"8px 12px"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{fontSize:10,letterSpacing:"0.5px"}}>FARK: 450 P</span>
              </div>
              <div style={{textAlign:"center",flex:1}}>
                <div style={{fontSize:36,marginBottom:6,filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.1))"}}>{selected?.emoji}</div>
                <div style={{fontSize:12,fontWeight:800,color:"#8E8E93"}}>{selected?.name}<br/><span style={{color:"#1C1C1E"}}>950 P</span></div>
              </div>
            </div>
            <div style={{background:"#F0FDF8",border:"1px solid #34C78A33",borderRadius:16,padding:"14px 16px",marginBottom:28,fontSize:12,color:"#1C1C1E",fontWeight:600,lineHeight:1.5}}>
              <span style={{color:"#34C78A",fontWeight:800}}>Harika haber:</span> Sadece 450 puanlık ek bir ürünle bu takası hemen eşitleyebilirsin!
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <button onClick={()=>onComplete(selected,"accept")} style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",borderRadius:20,color:"white",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 24px #34C78A44",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                Garajını Tamamla ve Takasla 🚀
              </button>
              <button onClick={()=>onComplete(null,"skip")} style={{width:"100%",padding:"16px",background:"transparent",border:"none",borderRadius:20,color:"#8E8E93",fontSize:14,fontWeight:700,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#F2F2F7";e.currentTarget.style.color="#1C1C1E";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#8E8E93";}}>
                Belki Daha Sonra, Vitrini Keşfet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TakasApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding,   setShowOnboarding]   = useState(true);
  const [currentUser,    setCurrentUser]    = useState(null);
  const [userPoints,     setUserPoints]     = useState(0);
  const [myItems,        setMyItems]        = useState([]);
  const [userOffers,     setUserOffers]     = useState([]);
  const [userConvos,     setUserConvos]     = useState([]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    if (userData?.email === "sena.ylmz@gmail.com") {
      setMyItems(MY_ITEMS);
      setUserOffers(PENDING_OFFERS);
      setUserConvos(CONVERSATIONS);
      setUserPoints(730);
      setLikedItems({2:true, 5:true});
    } else {
      setMyItems([]);
      setUserOffers([]);
      setUserConvos([]);
      setUserPoints(0);
    }
  };

  const [activeTab,      setActiveTab]      = useState("home");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [likedItems,     setLikedItems]     = useState({});
  const [showAdd,        setShowAdd]        = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [detailProduct,  setDetailProduct]  = useState(null);
  const [activeChat,     setActiveChat]     = useState(null);
  const [activeTradeProduct, setActiveTradeProduct] = useState(null);
  const [initialTradeItems,  setInitialTradeItems]   = useState([]);
  const [walletBalance,      setWalletBalance]       = useState(0);
  const myPoints = userPoints; const targetPoints = Math.max(userPoints + 470, 1200);
  const balancePct = Math.min((myPoints/targetPoints)*100,100);
  const filtered = activeCategory==="Tümü" ? PRODUCTS : PRODUCTS.filter(p=>{ const map={"Giyim":"Giyim","Elektronik":"Elektronik","Ev":"Ev","Spor":"Spor","Hobi":"Hobi"}; return p.category===activeCategory; });

  if (!isAuthenticated) {
    return <AuthScreen onLogin={(userData) => handleLoginSuccess(userData)} />;
  }
  if (showOnboarding) {
    return <OnboardingScreen onComplete={(matchedItem, action) => {
      setShowOnboarding(false);
      if (action === "accept") {
        const preSelectedKlavye = myItems.find(i => i.name === "Mekanik Klavye") || myItems[1] || MY_ITEMS[1];
        setInitialTradeItems([preSelectedKlavye]);
        setActiveTradeProduct({
          id: Math.random(),
          name: matchedItem.name,
          emoji: matchedItem.emoji,
          bg: matchedItem.bg,
          points: 950,
          owner: "Cem B.",
          ownerAvatar: "https://i.pravatar.cc/80?img=11"
        });
      } else {
        setActiveTab("home");
      }
    }} />;
  }

  return (<>
    <style>{globalStyles}</style>
    <div style={{fontFamily:"'Nunito',-apple-system,sans-serif",minHeight:"100vh",background:"#F2F2F7",
      display:"flex",flexDirection:"column",maxWidth:384,margin:"0 auto"}}>

      {/* Status bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 24px 4px"}}>
        <span style={{fontSize:13,fontWeight:700,color:"#1C1C1E"}}>9:41</span>
        <div style={{width:16,height:10,border:"1.5px solid #1C1C1E",borderRadius:3,position:"relative"}}>
          <div style={{position:"absolute",left:2,top:1.5,bottom:1.5,width:"60%",background:"#34C78A",borderRadius:1}}/>
        </div>
      </div>

      {/* ══ TAB CONTENT ══ */}

      {/* HOME TAB */}
      {activeTab === "home" && (
        <>
          {/* 1. HEADER */}
          <div style={{padding:"6px 22px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
              <div>
                <div style={{fontSize:32,fontWeight:900,color:"#1C1C1E",letterSpacing:"-1px"}}>Takas<span style={{color:"#34C78A"}}>.</span></div>
                <div style={{fontSize:12,color:"#8E8E93"}}>Para değil, değer değiş tokuşu</div>
              </div>
              <div style={{background:"#34C78A18",border:"1.5px solid #34C78A44",borderRadius:16,padding:"8px 14px",textAlign:"right"}}>
                <div style={{color:"#34C78A",fontSize:11,fontWeight:700}}>Puanın</div>
                <div style={{color:"#1C1C1E",fontSize:20,fontWeight:900,letterSpacing:"-0.5px"}}>{userPoints.toLocaleString()}</div>
              </div>
            </div>

            {/* 2. DİNAMİK DENGE ÇUBUĞU */}
            <div style={{background:"white",borderRadius:24,padding:"16px 20px",marginTop:12,boxShadow:"0 8px 30px rgba(0,0,0,0.04)",border:"1px solid #F2F2F7",position:"relative",overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:12}}>
                <div>
                  <span style={{fontSize:12,fontWeight:800,color:"#3A3A3C",textTransform:"uppercase",letterSpacing:"0.5px"}}>Dinamik Denge</span>
                  <div style={{fontSize:14,fontWeight:700,color:"#34C78A",marginTop:2}}>
                    {userPoints >= 1200 ? "✅ Takas Hedefine Ulaşıldı!" : `Hedefe ${1200 - userPoints} Puan Kaldı`}
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <span style={{fontSize:11,color:"#8E8E93",fontWeight:600}}>{userPoints.toLocaleString()} / 1.200</span>
                </div>
              </div>
              <div style={{background:"#F2F2F7",borderRadius:99,height:12,position:"relative",overflow:"hidden",border:"1px solid #E5E5EA"}}>
                <div style={{
                  width:`${Math.min((userPoints/1200)*100,100)}%`,
                  background:"linear-gradient(90deg,#34C78A,#2DD4BF,#34C78A)",
                  backgroundSize:"200% auto",borderRadius:99,height:"100%",
                  transition:"width 1s cubic-bezier(0.34,1.56,0.64,1)",
                  animation:"shimmer 2s linear infinite",
                  boxShadow:"0 0 15px rgba(52,199,138,0.5)",
                }}/>
              </div>
            </div>
          </div>

          {/* 3. KATEGORİ İKONLARI */}
          <div style={{padding:"14px 0 6px"}}>
            <div style={{display:"flex",gap:12,overflowX:"auto",padding:"0 22px 10px",msOverflowStyle:"none",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.label;
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.label)} style={{
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                    minWidth:72,height:84,flexShrink:0,
                    background:isActive?"linear-gradient(135deg,#34C78A,#2DD4BF)":"white",
                    border:isActive?"none":"1.5px solid #E5E5EA",
                    borderRadius:20,cursor:"pointer",
                    transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    boxShadow:isActive?"0 8px 20px #34C78A44":"0 2px 8px rgba(0,0,0,0.04)",
                    transform:isActive?"scale(1.05)":"scale(1)",
                  }}>
                    <span style={{fontSize:26,marginBottom:6}}>{cat.icon}</span>
                    <span style={{fontSize:11,fontWeight:800,color:isActive?"white":"#8E8E93"}}>{cat.label}</span>
                  </button>
                );
              })}
              <div style={{minWidth:22,height:10,flexShrink:0}}/>
            </div>
          </div>

          {/* 4. ÜRÜN VİTRİNİ */}
          <div style={{padding:"6px 16px 110px",flex:1,overflowY:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {filtered.map(product => (
                <div key={product.id} onClick={()=>setDetailProduct(product)} style={{
                  background:"white",borderRadius:24,overflow:"hidden",border:"1.5px solid #F2F2F7",
                  display:"flex",flexDirection:"column",cursor:"pointer",
                  transition:"all 0.3s ease",boxShadow:"0 8px 24px rgba(0,0,0,0.06)",
                }}>
                  {/* 1. ASLA ÇÖKMEYEN RESİM KUTUSU */}
                  <div style={{position:"relative",width:"100%",height:0,paddingBottom:"100%",background:product.bg,flexShrink:0}}>
                    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:72,lineHeight:1,filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.2))"}}>{product.emoji}</span>
                    </div>
                    <div style={{position:"absolute",top:10,left:10,background:"rgba(255,255,255,0.85)",backdropFilter:"blur(8px)",borderRadius:10,padding:"4px 10px",fontSize:10,fontWeight:800,color:"#1C1C1E",zIndex:5}}>{product.category}</div>
                    {/* Kalp butonu */}
                    <button onClick={e=>{e.stopPropagation();setLikedItems(p=>({...p,[product.id]:!p[product.id]}));}}
                      style={{position:"absolute",top:8,right:8,background:"rgba(255,255,255,.88)",backdropFilter:"blur(8px)",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",border:"none",cursor:"pointer",zIndex:5}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={likedItems[product.id]?"#34C78A":"none"}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={likedItems[product.id]?"#34C78A":"#C7C7CC"} strokeWidth="1.8" strokeLinejoin="round"/></svg>
                    </button>
                    {/* Puan etiketi */}
                    <div style={{position:"absolute",bottom:10,right:10,background:"linear-gradient(135deg,#34C78A,#2DD4BF)",borderRadius:14,padding:"6px 12px",border:"2px solid white",display:"flex",alignItems:"center",gap:3,zIndex:5,boxShadow:"0 4px 12px rgba(52,199,138,0.4)"}}>
                      <span style={{color:"white",fontSize:14,fontWeight:900}}>{product.points.toLocaleString("tr-TR")}</span>
                      <span style={{color:"white",fontSize:9,fontWeight:800}}>P</span>
                    </div>
                  </div>
                  {/* 2. YAZI ALANI */}
                  <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",flexGrow:1}}>
                    <div style={{color:"#1C1C1E",fontSize:13,fontWeight:800,marginBottom:8,
                      display:"-webkit-box",WebkitLineClamp:"2",WebkitBoxOrient:"vertical",
                      overflow:"hidden",lineHeight:"1.3",minHeight:"34px"}}>
                      {product.name}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:"auto"}}>
                      <img src={product.ownerAvatar} style={{width:18,height:18,borderRadius:"50%",border:"1px solid #E5E5EA"}} alt=""/>
                      <span style={{color:"#8E8E93",fontSize:11,fontWeight:700}}>{product.owner}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* MESSAGES TAB */}
      {activeTab==="messages" && <MessagesScreen onOpenChat={(chatData)=>setActiveChat(chatData)} onOpenProduct={(prod)=>{setDetailProduct(prod);}} initialOffers={userOffers} initialConvos={userConvos}/>}

      {/* PROFILE TAB */}
      {activeTab==="profile" && <ProfileScreen likedItems={likedItems} userPoints={userPoints} walletBalance={walletBalance} currentUser={currentUser} myGarage={myItems} onLogout={()=>setIsAuthenticated(false)} onProductClick={(item)=>setDetailProduct(item)} onUpdateUser={(newData)=>setCurrentUser(prev=>({...prev,...newData}))}/>}

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:384,background:"rgba(255,255,255,.92)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(0,0,0,.06)",paddingBottom:20,paddingTop:10,zIndex:30}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"0 16px"}}>
          <button onClick={()=>setActiveTab("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <HomeIcon active={activeTab==="home"}/><span style={{fontSize:10,color:activeTab==="home"?"#34C78A":"#8E8E93",fontWeight:activeTab==="home"?800:500}}>Keşfet</span>
          </button>
          <button onClick={()=>setShowAdd(true)} style={{background:"linear-gradient(135deg,#34C78A,#2DD4BF)",border:"none",cursor:"pointer",width:58,height:58,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px #34C78A55",transform:"translateY(-8px)"}}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 6v16M6 14h16" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></svg>
          </button>
          <button onClick={()=>setActiveTab("messages")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <div style={{position:"relative"}}><ChatIconNav active={activeTab==="messages"}/><div style={{position:"absolute",top:-3,right:-5,background:"#FF3B30",width:8,height:8,borderRadius:"50%",border:"1.5px solid white"}}/></div>
            <span style={{fontSize:10,color:activeTab==="messages"?"#34C78A":"#8E8E93",fontWeight:activeTab==="messages"?800:500}}>Mesajlar</span>
          </button>
          <button onClick={()=>setActiveTab("profile")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <ProfileIcon active={activeTab==="profile"}/><span style={{fontSize:10,color:activeTab==="profile"?"#34C78A":"#8E8E93",fontWeight:activeTab==="profile"?800:500}}>Profil</span>
          </button>
        </div>
      </div>

    </div>
    {showAdd && <AddProductSheet onClose={()=>{ setShowAdd(false); setActiveTab("home"); }} setUserPoints={setUserPoints}/>}
    {showEmptyWarning && <EmptyGarageWarning onClose={()=>setShowEmptyWarning(false)} onAction={()=>{ setShowEmptyWarning(false); setDetailProduct(null); setShowAdd(true); }}/>}
    {detailProduct && <ProductDetail product={detailProduct} onBack={()=>setDetailProduct(null)} onOpenChat={(prod)=>{
      if (myItems.length === 0) {
        setShowEmptyWarning(true);
      } else {
        setActiveTradeProduct(prod);
        setDetailProduct(null);
      }
    }}/>}
    {activeChat && <ChatDetailScreen chat={activeChat} onBack={()=>setActiveChat(null)} setWalletBalance={setWalletBalance}/>}
    {activeTradeProduct && (
      <TradeDesk
        targetProduct={activeTradeProduct}
        initialSelected={initialTradeItems}
        onClose={()=>setActiveTradeProduct(null)}
        onMatch={(items, actionType, excessPoints)=>{
          setActiveTradeProduct(null);
          if (actionType === "wallet") {
            setWalletBalance(prev => prev + excessPoints);
          }
          setActiveChat({
            owner: activeTradeProduct.owner,
            ownerAvatar: activeTradeProduct.ownerAvatar,
            name: activeTradeProduct.name,
            emoji: activeTradeProduct.emoji,
            bg: activeTradeProduct.bg,
            points: activeTradeProduct.points,
            selectedItems: items,
            actionType: actionType,
            excessPoints: excessPoints
          });
          setActiveTab("messages");
        }}
      />
    )}
  </>);
}
