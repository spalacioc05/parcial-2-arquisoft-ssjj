export function Footer() {
  const integrantes = [
    "Santiago Palacio Cárdenas",
    "Sarai Restrepo Rodríguez",
    "Juan Pablo Herrera Jaramillo",
    "Jimena Muñoz Gómez",
  ];
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Integrantes
            </p>
            <ul className="mt-2 grid gap-1 text-sm text-foreground sm:grid-cols-2">
              {integrantes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Universidad de Antioquia · Arquitectura de Software
          </p>
        </div>
      </div>
    </footer>
  );
}
