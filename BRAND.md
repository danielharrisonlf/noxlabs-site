# Marca Noxlabs: "Rotina em ordem"

Plataforma de marca para o público de 2026: donos e gestores de pequenas e médias empresas brasileiras, a começar por
escritórios de contabilidade. O sistema visual está em `DESIGN.md`; fontes de cada número em `PRODUCT.md`.

## Posicionamento

Para donos e gestores de escritórios de contabilidade e de pequenas e médias empresas que perdem horas da equipe com
trabalho repetitivo (cobrar documento, digitar de novo, responder a mesma pergunta, vigiar prazo), a Noxlabs cria
automações, assistentes de WhatsApp com IA e sistemas sob medida que tiram esse trabalho da rotina. Diferente de um
software de prateleira ou de uma agência, quem conversa com você é quem constrói, começa pelo que a empresa já usa e
entrega uma rotina de cada vez.

**Promessa em uma linha:** menos tarefa manual, mais tempo para o que dá resultado.

**Frase de abertura:** "Sua equipe não foi contratada para copiar e colar."

## Para quem

- Primeiro foco: escritórios de contabilidade (sócios, gestores de equipe).
- Também: clínicas e consultórios, escritórios de advocacia, imobiliárias, comércio e distribuição, serviços e logística.
- O que eles querem: crescer sem contratar na mesma proporção, menos erro e retrabalho, prazo cumprido, cliente
  respondido rápido, visão do que está acontecendo sem precisar perguntar, dados dos clientes protegidos.

## Pilares de mensagem

1. **Tempo de volta.** O ganho é hora da equipe liberada para atender e analisar, não "tecnologia".
2. **Começa pelo que você já usa.** Sem trocar sistemas por trocar; integração e automação em volta do que existe.
3. **Uma rotina de cada vez.** Primeira melhoria em uso cedo; o próximo passo se decide com o resultado na mão.
4. **Pessoa no controle.** A automação prepara, a equipe confere o que importa; tudo fica registrado.
5. **Prova honesta.** Dados de mercado com fonte e ano; sistemas que o Daniel construiu, sem cliente, número ou
   depoimento inventado.

## Voz

Clara, próxima, confiante, sem tecnês.

| Somos | Não somos |
| --- | --- |
| Claros: frases curtas, verbo no começo, uma ideia por frase. | Vagos: "soluções inovadoras", "transformação digital". |
| Próximos: "você", "sua equipe", "seu escritório"; o Daniel fala em primeira pessoa quando é ele. | Distantes: "a organização", "o cliente final", voz passiva. |
| Confiantes: dizemos o que dá e o que não dá. | Exagerados: "revolucione", "100% automático", "zero erros". |
| Concretos: a rotina com nome (guia, extrato, fechamento). | Técnicos: arquitetura, banco de dados, API, MCP, deploy, nome de linguagem. |

### Regras de escrita

- Fale da rotina e do ganho, nunca de como o sistema é construído. O detalhe técnico vive só no rodapé recolhido das
  páginas de caso ("Detalhes técnicos, para quem cuida da TI").
- Todo número de mercado vem com "Fonte:", ano e link. Nunca apresente dado de mercado como resultado da Noxlabs.
- Ganhos dos casos são qualitativos e descritos pelo que o sistema faz. Nada de "reduziu 40%" sem medição.
- Cenários e telas de exemplo são rotulados como exemplo ou ilustração.
- Não prometa o que não está confirmado: "gratuito", preço, prazo fixo, integração com um sistema específico.
- Botões dizem o que acontece: "Pedir uma conversa de 30 min" (abre um e-mail), "Escrever o e-mail", "Estimar horas
  liberadas". "Marcar" só quando houver agenda de verdade.
- Português do Brasil, frase em caixa normal. Sem caixa-alta em rótulos, sem emoji.
- IA é ferramenta, não tema. Diga o que o assistente faz ("responde o status da guia"), não o que ele é.

### Antes e depois

| Antes (site anterior) | Depois |
| --- | --- |
| "Software e IA que saem do papel e ficam no ar." | "Sua equipe não foi contratada para copiar e colar." |
| "Agentes que operam seus sistemas via MCP, com as permissões de cada usuário." | "Um assistente responde as perguntas de sempre, pede o que falta e chama uma pessoa quando o assunto pede." |
| "Diagnóstico de arquitetura com gargalos medidos, não adivinhados." | "Antes de construir qualquer coisa: onde vai o tempo da equipe, o que vale automatizar primeiro e o que não vale." |
| "Eventos com outbox, filas, observabilidade e testes de carga." | "O que não bate é separado para conferência; a pessoa revisa só as exceções." |
| "Migração para VPS com Docker e Dokploy." | (fora do site: não é dor de dono de escritório) |
| "Cinco serviços NestJS com banco próprio cada." | "Organiza projetos, tarefas e equipes de várias empresas, cada uma vendo só o que é dela." |
| "Pedir diagnóstico de 30 min" | "Pedir uma conversa de 30 min" |

## Identidade visual (resumo)

- **Conceito:** o escritório em ordem. Papel limpo, tinta verde-pinho, marca-texto amarelo para o que importa e caneta
  azul para anotações e links. O símbolo recorrente é o visto: a rotina que se resolve.
- **Logo:** ladrilho verde-pinho com um "n" branco cuja perna direita termina num visto amarelo. Wordmark "noxlabs" em
  minúsculas, Bricolage Grotesque 700. Arquivos: `src/components/Logo.astro`, `public/favicon.svg`, ícones PNG gerados
  por `scripts/og-image.mjs`.
- **Cores:** pinho `#0d5c49`, pinho profundo `#0b3a2f`, marca-texto `#ffe15a`, caneta `#2346c0`, papel `#f6f8f4`,
  tinta `#0f2a22`, prazo `#b23f28` (só alerta).
- **Tipografia:** Bricolage Grotesque (títulos, números) e Figtree (texto e interface), ambas OFL, hospedadas no site.
- **Ícones:** traço único de 1,75 px, pontas arredondadas, desenhados para o site (`src/data/icons.ts`).
- **Imagem:** telas reais dos sistemas (com dados de demonstração) e a foto do Daniel. Sem banco de imagens, sem
  ilustração de IA, sem pessoas genéricas sorrindo para notebook.

## Faça e não faça

| Faça | Não faça |
| --- | --- |
| Marca-texto em números e no item que pede atenção. | Marca-texto em palavras soltas de título. |
| Uma ação principal por bloco, em pinho (ou amarelo na faixa verde). | Dois botões principais competindo. |
| Mostrar a rotina antes e depois, com o ganho em uma frase. | Listar tecnologias, linguagens ou nomes de ferramentas internas. |
| Rotular exemplos e ilustrações. | Mostrar tela de exemplo como se fosse de cliente. |
| Citar fonte, ano e escopo de cada número. | Arredondar para impressionar ou tirar a ressalva. |
| Dizer quando automação não compensa. | Prometer resultado, gratuidade ou prazo sem confirmação. |
| "Pensado para a LGPD." | "Conforme a LGPD" ou "dados protegidos" como garantia: conformidade é do controlador. |
