import { NextRequest } from 'next/server';
import { fetchProperties } from '@/lib/dwv-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: Record<string, string | undefined> = {
      type: searchParams.get('type') || undefined,
      city: searchParams.get('city') || undefined,
      bedrooms: searchParams.get('bedrooms') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      sort: searchParams.get('sort') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const properties = await fetchProperties(filters);
    return Response.json({ properties, total: properties.length });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return Response.json(
      { error: 'Erro ao buscar imóveis' },
      { status: 500 }
    );
  }
}
