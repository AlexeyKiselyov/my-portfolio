import React from 'react';

/**
 * Function for safely converting HTML <br> tags to React elements
 * @param htmlString - string containing HTML <br> tags
 * @returns React elements with line breaks
 */
export const parseTextToReact = (htmlString: string): React.ReactNode => {
  // 1) Split by <br> tags (supports <br>, <br/>, <BR>) to preserve line breaks
  const lines = htmlString.split(/<br\s*\/?>/i);

  // 2) Render each line with link parsing
  const renderWithLinks = (text: string, baseKey: string) => {
    const nodes: React.ReactNode[] = [];

    // First, parse Markdown links: [label](https://url)
    const mdLinkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = mdLinkRe.exec(text)) !== null) {
      const [full, label, url] = match;
      const start = match.index;
      if (start > lastIdx) {
        nodes.push(text.slice(lastIdx, start));
      }
      nodes.push(
        React.createElement(
          'a',
          {
            key: `${baseKey}-md-${start}`,
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'text-link',
          },
          label
        )
      );
      lastIdx = start + full.length;
    }
    if (lastIdx < text.length) nodes.push(text.slice(lastIdx));

    // Then, auto-link any remaining raw URLs in string fragments
    const urlRe = /(https?:\/\/[^\s<]+)/g;
    const autoLinked: React.ReactNode[] = [];
    nodes.forEach((n, idx) => {
      if (typeof n !== 'string') {
        autoLinked.push(n);
        return;
      }
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = urlRe.exec(n)) !== null) {
        const [url] = m;
        const start = m.index;
        if (start > last) autoLinked.push(n.slice(last, start));
        autoLinked.push(
          React.createElement(
            'a',
            {
              key: `${baseKey}-url-${idx}-${start}`,
              href: url,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'text-link',
            },
            url
          )
        );
        last = start + url.length;
      }
      if (last < n.length) autoLinked.push(n.slice(last));
    });

    return autoLinked;
  };

  return lines.map((line, i) =>
    React.createElement(
      React.Fragment,
      { key: `ln-${i}` },
      ...renderWithLinks(line, `ln-${i}`),
      i < lines.length - 1
        ? React.createElement('br', { key: `br-${i}` })
        : null
    )
  );
};
