import "./globals.css";
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://sugu-study.com'),
  title: {
    template: '%s | Sugu-Study',
    default: 'Sugu-Study - 特定技能2号試験対策',
  },
  description: '特定技能2号試験の合格を目指す外国人労働者のための学習プラットフォーム',
  keywords: ['特定技能2号', '試験対策', '農業', '畜産', '外国人労働者', 'オンライン学習'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
