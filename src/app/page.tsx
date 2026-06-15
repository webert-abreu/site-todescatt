import { fetchProperties } from '@/lib/dwv-client';
import HomeContent from './HomeContent';

// This is the server component that fetches data
export default async function HomePage() {
  const allProperties = await fetchProperties();

  return <HomeContent allProperties={allProperties} />;
}
