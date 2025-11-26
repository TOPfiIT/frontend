// hooks/useClipboardMonitor.tsx
"use client";
import { useEffect, useRef } from "react";

type EventRecord = {
  id: string; // hash
  type: "copy" | "cut" | "paste";
  source: "internal" | "external" | "unknown";
  length: number;
  snippet: string;
  timestamp: string; // ISO
  target?: string; // CSS selector or element tag info
};

type InternalEntry = {
  id: string;
  textLength: number;
  firstSeen: string;
  lastSeen: string;
  count: number;
  snippet: string;
};

export function useClipboardMonitor(opts?: {
  minLengthToRecord?: number; // оставляем опцию, но по умолчанию 0 (нет ограничения)
  onEvent?: (rec: EventRecord) => void;
}) {
  // теперь по умолчанию 0 — никакой минимальной длины нет
  const minLengthToRecord = opts?.minLengthToRecord ?? 0;
  const onEvent = opts?.onEvent;

  const internalHistory = useRef<Map<string, InternalEntry>>(new Map());
  const timeline = useRef<EventRecord[]>([]);
  const violations = useRef<EventRecord[]>([]);

  const totals = useRef({
    totalCopies: 0,
    totalCuts: 0,
    totalPastes: 0,
    internalPastes: 0,
    externalPastes: 0,
  });

  // FNV-1a (sync) — как раньше
  function fnv1aHash(str: string) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ("00000000" + (h >>> 0).toString(16)).slice(-8);
  }

  // Нормализация: приводим переводы строки к LF, заменяем табы на пробел,
  // обрезаем ведущие/концевые пробелы, и *сворачиваем подряд идущие пустые строки в одну*.
  function normalizeTextForComparison(text: string) {
    if (text === null || text === undefined) return "";
    // unify line endings
    let t = text.replace(/\r\n?/g, "\n");
    // replace tabs with single space
    t = t.replace(/\t/g, " ");
    // remove trailing spaces on each line
    t = t.split("\n").map((ln) => ln.replace(/[ \u00A0]+$/g, "")).join("\n");
    // collapse multiple blank lines into single blank line
    // (blank line = line that contains only whitespace)
    t = t.replace(/\n{2,}/g, "\n");
    // trim leading/trailing whitespace/newlines
    t = t.trim();
    return t;
  }

  function snippetOf(text: string, len = 120) {
    const clean = text.replace(/\s+/g, " ");
    return clean.length <= len ? clean : clean.slice(0, len) + "…";
  }

  function makeRecord(args: {
    type: EventRecord["type"];
    source: EventRecord["source"];
    text: string;
    target?: EventRecord["target"];
  }): EventRecord {
    // Для хеша и идентификации используем нормализованный текст
    const normalized = normalizeTextForComparison(args.text);
    const id = fnv1aHash(normalized);
    return {
      id,
      type: args.type,
      source: args.source,
      length: args.text.length,
      snippet: snippetOf(args.text),
      timestamp: new Date().toISOString(),
      target: args.target,
    };
  }

  function pushRecord(rec: EventRecord) {
    timeline.current.push(rec);
    try {
      onEvent?.(rec);
    } catch (err) {
      // ignore onEvent errors
    }
  }

  function recordInternalCopy(text: string, target?: string) {
    // принимаем любые строки (включая короткие)
    const normalized = normalizeTextForComparison(text);

    // если после нормализации пусто — всё равно заводим запись (но можем пропустить, если хочешь)
    // здесь сохраняем мета (snippet + длина оригинального текста)
    const id = fnv1aHash(normalized);
    const now = new Date().toISOString();
    const existing = internalHistory.current.get(id);

    if (existing) {
      existing.count += 1;
      existing.lastSeen = now;
    } else {
      internalHistory.current.set(id, {
        id,
        textLength: text.length,
        firstSeen: now,
        lastSeen: now,
        count: 1,
        snippet: snippetOf(text),
      });
    }

    totals.current.totalCopies += 1;

    const rec = makeRecord({
      type: "copy",
      source: "internal",
      text,
      target,
    });
    pushRecord(rec);
  }

  function handleCopyCut(e: ClipboardEvent) {
    try {
      const selection = window.getSelection()?.toString() ?? "";
      const fromClipboard = e.clipboardData?.getData("text/plain") ?? "";
      const text = selection || fromClipboard;
      const target = (e.target && (e.target as Element).tagName) || undefined;

      if (text !== undefined && text !== null) {
        // не фильтруем по длине
        recordInternalCopy(text, target);
      }
    } catch (err) {
      // ignore
    }
  }

  function handlePaste(e: ClipboardEvent) {
    try {
      totals.current.totalPastes += 1;

      const pasted = e.clipboardData?.getData("text/plain") ?? "";
      const target =
        (e.target && (e.target as Element).tagName) ||
        undefined;

      // Нормализуем pasted для сравнения
      const normalizedPasted = normalizeTextForComparison(pasted);
      const id = fnv1aHash(normalizedPasted);

      // Смотрим internalHistory по нормализованному id
      const isInternal = internalHistory.current.has(id);

      const source: EventRecord["source"] = isInternal
        ? "internal"
        : "external";

      if (source === "internal") totals.current.internalPastes += 1;
      else totals.current.externalPastes += 1;

      const rec = makeRecord({
        type: "paste",
        source,
        text: pasted,
        target,
      });

      pushRecord(rec);

      if (!isInternal) {
        violations.current.push(rec);

        // Если на странице есть глобальная функция показа тоста — вызываем её
        try {
          // безопасный optional call — host-страница может определить эту функцию
          // Передаём стиль прямо в вызове (оранжевый фон, синий бордер, белый текст).
          // Формат объекта стилевого аргумента — свободный; компонент, реализующий window.__showCheatToast
          // должен учитывать эти поля.
          // Пример: window.__showCheatToast(message, { style: { background, border, color }, durationMs })
          // Здесь message — текст уведомления.
          // Если window.__showCheatToast отсутствует — просто пропускаем.
          // tslint:disable-next-line: no-any
          const win = (window as any);
          if (typeof win?.__showCheatToast === "function") {
            win.__showCheatToast(`Подозрительная внешняя вставка (${rec.length} символов)`, {
              durationMs: 3000,
              style: {
                background: "#FF8C00", // оранжевый фон
                border: "2px solid #0000FF", // синий бордер
                color: "#FFFFFF", // белый текст
              },
            });
          }
        } catch {}
      }
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => {
    document.addEventListener("copy", handleCopyCut);
    document.addEventListener("cut", handleCopyCut);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopyCut);
      document.removeEventListener("cut", handleCopyCut);
      document.removeEventListener("paste", handlePaste);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMetrics() {
    return {
      meta: {
        startedAt: timeline.current.length
          ? timeline.current[0].timestamp
          : null,
        collectedAt: new Date().toISOString(),
      },
      totals: totals.current,
      internalHistory: Array.from(internalHistory.current.values()),
      timeline: timeline.current.slice(),
      violations: violations.current.slice(),
    };
  }

  async function sendMetrics(url: string, extraHeaders?: Record<string, string>) {
    const payload = getMetrics();
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(extraHeaders ?? {}),
        },
        body: JSON.stringify(payload),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  }

  function markInternalCopy(text: string, target?: string) {
    recordInternalCopy(text, target);
  }

  return {
    getMetrics,
    sendMetrics,
    markInternalCopy,
    _internalHistoryRef: internalHistory,
    _timelineRef: timeline,
    _violationsRef: violations,
  };
}