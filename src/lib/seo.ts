interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

export function generatePageMeta({
  title,
  description,
  keywords = 'EdTech, educación, tecnología, Colombia, transformación educativa',
  canonical
}: PageMeta) {
  // Ensure description is under 150 characters
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 147) + '...'
    : description;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return {
    title: `${title} | Colombia EdTech`,
    description: truncatedDescription,
    keywords,
    canonical: canonical || currentUrl,
    ogTitle: `${title} | Colombia EdTech`,
    ogDescription: truncatedDescription,
    ogImage: '/og-image.jpg', // Placeholder
    twitterCard: 'summary_large_image',
    twitterTitle: `${title} | Colombia EdTech`,
    twitterDescription: truncatedDescription,
    twitterImage: '/og-image.jpg' // Placeholder
  };
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://colombiaedtech.org';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": item.item
      }))
    ]
  };
}

export function generateOrganizationJsonLd() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://colombiaedtech.org';
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Colombia EdTech",
    "description": "Fortaleciendo el ecosistema EdTech colombiano a través de la colaboración, investigación y políticas públicas",
    "url": baseUrl,
    "logo": `${baseUrl}/logo-placeholder.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-1-234-5678",
      "contactType": "customer service",
      "email": "info@colombiaedtech.org"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO",
      "addressLocality": "Bogotá"
    },
    "sameAs": [
      "https://linkedin.com/company/colombiaedtech",
      "https://twitter.com/colombiaedtech"
    ]
  };
}

// GA4 Event tracking helpers
export function trackCTA(action: string, label?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: 'cta',
      event_label: label,
      transport_type: 'beacon'
    });
  }
}

// Default Open Graph helper
export function getDefaultOpenGraph() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://colombiaedtech.org';
  
  return {
    title: 'Colombia EdTech | Transformando la educación con tecnología',
    description: 'Fortalecemos el ecosistema EdTech colombiano conectando organizaciones, impulsando la investigación y desarrollando políticas públicas',
    image: `${baseUrl}/og-image.jpg`,
    url: baseUrl,
    siteName: 'Colombia EdTech',
    type: 'website'
  };
}

// Event tracking constants
export const GA_EVENTS = {
  CTA_ASSOCIATE_CLICK: 'cta_associate_click',
  VOLUNTEER_APPLY_CLICK: 'volunteer_apply_click', 
  ALLY_CONTACT_CLICK: 'ally_contact_click'
} as const;