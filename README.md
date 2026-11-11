# Centro Veterinário São Valentim

Landing page responsiva em React + Vite, Tailwind CSS, GSAP e Lenis.

## Rodar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção: `npm run build`.

## Dados a configurar

Abra `src/main.jsx` para trocar `HERO_IMAGE`, o número `PHONE` e configurar `META_PIXEL_ID`/`GA4_ID`. A logo enviada está em `public/assets/logo-sao-valentim.png`. Os botões do WhatsApp usam o número (35) 99944-3077 e a mensagem pré-preenchida. O rastreamento dispara `Contact` no Meta Pixel e `conversion` no GA4 quando as respectivas tags oficiais forem configuradas no `<head>` de `index.html`.

As imagens atuais são referências do Unsplash; troque `HERO_IMAGE` e a imagem da seção “A clínica” por fotos autorizadas da clínica para publicar. A logo tem fallback tipográfico e ícone de pata até que uma logo seja configurada.
