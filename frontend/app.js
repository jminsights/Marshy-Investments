// ============================================================
// app.js — Marshy Investments frontend (React via Babel CDN)
// API calls go to the Express backend at /api/*
// ============================================================

const { useState, useRef, useEffect, useCallback, useMemo, memo } = React;

// ===== CONSTANTS =====
const WHATSAPP = "https://wa.me/263771687216";
const PHONE    = "0771687216";
const ADDRESS  = "Shop No 62, Chinhoyi Street\n(Cnr Chinhoyi & Abercorn St)\nOpposite Usman Fabric, Harare";
const QUICK_QUESTIONS = [
  "Best bike for commuting?",
  "Kids bike for a 7 year old?",
  "What's your cheapest bike?",
  "Where is your shop?",
];

// ===== DATA =====
const BIKES = [
  { id:1,  cat:"Kids",    name:"Tricycle",                 desc:"Perfect for toddlers. Sturdy frame, storage basket.",                  price:"$25",     tag:"Toddler",    img:"images/kids-bike-1.jpg" },
  { id:2,  cat:"Kids",    name:'12" Kids Bicycle',         desc:"Age group 2–5 yrs. Training wheels included.",                        price:"$45–$50", tag:"Starter",    img:"images/kids-bike-2.jpg" },
  { id:3,  cat:"Kids",    name:'16" Kids Bicycle',         desc:"Age group 4–8 yrs. Multiple colours. Basket & rear carrier.",          price:"$50–$65", tag:"Popular",    img:"images/kids-bike-3.jpg" },
  { id:4,  cat:"Kids",    name:'20" Kids Bicycle',         desc:"Age group 6–11 yrs. Basket, carrier, training wheels available.",      price:"$60–$85", tag:"Best Seller",img:"images/kids-bike-4.jpg" },
  { id:5,  cat:"Kids",    name:'20" TJX Balloon Tyre',     desc:"Age group 6–13 yrs. Disc brakes, fat balloon tyres.",                 price:"$90",     tag:"Cool",       img:"images/kids-bike-5.jpg" },
  { id:6,  cat:"Kids",    name:'20" BMX Bike',             desc:"Age group 6–adults. Built for fun, tricks & street riding.",          price:"$90",     tag:"Fun",        img:"images/kids-bike-6.jpg" },
  { id:7,  cat:"Adult",   name:'26" MTB (Entry)',          desc:"Solid mountain bike. Great value for Harare commuters.",              price:"$80",     tag:"Value",      img:"images/adult-bike-7.jpg" },
  { id:8,  cat:"Adult",   name:'26" MTB with Carrier',     desc:"Strong rear carrier. Shimano gears. Perfect for daily use.",          price:"$85–$90", tag:"Commuter",   img:"images/adult-bike-8.jpg" },
  { id:9,  cat:"Adult",   name:'26" MTB Shimano $100',     desc:"Full Shimano drivetrain. Disc brakes. Sport geometry.",               price:"$100",    tag:"Shimano",    img:"images/adult-bike-9.jpg" },
  { id:10, cat:"Adult",   name:'26" MTB Shimano $130',     desc:"Premium Shimano MTB. Full suspension fork. Top spec.",                price:"$130",    tag:"Premium",    img:"images/adult-bike-10.jpg" },
  { id:11, cat:"Adult",   name:"Buffalo Type (Macce)",     desc:"Classic upright city bike. Tough, reliable, timeless.",              price:"$120",    tag:"City",       img:"images/adult-bike-11.jpg" },
  { id:12, cat:"Folding", name:'26" Folding Shimano',      desc:"Folds compact. Shimano gears. Easy to store & transport.",           price:"$120",    tag:"Foldable",   img:"images/folding-bike-12.jpg" },
  { id:13, cat:"Folding", name:'26" Folding Double Shock', desc:"Full suspension folding bike. Double shock absorbers. Smooth ride.", price:"$130",    tag:"Suspension", img:"images/folding-bike-13.jpg" },
  { id:14, cat:"Folding", name:'26" Folding Meg Wheel',    desc:"Premium mag wheels. Full suspension. Top of the range.",             price:"$160",    tag:"Top Range",  img:"images/folding-bike-14.jpg" },
];

