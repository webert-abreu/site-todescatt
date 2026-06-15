import type { Metadata } from 'next';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/lib/dwv-client';
import { getPropertyTypeLabel } from '@/lib/utils';
import { SlidersHorizontal, Search } from 'lucide-react';
import Link from 'next/link';
import { PropertyType } from '@/types/property';

export const metadata: Metadata = {
  title: 'Imóveis à Venda',
  description: 'Explore nosso portfólio completo de imóveis. Apartamentos, casas, terrenos e salas comerciais com as melhores condições.',
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ImoveisPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const properties = await fetchProperties(params);

  const activeType = params.type || '';
  const activeSort = params.sort || 'newest';

  const propertyTypes: { value: string; label: string }[] = [
    { value: '', label: 'Todos' },
    { value: 'apartment', label: 'Apartamentos' },
    { value: 'house', label: 'Casas' },
    { value: 'land', label: 'Terrenos' },
    { value: 'commercial', label: 'Comerciais' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'price_asc', label: 'Menor preço' },
    { value: 'price_desc', label: 'Maior preço' },
    { value: 'area_desc', label: 'Maior área' },
  ];

  const buildFilterUrl = (newParams: Record<string, string>) => {
    const merged = { ...params, ...newParams };
    const searchParts = Object.entries(merged)
      .filter(([, v]) => v && v !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join('&');
    return `/imoveis${searchParts ? `?${searchParts}` : ''}`;
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="gradient-primary py-12 sm:py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            {activeType ? getPropertyTypeLabel(activeType as PropertyType) : 'Todos os Imóveis'}
          </h1>
          <p className="text-white/60">
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-4 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-primary-700" />
            <h2 className="font-semibold text-surface-900">Filtros</h2>
          </div>

          {/* Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {propertyTypes.map((type) => (
              <Link
                key={type.value}
                href={buildFilterUrl({ type: type.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeType === type.value
                    ? 'gradient-accent text-primary-900 shadow-sm'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {type.label}
              </Link>
            ))}
          </div>

          {/* Sort */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-3 border-t border-surface-100">
            <span className="text-sm text-surface-500">Ordenar por:</span>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <Link
                  key={option.value}
                  href={buildFilterUrl({ sort: option.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeSort === option.value
                      ? 'bg-primary-800 text-white'
                      : 'bg-surface-50 text-surface-500 hover:bg-surface-100'
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-surface-700 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-surface-400 mb-6">
              Tente ajustar os filtros para encontrar o que procura.
            </p>
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-accent text-primary-900 font-semibold hover:shadow-glow transition-all"
            >
              Limpar Filtros
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
