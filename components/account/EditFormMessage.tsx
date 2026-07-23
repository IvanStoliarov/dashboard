"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { useEditForm } from "./accountEditFormContext";

export default function EditFormMessage() {
  const { message, success } = useEditForm();

  if (!message) return null;

  const Icon = success ? CheckCircleIcon : ExclamationCircleIcon;

  return (
    <p
      role={success ? "status" : "alert"}
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm leading-5 ${
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}
