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
  {
    slug: 'healthsync',
    title: 'HealthSync',
    description:
      'HealthSync is an AI-powered hospital emergency response platform that streamlines patient triage, hospital resource management, and ambulance coordination. It leverages real-time tracking, intelligent routing, and predictive analytics to improve emergency response efficiency and enable faster, more coordinated healthcare delivery.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Google Vertex AI', 'Socket.io', 'Google Maps API'],
    live: 'https://healthsync-red.vercel.app/',
    repo: 'https://github.com/Sanchali-rif/HealthSync',
    image: '/healthsync.jpeg',
    imageAlt: 'HealthSync emergency response platform',
  },
  {
    slug: 'civiclens',
    title: 'CivicLens',
    description:
      'CivicLens is an AI-powered civic issue reporting and monitoring platform that connects citizens with local authorities. It uses AI-based image analysis, risk classification, and community verification to identify, prioritize, and track real-world civic problems. With intelligent issue prioritization and an authority dashboard, CivicLens aims to make cities safer, more responsive, and accountable.',
    tags: ['React.js', 'Tailwind CSS', 'PHP', 'PostgreSQL', 'Gemini API', 'Google Maps API', 'Geolocation API', 'Google Vertex AI API'],
    live: 'https://civic-lens-zeta.vercel.app/',
    repo: 'https://github.com/Sanchali-rif/CivicLens',
    image: '/CivicLens.jpeg',
    imageAlt: 'CivicLens civic issue reporting and monitoring platform',
  },
]

export type { Project }
