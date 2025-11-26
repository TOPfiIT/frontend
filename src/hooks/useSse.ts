import { useEffect, useState } from "react";
// import { useAppSelector } from './store';
import { API_URL } from "../config";
import { fetchEventSource } from "@microsoft/fetch-event-source";

type TSseMessage = {
  event: "list" | "create" | "update" | "remove";
  episode?: Chat;
  episodes?: Chat[];
};

const useSse = (method: string) => {
  // const token = useAppSelector(store => store.auth.token);
  const [message, setMessage] = useState<TSseMessage | null>(null);
  const API_URL = "http://localhost:8087";

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      await fetchEventSource(`${API_URL}/${method}`, {
        // headers: {
        // 	'Authorization': `Bearer ${token}`,
        // },
        onmessage(event: any) {
          try {
            const parsedData = JSON.parse(event.data);
            setMessage(parsedData as TSseMessage);
          } catch (error) {
            console.error("useSse parsing error");
          }
        },
        signal,
      });
    };

    fetchData();
    return () => controller.abort();
  }, [method]); // [method, token]

  return message;
};
