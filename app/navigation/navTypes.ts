import type {
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';

import {AppRoute} from 'navRoutes';
import {GroupDetailRouterProps} from 'screens/GroupDetail';
import {PostCreateRouterProps} from 'screens/PostCreate';
import {PostDetailRouterProps} from 'screens/PostDetail';

export type BottomTabRoutes = {
  [AppRoute.HOME_STACK_NAVIGATOR]: undefined;
  [AppRoute.PROFILE_STACK_NAVIGATOR]: undefined;
};

type HomeStackParams = {
  [AppRoute.HOME]: undefined;
  GroupDetail: GroupDetailRouterProps;
  GroupsAll: undefined;
  PostCreate: PostCreateRouterProps;
  PostDetail: PostDetailRouterProps;
};

export type AuthenticationRoutes = {
  [AppRoute.LOGIN]: undefined;
  [AppRoute.SIGN_UP]: undefined;
  [AppRoute.SIGN_IN_CONFIRM_CODE]: undefined;
  [AppRoute.FORGOT_PASSWORD]: undefined;
  [AppRoute.CHANGE_PASSWORD]: undefined;
  [AppRoute.PHONE_INPUT]: undefined;
  [AppRoute.SIGN_IN_CONFIRM_CODE]: undefined;
  [AppRoute.WELCOME]: undefined;
  [AppRoute.PASSWORD_CHANGED]: undefined;
  [AppRoute.ENTER_LOCATION]: undefined;
};

export interface MainBottomNavigatorProps<
  RouteName extends keyof HomeStackParams
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeStackParams, RouteName>,
    BottomTabNavigationProp<BottomTabRoutes, AppRoute.HOME_STACK_NAVIGATOR>
  >;
  route: RouteProp<HomeStackParams, RouteName>;
}

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    BottomTabNavigationProp<BottomTabRoutes, AppRoute.HOME_STACK_NAVIGATOR>
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}
