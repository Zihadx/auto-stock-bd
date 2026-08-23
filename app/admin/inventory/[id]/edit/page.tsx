export default async function EditVehiclePage({
  params,
}: PageProps<"/admin/inventory/[id]/edit">) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h1 className="font-display text-2xl">Edit vehicle</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Full editing form for vehicle {id} arrives in Milestone 10.
      </p>
    </div>
  );
}
