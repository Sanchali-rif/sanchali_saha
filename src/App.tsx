import { SmoothScroll } from './providers/SmoothScroll'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { ActivitySection } from './components/sections/ActivitySection'

function App() {
  return (
    <SmoothScroll>
      <Nav />
        <main id="main">
          <Hero />
          <ActivitySection />
        </main>
      <Footer />
      </SmoothScroll>
  )
}

export default App
