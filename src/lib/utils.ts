export function formatCurrency(value: number): string {
  if (value === 0) return 'Sob Consulta';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(value: number): string {
  return `${value} m²`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: 'Apartamento',
    house: 'Casa',
    land: 'Terreno',
    commercial: 'Comercial',
  };
  return labels[type] || type;
}

export function getPropertyStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Disponível',
    sold: 'Vendido',
    reserved: 'Reservado',
  };
  return labels[status] || status;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    launch: 'Lançamento',
    third_party: 'Terceiros',
  };
  return labels[category] || category;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
