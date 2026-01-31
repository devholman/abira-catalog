"use client";

export const dynamic = "force-dynamic";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-8'>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
