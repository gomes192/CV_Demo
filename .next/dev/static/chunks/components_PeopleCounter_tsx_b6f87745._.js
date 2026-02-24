(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PeopleCounter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PeopleCounter",
    ()=>PeopleCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tensorflow$2d$models$2f$coco$2d$ssd$2f$dist$2f$coco$2d$ssd$2e$es2017$2e$esm$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tensorflow-models/coco-ssd/dist/coco-ssd.es2017.esm.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tensorflow$2f$tfjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tensorflow/tfjs/dist/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PeopleCounter() {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const historyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastEstimateUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const maxEstimatedCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastMaxIncreaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const SWEEP_RESET_MS = 45_000;
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [peopleCount, setPeopleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [estimatedCount, setEstimatedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [maxEstimatedCount, setMaxEstimatedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [faceMode, setFaceMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("environment");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PeopleCounter.useEffect": ()=>{
            let model = null;
            let animationFrameId = null;
            let isCancelled = false;
            async function setupCamera() {
                try {
                    setStatus("loading");
                    const video = videoRef.current;
                    const canvas = canvasRef.current;
                    if (!video || !canvas) return;
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: {
                                ideal: faceMode
                            },
                            width: {
                                ideal: 1280
                            },
                            height: {
                                ideal: 720
                            }
                        },
                        audio: false
                    });
                    video.srcObject = stream;
                    await video.play();
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    model = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tensorflow$2d$models$2f$coco$2d$ssd$2f$dist$2f$coco$2d$ssd$2e$es2017$2e$esm$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["load"]({
                        base: "lite_mobilenet_v2"
                    });
                    if (isCancelled) {
                        stream.getTracks().forEach({
                            "PeopleCounter.useEffect.setupCamera": (t)=>t.stop()
                        }["PeopleCounter.useEffect.setupCamera"]);
                        return;
                    }
                    setStatus("running");
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    const detectFrame = {
                        "PeopleCounter.useEffect.setupCamera.detectFrame": async ()=>{
                            if (!video || !model || video.readyState !== 4) {
                                animationFrameId = requestAnimationFrame(detectFrame);
                                return;
                            }
                            try {
                                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                const predictions = await model.detect(canvas, 40, 0.35);
                                const persons = predictions.filter({
                                    "PeopleCounter.useEffect.setupCamera.detectFrame.persons": (p)=>p.class === "person" && p.score !== undefined && p.score >= 0.4
                                }["PeopleCounter.useEffect.setupCamera.detectFrame.persons"]);
                                const currentCount = persons.length;
                                setPeopleCount(currentCount);
                                const now = performance.now();
                                const windowMs = 10_000;
                                const history = historyRef.current;
                                history.push({
                                    count: currentCount,
                                    t: now
                                });
                                while(history.length && now - history[0].t > windowMs){
                                    history.shift();
                                }
                                if (now - lastEstimateUpdateRef.current > 400) {
                                    lastEstimateUpdateRef.current = now;
                                    let median;
                                    if (history.length) {
                                        const counts = history.map({
                                            "PeopleCounter.useEffect.setupCamera.detectFrame.counts": (h)=>h.count
                                        }["PeopleCounter.useEffect.setupCamera.detectFrame.counts"]).sort({
                                            "PeopleCounter.useEffect.setupCamera.detectFrame.counts": (a, b)=>a - b
                                        }["PeopleCounter.useEffect.setupCamera.detectFrame.counts"]);
                                        const mid = Math.floor(counts.length / 2);
                                        median = counts.length % 2 === 0 ? Math.round((counts[mid - 1] + counts[mid]) / 2) : counts[mid];
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
                                persons.forEach({
                                    "PeopleCounter.useEffect.setupCamera.detectFrame": (person)=>{
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
                                    }
                                }["PeopleCounter.useEffect.setupCamera.detectFrame"]);
                            } catch (err) {
                                console.error(err);
                            }
                            animationFrameId = requestAnimationFrame(detectFrame);
                        }
                    }["PeopleCounter.useEffect.setupCamera.detectFrame"];
                    detectFrame();
                } catch (err) {
                    console.error(err);
                    setStatus("error");
                    setError(err instanceof Error ? err.message : "Falha ao iniciar câmera ou detecção.");
                }
            }
            setupCamera();
            return ({
                "PeopleCounter.useEffect": ()=>{
                    isCancelled = true;
                    if (animationFrameId !== null) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    const video = videoRef.current;
                    if (video && video.srcObject instanceof MediaStream) {
                        video.srcObject.getTracks().forEach({
                            "PeopleCounter.useEffect": (t)=>t.stop()
                        }["PeopleCounter.useEffect"]);
                    }
                }
            })["PeopleCounter.useEffect"];
        }
    }["PeopleCounter.useEffect"], [
        faceMode
    ]);
    const statusLabel = status === "idle" ? "Inativo" : status === "loading" ? "Carregando…" : status === "running" ? "Ao vivo" : "Erro";
    const peopleLabel = estimatedCount === 1 ? "pessoa" : "pessoas";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full min-h-0 flex-1 flex-row gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative min-w-0 flex-1 overflow-hidden bg-slate-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0",
                        playsInline: true,
                        muted: true
                    }, void 0, false, {
                        fileName: "[project]/components/PeopleCounter.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        className: "h-full w-full bg-slate-900 object-cover"
                    }, void 0, false, {
                        fileName: "[project]/components/PeopleCounter.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PeopleCounter.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "flex w-28 flex-shrink-0 flex-col justify-between border-l border-slate-800/80 bg-slate-950/90 p-3 backdrop-blur sm:w-36 md:w-44 md:p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `h-2 w-2 flex-shrink-0 rounded-full ${status === "running" ? "bg-emerald-400" : status === "loading" ? "bg-amber-400 animate-pulse" : status === "error" ? "bg-rose-400" : "bg-slate-500"}`,
                                        title: statusLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-[0.65rem] font-medium uppercase tracking-wider text-slate-500",
                                        children: statusLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PeopleCounter.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.6rem] font-medium uppercase tracking-widest text-slate-500 md:text-[0.65rem]",
                                        children: "Estimativa"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-3xl font-semibold tabular-nums text-emerald-400 sm:text-4xl md:text-5xl",
                                        children: estimatedCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.65rem] text-slate-400",
                                        children: peopleLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PeopleCounter.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-800/80 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.55rem] uppercase tracking-wider text-slate-500 md:text-[0.6rem]",
                                        children: "Máx. varredura"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-xl font-medium tabular-nums text-slate-300 md:text-2xl",
                                        children: maxEstimatedCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PeopleCounter.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-800/80 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.55rem] uppercase tracking-wider text-slate-500 md:text-[0.6rem]",
                                        children: "Frame atual"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-lg font-medium tabular-nums text-slate-400 md:text-xl",
                                        children: peopleCount
                                    }, void 0, false, {
                                        fileName: "[project]/components/PeopleCounter.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PeopleCounter.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PeopleCounter.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto pt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setFaceMode((prev)=>prev === "environment" ? "user" : "environment"),
                            className: "w-full rounded-lg bg-slate-800/80 py-1.5 text-[0.65rem] font-medium text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-700/80 md:text-[0.7rem]",
                            children: faceMode === "environment" ? "Traseira" : "Frontal"
                        }, void 0, false, {
                            fileName: "[project]/components/PeopleCounter.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PeopleCounter.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PeopleCounter.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            status === "error" && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "fixed bottom-4 left-4 right-28 max-w-md rounded-lg bg-rose-950/90 px-3 py-2 text-xs text-rose-200 ring-1 ring-rose-800 sm:right-36 md:right-44",
                children: [
                    error,
                    ". Permita o acesso à câmera e use uma conexão segura (https)."
                ]
            }, void 0, true, {
                fileName: "[project]/components/PeopleCounter.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PeopleCounter.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
_s(PeopleCounter, "GmHxOgQHf63o4XsPhS3s+hZOZDE=");
_c = PeopleCounter;
var _c;
__turbopack_context__.k.register(_c, "PeopleCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_PeopleCounter_tsx_b6f87745._.js.map