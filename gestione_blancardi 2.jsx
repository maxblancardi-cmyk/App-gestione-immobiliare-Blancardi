import { useState, useEffect } from "react";

// ============================================================
// DATI INIZIALI
// ============================================================
const USERS = {
  MaxAdmin2026: { name: "Max Blancardi", role: "max", access: ["dashboard","proprieta","pagamenti","scadenze","viacapo","utenze","argentina"] },
  ArisAdmin2026: { name: "Aris Blancardi", role: "aris", access: ["dashboard","proprieta","pagamenti","scadenze","viacapo","utenze","argentina"] },
  CaterinaAdmin2026: { name: "Caterina", role: "caterina", access: ["dashboard","proprieta","pagamenti","scadenze","viacapo","utenze"] },
};

const initialProperties = [
  { id:1, nome:"Negozio Via Roma 12", citta:"Bordighera", societa:"Intemelia", inquilino:"Mario Rossi", canone:1200, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Intemelia",numero:"IT001",fornitore:"Enel",voltura:true},{tipo:"Acqua",intestatario:"Mario Rossi",numero:"AQ001",fornitore:"Rivieracqua",voltura:false}] },
  { id:2, nome:"Negozio Corso Italia 45", citta:"Bordighera", societa:"Provenzale", inquilino:"Luigi Bianchi", canone:950, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"parziale"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Luigi Bianchi",numero:"IT002",fornitore:"Edison",voltura:false},{tipo:"Gas",intestatario:"Provenzale",numero:"GS001",fornitore:"ENI",voltura:true}] },
  { id:3, nome:"Negozio Via Aurelia 33", citta:"Bordighera", societa:"Blancardi 1885", inquilino:"Anna Verdi", canone:1100, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"non_pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Blancardi 1885",numero:"IT003",fornitore:"Enel",voltura:true},{tipo:"Acqua",intestatario:"Anna Verdi",numero:"AQ003",fornitore:"Rivieracqua",voltura:false}] },
  { id:4, nome:"Negozio Lungomare 8", citta:"Bordighera", societa:"Max personale", inquilino:"Stefano Neri", canone:1400, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"pagato"}], utenze:[{tipo:"Luce",intestatario:"Stefano Neri",numero:"IT004",fornitore:"Enel",voltura:false}] },
  { id:5, nome:"Negozio Piazza Eroi 2", citta:"Bordighera", societa:"Intemelia", inquilino:"Carla Russo", canone:800, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"non_pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Intemelia",numero:"IT005",fornitore:"Edison",voltura:true}] },
  { id:6, nome:"Negozio Via Arziglia 17", citta:"Bordighera", societa:"Provenzale", inquilino:"Franco Marino", canone:750, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Gas",intestatario:"Franco Marino",numero:"GS002",fornitore:"ENI",voltura:false}] },
  { id:7, nome:"Negozio Via Libertà 5", citta:"Bordighera", societa:"Blancardi 1885", inquilino:"Monica Galli", canone:1050, pagamenti:[{mese:"Gen",stato:"non_pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Monica Galli",numero:"IT007",fornitore:"Enel",voltura:false},{tipo:"Acqua",intestatario:"Blancardi 1885",numero:"AQ007",fornitore:"Rivieracqua",voltura:true}] },
  { id:8, nome:"Negozio Via Trento 3", citta:"Bordighera", societa:"Aris personale", inquilino:"Roberto Sala", canone:900, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"parziale"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"attesa"}], utenze:[{tipo:"Luce",intestatario:"Roberto Sala",numero:"IT008",fornitore:"Enel",voltura:false}] },
  { id:9, nome:"Capannone Via Industriale", citta:"Arma di Taggia", societa:"Intemelia", inquilino:"Trans Liguria Srl", canone:2200, pagamenti:[{mese:"Gen",stato:"pagato"},{mese:"Feb",stato:"pagato"},{mese:"Mar",stato:"pagato"},{mese:"Apr",stato:"pagato"},{mese:"Mag",stato:"pagato"}], utenze:[{tipo:"Luce",intestatario:"Trans Liguria Srl",numero:"IT009",fornitore:"Enel",voltura:false},{tipo:"Gas",intestatario:"Intemelia",numero:"GS009",fornitore:"ENI",voltura:true}] },
];

