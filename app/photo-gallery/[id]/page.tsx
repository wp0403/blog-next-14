import { Metadata } from 'next'
import PhotoDetailClient from './detail-client'
import { getDataApi } from '@/app/api'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await getDataApi(`/api/photo/${params.id}`)
    return {
      title: `${data.title} - Photography`,
      description: data.description || 'Photo detail page',
      openGraph: {
        title: `${data.title} - Photography`,
        description: data.description || 'Photo detail page',
        images: data.images?.[0] ? [data.images[0]] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Photo Detail - Photography',
      description: 'Photo detail page',
    }
  }
}

export default function PhotoDetailPage({ params }: Props) {
  return <PhotoDetailClient id={params.id} />
} 