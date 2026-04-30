import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Locale } from '@/i18n/routing'
import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

// HomePageClient keeps section anchors, hsl(var(--nav-theme)) themed colors, and lucide-react icons.
const HOMEPAGE_VIDEO = {
  id: 'ju-EqJ_S_Q8',
  title: 'INDUSTRIA 2 | Official Launch Trailer',
}

const HOMEPAGE_LINKS = {
  officialSite: 'https://www.headupgames.com/game/industria-2',
  developerSite: 'https://www.bleakmill.com/',
  steamStore: 'https://store.steampowered.com/app/2154070/INDUSTRIA_2/',
  steamCommunity: 'https://steamcommunity.com/app/2154070',
  steamDiscussions: 'https://steamcommunity.com/app/2154070/discussions/',
  discord: 'https://discord.gg/industriagame',
  x: 'https://x.com/INDUSTRIA_game',
  youtube: 'https://www.youtube.com/@bleakmillgames',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.industria2.wiki'

  return {
    title: 'INDUSTRIA 2 - Release Date, Trailers & Guide',
    description:
      'Find INDUSTRIA 2 release date, Steam status, official trailers, beginner guide, weapons, crafting systems, and walkthrough-ready module coverage.',
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
      siteName: 'INDUSTRIA 2',
      title: 'INDUSTRIA 2 - Release Date, Trailers & Guide',
      description:
        'Find INDUSTRIA 2 release date, Steam status, official trailers, beginner guide, weapons, crafting systems, and walkthrough-ready module coverage.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'INDUSTRIA 2',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'INDUSTRIA 2 - Release Date, Trailers & Guide',
      description:
        'Find INDUSTRIA 2 release date, Steam status, official trailers, beginner guide, weapons, crafting systems, and walkthrough-ready module coverage.',
      images: [`${siteUrl}/images/hero.webp`],
      creator: '@INDUSTRIA_game',
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      homepageVideo={HOMEPAGE_VIDEO}
      externalLinks={HOMEPAGE_LINKS}
    />
  )
}
