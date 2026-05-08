 
## ⚠️ REGRA PRINCIPAL
 
Não altere absolutamente nenhum elemento de design.
Não mude cores, fontes, tamanhos, espaçamentos, layout ou hierarquia visual.
 
Seu trabalho é exclusivamente:
1. Adicionar interações e animações aos elementos existentes
2. Adaptar o layout para mobile respeitando todas as decisões visuais do desktop
---
 
## O QUE FOI CONSTRUÍDO (referência visual)
 
A página Serviços é composta pelos seguintes blocos, de cima para baixo:
 
1. **Navegação fixa** — igual às páginas anteriores · link "Serviços" ativo
2. **Hero interno** — label "Quem sou eu" + headline grande "CADA SERVIÇO UMA EXPERIÊNCIA ÚNICA." + subheadline · fundo escuro com imagem overlay
3. **Grid de serviços** — 4 cards em grid 2×2 · cada card tem imagem de fundo + tag de categoria + título + descrição + lista com "—" + CTA link
4. **CTA Final** — fundo dourado `#C9A84C` · headline 3 linhas · subheadline · 2 botões escuros · nota de rodapé
5. **Frase final** — fundo escuro · frase em aspas · linha dourada · assinatura
6. **Footer** — 4 colunas · igual às páginas anteriores
---
 
## PARTE 01 — INTERAÇÕES E ANIMAÇÕES
 
---
 
### Navegação
- Mesmas interações das páginas anteriores
- Link "Serviços" permanece ativo em `#C9A84C`
---
 
### Hero interno
 
- **Entrada da página:** fadeUp staggerado
  - Label: delay 0s · duração 0.6s
  - Headline linha por linha: stagger 0.1s entre cada linha · duração 0.7s
  - Subheadline: delay 0.5s · duração 0.7s
---
 
### Grid de serviços (4 cards 2×2)
 
- **Ativação:** scroll trigger · threshold 15%
- **Cards:** fadeUp em sequência · stagger 0.12s por card · duração 0.7s cada
  - Card 1 (Casamentos): delay 0s
  - Card 2 (Personal Chef): delay 0.12s
  - Card 3 (Eventos Especiais): delay 0.24s
  - Card 4 (Gestão de Cozinha): delay 0.36s
- **Hover em cada card:**
  - Imagem de fundo: `brightness` aumenta levemente de 0.55 para 0.7
  - Todo o conteúdo do card sobe levemente: `translateY(-6px)`
  - Tag de categoria: borda fica mais visível `rgba(201,168,76,0.7)`
  - Link "Solicitar proposta" no final: seta desloca `+4px` para direita
  - Transição geral: 0.4s ease
- **Link "Solicitar proposta" hover:** cor intensifica para `#E8D5A3` · seta desloca `+4px` · transição 0.25s
---
 
### CTA Final (fundo dourado)
 
- **Ativação:** scroll trigger
- **Headline:** fadeUp linha por linha · stagger 0.1s · duração 0.7s
- **Subheadline:** fadeUp · delay 0.4s · duração 0.6s
- **Botões:** fadeUp · delay 0.6s · duração 0.6s
- **Botão "Solicitar Proposta" hover:** `brightness(1.06)` + `translateY(-2px)` · transição 0.25s
- **Botão "Falar Comigo" hover:** fundo levemente visível + `translateY(-2px)` · transição 0.25s
---
 
### Frase final
 
- **Ativação:** scroll trigger
- **Frase:** fadeIn · opacity 0→1 · duração 1s
- **Linha dourada:** cresce de `width 0` para `width 60px` · delay 0.5s · duração 0.6s
- **Assinatura:** fadeUp · delay 0.8s · duração 0.6s
---
 
## PARTE 02 — MOBILE FIRST
 
> Breakpoints: mobile `≤ 768px` · tablet `769px–1024px` · desktop `> 1024px`
> Mesmas cores, mesma tipografia, mesma hierarquia. Apenas o layout se adapta.
 
---
 
### Navegação mobile
- Igual às páginas anteriores — hamburger menu fullscreen
---
 
### Hero interno mobile
 
- Layout: coluna única
- Headline: `clamp(2rem, 8vw, 3rem)` · mantém UPPERCASE e line-height
- Subheadline: font-size 0.85rem · largura total
- Padding lateral: `1.5rem`
- Altura: `auto` com padding-top respeitando a nav fixa
---
 
### Grid de serviços mobile
 
- Layout: **1 coluna** — cards empilhados verticalmente
- Cada card: largura total · altura `auto` mínimo `360px`
- Imagem de fundo mantida com overlay
- Tag de categoria mantida no topo esquerdo
- Título + descrição + lista + CTA link mantidos
- Padding interno do card: `1.5rem`
- Gap entre cards: `3px` — mantém o efeito editorial
---
 
### CTA Final mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(1.8rem, 8vw, 2.8rem)`
- Subheadline: font-size 0.88rem
- Botões: empilhados verticalmente · largura total
- Padding: `4rem 1.5rem`
---
 
### Frase final mobile
 
- Centralizada
- Font-size: `clamp(1rem, 4vw, 1.4rem)`
- Padding: `3rem 1.5rem`
---
 
### Footer mobile
 
- Layout: coluna única · empilhado
- Cada coluna vira bloco com título em `#C9A84C` e links abaixo
- Gap entre blocos: `2rem`
- Copyright: centralizado
- Padding: `3rem 1.5rem`
---
 
### Animações no mobile
 
- Todas as animações de scroll mantidas
- Hover dos cards substituído por tap com o mesmo efeito visual
- `translateY(-6px)` dos cards no hover vira `translateY(-3px)` no tap mobile
- Área de toque mínima em todos os botões e links: `44px × 44px`
---
 
## OBSERVAÇÕES FINAIS
 
- O gap de `3px` entre os cards deve ser mantido no mobile — é parte do estilo editorial
- Usar `svh` no mobile para altura de viewport
- Testar em iOS Safari e Android Chrome
- Nenhum elemento de design do desktop foi alterado