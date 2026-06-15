import { Property } from '@/types/property';
import {
  getFilteredProperties,
  getPropertyById as getMockPropertyById,
} from './mock-data';

const DWV_API_BASE = process.env.DWV_API_BASE_URL || 'https://api.dwvapp.com.br';
const DWV_API_TOKEN = process.env.DWV_API_TOKEN;

function isDWVConfigured(): boolean {
  return !!DWV_API_TOKEN && DWV_API_TOKEN.length > 0;
}

async function dwvFetch(endpoint: string): Promise<Response> {
  const response = await fetch(`${DWV_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${DWV_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`DWV API error: ${response.status} ${response.statusText}`);
  }

  return response;
}

// Transform DWV API data to our Property type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformDWVProperty(data: any): Property {
  return {
    id: String(data.id || data.codigo),
    title: data.titulo || data.nome || 'Imóvel',
    slug: String(data.id || data.codigo),
    type: mapDWVType(data.tipo || data.tipo_imovel),
    category: data.lancamento ? 'launch' : 'third_party',
    status: mapDWVStatus(data.status || data.situacao),
    price: Number(data.valor || data.preco || 0),
    area: Number(data.area_total || data.metragem || 0),
    bedrooms: Number(data.dormitorios || data.quartos || 0),
    suites: Number(data.suites || 0),
    bathrooms: Number(data.banheiros || 0),
    parking: Number(data.vagas || data.garagens || 0),
    address: {
      neighborhood: data.bairro || '',
      city: data.cidade || '',
      state: data.estado || data.uf || 'RS',
      street: data.endereco || data.logradouro || '',
    },
    images: data.fotos?.map((f: { url?: string }) => f.url || f) || data.imagens || [],
    description: data.descricao || data.observacao || '',
    features: data.caracteristicas || data.diferenciais || [],
    highlighted: data.destaque || false,
    createdAt: data.created_at || data.data_cadastro || new Date().toISOString(),
  };
}

function mapDWVType(tipo: string): Property['type'] {
  const typeMap: Record<string, Property['type']> = {
    apartamento: 'apartment',
    casa: 'house',
    terreno: 'land',
    comercial: 'commercial',
    sala: 'commercial',
    loja: 'commercial',
    sobrado: 'house',
    cobertura: 'apartment',
  };
  return typeMap[(tipo || '').toLowerCase()] || 'apartment';
}

function mapDWVStatus(status: string): Property['status'] {
  const statusMap: Record<string, Property['status']> = {
    disponivel: 'available',
    disponível: 'available',
    vendido: 'sold',
    reservado: 'reserved',
    reserva: 'reserved',
  };
  return statusMap[(status || '').toLowerCase()] || 'available';
}

export async function fetchProperties(
  filters?: Record<string, string | undefined>
): Promise<Property[]> {
  if (!isDWVConfigured()) {
    console.log('[DWV] Token não configurado - usando dados de demonstração');
    return getFilteredProperties(filters);
  }

  try {
    const response = await dwvFetch('/integration/properties');
    const data = await response.json();
    const properties = (data.data || data.properties || data || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => transformDWVProperty(item));

    // Apply local filters
    let result = properties;
    if (filters) {
      if (filters.type) result = result.filter((p: Property) => p.type === filters.type);
      if (filters.city) result = result.filter((p: Property) => p.address.city.toLowerCase() === filters.city!.toLowerCase());
      if (filters.bedrooms) {
        const beds = parseInt(filters.bedrooms);
        result = beds >= 4
          ? result.filter((p: Property) => p.bedrooms >= 4)
          : result.filter((p: Property) => p.bedrooms === beds);
      }
      if (filters.minPrice) result = result.filter((p: Property) => p.price >= parseInt(filters.minPrice!));
      if (filters.maxPrice) result = result.filter((p: Property) => p.price <= parseInt(filters.maxPrice!));
    }

    return result;
  } catch (error) {
    console.error('[DWV] Erro ao buscar imóveis:', error);
    return getFilteredProperties(filters);
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  if (!isDWVConfigured()) {
    return getMockPropertyById(id) || null;
  }

  try {
    const response = await dwvFetch(`/integration/properties/${id}`);
    const data = await response.json();
    return transformDWVProperty(data.data || data);
  } catch (error) {
    console.error(`[DWV] Erro ao buscar imóvel ${id}:`, error);
    return getMockPropertyById(id) || null;
  }
}
