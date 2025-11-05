'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const [dark, setDark] = useState(false);
  useEffect(()=>{
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
  },[]);
  function toggle(){
    setDark(!dark);
    document.documentElement.style.colorScheme = !dark ? 'dark' : 'light';
  }
  return <button className="theme-toggle" onClick={toggle}>{dark ? '🌙' : '☀️'}</button>;
}
