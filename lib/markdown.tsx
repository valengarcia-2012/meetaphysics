import React from "react";

/**
 * Tiny dependency-free markdown renderer for card text.
 * Supports: paragraphs, **bold**, *italic*, blockquotes (lines starting with >),
 * ordered lists (1. 2. ...), unordered lists (- item).
 */
export function renderMarkdown(text: string): React.ReactNode {
  // Split into blocks separated by blank lines
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, idx) => renderBlock(block, idx))}
    </>
  );
}

function renderBlock(block: string, key: number): React.ReactNode {
  const lines = block.split("\n");

  // Blockquote: every line starts with >
  if (lines.every((l) => l.startsWith(">"))) {
    const content = lines.map((l) => l.replace(/^>\s?/, "")).join(" ");
    return <blockquote key={key}>{renderInline(content)}</blockquote>;
  }

  // Ordered list
  if (lines.every((l) => /^\d+\.\s/.test(l))) {
    return (
      <ol key={key}>
        {lines.map((l, i) => (
          <li key={i}>{renderInline(l.replace(/^\d+\.\s/, ""))}</li>
        ))}
      </ol>
    );
  }

  // Unordered list
  if (lines.every((l) => /^-\s/.test(l))) {
    return (
      <ul key={key}>
        {lines.map((l, i) => (
          <li key={i}>{renderInline(l.replace(/^-\s/, ""))}</li>
        ))}
      </ul>
    );
  }

  // Plain paragraph (preserve single-line breaks within paragraph)
  return (
    <p key={key}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {renderInline(line)}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
}

function renderInline(text: string): React.ReactNode {
  // Tokenize **bold** and *italic*
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      tokens.push(<strong key={key++}>{renderInline(boldMatch[1])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }
    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      tokens.push(<em key={key++}>{renderInline(italicMatch[1])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }
    // Take chars up to next * or end
    const next = remaining.search(/\*/);
    if (next === -1) {
      tokens.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
      break;
    } else {
      tokens.push(
        <React.Fragment key={key++}>{remaining.slice(0, next)}</React.Fragment>
      );
      remaining = remaining.slice(next);
      // If a * we couldn't match, just emit it literally
      if (!/^\*\*?[^*]/.test(remaining)) {
        tokens.push(<React.Fragment key={key++}>*</React.Fragment>);
        remaining = remaining.slice(1);
      }
    }
  }

  return <>{tokens}</>;
}
