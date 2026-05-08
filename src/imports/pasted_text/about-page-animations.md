
## ⚠️ REGRA PRINCIPAL
 
Não altere absolutamente nenhum elemento de design.
Não mude cores, fontes, tamanhos, espaçamentos, layout ou hierarquia visual.
 
Seu trabalho é exclusivamente:
1. Adicionar interações e animações aos elementos existentes
2. Adaptar o layout para mobile respeitando todas as decisões visuais do desktop
---
 
## O QUE FOI CONSTRUÍDO (referência visual)
 
A página Sobre é composta pelos seguintes blocos, de cima para baixo:
 
1. **Navegação fixa** — igual à Home
2. **Hero interno** — headline grande + label + subheadline · fundo escuro com imagem overlay
3. **História** — split 50/50 · foto do Hugo com moldura dourada + badge "20+ Anos" à esquerda · label + headline + 3 parágrafos + bullets + CTA à direita
4. **Diferenciais** — label + headline + grid 3×2 de cards com ícone + título + detalhe
5. **Formação & Certificações** — split 50/50 · formação acadêmica à esquerda · cursos e certificações à direita
6. **CTA Final** — fundo dourado · headline grande · subheadline · 2 botões
7. **Frase final** — fundo escuro · frase em aspas · linha dourada · assinatura
8. **Footer** — 4 colunas · igual à Home
---
 
## PARTE 01 — INTERAÇÕES E ANIMAÇÕES
 
---
 
### Navegação
- Mesmas interações da Home — consistência total
- Link "Sobre" permanece ativo em `#C9A84C`
---
 
### Hero interno
 
- **Entrada da página:** fadeUp staggerado
  - Label: delay 0s · duração 0.6s
  - Headline palavra por palavra: stagger 0.08s entre cada palavra · duração 0.7s
  - Subheadline: delay 0.5s · duração 0.7s
- Imagem de fundo: já carregada com overlay — sem animação adicional
---
 
### Bloco História (split foto + texto)
 
- **Ativação:** scroll trigger · threshold 20%
- **Foto:** entra com `translateX(-50px)` + `opacity 0→1` · duração 0.9s ease-out
- **Moldura dourada:** aparece com delay 0.3s após a foto · `opacity 0→1` · duração 0.6s
- **Badge "20+ Anos":** escala de `scale(0.8)` para `scale(1)` + `opacity 0→1` · delay 0.5s · duração 0.5s
- **Bloco de texto direita:** entra com `translateX(50px)` + `opacity 0→1` · delay 0.2s · duração 0.9s ease-out
- **Bullets:** entram em sequência com fadeUp · stagger 0.08s por item · ativados junto com o bloco de texto
- **Botão "Solicitar Proposta" hover:** `translateY(-2px)` + brilho · transição 0.25s
---
 
### Bloco Diferenciais (grid 3×2)
 
- **Ativação:** scroll trigger
- **Label + Headline:** fadeUp · duração 0.7s
- **Cards:** fadeUp em sequência · stagger 0.1s por card · duração 0.6s cada
- **Hover em cada card:**
  - Borda muda para `0.5px solid #C9A84C`
  - Título muda para `#C9A84C`
  - `translateY(-4px)`
  - Transição 0.3s ease
---
 
### Bloco Formação & Certificações
 
- **Ativação:** scroll trigger
- **Label + Headline:** fadeUp · duração 0.7s
- **Linha dourada vertical** entre as colunas: cresce de `height 0` para `height 100%` · duração 0.8s · delay 0.3s
- **Coluna esquerda (Formação):** entra com `translateX(-30px)` + `opacity 0→1` · duração 0.8s
- **Coluna direita (Certificações):** entra com `translateX(30px)` + `opacity 0→1` · delay 0.15s · duração 0.8s
- **Itens da lista:** fadeUp em sequência · stagger 0.07s · ativados junto com a coluna
---
 
### CTA Final (fundo dourado)
 
- **Ativação:** scroll trigger
- **Headline:** fadeUp linha por linha · stagger 0.1s
- **Subheadline:** fadeUp · delay 0.4s
- **Botões:** fadeUp · delay 0.6s
- **Botão primário hover:** `brightness(1.06)` + `translateY(-2px)` · transição 0.25s
- **Botão secundário hover:** fundo levemente visível + `translateY(-2px)` · transição 0.25s
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
- Igual à Home — hamburger menu fullscreen
---
 
### Hero interno mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(2rem, 8vw, 3rem)` · mantém UPPERCASE e line-height 0.92
- Subheadline: font-size 0.85rem · largura total
- Padding lateral: `1.5rem`
- Altura: `auto` com padding-top respeitando a nav fixa
---
 
### Bloco História mobile
 
- Layout: coluna única empilhada
- Foto: largura total · aspect-ratio 3/4 · moldura dourada simplificada (offset reduzido para 0.8rem)
- Badge "20+ Anos": mantido no canto inferior direito da foto
- Texto: abaixo da foto · padding `1.5rem`
- Bullets: mantidos com o mesmo estilo
- Botão CTA: largura total
---
 
### Bloco Diferenciais mobile
 
- Headline: `clamp(1.8rem, 7vw, 2.5rem)` · centralizada
- Grid: **2 colunas × 3 linhas** em mobile
- Em telas `< 380px`: 1 coluna
- Cards: padding reduzido proporcionalmente · ícone + título + detalhe mantidos
---
 
### Bloco Formação & Certificações mobile
 
- Layout: coluna única empilhada
- Linha dourada vertical some no mobile
- Formação Acadêmica aparece primeiro
- Certificações abaixo com separador `0.5px solid #2E2922`
- Padding lateral: `1.5rem`
---
 
### CTA Final mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(2rem, 9vw, 3rem)`
- Botões: empilhados verticalmente · largura total
- Padding: `4rem 1.5rem`
---
 
### Frase final mobile
- Centralizada
- Font-size reduzido proporcionalmente: `clamp(1rem, 4vw, 1.4rem)`
- Padding: `3rem 1.5rem`
---
 
### Footer mobile
- Layout: coluna única · empilhado
- Cada coluna vira um bloco com título em `#C9A84C` e links abaixo
- Gap entre blocos: `2rem`
- Copyright: centralizado
- Padding: `3rem 1.5rem`
---
 
### Animações no mobile
- Todas as animações de scroll mantidas
- `translateX` vira `translateY(20px)` no mobile
- Intensidade reduzida: deslocamentos máximos de 20px no mobile
- Tap substitui hover com o mesmo efeito visual
- Área de toque mínima em todos os botões e links: `44px × 44px`
---
 
## OBSERVAÇÕES FINAIS
 
- Usar `svh` no mobile para altura de viewport
- Testar em iOS Safari e Android Chrome
- Nenhum elemento de design do desktop foi alterado
- Apenas reposicionamento para mobile