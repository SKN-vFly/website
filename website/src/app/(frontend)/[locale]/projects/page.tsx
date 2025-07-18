import { getTranslations } from 'next-intl/server'
import { SearchableProjects } from '@/components/SearchableProjects'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2,
      limit: 12, // Load first 12 projects
    })
    return { docs: result.docs, totalDocs: result.totalDocs, hasNextPage: result.hasNextPage }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return { docs: [], totalDocs: 0, hasNextPage: false }
  }
}

export default async function Projects() {
  const t = await getTranslations('ProjectsPage')
  const projectsData = await getProjects()

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      <SearchableProjects
        projects={projectsData.docs}
        learnMore={t('learnMore')}
        searchPlaceholder={t('searchPlaceholder')}
        notFoundText={t('notfound')}
        clickToExplore={t('clickToExplore')}
      />
    </div>
  )
}
