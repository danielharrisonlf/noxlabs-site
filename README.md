# noxlabs.tech

Site da Noxlabs, de Daniel Harrison: automações, atendimento pelo WhatsApp com IA e sistemas sob medida para pequenas e
médias empresas de qualquer ramo. Página inicial e três páginas de caso (ClinicFlow, WhatsApp Control Center e Kairos).
A antiga `/contabilidade/` redireciona para o seletor de ramos da página inicial.

Astro com saída estática, CSS próprio, fontes hospedadas no próprio site e JavaScript pequeno, sem biblioteca: menu do
celular, cabeçalho que some ao rolar, seção atual, seletor de ramos, contadores, calculadora de horas e cópia de e-mail. Todo o conteúdo aparece sem script. Sem rastreadores,
sem cookies e sem integrações de terceiros; a calculadora roda no navegador.

- Marca, voz e exemplos de texto: `BRAND.md`.
- Sistema visual ("Mosaico"): `DESIGN.md`; referências, as três direções e a decisão em `docs/references.md`.
- Público, ofertas, provas e a fonte de cada número (URL e citação literal): `PRODUCT.md`.

## Rodar

Requisitos: Node 22.12+ (a imagem usa Node 24) e pnpm 10.11.1.

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # astro check + build em dist/
pnpm preview        # serve o dist/
```

## Verificar

```bash
pnpm exec playwright install chromium   # uma vez
pnpm build
node scripts/check-page.mjs             # 5 rotas x 14 tamanhos: transbordo, contraste, títulos, alvos, CTA na dobra,
                                        # fonte e ano em todo dado, sem termo técnico, menu do celular (foco, trava,
                                        # Esc, toque fora, voltar, link, 48 px), cabeçalho, seletor de ramos,
                                        # calculadora, cópia, movimento reduzido, sem JS
BASE_URL=http://localhost:8088 node scripts/check-page.mjs   # o mesmo contra o contêiner
pnpm shots          # capturas em docs/screenshots/local/ (fora do git); SIZES=390x844,1440x900 limita os tamanhos
pnpm videos         # vídeos do menu e de uma rolagem completa em 390x844 e 360x740 (docs/screenshots/local/videos/)
pnpm perf           # quadros, tarefas longas, pior evento e CLS com a CPU 4x mais lenta
```

`pnpm og` regenera `public/og.png`, os ícones PNG, o `favicon.svg` e o `favicon.ico` (este via ffmpeg), com as fontes e
os pictogramas do site.

Capturas não vão para o repositório: ficam em `docs/screenshots/local/`, que está no `.gitignore`.

## Docker

```bash
docker build -t noxlabs-site .
docker run -d -p 8088:80 --name noxlabs noxlabs-site
curl -s localhost:8088/healthz
```

Build em `node:24-alpine` com pnpm; runtime em `nginx:alpine` na porta 80. O nginx (`deploy/nginx.conf`) faz gzip,
cache de um ano para `/_astro/`, `no-cache` para HTML, `try_files` para as rotas, 404 próprio, `/healthz` e cabeçalhos de
segurança, além do redirecionamento 301 de `/contabilidade/`. A CSP lista o hash SHA-256 de cada script inline, gerado no build por `scripts/csp.mjs`, sem
`'unsafe-inline'` para scripts. TLS termina no proxy à frente (Traefik do Dokploy).

## Estrutura

```text
src/
  data/          conteúdo: contato, soluções, ramos e cenários, casos, dados de mercado, calculadora, FAQ, ícones,
                 pictogramas de ramo
  components/    seções (Hero, Scenarios, Solutions, Work, MarketData/Stat, Estimator, About, Security, Faq, Contact
                 com os passos de como começa), cabeçalho com o menu do celular, rodapé, marca, ícones e pictogramas
  scripts/       motion.ts (entradas por rolagem e contadores) e copy.ts (copiar e-mail)
  layouts/       Base.astro: head, SEO, JSON-LD, cabeçalho e rodapé
  pages/         index, casos/[slug] e 404
  styles/        tokens e base (global.css)
public/          fontes Parkinsans e Onest (OFL), imagens dos casos, ícones, og.png, robots.txt
scripts/         verificações, capturas, CSP e geração de imagens
deploy/          nginx.conf
```

O conteúdo mora em `src/data/`. Trocar e-mail, WhatsApp, agenda, textos ou dados não exige mexer em componentes. Um dado
de mercado novo entra em `src/data/stats.ts` com fonte, ano e link, e na tabela de `PRODUCT.md` com a citação literal.

## Pendências antes de publicar

- `src/data/site.ts` → `whatsapp`: número comercial (só dígitos, com DDI e DDD). Enquanto for `null`, não há botão de
  WhatsApp.
- `src/data/site.ts` → `scheduleUrl`: link de agenda. Enquanto for `null`, a conversa é pedida por e-mail.
- E-mail no domínio (hoje o Gmail do Daniel).
- Confirmar se a conversa inicial de 30 min é gratuita. O site hoje não promete.
- Captura atual do Kairos: o caso usa o ícone do sistema no lugar da tela.
