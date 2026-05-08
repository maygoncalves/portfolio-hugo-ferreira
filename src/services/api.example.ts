/**
 * Exemplos de como usar Prisma para operações no banco de dados
 *
 * IMPORTANTE: Este arquivo é apenas exemplo/referência
 * Para usar em produção, você precisa criar endpoints de API
 * (usando Next.js API Routes, Express, ou outro framework backend)
 */

import { prisma } from '../lib/prisma';
import type { ContatoInput, OrcamentoInput, NewsletterInput } from '../types/database';

// ============================================
// SERVIÇOS
// ============================================

export const servicosAPI = {
  // Listar todos os serviços ativos
  async listar() {
    return await prisma.servico.findMany({
      where: { ativo: true },
      include: {
        categoria: true,
        itens: {
          orderBy: { ordem: 'asc' }
        },
        tags: {
          include: { tag: true }
        },
        galeria: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' },
          take: 5
        }
      },
      orderBy: [
        { destaque: 'desc' },
        { ordem: 'asc' }
      ]
    });
  },

  // Buscar serviço por slug
  async buscarPorSlug(slug: string) {
    return await prisma.servico.findUnique({
      where: { slug },
      include: {
        categoria: true,
        itens: {
          orderBy: { ordem: 'asc' }
        },
        tags: {
          include: { tag: true }
        },
        galeria: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' }
        }
      }
    });
  },

  // Buscar serviços em destaque
  async emDestaque(limite: number = 3) {
    return await prisma.servico.findMany({
      where: {
        ativo: true,
        destaque: true
      },
      include: {
        categoria: true
      },
      orderBy: { ordem: 'asc' },
      take: limite
    });
  }
};

// ============================================
// GALERIA
// ============================================

export const galeriaAPI = {
  // Listar imagens da galeria
  async listar(categoriaSlug?: string, limite?: number) {
    return await prisma.galeriaImagem.findMany({
      where: {
        ativo: true,
        ...(categoriaSlug && {
          categoria: { slug: categoriaSlug }
        })
      },
      include: {
        categoria: true,
        tags: {
          include: { tag: true }
        }
      },
      orderBy: [
        { destaque: 'desc' },
        { ordem: 'asc' },
        { createdAt: 'desc' }
      ],
      ...(limite && { take: limite })
    });
  },

  // Buscar imagens por serviço
  async porServico(servicoId: string) {
    return await prisma.galeriaImagem.findMany({
      where: {
        ativo: true,
        servicoId
      },
      orderBy: { ordem: 'asc' }
    });
  },

  // Buscar imagens por evento
  async porEvento(eventoId: string) {
    return await prisma.galeriaImagem.findMany({
      where: {
        ativo: true,
        eventoId
      },
      orderBy: { ordem: 'asc' }
    });
  }
};

// ============================================
// CONTATOS
// ============================================

export const contatosAPI = {
  // Criar novo contato
  async criar(data: ContatoInput) {
    return await prisma.contato.create({
      data: {
        ...data,
        status: 'NOVO',
        lido: false,
        respondido: false
      }
    });
  },

  // Listar contatos (admin)
  async listar(filtros?: {
    status?: string;
    lido?: boolean;
  }) {
    return await prisma.contato.findMany({
      where: filtros,
      orderBy: { createdAt: 'desc' }
    });
  },

  // Marcar como lido
  async marcarComoLido(id: string) {
    return await prisma.contato.update({
      where: { id },
      data: { lido: true }
    });
  },

  // Atualizar status
  async atualizarStatus(id: string, status: 'NOVO' | 'EM_ANDAMENTO' | 'RESPONDIDO' | 'ARQUIVADO') {
    return await prisma.contato.update({
      where: { id },
      data: { status }
    });
  }
};

// ============================================
// ORÇAMENTOS
// ============================================

