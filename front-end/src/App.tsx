import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ApiRequirementsPanel } from "@/components/technical/ApiRequirementsPanel";
import { ArchitectureInfoPanel } from "@/components/technical/ArchitectureInfoPanel";
import { HateoasLinksPanel } from "@/components/technical/HateoasLinksPanel";
import { EmployeeProjectSearch } from "@/components/projects/EmployeeProjectSearch";
import { ProjectCreateForm } from "@/components/projects/ProjectCreateForm";
import { getHealth } from "@/services/api";
import type { HateoasLinks } from "@/types/api.types";

export default function App() {
  const [backendStatus, setBackendStatus] = useState<"checking" | "up" | "down">(
    "checking",
  );
  const [links, setLinks] = useState<HateoasLinks | undefined>();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getHealth();
      if (!mounted) return;
      setBackendStatus(res.ok ? "up" : "down");
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppLayout backendStatus={backendStatus}>
      <ApiRequirementsPanel />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <EmployeeProjectSearch onLinksReceived={setLinks} />
          <ProjectCreateForm onLinksReceived={setLinks} />
        </div>
        <div className="space-y-6">
          <ArchitectureInfoPanel onClear={() => setLinks(undefined)} />
          <HateoasLinksPanel links={links} />
        </div>
      </div>
    </AppLayout>
  );
}
