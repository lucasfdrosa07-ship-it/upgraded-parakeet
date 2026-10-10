import './styles.css';

const CHECKOUT_URL = 'https://pay.cakto.com.br/vib2iqj_1184826';
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
const ATTRIBUTION_STORAGE_KEY = 'serralheiro-attribution-v1';

type Testimonial = { image: string; width: number; height: number };
type PurchaseNotice = { name: string; city: string; region: string };

const testimonials: Testimonial[] = [
  { image: '/images/depoimento-01.webp', width: 720, height: 1444 },
  { image: '/images/depoimento-02.webp', width: 720, height: 1456 },
  { image: '/images/depoimento-03.webp', width: 793, height: 1600 },
  { image: '/images/depoimento-04.webp', width: 793, height: 1600 },
  { image: '/images/depoimento-05.webp', width: 787, height: 1600 },
  { image: '/images/depoimento-06.webp', width: 787, height: 1600 },
];

// Compras confirmadas pelo proprietário; sem horário exibido ao visitante.
const purchaseNotices: PurchaseNotice[] = [
  { name: 'Carlos M.', city: 'Uberlândia', region: 'MG' },
  { name: 'Lucas R.', city: 'Goiânia', region: 'GO' },
  { name: 'Marcos A.', city: 'Belo Horizonte', region: 'MG' },
  { name: 'Rafael C.', city: 'Florianópolis', region: 'SC' },
  { name: 'Bruno F.', city: 'Brasília', region: 'DF' },
  { name: 'Diego N.', city: 'Joinville', region: 'SC' },
  { name: 'Thiago V.', city: 'Sorocaba', region: 'SP' },
  { name: 'Gabriel H.', city: 'Maringá', region: 'PR' },
  { name: 'João P.', city: 'Salvador', region: 'BA' },
  { name: 'Felipe S.', city: 'Porto Alegre', region: 'RS' },
  { name: 'André L.', city: 'Campo Grande', region: 'MS' },
  { name: 'Rodrigo T.', city: 'Santos', region: 'SP' },
  { name: 'Eduardo B.', city: 'Natal', region: 'RN' },
  { name: 'Caio N.', city: 'Aracaju', region: 'SE' },
  { name: 'Vinícius H.', city: 'São José dos Campos', region: 'SP' },
  { name: 'Henrique P.', city: 'Petrópolis', region: 'RJ' },
  { name: 'Matheus C.', city: 'Maceió', region: 'AL' },
  { name: 'Leandro F.', city: 'Montes Claros', region: 'MG' },
  { name: 'Gustavo T.', city: 'Bauru', region: 'SP' },
  { name: 'Daniel V.', city: 'Anápolis', region: 'GO' },
  { name: 'Murilo A.', city: 'Franca', region: 'SP' },
  { name: 'Renan G.', city: 'Foz do Iguaçu', region: 'PR' },
  { name: 'Igor D.', city: 'Uberaba', region: 'MG' },
  { name: 'Pedro M.', city: 'Campinas', region: 'SP' },
  { name: 'Leonardo R.', city: 'Curitiba', region: 'PR' },
  { name: 'Marcelo S.', city: 'Ribeirão Preto', region: 'SP' },
  { name: 'Fernando A.', city: 'Vitória', region: 'ES' },
  { name: 'Ricardo L.', city: 'Londrina', region: 'PR' },
  { name: 'Alexandre C.', city: 'Fortaleza', region: 'CE' },
  { name: 'Samuel P.', city: 'São Luís', region: 'MA' },
  { name: 'Carlos B.', city: 'Juiz de Fora', region: 'MG' },
  { name: 'Lucas M.', city: 'Niterói', region: 'RJ' },
  { name: 'Rafael S.', city: 'Cuiabá', region: 'MT' },
  { name: 'Bruno A.', city: 'Blumenau', region: 'SC' },
  { name: 'Diego R.', city: 'João Pessoa', region: 'PB' },
  { name: 'Thiago C.', city: 'São José do Rio Preto', region: 'SP' },
  { name: 'Gabriel M.', city: 'Caxias do Sul', region: 'RS' },
  { name: 'João L.', city: 'Piracicaba', region: 'SP' },
  { name: 'Felipe N.', city: 'Vila Velha', region: 'ES' },
  { name: 'André G.', city: 'Chapecó', region: 'SC' },
  { name: 'Rodrigo B.', city: 'Pelotas', region: 'RS' },
  { name: 'Eduardo M.', city: 'Governador Valadares', region: 'MG' },
  { name: 'Caio R.', city: 'Contagem', region: 'MG' },
  { name: 'Vinícius S.', city: 'Recife', region: 'PE' },
  { name: 'Henrique A.', city: 'São Paulo', region: 'SP' },
];

