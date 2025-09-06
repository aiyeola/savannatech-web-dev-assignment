import { useState } from "react";
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

type ErrorFallbackRenderProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function ErrorFallbackRender({
  error,
  resetErrorBoundary,
}: ErrorFallbackRenderProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 border border-red-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-600">
              We encountered an unexpected error
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            {error.message || "An unknown error occurred"}
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showDetails ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            {showDetails ? "Hide" : "Show"} technical details
          </button>

          {showDetails && (
            <div className="mt-3 p-3 bg-gray-100 rounded border text-xs font-mono text-gray-700 max-h-32 overflow-auto">
              <div className="mb-2">
                <strong>Error:</strong> {error.name}
              </div>
              <div className="mb-2">
                <strong>Message:</strong> {error.message}
              </div>
              {error.stack && (
                <div>
                  <strong>Stack trace:</strong>
                  <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Reload page
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            If this problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}
