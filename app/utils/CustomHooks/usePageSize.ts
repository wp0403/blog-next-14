import React, { useState, useEffect } from "react";

const usePageSize = (props: { id: string }) => {
  const { id } = props;
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = () => {
    setPageWidth(document.getElementById(id)?.offsetWidth || 0);
    setLoading(false);
  };

  const pageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("resize", pageSize);
    window.addEventListener("load", pageLoad);
    return () => {
      window.removeEventListener("resize", pageSize);
      window.removeEventListener("load", pageLoad);
    };
  }, []);

  return {
    pageWidth: pageWidth - 3,
    pageSizeLoading: loading,
  };
};

export default usePageSize;