const SPARES = [
  { name:"Tyres (various sizes)",              price:"$3–$15",   cat:"Tyres & Tubes", img:"images/tyres.jpg" },
  { name:"Mountain Metro Tyre",                price:"$5",       cat:"Tyres & Tubes", img:"images/metro-tyre.jpg" },
  { name:"Bedrock Mountain Tyre",              price:"$8",       cat:"Tyres & Tubes", img:"images/bedrock.jpg" },
  { name:"Inner Tubes",                        price:"$2–$3",    cat:"Tyres & Tubes", img:"images/tubes.jpg" },
  { name:"Small Bicycle Pump",                 price:"$2",       cat:"Pumps", img:"images/small-pump.jpg" },
  { name:"Floor Pump (standard)",              price:"$3",       cat:"Pumps", img:"images/standard-pump.jpg" },
  { name:"Big Floor Pump",                     price:"$5",       cat:"Pumps", img:"images/big-pump.jpg" },
  { name:"Pump with Pressure Gauge",           price:"$5",       cat:"Pumps", img:"images/pump-gauge.jpg" },
  { name:"Speaker Bike Light (USB charging)",  price:"$7",       cat:"Lights & Accessories", img:"images/bike-light.jpg" },
  { name:"Bicycle Phone Holder",               price:"$10",      cat:"Lights & Accessories", img:"images/phoneholder.jpg" },
  { name:"Cable Lock",                         price:"$2",       cat:"Lights & Accessories", img:"images/cable-lock.jpg" },
  { name:"Bike Foot Rest Pegs (pair)",         price:"$5",       cat:"Lights & Accessories", img:"images/foot-rest.jpg" },
  { name:"Kids Training Wheels",               price:"$5",       cat:"Lights & Accessories", img:"images/kids-training-wheels.jpg" },
  { name:"Full Brake Caliper Set",             price:"$5",       cat:"Brakes", img:"images/full-brake-calliper-set.jpg" },
  { name:"Brake Lever Full Set",               price:"$5",       cat:"Brakes", img:"images/brake-lever-full-set.jpg" },
  { name:"Brake / Gear Cables (pair)",         price:"$1",       cat:"Brakes", img:"images/gear-cables.jpg" },
  { name:"Disc Brake Rotor & Caliper",         price:"$6",       cat:"Brakes", img:"images/disc-brake.jpg" },
  { name:"Disc Brake Drum",                    price:"$5",       cat:"Brakes", img:"images/disc-brake-drum.jpg" },
  { name:"Shimano Gear Levers",                price:"$6",       cat:"Drivetrain", img:"images/shimano-gear-levers.jpg" },
  { name:"7-Speed Cassette",                   price:"$4",       cat:"Drivetrain", img:"images/7-speed-cassette.jpg" },
  { name:"Bicycle Chain",                      price:"$2-$5",       cat:"Drivetrain", img:"images/chain.jpg" },
  { name:"Rear Derailleur (SunRace Index)",    price:"$2",       cat:"Drivetrain", img:"images/sunrace-rear.jpg" },
  { name:"Rear Derailleur (Shimano type)",     price:"$4",       cat:"Drivetrain", img:"images/shimano-rear.jpg" },
  { name:"Rear Derailleur (Lema)",             price:"$4",       cat:"Drivetrain", img:"images/lema-rear.jpg" },
  { name:"Front Derailleur",                   price:"$3",       cat:"Drivetrain", img:"images/front-derailleur.jpg" },
  { name:"Shimano Front Jumper",               price:"$4",       cat:"Drivetrain", img:"images/shimano-front-jumper.jpg" },
  { name:"Crankset (triple ring)",             price:"$5–$6",    cat:"Drivetrain", img:"images/crankset-triple-ring.jpg" },
  { name:"Buffalo Gear Crankset",              price:"$8",       cat:"Drivetrain", img:"images/buffalo-gear.jpg" },
  { name:"Black Horse 52 Gear",                price:"$10",      cat:"Drivetrain", img:"images/black-horse-52.jpg" },
  { name:"Mountain 52 Gear",                   price:"$10",      cat:"Drivetrain", img:"images/mountain-gear-52.jpg" },
  { name:"Bottom Bracket",                     price:"$4",       cat:"Drivetrain", img:"images/bottom-bracket.jpg" },
  { name:"Pedals (pair)",                      price:"$3",       cat:"Drivetrain", img:"images/pedals.jpg" },
  { name:"Wheel Rim",                          price:"$13",      cat:"Wheels & Frame", img:"images/wheel-rim.jpg" },
  { name:"Eagle Hub",                          price:"$15",      cat:"Wheels & Frame", img:"images/eagle-hub.jpg" },
  { name:"Rear Hub",                           price:"$3",       cat:"Wheels & Frame", img:"images/rear-hub.jpg" },
  { name:"Axle Bolt",                          price:"$1 each",  cat:"Wheels & Frame", img:"images/axle-bolt.jpg" },
  { name:"Spokes (MTB/Black horse/Digiwheel)", price:"$1/20",    cat:"Wheels & Frame", img:"images/spokes.jpg" },
  { name:'Spokes (Buffalo/29"/20")',           price:"$1/10",    cat:"Wheels & Frame", img:"images/spokes.jpg" },
  { name:'MTB Suspension Fork 26"',            price:"$12",      cat:"Wheels & Frame", img:"images/mtb-fork.jpg" },
  { name:'MTB Suspension Fork 29"',            price:"$18",      cat:"Wheels & Frame", img:"images/mtb-fork.jpg" },
  { name:"Ordinary Steel Fork",                price:"$5",       cat:"Wheels & Frame", img:"images/ordinary-fork.jpg" },
  { name:"Headset",                            price:"$5",       cat:"Wheels & Frame", img:"images/headset.jpg" },
  { name:"Handlebar Stem",                     price:"$2–$3",    cat:"Wheels & Frame", img:"images/handlebar-stem.jpg" },
  { name:"Seat Post",                          price:"$2",       cat:"Wheels & Frame", img:"images/seat-post.jpg" },
  { name:"Bike Saddle",                        price:"$4",       cat:"Wheels & Frame", img:"images/bike-sadle.jpg" },
  { name:"Metal Mudguards (pair)",             price:"$5",       cat:"Wheels & Frame", img:"images/metal-mudguards.jpg" },
  { name:"Plastic Mudguards",                  price:"$2–$2.50", cat:"Wheels & Frame", img:"images/plastic-mudguards.jpg" },
];

