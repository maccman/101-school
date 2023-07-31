import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/ui/markdown'

import { UnitImage } from './unit-image'

interface UnitContentProps {
  content: string
  image: {
    source: string
    description: string | null
  } | null
}

export function UnitContent({ content, image }: UnitContentProps) {
  return (
    <MemoizedReactMarkdown
      className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      includeElementIndex={true}
      components={{
        h1({ index, children }) {
          if (index === 0 && image) {
            return (
              <>
                <h1>{children}</h1>
                <UnitImage
                  image={image}
                  className="md:float-right md:mt-2 md:-mr-56 md:ml-5 md:mb-10 my-8"
                />
              </>
            )
          } else {
            return <h1>{children}</h1>
          }
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
