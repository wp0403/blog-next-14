/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-05-25 15:08:05
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-12-20 10:29:45
 */
import { useEffect } from 'react';

function useWindow(props: { callback: Function; }) {
    const { callback } = props;
    useEffect(() => {
        // 客户端环境下才执行
        if (typeof window !== 'undefined') {
            callback && callback()
        }
    }, []);

    return {};
}

export default useWindow;