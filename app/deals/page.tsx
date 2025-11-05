'use client';
import { useEffect, useMemo, useState } from 'react';

type Deal = {
  source: string;
  label: string;
  url: string;
  est?: number;
  notes?: string;
};

export default function DealsPage(){
  const [from, setFrom] = useState('AUS');
  const [to, setTo] = useState('DEN');
  const [depart, setDepart] = useState('2026-02-18');
  const [returnDate, setReturnDate] = useState('2026-02-22');
  const [nonstop, setNonstop] = useState(true);
  const [altAirports, setAltAirports] = useState(false);
  const [mixTickets, setMixTickets] = useState(true);
  const [lcc, setLcc] = useState(true);

  const query = useMemo(()=>({from,to,depart,returnDate,nonstop,altAirports,mixTickets,lcc}),[from,to,depart,returnDate,nonstop,altAirports,mixTickets,lcc]);

  const [results, setResults] = useState<Deal[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);

  async function run(){
    setLoading(true); setError(null);
    try{
      const res = await fetch('/blog/api/deals', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(query)
      });
      const data = await res.json();
      setResults(data.deeplinks || []);
    }catch(e:any){
      setError(e?.message || 'Failed to fetch');
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ run(); },[]);

  return (
    <div className="card">
      <h1 style={{marginTop:0}}>Flight Deals</h1>
      <p>Preset based on your earlier prompts: nonstop focus, include LCCs not shown on OTAs, optional alternates, mix one-ways when cheaper.</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12 }}>
        <label>From
          <input value={from} onChange={e=>setFrom(e.target.value.toUpperCase())} placeholder="AUS" />
        </label>
        <label>To
          <input value={to} onChange={e=>setTo(e.target.value.toUpperCase())} placeholder="DEN" />
        </label>
        <label>Depart
          <input type="date" value={depart} onChange={e=>setDepart(e.target.value)} />
        </label>
        <label>Return
          <input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} />
        </label>
        <label><input type="checkbox" checked={nonstop} onChange={e=>setNonstop(e.target.checked)} /> Nonstop only</label>
        <label><input type="checkbox" checked={altAirports} onChange={e=>setAltAirports(e.target.checked)} /> Include alternates (e.g., SAT)</label>
        <label><input type="checkbox" checked={mixTickets} onChange={e=>setMixTickets(e.target.checked)} /> Mix one-ways</label>
        <label><input type="checkbox" checked={lcc} onChange={e=>setLcc(e.target.checked)} /> Include LCCs (e.g., Southwest, Frontier)</label>
      </div>

      <div style={{ marginTop:16 }}>
        <button onClick={run} disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </div>

      {error && <p style={{ color:'tomato' }}>{error}</p>}

      <div style={{ marginTop:16, display:'grid', gap:12 }}>
        {results?.map((d,i)=>(
          <a key={i} className="card" href={d.url} target="_blank" rel="noreferrer">
            <strong>{d.source}</strong>
            <div>{d.label}</div>
            {d.notes && <small>{d.notes}</small>}
          </a>
        ))}
      </div>
    </div>
  );
}
