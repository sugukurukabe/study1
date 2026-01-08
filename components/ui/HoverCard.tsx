'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  scale?: number
  glowColor?: string
  shineEffect?: boolean
}

export function HoverCard({
  children,
  scale = 1.02,
  glowColor = 'rgba(139, 92, 246, 0.5)',
  shineEffect = true,
  className = '',
  ...props
}: HoverCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        scale,
        y: -4,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      {...props}
    >
      {/* グロー効果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          boxShadow: `0 0 30px 10px ${glowColor}`,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/*  shine 効果 */}
      {shineEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </motion.div>
      )}

      {/* スケールイン時の枠線効果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none border-2 border-transparent rounded-lg"
        whileHover={{
          borderColor: glowColor,
        }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  )
}

// シンプルなホバーエフェクト付きボタン
interface HoverButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

export function HoverButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: HoverButtonProps) {
  const baseStyles = 'relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-colors'
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-500',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  }

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.4)',
      }}
      whileTap={{
        scale: 0.98,
      }}
      {...props}
    >
      {/* 光るエフェクト */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
        }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </motion.button>
  )
}

// アイコン付きホバーエフェクト
interface IconButtonProps extends HTMLMotionProps<'button'> {
  icon: ReactNode
  label: string
}

export function IconButton({ icon, label, className = '', ...props }: IconButtonProps) {
  return (
    <motion.button
      className={`relative p-3 rounded-full bg-white/10 backdrop-blur-sm text-white ${className}`}
      whileHover={{
        scale: 1.1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
      whileTap={{
        scale: 0.95 }}
      title={label}
      {...props}
    >
      {icon}
    </motion.button>
  )
}

// バウンスアニメーション付きのコンテナ
interface BounceContainerProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function BounceContainer({ children, delay = 0, className = '' }: BounceContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
