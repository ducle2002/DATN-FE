import {TPermission} from 'types/type';

export const genCode = (length: number, head: string) => {
  let result = head ?? 'TS.';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

function getIntersection<T>(array1: T[], array2: T[]): T[] {
  const intersection: T[] = [];

  for (const element of array1) {
    if (array2.includes(element)) {
      intersection.push(element);
    }
  }

  return intersection;
}
export const checkPermission = (
  grantedPermissions: TPermission[],
  permissions?: TPermission[],
) => {
  if (permissions?.length === 0) {
    return true;
  }
  return getIntersection(grantedPermissions, permissions || []).length > 0;
};
