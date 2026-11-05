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

export const projects: Project[] = [
  {
    slug: 'agnidrishti',
    title: 'AgniDrishti',
    description:
      'AI-powered satellite system that detects and classifies industrial fires from VIIRS thermal data, with a React dashboard for live maps and state-wise analytics.',
    tags: ['React', 'Tailwind CSS', 'Leaflet', 'FastAPI', 'PostGIS', 'Python', 'XGBoost', 'NASA VIIRS'],
    live: 'https://agni-dristi-frontend.vercel.app/dashboard',
    image: '/AgniDrishti.jpeg',
    imageAlt: 'AgniDrishti dashboard showing a live fire map and state-wise analytics',
    badge: 'Built for SIH 2026 (NTRO)',
    stat: { value: '81.9%', label: 'Classification accuracy' },
    featured: true,
  },
  {
    slug: 'neatnode',
    title: 'NeatNode',
    description:
      'A full-stack web app that turns messy CSV files into clean, analysis-ready data in seconds, with a full log of every change. It profiles columns, removes outliers, fills missing values, and supports plain-English cleaning instructions. A built-in chatbot answers questions about your data, and results export as CSV, JSON, SQL, or Python. Tested on a 6,000-row healthcare dataset with 92.8% row retention.',
    tags: ['React', 'Vite', 'Flask', 'Python', 'Pandas', 'SQLite', 'OpenRouter API'],
    live: 'https://neat-node.vercel.app/',
    repo: 'https://github.com/Sanchali-rif/NeatNode_synchronocity',
    image: '/NeatNode.png',
    imageAlt: 'NeatNode data-cleaning application screenshot',
  },
]

export type { Project }
