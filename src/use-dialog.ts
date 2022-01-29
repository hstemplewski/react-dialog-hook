import { useCallback, useRef, useState } from "react";

interface UseDialogConfig {
  isDefaultOpen?: boolean;
}

export interface UseDialogInterface<Params = unknown, Results = unknown> {
  isOpen: boolean;
  params: Params | null;
  results: Results | null;
  open(params?: Params | null): Promise<UseDialogInterface["results"]>;
  close(results?: UseDialogInterface["results"]): void;
}

export function useDialog<Params = unknown, Results = unknown>(
  config?: UseDialogConfig
): UseDialogInterface<Params, Results> {
  const [isOpen, setIsOpen] = useState<boolean>(!!config?.isDefaultOpen);
  const [params, setParams] = useState<Params | null>(null);
  const [results, setResults] = useState<Results | null>(null);

  const close = useRef<UseDialogInterface<Params, Results>["close"]>(() => {
    throw new Error("Trying to close dialog without opening it");
  });

  const open = useCallback((params: Params | null = null) => {
    setIsOpen(true);
    setParams(params);

    return new Promise((resolve) => {
      close.current = (results: UseDialogInterface<Params, Results>["results"] = null) => {
        setIsOpen(false);
        setResults(results);
        setParams(null);
        resolve(results);
      };
    });
  }, []);

  return {
    isOpen,
    params,
    results,
    open,
    close: close.current,
  };
}
