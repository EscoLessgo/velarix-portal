import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Velarix Solutions',
    url: 'velarixsolutions.nl',
    description: 'Main hub for digital solutions and creative development services.',
    color: 'cyan' as const,
  },
  {
  title: 'Farkle Discord Game Install Link',
  url: 'https://discord.com/oauth2/authorize?client_id=1448243957715959898',
  description: 'Farkle :)',
  color: 'cyan' as const,
},
{
  title: 'AlphaBee Discord Game Install Link',
  url: 'https://discord.com/oauth2/authorize?client_id=1451743881854062685',
  description: 'AlphaBee',
  color: 'cyan' as const,
},
{
  title: 'SquareRoots Discord Game Install Link',
  url: 'https://discord.com/oauth2/authorize?client_id=1449456536710811770',
  description: 'DotsNBoxes',
  color: 'cyan' as const,
},
{
  title: 'Scattergories Discord Game Install Link',
  url: 'https://discord.com/oauth2/authorize?client_id=1452087558057230437',
  description: 'Scattergories By Esco',
  color: 'cyan' as const,
},
{
    title: 'Spelling Bee Rip',
    url: 'spell.velarixsolutions.nl',
    description: 'Better NYT Shitstain daily challenge',
    color: 'cyan' as const,
  },
  {
    title: 'Escos Entries - Private PasteBin',
    url: 'https://idump.velarixsolutions.nl',
    description: 'Where I dump out my daily thoughts or random interests',
    color: 'cyan' as const,
  },
  {
    title: 'What Im Listening To',
    url: 'spoti.velarixsolutions.nl',
    description: 'Escos Live Audio Visualizer',
    color: 'cyan' as const,
  },
  {
    title: 'EscosArchive',
    url: 'more.velarixsolutions.nl',
    description: 'My Games / Projects',
    color: 'cyan' as const,
  },
  {
    title: 'Esco Signs',
    url: 'escosigns.velarixsolutions.nl',
    description: 'Professional signage and branding solutions platform.',
    color: 'purple' as const,
  },
  {
    title: 'Crypto Hub',
    url: 'crypto.velarixsolutions.nl',
    description: 'Cryptocurrency insights and blockchain technology resources.',
    color: 'cyan' as const,
  },
  {
    title: '404 Creative',
    url: '404.velarixsolutions.nl',
    description: 'Creative error pages and unique web experiments.',
    color: 'magenta' as const,
  },
  {
    title: 'Find',
    url: 'find.velarixsolutions.nl',
    description: 'Search and discovery platform for digital content.',
    color: 'purple' as const,
  },
  {
    title: 'Inlet',
    url: 'inlet.velarixsolutions.nl',
    description: 'Data streaming and content aggregation services.',
    color: 'purple' as const,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-4 md:px-8">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4">
          {'<projects />'}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          <span className="gradient-text">Featured Work</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-body">
          A collection of digital experiences, platforms, and creative solutions crafted with passion and precision.
        </p>
      </div>

      {/* Projects grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.url}
            {...project}
            index={index}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