export const orcamentosAPI = {
  // Criar novo orçamento
  async criar(data: OrcamentoInput) {
    return await prisma.orcamento.create({
      data: {
        ...data,
        status: 'PENDENTE'
      }
    });
  },

  // Listar orçamentos (admin)
  async listar(filtros?: {
    status?: string;
    tipoEvento?: string;
  }) {
    return await prisma.orcamento.findMany({
      where: filtros,
      include: {
        servico: true
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  // Atualizar status do orçamento
  async atualizarStatus(
    id: string,
    status: 'PENDENTE' | 'EM_ANALISE' | 'ENVIADO' | 'APROVADO' | 'RECUSADO' | 'EXPIRADO',
    valorEstimado?: number
  ) {
    return await prisma.orcamento.update({
      where: { id },
      data: {
        status,
        ...(valorEstimado && { valorEstimado })
      }
    });
  }
};

// ============================================
// NEWSLETTER
// ============================================

export const newsletterAPI = {
  // Inscrever na newsletter
  async inscrever(data: NewsletterInput) {
    return await prisma.newsletter.upsert({
      where: { email: data.email },
      create: {
        email: data.email,
        nome: data.nome,
        ativo: true,
        confirmado: false
      },
      update: {
        nome: data.nome,
        ativo: true
      }
    });
  },

  // Confirmar inscrição
  async confirmar(email: string) {
    return await prisma.newsletter.update({
      where: { email },
      data: { confirmado: true }
    });
  },

  // Cancelar inscrição
  async cancelar(email: string) {
    return await prisma.newsletter.update({
      where: { email },
      data: { ativo: false }
    });
  }
};

// ============================================
// EVENTOS
// ============================================

export const eventosAPI = {
  // Listar eventos públicos
  async publicos() {
    return await prisma.evento.findMany({
      where: {
        publico: true,
        status: { in: ['CONFIRMADO', 'CONCLUIDO'] }
      },
      include: {
        galeria: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' }
        }
      },
      orderBy: { dataInicio: 'desc' }
    });
  },

  // Eventos futuros
  async futuros() {
    const agora = new Date();
    return await prisma.evento.findMany({
      where: {
        publico: true,
        dataInicio: { gte: agora },
        status: { in: ['AGENDADO', 'CONFIRMADO'] }
      },
      orderBy: { dataInicio: 'asc' }
    });
  },

  // Eventos passados (para galeria)
  async passados(limite?: number) {
    const agora = new Date();
    return await prisma.evento.findMany({
      where: {
        publico: true,
        dataInicio: { lt: agora },
        status: 'CONCLUIDO'
      },
      include: {
        galeria: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' },
          take: 5
        }
      },
      orderBy: { dataInicio: 'desc' },
      ...(limite && { take: limite })
    });
  }
};

// ============================================
// DEPOIMENTOS
// ============================================

export const depoimentosAPI = {
  // Listar depoimentos ativos
  async listar() {
    return await prisma.depoimento.findMany({
      where: { ativo: true },
      orderBy: [
        { destaque: 'desc' },
        { ordem: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  },

  // Criar novo depoimento (requer aprovação)
  async criar(data: {
    nome: string;
    cargo?: string;
    empresa?: string;
    depoimento: string;
    avaliacao: number;
  }) {
    return await prisma.depoimento.create({
      data: {
        ...data,
        ativo: false // requer aprovação do admin
      }
    });
  }
};

// ============================================
// BLOG
// ============================================

export const blogAPI = {
  // Listar posts publicados
  async listar(categoriaSlug?: string, limite?: number) {
    return await prisma.blogPost.findMany({
      where: {
        publicado: true,
        ...(categoriaSlug && {
          categoria: { slug: categoriaSlug }
        })
      },
      include: {
        autor: {
          select: {
            name: true,
            avatar: true
          }
        },
        categoria: true,
        tags: {
          include: { tag: true }
        }
      },
      orderBy: [
        { destaque: 'desc' },
        { dataPublicacao: 'desc' }
      ],
      ...(limite && { take: limite })
    });
  },

  // Buscar post por slug
  async buscarPorSlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        autor: {
          select: {
            name: true,
            avatar: true
          }
        },
        categoria: true,
        tags: {
          include: { tag: true }
        }
      }
    });

    // Incrementar visualizações
    if (post) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { visualizacoes: { increment: 1 } }
      });
    }

    return post;
  },

  // Posts em destaque
  async emDestaque(limite: number = 3) {
    return await prisma.blogPost.findMany({
      where: {
        publicado: true,
        destaque: true
      },
      include: {
        autor: {
          select: {
            name: true,
            avatar: true
          }
        },
        categoria: true
      },
      orderBy: { dataPublicacao: 'desc' },
      take: limite
    });
  }
};

// ============================================
// CONFIGURAÇÕES
// ============================================

export const configAPI = {
  // Buscar configuração por chave
  async buscar(chave: string) {
    const config = await prisma.configuracao.findUnique({
      where: { chave }
    });
    return config?.valor;
  },

  // Buscar múltiplas configurações por grupo
  async buscarPorGrupo(grupo: string) {
    const configs = await prisma.configuracao.findMany({
      where: { grupo }
    });

    return configs.reduce((acc, config) => {
      acc[config.chave] = config.valor;
      return acc;
    }, {} as Record<string, string>);
  },

  // Atualizar configuração
  async atualizar(chave: string, valor: string) {
    return await prisma.configuracao.upsert({
      where: { chave },
      create: { chave, valor },
      update: { valor }
    });
  }
};
