import { Outlet, Route, Routes } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { Layout } from './components/Layout'

export function App (): JSX.Element {
  return <HashRouter>
    <Routes>
      <Route element={<Layout/>} path='/'>
        <Route element={<div className="content"><Outlet /></div>} path='page'>
          <Route element={<>Hello World</>} path='1' />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
}
