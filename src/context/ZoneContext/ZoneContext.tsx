'use client';
import React, { createContext, ReactNode, useState } from 'react';
import { Zone } from '@/models/RequestArea';

interface PropTypes {
  children?: ReactNode;
}

interface ZoneContextType {
  zone: Zone;
  changeZone: (zone: Zone) => void;
}

const initialZone: ZoneContextType = {
  zone: { Id: 1 } as Zone,
  changeZone: (zone: Zone) => {},
};

export const ZoneContext = createContext<ZoneContextType>(initialZone);

export const ZoneProvider = (props: PropTypes) => {
  const [zone, setZone] = useState(initialZone.zone);

  const changeZone = (zone: Zone) => {
    setZone(zone);
  };

  return <ZoneContext.Provider value={{ zone, changeZone }}>{props.children}</ZoneContext.Provider>;
};
