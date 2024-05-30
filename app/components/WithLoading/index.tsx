import React, { useState } from "react";
import Loading from "../../loading";

const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoaded = () => {
      setIsLoading(false);
    };

    return (
      <>
        {isLoading && <Loading />}
        <WrappedComponent
          {...props}
          loading={isLoading}
          onLoaded={handleLoaded}
        />
      </>
    );
  };

  // 设置 displayName 帮助调试
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithLoadingComponent.displayName = `WithLoading(${wrappedComponentName})`;

  return WithLoadingComponent;
};

export default withLoading;
