import type { Ticket } from "./types";

interface TicketPriorityConfig {
  label: string;
  badgeClassName: string;
  dotClassName: string;
}

type TicketPriorityDefinition = TicketPriorityConfig & {
  value: Ticket["priority"];
};

export const TICKET_PRIORITIES = [
  {
    value: "low",
    label: "Low priority",
    badgeClassName: "bg-zinc-100 text-zinc-700",
    dotClassName: "bg-zinc-500",
  },
  {
    value: "medium",
    label: "Medium priority",
    badgeClassName: "bg-blue-50 text-blue-700",
    dotClassName: "bg-blue-500",
  },
  {
    value: "high",
    label: "High priority",
    badgeClassName: "bg-amber-50 text-amber-700",
    dotClassName: "bg-amber-500",
  },
  {
    value: "urgent",
    label: "Urgent",
    badgeClassName: "bg-red-50 text-red-700",
    dotClassName: "bg-red-500",
  },
] as const satisfies readonly TicketPriorityDefinition[];

export type TicketPriority = (typeof TICKET_PRIORITIES)[number]["value"];

type MissingDatabasePriority = Exclude<Ticket["priority"], TicketPriority>;
type UnexpectedPriority = Exclude<TicketPriority, Ticket["priority"]>;
type AssertNever<T extends never> = T;

export type TicketPriorityDatabaseParity = [
  AssertNever<MissingDatabasePriority>,
  AssertNever<UnexpectedPriority>,
];

export const TICKET_PRIORITY_VALUES =
  TICKET_PRIORITIES.map(({ value }) => value) as [
    TicketPriority,
    ...TicketPriority[],
  ];

export const TICKET_PRIORITY_CONFIG = Object.fromEntries(
  TICKET_PRIORITIES.map(({ value, ...config }) => [value, config]),
) as Record<TicketPriority, TicketPriorityConfig>;
