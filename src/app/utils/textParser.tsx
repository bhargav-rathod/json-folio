import React from 'react';

/**
 * Parses text with support for:
 * - \n for new lines
 * - (Text)[Link] for markdown-style links
 * - <b> or <strong> for bold text
 * - <i> for italic text
 * - <u> for underlined text
 */
const parseHTMLTags = (text: string, keyPrefix: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let partIndex = 0;

  // Regex to match HTML tags: <b>, </b>, <strong>, </strong>, <i>, </i>, <u>, </u>
  // Using non-greedy match to handle nested tags better
  const htmlTagRegex = /<(b|strong|i|u)>(.*?)<\/\1>/gi;
  let match;
  const matches: Array<{ start: number; end: number; tag: string; content: string }> = [];

  // Collect all matches first
  while ((match = htmlTagRegex.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      tag: match[1].toLowerCase(),
      content: match[2]
    });
  }

  // Process matches
  for (const tagMatch of matches) {
    // Add text before the tag
    if (tagMatch.start > lastIndex) {
      const beforeText = text.substring(lastIndex, tagMatch.start);
      if (beforeText) {
        parts.push(
          <React.Fragment key={`${keyPrefix}-text-${partIndex}`}>
            {parseLinks(beforeText, `${keyPrefix}-text-${partIndex}`)}
          </React.Fragment>
        );
        partIndex++;
      }
    }

    // Recursively process the content inside the tag (handles nested tags)
    const processedContent = parseHTMLTags(tagMatch.content, `${keyPrefix}-tag-${partIndex}`);

    // Create the appropriate element based on tag type
    switch (tagMatch.tag) {
      case 'b':
      case 'strong':
        parts.push(
          <strong key={`${keyPrefix}-bold-${partIndex}`} className="font-bold">
            {processedContent}
          </strong>
        );
        break;
      case 'i':
        parts.push(
          <em key={`${keyPrefix}-italic-${partIndex}`} className="italic">
            {processedContent}
          </em>
        );
        break;
      case 'u':
        parts.push(
          <u key={`${keyPrefix}-underline-${partIndex}`} className="underline">
            {processedContent}
          </u>
        );
        break;
    }
    partIndex++;
    lastIndex = tagMatch.end;
  }

  // Add remaining text after the last tag
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(
        <React.Fragment key={`${keyPrefix}-end-${partIndex}`}>
          {parseLinks(remainingText, `${keyPrefix}-end-${partIndex}`)}
        </React.Fragment>
      );
    }
  }

  // If no HTML tags were found, parse links in the whole text
  if (parts.length === 0) {
    return parseLinks(text, keyPrefix);
  }

  return <>{parts}</>;
};

/**
 * Parses links in the format (Text)[Link]
 */
const parseLinks = (text: string, keyPrefix: string): React.ReactNode => {
  const linkRegex = /\(([^)]+)\)\[([^\]]+)\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={`${keyPrefix}-link-text-${partIndex}`}>
          {text.substring(lastIndex, match.index)}
        </React.Fragment>
      );
      partIndex++;
    }

    // Add the link
    parts.push(
      <a
        key={`${keyPrefix}-link-${partIndex}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline transition-colors"
      >
        {match[1]}
      </a>
    );
    partIndex++;
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`${keyPrefix}-link-end-${partIndex}`}>
        {text.substring(lastIndex)}
      </React.Fragment>
    );
  }

  // If no links were found, return the text as is
  if (parts.length === 0) {
    return text;
  }

  return <>{parts}</>;
};

export const parseText = (text: string): React.ReactNode => {
  if (!text) return null;

  // Split by newlines first (handle both \n and \\n)
  const lines = text.split(/\\n|\n/);
  
  return lines.map((line, lineIndex) => {
    // Parse HTML tags and links
    const parsedContent = parseHTMLTags(line, `line-${lineIndex}`);

    return (
      <React.Fragment key={`line-wrapper-${lineIndex}`}>
        {parsedContent}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

