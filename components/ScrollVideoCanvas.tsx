"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 101;

function getFrameSrc(index: number): string {
  const padded = String(index + 1).padStart(4, "0");
  return `/frames/frame_${padded}.jpg`;
}

export default function ScrollVideoCanvas({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const rafRef = useRef<number>(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width * dpr;
    const h = rect.height * dpr;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);

    // Cover-fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let sw: number, sh: number, sx: number, sy: number;
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }, []);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const frames: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      frames.push(img);
    }
    framesRef.current = frames;
  }, [drawFrame]);

  // Scroll handler
  useEffect(() => {
    if (!loaded) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const scrollStart = -viewportH;
        const scrollEnd = rect.height;
        const progress = Math.min(
          1,
          Math.max(0, (scrollStart - rect.top) / (scrollEnd - scrollStart))
        );
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );
        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame]);

  return (
    <div ref={containerRef} className={className}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-1 rounded-full overflow-hidden bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${loadProgress * 100}%`,
                  background:
                    "linear-gradient(to right, #9281F7, #9A54DC)",
                }}
              />
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
