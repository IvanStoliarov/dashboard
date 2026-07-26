import type { ReactNode } from "react";

type AssignedTicketsCardVariant = "default" | "danger" | "warning";

function AssignedTicketsCard({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: AssignedTicketsCardVariant;
}) {
  const variantClasses = {
    default:
      "border-zinc-200 bg-white hover:border-zinc-300 focus-within:border-blue-300",
    danger:
      "border-red-200 bg-red-50/70 hover:border-red-300 focus-within:border-red-400",
    warning:
      "border-amber-200 bg-amber-50/70 hover:border-amber-300 focus-within:border-amber-400",
  };

  return (
    <article
      data-variant={variant}
      className={`group/card flex min-h-36 flex-col rounded-xl border p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md ${variantClasses[variant]}`}
    >
      {children}
    </article>
  );
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500 group-data-[variant=danger]/card:text-red-700 group-data-[variant=warning]/card:text-amber-700">
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
