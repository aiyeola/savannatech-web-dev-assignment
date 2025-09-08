import { AlertTriangle, RefreshCw } from "lucide-react";

type ErrorFallbackRenderProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function ErrorFallbackRender({
  error,
  resetErrorBoundary,
}: ErrorFallbackRenderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl rounded-lg border border-red-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center">
          <AlertTriangle className="mr-3 h-8 w-8 text-red-500" />
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
          <p className="mb-4 text-gray-700">
            {error.message || "An unknown error occurred"}
          </p>

          <div className="max-h-50 mt-3 overflow-auto rounded border bg-gray-100 p-3 font-mono text-xs text-gray-700">
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
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
