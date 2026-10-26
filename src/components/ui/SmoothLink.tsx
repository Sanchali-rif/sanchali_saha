import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useScrollTo } from '../../hooks/useScrollTo'

type SmoothLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function SmoothLink({ onClick, href, ...props }: SmoothLinkProps) {
  const scrollTo = useScrollTo()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (event.defaultPrevented || !href?.startsWith('#')) {
      return
    }

    event.preventDefault()
    scrollTo(href)
  }

  return <a {...props} href={href} onClick={handleClick} />
}