const initialViaAlCapo = {
  mutuo: { importo: 850000, rata_mensile: 4200, banca: "Banca Passadore", durata_anni: 20, inizio: "2019-01", prossima_rata: "2026-06-01" },
  appartamenti: [
    { id:1, interno:"A1", piano:1, mq:65, prezzo:185000, stato:"venduto", compromesso:"2026-03-15", rogito:"2026-06-20", acquirente:"Famiglia Romani" },
    { id:2, interno:"A2", piano:1, mq:70, prezzo:195000, stato:"venduto", compromesso:"2026-04-10", rogito:"2026-07-05", acquirente:"Marco Esposito" },
    { id:3, interno:"B1", piano:2, mq:72, prezzo:200000, stato:"compromesso", compromesso:"2026-05-02", rogito:"2026-07-15", acquirente:"Fam. Conti" },
    { id:4, interno:"B2", piano:2, mq:68, prezzo:190000, stato:"compromesso", compromesso:"2026-05-18", rogito:"2026-07-30", acquirente:"In trattativa" },
    { id:5, interno:"C1", piano:3, mq:80, prezzo:225000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
    { id:6, interno:"C2", piano:3, mq:75, prezzo:210000, stato:"trattativa", compromesso:null, rogito:null, acquirente:"Possibile interessato" },
    { id:7, interno:"D1", piano:4, mq:85, prezzo:240000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
    { id:8, interno:"D2", piano:4, mq:82, prezzo:235000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
    { id:9, interno:"E1", piano:5, mq:90, prezzo:260000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
    { id:10, interno:"E2", piano:5, mq:88, prezzo:250000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
    { id:11, interno:"PH", piano:6, mq:120, prezzo:380000, stato:"disponibile", compromesso:null, rogito:null, acquirente:null },
  ]
};

const argentinaData = [
  { id:1, nome:"San León", provincia:"Río Negro", ettari:11370, valutazione_usd:65, valutatore:"Alexis Uhaldegaray", commissario:"Osvaldo Botta Campos", canone_semestrale:8500, pagamenti:[{semestre:"S2-2025",stato:"pagato",data:"2025-12-15"},{semestre:"S1-2026",stato:"attesa",data:null}] },
  { id:2, nome:"Las Acacias", provincia:"Río Negro", ettari:3200, valutazione_usd:70, valutatore:"da definire", commissario:"Osvaldo Botta Campos", canone_semestrale:4200, pagamenti:[{semestre:"S2-2025",stato:"pagato",data:"2025-11-30"},{semestre:"S1-2026",stato:"attesa",data:null}] },
];

const scadenzeData = [
  { id:1, titolo:"IMU Acconto", data:"2026-06-16", tipo:"tassa", urgenza:"alta", descrizione:"Verificare importo per Intemelia, Provenzale, Blancardi 1885 e personale", fatto:false },
  { id:2, titolo:"Rinnovo Via Aurelia 33", data:"2026-09-01", tipo:"contratto", urgenza:"media", descrizione:"Contratto in scadenza — disdetta da inviare entro giugno 2026", fatto:false },
  { id:3, titolo:"Rata Mutuo Via al Capo", data:"2026-06-01", tipo:"mutuo", urgenza:"alta", descrizione:"Rata mensile €4.200 — Banca Passadore", fatto:false },
  { id:4, titolo:"IMU Saldo", data:"2026-12-16", tipo:"tassa", urgenza:"bassa", descrizione:"Saldo IMU annuale", fatto:false },
  { id:5, titolo:"Rogito Fam. Romani", data:"2026-06-20", tipo:"rogito", urgenza:"alta", descrizione:"Via al Capo A1 — €185.000", fatto:false },
  { id:6, titolo:"Rogito Marco Esposito", data:"2026-07-05", tipo:"rogito", urgenza:"media", descrizione:"Via al Capo A2 — €195.000", fatto:false },
  { id:7, titolo:"Voltura Contatori", data:"2026-06-30", tipo:"utenza", urgenza:"alta", descrizione:"3 contatori ancora intestati a Blancardi/società — trasferire a inquilini", fatto:false },
];

// ============================================================
// COMPONENTI UI BASE
// ============================================================
const Badge = ({ children, color = "gray" }) => {
  const colors = {
    green: "background:#d1fae5;color:#065f46",
    red: "background:#fee2e2;color:#991b1b",
    orange: "background:#fff7ed;color:#c2410c",
    blue: "background:#dbeafe;color:#1e40af",
    gray: "background:#f3f4f6;color:#374151",
    yellow: "background:#fef9c3;color:#854d0e",
  };
  return (
    <span style={{ ...parseStyle(colors[color] || colors.gray), padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:700, letterSpacing:"0.3px" }}>
      {children}
    </span>
  );
};

function parseStyle(str) {
  if (!str) return {};
  return str.split(";").reduce((acc, part) => {
    const [k, v] = part.split(":");
    if (k && v) acc[k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v.trim();
    return acc;
  }, {});
}

const StatoBar = ({ pagamenti }) => (
  <div style={{ display:"flex", gap:3, marginTop:6 }}>
    {pagamenti.slice(-4).map((p, i) => (
      <div key={i} title={`${p.mese}: ${p.stato}`} style={{
        width:18, height:6, borderRadius:3,
        background: p.stato === "pagato" ? "#22c55e" : p.stato === "parziale" ? "#f97316" : p.stato === "attesa" ? "#d1d5db" : "#ef4444"
      }} />
    ))}
  </div>
);

// ============================================================
// SEZIONE: LOGIN
// ============================================================
function Login({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);

  const handleLogin = () => {
    const user = USERS[pwd];
    if (user) { onLogin(user); setErr(false); }
    else setErr(true);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#1e3a5f 0%,#0f2040 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Georgia', serif" }}>
      <div style={{ background:"white", borderRadius:16, padding:48, width:360, boxShadow:"0 20px 60px rgba(0,0,0,0.3)", textAlign:"center" }}>
        <div style={{ fontSize:42, marginBottom:8 }}>🏛</div>
        <div style={{ fontSize:22, fontWeight:700, color:"#1e3a5f", marginBottom:4 }}>Gestione Proprietà</div>
        <div style={{ fontSize:14, color:"#64748b", marginBottom:32 }}>Blancardi — Accesso riservato</div>
        <input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{ width:"100%", padding:"12px 16px", borderRadius:8, border:`2px solid ${err ? "#ef4444" : "#e2e8f0"}`, fontSize:15, outline:"none", boxSizing:"border-box", marginBottom:8 }}
        />
        {err && <div style={{ color:"#ef4444", fontSize:12, marginBottom:8 }}>Password non valida</div>}
        <button onClick={handleLogin} style={{ width:"100%", padding:"12px", borderRadius:8, background:"#1e3a5f", color:"white", border:"none", fontSize:15, fontWeight:600, cursor:"pointer", marginTop:8 }}>
          Accedi
        </button>
        <div style={{ marginTop:24, fontSize:11, color:"#94a3b8" }}>
          Max · Aris · Caterina
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SEZIONE: DASHBOARD
// ============================================================
function Dashboard({ properties, scadenze }) {
  const totaleCanoni = properties.reduce((s, p) => s + p.canone, 0);
  const nonPagati = properties.filter(p => p.pagamenti.slice(-1)[0]?.stato === "non_pagato" || p.pagamenti.find(pg => pg.mese === "Apr" && pg.stato === "non_pagato"));
  const voltureDaFare = properties.flatMap(p => p.utenze).filter(u => u.voltura).length;
  const scadenzeUrgenti = scadenze.filter(s => s.urgenza === "alta" && !s.fatto);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 }}>
        {[
          { label:"Canone Totale/Mese", value:`€${totaleCanoni.toLocaleString()}`, icon:"💶", color:"#1e3a5f" },
          { label:"Proprietà Gestite", value:properties.length, icon:"🏠", color:"#0369a1" },
          { label:"Volture da Fare", value:voltureDaFare, icon:"⚡", color: voltureDaFare > 0 ? "#dc2626" : "#16a34a" },
          { label:"Scadenze Urgenti", value:scadenzeUrgenti.length, icon:"🚨", color: scadenzeUrgenti.length > 0 ? "#dc2626" : "#16a34a" },
        ].map((s, i) => (
          <div key={i} style={{ background:"white", borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", borderLeft:`4px solid ${s.color}` }}>
            <div style={{ fontSize:28 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, marginTop:4 }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ background:"white", borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:12, fontSize:14 }}>🚨 Scadenze Urgenti</div>
          {scadenzeUrgenti.map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#1e293b" }}>{s.titolo}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>{s.data}</div>
              </div>
              <Badge color="red">URGENTE</Badge>
            </div>
          ))}
        </div>

        <div style={{ background:"white", borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:12, fontSize:14 }}>💶 Incassi per Società</div>
          {["Intemelia","Provenzale","Blancardi 1885","Max personale","Aris personale"].map(soc => {
            const tot = properties.filter(p => p.societa === soc).reduce((s, p) => s + p.canone, 0);
            if (!tot) return null;
            return (
              <div key={soc} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #f1f5f9" }}>
                <span style={{ fontSize:13, color:"#475569" }}>{soc}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#1e3a5f" }}>€{tot.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SEZIONE: PROPRIETÀ
// ============================================================
function Proprieta({ properties }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {properties.map(p => {
          const ultimoPag = p.pagamenti[p.pagamenti.length - 1];
          const isOk = ultimoPag?.stato === "pagato" || ultimoPag?.stato === "attesa";
          return (
            <div key={p.id} onClick={() => setSelected(selected?.id === p.id ? null : p)}
              style={{ background:"white", borderRadius:12, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", cursor:"pointer", borderLeft:`4px solid ${isOk ? "#22c55e" : "#ef4444"}`, transition:"box-shadow 0.2s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#1e293b" }}>{p.nome}</div>
                <Badge color={isOk ? "green" : "red"}>{isOk ? "OK" : "⚠️"}</Badge>
              </div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{p.citta} · {p.societa}</div>
              <div style={{ fontSize:13, color:"#475569", marginTop:6 }}>👤 {p.inquilino}</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, alignItems:"center" }}>
                <span style={{ fontSize:16, fontWeight:700, color:"#1e3a5f" }}>€{p.canone.toLocaleString()}/mese</span>
                <StatoBar pagamenti={p.pagamenti} />
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div style={{ marginTop:20, background:"white", borderRadius:12, padding:24, boxShadow:"0 4px 16px rgba(0,0,0,0.12)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:16, color:"#1e3a5f" }}>{selected.nome}</div>
            <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#94a3b8" }}>✕</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13, color:"#475569", marginBottom:8 }}>📋 Storico Pagamenti</div>
              {selected.pagamenti.map((p, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f8fafc" }}>
                  <span style={{ fontSize:13 }}>{p.mese}</span>
                  <Badge color={p.stato === "pagato" ? "green" : p.stato === "parziale" ? "orange" : p.stato === "attesa" ? "gray" : "red"}>{p.stato}</Badge>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:600, fontSize:13, color:"#475569", marginBottom:8 }}>⚡ Utenze</div>
              {selected.utenze.map((u, i) => (
                <div key={i} style={{ padding:"8px", borderRadius:8, marginBottom:6, background: u.voltura ? "#fef2f2" : "#f0fdf4", border:`1px solid ${u.voltura ? "#fecaca" : "#bbf7d0"}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontWeight:600, fontSize:12 }}>{u.tipo}</span>
                    {u.voltura && <Badge color="red">VOLTURA</Badge>}
                  </div>
                  <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>
                    {u.fornitore} · N° {u.numero}
                  </div>
                  <div style={{ fontSize:11, color:"#64748b" }}>Intestato: {u.intestatario}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SEZIONE: PAGAMENTI
// ============================================================
function Pagamenti({ properties }) {
  const mesi = ["Gen","Feb","Mar","Apr","Mag"];
  return (
    <div style={{ background:"white", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ background:"#1e3a5f", color:"white" }}>
            <th style={{ padding:"12px 16px", textAlign:"left" }}>Proprietà</th>
            <th style={{ padding:"12px 8px", textAlign:"left" }}>Canone</th>
            {mesi.map(m => <th key={m} style={{ padding:"12px 8px", textAlign:"center" }}>{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {properties.map((p, idx) => (
            <tr key={p.id} style={{ background: idx % 2 === 0 ? "#f8fafc" : "white", borderBottom:"1px solid #e2e8f0" }}>
              <td style={{ padding:"10px 16px" }}>
                <div style={{ fontWeight:600, color:"#1e293b" }}>{p.nome}</div>
                <div style={{ fontSize:11, color:"#94a3b8" }}>{p.societa}</div>
              </td>
              <td style={{ padding:"10px 8px", fontWeight:700, color:"#1e3a5f" }}>€{p.canone.toLocaleString()}</td>
              {mesi.map(mese => {
                const pg = p.pagamenti.find(pp => pp.mese === mese);
                const colors = { pagato:"#22c55e", parziale:"#f97316", non_pagato:"#ef4444", attesa:"#d1d5db" };
                return (
                  <td key={mese} style={{ padding:"10px 8px", textAlign:"center" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background: colors[pg?.stato] || "#d1d5db", margin:"0 auto", title:pg?.stato }} title={pg?.stato} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding:"12px 16px", background:"#f8fafc", display:"flex", gap:16, fontSize:11, color:"#64748b" }}>
        {[["#22c55e","Pagato"],["#f97316","Parziale"],["#ef4444","Non pagato"],["#d1d5db","In attesa"]].map(([c,l]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:c }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SEZIONE: SCADENZE
// ============================================================
function Scadenze({ scadenze, setScadenze }) {
  const oggi = new Date();
  const getUrgenza = (s) => {
    if (s.fatto) return "fatto";
    const diff = (new Date(s.data) - oggi) / (1000 * 60 * 60 * 24);
    if (diff < 30) return "alta";
    if (diff < 90) return "media";
    return "bassa";
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {scadenze.map(s => {
        const urg = getUrgency(s);
        const colors = { alta:"#ef4444", media:"#f97316", bassa:"#22c55e", fatto:"#94a3b8" };
        const bg = { alta:"#fef2f2", media:"#fff7ed", bassa:"#f0fdf4", fatto:"#f8fafc" };
        return (
          <div key={s.id} style={{ background:bg[urg], borderRadius:12, padding:16, borderLeft:`4px solid ${colors[urg]}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontWeight:700, fontSize:14, color: s.fatto ? "#94a3b8" : "#1e293b", textDecoration: s.fatto ? "line-through" : "none" }}>{s.titolo}</span>
                <Badge color={urg === "fatto" ? "gray" : urg === "alta" ? "red" : urg === "media" ? "orange" : "green"}>
                  {urg === "fatto" ? "FATTO" : urg.toUpperCase()}
                </Badge>
              </div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{s.descrizione}</div>
              <div style={{ fontSize:12, fontWeight:600, color:colors[urg], marginTop:4 }}>📅 {s.data}</div>
            </div>
            <button onClick={() => setScadenze(prev => prev.map(x => x.id === s.id ? {...x, fatto:!x.fatto} : x))}
              style={{ padding:"6px 12px", borderRadius:8, border:`1px solid ${colors[urg]}`, background: s.fatto ? "#e5e7eb" : colors[urg], color: s.fatto ? "#6b7280" : "white", cursor:"pointer", fontSize:12, fontWeight:600, marginLeft:12, whiteSpace:"nowrap" }}>
              {s.fatto ? "Riapri" : "✓ Fatto"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function getUrgency(s) {
  if (s.fatto) return "fatto";
  const oggi = new Date();
  const diff = (new Date(s.data) - oggi) / (1000 * 60 * 60 * 24);
  if (diff < 30) return "alta";
  if (diff < 90) return "media";
  return "bassa";
}

// ============================================================
// SEZIONE: VIA AL CAPO
// ============================================================
function ViaAlCapo({ data }) {
  const venduti = data.appartamenti.filter(a => a.stato === "venduto").length;
  const compromessi = data.appartamenti.filter(a => a.stato === "compromesso").length;
  const disponibili = data.appartamenti.filter(a => a.stato === "disponibile").length;
  const ricavoPrevisto = data.appartamenti.filter(a => a.stato !== "disponibile").reduce((s, a) => s + a.prezzo, 0);

  const statoColor = { venduto:"#22c55e", compromesso:"#3b82f6", trattativa:"#f97316", disponibile:"#d1d5db" };
  const statoLabel = { venduto:"Venduto ✓", compromesso:"Compromesso", trattativa:"Trattativa", disponibile:"Disponibile" };

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:20 }}>
        {[
          { label:"Venduti", value:venduti, color:"#22c55e" },
          { label:"Compromessi", value:compromessi, color:"#3b82f6" },
          { label:"Disponibili", value:disponibili, color:"#64748b" },
          { label:"Ricavo previsto", value:`€${(ricavoPrevisto/1000).toFixed(0)}k`, color:"#1e3a5f" },
        ].map((s, i) => (
          <div key={i} style={{ background:"white", borderRadius:12, padding:16, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", borderLeft:`4px solid ${s.color}` }}>
            <div style={{ fontSize:22, fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"white", borderRadius:12, padding:16, marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", borderLeft:"4px solid #f97316" }}>
        <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:8 }}>🏦 Mutuo Banca Passadore</div>
        <div style={{ display:"flex", gap:24, fontSize:13 }}>
          <span>Importo: <b>€{data.mutuo.importo.toLocaleString()}</b></span>
          <span>Rata: <b>€{data.mutuo.rata_mensile.toLocaleString()}/mese</b></span>
          <span>Prossima: <b>{data.mutuo.prossima_rata}</b></span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
        {data.appartamenti.map(a => (
          <div key={a.id} style={{ background:"white", borderRadius:10, padding:14, boxShadow:"0 2px 6px rgba(0,0,0,0.06)", borderTop:`3px solid ${statoColor[a.stato]}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:700, fontSize:15, color:"#1e293b" }}>Int. {a.interno}</span>
              <Badge color={a.stato === "venduto" ? "green" : a.stato === "compromesso" ? "blue" : a.stato === "trattativa" ? "orange" : "gray"}>
                {statoLabel[a.stato]}
              </Badge>
            </div>
            <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>Piano {a.piano} · {a.mq}mq</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#1e3a5f", marginTop:6 }}>€{a.prezzo.toLocaleString()}</div>
            {a.acquirente && <div style={{ fontSize:11, color:"#475569", marginTop:4 }}>👤 {a.acquirente}</div>}
            {a.rogito && <div style={{ fontSize:11, color:"#3b82f6", marginTop:2 }}>📅 Rogito: {a.rogito}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SEZIONE: UTENZE
// ============================================================
function Utenze({ properties }) {
  const tutteUtenze = properties.flatMap(p => p.utenze.map(u => ({ ...u, proprieta: p.nome, citta: p.citta })));
  const daVolturare = tutteUtenze.filter(u => u.voltura);
  const aPostoData = tutteUtenze.filter(u => !u.voltura);

  return (
    <div>
      {daVolturare.length > 0 && (
        <div style={{ background:"#fef2f2", border:"2px solid #ef4444", borderRadius:12, padding:16, marginBottom:20 }}>
          <div style={{ fontWeight:700, color:"#dc2626", fontSize:15, marginBottom:12 }}>
            ⚠️ {daVolturare.length} CONTATORI DA VOLTURARE
          </div>
          {daVolturare.map((u, i) => (
            <div key={i} style={{ background:"white", borderRadius:8, padding:12, marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:13 }}>{u.tipo} — {u.proprieta}</div>
                <div style={{ fontSize:12, color:"#64748b" }}>N° {u.numero} · {u.fornitore}</div>
                <div style={{ fontSize:12, color:"#dc2626" }}>Intestato a: {u.intestatario} → trasferire all'inquilino</div>
              </div>
              <Badge color="red">VOLTURA</Badge>
            </div>
          ))}
        </div>
      )}

      <div style={{ background:"white", borderRadius:12, padding:16, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:12, fontSize:14 }}>✅ Utenze a Posto ({aPostoData.length})</div>
        {aPostoData.map((u, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f1f5f9" }}>
            <div>
              <span style={{ fontWeight:600, fontSize:13 }}>{u.tipo}</span>
              <span style={{ fontSize:12, color:"#94a3b8", marginLeft:8 }}>{u.proprieta}</span>
            </div>
            <div style={{ fontSize:12, color:"#64748b", textAlign:"right" }}>
              <div>{u.fornitore} · N° {u.numero}</div>
              <div>Intestato: {u.intestatario}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SEZIONE: ARGENTINA (protetta)
// ============================================================
function Argentina({ data, user }) {
  if (user.role === "caterina") {
    return (
      <div style={{ background:"#1e3a5f", borderRadius:16, padding:48, textAlign:"center", color:"white" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <div style={{ fontSize:20, fontWeight:700 }}>Accesso riservato</div>
        <div style={{ fontSize:14, color:"#93c5fd", marginTop:8 }}>Questa sezione è visibile solo a Max e Aris</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#1e3a5f,#0f2040)", borderRadius:12, padding:20, marginBottom:20, color:"white" }}>
        <div style={{ fontSize:24, marginBottom:4 }}>🌎 Argentina — Patagonia</div>
        <div style={{ fontSize:13, color:"#93c5fd" }}>Provincia di Río Negro — Accesso riservato Max & Aris</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {data.map(p => (
          <div key={p.id} style={{ background:"white", borderRadius:12, padding:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight:700, fontSize:18, color:"#1e3a5f" }}>{p.nome}</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:12 }}>{p.provincia}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
              <div style={{ background:"#f0f9ff", borderRadius:8, padding:10 }}>
                <div style={{ fontSize:11, color:"#64748b" }}>Ettari</div>
                <div style={{ fontSize:18, fontWeight:700, color:"#1e3a5f" }}>{p.ettari.toLocaleString()}</div>
              </div>
              <div style={{ background:"#f0f9ff", borderRadius:8, padding:10 }}>
                <div style={{ fontSize:11, color:"#64748b" }}>Valutazione</div>
                <div style={{ fontSize:18, fontWeight:700, color:"#1e3a5f" }}>US${p.valutazione_usd}/ha</div>
              </div>
            </div>
            <div style={{ fontWeight:600, fontSize:13, marginBottom:8, color:"#475569" }}>Canoni Semestrali (US${p.canone_semestrale.toLocaleString()})</div>
            {p.pagamenti.map((pg, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #f1f5f9" }}>
                <span style={{ fontSize:13 }}>{pg.semestre}</span>
                <Badge color={pg.stato === "pagato" ? "green" : "gray"}>{pg.stato}</Badge>
              </div>
            ))}
            <div style={{ marginTop:12, fontSize:11, color:"#94a3b8" }}>
              Valutatore: {p.valutatore}<br/>
              Commissario: {p.commissario}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// APP PRINCIPALE
// ============================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [properties] = useState(initialProperties);
  const [scadenze, setScadenze] = useState(scadenzeData);

  const tabs = [
    { id:"dashboard", label:"📊 Dashboard" },
    { id:"proprieta", label:"🏠 Proprietà" },
    { id:"pagamenti", label:"💶 Pagamenti" },
    { id:"scadenze", label:"⚠️ Scadenze" },
    { id:"viacapo", label:"🏗 Via al Capo" },
    { id:"utenze", label:"💡 Utenze" },
    { id:"argentina", label:"🌎 Argentina" },
  ].filter(t => !user || user.access.includes(t.id));

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background:"#1e3a5f", color:"white", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:22 }}>🏛</span>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>Gestione Proprietà Blancardi</div>
            <div style={{ fontSize:11, color:"#93c5fd" }}>{user.name}</div>
          </div>
        </div>
        <button onClick={() => setUser(null)} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"white", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:12 }}>
          Esci
        </button>
      </div>

      {/* TABS */}
      <div style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"0 24px", display:"flex", gap:4, overflowX:"auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:"14px 16px", border:"none", background:"none", cursor:"pointer", fontSize:13, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? "#1e3a5f" : "#64748b", borderBottom: tab === t.id ? "3px solid #1e3a5f" : "3px solid transparent", whiteSpace:"nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENUTO */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:24 }}>
        {tab === "dashboard" && <Dashboard properties={properties} scadenze={scadenze} />}
        {tab === "proprieta" && <Proprieta properties={properties} />}
        {tab === "pagamenti" && <Pagamenti properties={properties} />}
        {tab === "scadenze" && <Scadenze scadenze={scadenze} setScadenze={setScadenze} />}
        {tab === "viacapo" && <ViaAlCapo data={initialViaAlCapo} />}
        {tab === "utenze" && <Utenze properties={properties} />}
        {tab === "argentina" && <Argentina data={argentinaData} user={user} />}
      </div>
    </div>
  );
}
