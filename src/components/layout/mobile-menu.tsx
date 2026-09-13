"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

type MenuLink = {
  href: string;
  label: string;
};

type LanguageLink = MenuLink & {
  locale: "es" | "en";
  current: boolean;
  accessibleLabel: string;
};

type MobileMenuProps = {
  openLabel: string;
  closeLabel: string;
  title: string;
  navigationLabel: string;
  languageLabel: string;
  links: MenuLink[];
  languages: LanguageLink[];
  action: MenuLink;
};

export function MobileMenu({
  openLabel,
  closeLabel,
  title,
  navigationLabel,
  languageLabel,
  links,
  languages,
  action,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const dialogId = useId();
  const reducedMotion = useReducedMotion();

  function openMenu() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function finishClosing() {
    if (!isOpen && dialogRef.current?.open) {
      dialogRef.current.close();
      triggerRef.current?.focus({ preventScroll: true });
    }
  }

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={openMenu}
        className="flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Menu aria-hidden="true" size={20} />
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={titleId}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg backdrop:bg-bg/75 open:flex open:items-end"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <m.div
          className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-line bg-surface px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 32 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          onAnimationComplete={finishClosing}
        >
          <div className="mb-7 flex items-center justify-between gap-4">
            <p id={titleId} className="font-display text-xl font-medium">
              {title}
            </p>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={closeMenu}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-fg-mute transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <nav aria-label={navigationLabel}>
            <ul className="divide-y divide-line">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex min-h-16 items-center justify-between gap-4 rounded-sm font-display text-2xl transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      size={20}
                      className="text-fg-mute"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <span className="text-sm text-fg-mute">{languageLabel}</span>
            <div className="flex gap-1">
              {languages.map((language) => (
                <a
                  key={language.locale}
                  href={language.href}
                  hrefLang={language.locale}
                  lang={language.locale}
                  aria-label={language.accessibleLabel}
                  aria-current={language.current ? "page" : undefined}
                  onClick={closeMenu}
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${language.current ? "bg-surface-2 text-fg" : "text-fg-mute hover:text-fg"}`}
                >
                  {language.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href={action.href}
            onClick={closeMenu}
            className="mt-6 flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {action.label}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </m.div>
      </dialog>
    </div>
  );
}
