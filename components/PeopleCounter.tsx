"use client";

import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

type DetectionStatus = "idle" | "loading" | "running" | "error";

export function PeopleCounter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<{ count: number; t: number }[]>([]);
  const lastEstimateUpdateRef = useRef<number>(0);
  const maxEstimatedCountRef = useRef<number>(0);
  const lastMaxIncreaseRef = useRef<number>(0);
  const SWEEP_RESET_MS = 45_000;
  const [status, setStatus] = useState<DetectionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [estimatedCount, setEstimatedCount] = useState<number>(0);
  const [maxEstimatedCount, setMaxEstimatedCount] = useState<number>(0);
  const [faceMode, setFaceMode] = useState<"user" | "environment">(
    "environment",
  );
  const [viewportKey, setViewportKey] = useState(0);

  useEffect(() => {
    const handleResize = () => setViewportKey((k) => k + 1);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    let model: cocoSsd.ObjectDetection | null = null;
    let animationFrameId: number | null = null;
    let isCancelled = false;

    async function setupCamera() {
      try {
        setStatus("loading");

        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: faceMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        video.srcObject = stream;
        await video.play();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        model = await cocoSsd.load({ base: "lite_mobilenet_v2" });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        setStatus("running");

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const detectFrame = async () => {
          if (!video || !model || video.readyState !== 4) {
            animationFrameId = requestAnimationFrame(detectFrame);
            return;
          }

          try {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const predictions = await model.detect(canvas, 40, 0.35);
            const persons = predictions.filter(
              (p) => p.class === "person" && p.score !== undefined && p.score >= 0.4,
            );
            const currentCount = persons.length;
            setPeopleCount(currentCount);

            const now = performance.now();
            const windowMs = 10_000;
            const history = historyRef.current;
            history.push({ count: currentCount, t: now });
            while (history.length && now - history[0].t > windowMs) {
              history.shift();
            }

            if (now - lastEstimateUpdateRef.current > 400) {
              lastEstimateUpdateRef.current = now;
              let median: number;
              if (history.length) {
                const counts = history.map((h) => h.count).sort((a, b) => a - b);
                const mid = Math.floor(counts.length / 2);
                median =
                  counts.length % 2 === 0
                    ? Math.round((counts[mid - 1] + counts[mid]) / 2)
                    : counts[mid];
              } else {
                median = currentCount;
              }
              setEstimatedCount(median);

              const maxRef = maxEstimatedCountRef.current;
              const lastMax = lastMaxIncreaseRef.current;
              if (median > maxRef) {
                maxEstimatedCountRef.current = median;
                lastMaxIncreaseRef.current = now;
                setMaxEstimatedCount(median);
              } else if (now - lastMax > SWEEP_RESET_MS) {
                maxEstimatedCountRef.current = median;
                lastMaxIncreaseRef.current = now;
                setMaxEstimatedCount(median);
              }
            }

            ctx.lineWidth = 2;
            ctx.font = "14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

            persons.forEach((person) => {
              const [x, y, width, height] = person.bbox;
              ctx.strokeStyle = "#22c55e";
              ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
              ctx.fillRect(x, y, width, height);
              ctx.strokeRect(x, y, width, height);

              const label = `${(person.score ?? 0 * 100).toFixed(0)}% pessoa`;
              const labelX = x;
              const labelY = y > 20 ? y - 6 : y + 18;

              ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
              ctx.fillRect(labelX, labelY - 16, ctx.measureText(label).width + 10, 18);

              ctx.fillStyle = "#e5e7eb";
              ctx.fillText(label, labelX + 5, labelY - 3);
            });
          } catch (err) {
            console.error(err);
          }

          animationFrameId = requestAnimationFrame(detectFrame);
        };

        detectFrame();
      } catch (err) {
        console.error(err);
        setStatus("error");
        setError(
          err instanceof Error
            ? err.message
            : "Falha ao iniciar câmera ou detecção.",
        );
      }
    }

    setupCamera();

    return () => {
      isCancelled = true;

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      const video = videoRef.current;
      if (video && video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [faceMode]);

  const statusLabel =
    status === "idle"
      ? "Inativo"
      : status === "loading"
        ? "Carregando…"
        : status === "running"
          ? "Ao vivo"
          : "Erro";

  const peopleLabel = estimatedCount === 1 ? "pessoa" : "pessoas";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-row gap-0">
      {/* Câmera ocupa a maior parte da tela; resize/orientationchange força re-render */}
      <div className="relative min-w-0 flex-1 overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="h-full w-full bg-slate-900 object-cover"
        />
      </div>

      {/* Painel do contador ao lado */}
      <aside className="flex w-28 flex-shrink-0 flex-col justify-between border-l border-slate-800/80 bg-slate-950/90 p-3 backdrop-blur sm:w-36 md:w-44 md:p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`h-2 w-2 flex-shrink-0 rounded-full ${
                status === "running"
                  ? "bg-emerald-400"
                  : status === "loading"
                    ? "bg-amber-400 animate-pulse"
                    : status === "error"
                      ? "bg-rose-400"
                      : "bg-slate-500"
              }`}
              title={statusLabel}
            />
            <span className="truncate text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">
              {statusLabel}
            </span>
          </div>

          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-widest text-slate-500 md:text-[0.65rem]">
              Estimativa
            </p>
            <p className="mt-0.5 text-3xl font-semibold tabular-nums text-emerald-400 sm:text-4xl md:text-5xl">
              {estimatedCount}
            </p>
            <p className="text-[0.65rem] text-slate-400">{peopleLabel}</p>
          </div>

          <div className="border-t border-slate-800/80 pt-2">
            <p className="text-[0.55rem] uppercase tracking-wider text-slate-500 md:text-[0.6rem]">
              Máx. varredura
            </p>
            <p className="mt-0.5 text-xl font-medium tabular-nums text-slate-300 md:text-2xl">
              {maxEstimatedCount}
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-2">
            <p className="text-[0.55rem] uppercase tracking-wider text-slate-500 md:text-[0.6rem]">
              Frame atual
            </p>
            <p className="mt-0.5 text-lg font-medium tabular-nums text-slate-400 md:text-xl">
              {peopleCount}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={() =>
              setFaceMode((prev) =>
                prev === "environment" ? "user" : "environment",
              )
            }
            className="w-full rounded-lg bg-slate-800/80 py-1.5 text-[0.65rem] font-medium text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-700/80 md:text-[0.7rem]"
          >
            {faceMode === "environment" ? "Traseira" : "Frontal"}
          </button>
        </div>
      </aside>

      {status === "error" && error && (
        <p className="fixed bottom-4 left-4 right-28 max-w-md rounded-lg bg-rose-950/90 px-3 py-2 text-xs text-rose-200 ring-1 ring-rose-800 sm:right-36 md:right-44">
          {error}. Permita o acesso à câmera e use uma conexão segura (https).
        </p>
      )}
    </div>
  );
}
