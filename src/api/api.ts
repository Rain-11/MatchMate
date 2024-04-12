import instance from '../utils/axios';
import type { CurrentUser } from '@/models/Models';
import {
  BasicResponse,
  CreateTeam,
  ExitTeamRequest,
  JoinTeam,
  LoginForm,
  PageRequest,
  PageVoListTeamVo,
  QueryTeam,
  QueryUserByTag,
  TagVo,
  TeamDto,
} from './type';
import qs from 'qs';

export const getUserListByTag = (params: QueryUserByTag) => {
  return instance.get<any, BasicResponse<PageVoListTeamVo>>(`/user-api/user/search/tagList`, {
    params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};
export const updateUserInfoById = (data: CurrentUser) => {
  return instance.post<any, BasicResponse<void>>('/user-api/user/update', data);
};

export const login = (data: LoginForm) => {
  return instance.post<any, BasicResponse<CurrentUser>>('/user-api/user/login', data);
};

export const getCurrentUser = () => {
  return instance.get<any, BasicResponse<CurrentUser>>('/user-api/user/current');
};

export const getUserRecommendations = (params: PageRequest) => {
  return instance.get<any, BasicResponse<PageVoListTeamVo>>('/user-api/user/userRecommendations', {
    params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};

export const createTeam = (data: CreateTeam) => {
  return instance.post<any, BasicResponse<number>>('/user-api/team/create', data);
};

export const queryTeam = (data: QueryTeam) => {
  return instance.post<any, BasicResponse<PageVoListTeamVo>>('/user-api/team/query', data);
};

export const logOut = () => {
  return instance.post<any, BasicResponse<void>>('/user-api/user/logout');
};

export const updateTeam = (data: TeamDto) => {
  return instance.put<any, BasicResponse<boolean>>('/user-api/team/update', data);
};
export const exitTeam = (data: ExitTeamRequest) => {
  return instance.post<any, BasicResponse<void>>(
    '/user-api/team/exitTeam',
    {},
    {
      params: data,
    }
  );
};

export const dissolveTeam = (data: ExitTeamRequest) => {
  return instance.post<any, BasicResponse<void>>(
    '/user-api/team/dissolveTeam',
    {},
    {
      params: data,
    }
  );
};

export const joinTeam = (data: JoinTeam) => {
  return instance.post<any, BasicResponse<boolean>>('/user-api/team/joinTeam', data);
};

export const getTags = () => {
  return instance.get<any, BasicResponse<TagVo[]>>('/user-api/tag/getTags');
};
