export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />
}

export function CourseCardSkeleton() {
  return (
    <div className="card p-0 overflow-hidden">
      <Skeleton className="w-full h-44 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="clay-stat">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-8 w-16" />
    </div>
  )
}
