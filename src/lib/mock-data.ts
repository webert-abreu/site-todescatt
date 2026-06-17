import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento Premium no Centro',
    slug: 'apartamento-premium-centro',
    type: 'apartment',
    category: 'launch',
    status: 'available',
    price: 520000,
    area: 98,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    address: {
      neighborhood: 'Centro',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    ],
    description: 'Apartamento de alto padrão com acabamento premium, localizado no coração da cidade. Conta com ampla sala de estar integrada à varanda gourmet, cozinha planejada com eletrodomésticos de primeira linha, e quartos espaçosos com armários embutidos. O condomínio oferece área de lazer completa com piscina, salão de festas e academia.',
    features: ['Varanda Gourmet', 'Piscina', 'Academia', 'Salão de Festas', 'Portaria 24h', 'Elevador', 'Churrasqueira'],
    highlighted: true,
    createdAt: '2025-11-15T10:00:00Z',
  }
];

export function getFilteredProperties(filters?: Record<string, string | undefined>): Property[] {
  let result = [...mockProperties];

  if (!filters) return result;

  if (filters.type) {
    result = result.filter(p => p.type === filters.type);
  }
  if (filters.city) {
    result = result.filter(p => p.address.city.toLowerCase() === filters.city!.toLowerCase());
  }
  if (filters.bedrooms) {
    const beds = parseInt(filters.bedrooms);
    if (beds === 4) {
      result = result.filter(p => p.bedrooms >= 4);
    } else {
      result = result.filter(p => p.bedrooms === beds);
    }
  }
  if (filters.minPrice) {
    result = result.filter(p => p.price >= parseInt(filters.minPrice!));
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.price <= parseInt(filters.maxPrice!));
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.address.city.toLowerCase().includes(search) ||
      p.address.neighborhood.toLowerCase().includes(search)
    );
  }

  // Sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  return result;
}

export function getPropertyById(id: string): Property | undefined {
  return mockProperties.find(p => p.id === id);
}

export function getHighlightedProperties(): Property[] {
  return mockProperties.filter(p => p.highlighted);
}

export function getSimilarProperties(property: Property, limit: number = 3): Property[] {
  return mockProperties
    .filter(p => p.id !== property.id && p.type === property.type)
    .slice(0, limit);
}

export function getCities(): string[] {
  const cities = new Set(mockProperties.map(p => p.address.city));
  return Array.from(cities).sort();
}

export function getNeighborhoods(): string[] {
  const neighborhoods = new Set(mockProperties.map(p => p.address.neighborhood));
  return Array.from(neighborhoods).sort();
}
