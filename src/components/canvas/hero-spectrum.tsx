"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type HeroSpectrumProps = {
  label: string;
  pauseLabel: string;
  playLabel: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FRAME_INTERVAL = 1000 / 30;
const BAR_COUNT = 128;
const FULL_CIRCLE = Math.PI * 2;

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(REDUCED_MOTION_QUERY);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerMotionPreference() {
  return true;
}

/** Original, procedural artwork. Its movement does not represent audio data. */
export function HeroSpectrum({
  label,
  pauseLabel,
  playLabel,
}: HeroSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = imageRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !container || !context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let lastFrame = 0;
    let inView = false;
    let disposed = false;

    function draw(time: number) {
      if (!context || width === 0 || height === 0) return;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      const scale = Math.min(width, height) / 560;
      context.scale(scale, scale);

      const halo = context.createRadialGradient(0, 0, 98, 0, 0, 252);
      halo.addColorStop(0, "rgba(103, 232, 249, 0)");
      halo.addColorStop(0.3, "rgba(36, 179, 205, 0.075)");
      halo.addColorStop(0.65, "rgba(36, 179, 205, 0.025)");
      halo.addColorStop(1, "rgba(36, 179, 205, 0)");
      context.fillStyle = halo;
      context.fillRect(-280, -280, 560, 560);

      // Quiet concentric guides leave the middle clear for a parent logo.
      for (const radius of [92, 113, 124, 226, 250]) {
        context.beginPath();
        context.arc(0, 0, radius, 0, FULL_CIRCLE);
        context.strokeStyle =
          radius === 124
            ? "rgba(103, 232, 249, 0.27)"
            : "rgba(103, 232, 249, 0.075)";
        context.lineWidth = 0.7;
        context.stroke();
      }

      context.save();
      context.rotate(time * 0.012);
      context.setLineDash([1, 12]);
      context.beginPath();
      context.arc(0, 0, 260, 0, FULL_CIRCLE);
      context.strokeStyle = "rgba(145, 187, 201, 0.23)";
      context.lineWidth = 1.5;
      context.stroke();
      context.restore();

      // Three narrow waves give the ring depth without a solid luminous wall.
      for (let wave = 0; wave < 3; wave += 1) {
        context.beginPath();
        for (let point = 0; point <= 256; point += 1) {
          const angle = (point / 256) * FULL_CIRCLE;
          const displacement =
            Math.sin(angle * 5 + time * 0.45 + wave * 0.8) * 5 +
            Math.cos(angle * 3 - time * 0.3) * 4;
          const radius = 186 + wave * 9 + displacement;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.strokeStyle = `rgba(103, 232, 249, ${0.065 - wave * 0.014})`;
        context.lineWidth = 0.7;
        context.stroke();
      }

      context.lineCap = "round";
      for (let index = 0; index < BAR_COUNT; index += 1) {
        const angle = (index / BAR_COUNT) * FULL_CIRCLE - Math.PI / 2;
        const shape =
          Math.pow((Math.sin(angle * 3 - 0.8) + 1) / 2, 2) * 38 +
          ((Math.sin(angle * 7 + 0.6) + 1) / 2) * 19;
        const detail = (Math.sin(index * 2.17) + 1) * 7;
        const breath =
          0.76 + Math.sin(time * 0.7 + angle * 2) * 0.15;
        const length = 8 + (shape + detail) * breath;
        const radius = 132;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const magenta = index >= 89 && index <= 93;

        context.beginPath();
        context.moveTo(cosine * radius, sine * radius);
        context.lineTo(cosine * (radius + length), sine * (radius + length));
        context.strokeStyle = magenta
          ? "rgba(244, 114, 182, 0.58)"
          : `rgba(103, 232, 249, ${0.35 + (length / 80) * 0.6})`;
        context.lineWidth = 2.3;
        context.stroke();

        // A low-opacity reflection makes the inner edge feel finely engraved.
        context.beginPath();
        context.moveTo(cosine * 120, sine * 120);
        context.lineTo(cosine * (120 - length * 0.18), sine * (120 - length * 0.18));
        context.strokeStyle = "rgba(103, 232, 249, 0.12)";
        context.lineWidth = 1;
        context.stroke();
      }

      for (let index = 0; index < 4; index += 1) {
        const angle = (index / 4) * FULL_CIRCLE + Math.PI / 4;
        const x = Math.cos(angle) * 238;
        const y = Math.sin(angle) * 238;
        context.beginPath();
        context.moveTo(x - 3, y);
        context.lineTo(x + 3, y);
        context.moveTo(x, y - 3);
        context.lineTo(x, y + 3);
        context.strokeStyle = "rgba(156, 195, 208, 0.3)";
        context.lineWidth = 0.8;
        context.stroke();
      }

      context.restore();
    }

    function canAnimate() {
      return (
        !disposed &&
        !paused &&
        !reducedMotion &&
        inView &&
        document.visibilityState === "visible"
      );
    }

    function animate(timestamp: number) {
      frame = 0;
      if (!canAnimate()) return;

      if (lastFrame === 0) lastFrame = timestamp;
      const elapsed = timestamp - lastFrame;
      if (elapsed >= FRAME_INTERVAL) {
        phaseRef.current += Math.min(elapsed, 100) / 1000;
        lastFrame = timestamp - (elapsed % FRAME_INTERVAL);
        draw(phaseRef.current);
      }
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      if (canAnimate()) frame = requestAnimationFrame(animate);
    }

    function resize() {
      if (!canvas || !container) return;
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      draw(reducedMotion ? 0 : phaseRef.current);
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncAnimation();
      },
      { threshold: 0 },
    );

    resize();
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", syncAnimation);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncAnimation);
      window.removeEventListener("resize", resize);
    };
  }, [paused, reducedMotion]);

  return (
    <div className="relative w-full">
      <div ref={imageRef} role="img" aria-label={label} className="aspect-square w-full">
        <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      </div>
      {!reducedMotion && (
        <button
          type="button"
          aria-label={paused ? playLabel : pauseLabel}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="absolute right-3 bottom-3 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#05070d]/80 px-3 text-xs text-white/65 backdrop-blur-sm transition-colors hover:border-cyan-200/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" size={13} />
          ) : (
            <Pause aria-hidden="true" size={13} />
          )}
          <span>{paused ? playLabel : pauseLabel}</span>
        </button>
      )}
    </div>
  );
}
