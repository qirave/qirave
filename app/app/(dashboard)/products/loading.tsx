'use client';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-muted-foreground">Server Loading...</p>
    </div>
  );
}
