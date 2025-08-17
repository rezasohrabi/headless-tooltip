import { version } from 'react';

export function getReactMajorVersion(): number {
  const reactVersion = version?.split('.')[0];
  return parseInt(reactVersion || '0', 10);
}
