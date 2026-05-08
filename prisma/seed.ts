import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados — Hugo Ferreira Gastronomia...');

  // ============================================
  // USUÁRIO ADMIN
  // ============================================
  console.log('👤 Criando usuário admin...');

  const admin = await prisma.user.upsert({
    where: { email: 'hugo.284356@gmail.com' },
    update: {},
    create: {
      email: 'hugo.284356@gmail.com',
      name: 'Hugo Alexandre Ferreira',
      role: 'ADMIN',
      phone: '(19) 98137-7754',
      active: true,
    },
  });

  // ============================================
  // CATEGORIAS DE SERVIÇOS
  // Mapeamento exato das tags exibidas nos cards (ServicosPage.tsx)
  // ============================================
  console.log('📂 Criando categorias de serviços...');

  const categoriaCerimonias = await prisma.categoriaServico.upsert({
    where: { slug: 'cerimonias' },
    update: {},
    create: {
      nome: 'Cerimônias',
      slug: 'cerimonias',
      descricao: 'Casamentos, debutantes e celebrações especiais',
      icone: '💍',
      cor: '#c9a84c',
      ordem: 1,
      ativo: true,
    },
  });

  const categoriaExclusivo = await prisma.categoriaServico.upsert({
    where: { slug: 'exclusivo' },
    update: {},
    create: {
      nome: 'Exclusivo',
      slug: 'exclusivo',
      descricao: 'Atendimento personalizado e íntimo',
      icone: '⭐',
      cor: '#b8954a',
      ordem: 2,
      ativo: true,
    },
  });

  const categoriaAltoVolume = await prisma.categoriaServico.upsert({
    where: { slug: 'alto-volume' },
    update: {},
    create: {
      nome: 'Alto Volume',
      slug: 'alto-volume',
      descricao: 'Eventos de grande escala com alto padrão',
      icone: '🏢',
      cor: '#c9a84c',
      ordem: 3,
      ativo: true,
    },
  });

  const categoriaConsultoria = await prisma.categoriaServico.upsert({
    where: { slug: 'consultoria' },
    update: {},
    create: {
      nome: 'Consultoria',
      slug: 'consultoria',
      descricao: 'Gestão e padronização de cozinhas',
      icone: '📋',
      cor: '#b8954a',
      ordem: 4,
      ativo: true,
    },
  });

  // ============================================
  // SERVIÇOS
  // Dados extraídos exatamente de ServicosPage.tsx → cards[]
  // ============================================
  console.log('🍽️ Criando serviços...');

  const servicoCasamentos = await prisma.servico.upsert({
    where: { slug: 'casamentos-debutantes' },
    update: {},
    create: {
      titulo: 'Casamentos & Debutantes',
      slug: 'casamentos-debutantes',
      tag: 'CERIMÔNIAS',
      descricao:
        'Cuido de tudo — do planejamento do cardápio à operação completa no dia mais especial da sua vida. Realizo degustações personalizadas e garanto sincronia total entre minha cozinha e a equipe do salão, do primeiro aperitivo à última sobremesa.',
      descricaoCurta: 'Operação completa para o dia mais especial da sua vida.',
      imagem: '/images/servicos/casamentos-debutantes.jpg',
      categoriaId: categoriaCerimonias.id,
      ativo: true,
      destaque: true,
      ordem: 1,
    },
  });

  await prisma.itemServico.createMany({
    data: [
      { servicoId: servicoCasamentos.id, nome: 'Reunião de briefing e definição do cardápio', incluido: true, ordem: 1 },
      { servicoId: servicoCasamentos.id, nome: 'Degustação presencial com ajustes', incluido: true, ordem: 2 },
      { servicoId: servicoCasamentos.id, nome: 'Coordenação de equipe de cozinha no evento', incluido: true, ordem: 3 },
      { servicoId: servicoCasamentos.id, nome: 'Sincronia com equipe do salão e organização', incluido: true, ordem: 4 },
      { servicoId: servicoCasamentos.id, nome: 'Controle de qualidade e apresentação dos pratos', incluido: true, ordem: 5 },
    ],
    skipDuplicates: true,
  });

  const servicoPersonalChef = await prisma.servico.upsert({
    where: { slug: 'personal-chef' },
    update: {},
    create: {
      titulo: 'Personal Chef',
      slug: 'personal-chef',
      tag: 'EXCLUSIVO',
      descricao:
        'Crio cardápios sob medida para jantares intimistas, recepções familiares e celebrações privadas. Cuido de tudo: seleciono e compro os insumos, executo e sirvo no local — com atenção total à sua experiência e à dos seus convidados.',
      descricaoCurta: 'Cardápios exclusivos e atendimento completo no local.',
      imagem: '/images/servicos/personal-chef.jpg',
      categoriaId: categoriaExclusivo.id,
      ativo: true,
      destaque: true,
      ordem: 2,
    },
  });

  await prisma.itemServico.createMany({
    data: [
      { servicoId: servicoPersonalChef.id, nome: 'Cardápio personalizado conforme tema e perfil dos convidados', incluido: true, ordem: 1 },
      { servicoId: servicoPersonalChef.id, nome: 'Seleção e compra dos insumos', incluido: true, ordem: 2 },
      { servicoId: servicoPersonalChef.id, nome: 'Execução completa dos pratos no local', incluido: true, ordem: 3 },
      { servicoId: servicoPersonalChef.id, nome: 'Serviço e apresentação durante o jantar', incluido: true, ordem: 4 },
      { servicoId: servicoPersonalChef.id, nome: 'Atendimento exclusivo e direto', incluido: true, ordem: 5 },
    ],
    skipDuplicates: true,
  });

  const servicoEventos = await prisma.servico.upsert({
    where: { slug: 'eventos-especiais-corporativos' },
    update: {},
    create: {
      titulo: 'Eventos Especiais & Corporativos',
      slug: 'eventos-especiais-corporativos',
      tag: 'ALTO VOLUME',
      descricao:
        'Tenho experiência consolidada em cozinhas de grande escala e sei entregar qualidade mesmo sob alta demanda. Atendo confraternizações corporativas, eventos temáticos, formaturas e celebrações que exigem produção em volume com padrão.',
      descricaoCurta: 'Qualidade em escala para grandes celebrações.',
      imagem: '/images/servicos/eventos-corporativos.jpg',
      categoriaId: categoriaAltoVolume.id,
      ativo: true,
      destaque: false,
      ordem: 3,
    },
  });

  await prisma.itemServico.createMany({
    data: [
      { servicoId: servicoEventos.id, nome: 'Planejamento e programação de produção', incluido: true, ordem: 1 },
      { servicoId: servicoEventos.id, nome: 'Coordenação de equipe para grandes volumes', incluido: true, ordem: 2 },
      { servicoId: servicoEventos.id, nome: 'Controle rigoroso de insumos e desperdícios', incluido: true, ordem: 3 },
      { servicoId: servicoEventos.id, nome: 'Padronização de apresentação em escala', incluido: true, ordem: 4 },
      { servicoId: servicoEventos.id, nome: 'Gestão do fluxo de serviço', incluido: true, ordem: 5 },
    ],
    skipDuplicates: true,
  });

  const servicoGestao = await prisma.servico.upsert({
    where: { slug: 'gestao-de-cozinha' },
    update: {},
    create: {
      titulo: 'Gestão de Cozinha',
      slug: 'gestao-de-cozinha',
      tag: 'CONSULTORIA',
      descricao:
        'Ofereço minha experiência para organizar, liderar e padronizar operações de cozinha em restaurantes, empresas e espaços de eventos. Cuido da equipe, dos cardápios e dos processos — para que sua operação funcione com eficiência e consistência.',
      descricaoCurta: 'Organização, liderança e padronização de operações.',
      imagem: '/images/servicos/gestao-cozinha.jpg',
      categoriaId: categoriaConsultoria.id,
      ativo: true,
      destaque: false,
      ordem: 4,
    },
  });

  await prisma.itemServico.createMany({
    data: [
      { servicoId: servicoGestao.id, nome: 'Diagnóstico operacional da cozinha', incluido: true, ordem: 1 },
      { servicoId: servicoGestao.id, nome: 'Organização e liderança de equipes', incluido: true, ordem: 2 },
      { servicoId: servicoGestao.id, nome: 'Criação e padronização de processos', incluido: true, ordem: 3 },
      { servicoId: servicoGestao.id, nome: 'Planejamento de cardápios e controle de estoque', incluido: true, ordem: 4 },
      { servicoId: servicoGestao.id, nome: 'Acompanhamento e treinamento da equipe', incluido: true, ordem: 5 },
    ],
    skipDuplicates: true,
  });

  // ============================================
  // CATEGORIAS DE GALERIA
  // Extraídas exatamente de GaleriaPage.tsx → cells[].category
  // e cores de fundo representativas de cada categoria
  // ============================================
  console.log('🖼️ Criando categorias de galeria...');

  await prisma.categoriaGaleria.createMany({
    data: [
      { nome: 'Eventos', slug: 'eventos', cor: '#252018', ordem: 1, ativo: true },
      { nome: 'Casamentos', slug: 'casamentos', cor: '#1e1b14', ordem: 2, ativo: true },
      { nome: 'Debutantes', slug: 'debutantes', cor: '#32291f', ordem: 3, ativo: true },
      { nome: 'Personal Chef', slug: 'personal-chef', cor: '#262018', ordem: 4, ativo: true },
      { nome: 'Corporativo', slug: 'corporativo', cor: '#2e2922', ordem: 5, ativo: true },
    ],
    skipDuplicates: true,
  });

  // ============================================
  // TAGS
  // Alinhadas com as categorias da galeria e serviços
  // ============================================
  console.log('🏷️ Criando tags...');

  await prisma.tag.createMany({
    data: [
      { nome: 'Casamentos', slug: 'casamentos', cor: '#c9a84c' },
      { nome: 'Debutantes', slug: 'debutantes', cor: '#b8954a' },
      { nome: 'Personal Chef', slug: 'personal-chef', cor: '#c9a84c' },
      { nome: 'Corporativo', slug: 'corporativo', cor: '#b8954a' },
      { nome: 'Eventos', slug: 'eventos', cor: '#c9a84c' },
      { nome: 'Gastronomia', slug: 'gastronomia', cor: '#b8954a' },
      { nome: 'Gestão de Cozinha', slug: 'gestao-cozinha', cor: '#c9a84c' },
    ],
    skipDuplicates: true,
  });

  // ============================================
  // CATEGORIAS DE BLOG
  // Não há página de blog no front, mas mantido para uso futuro
  // ============================================
  console.log('📝 Criando categorias de blog...');

  await prisma.categoriaBlog.createMany({
    data: [
      { nome: 'Gastronomia', slug: 'gastronomia', ordem: 1 },
      { nome: 'Eventos', slug: 'eventos', ordem: 2 },
      { nome: 'Bastidores', slug: 'bastidores', ordem: 3 },
      { nome: 'Dicas', slug: 'dicas', ordem: 4 },
    ],
    skipDuplicates: true,
  });

  // ============================================
  // CONFIGURAÇÕES DO SITE
  // Dados reais do ContatoPage.tsx e demais páginas
  // ============================================
  console.log('⚙️ Criando configurações...');

  await prisma.configuracao.createMany({
    data: [
      // Identidade
      {
        chave: 'chef_nome',
        valor: 'Hugo Alexandre Ferreira',
        tipo: 'TEXTO',
        descricao: 'Nome completo do chef',
        grupo: 'identidade',
      },
      {
        chave: 'chef_nome_exibicao',
        valor: 'Hugo Ferreira',
        tipo: 'TEXTO',
        descricao: 'Nome exibido na navbar e logo',
        grupo: 'identidade',
      },
      {
        chave: 'chef_titulo',
        valor: 'Chefe de Cozinha & Gestor de Eventos',
        tipo: 'TEXTO',
        descricao: 'Título profissional',
        grupo: 'identidade',
      },
      {
        chave: 'chef_cidade',
        valor: 'Piracicaba – SP',
        tipo: 'TEXTO',
        descricao: 'Cidade base (ContatoPage → card Localização)',
        grupo: 'identidade',
      },
      {
        chave: 'chef_cobertura',
        valor: 'Disponível em qualquer lugar do Brasil e no exterior',
        tipo: 'TEXTO',
        descricao: 'Área de cobertura exibida no card de localização',
        grupo: 'identidade',
      },
      // Contato — dados exatos do ContatoPage.tsx
      {
        chave: 'chef_whatsapp',
        valor: '5519981377754',
        tipo: 'TEXTO',
        descricao: 'Número WhatsApp (sem formatação, com DDI)',
        grupo: 'contato',
      },
      {
        chave: 'chef_whatsapp_exibicao',
        valor: '(19) 98137-7754',
        tipo: 'TEXTO',
        descricao: 'Número WhatsApp formatado para exibição',
        grupo: 'contato',
      },
      {
        chave: 'chef_whatsapp_mensagem',
        valor: 'Olá, Hugo! Vi seu portfólio e gostaria de solicitar uma proposta para meu evento.',
        tipo: 'TEXTO',
        descricao: 'Mensagem pré-preenchida do WhatsApp',
        grupo: 'contato',
      },
      {
        chave: 'chef_email',
        valor: 'hugo.284356@gmail.com',
        tipo: 'EMAIL',
        descricao: 'E-mail de contato (ContatoPage → card E-mail)',
        grupo: 'contato',
      },
      // Redes sociais — exatos do ContatoPage.tsx
      {
        chave: 'chef_instagram_handle',
        valor: '@chefehugoferreira',
        tipo: 'TEXTO',
        descricao: 'Handle do Instagram exibido no card',
        grupo: 'redes-sociais',
      },
      {
        chave: 'chef_instagram_url',
        valor: 'https://www.instagram.com/chefehugoferreira/',
        tipo: 'URL',
        descricao: 'URL completa do perfil no Instagram',
        grupo: 'redes-sociais',
      },
      {
        chave: 'chef_instagram_descricao',
        valor: 'Pratos, bastidores e novidades toda semana.',
        tipo: 'TEXTO',
        descricao: 'Descrição exibida no card do Instagram',
        grupo: 'redes-sociais',
      },
      {
        chave: 'chef_linkedin_nome',
        valor: 'Hugo Alexandre Ferreira',
        tipo: 'TEXTO',
        descricao: 'Nome exibido no card do LinkedIn',
        grupo: 'redes-sociais',
      },
      {
        chave: 'chef_linkedin_url',
        valor: 'https://www.linkedin.com/in/hugoalexandreferreira/',
        tipo: 'URL',
        descricao: 'URL completa do perfil no LinkedIn',
        grupo: 'redes-sociais',
      },
      {
        chave: 'chef_linkedin_descricao',
        valor: 'Trajetória profissional e conexões.',
        tipo: 'TEXTO',
        descricao: 'Descrição exibida no card do LinkedIn',
        grupo: 'redes-sociais',
      },
      // Estatísticas (HomePage → NumbersSection)
      {
        chave: 'stat_anos_experiencia',
        valor: '20',
        tipo: 'NUMERO',
        descricao: 'Anos de experiência (contador animado)',
        grupo: 'estatisticas',
      },
      {
        chave: 'stat_eventos_realizados',
        valor: '200',
        tipo: 'NUMERO',
        descricao: 'Eventos realizados (contador animado)',
        grupo: 'estatisticas',
      },
      {
        chave: 'stat_certificacoes',
        valor: '3',
        tipo: 'NUMERO',
        descricao: 'Certificações de liderança',
        grupo: 'estatisticas',
      },
    ],
    skipDuplicates: true,
  });

  // ============================================
  // DEPOIMENTOS
  // Relacionados ao tipo de trabalho real do chef
  // ============================================
  console.log('💬 Criando depoimentos...');

  await prisma.depoimento.createMany({
    data: [
      {
        nome: 'Camila & Rafael',
        cargo: 'Noivos',
        depoimento:
          'O Hugo foi impecável no nosso casamento. Do briefing à última sobremesa, cuidou de cada detalhe com uma atenção que nos deixou completamente tranquilos. Os convidados ainda perguntam sobre o jantar!',
        avaliacao: 5,
        ativo: true,
        destaque: true,
        ordem: 1,
      },
      {
        nome: 'Fernanda Alves',
        cargo: 'Aniversariante',
        depoimento:
          'Contratei o Hugo como personal chef para o meu jantar de 30 anos com 12 pessoas. Foi uma experiência incrível — cardápio totalmente personalizado, ingredientes selecionados e um serviço impecável do início ao fim.',
        avaliacao: 5,
        ativo: true,
        destaque: true,
        ordem: 2,
      },
      {
        nome: 'Marcelo Souza',
        cargo: 'Gerente de Operações',
        empresa: 'Grupo Industrial Piracicaba',
        depoimento:
          'O Hugo geriu a cozinha do nosso evento corporativo com 150 pessoas com total profissionalismo. Controle de custos, equipe coordenada e qualidade constante. Exatamente o que precisávamos.',
        avaliacao: 5,
        ativo: true,
        destaque: false,
        ordem: 3,
      },
      {
        nome: 'Família Rodrigues',
        cargo: 'Pais da Debutante',
        depoimento:
          'A festa de 15 anos da nossa filha ficou muito além do esperado. Hugo participou do planejamento, sugeriu o cardápio e cuidou de cada prato com carinho. Recomendamos de olhos fechados.',
        avaliacao: 5,
        ativo: true,
        destaque: false,
        ordem: 4,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('\n📊 Dados criados:');
  console.log('  - 1 usuário admin (Hugo Ferreira)');
  console.log('  - 4 categorias de serviços (Cerimônias, Exclusivo, Alto Volume, Consultoria)');
  console.log('  - 4 serviços com bullets (exatos do ServicosPage.tsx)');
  console.log('  - 5 categorias de galeria (exatas do GaleriaPage.tsx)');
  console.log('  - 7 tags');
  console.log('  - 4 categorias de blog');
  console.log('  - 17 configurações (dados reais: WhatsApp, email, Instagram, LinkedIn, localização)');
  console.log('  - 4 depoimentos');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
