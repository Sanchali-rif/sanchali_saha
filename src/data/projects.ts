type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  live?: string
  repo?: string
  image: string
  imageAlt: string
  badge?: string
  stat?: { value: string; label: string }
  featured?: boolean
}

const projectImages = import.meta.glob('../assets/projects/agnidrishti-dashboard.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const projects: Project[] = [
  {
    slug: 'agnidrishti',
    title: 'AgniDrishti',
    description:
      'AI-powered satellite system that detects and classifies industrial fires from VIIRS thermal data, with a React dashboard for live maps and state-wise analytics.',
    tags: ['React', 'Tailwind CSS', 'Leaflet', 'FastAPI', 'PostGIS', 'Python', 'XGBoost', 'NASA VIIRS'],
    live: 'https://agni-dristi-frontend.vercel.app/dashboard',
    image: projectImages['../assets/projects/agnidrishti-dashboard.webp'] ?? '/assets/projects/agnidrishti-dashboard.webp',
    imageAlt: 'AgniDrishti dashboard showing a live fire map and state-wise analytics',
    badge: 'Built for SIH 2026 (NTRO)',
    stat: { value: '81.9%', label: 'Classification accuracy' },
    featured: true,
  },
]

export type { Project }
