'use client';

import { useState } from 'react';
import type { Member } from '../types';
import { updateMemberRole, removeMember } from '../actions/members.actions';

export const useManageMember = () => {
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const handleUpdateRole = async (memberId: string, role: string) => {
    const result = await updateMemberRole(memberId, role);
    if (result.success) {
      setEditingMember(null);
    }
    return result;
  };

  const handleRemove = async (memberIdOrEmail: string) => {
    const result = await removeMember(memberIdOrEmail);
    return result;
  };

  return {
    editingMember,
    setEditingMember,
    handleUpdateRole,
    handleRemove,
  };
};
