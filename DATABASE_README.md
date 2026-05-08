# 🗄️ Banco de Dados - Sistema de Gastronomia & Eventos

Sistema completo de banco de dados usando **Prisma ORM** + **Supabase (PostgreSQL)**.

## 📑 Documentação

Este projeto possui documentação completa do banco de dados dividida em:

### 🚀 [Quick Start](./DATABASE_QUICKSTART.md)
**Comece aqui!** Guia rápido de 5 minutos para conectar com Supabase.
- Setup inicial passo a passo
- Criação de projeto no Supabase
- Configuração de variáveis de ambiente
- Sincronização do schema
- População de dados iniciais

### 📊 [Schema Visual](./DATABASE_SCHEMA.md)
Visualização completa da estrutura de dados.
- Diagrama de relacionamentos
- Descrição de todas as tabelas
- Índices de performance
- Casos de uso e exemplos

### 📖 [Setup Completo](./SUPABASE_SETUP.md)
Guia detalhado de integração Supabase + Prisma.
- Instruções completas de setup
- Comandos do Prisma
- Estrutura do banco
- Próximos passos
- Exemplos de seeds

### 📝 [Schema Prisma](./prisma/schema.prisma)
Código-fonte do schema do banco de dados.
- Definição de todos os modelos
- Relacionamentos
- Índices e constraints
- Enums e tipos

### 💻 [Exemplos de API](./src/services/api.example.ts)
Exemplos práticos de uso do Prisma.
- Funções prontas para CRUD
- Queries com relacionamentos
- Filtros e paginação
- Boas práticas

## ⚡ Início Rápido

### 1. Instalar dependências
```bash
pnpm add @prisma/client @supabase/supabase-js
pnpm add -D prisma tsx
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais do Supabase
```

### 3. Sincronizar schema
```bash
pnpm db:push
```

### 4. Popular dados iniciais
```bash
pnpm db:seed
```

### 5. Visualizar dados
```bash
pnpm db:studio
```

## 🎯 O que está incluído

### Entidades Principais

#### 🍽️ Serviços
- `Servico` - Serviços oferecidos (buffets, eventos)
- `CategoriaServico` - Categorias de serviços
- `ItemServico` - Itens incluídos em cada serviço

#### 📅 Eventos
- `Evento` - Eventos realizados/agendados
- `Orcamento` - Solicitações de orçamento

#### 🖼️ Galeria
- `GaleriaImagem` - Imagens e vídeos
- `CategoriaGaleria` - Categorias de mídia

#### 📧 Comunicação
- `Contato` - Mensagens do formulário
- `Newsletter` - Inscritos na newsletter
- `Depoimento` - Depoimentos de clientes

#### 📰 Conteúdo
- `BlogPost` - Posts do blog
- `CategoriaBlog` - Categorias de posts

#### 👤 Sistema
- `User` - Usuários (admin/editores)
- `Tag` - Sistema de tags universal
- `Configuracao` - Configurações dinâmicas

## 📦 Scripts Disponíveis

```bash
# Sincronizar schema com banco (desenvolvimento)
pnpm db:push

# Gerar Prisma Client
pnpm db:generate

# Abrir Prisma Studio (interface gráfica)
pnpm db:studio

# Popular banco com dados de exemplo
pnpm db:seed

# Criar migration (produção)
pnpm db:migrate

# Aplicar migrations em produção
pnpm db:migrate:deploy
```

## 📊 Estatísticas

- ✅ **15 tabelas principais**
- ✅ **3 tabelas de relacionamento** (many-to-many)
- ✅ **6 enums** para tipos fixos
- ✅ **35+ índices** de performance
- ✅ **Soft delete** com campos `ativo`
- ✅ **Timestamps automáticos** (createdAt/updatedAt)

## 🔥 Recursos Principais

### 🎨 Sistema de Tags
Tags reutilizáveis que podem ser vinculadas a:
- Serviços
- Imagens da galeria
- Posts do blog

