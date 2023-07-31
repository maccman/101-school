import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/ui/markdown'

export function ChatMessageContent({ content }: { content: string }) {
  return (
    <MemoizedReactMarkdown
      className="prose prose-sm break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        a({ children, ...props }) {
          return (
            <a target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          )
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return <span className="mt-1 animate-pulse cursor-default">▍</span>
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          const match = /language-(\w+)/.exec(className || '')

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        },
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  )
}
