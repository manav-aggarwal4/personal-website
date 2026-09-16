'use client'

import { useState, type ReactNode } from 'react'

const KEYWORDS = new Set([
  'and',
  'as',
  'def',
  'elif',
  'else',
  'for',
  'from',
  'if',
  'import',
  'in',
  'not',
  'or',
  'return',
])

function highlightPython(code: string) {
  const token =
    /(#.*)|(['"][^'"]*['"])|\b(def|return|if|else|elif|for|in|and|or|not|import|from|as)\b|\b(\d+\.?\d*)\b|(\b[A-Za-z_][A-Za-z0-9_]*)(\s*)(\()|(\b[A-Za-z_][A-Za-z0-9_]*)|([^\s#A-Za-z0-9_'"]+)/g

  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = token.exec(code))) {
    if (match.index > last) {
      nodes.push(code.slice(last, match.index))
    }

    const [full, comment, str, kw, num, fn, ws, paren, ident, punct] = match

    if (comment) {
      nodes.push(
        <span key={i++} className="tok-comment">
          {comment}
        </span>
      )
    } else if (str) {
      nodes.push(
        <span key={i++} className="tok-string">
          {str}
        </span>
      )
    } else if (kw) {
      nodes.push(
        <span key={i++} className="tok-kw">
          {kw}
        </span>
      )
    } else if (num) {
      nodes.push(
        <span key={i++} className="tok-num">
          {num}
        </span>
      )
    } else if (fn) {
      nodes.push(
        <span key={i++} className={KEYWORDS.has(fn) ? 'tok-kw' : 'tok-fn'}>
          {fn}
        </span>,
        ws,
        paren
      )
    } else if (ident) {
      nodes.push(ident)
    } else if (punct) {
      nodes.push(punct)
    } else {
      nodes.push(full)
    }

    last = match.index + full.length
  }

  if (last < code.length) nodes.push(code.slice(last))
  return nodes
}

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="cs180-codeblock">
      <div className="cs180-codeblock-bar">
        <span className="cs180-codeblock-lang">Python</span>
        <button type="button" className="cs180-codeblock-copy" onClick={copy}>
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="cs180-codeblock-pre">
        <code>{highlightPython(code)}</code>
      </pre>
    </div>
  )
}
