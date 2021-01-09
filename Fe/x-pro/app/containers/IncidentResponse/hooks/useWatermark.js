import { useEffect } from 'react';
import watermark from '@utils/watermark';

const useWatermark = (name = '', phone = '', statusStr = '') => {
    // 给网页添加水印
    useEffect(() => {
        watermark.load({
            watermark_txt: `${name} ${phone} 1 ${statusStr}`,
            watermark_width: 500,
            watermark_x: -140,
        });
        return () => {
            watermark.remove();
        };
    }, [name, phone, statusStr]);
};
export default useWatermark;
