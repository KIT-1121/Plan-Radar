"use client";

import { useEffect } from "react";

function getAnchor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a");
  return anchor instanceof HTMLAnchorElement ? anchor : null;
}

function store(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href || href === "#") return;
  anchor.dataset.href = href;
  if (anchor.target) anchor.dataset.target = anchor.target;
  anchor.setAttribute("role", "link");
  anchor.removeAttribute("href");
}

function restore(anchor: HTMLAnchorElement) {
  const href = anchor.dataset.href;
  if (!href) return;
  anchor.setAttribute("href", href);
  anchor.removeAttribute("data-href");
  anchor.removeAttribute("data-target");
  anchor.removeAttribute("role");
}

function open(anchor: HTMLAnchorElement, event: MouseEvent) {
  const href = anchor.dataset.href;
  if (!href) return false;
  const target = anchor.dataset.target;
  const newTab =
    target === "_blank" ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey;
  if (newTab) {
    window.open(href, target || "_blank", "noopener,noreferrer");
  } else {
    window.location.href = href;
  }
  return true;
}

export function LinkPreviewGuard() {
  useEffect(() => {
    function handleOver(event: MouseEvent) {
      const anchor = getAnchor(event.target);
      if (anchor) store(anchor);
    }

    function handleOut(event: MouseEvent) {
      const anchor = getAnchor(event.target);
      if (!anchor || !anchor.dataset.href) return;
      const related = event.relatedTarget as Node | null;
      if (related && anchor.contains(related)) return;
      restore(anchor);
    }

    function handleClick(event: MouseEvent) {
      const anchor = getAnchor(event.target);
      if (!anchor || !anchor.dataset.href) return;
      event.preventDefault();
      open(anchor, event);
    }

    function handleAuxClick(event: MouseEvent) {
      if (event.button !== 1) return;
      const anchor = getAnchor(event.target);
      if (!anchor || !anchor.dataset.href) return;
      event.preventDefault();
      window.open(anchor.dataset.href, "_blank", "noopener,noreferrer");
    }

    function handleContext(event: MouseEvent) {
      const anchor = getAnchor(event.target);
      if (anchor) restore(anchor);
    }

    document.addEventListener("mouseover", handleOver, true);
    document.addEventListener("mouseout", handleOut, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("auxclick", handleAuxClick, true);
    document.addEventListener("contextmenu", handleContext, true);

    return () => {
      document.removeEventListener("mouseover", handleOver, true);
      document.removeEventListener("mouseout", handleOut, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("auxclick", handleAuxClick, true);
      document.removeEventListener("contextmenu", handleContext, true);
    };
  }, []);

  return null;
}
