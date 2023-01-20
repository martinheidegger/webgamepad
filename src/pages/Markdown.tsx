import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import { GamepadAxis } from '../components/GamepadAxis.js'
import { GamepadAxis2D } from '../components/GamepadAxis2D.js'
import { GamepadButton } from '../components/GamepadButton.js'
import { GamepadInspect } from '../components/GamepadInspect.js'
import { GamepadStats } from '../components/GamepadStats.js'
import { WindowEvent } from '../components/WindowEvent.js'

const config: Partial<Parameters<typeof ReactMarkdown>[0]> = {
  remarkPlugins: [
    remarkGfm,
    remarkDirective,
    remarkDirectiveRehype
  ],
  components: {
    'gamepad-inspect': GamepadInspect,
    'gamepad-axis': GamepadAxis,
    'gamepad-axis-2d': GamepadAxis2D,
    'gamepad-button': GamepadButton,
    'gamepad-stats': GamepadStats,
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <ReactSyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={style}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }
}

export interface MarkdownProps {
  next?: string
  prev?: string
  text: string
}

export function Markdown ({ text, prev, next }: MarkdownProps): JSX.Element {
  const navigate = useNavigate()
  return <>
    <WindowEvent keyup={e => {
      if (next && (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === ' ')) {
        navigate(next)
        return
      }
      if (prev && (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')) {
        navigate(prev)
        return
      }
      console.log(e.key)
    }} />
    <ReactMarkdown children={text} {...config} />
  </>
}