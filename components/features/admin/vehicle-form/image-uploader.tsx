"use client";

import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import type { VehicleFormValues } from "@/lib/validation/vehicle";

export function ImageUploader({
  control,
  errors,
  register,
}: {
  control: Control<VehicleFormValues>;
  errors: FieldErrors<VehicleFormValues>;
  register: UseFormRegister<VehicleFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 rounded-sm border border-line p-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-ink/5">
            {field.url && (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-entered URLs; next/image would require allowlisting every domain up front
              <img src={field.url} alt="" className="h-full w-full object-cover" />
            )}
            {index === 0 && (
              <span className="absolute left-1 top-1 flex items-center gap-0.5 rounded-sm bg-brass px-1.5 py-0.5 text-[10px] font-medium text-paper">
                <Star className="h-2.5 w-2.5" /> Primary
              </span>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <FormField
              id={`images.${index}.url`}
              label="Image URL"
              placeholder="https://..."
              error={errors.images?.[index]?.url?.message}
              {...register(`images.${index}.url` as const)}
            />
            <FormField
              id={`images.${index}.alt`}
              label="Description (alt text)"
              placeholder="e.g. Front three-quarter view"
              error={errors.images?.[index]?.alt?.message}
              {...register(`images.${index}.alt` as const)}
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            aria-label="Remove image"
            className="h-fit rounded-sm p-1.5 text-ink-faint hover:bg-danger-tint hover:text-danger disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      {typeof errors.images?.message === "string" && (
        <p className="text-xs text-danger">{errors.images.message}</p>
      )}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => append({ url: "", alt: "" })}
      >
        <Plus className="h-4 w-4" />
        Add photo
      </Button>
    </div>
  );
}
