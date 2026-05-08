# 🗄️ Esquema do Banco de Dados

Visualização completa da estrutura de dados do sistema.

## 📊 Diagrama de Relacionamentos

```
┌─────────────────┐
│     User        │
├─────────────────┤
│ id              │──┐
│ email           │  │
│ name            │  │
│ role            │  │
│ avatar          │  │
│ phone           │  │
└─────────────────┘  │
                     │
         ┌───────────┴──────────┐
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│    Evento       │    │   BlogPost      │
├─────────────────┤    ├─────────────────┤
│ id              │    │ id              │
│ titulo          │    │ titulo          │
│ slug            │    │ slug            │
│ tipo            │    │ conteudo        │
│ status          │    │ publicado       │
│ dataInicio      │    │ destaque        │
│ criadoPorId     │──┐ │ autorId         │──┐
└─────────────────┘  │ └─────────────────┘  │
         │           │          │           │
         │           │          │           │
         ▼           │          ▼           │
┌─────────────────┐  │ ┌─────────────────┐ │
│ GaleriaImagem   │  │ │ CategoriaBlog   │ │
├─────────────────┤  │ ├─────────────────┤ │
│ id              │  │ │ id              │ │
│ url             │  │ │ nome            │ │
│ titulo          │  │ │ slug            │ │
│ tipo            │  │ └─────────────────┘ │
│ eventoId        │──┘                     │
│ servicoId       │──┐          ┌──────────┘
│ categoriaId     │  │          │
└─────────────────┘  │          │
         │           │          │
         │           │          ▼
         ▼           │ ┌─────────────────┐
┌─────────────────┐  │ │  BlogPostTag    │
│CategoriaGaleria │  │ ├─────────────────┤
├─────────────────┤  │ │ postId          │
│ id              │  │ │ tagId           │
│ nome            │  │ └─────────────────┘
│ slug            │  │          │
└─────────────────┘  │          │
                     │          ▼
                     │ ┌─────────────────┐
                     │ │      Tag        │
                     │ ├─────────────────┤
                     │ │ id              │
                     │ │ nome            │
                     │ │ slug            │
                     │ └─────────────────┘
                     │          ▲
                     │          │
┌─────────────────┐  │          │
│    Servico      │  │ ┌─────────────────┐
├─────────────────┤  │ │  ServicoTag     │
│ id              │  │ ├─────────────────┤
│ titulo          │  │ │ servicoId       │
│ slug            │  │ │ tagId           │
│ descricao       │  │ └─────────────────┘
│ imagem          │  │          ▲
│ destaque        │  │          │
│ categoriaId     │──┼──────────┘
└─────────────────┘  │
         │           │
         ▼           │
┌─────────────────┐  │
│CategoriaServico │  │
├─────────────────┤  │
│ id              │  │
│ nome            │  │
│ slug            │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│  ItemServico    │  │
├─────────────────┤  │
│ id              │  │
│ nome            │  │
│ descricao       │  │
│ incluido        │  │
│ servicoId       │──┘
└─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    Contato      │  │   Orcamento     │  │  Newsletter     │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ id              │  │ id              │  │ id              │
│ nome            │  │ nomeCliente     │  │ email           │
│ email           │  │ emailCliente    │  │ nome            │
│ mensagem        │  │ tipoEvento      │  │ ativo           │
│ status          │  │ status          │  │ confirmado      │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐
│  Depoimento     │  │  Configuracao   │
├─────────────────┤  ├─────────────────┤
│ id              │  │ id              │
│ nome            │  │ chave           │
│ depoimento      │  │ valor           │
│ avaliacao       │  │ tipo            │
│ ativo           │  │ grupo           │
└─────────────────┘  └─────────────────┘
```

## 📋 Tabelas Principais

### 👤 User
Usuários do sistema (administradores e editores)
- **Campos principais**: email, name, role
- **Relações**: Evento (criadoPor), BlogPost (autor)
- **Roles**: ADMIN, EDITOR, USER

### 🍽️ Servico
Serviços oferecidos (buffets, eventos, etc.)
- **Campos principais**: titulo, slug, descricao, imagem, precoBase
- **Relações**: CategoriaServico, ItemServico, Orcamento, Tags, Galeria
- **Flags**: ativo, destaque

### 📂 CategoriaServico
Categorização dos serviços
- **Campos principais**: nome, slug, icone, cor
- **Relações**: Servico (one-to-many)

### 📝 ItemServico
Itens incluídos em cada serviço
- **Campos principais**: nome, descricao, incluido
- **Relações**: Servico (many-to-one)

### 📅 Evento
Eventos realizados ou agendados
- **Campos principais**: titulo, tipo, status, dataInicio
- **Tipos**: CASAMENTO, ANIVERSARIO, CORPORATIVO, FORMATURA, etc.
- **Status**: AGENDADO, CONFIRMADO, EM_ANDAMENTO, CONCLUIDO, CANCELADO
- **Relações**: User (criadoPor), GaleriaImagem