// ===== HOOKS =====
const useSearch = (query) => {
  return useMemo(() => {
    if (!query.trim()) return { bikes: [], spares: [], hasResults: false };
    const lowerQuery = query.toLowerCase();
    const bikes  = BIKES.filter(b =>
      b.name.toLowerCase().includes(lowerQuery) ||
      b.desc.toLowerCase().includes(lowerQuery) ||
      b.tag.toLowerCase().includes(lowerQuery)  ||
      b.cat.toLowerCase().includes(lowerQuery)
    );
    const spares = SPARES.filter(s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.cat.toLowerCase().includes(lowerQuery)
    );
    return { bikes, spares, hasResults: bikes.length > 0 || spares.length > 0 };
  }, [query]);
};

// ===== SMALL COMPONENTS =====
const TypingDots = memo(() => (
  <div style={{display:"flex",gap:5,padding:"10px 14px",background:"rgba(255,255,255,0.07)",borderRadius:"14px 14px 14px 3px",alignSelf:"flex-start",animation:"slideIn 0.3s ease"}}>
    {[0,1,2].map(i => (
      <div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#8B1A1A",animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`}}/>
    ))}
  </div>
));
TypingDots.displayName = "TypingDots";

const Message = memo(({ message, renderText }) => (
  <div style={{display:"flex",justifyContent:message.role==="user"?"flex-end":"flex-start",animation:"slideIn 0.3s ease"}}>
    <div style={{
      maxWidth:"83%",
      background:message.role==="user"?"linear-gradient(135deg,#8B1A1A,#6B1212)":"rgba(255,255,255,0.07)",
      color:"#f0ece2",
      borderRadius:message.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",
      padding:"10px 13px",fontSize:13,lineHeight:1.65,
      border:message.role==="assistant"?"1px solid rgba(255,255,255,0.08)":"none"
    }}>
      {renderText(message.text)}
    </div>
  </div>
));
Message.displayName = "Message";

