import React, { useState, useEffect } from "react";

const usePageSize = (props: { id: string }) => {
  const { id } = props;
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = () => {
    setPageWidth(document.getElementById(id)?.offsetWidth || 0);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("resize", pageSize);
    pageSize();

    return () => {
      window.removeEventListener("resize", pageSize);
    };
  }, []);

  return {
    pageWidth: pageWidth - 3,
    pageSizeLoading: loading,
  };
};

export default usePageSize;
