import React, { useEffect, useRef, useState } from 'react';
import { parseTextToReact } from '../../../utils';
import type {
  ExperienceConfig,
  SkillConfig,
  TextConfig,
  LanguageConfig,
  EducationConfig,
  FileConfig,
  StructuredContent,
} from '../../../types/developer';

interface CommentedTextProps {
  text: string | StructuredContent;
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
    // Timeout to ensure content is rendered before calculating height
    const timeout = setTimeout(updateLines, 100);

    return () => {
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('click', updateLines);
      clearTimeout(timeout);
    };
  }, [text]);

  // --- Render Helpers for Structured Content ---

  const renderExperience = (data: ExperienceConfig) => (
    <>
      {data.intro && parseTextToReact(data.intro)}
      {data.intro && (
        <>
          <br />
          <br />
        </>
      )}

      {parseTextToReact('\u2003**WORK EXPERIENCE ⬇️**')}
      <br />

      {data.jobs.map((job, index) => {
        const techStackStr = job.techStack ? ` | ${job.techStack}` : '';
        const header = `<br>**· ${job.role}**${techStackStr}`;
        const subHeader = `<br>\u2003**${job.company}** | ${job.period} | ${job.location}`;

        return (
          <React.Fragment key={index}>
            {parseTextToReact(header)}
            {parseTextToReact(subHeader)}
            {job.description.map((desc, i) => (
              <React.Fragment key={i}>
                <br />
                {parseTextToReact(`- ${desc}`)}
              </React.Fragment>
            ))}
            {index < data.jobs.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );

  const renderSkills = (data: SkillConfig) => (
    <>
      {data.title && (
        <>
          {parseTextToReact(data.title)}
          <br />
          <br />
        </>
      )}
      {data.groups.map((group, index) => (
        <React.Fragment key={index}>
          <br />
          {parseTextToReact(`· **${group.title}**: `)}
          <br />
          {parseTextToReact(group.items.join(', '))}
          {index < data.groups.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  const renderLanguages = (data: LanguageConfig) => (
    <>
      {data.languages.map((lang, index) => (
        <React.Fragment key={index}>
          <br />
          {parseTextToReact(`**${lang.language}** — ${lang.level}`)}
          {index < data.languages.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  const renderText = (data: TextConfig) => (
    <>
      {data.paragraphs.map((p, index) => (
        <React.Fragment key={index}>
          <br />
          {parseTextToReact(p)}
          {index < data.paragraphs.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );

  const renderEducation = (data: EducationConfig) => (
    <>
      {data.list.map((item, index) => {
        const linkMD = item.certificateLink
          ? ` [Certificate](${item.certificateLink})`
          : '';
        const header = `<br>· ${item.institution}`;
        const subHeader = `${item.period} · ${item.location}`;
        const subHeader2 = `${item.degree}${linkMD}`;

        return (
          <React.Fragment key={index}>
            {parseTextToReact(header)}
            <br />
            {parseTextToReact(subHeader)}
            <br />
            {parseTextToReact(subHeader2)}

            {item.certificates && item.certificates.length > 0 && (
              <>
                <br />
                <br />
                {item.certificates.map((cert, cIndex) => (
                  <React.Fragment key={cIndex}>
                    {parseTextToReact(
                      `${cert.name} — [Certificate](${cert.url})`
                    )}
                    {cIndex < (item.certificates?.length || 0) - 1 && <br />}
                  </React.Fragment>
                ))}
              </>
            )}

            {index < data.list.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );

  const renderFile = (data: FileConfig) => (
    <>
      {data.description && (
        <>
          <br />
          {parseTextToReact(data.description)}
        </>
      )}
      {data.link && (
        <>
          <br />
          {parseTextToReact(`[${data.link.text}](${data.link.url})`)}
        </>
      )}
    </>
  );

  // --- Main Render Logic ---

  const renderContent = (content: StructuredContent) => {
    // Type guards / sniffing
    if ('jobs' in content) return renderExperience(content);
    if ('groups' in content) return renderSkills(content);
    if ('languages' in content) return renderLanguages(content);
    if ('list' in content) return renderEducation(content);
    if ('paragraphs' in content) return renderText(content);
    if (
      'link' in content ||
      ('description' in content && Object.keys(content).length <= 2)
    )
      return renderFile(content as FileConfig);

    return null;
  };

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
        {typeof text === 'string'
          ? parseTextToReact(text)
          : renderContent(text)}
      </div>
    </div>
  );
};

export default CommentedText;
