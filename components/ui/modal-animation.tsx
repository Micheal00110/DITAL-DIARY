'use client';

import { useEffect, useRef } from 'react';

interface ModalAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalAnimation({ children, className = '' }: ModalAnimationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add anime.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializeModal();
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeModal = () => {
    const items = document.querySelectorAll('.item');
    
    // Create demo dialog
    const $dialog = document.createElement('dialog');
    $dialog.id = 'layout-dialog';
    $dialog.className = 'p-0 border-0 bg-transparent backdrop:bg-black/50';
    document.body.appendChild($dialog);

    // Create modal layout
    const a = (window as any).anime;
    if (!a || typeof a.createLayout !== 'function') {
      // anime.js not available or createLayout unsupported; skip modal animation
      return;
    }
    const modalLayout = a.createLayout($dialog, {
      children: ['.item', 'h2', 'h3', 'p', 'label', 'input'],
      properties: ['--overlay-alpha'],
    });

    const closeModal = () => {
      modalLayout.update(({ root }: any) => {
        $dialog.close();
        const $item = document.querySelector('.item.is-open') as HTMLElement;
        if ($item) {
          $item.classList.remove('is-open');
          $item.focus();
        }
      });
    };

    const openModal = (e: Event) => {
      const $target = e.target as HTMLElement;
      const $item = $target.closest('.item') as HTMLElement;
      if (!$item) return;

      const $clone = $item.cloneNode(true) as HTMLElement;
      $clone.classList.add('scale-105', 'shadow-2xl');
      $dialog.innerHTML = '';
      $dialog.appendChild($clone);

      modalLayout.update(() => {
        $dialog.showModal();
        $item.classList.add('is-open');
      }, {
        duration: parseInt($item.dataset.duration || '800')
      });
    };

    // Add event listeners
    items.forEach($item => $item.addEventListener('click', openModal));
    $dialog.addEventListener('cancel', closeModal);
    $dialog.addEventListener('click', (e) => {
      if (e.target === $dialog) closeModal();
    });

    // Cleanup
    return () => {
      items.forEach($item => $item.removeEventListener('click', openModal));
      $dialog.removeEventListener('cancel', closeModal);
      $dialog.removeEventListener('click', closeModal);
    };
  };

  return (
    <div ref={modalRef} className={className}>
      {children}
    </div>
  );
}
