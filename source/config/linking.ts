import {AppStackParamsList} from '@/routes/app.stack';
import {LinkingOptions, PathConfigMap} from '@react-navigation/native';

const config: {
  initialRouteName?: keyof AppStackParamsList | undefined;
  screens: PathConfigMap<AppStackParamsList>;
} = {
  screens: {
    METER_STACK: {
      initialRouteName: 'MAIN_SCREEN',
      screens: {
        READ_INDEX: {
          path: 'app/meter',
          parse: {
            id: (id: string) => Number(id),
          },
        },
      },
    },
    WORK_MANAGEMENT: {
      initialRouteName: 'MAIN_DRAWER',
      screens: {
        DETAIL_WORK: {
          path: 'work/detail',
          parse: {
            id: (id: string) => Number(id),
            tenantId: (tenantId: string) => Number(tenantId),
          },
        },
      },
    },
    MATERIAL_ASSET_STACK: {
      screens: {
        DETAIL_TAB: {
          path: 'asset/detail',
        },
      },
    },
    RESIDENT_STACK: {
      path: 'citizen',
      parse: {
        id: (id: string) => Number(id),
      },
    },
  },
};

export const linking: LinkingOptions<AppStackParamsList> = {
  prefixes: ['yooioc://'],
  config: config,
};
