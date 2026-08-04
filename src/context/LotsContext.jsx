"use client";
import { createContext, useContext } from "react";

/**
 * Каталог лотов приходит с сервера (lib/lots.js) и раздаётся
 * компонентам через контекст — вместо глобальной переменной.
 */
const LotsContext = createContext([]);

export function LotsProvider({ lots = [], children }) {
  return <LotsContext.Provider value={lots}>{children}</LotsContext.Provider>;
}

export function useLots() {
  return useContext(LotsContext);
}
