import { useEffect, useRef, type CSSProperties } from 'react'

export interface MetallicPaintProps {
  imageSrc?: string
  text?: string
  color?: string
  backgroundColor?: string
  fontFamily?: string
  fontWeight?: number | string
  density?: number
  softness?: number
  dispersion?: number
  distortion?: number
  edgeBend?: number
  angle?: number
  scale?: number
  speed?: number
  rotation?: number
  mouseTilt?: number
  intro?: boolean
  lightMode?: boolean
  paused?: boolean
  dpr?: number
  className?: string
  style?: CSSProperties
}

export default function MetallicPaint({
  imageSrc,
  text,
  color = '#ffffff',
  backgroundColor = 'transparent',
  fontFamily = 'system-ui, sans-serif',
  fontWeight = 800,
  density = 2,
  softness = 0.1,
  dispersion = 0.3,
  distortion = 0.07,
  edgeBend = 0.6,
  angle = 70,
  scale = 0.6,
  speed = 1,
  rotation = 0,
  mouseTilt = 0.5,
  intro = true,
  lightMode = false,
  paused = false,
  dpr,
  className = '',
  style,
}: MetallicPaintProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const source = imageSrc
    const image = source ? new Image() : null
    if (source && image) {
      image.crossOrigin = 'anonymous'
      image.src = source
    }
    let frame = 0
    let time = 0
    let width = 0
    let height = 0
    let reveal = intro && !reduceMotion ? 0 : 1
    let targetX = 0
    let targetY = 0
    let tiltX = 0
    let tiltY = 0

    const draw = () => {
      if (!width || !height) return
      const pixelRatio = dpr ?? Math.min(window.devicePixelRatio || 1, 2)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)

      const tint = color.startsWith('var(')
        ? getComputedStyle(container).getPropertyValue(color.slice(4, -1).trim()).trim() || '#ffffff'
        : color
      const theta = ((angle + Math.sin(time * 0.0007) * distortion * 20) * Math.PI) / 180
      const length = Math.max(width, height) * 1.5
      const centerX = width / 2 + Math.cos(theta) * Math.sin(time * 0.0018) * length * 0.35
      const centerY = height / 2 + Math.sin(theta) * Math.sin(time * 0.0018) * length * 0.35
      const gradient = context.createLinearGradient(
        centerX - Math.cos(theta) * length,
        centerY - Math.sin(theta) * length,
        centerX + Math.cos(theta) * length,
        centerY + Math.sin(theta) * length,
      )
      gradient.addColorStop(0, '#062b00')
      gradient.addColorStop(0.18, '#2f7900')
      gradient.addColorStop(0.3, tint)
      gradient.addColorStop(0.42, '#c8ff00')
      gradient.addColorStop(0.52, '#123b00')
      gradient.addColorStop(0.68, '#8dc900')
      gradient.addColorStop(0.8, '#efff00')
      gradient.addColorStop(1, lightMode ? '#426d00' : '#031500')

      context.save()
      context.globalAlpha = reveal
      context.translate(width / 2 + tiltX * mouseTilt * width * 0.04, height / 2 + tiltY * mouseTilt * height * 0.04)
      context.rotate((rotation * Math.PI) / 180)
      context.scale(scale, scale)
      if (image?.complete && image.naturalWidth) {
        const fit = Math.min(width / image.naturalWidth, height / image.naturalHeight) * 0.88
        context.drawImage(image, -image.naturalWidth * fit / 2, -image.naturalHeight * fit / 2, image.naturalWidth * fit, image.naturalHeight * fit)
        context.globalCompositeOperation = 'source-in'
        context.fillStyle = gradient
        context.fillRect(-width, -height, width * 2, height * 2)

        const period = Math.max(24, 150 / Math.max(0.5, density))
        context.globalCompositeOperation = 'source-atop'
        context.globalAlpha = Math.min(0.88, 0.52 + edgeBend * 0.35)
        context.save()
        context.rotate(theta)
        const span = Math.max(width, height) * 2
        const phase = (time * 0.018 * speed) % period
        for (let stripe = -span - period; stripe < span + period; stripe += period) {
          context.fillStyle = '#061800'
          context.fillRect(stripe + phase, -span, period * 0.42, span * 2)
          context.fillStyle = '#dfff00'
          context.fillRect(stripe + phase + period * 0.42, -span, period * 0.1, span * 2)
          if (dispersion > 0) {
            context.globalAlpha = dispersion * 0.4
            context.fillStyle = '#ff3300'
            context.fillRect(stripe + phase + period * 0.47, -span, period * 0.018, span * 2)
            context.fillStyle = '#00e8a0'
            context.fillRect(stripe + phase + period * 0.5, -span, period * 0.018, span * 2)
            context.globalAlpha = Math.min(0.88, 0.52 + edgeBend * 0.35)
          }
        }
        context.restore()
      } else if (text) {
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.font = `${fontWeight} ${Math.min(width, height) * 0.76}px ${fontFamily}`
        context.fillStyle = gradient
        context.fillText(text, 0, height * 0.03)
      }
      context.restore()

      if (backgroundColor !== 'transparent') {
        context.globalCompositeOperation = 'destination-over'
        context.fillStyle = backgroundColor
        context.fillRect(0, 0, width, height)
        context.globalCompositeOperation = 'source-over'
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const pixelRatio = dpr ?? Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      draw()
    }

    const animate = (now: number) => {
      time = now * speed
      reveal = Math.min(1, reveal + 0.025)
      tiltX += (targetX - tiltX) * 0.08
      tiltY += (targetY - tiltY) * 0.08
      draw()
      if (!paused && !reduceMotion) frame = requestAnimationFrame(animate)
    }

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = (event.clientX - rect.left) / rect.width * 2 - 1
      targetY = (event.clientY - rect.top) / rect.height * 2 - 1
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    image?.addEventListener('load', draw)
    resize()
    if (!paused && !reduceMotion) frame = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
      image?.removeEventListener('load', draw)
    }
  }, [angle, backgroundColor, color, density, dispersion, distortion, dpr, edgeBend, fontFamily, fontWeight, imageSrc, intro, lightMode, mouseTilt, paused, rotation, scale, softness, speed, text])

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`.trim()} style={style}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  )
}
