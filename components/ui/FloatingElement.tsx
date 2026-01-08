'use client'

import { motion, useSpring, useTransform, MotionValue, useMotionTemplate } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface FloatingElementProps {
  children: ReactNode
  amplitude?: number // 浮遊の振幅
  duration?: number // アニメーションの時間（秒）
  delay?: number // 遅延時間
  parallax?: boolean // スクロール параллаックス効果
  className?: string
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 3,
  delay = 0,
  parallax = false,
  className = '',
}: FloatingElementProps) {
  // 浮遊アニメーション
  const y = useRef(0)

  useEffect(() => {
    const animate = () => {
      y.current = Math.sin(Date.now() / 1000 / duration * 2 * Math.PI) * amplitude
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [amplitude, duration])

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, amplitude, 0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        y,
      }}
    >
      {children}
    </motion.div>
  )
}

// マウス追従 параллаックス要素
interface ParallaxMouseProps {
  children: ReactNode
  depth?: number // 奥行き（1に近いほど浅い）
  className?: string
}

export function ParallaxMouse({ children, depth = 0.1, className = '' }: ParallaxMouseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMouseX((e.clientX - centerX) * depth)
        setMouseY((e.clientY - centerY) * depth)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [depth])

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: mouseX,
        y: mouseY,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

// スクロール параллаックス
interface ParallaxScrollProps {
  children: ReactNode
  speed?: number // スクロール速度（正の値は遅い）
  className?: string
}

export function ParallaxScroll({ children, speed = 0.5, className = '' }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const progress = (rect.top + rect.height) / (viewportHeight + rect.height)
        setOffset((progress - 0.5) * speed * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ y: offset }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

// パーティクル効果
interface ParticleProps {
  count?: number
  className?: string
}

export function ParticleField({ count = 20, className = '' }: ParticleProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// グロー効果（呼吸するように光る）
interface GlowProps {
  children: ReactNode
  color?: string
  size?: number
  className?: string
}

export function GlowBreath({ children, color = 'rgba(139, 92, 246, 0.6)', size = 200, className = '' }: GlowProps) {
  return (
    <div className={`relative ${className}`}>
      {/* グロー効果 */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl -z-10"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          width: size,
          height: size,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </div>
  )
}

// タイポアニメーション（文字が順に現れる）
interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 0.05, className = '' }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed * 1000)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <motion.span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.span>
  )
}
