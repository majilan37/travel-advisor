import { _debounce, debounce } from "@/utils";
import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

type Cache<T> = { [url: string]: T };
type DebouncedFunction = ReturnType<typeof debounce>;

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
  debounceDelay?: number
): State<T> & { debouncedFunction?: (...args: any[]) => void } {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload, loading: false };
      case "error":
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const fetchData = async () => {
    // Do nothing if the url is not given
    if (!url) return;
    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }

    try {
      const response = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_HEADERS_KEY || "",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
        next: { revalidate: 60 * 60 * 24 * 7 },
        ...options,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      cache.current[url] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  };

  let debouncedFunction: DebouncedFunction = debounce(
    fetchData,
    debounceDelay ?? 3000
  );
  useEffect(() => {
    cancelRequest.current = false;

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state, debouncedFunction };
}

export default useFetch;
