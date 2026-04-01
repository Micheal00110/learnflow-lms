import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Free'
  return `$${price.toFixed(2)}`
}

export function getInitials(first?: string, last?: string): string {
  return `${(first || '')[0] || ''}${(last || '')[0] || ''}`.toUpperCase()
}

export function truncate(text: string, max: number): string {
  if (!text || text.length <= max) return text || ''
  return text.slice(0, max) + '...'
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(date).toLocaleDateString()
}
