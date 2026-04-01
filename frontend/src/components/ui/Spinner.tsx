export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="spinner" />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}