function readStoredAttribution(): URLSearchParams {
  try { return new URLSearchParams(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? ''); }
  catch { return new URLSearchParams(); }
}

const attribution = readStoredAttribution();
function refreshAttribution(): void {
  const currentParams = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    if (currentParams.has(key)) attribution.set(key, currentParams.get(key) ?? '');
  }
  try { sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, attribution.toString()); }
  catch { /* Links continuam funcionando com os parâmetros da URL atual. */ }
}
refreshAttribution();

function updateCheckoutLink(link: HTMLAnchorElement): void {
  refreshAttribution();
  const url = new URL(link.href || CHECKOUT_URL);
  for (const key of ATTRIBUTION_KEYS) {
    if (attribution.has(key)) url.searchParams.set(key, attribution.get(key) ?? '');
  }
  link.href = url.toString();
}

document.querySelectorAll<HTMLAnchorElement>('.checkout-link').forEach(updateCheckoutLink);
document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>('a.checkout-link');
  if (link) updateCheckoutLink(link);
}, true);

const carousel = document.querySelector<HTMLElement>('.testimonial-carousel');
const image = document.querySelector<HTMLImageElement>('#testimonial-image');
const previous = document.querySelector<HTMLButtonElement>('#testimonial-prev');
const next = document.querySelector<HTMLButtonElement>('#testimonial-next');
const pause = document.querySelector<HTMLButtonElement>('#testimonial-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (carousel && image && previous && next && pause) {
  let activeIndex = 0;
  let manualPause = reducedMotion.matches;
  let nearby = false;
  let interacting = false;
  let timer: number | undefined;

  function preloadFollowing(index: number): void {
    const upcoming = testimonials[(index + 1) % testimonials.length];
    const preload = new Image();
    preload.src = upcoming.image;
  }

  function showSlide(index: number): void {
    activeIndex = (index + testimonials.length) % testimonials.length;
    const slide = testimonials[activeIndex];
    image!.src = slide.image;
    image!.alt = 'Captura de depoimento de cliente';
    image!.width = slide.width;
    image!.height = slide.height;
    preloadFollowing(activeIndex);
    restartTimer();
  }

  function restartTimer(): void {
    window.clearInterval(timer);
    timer = undefined;
    if (manualPause || !nearby || interacting || document.hidden) return;
    timer = window.setInterval(() => showSlide(activeIndex + 1), 4000);
  }

  function syncPauseButton(): void {
    pause!.setAttribute('aria-label', manualPause ? 'Reproduzir carrossel' : 'Pausar carrossel');
    pause!.setAttribute('aria-pressed', String(manualPause));
    pause!.querySelector('use')?.setAttribute('href', manualPause ? '#i-play' : '#i-pause');
  }

  previous.addEventListener('click', () => showSlide(activeIndex - 1));
  next.addEventListener('click', () => showSlide(activeIndex + 1));
  pause.addEventListener('click', () => { manualPause = !manualPause; syncPauseButton(); restartTimer(); });
  carousel.addEventListener('pointerenter', () => { interacting = true; restartTimer(); });
  carousel.addEventListener('pointerleave', () => { interacting = false; restartTimer(); });
  carousel.addEventListener('focusin', () => { interacting = true; restartTimer(); });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget as Node | null)) { interacting = false; restartTimer(); }
  });
  document.addEventListener('visibilitychange', restartTimer);
  reducedMotion.addEventListener('change', (event) => { manualPause = event.matches; syncPauseButton(); restartTimer(); });

  syncPauseButton();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      nearby = entries[0].isIntersecting;
      if (nearby) preloadFollowing(activeIndex);
      restartTimer();
    }, { rootMargin: '350px 0px' });
    observer.observe(carousel);
  } else {
    nearby = true;
    preloadFollowing(activeIndex);
    restartTimer();
  }
}

