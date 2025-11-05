import { NextResponse } from 'next/server';

type Body = {
  from: string;
  to: string;
  depart: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  nonstop?: boolean;
  altAirports?: boolean;
  mixTickets?: boolean;
  lcc?: boolean;
};

function gf(from: string, to: string, depart: string, ret: string){
  return `https://www.google.com/travel/flights?q=Flights%20from%20${from}%20to%20${to}%20on%20${depart}%20through%20${ret}`;
}
function kayak(from: string, to: string, depart: string, ret: string, nonstop:boolean){
  const ns = nonstop ? 'fs=stops=0' : '';
  return `https://www.kayak.com/flights/${from}-${to}/${depart}/${ret}?${ns}`;
}
function ua(from: string, to: string, depart: string, ret: string){
  return `https://www.united.com/en/us/fsr/choose-flights?f=${from}&t=${to}&d=${depart}&r=${ret}&sc=7,7&px=1&taxng=1`;
}
function wn(from: string, to: string, depart: string, ret: string){
  return `https://www.southwest.com/air/booking/select.html?originationAirportCode=${from}&destinationAirportCode=${to}&departureDate=${depart}&returnDate=${ret}&adultPassengersCount=1&tripType=roundtrip`;
}
function f9(from: string, to: string, depart: string, ret: string){
  return `https://www.flyfrontier.com/booking/search?from=${from}&to=${to}&departDate=${depart}&returnDate=${ret}&adults=1`;
}
function aa(from: string, to: string, depart: string, ret: string){
  return `https://www.aa.com/booking/flights/choose-flights?tripType=roundTrip&from=${from}&to=${to}&departDate=${depart}&returnDate=${ret}&passenger=1`;
}

export async function POST(req: Request){
  const body = (await req.json()) as Body;
  const { from, to, depart, returnDate, nonstop = true, altAirports=false, mixTickets=true, lcc=true } = body;

  const deeplinks = [
    { source:'Google Flights', label:'Meta search', url: gf(from,to,depart,returnDate), notes:'Great for overall price map' },
    { source:'Kayak', label: nonstop? 'Nonstop filter applied' : 'All flights', url: kayak(from,to,depart,returnDate,nonstop) },
    { source:'United', label:'Hub at DEN (nonstop options)', url: ua(from,to,depart,returnDate) },
  ] as any[];

  if(lcc){
    deeplinks.push({ source:'Southwest', label:'Often not on OTAs', url: wn(from,to,depart,returnDate) });
    deeplinks.push({ source:'Frontier', label:'Ultra-low fares (bags extra)', url: f9(from,to,depart,returnDate) });
  }
  deeplinks.push({ source:'American', label:'Check for fare sales', url: aa(from,to,depart,returnDate) });

  if(altAirports){
    const sat = 'SAT';
    deeplinks.push({ source:'Alt Airport (SAT→DEN) via Google Flights', label:'Sometimes cheaper', url: gf(sat, to, depart, returnDate) });
  }

  return NextResponse.json({ deeplinks });
}
