import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CLINIC } from '../config.js';

const KEY = 'callPopupDismissed';

/** Centered call modal, once per session. Waits while another popup is open. Hidden until a phone number is configured. */
export default function CallPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CLINIC.phone || sessionStorage.getItem(KEY)) return;
    let id;
    const t = setTimeout(() => {
      id = setInterval(() => {
        if (document.querySelector('[data-popup]')) return;
        clearInterval(id); setOpen(true);
      }, 1000);
    }, 12000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  const close = () => { sessionStorage.setItem(KEY, '1'); setOpen(false); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div data-popup className="fixed inset-0 z-[90] grid place-items-center bg-black/55 px-4" onClick={close}>
      <div role="dialog" aria-modal="true" aria-labelledby="call-title" className="relative w-full max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-soft" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} aria-label="Close call prompt" className="absolute right-4 top-4 rounded-full p-1.5 text-ink-muted transition hover:bg-black/5">
          <X size={20} aria-hidden />
        </button>
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-blush-100 ring-4 ring-blush-200/60">
          <span className="grad-crimson grid h-14 w-14 place-items-center rounded-full text-white"><Phone size={26} aria-hidden /></span>
        </span>
        <p id="call-title" className="mt-5 font-display text-xl font-semibold text-ink">Call {CLINIC.name}</p>
        <p className="mt-1 text-sm text-ink-muted">Our skin experts are just a call away</p>
        <p className="mt-5 text-3xl font-bold tracking-wide text-crimson-700">{CLINIC.phoneDisplay || CLINIC.phone}</p>
        <a href={`tel:${CLINIC.phone}`} onClick={close} className="grad-crimson mt-6 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 font-bold uppercase text-white shadow-glow transition hover:brightness-110">
          <Phone size={18} aria-hidden /> Call now
        </a>
        <button onClick={close} className="mt-4 text-sm font-semibold text-ink-muted hover:text-ink">Maybe later</button>
      </div>
    </div>
  );
}
