import { PanelForm } from "../create-new-panel/components/panel-form/panel-form";

export function UpdatePanelPage({ params: { panelId } }: { params: { panelId: string } }) {
  return <PanelForm panelId={panelId} />;
}
