// components/GoogleAd/GoogleAd.tsx

import { useEffect } from 'react';

interface GoogleAdProps {
    adSlot: string;
    adFormat?: string;
    fullWidthResponsive?: boolean;
  }

const GoogleAd: React.FC<GoogleAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9868429025931364"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    ></ins>
  );
};

export default GoogleAd;