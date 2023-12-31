import { useEffect } from 'react';
import { Signal } from '../models/Signals';

function createSignal<T>(eventName: Signal) {
  const subscribe = (handler: (args: T) => void) => {
    const listerFunction = (event: CustomEventInit) => handler(event.detail);
    document.addEventListener(eventName, listerFunction, { passive: true });

    return () => {
      document.removeEventListener(eventName, listerFunction);
    };
  };

  const publish = (args?: T) => {
    let nativeEvent = new CustomEvent(eventName, {
      detail: args,
    });

    document.dispatchEvent(nativeEvent);
  };

  return {
    subscribe,
    publish,
  };
}

//Subscribes to a signal (aka event)
export function useSignal<T>(signalName: Signal, handler: (args: T) => void) {
  const signal = createSignal<T>(signalName);
  useEffect(() => signal.subscribe(handler), [handler, signal]);
}

//Publishes a signal 
export function emitSignal<T>(signalName: Signal, args?: T) {
  const signal = createSignal<T>(signalName);
  signal.publish(args);
}
