import type { Metadata } from 'next';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/lib/dwv-client';
import { getPropertyTypeLabel } from '@/lib/utils';
import { SlidersHorizontal, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
    // Se mudou o filtro (tipo ou ordenação), reseta a página para 1, a menos que estejamos mudando especificamente a página
    if (!newParams.page && merged.page) {
      delete merged.page;
    }
    
    const searchParts = Object.entries(merged)
      .filter(([, v]) => v && v !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join('&');
    return `/imoveis${searchParts ? `?${searchParts}` : ''}`;
  };

  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        {paginatedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 pt-8 border-t border-surface-100 flex-wrap sm:flex-nowrap">
                {currentPage > 1 ? (
                  <Link
                    href={buildFilterUrl({ page: (currentPage - 1).toString() })}
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-surface-50 hover:bg-surface-100 rounded-full border border-surface-200 transition-all duration-300 hover:shadow-md hover:-translate-x-1 shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary-900 group-hover:scale-110 transition-transform" />
                  </Link>
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 hidden sm:block" />
                )}

                <div className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-surface-50 rounded-full border border-surface-200 shadow-sm shrink-0">
                  <span className="text-sm font-bold text-primary-900 whitespace-nowrap">
                    Página {currentPage} <span className="font-medium text-surface-500">de {totalPages}</span>
                  </span>
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={buildFilterUrl({ page: (currentPage + 1).toString() })}
                    className="group relative flex items-center justify-center pl-4 pr-1 py-1.5 sm:pl-6 sm:pr-2 sm:py-2 gradient-accent rounded-full text-primary-900 font-bold shadow-md hover:shadow-glow transition-all duration-300 hover:translate-x-1 gap-2 sm:gap-3 overflow-hidden shrink-0"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
                    <span className="z-10 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Ver Mais</span>
                    <div className="relative z-10 flex items-center justify-center bg-white/40 rounded-full p-1.5 sm:p-2 backdrop-blur-sm border border-white/30 shadow-sm group-hover:bg-white/60 transition-colors shrink-0">
                       <Image src="/logo-icon.png" alt="Todescatt" width={20} height={20} className="object-contain w-5 h-5 sm:w-6 sm:h-6" />
                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 text-primary-900" />
                    </div>
                  </Link>
                ) : (
                  <div className="w-[140px] h-12 sm:w-32 sm:h-14 shrink-0 hidden sm:block" />
                )}
              </div>
            )}
          </>
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
