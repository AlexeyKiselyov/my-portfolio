import React, { useEffect, useRef, useState } from 'react';
import { parseTextToReact } from '../../../utils';

interface CommentedTextProps {
  text: string;
}

const CommentedText: React.FC<CommentedTextProps> = ({ text }) => {
  const [lines, setLines] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const updateLines = () => {
    if (textContainerRef.current) {
      const style = window.getComputedStyle(textContainerRef.current);
      const lineHeight = parseInt(style.lineHeight || '0', 10);
      const maxHeight = textContainerRef.current.offsetHeight;
      setLines(Math.ceil(maxHeight / lineHeight) + 1);
    }
  };

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    window.addEventListener('click', updateLines);

    return () => {
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('click', updateLines);
    };
  }, []);

  return (
    <div className="flex items-start font-fira_retina text-menu-text">
      <div className="lg:flex flex-col w-32 text-right hidden">
        {Array.from({ length: lines }, (_, i) => i + 1).map(n => (
          <div className="grid grid-cols-2 justify-end" key={n}>
            <span className="col-span-1 mr-3">{n}</span>
            {n === 1 && (
              <div className="col-span-1 flex justify-center">/**</div>
            )}
            {n > 1 && n < lines && (
              <div className="col-span-1 flex justify-center">*</div>
            )}
            {n === lines && (
              <div className="col-span-1 flex justify-center pl-2">*/</div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full pl-0 wrap-break-word" ref={textContainerRef}>
        <p>{parseTextToReact(text)}</p>
      </div>
    </div>
  );
};

export default CommentedText;
