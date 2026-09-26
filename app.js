'use strict';
(() => {
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const audio = $('#radio'), translations = window.RTD_TRANSLATIONS;
  let language = 'fr', state = 'ready', remember = false, timeout, active = false, attempt = 0;
  try {
    const saved = JSON.parse(localStorage.getItem('rtd-preferences') || 'null');
    if (saved && saved.remember === true) {
      remember = true;
      if (translations[saved.language]) language = saved.language;
      if (typeof saved.volume === 'number' && saved.volume >= 0 && saved.volume <= 1) audio.volume = saved.volume;
      else audio.volume = .75;
    } else audio.volume = .75;
  } catch { audio.volume = .75; }
  function persist() {
    try {
      if (remember) localStorage.setItem('rtd-preferences', JSON.stringify({remember:true,language,volume:audio.volume}));
      else localStorage.removeItem('rtd-preferences');
    } catch { /* Private browsing may disable storage; the player still works. */ }
  }
  function setState(next) {
    state = next;
    const playing = state === 'playing', busy = state === 'connecting';
    document.body.classList.toggle('is-playing',playing);
    $('.status').textContent = translations[language][state];
    $('.dock-status').textContent = translations[language][state];
    $$('[data-play]').forEach(b => {
      b.setAttribute('aria-label',translations[language][active ? 'pause' : 'listenlive']);
      b.setAttribute('aria-pressed',String(active));
      b.setAttribute('aria-busy',String(busy));
      b.querySelector('svg').innerHTML = active ? '<path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/>' : '<path d="m9 5 11 7-11 7z" fill="currentColor"/>';
      const label=b.querySelector('[data-i18n]');
      if(label) label.textContent=translations[language][active?'pause':label.dataset.i18n];
    });
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
  }
  function stop(next='paused') {
    active=false;attempt++;clearTimeout(timeout);audio.pause();audio.removeAttribute('src');audio.load();setState(next);
  }
  function fail() { if(active) stop('error'); }
  function watchdog() { clearTimeout(timeout);timeout=setTimeout(fail,20000); }
  async function start() {
    if(active)return;
    const currentAttempt=++attempt;
    active=true;audio.src=window.RTD_CONFIG.stream;setState('connecting');watchdog();
    try { await audio.play(); } catch { if(active&&attempt===currentAttempt) fail(); }
  }
  $$('[data-play]').forEach(b=>b.addEventListener('click',()=>active?stop():start()));
  audio.addEventListener('playing',()=>{if(active){clearTimeout(timeout);setState('playing');}});
  audio.addEventListener('waiting',()=>{if(active){setState('connecting');watchdog();}});
  audio.addEventListener('stalled',()=>{if(active){setState('connecting');watchdog();}});
  audio.addEventListener('error',fail);audio.addEventListener('ended',fail);
  audio.addEventListener('pause',()=>{if(active&&audio.paused){active=false;clearTimeout(timeout);setState('paused');}});
  $('#volume').value=audio.volume;
  $('#volume').addEventListener('input',e=>{audio.volume=Number(e.target.value);persist();});
  function clock(){ $('#clock').textContent = new Intl.DateTimeFormat(language==='ht'?'fr':language,{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/New_York'}).format(new Date())+' · Boston'; }
  function renderItems() {
    const localized=v=>typeof v==='string'?v:(v?.[language]||v?.fr||'');
    for(const [selector,items,article] of [['#schedule-list',window.RTD_PROGRAMS,false],['#articles-list',window.RTD_ARTICLES,true]]){
      const target=$(selector);target.replaceChildren();
      for(const item of items){
        const card=document.createElement('article');card.className='content-item';
        const h=document.createElement('h3');h.textContent=localized(item.title);card.append(h);
        if(article&&item.date){const date=document.createElement('time');date.dateTime=item.date;date.textContent=new Intl.DateTimeFormat(language==='ht'?'fr':language,{dateStyle:'long',timeZone:'UTC'}).format(new Date(item.date+'T12:00:00Z'));card.append(date);}
        const p=document.createElement('p');p.textContent=localized(article?item.body:item.detail);card.append(p);target.append(card);
      }
    }
    $('.schedule').hidden=window.RTD_PROGRAMS.length>0;
    $('.news-empty').hidden=window.RTD_ARTICLES.length>0;
  }
  function localize() {
    document.documentElement.lang=language;
    $('#language').value=language;
    $$('[data-i18n]').forEach(el=>{const text=translations[language][el.dataset.i18n];if(text!==undefined)el.innerHTML=text;});
    $('.live-title h2').textContent=translations[language].liveTitle;
    $$('[data-close]').forEach(b=>b.setAttribute('aria-label',translations[language].close));
    document.title='Radio Télé Différence — '+translations[language].slogan;
    $('meta[property="og:title"]').content=document.title;
    const desc=translations[language].intro;
    $('meta[name="description"]').content=desc;
    $('meta[property="og:description"]').content=desc;
    $('meta[property="og:locale"]').content={fr:'fr_FR',ht:'ht_HT',en:'en_US'}[language];
    if($('#legal-dialog').open)renderLegal($('#legal-dialog').dataset.page);
    setState(state);renderItems();clock();persist();
  }
  $('#language').addEventListener('change',e=>{language=e.target.value;localize();});
  $('.menu').addEventListener('click',()=>{const opened=$('#navigation').classList.toggle('open');$('.menu').setAttribute('aria-expanded',String(opened));});
  $$('#navigation a').forEach(a=>a.addEventListener('click',()=>{$('#navigation').classList.remove('open');$('.menu').setAttribute('aria-expanded','false');}));
  function renderLegal(page){$('#legal-dialog').dataset.page=page;$('#legal-content').innerHTML=window.RTD_LEGAL[language][page];}
  function openLegal(page){renderLegal(page);if(!$('#legal-dialog').open)$('#legal-dialog').showModal();}
  $$('[data-legal]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',a.getAttribute('href'));openLegal(a.dataset.legal);}));
  function legalHash(){const p={'#confidentialite':'privacy','#conditions':'terms'}[location.hash];if(p)openLegal(p);}
  addEventListener('hashchange',legalHash);
  $$('[data-preferences]').forEach(b=>b.addEventListener('click',()=>{$('#remember').checked=remember;$('#preferences-dialog').showModal();}));
  $('.save-preferences').addEventListener('click',()=>{remember=$('#remember').checked;persist();$('#preferences-dialog').close();});
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  $('#legal-dialog').addEventListener('close',()=>{if(['#conditions','#confidentialite'].includes(location.hash))history.replaceState(null,'',location.pathname+location.search);});
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata=new MediaMetadata({title:'Radio Télé Différence',artist:'Boston · Haïti · Caraïbes',artwork:[{src:new URL('./assets/icon-512.png',location.href).href,sizes:'512x512',type:'image/png'}]});
    navigator.mediaSession.setActionHandler('play',start);navigator.mediaSession.setActionHandler('pause',()=>stop());navigator.mediaSession.setActionHandler('stop',()=>stop());
  }
  $('#year').textContent=new Date().getFullYear();localize();legalHash();setInterval(clock,30000);
  if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
