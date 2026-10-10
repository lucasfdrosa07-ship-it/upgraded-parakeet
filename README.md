# Pack Tesouro do Serralheiro

Página de vendas estática em HTML, CSS e TypeScript, compilada com Vite.

## Executar

```bash
npm install
npm run dev
```

Para validar e gerar a versão de produção:

```bash
npm run check
npm run build
npm run preview
```

Na Vercel, selecione **Vite**, use `npm run build` como comando de build e `dist` como diretório de saída. As imagens do produto e dos depoimentos estão em `public/images` e as fontes locais em `public/fonts`.

O checkout está configurado na constante `CHECKOUT_URL` em `src/main.ts`. Os seis depoimentos fornecidos estão na ordem do array `testimonials` no mesmo arquivo. O carrossel avança a cada quatro segundos quando está próximo da área visível e não está pausado.

O `<head>` de `index.html` contém o carregador UTMify enviado pelo proprietário, o script de UTMs e uma instalação independente do Meta Pixel `1017789413872986`. O novo carregador codificado aponta para `https://cdn.utmify.com.br/scripts/pixel/pixel.js` e define o identificador UTMify `6a9a06d1d1167f82ce18898a`; apesar de o código ofuscado ser diferente, esses valores são iguais aos do carregador anterior. O ID Meta e a configuração da API de Conversões não aparecem no carregador UTMify; sua vinculação e os eventos do checkout dependem dos painéis da UTMify e da Cakto. O Meta Pixel instalado diretamente envia um `PageView` ao carregar a página e outro quando o caminho muda via History API ou `popstate`, sem disparo extra para mudanças apenas em `#oferta` ou na query. `src/main.ts` preserva `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` e `fbclid` na sessão e nos dois links de checkout, inclusive quando a URL atual muda, sem remover parâmetros acrescentados pela UTMify. Configure nos anúncios o modelo de UTMs fornecido; os macros `{{...}}` não pertencem ao link estático da página.

O componente de notificações usa os 45 nomes e locais confirmados pelo proprietário em `src/main.ts`. Ele exibe “adquiriu o Pack”, sem horário, um registro a cada 12 segundos por 3,5 segundos, com uma barra que se esvazia até desaparecer, até 45 por sessão. Depois da última notificação, o ciclo termina e não reinicia ao recarregar a página na mesma sessão. Um aviso sonoro curto é tentado automaticamente; se o navegador bloquear áudio antes da primeira interação, a notificação visual continua normalmente.

A página usa `translate="no"` e as metatags `notranslate` do Google para sinalizar que o conteúdo não deve ser traduzido automaticamente. A decisão final de tradução manual continua sob controle do navegador do visitante.

Para validar o rastreamento, use uma prévia HTTPS da Vercel com UTMs de teste na URL. Confira os parâmetros nos dois links de checkout. No Meta Pixel Helper e em **Testar Eventos** do Meta, confirme o ID `1017789413872986` e um único `PageView` por abertura da página; clicar em `#oferta` não deve gerar outro evento pelo código local. Confira no painel UTMify se sua integração também envia `PageView` ao mesmo ID: se enviar, ajuste uma das duas integrações para não contar em dobro. Verifique ainda o estado da API de Conversões e o `InitiateCheckout` ao seguir para o checkout Cakto. O site só tem uma página e não usa roteador; se outras páginas HTML forem adicionadas, inclua nelas os scripts de rastreamento.

## Revisão antes da publicação

Confirmar que as alegações de quantidade de projetos e faturamento podem ser comprovadas, verificar os direitos de uso comercial dos arquivos e as condições reais de acesso, entrega e garantia. A copy do briefing foi preservada, com as alterações solicitadas: correções de `LUCrar` para `LUCRAR` e `POuco` para `POUCO`, nova headline do hero e substituição dos travessões e hífens do texto visível por vírgulas.

Em 08/10/2026, o checkout informado abriu com oferta de R$ 37,90, mas exibiu taxa de serviço de R$ 0,99 e total de R$ 38,89. Confirmar com a Cakto o valor final e decidir como alinhar a apresentação do preço na página antes da publicação.
