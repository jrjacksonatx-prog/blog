import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client-only button to avoid "event handler" errors
const MDXButton = dynamic(() => import('./MDXButton'), { ssr: false });

export const MDXComponents = {
  // Custom heading style
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ marginTop: 28 }} {...props} />
  ),

  // Register client-safe interactive component
  MDXButton,
};