const notification = document.querySelector<HTMLElement>('#purchase-notification');
const purchaseName = document.querySelector<HTMLElement>('#purchase-name');
const purchaseLocation = document.querySelector<HTMLElement>('#purchase-location');
const PURCHASE_STORAGE_KEY = 'serralheiro-purchase-notices-shown-v2';
let soundContext: AudioContext | null = null;
let soundResumePending = false;

function getSoundContext(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  try { return soundContext ??= new AudioContext(); }
  catch { return null; }
}

function unlockPurchaseSound(): void {
  const context = getSoundContext();
  if (context && context.state !== 'running' && !soundResumePending) {
    soundResumePending = true;
    void context.resume().catch(() => {}).finally(() => { soundResumePending = false; });
  }
}

document.addEventListener('pointerdown', unlockPurchaseSound, { once: true, passive: true });
document.addEventListener('keydown', unlockPurchaseSound, { once: true });

function emitPurchaseSound(context: AudioContext): void {
  const start = context.currentTime;
  for (const [frequency, delay] of [[660, 0], [880, 0.12]]) {
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    volume.gain.setValueAtTime(0.0001, start + delay);
    volume.gain.exponentialRampToValueAtTime(0.055, start + delay + 0.025);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + delay + 0.22);
    oscillator.connect(volume).connect(context.destination);
    oscillator.start(start + delay);
    oscillator.stop(start + delay + 0.23);
    oscillator.onended = () => { oscillator.disconnect(); volume.disconnect(); };
  }
}

function playPurchaseSound(): void {
  const context = getSoundContext();
  if (!context) return;
  if (context.state === 'running') {
    emitPurchaseSound(context);
  } else if (!soundResumePending) {
    soundResumePending = true;
    void context.resume().then(() => {
      if (context.state === 'running' && notification && !notification.hidden) emitPurchaseSound(context);
    }).catch(() => {}).finally(() => { soundResumePending = false; });
  }
}

if (notification && purchaseName && purchaseLocation && purchaseNotices.length > 0) {
  let shown = 0;
  try { shown = Math.max(0, Number(sessionStorage.getItem(PURCHASE_STORAGE_KEY)) || 0); }
  catch { /* Sem armazenamento de sessão. */ }
  const limit = purchaseNotices.length;

  if (shown < limit) {
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      const purchase = purchaseNotices[shown];
      if (!purchase) { window.clearInterval(interval); return; }

      purchaseName.textContent = `${purchase.name} adquiriu o Pack`;
      purchaseLocation.textContent = `${purchase.city}, ${purchase.region}`;
      notification.hidden = false;
      playPurchaseSound();
      shown += 1;
      try { sessionStorage.setItem(PURCHASE_STORAGE_KEY, String(shown)); }
      catch { /* Exibição da sessão atual continua. */ }
      window.setTimeout(() => { notification.hidden = true; }, 3500);
      if (shown >= limit) window.clearInterval(interval);
    }, 12000);
  }
}

const faqButtons = [...document.querySelectorAll<HTMLButtonElement>('.faq-trigger')];

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const shouldOpen = button.getAttribute('aria-expanded') !== 'true';

    faqButtons.forEach((otherButton) => {
      const answerId = otherButton.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;
      otherButton.setAttribute('aria-expanded', 'false');
      if (answer) answer.hidden = true;
    });

    if (shouldOpen) {
      const answerId = button.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;
      button.setAttribute('aria-expanded', 'true');
      if (answer) answer.hidden = false;
    }
  });
});
