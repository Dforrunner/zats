import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}
export default function CardContainer({ children, className }: Props) {
  return (
    <div className={'bg-gray-200 rounded p-3 box-border grow ' + className}>
      {children}
    </div>
  );
}
