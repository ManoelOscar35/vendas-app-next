import type { Metadata } from 'next';
import 'bulma/css/bulma.css';
import '@/components/common/loader/loader.css';

export const metadata: Metadata = {
  title: 'Vendas App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
