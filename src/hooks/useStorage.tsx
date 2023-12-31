'use client';

import { useCallback, useState, useEffect } from "react"
import { isClientSide } from "../utils/isClientSide";

export function useLocalStorage(key:string, defaultValue?: any) {
  const [value, setValue] = useState(() => {

    if (isClientSide) {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue) return JSON.parse(jsonValue)
    }
   
    return defaultValue
  })

  useEffect(() => {
    if (value === undefined) return window?.localStorage.removeItem(key)
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}