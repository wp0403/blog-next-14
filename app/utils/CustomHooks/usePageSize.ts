import { useIsomorphicLayoutEffect } from 'ahooks';
import React, { useState } from 'react';

const usePageSize = (props: { id: string; }) => {
    const { id } = props;
    const [pageWidth, setPageWidth] = useState<number>(0)
    const pageSize = () => {
        setPageWidth(document.getElementById(id)?.offsetWidth || 0);
    }
    useIsomorphicLayoutEffect(() => {
        window.addEventListener('resize', pageSize);
        pageSize();
        return () => {
            window.removeEventListener('resize', pageSize);
        }
    }, [])
    
    return {
        pageWidth: pageWidth - 3,
    };
};

export default usePageSize;