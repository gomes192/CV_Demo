"use client";

import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

type DetectionStatus = "idle" | "loading" | "running" | "error";

export function PeopleCounter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<DetectionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [faceMode, setFaceMode] = useState<"user" | "environment">(
    "environment",
  );

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

            const predictions = await model.detect(canvas, undefined, 0.5);
            const persons = predictions.filter(
              (p) => p.class === "person" && p.score !== undefined && p.score > 0.6,
            );
            setPeopleCount(persons.length);

            ctx.lineWidth = 2;
            ctx.font = "14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

            persons.forEach((person) => {
              const [x, y, width, height] = person.bbox;
              ctx.strokeStyle = "#22c55e";
              ctx.fillStyle = "rgba(34, 197, 94, 0.15)";
              ctx.fillRect(x, y, width, height);
              ctx.strokeRect(x, y, width, height);

              const label = `${(person.score ?? 0 * 100).toFixed(0)}% person`;
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
            : "Failed to start camera or detection.",
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
      ? "Idle"
      : status === "loading"
        ? "Loading model & camera…"
        : status === "running"
          ? "Counting people in real time"
          : "Error";

  return (
    <div className="flex h-full flex-col gap-6 lg:flex-row">
      <section className="flex flex-1 flex-col justify-between rounded-3xl bg-slate-900/60 p-6 ring-1 ring-slate-800/80 backdrop-blur">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Room People Counter
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Uses on-device computer vision to estimate how many people are in
              front of your camera.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                status === "running"
                  ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40"
                  : status === "loading"
                    ? "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40"
                    : status === "error"
                      ? "bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/40"
                      : "bg-slate-700/60 text-slate-300 ring-1 ring-slate-600/70"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === "running"
                    ? "bg-emerald-400"
                    : status === "loading"
                      ? "bg-amber-400"
                      : status === "error"
                        ? "bg-rose-400"
                        : "bg-slate-400"
                }`}
              />
              {statusLabel}
            </span>
            <button
              type="button"
              onClick={() =>
                setFaceMode((prev) =>
                  prev === "environment" ? "user" : "environment",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700 transition hover:bg-slate-700/80 hover:ring-slate-500/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {faceMode === "environment" ? "Rear camera" : "Front camera"}
            </button>
          </div>
        </header>

        <div className="mt-4 flex flex-1 flex-col gap-4 lg:flex-row">
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-slate-900/80">
            <video
              ref={videoRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="h-[280px] w-full bg-slate-900 object-cover sm:h-[360px] lg:h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />
          </div>

          <aside className="flex w-full flex-col justify-between gap-4 rounded-2xl bg-slate-950/60 p-4 ring-1 ring-slate-800/80 lg:w-72">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Live Count
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-6xl font-semibold tabular-nums text-emerald-400 sm:text-7xl">
                  {peopleCount}
                </span>
                <span className="mb-2 text-sm text-slate-400">
                  {peopleCount === 1 ? "person" : "people"}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                This is an estimate based on visible people in the camera
                frame. Good lighting and clear visibility improve accuracy.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <p className="font-medium text-slate-300">Tips for best results</p>
              <ul className="space-y-1.5">
                <li>• Point the camera so most people are fully visible.</li>
                <li>• Avoid strong backlight or very dark scenes.</li>
                <li>• Works entirely in your browser, no video is uploaded.</li>
              </ul>
            </div>
          </aside>
        </div>

        {status === "error" && error && (
          <p className="mt-3 text-xs text-rose-300">
            Camera or model error: {error}. Check that you granted camera
            access and are using a secure (https) connection.
          </p>
        )}
      </section>

      <section className="flex w-full flex-col justify-between gap-4 rounded-3xl bg-slate-900/40 p-6 ring-1 ring-slate-800/80 backdrop-blur lg:w-80">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            About this demo
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            This project runs a lightweight TensorFlow.js model
            (<code className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[0.7rem] text-emerald-300">
              coco-ssd
            </code>
            ) directly in your browser to detect people in the frame, then
            visualizes them with bounding boxes.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-400">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Designed for
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Desktop & mobile browsers (Chrome, Edge, Safari) with camera
              access.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Privacy
            </p>
            <p className="mt-1 text-sm text-slate-300">
              All computation happens on-device. Video never leaves your
              browser.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-3 text-xs text-slate-400">
          <p className="font-medium text-slate-300">
            Deploying to Vercel
          </p>
          <ol className="mt-1 list-decimal space-y-0.5 pl-4">
            <li>Push this folder to a Git repo.</li>
            <li>Import into Vercel as a Next.js app.</li>
            <li>Set build command to <code>npm run build</code> and output to <code>.next</code> (defaults).</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