const SearchBar = memo(({ query, setQuery, searchResults, onSelectItem }) => {
  const { bikes, spares } = searchResults;
  return (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        placeholder="🔍 Search bikes, parts, categories..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search products"
      />
      {query.trim() && (
        <div className="search-results">
          {bikes.length > 0 && bikes.map(bike => (
            <div key={`bike-${bike.id}`} className="search-result-item" onClick={() => onSelectItem(bike)}>
              <div>
                <div className="search-result-title">🚲 {bike.name}</div>
                <div className="search-result-meta">{bike.cat} • {bike.tag}</div>
              </div>
              <div className="search-result-price">{bike.price}</div>
            </div>
          ))}
          {spares.length > 0 && spares.map((spare, idx) => (
            <div key={`spare-${idx}`} className="search-result-item">
              <div>
                <div className="search-result-title">🔧 {spare.name}</div>
                <div className="search-result-meta">{spare.cat}</div>
              </div>
              <div className="search-result-price">{spare.price}</div>
            </div>
          ))}
          {!bikes.length && !spares.length && (
            <div className="search-empty">No results found. Try different keywords!</div>
          )}
        </div>
      )}
    </div>
  );
});
SearchBar.displayName = "SearchBar";

const BikeCard = memo(({ bike, featured = false }) => (
  <div className="bike-card" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:featured?14:16,padding:featured?18:20,display:"flex",flexDirection:"column"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
      <span style={{background:"rgba(139,26,26,0.2)",color:"#e8a0a0",fontSize:10,padding:"3px 10px",borderRadius:20,fontWeight:700}}>{bike.tag}</span>
      <span style={{background:"rgba(255,255,255,0.06)",color:"rgba(240,236,226,0.5)",fontSize:10,padding:"3px 10px",borderRadius:20}}>{bike.cat}</span>
    </div>
    {bike.img
      ? <img src={bike.img} alt={bike.name} style={{width:"100%",height:featured?140:160,objectFit:"cover",borderRadius:8,marginBottom:featured?8:12}}/>
      : <div style={{fontSize:featured?32:38,marginBottom:featured?8:10,textAlign:"center"}}>🚲</div>
    }
    <div style={{fontWeight:700,fontSize:featured?14:15,color:"#f0ece2",marginBottom:featured?4:6}}>{bike.name}</div>
    <div style={{fontSize:featured?11:12,color:"rgba(240,236,226,0.6)",lineHeight:1.5,marginBottom:featured?10:14,flex:1}}>{bike.desc}</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:featured?18:22,fontWeight:700,color:"#e8a0a0"}}>{bike.price}</span>
        {!featured && 
          <a href={"https://wa.me/263771687216?text=Hi%2C%20I'm%20interested%20in%20the%20" + encodeURIComponent(bike.name) + "%20(" + encodeURIComponent(bike.price) + ").%20Is%20it%20available%3F"} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,transition:"transform 0.2s"}}>Order</a>}
    </div>
  </div>
));
BikeCard.displayName = "BikeCard";

const SpareRow = memo(({ spare, isLast }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="spare-row" onClick={() => spare.img && setOpen(true)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 18px",borderBottom:!isLast?"1px solid rgba(255,255,255,0.05)":"none",cursor:spare.img?"pointer":"default"}}>
        <span onClick={() => spare.img && setOpen(true)} style={{fontSize:13,color:"#f0ece2",cursor:spare.img?"pointer":"default"}}>{spare.name} {spare.img && <span style={{fontSize:10,color:"#8B1A1A"}}>📷</span>}</span>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:13,fontWeight:700,color:"#e8a0a0",whiteSpace:"nowrap"}}>{spare.price}</span>
          <a href={"https://wa.me/263771687216?text=Hi%2C%20I'm%20interested%20in%20" + encodeURIComponent(spare.name) + "%20(" + encodeURIComponent(spare.price) + ").%20Is%20it%20available%3F"} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"5px 10px",borderRadius:6,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>Order</a>
        </div>
      </div>
      {open && (
        <div onClick={() => setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div onClick={e => e.stopPropagation()} style={{background:"#0e1a10",borderRadius:16,padding:20,maxWidth:400,width:"100%",border:"1px solid rgba(255,255,255,0.1)"}}>
            <img src={spare.img} alt={spare.name} style={{width:"100%",borderRadius:10,marginBottom:12}}/>
            <div style={{fontWeight:700,color:"#f0ece2",marginBottom:4}}>{spare.name}</div>
            <div style={{color:"#e8a0a0",fontWeight:700,fontSize:18,marginBottom:12}}>{spare.price}</div>
            <div style={{textAlign:"center",fontSize:12,color:"rgba(240,236,226,0.4)"}}>Tap anywhere to close</div>
          </div>
        </div>
      )}
    </>
  );
});
SpareRow.displayName = "SpareRow";

