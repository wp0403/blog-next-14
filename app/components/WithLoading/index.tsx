import React, { useState } from "react";
import Loading from "../../loading";

const withLoading = (WrappedComponent) => {
  return (props) => {
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
};

export default withLoading;
