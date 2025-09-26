import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { monthsDiff } from '../../../utils';

import styles from '../AboutMePage.module.css';

import type { Snippet } from '../../../types/developer';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface GistSnippetProps {
  snippet: Snippet;
}

const GistSnippet: React.FC<GistSnippetProps> = ({ snippet }) => {
  const [animation, setAnimation] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null);
  const [codeStyle, setCodeStyle] = useState<any>(null);

  useEffect(() => {
    setAnimation(true);
  }, [snippet]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [prismLightMod, styleMod] = await Promise.all([
          import('react-syntax-highlighter/dist/esm/prism-light'),
          import('react-syntax-highlighter/dist/esm/styles/prism'),
        ]);

        const [tsMod, jsMod] = await Promise.all([
          import(
            'react-syntax-highlighter/dist/esm/languages/prism/typescript'
          ),
          import(
            'react-syntax-highlighter/dist/esm/languages/prism/javascript'
          ),
        ]);

        if (!mounted) return;
        prismLightMod.default.registerLanguage(
          'typescript',
          (tsMod as any).default
        );
        prismLightMod.default.registerLanguage(
          'javascript',
          (jsMod as any).default
        );

        setSyntaxHighlighter(() => prismLightMod.default);
        setCodeStyle(styleMod.vscDarkPlus);
      } catch (e) {
        console.error('Failed to load light prism bundle', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleComment = () => setShowComment(v => !v);

  return (
    <div
      id="snippet"
      className={clsx('gist mb-5', animation ? 'fadeIn' : 'animHidden')}
    >
      {/* Head info */}
      <div className="flex justify-between my-2">
        <div className="flex">
          {/* Avatar */}
          <img
            src={snippet.author.avatarUrl}
            alt=""
            className="w-8 h-8 rounded-full mr-3"
          />

          {/* Username & gist date info */}
          <div className="flex flex-col">
            <a
              href={snippet.author.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-fira_bold text-purple-text text-xs pb-1 cursor-pointer hover:text-[#5e6ef2]"
            >
              @{snippet.author.login}
            </a>
            <p className="font-fira_retina text-xs text-menu-text">
              Created {monthsDiff(snippet.createdAt)} months ago
            </p>
          </div>
        </div>

        {/* Details and stars */}
        <div className="flex text-menu-text font-fira_retina text-xs justify-self-end lg:mx-2">
          <div
            className="flex lg:mx-2 hover:cursor-pointer hover:text-white"
            onClick={() => toggleComment()}
          >
            <img
              src="/icons/gist/comments.svg"
              alt=""
              className="w-4 h-4 mr-2"
            />
            <span>details</span>
          </div>
        </div>
      </div>

      {/* Snippet */}
      <div className={styles.snippetContainer}>
        <SimpleBar
          className={clsx(
            'flex flex-col w-full scroll-bar',
            styles.snippetScroll
          )}
          style={{ maxHeight: 240 }}
        >
          {SyntaxHighlighter && codeStyle ? (
            <SyntaxHighlighter
              language={
                ['javascript', 'js'].includes(
                  (snippet.language || '').toLowerCase()
                )
                  ? 'javascript'
                  : 'typescript'
              }
              style={codeStyle}
              showLineNumbers={false}
              wrapLines={true}
              customStyle={{
                background: 'transparent',
                padding: '1rem',
                margin: 0,
                fontSize: '12px',
                fontFamily: 'Fira Code, Monaco, Consolas, monospace',
              }}
              codeTagProps={{
                style: {
                  whiteSpace: 'pre-wrap',
                  width: 'max-content',
                  fontFamily: 'inherit',
                },
              }}
            >
              {snippet.code || ''}
            </SyntaxHighlighter>
          ) : (
            <pre
              style={{
                background: 'transparent',
                padding: '1rem',
                margin: 0,
                fontSize: '12px',
                fontFamily: 'Fira Code, Monaco, Consolas, monospace',
                opacity: 0.6,
              }}
            >
              {snippet.code || ''}
            </pre>
          )}
        </SimpleBar>
      </div>

      {/* Description */}
      <div
        className={clsx(
          'flex justify-between text-menu-text font-fira_retina mt-4 pt-4 border-top',
          styles.commentContainer,
          {
            [styles.commentHidden]: !showComment,
          }
        )}
      >
        {snippet.description ? (
          <p className="w-5/6 text-sm">{snippet.description}</p>
        ) : (
          <p className="w-5/6 text-sm">No description.</p>
        )}
        <img
          src="/icons/close.svg"
          alt=""
          className="cursor-pointer hover-svg"
          onClick={() => toggleComment()}
        />
      </div>
    </div>
  );
};

export default GistSnippet;
