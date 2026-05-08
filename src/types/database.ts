import { Prisma } from '@prisma/client';

// ============================================
// TIPOS DE RETORNO COM RELAÇÕES
// ============================================

// Serviço com todas as relações
export type ServicoCompleto = Prisma.ServicoGetPayload<{
  include: {
    categoria: true;
    itens: true;
    tags: {
      include: {
        tag: true;
      };
    };
    galeria: true;
  };
}>;

// Evento com galeria e depoimentos
export type EventoComGaleria = Prisma.EventoGetPayload<{
  include: {
    galeria: true;
    depoimentos: true;
  };
}>;

// Post do blog completo
export type BlogPostCompleto = Prisma.BlogPostGetPayload<{
  include: {
    autor: true;
    categoria: true;
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

// Imagem da galeria com relações
export type ImagemGaleriaCompleta = Prisma.GaleriaImagemGetPayload<{
  include: {
    categoria: true;
    servico: true;
    evento: true;
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

// ============================================
// TIPOS DE INPUT PARA FORMULÁRIOS
// ============================================

// ContatoPage.tsx não tem formulário — contato via WhatsApp/Email/Instagram/LinkedIn.
// Este tipo é usado no painel admin para registrar leads recebidos.
export type ContatoInput = {
  nome: string;
  email: string;
  telefone?: string;
  assunto?: string;
  mensagem: string;
  tipoEvento?: TipoEvento;
  canal?: 'whatsapp' | 'email' | 'instagram' | 'linkedin';
  origem?: string;
};

export type OrcamentoInput = {
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  // tipoEvento é opcional — cliente pode não informar ao chamar pelo WhatsApp
  tipoEvento?: TipoEvento;
  dataEvento?: Date;
  numeroConvidados?: number;
  local?: string;
  cidade?: string;
  observacoes?: string;
  servicoId?: string;
};

export type NewsletterInput = {
  email: string;
  nome?: string;
};

export type DepoimentoInput = {
  nome: string;
  cargo?: string;
  empresa?: string;
  foto?: string;
  depoimento: string;
  avaliacao: number;
  eventoId?: string;
};

// ============================================
// ENUMS — espelham exatamente o schema.prisma
// ============================================

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
}

export enum TipoEvento {
  CASAMENTO = 'CASAMENTO',
  DEBUTANTE = 'DEBUTANTE',           // ServicosPage: "Casamentos & Debutantes"
  ANIVERSARIO = 'ANIVERSARIO',
  CORPORATIVO = 'CORPORATIVO',
  FORMATURA = 'FORMATURA',
  BATIZADO = 'BATIZADO',
  CONFRATERNIZACAO = 'CONFRATERNIZACAO',
  JANTAR_PRIVATIVO = 'JANTAR_PRIVATIVO', // ContatoPage / HomePage: "jantares privativos"
  OUTRO = 'OUTRO',
}

export enum StatusEvento {
  AGENDADO = 'AGENDADO',
  CONFIRMADO = 'CONFIRMADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export enum StatusContato {
  NOVO = 'NOVO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  RESPONDIDO = 'RESPONDIDO',
  ARQUIVADO = 'ARQUIVADO',
}

export enum StatusOrcamento {
  PENDENTE = 'PENDENTE',
  EM_ANALISE = 'EM_ANALISE',
  ENVIADO = 'ENVIADO',
  APROVADO = 'APROVADO',
  RECUSADO = 'RECUSADO',
  EXPIRADO = 'EXPIRADO',
}

export enum TipoMidia {
  IMAGEM = 'IMAGEM',
  VIDEO = 'VIDEO',
}

// ============================================
// TIPOS ÚTEIS
// ============================================

export type PaginationParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Labels amigáveis para exibição no painel admin
export const TIPO_EVENTO_LABELS: Record<TipoEvento, string> = {
  [TipoEvento.CASAMENTO]: 'Casamento',
  [TipoEvento.DEBUTANTE]: 'Debutante',
  [TipoEvento.ANIVERSARIO]: 'Aniversário',
  [TipoEvento.CORPORATIVO]: 'Corporativo',
  [TipoEvento.FORMATURA]: 'Formatura',
  [TipoEvento.BATIZADO]: 'Batizado',
  [TipoEvento.CONFRATERNIZACAO]: 'Confraternização',
  [TipoEvento.JANTAR_PRIVATIVO]: 'Jantar Privativo',
  [TipoEvento.OUTRO]: 'Outro',
};

// Tags de serviço exibidas nos cards (ServicosPage.tsx)
export const SERVICO_TAGS = ['CERIMÔNIAS', 'EXCLUSIVO', 'ALTO VOLUME', 'CONSULTORIA'] as const;
export type ServicoTag = typeof SERVICO_TAGS[number];

// Categorias da galeria (GaleriaPage.tsx)
export const GALERIA_CATEGORIAS = ['Eventos', 'Casamentos', 'Debutantes', 'Personal Chef', 'Corporativo'] as const;
export type GaleriaCategoria = typeof GALERIA_CATEGORIAS[number];
