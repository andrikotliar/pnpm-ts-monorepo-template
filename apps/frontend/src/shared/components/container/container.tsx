import type { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-5xl mx-auto px-5">{children}</div>;
};
