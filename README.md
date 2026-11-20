# noxlabs.tech

Site institucional da Noxlabs, consultoria de software e IA de Daniel Harrison. Página única com serviços, casos,
processo, sobre e perguntas frequentes, mais três páginas de caso (Kairos, ClinicFlow e WhatsApp Control Center).

Astro com saída estática, CSS próprio, fontes hospedadas no próprio site e JavaScript pequeno, sem biblioteca, carregado
como módulo: tema, menu, seção atual na navegação, seletor de problemas, o caminho de um pedido no Kairos e cópia de
e-mail. Todo o conteúdo aparece sem script. Sem rastreadores, sem cookies e sem integrações de terceiros.

Direção visual em `DESIGN.md` ("Longa exposição"); referências em `docs/references.md`.

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
pnpm shots          # capturas de cada seção em 390 e 1440 px, claro e escuro, em docs/screenshots/
pnpm frames         # quadros do movimento (topo, caminho do Kairos, onda do processo) em docs/screenshots/frames/
node scripts/check-page.mjs             # transbordo 360–1920, contraste, títulos, alvos, tema, menu, abas, Kairos, cópia
BASE_URL=http://localhost:8088 node scripts/check-page.mjs   # o mesmo contra o contêiner
```

`pnpm og` regenera `public/og.png`, os ícones PNG e o `favicon.ico` (este último via ffmpeg).

## Docker

```bash
docker build -t noxlabs-site .
docker run -d -p 8088:80 --name noxlabs noxlabs-site
curl -s localhost:8088/healthz
```

Build em `node:24-alpine` com pnpm; runtime em `nginx:alpine` na porta 80. O nginx (`deploy/nginx.conf`) faz gzip,
cache de um ano para `/_astro/` (nomes com hash), `no-cache` para HTML, `try_files` para as rotas, 404 próprio,
`/healthz` para o healthcheck e cabeçalhos de segurança. A CSP lista o hash SHA-256 de cada script inline,
gerado no build por `scripts/csp.mjs`, então não usa `'unsafe-inline'` para scripts. TLS termina no proxy à frente
(Traefik do Dokploy, por exemplo).

## Estrutura

```text
src/
  data/          conteúdo: contato e links, serviços, casos, processo e FAQ
  components/    seções da home, palco do Kairos (KairosFlow), marca e ícones
  scripts/       abas acessíveis compartilhadas (tabs.ts)
  layouts/       Base.astro: head, SEO, JSON-LD, cabeçalho e rodapé
  pages/         index, casos/[slug] e 404
  styles/        tokens e base (global.css)
public/          fontes Funnel Display e Atkinson Hyperlegible Next (OFL), imagens dos casos, ícones, og.png, robots.txt
scripts/         capturas, verificações, CSP e geração de imagens
deploy/          nginx.conf
docs/screenshots capturas de referência
```

O conteúdo mora em `src/data/`. Trocar e-mail, links ou textos de serviço não exige mexer em componentes.

## Pendências antes de publicar

- `src/data/site.ts` → `scheduleUrl`: link de agenda (Cal.com ou similar). Enquanto for `null`, o diagnóstico é
  pedido por e-mail e o botão de agenda não aparece.
- Captura atual do Kairos (as do repositório ainda mostram a marca antiga, e o produto pede login). Hoje o caso usa o
  diagrama do caminho de um pedido.
- Confirmar se a conversa inicial de 30 min é gratuita. O site hoje diz só "conversa inicial de 30 minutos";
  formato e preço de contratação aparecem como "sob proposta".
- Confirmar o resumo semanal por escrito (vem do brief, não do portfólio).

## Fontes do conteúdo

A origem de cada afirmação e de cada imagem está em `PRODUCT.md` (Evidence on Hand).

Bio, experiência e projetos vêm do portfólio do Daniel e dos READMEs dos repositórios em
[github.com/danielharrisonlf](https://github.com/danielharrisonlf). Só repositórios públicos têm link. A medição citada
no caso Kairos (p50 de 1,9 s para 27 ms com keep-alive no gateway) está em `docs/performance/relatorio-desempenho.md`
do repositório `axial`. As capturas do ClinicFlow e do WhatsApp Control Center são interfaces reais com dados de
demonstração, reaproveitadas do portfólio.
