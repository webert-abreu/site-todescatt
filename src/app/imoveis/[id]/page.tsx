import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPropertyById, fetchProperties } from '@/lib/dwv-client';
import { formatCurrency, formatArea, getPropertyTypeLabel, getCategoryLabel } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import PropertyCard from '@/components/PropertyCard';
import ShareModal from '@/components/ShareModal';
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize,
  ArrowLeft,
  Home,
  CheckCircle2,
  Tag,
  CalendarDays,
  Share2,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) {
    return { title: 'Imóvel não encontrado' };
  }

  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) {
    notFound();
  }

  // Get similar properties
  const allProperties = await fetchProperties();
  const similar = allProperties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, 3);

  const details = [
    { icon: BedDouble, label: 'Dormitórios', value: property.bedrooms, show: property.bedrooms > 0 },
    { icon: BedDouble, label: 'Suítes', value: property.suites || 0, show: (property.suites ?? 0) > 0 },
    { icon: Bath, label: 'Banheiros', value: property.bathrooms, show: property.bathrooms > 0 },
    { icon: Car, label: 'Vagas', value: property.parking, show: property.parking > 0 },
    { icon: Maximize, label: 'Área Total', value: formatArea(property.area), show: property.area > 0 },
    { icon: Home, label: 'Tipo', value: getPropertyTypeLabel(property.type), show: true },
    { icon: Tag, label: 'Categoria', value: getCategoryLabel(property.category), show: true },
    { icon: CalendarDays, label: 'Cadastro', value: new Date(property.createdAt).toLocaleDateString('pt-BR'), show: true },
  ].filter((d) => d.show);

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Link href="/" className="hover:text-primary-700 transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/imoveis" className="hover:text-primary-700 transition-colors">
            Imóveis
          </Link>
          <span>/</span>
          <span className="text-surface-700 truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/imoveis"
          className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para listagem
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Title & Price (Mobile) */}
            <div className="lg:hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-surface-900">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-surface-500 mt-2">
                    <MapPin className="w-4 h-4 text-accent-500" />
                    <span>
                      {property.address.neighborhood}, {property.address.city} - {property.address.state}
                    </span>
                  </div>
                </div>
                <ShareModal property={property} />
              </div>
              <p className="text-3xl font-bold gradient-text mt-4">
                {formatCurrency(property.price)}
              </p>
            </div>

            {/* Details Grid */}
            <div>
              <h2 className="text-lg font-semibold text-surface-900 mb-4">
                Características
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-surface-50 rounded-xl p-4 text-center border border-surface-100"
                  >
                    <detail.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                    <p className="text-sm text-surface-500">{detail.label}</p>
                    <p className="font-semibold text-surface-900">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-surface-900 mb-3">
                Descrição
              </h2>
              <p className="text-surface-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-surface-900 mb-4">
                  Diferenciais
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-surface-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            {/* Price Card (Desktop) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-card border border-surface-100 p-6 sticky top-28">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h1 className="text-xl font-serif font-bold text-surface-900 leading-snug">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-surface-500 text-sm mt-2">
                    <MapPin className="w-3.5 h-3.5 text-accent-500" />
                    <span>
                      {property.address.neighborhood}, {property.address.city}
                    </span>
                  </div>
                </div>
                <ShareModal property={property} />
              </div>

              <div className="py-4 border-y border-surface-100 mb-6">
                <p className="text-sm text-surface-500 mb-1">Valor</p>
                <p className="text-3xl font-bold gradient-text">
                  {formatCurrency(property.price)}
                </p>
              </div>

              {/* Contact Form */}
              <h3 className="font-semibold text-surface-900 mb-4">
                Tenho Interesse
              </h3>
              <ContactForm
                propertyTitle={property.title}
                propertyId={property.id}
              />
            </div>

            {/* Mobile Contact */}
            <div className="lg:hidden bg-white rounded-2xl shadow-card border border-surface-100 p-6">
              <h3 className="font-semibold text-surface-900 mb-4">
                Tenho Interesse
              </h3>
              <ContactForm
                propertyTitle={property.title}
                propertyId={property.id}
              />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-surface-900 mb-6">
              Imóveis Similares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
