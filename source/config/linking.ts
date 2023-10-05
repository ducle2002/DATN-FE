import {AppStackParamsList} from '@/routes/app.stack';
import {LinkingOptions, PathConfigMap} from '@react-navigation/native';

const config: {
  initialRouteName?: keyof AppStackParamsList | undefined;
  screens: PathConfigMap<AppStackParamsList>;
} = {
  screens: {
    OPERATING_STACK: {
      screens: {
        WATER_BILL: {
          screens: {
            ADD_WATER_BILL: {
              path: 'water-bill/add',
              parse: {
                id: (id: string) => Number(id),
                image: (image: string) => JSON.parse(image),
              },
            },
          },
        },
      },
    },
  },
};

export const linking: LinkingOptions<AppStackParamsList> = {
  prefixes: ['yooioc://'],
  config: config,
};
