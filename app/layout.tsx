import React from 'react';

export const metadata = {
  title: 'OpenAI Streaming Chat Comparison',
  description: 'Compare different models and stream responses.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
