import { GroupForm } from "../create-new-group/components/group-form/group-form";

export function UpdateGroupPage({ params: { groupId } }: { params: { groupId: string } }) {
  return <GroupForm groupId={groupId} />;
}
