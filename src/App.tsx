import { SmoothScroll } from './providers/SmoothScroll'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'

function App() {
  return (
    <SmoothScroll>
      <Nav />
      <main id="main">
        <Hero />
      </main>
      <Footer />
      </SmoothScroll>
  )
}

export default App
