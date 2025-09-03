import React from "react";

export default function ErrorFallbackRender({ error, resetErrorBoundary }) {
  console.log("error: ", error);
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
