'use client';

import { cn } from '@/lib/utils';

/** Superficie con un foco radial que sigue al cursor (solo ratón). */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    target.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    target.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    target.style.setProperty('--spot-opacity', '1');
  }

  return (
    <div
      className={cn('spotlight', className)}
      onPointerMove={onPointerMove}
      onPointerLeave={(event) =>
        event.currentTarget.style.setProperty('--spot-opacity', '0')
      }
    >
      {children}
    </div>
  );
}
