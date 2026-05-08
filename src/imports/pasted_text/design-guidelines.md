## ⚠️ REGRA PRINCIPAL — LEIA ANTES DE TUDO
 
**Não altere absolutamente nenhum elemento de design.**
Não mude cores, não mude fontes, não mude tamanhos de texto, não mude espaçamentos, não mude o layout, não reposicione elementos, não altere hierarquia visual, não troque imagens.
 
O design está finalizado e aprovado. Seu trabalho aqui é **exclusivamente**:
1. Adicionar **interações e animações** aos elementos já existentes
2. Adaptar o layout para **mobile** respeitando todas as decisões visuais do desktop
---
 
## O QUE FOI CONSTRUÍDO (referência visual)
 
A home é composta pelos seguintes blocos, de cima para baixo:
 
1. **Navegação fixa** — logo à esquerda, links centralizados, botão "Solicitar Proposta" à direita
2. **Hero** — headline grande à esquerda + grid de 3 fotos à direita + subheadline + 2 botões CTA + nota de rodapé com tipos de evento
3. **Apresentação rápida** — foto do chef à esquerda + texto "Quem sou eu" à direita + link "Saiba mais sobre mim"
4. **Serviços resumo** — headline centralizada + 4 cards horizontais com ícone e nome + CTA "Ver todos os serviços"
5. **Números** — 4 estatísticas em linha com número dourado grande + label + detalhe
6. **CTA Final** — fundo dourado `#C9A84C` · headline grande · subheadline · 2 botões escuros
7. **Frase final** — fundo escuro · frase em aspas centralizada · linha dourada · assinatura
8. **Footer** — 4 colunas · logo + contato · páginas · serviços · redes sociais
---
 
## PARTE 01 — INTERAÇÕES E ANIMAÇÕES
 
> Aplicar sobre os elementos existentes. Nada novo criado — apenas comportamento adicionado.
 
---
 
### Navegação
 
- **Scroll down:** background da nav aparece com `rgba(15,13,10,0.92)` + `backdrop-filter: blur(12px)` + borda inferior dourada sutil · transição 0.4s ease
- **Links hover:** cor muda para `#C9A84C` · transição 0.3s
- **Botão "Solicitar Proposta" hover:** `translateY(-2px)` + leve brilho · transição 0.25s
---
 
### Hero
 
- **Entrada da página** — fadeUp staggerado no conteúdo esquerdo:
  - Label "Chefe de cozinha...": delay 0s · duração 0.6s
  - Headline linha 1: delay 0.1s
  - Headline linha 2: delay 0.2s
  - Headline linha 3: delay 0.3s
  - Headline linha 4: delay 0.4s
  - Subheadline: delay 0.55s · duração 0.7s
  - Botões: delay 0.7s · duração 0.6s
  - Nota de rodapé (Casamentos · Debutantes...): delay 0.85s · duração 0.5s
- **Grid de fotos** — cada foto entra com fadeIn:
  - Foto 1 (topo): delay 0.3s
  - Foto 2 (meio): delay 0.5s
  - Foto 3 (baixo): delay 0.7s
- **Hover nas fotos do grid:** `scale(1.04)` + `brightness(0.95)` · transição 0.7s ease
- **Botão primário hover:** `translateY(-2px)` · transição 0.25s
- **Botão secundário hover:** fundo levemente visível `rgba(201,168,76,0.08)` + `translateY(-2px)` · transição 0.25s
---
 
### Apresentação rápida
 
- **Ativação:** elemento entra na viewport (scroll trigger · threshold 20%)
- **Foto:** entra com `translateX(-40px)` + `opacity 0→1` · duração 0.9s ease-out
- **Bloco de texto:** entra com `translateX(40px)` + `opacity 0→1` · duração 0.9s ease-out · delay 0.15s
- **Link "Saiba mais sobre mim" hover:** underline expande da esquerda para a direita · seta desloca `+4px` · transição 0.25s
---
 
### Serviços resumo
 
- **Ativação:** scroll trigger
- **Headline:** fadeUp · duração 0.7s
- **Cards:** fadeUp em sequência · stagger 0.1s por card · duração 0.6s cada
- **Hover em cada card:** borda muda para `0.5px solid #C9A84C` · nome do serviço muda para `#C9A84C` · `translateY(-4px)` · transição 0.3s ease
- **Botão "Ver todos os serviços" hover:** seta desloca `+4px` · underline animado · transição 0.25s
---
 
### Números
 
