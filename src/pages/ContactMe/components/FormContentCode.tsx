import React, { useEffect, useRef, useState } from 'react';

interface FormContentCodeProps {
  name: string;
  email: string;
  message: string;
}

const FormContentCode: React.FC<FormContentCodeProps> = ({
  name,
  email,
  message,
}) => {
  const [date] = useState(new Date().toDateString());
  const [lines, setLines] = useState(0);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    const recomputeLineCount = () => {
      const computed = window.getComputedStyle(container);
      const fontSizePx = parseFloat(computed.fontSize || '16');
      const effectiveLineHeight =
        computed.lineHeight === 'normal'
          ? fontSizePx * 1.2
          : parseFloat(computed.lineHeight || `${fontSizePx * 1.2}`);
      const containerHeight = container.offsetHeight;
      setLines(Math.max(1, Math.ceil(containerHeight / effectiveLineHeight)));
    };

    // Initial compute
    recomputeLineCount();

    // Observe size changes without attaching global listeners
    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => recomputeLineCount());
      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [name, email, message]);

  return (
    <div className="flex items-start mx-auto max-w-[520px] font-fira_retina text-menu-text">
      {/* Lines */}
      <div className="text-right lg:flex flex-col min-w-8 w-16 hidden">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="grid grid-cols-2 justify-end">
            <span className="col-span-1 mr-3">{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        id="text-container"
        ref={textRef}
        className="flex-1 min-w-0 pl-0 font-fira_retina wrap-break-word text-white"
      >
        <p>
          <span className="tag">const</span>
          <span className="tag-name"> button = </span>
          <span className="tag-name">document.querySelector</span>
          <span className="text-menu-text">
            (<span className="text-codeline-link">'#sendBtn'</span>
            );
          </span>
        </p>

        <br />

        <p className="text-menu-text">
          <span className="tag">const</span>
          <span className="tag-name"> message = </span> {'{'}
          <br /> &nbsp;&nbsp;
          <span id="name" className="tag-name">
            name:
          </span>
          <span id="name-value" className="text-codeline-link">
            {` "${name}"`}
          </span>
          ,
          <br /> &nbsp;&nbsp;
          <span id="email" className="tag-name">
            email:
          </span>
          <span id="email-value" className="text-codeline-link">
            {` "${email}"`}
          </span>
          ,
          <br /> &nbsp;&nbsp;
          <span id="message" className="tag-name">
            message:
          </span>
          <span
            id="message-value"
            className="text-codeline-link break-words break-all whitespace-pre-wrap"
          >
            {` "${message}"`}
          </span>
          ,
          <br /> &nbsp;&nbsp;
          <span id="date" className="tag-name">
            date:
          </span>
          <span className="text-codeline-link"> "{date}"</span>
          <br />
          {'}'}
        </p>

        <br />

        <p>
          <span className="tag-name">button.addEventListener</span>
          <span className="text-menu-text">
            <span>(</span>
            <span className="text-codeline-link">'click'</span>, (){' '}
            <span className="tag">=&gt;</span> {'{'}
            <br />
          </span>
          &nbsp;&nbsp; <span className="tag-name">form.send</span>
          <span className="text-menu-text">(</span>
          <span className="tag-name">message</span>
          <span className="text-menu-text">
            ); <br /> {'})'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FormContentCode;
