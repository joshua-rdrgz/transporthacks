'use client';

import { useEffect } from 'react';

interface ErrorStateProps {
  error: Error;
}

export default function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Uh oh, something went wrong</div>;
}
