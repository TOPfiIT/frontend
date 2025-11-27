import { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export default function useSse(url: string) {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setMessage("");
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
                // Пробуем распарсить JSON
                try {
                  const parsedData = JSON.parse(event.data);
                  console.log("📝 Parsed JSON data:", parsedData);

                  if (parsedData.type == "message_chunk") {
                    setMessage((prev) => prev + parsedData.content);
                  }

                  // Обрабатываем все возможные поля
                  // if (parsedData.content) {
                  //   setMessage((prev) => prev + parsedData.content);
                  // } else if (parsedData.message) {
                  //   setMessage((prev) => prev + parsedData.message);
                  // } else if (parsedData.text) {
                  //   setMessage((prev) => prev + parsedData.text);
                  // } else if (typeof parsedData === "string") {
                  //   setMessage((prev) => prev + parsedData);
                  // } else {
                  //   // Если объект без понятных полей
                  //   const text = JSON.stringify(parsedData, null, 2);
                  //   setMessage((prev) => prev + text);
                  // }
                } catch (jsonError) {
                  // Если не JSON - используем как plain text
                  console.log("📝 Plain text data:", event.data);
                  setMessage((prev) => prev + event.data + "\n");
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
            throw err;
          },
        });
      } catch (error) {
        console.error("💥 Failed to establish SSE connection:", error);
        setError(`Failed to connect: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      console.log("🧹 Cleaning up SSE connection");
      controller.abort();
      setIsLoading(false);
    };
  }, [url]);

  return { message, isLoading, error };
}
