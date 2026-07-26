import type { ReactNode } from "react";

function AssignedTicketsCard({ children }: { children: ReactNode }) {
  return (
    <article className="group mt-4 flex min-h-36 flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-within:border-blue-300 focus-within:shadow-md">
      {children}
    </article>
  );
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
      {children}
    </h3>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="mt-auto pt-6">{children}</div>;
};

AssignedTicketsCard.Title = Title;
AssignedTicketsCard.Content = Content;

export default AssignedTicketsCard;
