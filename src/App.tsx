import { Outlet, Route, Routes, useNavigate } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { Layout } from './components/Layout.js'
import { WindowEvent } from './components/WindowEvent.js'
import { Markdown } from './pages/Markdown.js'
// @ts-ignore
import notes from './pages/notes.md'

export function App (): JSX.Element {
  return <HashRouter><Router /></HashRouter>
}

declare const notes: string

const pages = notes.split(/\n^>>>\s+$\n/gm)

function Router (): JSX.Element {
  const navigate = useNavigate()
  return <Routes>
    <Route element={<Layout/>}>
      <Route path='' element={<WindowEvent keyup={() => navigate('/page/0')}/>} />
      <Route path='page' element={<div className="content"><Outlet /></div>} >
        {pages.map((page, index) => <Route key={`page-${index}`} path={`${index}`} element={
          <Markdown text={page} prev={index === 0 ? '/' : `/page/${index - 1}`} next={pages[index + 1] ? `/page/${index + 1}` : undefined} />
        } />)}
      </Route>
    </Route>
  </Routes>
}
