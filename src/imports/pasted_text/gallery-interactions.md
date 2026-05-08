## ⚠️ REGRA PRINCIPAL
 
Não altere absolutamente nenhum elemento de design.
Não mude cores, fontes, tamanhos, espaçamentos, layout ou hierarquia visual.
 
Seu trabalho é exclusivamente:
1. Adicionar interações e animações aos elementos existentes
2. Adaptar o layout para mobile respeitando todas as decisões visuais do desktop
---
 
## O QUE FOI CONSTRUÍDO (referência visual)
 
A página Galeria é composta pelos seguintes blocos, de cima para baixo:
 
1. **Navegação fixa** — igual às páginas anteriores · link "Galeria" ativo
2. **Hero interno** — label "Quem sou eu" + headline "MEUS PRATOS & MOMENTOS." + subheadline · fundo escuro com imagem overlay
3. **Mosaico masonry** — grid assimétrico com ~16 células de alturas variadas · gap de 3px · fundo `#1A1612` nos placeholders · ícone de câmera centralizado em cada célula
4. **Bloco Instagram** — label "Mais conteúdo" + headline "SIGA MINHA JORNADA NO INSTAGRAM." + texto + handle + botão · à esquerda · grid 3×2 de thumbnails à direita
5. **CTA Final** — fundo dourado · headline 2 linhas · subheadline · 2 botões
6. **Frase final** — fundo escuro · frase em aspas · linha dourada · assinatura
7. **Footer** — 4 colunas · igual às páginas anteriores
---
 
## PARTE 01 — INTERAÇÕES E ANIMAÇÕES
 
---
 
### Navegação
- Mesmas interações das páginas anteriores
- Link "Galeria" permanece ativo em `#C9A84C`
---
 
### Hero interno
 
- **Entrada da página:** fadeUp staggerado
  - Label: delay 0s · duração 0.6s
  - Headline linha 1: delay 0.1s · duração 0.7s
  - Headline linha 2 (MOMENTOS em gold): delay 0.2s · duração 0.7s
  - Subheadline: delay 0.4s · duração 0.7s
---
 
### Mosaico masonry
 
- **Ativação:** scroll trigger · threshold 10%
- **Entrada das células:** fadeIn em sequência · stagger 0.05s por célula · duração 0.5s cada · ordem: esquerda para direita, linha por linha
- **Hover em cada célula:**
  - Imagem (quando adicionada): `scale(1.05)` + `brightness(0.95)` · overflow hidden · transição 0.6s ease
  - Placeholder atual: fundo clareia levemente de `#1A1612` para `#2E2922` · ícone de câmera muda para `#C9A84C` · transição 0.3s
  - Tag de categoria: aparece no canto superior esquerdo com fadeIn · fundo `rgba(15,13,10,0.82)` · borda `0.5px solid rgba(201,168,76,0.4)` · texto dourado · transição 0.3s
  - Cursor: pointer
- **Ao clicar:** abre lightbox
**Lightbox:**
- Fundo: `rgba(15,13,10,0.96)` · fullscreen · z-index máximo
- Imagem centralizada: max-height `90vh` · max-width `90vw` · object-fit contain
- Animação de abertura: fadeIn + leve scale `0.95→1` · duração 0.3s
- Botão fechar ×: canto superior direito · cor `#C9A84C` · font-size 1.5rem · hover opacity 0.7
- Setas de navegação anterior/próxima: laterais · outline · cor `#C9A84C` · hover opacity 0.7
- Fechar ao clicar no fundo escuro fora da imagem
- Fechar ao pressionar ESC
- Navegar com teclas ← →
---
 
### Bloco Instagram
 
- **Ativação:** scroll trigger
- **Texto esquerdo:** entra com `translateX(-30px)` + `opacity 0→1` · duração 0.8s ease-out
- **Grid de thumbnails direita:** entra com `translateX(30px)` + `opacity 0→1` · delay 0.15s · duração 0.8s ease-out
- **Thumbnails individuais:** hover escurece levemente + ícone Instagram aparece centralizado em `#C9A84C` · transição 0.3s
- **Handle @chefehugoferreira:** hover cor intensifica para `#E8D5A3` · transição 0.25s
- **Botão "Ver no Instagram" hover:** `translateY(-2px)` + brilho · transição 0.25s
- **Ao clicar nos thumbnails ou no botão:** abre `https://www.instagram.com/chefehugoferreira/` em nova aba
---
 
### CTA Final (fundo dourado)
 
- **Ativação:** scroll trigger
- **Headline:** fadeUp linha por linha · stagger 0.1s · duração 0.7s
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
- Igual às páginas anteriores — hamburger menu fullscreen
---
 
### Hero interno mobile
 
- Layout: coluna única
- Headline: `clamp(2rem, 9vw, 3.2rem)` · mantém line-height e estilo
- Subheadline: font-size 0.85rem
- Padding lateral: `1.5rem`
---
 
### Mosaico mobile
 
- Layout: **2 colunas** com gap de `3px` — mantém o efeito editorial
- Células de altura uniforme em mobile: `180px`
- Células "tall" do desktop viram altura normal no mobile
- Células "wide" do desktop viram largura normal no mobile
- Em telas `< 380px`: 1 coluna
**Lightbox no mobile:**
- Fullscreen com swipe horizontal para navegar entre imagens
- Swipe para baixo fecha o lightbox
- Botões de seta somem no mobile — navegação por swipe
- Botão × mantido no canto superior direito com área de toque `44px × 44px`
---
 
### Bloco Instagram mobile
 
- Layout: coluna única empilhada
- Texto aparece primeiro
- Grid de thumbnails 3×2 aparece abaixo · largura total
- Botão: largura total
- Padding lateral: `1.5rem`
---
 
### CTA Final mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(1.8rem, 8vw, 2.8rem)`
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
- Hover das células substituído por tap com o mesmo efeito visual
- Stagger do mosaico reduzido para 0.03s no mobile
- Área de toque mínima: `44px × 44px` em todos os elementos interativos
---
 
## OBSERVAÇÕES FINAIS
 
- O gap de `3px` entre as células é parte essencial do estilo — manter em todos os breakpoints
- Quando as fotos reais do Hugo forem adicionadas, o hover de zoom e o lightbox funcionam automaticamente
- Os thumbnails do Instagram devem abrir o perfil real: `https://www.instagram.com/chefehugoferreira/`
- Usar `svh` no mobile para altura de viewport
- Testar lightbox em iOS Safari — atenção ao scroll lock ao abrir
---
 