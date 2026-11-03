export type SkillGroup = {
  number: string
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  { number: '01', title: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'] },
  { number: '02', title: 'Backend', skills: ['Node.js', 'Express.js'] },
  { number: '03', title: 'Programming Languages', skills: ['C', 'Java', 'Python'] },
  { number: '04', title: 'Database Management', skills: ['MySQL'] },
  { number: '05', title: 'AI & Machine Learning', skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'] },
  { number: '06', title: 'Tools & Workflow', skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Canva'] },
]
