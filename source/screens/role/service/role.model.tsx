import Icon from '@/components/icon.component';
import React from 'react';

export enum ERole {
  ADMINISTRATOR = 0,
  OPERATOR = 1,
  SECURITY_GUARD = 2,
  RECEPTIONIST = 3,
}

export type TRole = {
  id: number;
  label: ERole;
  type: ERole;
  Icon?: () => React.JSX.Element;
};

export const role: TRole[] = [
  {
    id: 0,
    type: ERole.ADMINISTRATOR,
    label: ERole.ADMINISTRATOR,
    Icon: () => (
      <Icon
        type="MaterialCommunityIcons"
        name="shield-account"
        size={30}
        color="#091D66"
      />
    ),
  },
  {
    id: 1,
    type: ERole.OPERATOR,
    label: ERole.OPERATOR,
    Icon: () => (
      <Icon
        type="MaterialCommunityIcons"
        name="account-wrench"
        size={30}
        color="#091D66"
      />
    ),
  },
  {
    id: 2,
    type: ERole.SECURITY_GUARD,
    label: ERole.SECURITY_GUARD,
    Icon: () => (
      <Icon
        type="MaterialCommunityIcons"
        name="account-tie-hat"
        size={30}
        color="#091D66"
      />
    ),
  },
  {
    id: 3,
    type: ERole.RECEPTIONIST,
    label: ERole.RECEPTIONIST,
    Icon: () => (
      <Icon
        type="MaterialCommunityIcons"
        name="card-account-phone"
        size={30}
        color="#091D66"
      />
    ),
  },
];
