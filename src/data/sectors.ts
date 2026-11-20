/**
 * Ramos atendidos e os cenários "Como funcionaria na sua empresa". Nenhum
 * ramo é o foco: todos têm o mesmo peso na página. Os cenários são
 * ilustrações de como uma automação funcionaria, não casos de clientes; as
 * conversas são de exemplo, com nomes fictícios.
 */
import type { IllustrationName } from "./illustrations";

export type Sector = { name: string; ill: IllustrationName; tone: "lila" | "goiaba" | "caju" | "white" };

/** A faixa "Para empresas de todo ramo", logo depois do topo. */
export const sectors: Sector[] = [
  { name: "Clínicas e consultórios", ill: "clinica", tone: "lila" },
  { name: "Lojas e varejo", ill: "loja", tone: "goiaba" },
  { name: "Escritórios de contabilidade", ill: "escritorio", tone: "white" },
  { name: "Escritórios de advocacia", ill: "advocacia", tone: "lila" },
  { name: "Indústrias", ill: "industria", tone: "caju" },
  { name: "Distribuidoras", ill: "distribuidora", tone: "white" },
  { name: "Imobiliárias", ill: "imobiliaria", tone: "goiaba" },
  { name: "Escolas e cursos", ill: "escola", tone: "lila" },
  { name: "Transportadoras", ill: "transportadora", tone: "caju" },
  { name: "Agro", ill: "agro", tone: "white" },
  { name: "E-commerce", ill: "ecommerce", tone: "goiaba" },
  { name: "Agências", ill: "agencia", tone: "lila" },
];

export type ChatLine =
  | { from: "client" | "bot" | "team"; text: string; who?: string }
  | { from: "note"; text: string };

export type Scenario = {
  id: string;
  /** Nome curto do chip. */
  label: string;
  ill: IllustrationName;
  tone: Sector["tone"];
  /** Quem está na conversa de exemplo (topo do celular). */
  chatName: string;
  chatRole: string;
  chat: ChatLine[];
  today: string[];
  then: string[];
  gain: string;
};

