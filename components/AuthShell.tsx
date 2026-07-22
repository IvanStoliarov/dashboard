import Link from "next/link";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-9">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-950"
        >
          Dashboard
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-zinc-950">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
        {children}
      </div>
    </main>
  );
}
