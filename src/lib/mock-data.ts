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
  },
  {
    id: '2',
    title: 'Casa Moderna com Piscina',
    slug: 'casa-moderna-piscina',
    type: 'house',
    category: 'third_party',
    status: 'available',
    price: 890000,
    area: 250,
    bedrooms: 4,
    suites: 2,
    bathrooms: 3,
    parking: 3,
    address: {
      neighborhood: 'Bela Vista',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    description: 'Residência sofisticada em condomínio fechado com projeto arquitetônico moderno. Ampla área de lazer com piscina aquecida, churrasqueira coberta e jardim paisagístico. Interior com pé-direito duplo na sala, cozinha gourmet integrada e suíte master com closet e banheira de hidromassagem.',
    features: ['Piscina Aquecida', 'Churrasqueira', 'Jardim', 'Condomínio Fechado', 'Pé-direito Duplo', 'Closet', 'Hidromassagem'],
    highlighted: true,
    createdAt: '2025-10-20T10:00:00Z',
  },
  {
    id: '3',
    title: 'Terreno em Condomínio Fechado',
    slug: 'terreno-condominio-fechado',
    type: 'land',
    category: 'third_party',
    status: 'available',
    price: 280000,
    area: 450,
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 0,
    address: {
      neighborhood: 'Parque Lívia',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop',
    ],
    description: 'Excelente terreno plano em condomínio fechado de alto padrão. Localização privilegiada com toda infraestrutura completa: água, luz, esgoto e pavimentação. Ideal para construir a casa dos seus sonhos em um ambiente seguro e exclusivo.',
    features: ['Condomínio Fechado', 'Terreno Plano', 'Infraestrutura Completa', 'Segurança 24h', 'Área Verde'],
    highlighted: false,
    createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: '4',
    title: 'Sala Comercial no Business Center',
    slug: 'sala-comercial-business-center',
    type: 'commercial',
    category: 'launch',
    status: 'available',
    price: 350000,
    area: 55,
    bedrooms: 0,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    address: {
      neighborhood: 'Centro',
      city: 'Itapema',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    ],
    description: 'Sala comercial moderna em edifício empresarial de alto padrão. Espaço versátil ideal para escritórios, consultórios e clínicas. O edifício conta com recepção, estacionamento rotativo e sistema de segurança avançado.',
    features: ['Recepção', 'Estacionamento', 'Segurança', 'Ar Condicionado Central', 'Piso Elevado'],
    highlighted: false,
    createdAt: '2025-11-10T10:00:00Z',
  },
  {
    id: '5',
    title: 'Cobertura Duplex com Vista Panorâmica',
    slug: 'cobertura-duplex-vista-panoramica',
    type: 'apartment',
    category: 'third_party',
    status: 'available',
    price: 1200000,
    area: 180,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    address: {
      neighborhood: 'Copas Verdes',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
    ],
    description: 'Cobertura duplex espetacular com vista panorâmica da cidade. Terraço amplo com piscina privativa e espaço gourmet. Acabamento de altíssimo padrão com mármore importado, iluminação projetada e automação residencial completa.',
    features: ['Piscina Privativa', 'Terraço', 'Automação', 'Vista Panorâmica', 'Mármore Importado', 'Espaço Gourmet'],
    highlighted: true,
    createdAt: '2025-09-15T10:00:00Z',
  },
  {
    id: '6',
    title: 'Casa em Condomínio com Amplo Jardim',
    slug: 'casa-condominio-amplo-jardim',
    type: 'house',
    category: 'third_party',
    status: 'available',
    price: 650000,
    area: 200,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    address: {
      neighborhood: 'São Cristóvão',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop',
    ],
    description: 'Casa espaçosa em condomínio fechado com amplo jardim e área verde. Projeto funcional com ambientes integrados, cozinha americana e varanda coberta com churrasqueira. Excelente para famílias que buscam conforto e segurança.',
    features: ['Jardim Amplo', 'Churrasqueira', 'Condomínio Fechado', 'Cozinha Americana', 'Varanda Coberta', 'Playground'],
    highlighted: true,
    createdAt: '2025-12-10T10:00:00Z',
  },
  {
    id: '7',
    title: 'Apartamento Compacto Bem Localizado',
    slug: 'apartamento-compacto-bem-localizado',
    type: 'apartment',
    category: 'launch',
    status: 'available',
    price: 295000,
    area: 52,
    bedrooms: 2,
    suites: 1,
    bathrooms: 1,
    parking: 1,
    address: {
      neighborhood: 'Três Vendas',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    ],
    description: 'Apartamento novo com excelente custo-benefício. Ideal para jovens casais ou investidores. Planta inteligente que aproveita cada metro quadrado. Condomínio com infraestrutura de lazer completa.',
    features: ['Sacada', 'Área de Lazer', 'Portaria', 'Elevador', 'Playground'],
    highlighted: false,
    createdAt: '2026-01-05T10:00:00Z',
  },
  {
    id: '8',
    title: 'Terreno Comercial na Avenida Principal',
    slug: 'terreno-comercial-avenida-principal',
    type: 'land',
    category: 'third_party',
    status: 'available',
    price: 480000,
    area: 600,
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 0,
    address: {
      neighborhood: 'Industrial',
      city: 'Itapema',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
    ],
    description: 'Terreno comercial estratégico localizado na principal avenida da região industrial. Frente ampla e acesso facilitado para veículos pesados. Ideal para construção de galpões, lojas ou empreendimentos comerciais de grande porte.',
    features: ['Frente Ampla', 'Acesso Facilitado', 'Terreno Plano', 'Zoneamento Comercial', 'Alta Visibilidade'],
    highlighted: false,
    createdAt: '2025-11-25T10:00:00Z',
  },
  {
    id: '9',
    title: 'Apartamento Garden com Quintal Privativo',
    slug: 'apartamento-garden-quintal-privativo',
    type: 'apartment',
    category: 'launch',
    status: 'available',
    price: 430000,
    area: 85,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    address: {
      neighborhood: 'Progresso',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    ],
    description: 'Apartamento térreo tipo garden com quintal privativo de 40m². Perfeito para quem tem pets ou deseja um espaço ao ar livre. Acabamento de primeira qualidade com porcelanato em todos os ambientes.',
    features: ['Quintal Privativo', 'Pet Friendly', 'Porcelanato', 'Sacada', 'Área de Lazer', 'Churrasqueira'],
    highlighted: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '10',
    title: 'Loja Térrea em Rua Comercial',
    slug: 'loja-terrea-rua-comercial',
    type: 'commercial',
    category: 'third_party',
    status: 'available',
    price: 580000,
    area: 120,
    bedrooms: 0,
    suites: 0,
    bathrooms: 2,
    parking: 2,
    address: {
      neighborhood: 'Centro',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    ],
    description: 'Loja ampla com excelente fluxo de pedestres e veículos. Vitrine frontal de vidro temperado, pé-direito alto e mezanino para estoque ou escritório. Localização privilegiada no centro comercial da cidade.',
    features: ['Vitrine Ampla', 'Mezanino', 'Pé-direito Alto', 'Estacionamento', 'Alta Visibilidade', 'Banheiro Acessível'],
    highlighted: false,
    createdAt: '2025-10-05T10:00:00Z',
  },
  {
    id: '11',
    title: 'Casa Térrea Aconchegante',
    slug: 'casa-terrea-aconchegante',
    type: 'house',
    category: 'third_party',
    status: 'available',
    price: 420000,
    area: 140,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    address: {
      neighborhood: 'Koller',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&h=600&fit=crop',
    ],
    description: 'Casa térrea em bairro tranquilo e residencial. Ótima para famílias que buscam qualidade de vida. Possui ampla sala, cozinha com despensa, lavanderia coberta e quintal com árvores frutíferas.',
    features: ['Quintal', 'Árvores Frutíferas', 'Lavanderia Coberta', 'Despensa', 'Garagem Coberta'],
    highlighted: false,
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '12',
    title: 'Residencial Parque das Flores - Studios',
    slug: 'residencial-parque-flores-studios',
    type: 'apartment',
    category: 'launch',
    status: 'available',
    price: 195000,
    area: 35,
    bedrooms: 1,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    address: {
      neighborhood: 'Fátima',
      city: 'Balneário Camboriú',
      state: 'SC',
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop',
    ],
    description: 'Studios modernos em novo empreendimento. Design contemporâneo com ambientes integrados. Ideal para investimento ou moradia de estudantes e jovens profissionais. Próximo a universidades e centros comerciais.',
    features: ['Ambientes Integrados', 'Design Moderno', 'Próximo a Universidades', 'Coworking', 'Bicicletário', 'Lavanderia Compartilhada'],
    highlighted: false,
    createdAt: '2026-03-01T10:00:00Z',
  },
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
