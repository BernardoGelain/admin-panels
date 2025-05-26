"use client";

import React, { Suspense, ComponentType } from "react";

type FallbackProps = {
  className?: string;
};

const DefaultFallback: React.FC<FallbackProps> = ({ className = "" }) => (
  <div className={`flex items-center justify-center p-4 ${className}`}>
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

type WithSuspenseOptions = {
  fallback?: ComponentType<FallbackProps>;
  errorBoundary?: boolean;
};

function withSuspense<T extends object>(
  WrappedComponent: ComponentType<T>,
  options: WithSuspenseOptions = {}
): ComponentType<T> {
  const { fallback: FallbackComponent = DefaultFallback } = options;

  const WithSuspenseWrapper: React.FC<T> = (props) => {
    return (
      <Suspense fallback={<FallbackComponent />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  WithSuspenseWrapper.displayName = `WithSuspense(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithSuspenseWrapper;
}

export type { WithSuspenseOptions, FallbackProps };
export default withSuspense;
