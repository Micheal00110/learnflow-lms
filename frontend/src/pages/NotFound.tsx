export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-slideUp">
        <h1 className="text-8xl font-black text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  )
}
