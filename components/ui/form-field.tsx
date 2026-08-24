import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

export function FormField({
  label,
  id,
  error,
  hint,
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          "mt-1.5 h-10 w-full rounded-sm border bg-paper px-3 text-sm text-ink placeholder:text-ink-faint",
          error ? "border-danger" : "border-line focus-visible:border-ink",
          "disabled:cursor-not-allowed disabled:bg-ink/5 disabled:text-ink-faint",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormTextarea({
  label,
  id,
  error,
  hint,
  className,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          "mt-1.5 w-full rounded-sm border bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-faint",
          error ? "border-danger" : "border-line focus-visible:border-ink",
          "disabled:cursor-not-allowed disabled:bg-ink/5 disabled:text-ink-faint",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface FormSelectProps extends BaseProps {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function FormSelect({
  label,
  id,
  error,
  hint,
  options,
  placeholder,
  className,
  ...props
}: FormSelectProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          "mt-1.5 h-10 w-full rounded-sm border bg-paper px-3 text-sm text-ink",
          error ? "border-danger" : "border-line focus-visible:border-ink",
          "disabled:cursor-not-allowed disabled:bg-ink/5 disabled:text-ink-faint",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
