export type SkillGroup = {
  number: string
  title: string
  skills: Skill[]
}

export type Skill = {
  name: string
  core?: boolean
}

export const skillGroups: SkillGroup[] = [
  { number: '01', title: 'Frontend', skills: [{ name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }, { name: 'React.js', core: true }, { name: 'Tailwind CSS' }] },
  { number: '02', title: 'Backend', skills: [{ name: 'Node.js', core: true }, { name: 'Express.js', core: true }] },
  { number: '03', title: 'Programming Languages', skills: [{ name: 'C' }, { name: 'Java' }, { name: 'Python', core: true }] },
  { number: '04', title: 'Database Management', skills: [{ name: 'MySQL' }, { name: 'MongoDB' }] },
  { number: '05', title: 'AI & Machine Learning', skills: [{ name: 'NumPy' }, { name: 'Pandas' }, { name: 'Matplotlib' }, { name: 'Seaborn' }, { name: 'Scikit-learn' }] },
  { number: '06', title: 'Tools & Workflow', skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Postman' }, { name: 'Figma' }, { name: 'Canva' }] },
]
