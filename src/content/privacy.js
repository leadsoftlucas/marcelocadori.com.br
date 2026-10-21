// Texto da Política de Privacidade e Cookies (LGPD). Muda sozinho conforme o site use ou não
// analytics (variáveis VITE_GTM_ID / VITE_GA_ID). Revisão jurídica recomendada antes de divulgar.
export function buildPrivacy(site) {
  const on = site.analyticsEnabled
  const where = site.addressLine ? `, com atendimento em ${site.addressLine}` : ''

  const sections = [
    {
      id: 'quem-somos',
      title: 'Quem é o responsável',
      paragraphs: [
        site.legalName
          ? `O responsável pelo tratamento dos dados (controlador) é ${site.legalName}${site.cnpj ? `, inscrita no CNPJ sob o nº ${site.cnpj}` : ''}, responsável por este site de ${site.name}${where}.`
          : `O responsável pelo tratamento dos dados (controlador) é ${site.name}, mecânico${where}.`,
      ],
    },
    {
      id: 'dados-coletados',
      title: 'Quais dados tratamos',
      list: [
        'Dados que você nos envia: o site não tem formulários nem cadastro. Se você clicar em um botão de WhatsApp, a conversa acontece no WhatsApp e passamos a receber o número do seu telefone e o que você escrever.',
        on
          ? 'Dados de navegação (somente com o seu consentimento): páginas e seções visitadas, cliques em botões (como WhatsApp e mapa), tipo de aparelho e navegador, localização aproximada e origem do acesso, coletados pelo Google Analytics.'
          : 'Dados de navegação: neste momento o site não coleta estatísticas de navegação.',
        'Mapa do Google: ao exibir o mapa de “Como chegar”, o Google pode receber o seu endereço IP e dados do navegador, conforme a política de privacidade do próprio Google.',
        on && 'Armazenamento no seu navegador: guardamos apenas a sua escolha sobre cookies (chave “mc-consent”), para não perguntar de novo a cada visita.',
        'Registros da hospedagem: o site é hospedado no GitHub Pages, que pode registrar o endereço IP e dados técnicos de acesso para segurança e funcionamento.',
      ].filter(Boolean),
    },
    {
      id: 'finalidades',
      title: 'Para que usamos e em que base legal',
      list: [
        'Atender o seu pedido de contato e de agendamento pelo WhatsApp: procedimentos preliminares a um serviço que você solicitou (LGPD, art. 7º, V).',
        on && 'Entender como o site é usado e melhorá-lo: o seu consentimento (LGPD, art. 7º, I), que você pode retirar a qualquer momento.',
        'Segurança e funcionamento do site e da hospedagem: legítimo interesse (LGPD, art. 7º, IX).',
      ].filter(Boolean),
    },
    {
      id: 'cookies',
      title: 'Cookies',
      paragraphs: on
        ? [
            'Os cookies de análise só são criados depois que você clica em “Aceitar” no aviso. Se você recusar ou ignorar o aviso, a ferramenta de análise não é carregada e nenhum cookie desse tipo é gravado. O site funciona igual nos dois casos.',
          ]
        : ['Atualmente este site não usa cookies de análise nem de publicidade.'],
      table: on
        ? {
            head: ['Cookie', 'Origem', 'Para que serve', 'Validade'],
            rows: [
              ['_ga', 'Google Analytics', 'Distingue visitantes de forma anônima', '2 anos'],
              ['_ga_<ID>', 'Google Analytics', 'Guarda o estado da sessão de navegação', '2 anos'],
            ],
          }
        : null,
      after: on
        ? [
            'Para mudar de ideia, use “Preferências de cookies” no rodapé do site. Ao recusar depois de ter aceitado, apagamos os cookies de análise deste site e pedimos ao Google que pare de usá-los.',
          ]
        : [],
    },
    {
      id: 'compartilhamento',
      title: 'Com quem compartilhamos',
      list: [
        on && 'Google (Google Analytics e Tag Manager), apenas se você aceitar os cookies de análise.',
        'Google (Maps), para exibir o mapa da oficina.',
        'GitHub (hospedagem do site).',
        'WhatsApp / Meta, nas conversas que você mesmo iniciar.',
      ].filter(Boolean),
      paragraphs: [
        'Não vendemos nem alugamos os seus dados. Alguns desses prestadores podem processar dados em outros países (transferência internacional, LGPD, art. 33).',
      ],
    },
    {
      id: 'retencao',
      title: 'Por quanto tempo guardamos',
      list: [
        on && 'Dados de análise: pelo período definido na configuração do Google Analytics.',
        'Conversas de WhatsApp: pelo tempo necessário ao atendimento e ao cumprimento de obrigações legais.',
        on && 'A sua escolha sobre cookies: até você limpar os dados do navegador.',
      ].filter(Boolean),
    },
    {
      id: 'direitos',
      title: 'Seus direitos',
      paragraphs: [
        'A qualquer momento, conforme o art. 18 da LGPD, você pode: confirmar se tratamos seus dados; acessá-los; corrigi-los; pedir anonimização, bloqueio ou eliminação de dados desnecessários; pedir a portabilidade; saber com quem os compartilhamos; retirar o consentimento; e reclamar à Autoridade Nacional de Proteção de Dados (ANPD).',
        'Para exercer esses direitos, fale conosco:',
      ],
      contact: true,
    },
    {
      id: 'seguranca',
      title: 'Segurança',
      paragraphs: [
        'O site é servido por conexão segura (HTTPS) e não coleta dados pessoais por formulários. Adotamos medidas razoáveis para proteger as informações, mas nenhum sistema na internet é totalmente livre de riscos.',
      ],
    },
    {
      id: 'alteracoes',
      title: 'Alterações nesta política',
      paragraphs: ['Podemos atualizar esta política. A data no topo da página indica a última revisão.'],
    },
  ]

  return {
    title: 'Política de Privacidade e Cookies',
    updatedLabel: '21 de outubro de 2026',
    intro: [
      `Esta política explica como o site de ${site.name}, oficina de mecânica, lataria e pintura, trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).`,
      on
        ? 'Em resumo: o site não tem formulários, não vende dados e só carrega a ferramenta de análise se você aceitar.'
        : 'Em resumo: o site não tem formulários, não vende dados e, neste momento, não usa cookies de análise.',
    ],
    sections,
  }
}
