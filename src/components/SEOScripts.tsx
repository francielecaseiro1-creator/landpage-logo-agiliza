import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { useLocation } from 'react-router-dom';

interface SiteSettings {
  facebookPixelId?: string;
  facebookDomainVerification?: string;
  googleAdsId?: string;
}

export function SEOScripts() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as SiteSettings);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Inject Facebook Pixel Shim immediately
  useEffect(() => {
    // @ts-ignore
    if (window.fbq) return;

    console.log("Injecting Facebook Pixel Shim");
    // @ts-ignore
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  }, []);

  // Initialize and Track PageView when settings are available
  useEffect(() => {
    const pixelId = settings?.facebookPixelId?.trim();
    if (!pixelId) return;

    console.log("Initializing Facebook Pixel with ID:", pixelId);

    // @ts-ignore
    window.fbq('init', pixelId);
    
    // Track PageView on route change
    console.log("Tracking PageView for:", location.pathname);
    // @ts-ignore
    window.fbq('track', 'PageView');

  }, [settings?.facebookPixelId, location]);

  if (!settings) return null;

  return (
    <Helmet>
      {/* Facebook Domain Verification */}
      {settings.facebookDomainVerification && (
        <meta name="facebook-domain-verification" content={settings.facebookDomainVerification} />
      )}

      {/* Facebook Pixel NoScript */}
      {settings.facebookPixelId && (
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${settings.facebookPixelId}&ev=PageView&noscript=1"
            />
          `}
        </noscript>
      )}

      {/* Google Ads */}
      {settings.googleAdsId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAdsId}`}></script>
      )}
      {settings.googleAdsId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${settings.googleAdsId}');
          `}
        </script>
      )}
    </Helmet>
  );
}
