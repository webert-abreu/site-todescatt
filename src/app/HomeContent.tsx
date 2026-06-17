'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import {
  Search,
  Building2,
  Home,
  TreePine,
  Store,
  ArrowRight,
  Shield,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';

// We accept properties as props because this component is now a Client Component
// but the data fetching will happen in a Server Component wrapper.
interface HomeContentProps {
  allProperties: Property[];
}

export default function HomeContent({ allProperties }: HomeContentProps) {
  const highlighted = allProperties.filter((p) => p.highlighted).slice(0, 6);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const stats = [
    { value: `${allProperties.length}+`, label: 'Imóveis Disponíveis' },
    { value: '15+', label: 'Anos de Experiência' },
    { value: '500+', label: 'Clientes Atendidos' },
    { value: '98%', label: 'Satisfação' },
  ];

  const categories = [
    { type: 'apartment', label: 'Apartamentos', icon: Building2, count: allProperties.filter(p => p.type === 'apartment').length },
    { type: 'house', label: 'Casas', icon: Home, count: allProperties.filter(p => p.type === 'house').length },
    { type: 'land', label: 'Terrenos', icon: TreePine, count: allProperties.filter(p => p.type === 'land').length },
    { type: 'commercial', label: 'Comerciais', icon: Store, count: allProperties.filter(p => p.type === 'commercial').length },
  ];

  const benefits = [
    { icon: Shield, title: 'Segurança', description: 'Transações seguras e transparentes com toda documentação verificada rigorosamente.' },
    { icon: Users, title: 'Atendimento Personalizado', description: 'Equipe qualificada e dedicada a encontrar o imóvel que reflete seu estilo de vida.' },
    { icon: Award, title: 'Experiência de Mercado', description: 'Tradição e conhecimento aprofundado do mercado imobiliário regional.' },
    { icon: TrendingUp, title: 'Melhores Oportunidades', description: 'Acesso exclusivo às melhores opções de investimento e moradia de alto padrão.' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Parallax Background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="/hero-bc.jpg"
            alt="Vista de Balneário Camboriú"
            fill
            className="object-cover object-center scale-105"
            priority
            unoptimized={true}
            sizes="100vw"
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-6 tracking-tight text-balance">
              Elevando o seu <br className="hidden md:block" />
              <span className="relative inline-block">
                padrão de vida
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent-500/60 -z-10 skew-x-[-15deg] transform origin-bottom-left" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed font-light">
              Exclusividade, sofisticação e conforto. Descubra propriedades que são verdadeiras obras de arte no sul do Brasil.
            </p>

            {/* Glassmorphism Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-3 flex flex-col sm:flex-row gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-1 border border-transparent focus-within:ring-2 focus-within:ring-accent-400 transition-shadow">
                  <Building2 className="w-5 h-5 text-surface-400 shrink-0" />
                  <select
                    className="w-full bg-transparent px-3 py-3 text-surface-700 text-sm border-0 focus:outline-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="">Tipo de Imóvel</option>
                    <option value="apartment">Apartamento de Luxo</option>
                    <option value="house">Casa em Condomínio</option>
                    <option value="land">Terreno Exclusivo</option>
                    <option value="commercial">Comercial Premium</option>
                  </select>
                </div>

                <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-1 border border-transparent focus-within:ring-2 focus-within:ring-accent-400 transition-shadow">
                  <MapPin className="w-5 h-5 text-surface-400 shrink-0" />
                  <select
                    className="w-full bg-transparent px-3 py-3 text-surface-700 text-sm border-0 focus:outline-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="">Localização</option>
                    <option value="Balneário Camboriú">Balneário Camboriú</option>
                    <option value="Itapema">Itapema</option>
                  </select>
                </div>

                <Link
                  href="/imoveis"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-950 text-white font-medium text-sm hover:bg-primary-900 hover:shadow-lg transition-all duration-300 sm:w-auto w-full group/btn"
                >
                  <Search className="w-4 h-4 text-accent-400 group-hover/btn:scale-110 transition-transform" />
                  Buscar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white z-20"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
          />
        </motion.div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-surface-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span variants={itemVariants} className="text-accent-600 text-xs font-bold uppercase tracking-[0.2em]">
              Seleção Exclusiva
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-serif font-bold text-primary-950 mt-3 mb-4">
              Imóveis em Destaque
            </motion.h2>
            <motion.p variants={itemVariants} className="text-surface-600 max-w-2xl mx-auto text-lg font-light">
              Uma curadoria criteriosa das propriedades mais desejadas, projetadas para inspirar e encantar.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {highlighted.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary-200 bg-white text-primary-900 font-medium hover:border-primary-900 hover:bg-primary-900 hover:text-white transition-all duration-500 shadow-sm hover:shadow-md group"
            >
              Ver todo o portfólio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <p className="text-5xl sm:text-6xl font-serif font-bold text-white mb-3">
                  {stat.value}
                </p>
                <p className="text-accent-300 text-sm tracking-wider uppercase font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="text-accent-600 text-xs font-bold uppercase tracking-[0.2em]">
                Estilo de Vida
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary-950 mt-3">
                Como você deseja viver?
              </h2>
            </div>
            <Link href="/imoveis" className="text-primary-600 font-medium hover:text-primary-900 flex items-center gap-1 group transition-colors">
              Explorar categorias <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.type} variants={itemVariants}>
                <Link
                  href={`/imoveis?type=${cat.type}`}
                  className="group relative overflow-hidden rounded-3xl bg-surface-50 p-8 block border border-surface-100 hover:border-accent-200 transition-colors duration-500"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-accent-100/50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md transition-shadow duration-500">
                    <cat.icon className="w-8 h-8 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary-950 mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-surface-500 font-light flex items-center gap-2">
                    {cat.count} {cat.count === 1 ? 'propriedade' : 'propriedades'}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent-500" />
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <span className="text-accent-600 text-xs font-bold uppercase tracking-[0.2em]">
              Excelência
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary-950 mt-3">
              O Padrão Todescatt
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-elevated transition-shadow duration-500 border border-surface-100/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary-950 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-surface-500 leading-relaxed font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Elegant CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop"
                alt="Ambiente sofisticado"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-primary-950/80 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4 text-balance">
                  Pronto para encontrar seu novo endereço?
                </h2>
                <p className="text-white/70 text-lg font-light">
                  Assessoria completa para você realizar o melhor negócio com total discrição e segurança.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
                <Link
                  href="/imoveis"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary-950 font-semibold hover:bg-accent-50 transition-colors duration-300 shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  Explorar Portfólio
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Falar com Consultor
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
