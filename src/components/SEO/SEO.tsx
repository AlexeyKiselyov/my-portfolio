import React, { useEffect } from 'react';
import {
  BASE_SEO_DATA,
  STRUCTURED_DATA,
  PAGE_SEO_DATA,
} from '../../constants/seo';

interface SEOProps {
  page?: keyof typeof PAGE_SEO_DATA;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ page, canonical }) => {
  const pageData = page ? PAGE_SEO_DATA[page] : null;

  useEffect(() => {
    // Helpers
    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const setJSONLD = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    // Compute values
    const title = pageData?.title || BASE_SEO_DATA.title;
    const description = pageData?.description || BASE_SEO_DATA.description;
    const keywords = BASE_SEO_DATA.keywords;
    const author = BASE_SEO_DATA.author;
    const canonicalHref = canonical || window.location.href;

    // Apply to document
    document.title = title;
    setMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    setMeta('meta[name="author"]', { name: 'author', content: author });

    // Open Graph (basic)
    setMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    setMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    setMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });
    setMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalHref,
    });

    // Twitter (basic)
    setMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    setMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    // Canonical link
    setLink('canonical', canonicalHref);

    // JSON-LD
    setJSONLD('structured-data', STRUCTURED_DATA);

    // Note: do NOT touch charset/viewport here to avoid duplicate tags with index.html
  }, [pageData, canonical]);

  return null;
};

export default SEO;
