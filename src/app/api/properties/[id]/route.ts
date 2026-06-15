import { NextRequest } from 'next/server';
import { fetchPropertyById } from '@/lib/dwv-client';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await fetchPropertyById(id);

    if (!property) {
      return Response.json(
        { error: 'Imóvel não encontrado' },
        { status: 404 }
      );
    }

    return Response.json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    return Response.json(
      { error: 'Erro ao buscar imóvel' },
      { status: 500 }
    );
  }
}
