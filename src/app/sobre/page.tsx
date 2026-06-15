import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Eye,
  Heart,
  Award,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a Imobiliária Todescatt. Anos de experiência no mercado imobiliário, atendimento personalizado e compromisso com a satisfação dos nossos clientes.',
};

export default function SobrePage() {
  const values = [
    {
      icon: Shield,
      title: 'Confiança',
      description: 'Construímos relações sólidas baseadas em transparência e honestidade em todas as negociações.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser referência no mercado imobiliário regional, inovando constantemente para melhor atender nossos clientes.',
    },
    {
      icon: Heart,
      title: 'Compromisso',
      description: 'Dedicação total em cada atendimento, buscando sempre superar as expectativas dos nossos clientes.',
    },
  ];

  const differentials = [
    'Portfólio diversificado e atualizado diariamente',
    'Equipe de corretores credenciados e experientes',
    'Atendimento personalizado e humanizado',
    'Documentação verificada e processos seguros',
    'Avaliação gratuita de imóveis',
    'Suporte completo pós-venda',
    'Parceria com as melhores construtoras da região',
    'Presença digital com tecnologia de ponta',
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="gradient-primary py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">
            Sobre Nós
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mt-3 mb-4 text-balance">
            Transformando sonhos em endereços
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Há anos atuando no mercado imobiliário, a Imobiliária Todescatt é sinônimo de confiança, qualidade e excelência.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-500 text-sm font-semibold uppercase tracking-wider">
                Nossa História
              </span>
              <h2 className="text-3xl font-serif font-bold text-surface-900 mt-2 mb-6">
                Tradição e Inovação no Mercado Imobiliário
              </h2>
              <div className="space-y-4 text-surface-600 leading-relaxed">
                <p>
                  A Imobiliária Todescatt nasceu do desejo de oferecer um atendimento diferenciado no mercado imobiliário. Com raízes na região Sul do Brasil, construímos nossa reputação sobre os pilares da confiança, transparência e profissionalismo.
                </p>
                <p>
                  Ao longo dos anos, expandimos nosso portfólio e modernizamos nossos processos, sempre mantendo a essência de um atendimento próximo e personalizado. Cada cliente é único, e cada imóvel tem uma história para contar.
                </p>
                <p>
                  Hoje, contamos com uma equipe qualificada de corretores credenciados e uma plataforma tecnológica de ponta, integrando os melhores empreendimentos e imóveis disponíveis no mercado para conectar pessoas aos seus futuros lares.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-elevated">
                <Image
                  src="/escritorio.jpg"
                  alt="Escritório da Imobiliária Todescatt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl gradient-accent opacity-20 -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-primary-200 opacity-30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 sm:py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-sm font-semibold uppercase tracking-wider">
              Nossos Valores
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-surface-900 mt-2">
              O que nos move
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-surface-100 text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-surface-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, value: '500+', label: 'Imóveis Negociados' },
              { icon: Users, value: '1.000+', label: 'Clientes Satisfeitos' },
              { icon: Award, value: '15+', label: 'Anos de Mercado' },
              { icon: Handshake, value: '98%', label: 'Taxa de Satisfação' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 shadow-card border border-surface-100 text-center"
              >
                <stat.icon className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-surface-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-surface-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-16 sm:py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-500 text-sm font-semibold uppercase tracking-wider">
                Diferenciais
              </span>
              <h2 className="text-3xl font-serif font-bold text-surface-900 mt-2 mb-6">
                Por que nos escolher?
              </h2>
              <div className="space-y-3">
                {differentials.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-surface-600"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-elevated">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop"
                  alt="Imóvel de qualidade"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-xl shadow-elevated p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-900" />
                </div>
                <div>
                  <p className="font-semibold text-surface-900 text-sm">Missão</p>
                  <p className="text-xs text-surface-500">Realizar sonhos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-surface-900 mb-4">
            Vamos conversar?
          </h2>
          <p className="text-surface-500 text-lg mb-8 max-w-xl mx-auto">
            Entre em contato e descubra como podemos ajudar você a encontrar o imóvel perfeito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full gradient-accent text-primary-900 font-semibold hover:shadow-glow transition-all duration-300"
            >
              Ver Imóveis
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary-800 text-primary-800 font-semibold hover:bg-primary-800 hover:text-white transition-all duration-300 group"
            >
              Fale Conosco
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
