import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import MuiButton from '@mui/material/Button';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<any> {
  type?: 'link' | 'button';
  href: string;
  children: ReactNode;
}
export default function Link({ type, href, children, ...props }: Props) {
  if (type === 'link' || !type) {
    return (
      <NextLink href={href} passHref>
        <MuiLink {...props}>{children}</MuiLink>
      </NextLink>
    );
  } else if (type === 'button') {
    return (
      <NextLink href={href} passHref className='w-full'>
        <MuiButton {...props}>{children}</MuiButton>
      </NextLink>
    );
  }
}