export const scenarios: Scenario[] = [
  {
    id: "clinica",
    label: "Clínica",
    ill: "clinica",
    tone: "lila",
    chatName: "Clínica Bem Viver",
    chatRole: "Confirmações",
    chat: [
      { from: "bot", text: "Oi, Ana! Sua consulta com a Dra. Lúcia é amanhã, às 9h. Você confirma?", who: "Assistente da clínica" },
      { from: "client", text: "Não vou conseguir ir. Tem outro horário?" },
      { from: "bot", text: "Tenho quinta às 14h ou sexta às 10h. Qual prefere?", who: "Assistente da clínica" },
      { from: "client", text: "Quinta às 14h." },
      { from: "note", text: "Remarcada. O horário de amanhã foi oferecido à lista de espera" },
    ],
    today: [
      "A recepção liga e manda mensagem para cada paciente, um por um, para confirmar.",
      "A falta só aparece na hora, com a cadeira vazia.",
      "Retorno depende de alguém lembrar de chamar o paciente.",
    ],
    then: [
      "Na véspera, cada paciente recebe a confirmação pelo WhatsApp e pode remarcar ali mesmo.",
      "O horário que vagou é oferecido a quem está na lista de espera.",
      "Retorno vira lembrete com data; quem não responde vai para a lista de ligação da recepção.",
    ],
    gain: "Menos cadeira vazia e uma recepção livre para quem está na frente dela.",
  },
  {
    id: "loja",
    label: "Loja",
    ill: "loja",
    tone: "goiaba",
    chatName: "Casa Aurora Móveis",
    chatRole: "Atendimento",
    chat: [
      { from: "client", text: "Oi! Tem o sofá cinza de 3 lugares? Entrega em Campinas?" },
      { from: "bot", text: "Tem sim, 2 em estoque. Entrega em Campinas em até 3 dias úteis. Quer que eu reserve?", who: "Assistente da loja" },
      { from: "client", text: "Quero! Dá para parcelar?" },
      { from: "note", text: "Pedido montado. Marina, do comercial, assumiu" },
      { from: "team", text: "Oi, aqui é a Marina. Parcelamos em até 10 vezes. Te mando o link?", who: "Marina" },
    ],
    today: [
      "Cliente pergunta preço, estoque e prazo pelo WhatsApp, e o vendedor para tudo para responder.",
      "O pedido é anotado à mão e digitado depois no sistema.",
      "Mensagem que chega à noite só é vista no dia seguinte.",
    ],
    then: [
      "Um assistente responde preço, estoque e prazo com base no que está cadastrado na loja.",
      "Ele monta o pedido e chama o vendedor para fechar.",
      "O que ele não sabe vai para uma pessoa, com a conversa junto.",
    ],
    gain: "Resposta em minutos, até à noite, sem vendedor preso no celular.",
  },
  {
    id: "escritorio",
    label: "Escritório",
    ill: "escritorio",
    tone: "white",
    chatName: "Oliveira Contabilidade",
    chatRole: "Documentos do mês",
    chat: [
      { from: "bot", text: "Bom dia, Carlos! Para fechar novembro, faltam o extrato do banco e duas notas de compra.", who: "Assistente do escritório" },
      { from: "client", text: "Segue o extrato. As notas mando à tarde." },
      { from: "bot", text: "Recebido e salvo na sua pasta. Te lembro das notas às 16h.", who: "Assistente do escritório" },
      { from: "client", text: "Minha guia de imposto já saiu?" },
      { from: "bot", text: "Saiu ontem e vence dia 20. Reenviei o arquivo para você.", who: "Assistente do escritório" },
    ],
    today: [
      "Alguém da equipe cobra documento de cada cliente, um por um, todo mês.",
      "O WhatsApp enche de perguntas como “meu processo andou?” e “a guia já saiu?”.",
      "Arquivo chega solto e é salvo à mão, na pasta de cada cliente.",
    ],
    then: [
      "No dia combinado, cada cliente recebe a lista do que falta, com o nome dele.",
      "O que chega é salvo na pasta certa; quem não mandou recebe um lembrete educado.",
      "Perguntas de andamento são respondidas com o que está registrado; o resto vai para a pessoa certa.",
    ],
    gain: "A equipe para de correr atrás de papel e volta para o trabalho que o cliente valoriza.",
  },
  {
    id: "industria",
    label: "Indústria e distribuidora",
    ill: "distribuidora",
    tone: "caju",
    chatName: "Distribuidora Rio Claro",
    chatRole: "Pedidos",
    chat: [
      { from: "client", text: "Preciso de 40 caixas do item 2210 e 15 do 3305 para sexta." },
      { from: "bot", text: "Tem as 40 do 2210. Do 3305 tenho 12 hoje e o restante chega quarta. Mando as 15 juntas na sexta?", who: "Assistente de pedidos" },
      { from: "client", text: "Pode ser." },
      { from: "note", text: "Pedido lançado no sistema e enviado para separação" },
      { from: "bot", text: "Pedido 4812 confirmado. Aviso quando sair para entrega.", who: "Assistente de pedidos" },
    ],
    today: [
      "Pedido chega por WhatsApp, e-mail e telefone, e alguém digita tudo de novo no sistema.",
      "O vendedor liga para o depósito para saber se tem estoque.",
      "Cliente descobre o atraso quando a entrega não chega.",
    ],
    then: [
      "Pedido de qualquer canal entra direto no sistema, conferido, e vai para a separação.",
      "Estoque e situação do pedido aparecem no celular do vendedor.",
      "Atraso de entrega é avisado ao cliente antes de ele perguntar.",
    ],
    gain: "Menos erro de digitação, pedido faturado mais cedo e cliente que confia no prazo.",
  },
  {
    id: "imobiliaria",
    label: "Imobiliária",
    ill: "imobiliaria",
    tone: "goiaba",
    chatName: "Lar Certo Imóveis",
    chatRole: "Atendimento",
    chat: [
      { from: "client", text: "Vi o apartamento de 2 quartos na Vila Nova. Ainda está disponível?" },
      { from: "bot", text: "Está! Aluguel de R$ 2.300 com condomínio. Mando as fotos e a planta?", who: "Assistente da imobiliária" },
      { from: "client", text: "Manda. Dá para visitar sábado?" },
      { from: "bot", text: "Sábado às 10h ou às 11h30 com o corretor Paulo. Qual fica melhor?", who: "Assistente da imobiliária" },
      { from: "note", text: "Visita marcada na agenda do Paulo" },
    ],
    today: [
      "Interessado espera horas pela primeira resposta e procura outra imobiliária.",
      "A visita é marcada numa troca longa de mensagens.",
      "Documentos da locação são pedidos várias vezes, sem saber o que já chegou.",
    ],
    then: [
      "O primeiro atendimento sai na hora, com fotos, valores e condições do imóvel.",
      "A visita entra direto na agenda do corretor.",
      "Uma lista mostra ao cliente e à equipe quais documentos faltam.",
    ],
    gain: "O corretor fala com quem já está pronto para visitar.",
  },
  {
    id: "escola",
    label: "Escola e cursos",
    ill: "escola",
    tone: "lila",
    chatName: "Colégio Ipê",
    chatRole: "Secretaria",
    chat: [
      { from: "client", text: "Boa tarde! Como faço a rematrícula do Pedro para 2027?" },
      { from: "bot", text: "É por este link, até 10 de dezembro. Faltam a declaração de quitação e o comprovante de endereço.", who: "Secretaria do colégio" },
      { from: "client", text: "A mensalidade de novembro está paga?" },
      { from: "bot", text: "Está, sim. Paga em 5 de novembro.", who: "Secretaria do colégio" },
      { from: "note", text: "Pedido de desconto encaminhado para a coordenação" },
    ],
    today: [
      "A secretaria responde as mesmas dúvidas de matrícula e boleto o dia todo.",
      "Cobrança de mensalidade atrasada é feita à mão, família por família.",
      "Aviso importante se perde no grupo de mensagens.",
    ],
    then: [
      "Dúvidas de matrícula, boleto e calendário são respondidas na hora.",
      "Lembretes de mensalidade saem antes do vencimento, com o boleto junto.",
      "Avisos chegam a cada família, com confirmação de leitura para a escola.",
    ],
    gain: "Uma secretaria que atende quem precisa de atenção, não a mesma pergunta pela vigésima vez.",
  },
];
