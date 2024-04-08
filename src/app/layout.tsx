
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import AuthProvider from './_component/Provider/authProvider'
const inter = Inter({ subsets: ['latin'] })
type Props={children: ReactNode}

export const metadata: Metadata = {
  title: 'Weblog',
  description: 'Generated by Buglfix',
}

export default function RootLayout({
  children
}: Props) {
  return (
    <html lang="en">
      
        <AuthProvider>
      <body className={inter.className}> 
        {children}
        </body>
        </AuthProvider>
        
    </html>
  )
}
