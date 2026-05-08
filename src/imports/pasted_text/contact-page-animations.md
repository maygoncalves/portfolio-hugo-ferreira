## ⚠️ REGRA PRINCIPAL
 
Não altere absolutamente nenhum elemento de design.
Não mude cores, fontes, tamanhos, espaçamentos, layout ou hierarquia visual.
 
Seu trabalho é exclusivamente:
1. Adicionar interações e animações aos elementos existentes
2. Adaptar o layout para mobile respeitando todas as decisões visuais do desktop
---
 
## O QUE FOI CONSTRUÍDO (referência visual)
 
A página Contato é composta pelos seguintes blocos, de cima para baixo:
 
1. **Navegação fixa** — igual às páginas anteriores · link "Contato" ativo
2. **Hero interno** — label "Quem sou eu" + headline "SEU EVENTO COMEÇA COM UMA MENSAGEM." + subheadline · fundo escuro com imagem overlay
3. **Canais de contato** — split 50/50 · esquerda: card WhatsApp dourado grande + card e-mail escuro · direita: card Instagram + card LinkedIn + card Localização
4. **CTA Final** — fundo dourado · headline "PRONTO PARA COMEÇAR?" · subheadline · botão único "Chamar no WhatsApp" · nota de rodapé
5. **Frase final** — fundo escuro · frase em aspas · linha dourada · assinatura
6. **Footer** — 4 colunas · igual às páginas anteriores
---
 
## PARTE 01 — INTERAÇÕES E ANIMAÇÕES
 
---
 
### Navegação
- Mesmas interações das páginas anteriores
- Link "Contato" permanece ativo em `#C9A84C`
---
 
### Hero interno
 
- **Entrada da página:** fadeUp staggerado
  - Label: delay 0s · duração 0.6s
  - Headline linha 1: delay 0.1s · duração 0.7s
  - Headline linha 2: delay 0.2s · duração 0.7s
  - Headline linha 3 (UMA MENSAGEM em gold): delay 0.3s · duração 0.7s
  - Subheadline: delay 0.5s · duração 0.7s
---
 
### Canais de contato
 
- **Ativação:** scroll trigger · threshold 15%
**Card WhatsApp (dourado — principal):**
- Entrada: fadeUp · duração 0.8s
- Pulse sutil na borda interna: animação `box-shadow` pulsando em `rgba(201,168,76,0.4)` a cada 3s · duração 1.5s · loop infinito · chama atenção sem ser invasivo
- **Botão "Abrir conversa no WhatsApp" hover:** `brightness(1.08)` + `translateY(-2px)` · transição 0.25s
- **Ao clicar:** abre `https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento.` em nova aba
**Card E-mail:**
- Entrada: fadeUp · delay 0.12s · duração 0.7s
- Hover: borda muda para `0.5px solid #C9A84C` · `translateY(-3px)` · transição 0.3s
- **Link do e-mail hover:** cor muda para `#E8D5A3` · transição 0.25s
- **Link "Enviar e-mail" hover:** seta desloca `+4px` · transição 0.25s
- **Ao clicar:** abre `mailto:hugo.284356@gmail.com?subject=Proposta%20de%20Evento&body=Ol%C3%A1%2C%20Hugo!%20Gostaria%20de%20solicitar%20uma%20proposta.`
**Card Instagram:**
- Entrada: fadeUp · delay 0.1s · duração 0.7s
- Hover: borda muda para `0.5px solid #C9A84C` · `translateY(-3px)` · transição 0.3s
- **Handle @chefehugoferreira hover:** cor intensifica para `#E8D5A3` · transição 0.25s
- **Link "Ver perfil" hover:** seta desloca `+4px` · transição 0.25s
- **Ao clicar:** abre `https://www.instagram.com/chefehugoferreira/` em nova aba
**Card LinkedIn:**
- Entrada: fadeUp · delay 0.2s · duração 0.7s
- Hover: borda muda para `0.5px solid #C9A84C` · `translateY(-3px)` · transição 0.3s
- **Nome hover:** cor intensifica para `#E8D5A3` · transição 0.25s
- **Link "Ver perfil" hover:** seta desloca `+4px` · transição 0.25s
- **Ao clicar:** abre `https://www.linkedin.com/in/hugoalexandreferreira/` em nova aba
**Card Localização:**
- Entrada: fadeUp · delay 0.3s · duração 0.7s
- Sem hover especial — card informativo estático
---
 
### CTA Final (fundo dourado)
 
- **Ativação:** scroll trigger
- **Headline:** fadeUp linha por linha · stagger 0.1s · duração 0.7s
- **Subheadline:** fadeUp · delay 0.4s · duração 0.6s
- **Botão "Chamar no WhatsApp":** fadeUp · delay 0.6s · duração 0.6s
- **Botão hover:** `brightness(1.08)` + `translateY(-2px)` · transição 0.25s
- **Nota de rodapé:** fadeUp · delay 0.8s · duração 0.5s
- **Ao clicar no botão:** abre `https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento.` em nova aba
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
 
### Canais de contato mobile
 
- Layout: **coluna única** · todos os cards empilhados verticalmente
- Ordem: WhatsApp → E-mail → Instagram → LinkedIn → Localização
- Card WhatsApp: largura total · mantém fundo dourado e destaque
- Botão "Abrir conversa no WhatsApp": largura total
- Cards secundários: largura total · borda e estilo mantidos
- Gap entre cards: `0.75rem`
- Padding lateral: `1.5rem`
---
 
### CTA Final mobile
 
- Layout: coluna única · centralizado
- Headline: `clamp(2rem, 9vw, 3rem)`
- Subheadline: font-size 0.88rem
- Botão: largura total
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
- Pulse do card WhatsApp mantido no mobile
- Hover dos cards substituído por tap com o mesmo efeito visual
- `translateY(-3px)` dos cards vira `translateY(-1px)` no tap mobile
- Área de toque mínima: `44px × 44px` em todos os botões e links
---
 
## OBSERVAÇÕES FINAIS
 
- Todos os links de WhatsApp devem usar a mensagem pré-preenchida — não remover o parâmetro `?text=`
- Links de e-mail com `mailto:` pré-preenchido com assunto e saudação
- Todos os links de redes sociais abrem em nova aba `target="_blank"`
- O pulse do card WhatsApp é sutil — não deve piscar nem chamar atenção excessiva
- Usar `svh` no mobile para altura de viewport
- Testar todos os links em iOS Safari e Android Chrome