### 🖼️ GaleriaImagem
Imagens e vídeos da galeria
- **Campos principais**: url, titulo, tipo
- **Relações**: CategoriaGaleria, Servico, Evento, Tags
- **Tipos**: IMAGEM, VIDEO

### 📂 CategoriaGaleria
Categorização de mídia
- **Campos principais**: nome, slug
- **Relações**: GaleriaImagem (one-to-many)

### 📧 Contato
Mensagens do formulário de contato
- **Campos principais**: nome, email, mensagem, status
- **Status**: NOVO, EM_ANDAMENTO, RESPONDIDO, ARQUIVADO

### 💰 Orcamento
Solicitações de orçamento
- **Campos principais**: nomeCliente, tipoEvento, status, valorEstimado
- **Status**: PENDENTE, EM_ANALISE, ENVIADO, APROVADO, RECUSADO, EXPIRADO
- **Relações**: Servico (opcional)

### 💬 Depoimento
Depoimentos de clientes
- **Campos principais**: nome, depoimento, avaliacao
- **Flags**: ativo (requer aprovação), destaque

### 📰 BlogPost
Posts do blog/notícias
- **Campos principais**: titulo, slug, conteudo, publicado
- **Relações**: User (autor), CategoriaBlog, Tags
- **SEO**: metaTitle, metaDescription

### 📂 CategoriaBlog
Categorias de posts
- **Campos principais**: nome, slug
- **Relações**: BlogPost (one-to-many)

### 🏷️ Tag
Sistema de tags universal (reutilizável)
- **Campos principais**: nome, slug, cor
- **Relações**: Servico, GaleriaImagem, BlogPost (many-to-many)

### 📧 Newsletter
Inscritos na newsletter
- **Campos principais**: email, ativo, confirmado

### ⚙️ Configuracao
Configurações dinâmicas do site
- **Campos principais**: chave, valor, tipo, grupo
- **Tipos**: TEXTO, NUMERO, BOOLEAN, JSON, URL, EMAIL

## 🔑 Índices de Performance

Todos os campos frequentemente consultados possuem índices:

- ✅ **slug** - Todos os modelos com slug (URL-friendly)
- ✅ **email** - User, Contato, Newsletter
- ✅ **status** - Contato, Orcamento, Evento
- ✅ **ativo/publicado** - Todos os conteúdos
- ✅ **destaque** - Servico, GaleriaImagem, BlogPost
- ✅ **datas** - createdAt, dataPublicacao, dataEvento
- ✅ **foreign keys** - Todos os relacionamentos

## 🔒 Políticas de Deleção

### Cascade (deleta relacionados)
- `ItemServico` ao deletar `Servico`
- Tabelas de relacionamento many-to-many (`ServicoTag`, `GaleriaTag`, `BlogPostTag`)

### SetNull (remove referência)
- `Servico.categoriaId` ao deletar `CategoriaServico`
- `BlogPost.autorId` ao deletar `User`
- `GaleriaImagem.servicoId/eventoId` ao deletar `Servico/Evento`

## 📊 Estatísticas do Schema

- **15 tabelas principais**
- **3 tabelas de relacionamento** (many-to-many)
- **6 enums** (tipos fixos)
- **35+ índices** de performance
- **Suporte a soft delete** (campos `ativo`)
- **Timestamps automáticos** (createdAt, updatedAt)

## 🎯 Casos de Uso

### Front-end (Público)
```typescript
// Listar serviços ativos
Servico.findMany({ where: { ativo: true } })

// Galeria por categoria
GaleriaImagem.findMany({ where: { categoria: { slug: 'casamentos' } } })

// Posts do blog
BlogPost.findMany({ where: { publicado: true } })

// Depoimentos
Depoimento.findMany({ where: { ativo: true } })
```

### Admin (Gerenciamento)
```typescript
// Contatos pendentes
Contato.findMany({ where: { status: 'NOVO' } })

// Orçamentos em análise
Orcamento.findMany({ where: { status: 'EM_ANALISE' } })

// Eventos futuros
Evento.findMany({ where: { dataInicio: { gte: new Date() } } })

// Configurações do site
Configuracao.findMany({ where: { grupo: 'redes-sociais' } })
```

## 🔄 Migrations vs Push

### Desenvolvimento (`db:push`)
- Rápido e simples
- Não cria arquivos de migration
- Ideal para protótipos

### Produção (`db:migrate`)
- Cria histórico de mudanças
- Rastreável e reversível
- Ideal para ambientes estáveis

## 📚 Recursos

- [Schema completo](./prisma/schema.prisma)
- [Exemplos de uso](./src/services/api.example.ts)
- [Quick Start](./DATABASE_QUICKSTART.md)
- [Setup completo](./SUPABASE_SETUP.md)