const Navigation = memo(({ section, onNavigate }) => {
  const navLinks = [
    { id:"home",    label:"Home" },
    { id:"bikes",   label:"Bikes" },
    { id:"spares",  label:"Parts" },
    { id:"contact", label:"Contact" },
  ];
  return (
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(10,18,9,0.97)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(139,26,26,0.3)",padding:"0 16px",animation:"fadeIn 0.5s ease"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",height:58,gap:16,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <img src="images/logo.jpeg" alt="Marshy Investments" style={{width:60,height:60,borderRadius:"50%",objectFit:"cover"}}/>
          <div>
            <div style={{fontWeight:700,fontSize:20,color:"#f0ece2"}}>Marshy Investments</div>
            <div style={{fontSize:14,color:"#8B1A1A",letterSpacing:2,textTransform:"uppercase"}}>Harare · Bicycles</div>
          </div>
        </div>
        <div style={{display:"flex",gap:16,marginLeft:"auto",alignItems:"center",flexWrap:"wrap"}}>
          {navLinks.map(l => (
            <button
              key={l.id}
              className="nav-link"
              onClick={() => onNavigate(l.id)}
              aria-current={section===l.id?"page":"false"}
              style={{background:"none",border:"none",color:section===l.id?"#e8a0a0":"rgba(240,236,226,0.7)",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,fontWeight:section===l.id?700:400,paddingBottom:2,borderBottom:section===l.id?"2px solid #8B1A1A":"2px solid transparent"}}
            >
              {l.label}
            </button>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,transition:"transform 0.2s"}}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
});
Navigation.displayName = "Navigation";

// ===== CHATBOT — calls /api/chat on the backend =====
const ChatBot = memo(({ onClose }) => {
  const [msgs, setMsgs] = useState([{
    role:"assistant",
    text:"👋 Hello! I'm **Spoke**, your guide at Marshy Investments.\n\nAsk me about bikes, prices, spare parts, or let me help you find the right bike!"
  }]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior:"smooth" }), [msgs, loading]);

  const renderText = useCallback((t) =>
    t.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return React.createElement(
        "span", { key: i },
        ...parts.map((p, j) => j % 2 === 1 ? React.createElement("strong", { key: j }, p) : p),
        i < t.split("\n").length - 1 ? React.createElement("br") : ""
      );
    }),
  []);

  const send = useCallback(async (text) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput("");
    const next = [...msgs, { role:"user", text:q }];
    setMsgs(next);
    setLoading(true);
    try {
      // ── Calls the backend API route (API key stays server-side) ──
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.text })) }),
      });
      const data  = await res.json();
      const reply = data.reply || "Sorry, something went wrong. Please WhatsApp us on 0771687216.";
      setMsgs(p => [...p, { role:"assistant", text:reply }]);
    } catch (e) {
      console.error("Chat error:", e);
      setMsgs(p => [...p, { role:"assistant", text:"Connection issue. Please WhatsApp us on 0771687216 😊" }]);
    }
    setLoading(false);
  }, [msgs, input, loading]);

  return (
    <div style={{position:"fixed",bottom:24,right:16,width:340,maxWidth:"calc(100vw - 32px)",height:490,background:"#0e1a10",borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",zIndex:1000,border:"1px solid rgba(255,255,255,0.1)",overflow:"hidden",animation:"slideIn 0.3s ease"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(90deg,#8B1A1A,#6B1212)",padding:"12px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🚲</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>Spoke — Marshy Investments</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4caf50",display:"inline-block"}}/>Online now
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat" style={{background:"none",border:"none",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:20,lineHeight:1,padding:4,transition:"color 0.2s"}}>✕</button>
      </div>
      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 12px",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m, i) => <Message key={i} message={m} renderText={renderText}/>)}
        {loading && <TypingDots/>}
        {msgs.length === 1 && (
          <div style={{display:"flex",flexDirection:"column",gap:6,paddingTop:4}}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => send(q)} className="filter-btn" style={{background:"rgba(139,26,26,0.12)",border:"1px solid rgba(139,26,26,0.35)",color:"#e8a0a0",borderRadius:10,padding:"8px 12px",cursor:"pointer",fontSize:12,textAlign:"left",fontFamily:"Georgia,serif",width:"100%"}}>
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      {/* WhatsApp strip */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",textAlign:"center",padding:"8px",fontSize:12,fontWeight:700,display:"block",flexShrink:0}}>
        💬 Chat on WhatsApp → {PHONE}
      </a>
      {/* Input */}
      <div style={{padding:"10px 12px",background:"rgba(0,0,0,0.3)",display:"flex",gap:8,flexShrink:0}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about bikes or parts…"
          aria-label="Chat input"
          style={{flex:1,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"9px 12px",color:"#f0ece2",fontFamily:"Georgia,serif",fontSize:13,outline:"none",transition:"border-color 0.2s"}}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          style={{width:38,height:38,borderRadius:10,background:input.trim()&&!loading?"#8B1A1A":"rgba(139,26,26,0.3)",border:"none",color:"#fff",cursor:input.trim()&&!loading?"pointer":"default",fontSize:16,flexShrink:0,transition:"all 0.2s"}}
        >➤</button>
      </div>
    </div>
  );
});
ChatBot.displayName = "ChatBot";

// ===== MAIN APP =====
function App() {
  const [section,     setSection]     = useState("home");
  const [filter,      setFilter]      = useState("All");
  const [chat,        setChat]        = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cats          = useMemo(() => ["All","Kids","Adult","Folding"], []);
  const filtered      = useMemo(() => filter==="All" ? BIKES : BIKES.filter(b => b.cat===filter), [filter]);
  const spareCats     = useMemo(() => [...new Set(SPARES.map(s => s.cat))], []);
  const searchResults = useSearch(searchQuery);
  const handleNavigate = useCallback((newSection) => { setSection(newSection); setSearchQuery(""); }, []);

  return (
    <div style={{fontFamily:"Georgia,'Times New Roman',serif",background:"#0a1209",minHeight:"100vh",color:"#f0ece2",display:"flex",flexDirection:"column"}}>
      <Navigation section={section} onNavigate={handleNavigate}/>
      <main style={{flex:1}}>

        {/* ── HOME ── */}
        {section==="home" && (
          <div style={{animation:"fadeUp 0.6s ease"}}>
            {/* Hero */}
            <div style={{background:"linear-gradient(135deg,#0a1209 0%,#1a0505 50%,#0a1209 100%)",padding:"70px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 50%, rgba(139,26,26,0.15) 0%, transparent 60%)",pointerEvents:"none"}}/>
              <div style={{animation:"fadeUp 0.7s ease both",position:"relative"}}>
                <div style={{fontSize:11,letterSpacing:5,color:"#8B1A1A",textTransform:"uppercase",marginBottom:14}}>Harare's Trusted Bicycle Shop</div>
                <h1 style={{fontSize:"clamp(32px,6vw,60px)",fontWeight:700,color:"#f0ece2",lineHeight:1.1,marginBottom:16}}>
                  Marshy<br/><span style={{color:"#8B1A1A"}}>Investments</span>
                </h1>
                <p style={{fontSize:16,color:"rgba(240,236,226,0.7)",maxWidth:480,margin:"0 auto 16px",lineHeight:1.7}}>Quality bicycles & spare parts for every rider in Harare.</p>
                <p style={{fontSize:13,color:"rgba(240,236,226,0.5)",marginBottom:32}}>📍 Shop 62, Chinhoyi St (Cnr Abercorn) · Opposite Usman Fabric</p>
                <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                  <button className="btn-primary" onClick={() => handleNavigate("bikes")} style={{background:"#8B1A1A",color:"#fff",border:"none",padding:"13px 28px",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer"}}>Browse Bikes</button>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{background:"rgba(255,255,255,0.08)",color:"#f0ece2",border:"1px solid rgba(255,255,255,0.2)",padding:"13px 28px",borderRadius:10,fontSize:15,fontWeight:700,transition:"all 0.2s"}}>💬 WhatsApp Us</a>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div style={{background:"rgba(139,26,26,0.1)",borderTop:"1px solid rgba(139,26,26,0.2)",borderBottom:"1px solid rgba(139,26,26,0.2)",padding:"20px 24px",display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap"}}>
              {[["14+","Bike Models"],["45+","Spare Parts"],["$25","Starting Price"],["Mon–Sat","8am–5pm"]].map(([v,l]) => (
                <div key={l} style={{textAlign:"center",animation:"fadeUp 0.6s ease both"}}>
                  <div style={{fontSize:22,fontWeight:700,color:"#e8a0a0"}}>{v}</div>
                  <div style={{fontSize:11,color:"rgba(240,236,226,0.6)",letterSpacing:1,textTransform:"uppercase",marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            {/* Featured bikes */}
            <div style={{padding:"48px 24px",maxWidth:1100,margin:"0 auto"}}>
              <h2 style={{fontSize:26,fontWeight:700,color:"#f0ece2",marginBottom:6}}>Featured Bikes</h2>
              <p style={{color:"rgba(240,236,226,0.6)",marginBottom:28}}>Our most popular models — all in stock in Harare</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
                {BIKES.slice(1,5).map(b => (
                  <div key={b.id} onClick={() => handleNavigate("bikes")}><BikeCard bike={b} featured={true}/></div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:28}}>
                <button className="btn-primary" onClick={() => handleNavigate("bikes")} style={{background:"#8B1A1A",color:"#fff",border:"none",padding:"11px 26px",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer"}}>View All Bikes →</button>
              </div>
            </div>
            {/* Payments */}
            <div style={{background:"rgba(255,255,255,0.03)",borderTop:"1px solid rgba(255,255,255,0.06)",padding:"32px 24px",textAlign:"center"}}>
              <div style={{fontSize:11,letterSpacing:3,color:"#8B1A1A",textTransform:"uppercase",marginBottom:12}}>We Accept</div>
              <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
                {["💵 USD Cash","📱 EcoCash","🏦 Zipit"].map(p => (
                  <span key={p} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",padding:"9px 18px",borderRadius:8,fontSize:13,color:"#f0ece2"}}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BIKES ── */}
        {section==="bikes" && (
          <div style={{padding:"40px 24px",maxWidth:1100,margin:"0 auto",animation:"fadeUp 0.6s ease"}}>
            <h2 style={{fontSize:28,fontWeight:700,color:"#f0ece2",marginBottom:6}}>Our Bicycles</h2>
            <p style={{color:"rgba(240,236,226,0.6)",marginBottom:24}}>All bikes in stock · WhatsApp to confirm availability</p>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} searchResults={searchResults} onSelectItem={(bike) => { setSearchQuery(""); window.scrollTo({top:0,behavior:"smooth"}); }}/>
            {searchQuery ? (
              <>
                <h3 style={{fontSize:16,color:"#e8a0a0",marginBottom:16}}>Search Results for "{searchQuery}"</h3>
                {searchResults.bikes.length > 0 ? (
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:18}}>
                    {searchResults.bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
                  </div>
                ) : (
                  <div style={{textAlign:"center",padding:"40px 24px",color:"rgba(240,236,226,0.5)"}}>No bikes match your search</div>
                )}
              </>
            ) : (
              <>
                <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
                  {cats.map(c => (
                    <button key={c} className="filter-btn" onClick={() => setFilter(c)} aria-pressed={filter===c} style={{background:filter===c?"#8B1A1A":"rgba(255,255,255,0.06)",color:filter===c?"#fff":"rgba(240,236,226,0.7)",border:`1px solid ${filter===c?"#8B1A1A":"rgba(255,255,255,0.12)"}`,padding:"7px 18px",borderRadius:8,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,fontWeight:filter===c?700:400}}>
                      {c}
                    </button>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:18}}>
                  {filtered.map(b => <BikeCard key={b.id} bike={b}/>)}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── SPARES ── */}
        {section==="spares" && (
          <div style={{padding:"40px 24px",maxWidth:900,margin:"0 auto",animation:"fadeUp 0.6s ease"}}>
            <h2 style={{fontSize:28,fontWeight:700,color:"#f0ece2",marginBottom:6}}>Spare Parts & Accessories</h2>
            <p style={{color:"rgba(240,236,226,0.6)",marginBottom:24}}>Wide range in stock · WhatsApp for specific enquiries</p>
            <SearchBar query={searchQuery} setQuery={setSearchQuery} searchResults={searchResults} onSelectItem={() => setSearchQuery("")}/>
            {searchQuery ? (
              <>
                <h3 style={{fontSize:16,color:"#e8a0a0",marginBottom:16}}>Search Results for "{searchQuery}"</h3>
                {searchResults.spares.length > 0 ? (
                  <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,overflow:"hidden"}}>
                    {searchResults.spares.map((s,i,arr) => <SpareRow key={i} spare={s} isLast={i===arr.length-1}/>)}
                  </div>
                ) : (
                  <div style={{textAlign:"center",padding:"40px 24px",color:"rgba(240,236,226,0.5)"}}>No spare parts match your search</div>
                )}
              </>
            ) : (
              <>
                {spareCats.map(cat => (
                  <div key={cat} style={{marginBottom:22}}>
                    <div style={{fontSize:11,letterSpacing:3,color:"#8B1A1A",textTransform:"uppercase",marginBottom:8,fontWeight:700}}>{cat}</div>
                    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,overflow:"hidden"}}>
                      {SPARES.filter(s => s.cat===cat).map((s,i,arr) => <SpareRow key={i} spare={s} isLast={i===arr.length-1}/>)}
                    </div>
                  </div>
                ))}
              </>
            )}
            <div style={{marginTop:20,padding:18,background:"rgba(139,26,26,0.1)",border:"1px solid rgba(139,26,26,0.25)",borderRadius:12,textAlign:"center"}}>
              <p style={{color:"rgba(240,236,226,0.8)",marginBottom:12,fontSize:14}}>Need a part not listed? We likely have it!</p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"9px 22px",borderRadius:8,fontSize:13,fontWeight:700,display:"inline-block",transition:"transform 0.2s"}}>💬 Ask on WhatsApp</a>
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {section==="contact" && (
          <div style={{padding:"40px 24px",maxWidth:680,margin:"0 auto",animation:"fadeUp 0.6s ease"}}>
            <h2 style={{fontSize:28,fontWeight:700,color:"#f0ece2",marginBottom:6}}>Contact Us</h2>
            <p style={{color:"rgba(240,236,226,0.6)",marginBottom:32}}>We're happy to help — reach out anytime!</p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                { icon:"📱", label:"WhatsApp / Call",  val:PHONE,   href:WHATSAPP },
                { icon:"📍", label:"Location",          val:ADDRESS },
                { icon:"🕐", label:"Opening Hours",     val:"Monday – Saturday · 8:00am – 5:00pm" },
                { icon:"💵", label:"Payments Accepted", val:"USD Cash · EcoCash · Zipit" },
              ].map((c,i) => (
                <div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:18,display:"flex",alignItems:"flex-start",gap:14}}>
                  <div style={{fontSize:26,flexShrink:0,marginTop:2}}>{c.icon}</div>
                  <div>
                    <div style={{fontSize:10,color:"#8B1A1A",letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{fontSize:18,fontWeight:700,color:"#e8a0a0",transition:"color 0.2s",textDecoration:"underline"}}>{c.val}</a>
                      : <div style={{fontSize:14,fontWeight:600,color:"#f0ece2",whiteSpace:"pre-line",lineHeight:1.7}}>{c.val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:28,textAlign:"center"}}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:"14px 36px",borderRadius:12,fontSize:16,fontWeight:700,display:"inline-block",boxShadow:"0 4px 20px rgba(37,211,102,0.3)",transition:"transform 0.2s"}}>💬 Chat on WhatsApp Now</a>
            </div>
          </div>
        )}
      </main>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"20px 24px",textAlign:"center",marginTop:40}}>
        <div style={{fontSize:12,color:"rgba(240,236,226,0.4)"}}>© 2026 Marshy Investments · Shop 62, Chinhoyi St (Cnr Abercorn) · Harare · {PHONE}</div>
      </footer>

      {!chat && (
        <button onClick={() => setChat(true)} aria-label="Open chat" style={{position:"fixed",bottom:24,right:20,width:54,height:54,borderRadius:"50%",background:"linear-gradient(135deg,#8B1A1A,#6B1212)",border:"none",color:"#fff",fontSize:24,cursor:"pointer",boxShadow:"0 4px 20px rgba(139,26,26,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2s infinite",transition:"transform 0.2s"}}>🚲</button>
      )}
      {chat && <ChatBot onClose={() => setChat(false)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
