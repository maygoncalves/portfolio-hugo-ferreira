# 🗄️ Banco de Dados - Prisma Schema

Este diretório contém o schema do banco de dados usando Prisma ORM.

## 📋 Comandos úteis

### Setup inicial

```bash
# Instalar dependências
pnpm add @prisma/client @supabase/supabase-js
pnpm add -D prisma

# Criar database no Supabase e sincronizar schema
npx prisma db push

# Gerar Prisma Client
npx prisma generate
```

### Durante desenvolvimento

```bash
# Abrir Prisma Studio (interface gráfica para o banco)
npx prisma studio

# Sincronizar mudanças do schema com o banco (desenvolvimento)
npx prisma db push

# Visualizar schema do banco atual
npx prisma db pull

# Validar schema.prisma
npx prisma validate

# Formatar schema.prisma
npx prisma format
```

### Migrations (produção)

```bash
# Criar migration
npx prisma migrate dev --name descricao_da_mudanca

# Aplicar migrations em produção
npx prisma migrate deploy

# Ver status das migrations
npx prisma migrate status

# Resetar banco (CUIDADO: apaga todos os dados!)
npx prisma migrate reset
```

### Seeds (popular banco com dados)

```bash
# Executar seed
npx prisma db seed
```

## 🏗️ Estrutura das tabelas

### Core
- `User` - Usuários (admin/editores)
- `Configuracao` - Configurações dinâmicas

### Serviços
- `Servico` - Serviços oferecidos
- `CategoriaServico` - Categorias de serviços
- `ItemServico` - Itens incluídos nos serviços
- `ServicoTag` - Relacionamento serviço ↔ tag

### Eventos
- `Evento` - Eventos realizados/agendados
- `Orcamento` - Solicitações de orçamento

### Galeria
- `GaleriaImagem` - Imagens/vídeos
- `CategoriaGaleria` - Categorias de mídia
- `GaleriaTag` - Relacionamento galeria ↔ tag

### Comunicação
- `Contato` - Mensagens do formulário
- `Newsletter` - Inscritos
- `Depoimento` - Depoimentos de clientes

### Blog
- `BlogPost` - Posts do blog
- `CategoriaBlog` - Categorias de posts
- `BlogPostTag` - Relacionamento post ↔ tag

### Sistema
- `Tag` - Tags universais (reutilizáveis)

## 🔗 Relacionamentos principais

```
Servico
  ├─ CategoriaServico (many-to-one)
  ├─ ItemServico[] (one-to-many)
  ├─ ServicoTag[] (many-to-many via Tag)
  ├─ GaleriaImagem[] (one-to-many)
  └─ Orcamento[] (one-to-many)

Evento
  ├─ User (many-to-one, criadoPor)
  └─ GaleriaImagem[] (one-to-many)

GaleriaImagem
  ├─ CategoriaGaleria (many-to-one)
  ├─ Servico (many-to-one, opcional)
  ├─ Evento (many-to-one, opcional)
  └─ GaleriaTag[] (many-to-many via Tag)

BlogPost
  ├─ User (many-to-one, autor)
  ├─ CategoriaBlog (many-to-one)
  └─ BlogPostTag[] (many-to-many via Tag)
```

## 📊 Índices de performance

Os índices criados automaticamente garantem queries rápidas:

- Buscas por **slug** (serviços, eventos, posts, categorias)
- Filtros por **status** (contatos, orçamentos, eventos)
- Ordenação por **data** (criação, publicação, eventos)
- Filtros por **ativo/publicado** (todos os conteúdos)
- Lookups por **email** (contatos, newsletter, usuários)

## 🔒 Políticas de deleção

- `onDelete: Cascade` - Itens de serviço, tags relacionadas
  - Ao deletar um serviço, seus itens também são deletados
  - Ao deletar uma tag, seus relacionamentos também são deletados

- `onDelete: SetNull` (padrão) - Relacionamentos opcionais
  - Ao deletar uma categoria, serviços ficam sem categoria
  - Ao deletar um usuário, posts ficam sem autor

## 🌱 Como criar seeds

Crie o arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Criar usuário admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Administrador',
      role: 'ADMIN',
    },
  });

  // Criar categoria de serviço
  const categoria = await prisma.categoriaServico.create({
    data: {
      nome: 'Eventos Corporativos',
      slug: 'eventos-corporativos',
      descricao: 'Serviços para eventos empresariais',
      ordem: 1,
      ativo: true,
    },
  });

  // Criar serviço
  const servico = await prisma.servico.create({
    data: {
      titulo: 'Buffet Executivo',
      slug: 'buffet-executivo',
      descricao: 'Buffet completo para eventos corporativos',
      descricaoCurta: 'Buffet para empresas',
      imagem: '/images/buffet-executivo.jpg',
      categoriaId: categoria.id,
      ativo: true,
      destaque: true,
      ordem: 1,
      itens: {
        create: [
          {
            nome: 'Coffee Break',
            descricao: 'Café, sucos e salgados',
            incluido: true,
            ordem: 1,
          },
          {
            nome: 'Almoço',
            descricao: 'Buffet completo',
            incluido: true,
            ordem: 2,
          },
        ],
      },
    },
  });

  // Criar categorias de galeria
  await prisma.categoriaGaleria.createMany({
    data: [
      { nome: 'Casamentos', slug: 'casamentos', ordem: 1, ativo: true },
      { nome: 'Eventos Corporativos', slug: 'corporativos', ordem: 2, ativo: true },
      { nome: 'Aniversários', slug: 'aniversarios', ordem: 3, ativo: true },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Adicione no `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Instale o `tsx` (se não tiver):

```bash
pnpm add -D tsx
```

Execute:

```bash
npx prisma db seed
```

## ⚠️ Boas práticas

### DO ✅
- Use `prisma db push` apenas em desenvolvimento
- Use migrations (`prisma migrate`) em produção
- Sempre faça backup antes de migrations destrutivas
- Use transações para operações complexas
- Inclua apenas os campos necessários nas queries (`select`)
- Use `include` com moderação para evitar over-fetching

### DON'T ❌
- Não use `prisma db push` em produção
- Não delete migrations já aplicadas em produção
- Não faça queries N+1 (use `include` ou `select`)
- Não exponha o Prisma Client diretamente no frontend
- Não commite `.env` com credenciais reais

## 🔄 Atualizando o schema

1. Edite `schema.prisma`
2. Execute `npx prisma format` para formatar
3. Execute `npx prisma validate` para validar
4. Execute `npx prisma db push` (dev) ou `npx prisma migrate dev` (prod)
5. Execute `npx prisma generate` para atualizar o client

## 📚 Recursos

- [Documentação Prisma](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Supabase + Prisma](https://supabase.com/docs/guides/integrations/prisma)
