export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export const formatPrice = (price: number): string => {
  if (price === 0) return 'Free'
  return `$${price.toFixed(2)}`
}

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
}

export const calculateProgress = (completed: number, total: number): number => {
  if (!total) return 0
  return Math.round((completed / total) * 100)
}

export const truncateText = (text: string, length: number): string => {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}
