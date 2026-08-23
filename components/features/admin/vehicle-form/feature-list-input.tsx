"use client";

import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleFormValues } from "@/lib/validation/vehicle";

export function FeatureListInput({
  control,
  errors,
  register,
}: {
  control: Control<VehicleFormValues>;
  errors: FieldErrors<VehicleFormValues>;
  register: UseFormRegister<VehicleFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "features" });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="e.g. Sunroof, Reverse camera, Cruise control"
              className="h-9 w-full rounded-sm border border-line bg-paper px-3 text-sm text-ink placeholder:text-ink-faint"
              {...register(`features.${index}.value` as const)}
            />
            {errors.features?.[index]?.value?.message && (
              <p className="mt-1 text-xs text-danger">
                {errors.features[index]?.value?.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            aria-label="Remove feature"
            className="mt-0.5 rounded-sm p-1.5 text-ink-faint hover:bg-danger-tint hover:text-danger disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      {typeof errors.features?.message === "string" && (
        <p className="text-xs text-danger">{errors.features.message}</p>
      )}

      <Button type="button" variant="secondary" size="sm" onClick={() => append({ value: "" })}>
        <Plus className="h-4 w-4" />
        Add feature
      </Button>
    </div>
  );
}
