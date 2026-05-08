# 🚀 Quick Start - Banco de Dados

Guia rápido para conectar seu projeto com Supabase usando Prisma.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js 18+ instalado
- pnpm instalado

## ⚡ Setup em 5 minutos

### 1. Instalar dependências

```bash
pnpm add @prisma/client @supabase/supabase-js
pnpm add -D prisma tsx
```

### 2. Criar projeto no Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Clique em "New Project"
3. Preencha:
   - **Name**: gastronomia-eventos (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e **SALVE**
   - **Region**: South America (São Paulo) ou mais próximo de você

### 3. Copiar credenciais do Supabase

Após criar o projeto, vá em **Settings** → **Database**:

1. Procure por **Connection String** → **URI**
2. Clique em "Copy" e copie a string completa
3. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou

Também vá em **Settings** → **API**:

1. Copie a **URL** do projeto
2. Copie a chave **anon/public**

### 4. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` e cole suas credenciais:

```env
# Substitua pelos seus valores
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.SEU_PROJECT_ID.supabase.co:5432/postgres"
VITE_SUPABASE_URL="https://SEU_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON_KEY="sua_anon_key_aqui"
```

### 5. Sincronizar schema com Supabase

Execute o comando para criar todas as tabelas:

```bash
pnpm db:push
```

Você verá algo como:

```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema
```

### 6. Popular banco com dados iniciais (opcional)

```bash
pnpm db:seed
```

Isso criará:
- ✅ 1 usuário administrador
- ✅ 3 categorias de serviços
- ✅ 3 serviços de exemplo
- ✅ Categorias de galeria e blog
- ✅ Tags para organização
- ✅ Configurações básicas
- ✅ 3 depoimentos de exemplo

### 7. Verificar no Prisma Studio

Abra uma interface gráfica para visualizar seus dados:

```bash
pnpm db:studio
```

Isso abrirá `http://localhost:5555` onde você pode ver todas as tabelas e dados.

## ✅ Pronto!

Seu banco de dados está configurado! Agora você pode:

### Ver dados no Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Table Editor**
4. Veja todas as tabelas criadas (User, Servico, Evento, etc.)

### Usar no código

```typescript
import { prisma } from './lib/prisma';

// Buscar todos os serviços
const servicos = await prisma.servico.findMany({
  where: { ativo: true },
  include: { categoria: true }
});

// Criar novo contato
const contato = await prisma.contato.create({
  data: {
    nome: 'João Silva',
    email: 'joao@email.com',
    mensagem: 'Gostaria de um orçamento'
  }
});
```

## 🔧 Comandos úteis

```bash
# Sincronizar mudanças do schema
pnpm db:push

# Gerar Prisma Client (após mudar schema)
pnpm db:generate

# Abrir Prisma Studio (interface gráfica)
pnpm db:studio

# Popular banco com dados
pnpm db:seed

# Criar migration (para produção)
pnpm db:migrate
```

## 📚 Próximos passos

1. **Conectar formulários**: Integre o formulário de contato para salvar no banco
2. **Criar painel admin**: Interface para gerenciar serviços, eventos, etc.
3. **Listar serviços**: Busque serviços do banco na página de serviços
4. **Galeria dinâmica**: Carregue imagens da galeria do banco
5. **Blog**: Implemente sistema de posts

## ❓ Problemas comuns

### Erro: "Can't reach database server"

- Verifique se a `DATABASE_URL` está correta
- Confirme que substituiu `[YOUR-PASSWORD]` pela senha real
- Teste a conexão no Supabase Dashboard

### Erro: "Environment variable not found: DATABASE_URL"

- Certifique-se que o arquivo `.env` está na raiz do projeto
- Reinicie o servidor de desenvolvimento

### Tabelas não aparecem no Supabase

- Execute `pnpm db:push` novamente
- Verifique se não há erros no schema.prisma
- Aguarde alguns segundos e recarregue o Table Editor

## 🆘 Precisa de ajuda?

- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Guia completo](./SUPABASE_SETUP.md)
- [Schema do banco](./prisma/schema.prisma)
- [Exemplos de uso](./src/services/api.example.ts)

---

**💡 Dica**: Sempre use `pnpm db:push` em desenvolvimento e `pnpm db:migrate` em produção!