### 📸 Galeria Flexível
Imagens podem estar associadas a:
- Serviços específicos
- Eventos específicos
- Categorias gerais

### ⚙️ Configurações Dinâmicas
Sistema de configurações chave-valor com:
- Tipos: TEXTO, NUMERO, BOOLEAN, JSON, URL, EMAIL
- Agrupamento por categoria
- Facilita gerenciamento via admin

### 💬 Sistema de Depoimentos
- Aprovação manual (campo `ativo`)
- Sistema de destaque
- Avaliação de 1-5 estrelas

### 📝 Blog Completo
- Sistema de categorias
- Tags múltiplas
- Contagem de visualizações
- SEO (metaTitle/metaDescription)
- Agendamento de publicação

## 🔗 Relacionamentos

```
User
├─ Evento (criador)
└─ BlogPost (autor)

Servico
├─ CategoriaServico
├─ ItemServico[]
├─ Orcamento[]
├─ Tags[]
└─ GaleriaImagem[]

Evento
├─ User (criador)
└─ GaleriaImagem[]

BlogPost
├─ User (autor)
├─ CategoriaBlog
└─ Tags[]

GaleriaImagem
├─ CategoriaGaleria
├─ Servico (opcional)
├─ Evento (opcional)
└─ Tags[]
```

## 💡 Exemplo de Uso

```typescript
import { prisma } from './lib/prisma';

// Buscar serviços com todas as relações
const servicos = await prisma.servico.findMany({
  where: { ativo: true },
  include: {
    categoria: true,
    itens: true,
    tags: {
      include: { tag: true }
    },
    galeria: {
      where: { ativo: true },
      take: 5
    }
  },
  orderBy: { ordem: 'asc' }
});

// Criar novo contato
const contato = await prisma.contato.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '11999999999',
    mensagem: 'Gostaria de um orçamento',
    origem: '/contato'
  }
});

// Buscar eventos públicos futuros
const eventosFuturos = await prisma.evento.findMany({
  where: {
    publico: true,
    dataInicio: { gte: new Date() },
    status: { in: ['AGENDADO', 'CONFIRMADO'] }
  },
  include: { galeria: true },
  orderBy: { dataInicio: 'asc' }
});
```

## 🔐 Segurança

### ✅ Boas Práticas Implementadas
- Senhas nunca armazenadas (use Supabase Auth)
- Campos sensíveis não expostos
- Validação de email em campos de email
- Soft delete para preservar histórico
- Índices para prevenir queries lentas

### ⚠️ Lembre-se
- **Nunca** commite o arquivo `.env`
- Use variáveis de ambiente para credenciais
- Configure Row Level Security (RLS) no Supabase
- Valide inputs antes de salvar no banco

## 📚 Próximos Passos

1. ✅ Criar arquivo `.env` com credenciais
2. ✅ Executar `pnpm db:push` para criar tabelas
3. ✅ Executar `pnpm db:seed` para popular dados
4. 📝 Integrar formulários do frontend com o banco
5. 🎨 Criar painel administrativo
6. 🔒 Configurar autenticação (Supabase Auth)
7. 🚀 Deploy em produção

## 🆘 Suporte

### Problemas Comuns
Consulte o [Quick Start](./DATABASE_QUICKSTART.md) - seção "Problemas comuns"

### Documentação Oficial
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma + Supabase](https://supabase.com/docs/guides/integrations/prisma)

### Arquivos de Referência
- `prisma/schema.prisma` - Schema completo
- `src/lib/prisma.ts` - Cliente Prisma
- `src/lib/supabase.ts` - Cliente Supabase
- `src/types/database.ts` - TypeScript types
- `src/services/api.example.ts` - Exemplos de uso

## 🎉 Pronto para usar!

Seu banco de dados está configurado e pronto para uso. Consulte a documentação acima para começar a desenvolver!

---

**Desenvolvido para o projeto de Gastronomia & Eventos** 🍽️✨