- **Ativação:** scroll trigger
- **Linha dourada** acima de cada número: cresce de `width 0` para `width 100%` · duração 0.5s · stagger 0.15s entre colunas
- **Contadores:** animam de 0 até o valor final · duração 1.8s · easing ease-out · stagger 0.15s entre cada
- **"∞" e "3"** não animam como contador — entram com fadeIn simples
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
- **Aspas e frase:** fadeIn · opacity 0→1 · duração 1s
- **Linha dourada:** cresce de `width 0` para `width 60px` · delay 0.5s · duração 0.6s
- **Assinatura:** fadeUp · delay 0.8s · duração 0.6s
---
 
### Footer
 
- **Links hover:** cor muda para `#C9A84C` · transição 0.3s
- Sem animação de entrada — footer aparece estático
---
 
## PARTE 02 — MOBILE FIRST
 
> Adaptar o layout existente para mobile. Manter 100% das decisões de design — mesmas cores, mesma tipografia, mesma hierarquia, mesmos espaçamentos proporcionais.
> **Breakpoints:** mobile `≤ 768px` · tablet `769px–1024px` · desktop `> 1024px`
 
---
 
### Navegação mobile
 
- Logo à esquerda mantida
- Links do centro somem
- Botão "Solicitar Proposta" some
- **Ícone hamburger** aparece à direita · 3 linhas · cor `#C9A84C` · tamanho 22px
- **Menu aberto:** fullscreen · fundo `rgba(15,13,10,0.98)` · links empilhados verticalmente centralizados · Cormorant Garamond · font-size 2rem · cor `#FAF7F2` · separador `0.5px solid rgba(201,168,76,0.15)` entre itens · botão "Solicitar Proposta" dourado ao final
- **Botão fechar:** × canto superior direito · cor `#C9A84C`
- **Animação de abertura:** desliza de cima · duração 0.4s ease
---
 
### Hero mobile
 
- Layout: coluna única
- Grid de fotos some — imagem de fundo única com overlay `rgba(15,13,10,0.62)`
- Headline: `clamp(2.6rem, 10vw, 4rem)` · mantém UPPERCASE e line-height 0.92
- Subheadline: font-size 0.85rem · largura total
- Botões: empilhados verticalmente · largura total · gap 0.75rem
- Nota de rodapé: centralizada · font-size 0.65rem
- Padding lateral: `1.5rem`
- Altura mínima: `100svh`
---
 
### Apresentação rápida mobile
 
- Layout: coluna única
- Foto: largura total · aspect-ratio 4/3 · moldura dourada mantida
- Texto: abaixo da foto · padding `1.5rem`
- Link CTA: largura total
---
 
### Serviços resumo mobile
 
- Headline: centralizada · font-size `clamp(1.8rem, 7vw, 2.5rem)`
- Grid de cards: **2 colunas × 2 linhas** · gap mantido
- Em telas `< 380px`: 1 coluna
- Botão CTA: largura total · centralizado
---
 
### Números mobile
 
- Layout: **2 colunas × 2 linhas**
- Separadores verticais entre colunas removidos
- Linha dourada superior mantida em cada número
- Número: font-size `2.8rem`
- Label: font-size `0.62rem`
- Detalhe: font-size `0.68rem`
---
 
### CTA Final mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(2rem, 9vw, 3rem)`
- Subheadline: font-size 0.88rem
- Botões: empilhados verticalmente · largura total
- Padding: `4rem 1.5rem`
---
 
### Frase final mobile
 
- Headline: `clamp(1.2rem, 5vw, 1.8rem)` · centralizada
- Linha dourada mantida
- Padding: `4rem 1.5rem`
---
 
### Footer mobile
 
- Layout: coluna única · empilhado
- Cada coluna do footer vira um bloco com título em `#C9A84C` e links abaixo
- Gap entre blocos: `2rem`
- Copyright: centralizado
- Padding: `3rem 1.5rem`
---
 
## ANIMAÇÕES NO MOBILE
 
- Todas as animações de scroll são mantidas no mobile
- Animações de hover são substituídas por animações de **tap** (toque) no mobile — mesmo efeito visual mas ativado por toque
- `translateX` da seção de apresentação vira `translateY` no mobile (entra de baixo, não dos lados)
- Reduzir intensidade dos movimentos em mobile: `translateY(-2px)` vira `translateY(-1px)` · `translateX(40px)` vira `translateY(20px)`
---
 
## OBSERVAÇÕES FINAIS
 
- Usar `svh` (small viewport height) no mobile para evitar problemas com barra de endereço do browser
- Testar menu hamburger em iOS Safari e Android Chrome
- Garantir que todos os botões tenham área de toque mínima de `44px × 44px`
- Imagens no mobile com `object-fit: cover` para não distorcer
- Nenhum elemento de design do desktop foi alterado — apenas reposicionado para caber no mobile
