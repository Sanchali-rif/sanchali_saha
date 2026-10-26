import { SmoothScroll } from './providers/SmoothScroll'
import { Nav } from './components/layout/Nav'
import { Hero } from './components/sections/Hero'

function App() {
  return (
    <SmoothScroll>
      <Nav />
      <main id="main">
        <Hero />
      </main>
    </SmoothScroll>
  )
}

export default App
