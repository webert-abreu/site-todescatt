'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BedDouble, Bath, Car, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Property } from '@/types/property';
import { formatCurrency, formatArea, getPropertyTypeLabel, cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (property.createdAt) {
      setIsNew(new Date(property.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    }
  }, [property.createdAt]);

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const badgeConfig = {
    launch: { label: 'Lançamento', className: 'bg-primary-900 text-white' },
    new: { label: 'Novo', className: 'bg-emerald-600 text-white' },
  };


  const badge = property.category === 'launch'
    ? badgeConfig.launch
    : isNew
      ? badgeConfig.new
      : null;

  const images = property.images?.length > 0 ? property.images : ['/placeholder.jpg'];

  return (
    <Link
      href={`/imoveis/${property.id}`}
      id={`property-card-${property.id}`}
      className="group block rounded-[24px] overflow-hidden bg-white border border-surface-100 hover:border-surface-200 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1"
      onMouseEnter={() => {
        setIsHovered(true);
        if (emblaApi) emblaApi.reInit({ watchDrag: true });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (emblaApi) emblaApi.reInit({ watchDrag: false });
      }}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[24px] rounded-b-[8px] m-1.5">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((img, idx) => (
              <div className="relative flex-[0_0_100%] min-w-0 h-full" key={idx}>
                <Image
                  src={img}
                  alt={`${property.title} - Foto ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Carousel Navigation (Visible on Hover) */}
        {images.length > 1 && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <button
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-surface-900 flex items-center justify-center shadow-sm backdrop-blur-sm pointer-events-auto transition-transform hover:scale-105"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-surface-900 flex items-center justify-center shadow-sm backdrop-blur-sm pointer-events-auto transition-transform hover:scale-105"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === selectedIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={cn(
            'absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm',
            badge.className
          )}>
            {badge.label}
          </span>
        )}

        {/* Type label */}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium tracking-wide">
          {getPropertyTypeLabel(property.type)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 pt-4 space-y-4">
        <div>
          <p className="text-xl font-bold gradient-text mb-1">
            {formatCurrency(property.price)}
          </p>
          <h3 className="font-serif font-semibold text-primary-950 text-lg leading-snug line-clamp-1 group-hover:text-accent-500 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-surface-500 text-sm mt-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-light">
              {property.address.neighborhood}, {property.address.city}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100/60 text-surface-600 text-sm font-medium">
          <div className="flex gap-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5" title="Dormitórios">
                <BedDouble className="w-4 h-4 text-surface-400" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5" title="Banheiros">
                <Bath className="w-4 h-4 text-surface-400" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.parking > 0 && (
              <div className="flex items-center gap-1.5" title="Vagas">
                <Car className="w-4 h-4 text-surface-400" />
                <span>{property.parking}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5" title="Área">
            <Maximize className="w-4 h-4 text-surface-400" />
            <span>{formatArea(property.area)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
