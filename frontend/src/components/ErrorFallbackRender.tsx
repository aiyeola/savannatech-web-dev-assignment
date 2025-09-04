type ErrorFallbackRenderProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function ErrorFallbackRender({
  error,
  resetErrorBoundary,
}: ErrorFallbackRenderProps) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
