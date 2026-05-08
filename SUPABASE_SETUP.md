# 🗄️ Setup Supabase + Prisma

## 📋 Passo a passo para configurar o banco de dados

### 1. Instalar dependências

```bash
pnpm add @prisma/client @supabase/supabase-js
pnpm add -D prisma
```

### 2. Conectar projeto Supabase

Você pode usar a skill do Make para conectar:

```bash
# O Make vai solicitar que você conecte seu projeto Supabase
```

Ou manualmente:
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto (ou use um existente)
3. Vá em **Settings** > **Database**
4. Copie a **Connection String** (formato URI)

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres"
VITE_SUPABASE_URL="https://[SEU-PROJECT-REF].supabase.co"
VITE_SUPABASE_ANON_KEY="sua-anon-key"
```

### 4. Sincronizar schema com Supabase

Execute o comando para criar todas as tabelas no Supabase:

```bash
npx prisma db push
```

Este comando vai:
- ✅ Criar todas as tabelas definidas no schema
- ✅ Criar os relacionamentos (foreign keys)
- ✅ Criar os índices para otimização
- ✅ Aplicar todas as constraints

### 5. Gerar Prisma Client

```bash
npx prisma generate
```

### 6. (Opcional) Abrir Prisma Studio

Para visualizar e editar dados via interface gráfica:

```bash
npx prisma studio
```

## 📊 Estrutura do banco de dados

O schema inclui as seguintes entidades:

### Core
- **User** - Usuários do sistema (admin, editores)
- **Configuracao** - Configurações dinâmicas do site

### Serviços
- **Servico** - Serviços oferecidos
- **CategoriaServico** - Categorização de serviços
- **ItemServico** - Itens incluídos em cada serviço

### Eventos
- **Evento** - Eventos realizados/agendados
- **Orcamento** - Solicitações de orçamento

### Galeria
- **GaleriaImagem** - Imagens e vídeos
- **CategoriaGaleria** - Categorias de mídia

### Comunicação
- **Contato** - Mensagens do formulário de contato
- **Newsletter** - Inscritos na newsletter
- **Depoimento** - Depoimentos de clientes

### Conteúdo
- **BlogPost** - Posts do blog
- **CategoriaBlog** - Categorias de posts
- **Tag** - Sistema de tags universal

## 🔧 Próximos passos

1. **Criar lib/prisma.ts** para instanciar o cliente Prisma
2. **Criar funções de API** para CRUD de cada entidade
3. **Integrar formulários** (contato, orçamento) com o banco
4. **Criar painel admin** para gerenciar conteúdo
5. **Popular dados iniciais** (seed)

## 📝 Exemplo de uso

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Buscar todos os serviços ativos
const servicos = await prisma.servico.findMany({
  where: { ativo: true },
  include: {
    categoria: true,
    itens: true,
    galeria: true
  },
  orderBy: { ordem: 'asc' }
})

// Criar novo contato
const contato = await prisma.contato.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '11999999999',
    mensagem: 'Gostaria de um orçamento',
    origem: '/contato'
  }
})
```

## 🚀 Seeds (dados iniciais)

Para popular o banco com dados de exemplo, crie um arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias de serviço
  const categoria = await prisma.categoriaServico.create({
    data: {
      nome: 'Eventos Corporativos',
      slug: 'eventos-corporativos',
      descricao: 'Serviços para eventos empresariais',
      ordem: 1,
      ativo: true
    }
  })
  
  // Criar serviço
  await prisma.servico.create({
    data: {
      titulo: 'Buffet Executivo',
      slug: 'buffet-executivo',
      descricao: 'Buffet completo para eventos corporativos',
      imagem: '/images/servico-buffet.jpg',
      categoriaId: categoria.id,
      ativo: true,
      destaque: true
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Execute: `npx prisma db seed`

## 📚 Recursos

- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)
