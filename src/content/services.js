// Serviços mais procurados (fonte: briefing). Cada item vira um card do carrossel + modal de detalhes,
// e também alimenta o JSON-LD (OfferCatalog) e o llms.txt. Edite aqui.
const img = (name, w, h, alt) => ({ src: `/images/${name}-900.webp`, width: w, height: h, alt })

export const services = [
  {
    id: 'preventiva',
    title: 'Manutenção preventiva e troca de óleo',
    summary: 'Revisão conforme o manual do fabricante: óleo, filtros e itens de desgaste no prazo certo, para o carro não dar surpresa.',
    image: img('preventiva', 900, 601, 'Troca de óleo do motor com funil, em manutenção preventiva'),
    items: ['Troca de óleo e filtros', 'Revisão conforme o manual do fabricante', 'Velas, cabos de velas e bobinas', 'Higienização'],
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico eletrônico e injeção',
    summary: 'Luz acesa no painel? Identificamos o problema com diagnóstico eletrônico e explicamos o que foi encontrado.',
    image: img('diagnostico', 900, 601, 'Mecânico testando a parte elétrica de um carro com multímetro'),
    items: ['Diagnóstico eletrônico', 'Injeção eletrônica', 'Sonda lambda', 'Troca de sensores', 'Limpeza e ultrassom de bicos', 'Parte elétrica parcial'],
  },
  {
    id: 'freios-suspensao',
    title: 'Freios, suspensão e direção',
    summary: 'Segurança e conforto ao rodar: freios, amortecedores e direção revisados com peças trocadas só quando precisa.',
    image: img('freios', 900, 601, 'Mecânico com luvas trabalhando em uma roda de carro'),
    items: ['Disco de freio e pastilhas', 'Fluido de freio', 'Rolamentos', 'Amortecedores e molas', 'Batentes, buchas e balanças', 'Direção hidráulica: reparos e óleo'],
  },
  {
    id: 'motor',
    title: 'Motor, correias e escapamento',
    summary: 'Do preventivo ao reparo: correia dentada, junta de cabeçote, retífica e escapamento, com explicação do porquê.',
    image: img('motor', 900, 598, 'Mecânico com luvas segurando peça no compartimento do motor'),
    items: ['Correia dentada e correia de serviço', 'Junta de cabeçote', 'Retífica e montagem', 'Retentores, juntas e anéis de vedação', 'Suporte de motor', 'Escapamento: catalisador, coletor e silencioso'],
  },
  {
    id: 'ar-condicionado',
    title: 'Ar-condicionado e arrefecimento',
    summary: 'Ar gelado e motor na temperatura certa: gás, higienização, filtro, radiador e fluido de arrefecimento.',
    image: img('arrefecimento', 900, 900, 'Reservatório de fluido de arrefecimento sob o capô de um carro'),
    items: ['Troca de gás do ar-condicionado', 'Higienização e troca de filtro', 'Troca de radiador', 'Troca de fluido de arrefecimento', 'Limpeza do sistema de arrefecimento'],
  },
  {
    id: 'lataria',
    title: 'Lataria e batidas',
    summary: 'Do pequeno reparo à grande batida, recuperando a carroceria e remontando tudo no lugar, em nacionais e importados.',
    image: img('lataria', 900, 601, 'Profissional reparando a lataria de um carro cinza'),
    items: ['Pequenos reparos', 'Grandes batidas e restauração', 'Paralamas', 'Recuperação de parachoques (nacionais e importados)', 'Alinhamento de longarina e de carroceria', 'Montagem geral: portas, vidros, fechaduras, bancos, estofamento, acessórios e painel do airbag'],
  },
  {
    id: 'pintura',
    title: 'Pintura automotiva',
    summary: 'Acabamento que combina com o original, de cores sólidas a perolizadas e tricoat, inclusive retoques.',
    image: img('pintura', 900, 600, 'Polimento de pintura em um carro branco'),
    items: ['Pintura geral', 'Retoques', 'Cores sólidas', 'Perolizada', 'Tricoat'],
  },
  {
    id: 'polimento-lavagem',
    title: 'Polimento e lavagem',
    summary: 'O carro com cara de novo: polimento e lavagem por fora, completa ou por baixo.',
    image: img('polimento', 900, 596, 'Polimento da lataria de um carro cinza com politriz'),
    items: ['Polimento', 'Lavagem por fora', 'Lavagem completa', 'Lavagem por baixo'],
  },
].map((s) => ({
  ...s,
  whatsappMessage: `Olá Marcelo! Vim pelo site e gostaria de agendar: ${s.title.toLowerCase()}.`,
}))

export const notOffered = [
  'Câmbio automático',
  'Carburação',
  'Balanceamento e geometria de suspensão',
  'Montagem de pneus',
  'Martelinho de ouro',
]
