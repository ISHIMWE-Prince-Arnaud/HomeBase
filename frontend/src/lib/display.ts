import type { Household, HouseholdMember } from "@/features/household/api";

export const getMemberById = (
  household: Household | null | undefined,
  id: number | undefined | null
): HouseholdMember | undefined => {
  if (!household || !id) return undefined;
  return household.members.find((m) => m.id === Number(id));
};

export const getDisplayName = (
  member: Pick<HouseholdMember, "name"> | undefined
): string => {
  return member?.name || "Former Member";
};

export const getAvatarUrl = (
  member: Pick<HouseholdMember, "profileImage"> | undefined
): string | undefined => {
  return member?.profileImage;
};
