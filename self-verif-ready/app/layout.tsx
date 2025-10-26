export const metadata = {
  title: 'Self Verif Demo',
  description: 'Next.js + Self Protocol demo'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', background: '#0b0f14', color: '#e6f0ff' }}>
        {children}
      </body>
    </html>
  );
}
