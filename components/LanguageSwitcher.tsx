'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
]

interface LanguageSwitcherProps {
    currentLocale: string
    variant?: 'default' | 'hero'
}

export function LanguageSwitcher({ currentLocale, variant = 'default' }: LanguageSwitcherProps) {
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (locale: string) => {
        // Remove current locale from path
        const segments = pathname.split('/')
        const localeIndex = segments.findIndex(s => languages.some(l => l.code === s))

        if (localeIndex > -1) {
            segments[localeIndex] = locale
        } else {
            segments.splice(1, 0, locale)
        }

        const newPath = segments.join('/') || '/'
        router.push(newPath)
    }

    if (variant === 'hero') {
        return (
            <div className="flex flex-wrap justify-center gap-2">
                {languages.map((lang) => (
                    <Button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        variant={currentLocale === lang.code ? 'default' : 'outline'}
                        size="sm"
                        className={
                            currentLocale === lang.code
                                ? 'bg-white text-indigo-600 hover:bg-gray-100'
                                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                        }
                    >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.name}
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-600" />
            <select
                value={currentLocale}
                onChange={(e) => switchLanguage(e.target.value)}
                className="bg-transparent border rounded px-2 py-1 text-sm"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
