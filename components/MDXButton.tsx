'use client';

export default function MDXButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => alert(`You clicked: ${label}`)}
      style={{
        padding: '8px 16px',
        border: '1px solid #999',
        borderRadius: 6,
        cursor: 'pointer',
        background: '#222',
        color: '#fff'
      }}
    >
      {label}
    </button>
  );
}

