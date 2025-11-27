import { useEffect, useState, useRef } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

interface SseOptions {
  onMessage?: (data: any) => void;
  onError?: (error: any) => void;
}

export default function useSse(url: string | null, options: SseOptions = {}) {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageRef = useRef<string>("");

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    if (!url) return;

    setMessage("");
    messageRef.current = "";
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        console.log("Starting SSE connection to:", url);

        await fetchEventSource(url, {
          method: "GET",
          signal,
          credentials: "include",
          onopen: async (response) => {
            console.log("SSE connection opened, status:", response.status);
            if (response.ok) {
              console.log("✅ SSE connection established successfully");
              setError(null);
            } else {
              console.error("❌ SSE connection failed:", response.status);
              throw new Error(`SSE connection failed: ${response.status}`);
            }
          },
          onmessage: (event) => {
            console.log("📨 SSE raw event received:", {
              data: event.data,
              id: event.id,
            });

            try {
              if (event.data) {
                const parsedData = JSON.parse(event.data);
                console.log("📝 Parsed JSON data:", parsedData);

                // Обрабатываем только message_chunk
                if (parsedData.type === "message_chunk" && parsedData.content) {
                  const newMessage = messageRef.current + parsedData.content;
                  setMessage(newMessage);

                  // Вызываем кастомный обработчик если есть
                  if (options.onMessage) {
                    options.onMessage(parsedData);
                  }
                }
              }
            } catch (error) {
              console.error("💥 SSE message processing error:", error);
            }
          },
          onclose: () => {
            console.log("🔚 SSE connection closed");
            setIsLoading(false);
          },
          onerror: (err) => {
            console.error("💥 SSE connection error:", err);
            setError(`Connection error: ${err.message}`);
            setIsLoading(false);
            if (options.onError) options.onError(err);
            throw err;
          },
        });
      } catch (error) {
        console.error("💥 Failed to establish SSE connection:", error);
        setError(`Failed to connect: ${error}`);
        setIsLoading(false);
        if (options.onError) options.onError(error);
      }
    };

    fetchData();

    return () => {
      console.log("🧹 Cleaning up SSE connection");
      controller.abort();
      setIsLoading(false);
    };
  }, [url]);

  const clearMessage = () => {
    setMessage("");
    messageRef.current = "";
  };

  return { message, isLoading, error, clearMessage };
}
