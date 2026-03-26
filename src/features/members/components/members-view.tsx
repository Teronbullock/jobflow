'use client';

import { useAddMember, useFetchMembers, useManageMember } from '../hooks';
import { AddMemberModal } from './add-member-modal';
import { EditMemberModal } from './edit-member-modal';

interface MembersViewProps {
  orgId: string;
}

export function MembersView({ orgId }: MembersViewProps) {
  const { members, isPending } = useFetchMembers({ orgId });
  const { editingMember, setEditingMember, handleUpdateRole, handleRemove } =
    useManageMember();

  const { addModalOpen, setAddModalOpen, handleInvite } = useAddMember({
    orgId,
  });

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-foreground'>Members</h1>
          <button
            type='button'
            onClick={() => setAddModalOpen(true)}
            className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'
          >
            Add member
          </button>
        </div>

        {isPending ? (
          <p className='text-muted-foreground'>Loading…</p>
        ) : members.length === 0 ? (
          <p className='text-muted-foreground'>
            No members yet. Invite someone to get started.
          </p>
        ) : (
          <div className='overflow-hidden rounded-lg border border-border'>
            <table className='w-full text-left text-sm'>
              <thead className='border-b border-border bg-muted/50'>
                <tr>
                  <th className='px-4 py-3 font-medium text-foreground'>
                    Name
                  </th>
                  <th className='px-4 py-3 font-medium text-foreground'>
                    Email
                  </th>
                  <th className='px-4 py-3 font-medium text-foreground'>
                    Role
                  </th>
                  <th className='px-4 py-3 font-medium text-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {members.map(member => (
                  <tr key={member.id} className='bg-card'>
                    <td className='px-4 py-3 text-foreground'>
                      {member.user.name}
                    </td>
                    <td className='px-4 py-3 text-muted-foreground'>
                      {member.user.email}
                    </td>
                    <td className='px-4 py-3 capitalize text-foreground'>
                      {member.role}
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => setEditingMember(member)}
                          className='text-primary hover:underline'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => {
                            if (
                              confirm(
                                `Remove ${member.user.name} from the organization?`,
                              )
                            ) {
                              handleRemove(member.id);
                            }
                          }}
                          className='text-destructive hover:underline'
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {addModalOpen && (
        <AddMemberModal
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleInvite}
        />
      )}

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSubmit={handleUpdateRole}
        />
      )}
    </>
  );
}
