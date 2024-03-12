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
      path: 'verify-citizen',
      parse: {
        id: (id: string) => Number(id),
      },
    },
    VOTE_STACK: {
      initialRouteName: 'MAIN_PAGE',
      screens: {
        DETAIL_SCREEN: 'evote/detail',
      },
    },
    QUESTION_ANSWER_STACK: {
      initialRouteName: 'MAIN_SCREEN',
      screens: {
        DETAIL_SCREEN: 'faq/detail',
      },
    },
    FEEDBACK_STACK: {
      initialRouteName: 'FeedBackScreen',
      screens: {
        FeedBackScreen: 'feedback/detail',
        ChatFeedbackScreen: 'feedback/comment',
      },
    },
    NOTIFICATION_STACK: {
      initialRouteName: 'MAIN_SCREEN',
      screens: {
        LIST_COMMENT_SCREEN: 'notification/comment',
      },
    },
    NOTIFICATION: 'noti',
    LOCAL_SERVICE_MANAGEMENT_STACK: {
      screens: {
        DETAIL_ORDER_SCREEN: 'digital-service-order/detail',
      },
    },
  },
};

export const linking: LinkingOptions<AppStackParamsList> = {
  prefixes: ['yooioc://app/'],
  config: config,
};
