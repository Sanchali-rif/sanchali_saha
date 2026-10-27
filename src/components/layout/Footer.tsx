import { motion } from 'framer-motion'
import { site } from '../../data/site'
import { useScrollTo } from '../../hooks/useScrollTo'

const currentYear = new Date().getFullYear()

export function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="rounded-t-[3rem] bg-accent text-accent-on">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] opacity-70">
            Have a good idea?
          </p>
          <h2 className="max-w-3xl text-[clamp(2.75rem,7vw,7rem)] font-light leading-[0.92] tracking-[-0.055em]">
            Let&apos;s build something together
          </h2>
          <motion.a
            href={`mailto:${site.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-3 border-b border-accent-on/40 pb-2 text-[clamp(1.15rem,2.6vw,2.35rem)] font-medium tracking-[-0.03em] transition-colors hover:border-accent-on"
            whileHover="hover"
          >
            <span className="break-all">{site.email}</span>
            <motion.span
              aria-hidden="true"
              className="shrink-0 text-[1.1em]"
              variants={{ hover: { x: 7 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            >
              -&gt;
            </motion.span>
          </motion.a>
        </div>

        <div className="mt-20 flex flex-col gap-10 border-t border-accent-on/20 pt-6 text-sm font-medium tracking-[0.04em] sm:mt-28 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <motion.a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-black"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-black"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              LinkedIn
            </motion.a>
          </div>

          <motion.button
            type="button"
            className="flex items-center gap-2 self-start uppercase tracking-[0.14em] transition-colors hover:text-black sm:self-auto"
            onClick={() => scrollTo(0)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            Back to top <span aria-hidden="true">&#8593;</span>
          </motion.button>
        </div>

        <p className="mt-12 text-xs opacity-60">© {currentYear} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
