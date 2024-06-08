import { ForgotPassword } from './../../../screens/forgot-password/index';
import type { AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = { Email: string; Password: string };

type Buyer = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  UserTypeID: number;
  PhoneNumber: string;
  additionalInfo: {
    HouseID: number;
  };
};

type Manager = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  UserTypeID: number;
  PhoneNumber: string;
};

type Contractor = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  UserTypeID: number;
  PhoneNumber: string;
  additionalInfo: {
    BusinessName: string;
    BusinessAddress: string;
    W9Url: string;
    EIN: string;
    BusinessInsuranceUrl: string;
    ContractorTypeID: number;
  };
};

type ForgotPassword = { Email: string };

type ChangePassword = { currentPassword: string; newPassword: string };

type Variables2 = void;

type Response = any;

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'auth/login',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useChangePassword = createMutation<Response, ChangePassword, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'auth/change-password',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useRegisterBuyer = createMutation<Response, Buyer, AxiosError>({
  mutationFn: async (variables) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
    };

    return NetWorkService.Post({
      url: 'users/register',
      body: variables,
      headers: headers,
      timeout: 200000,
      // @ts-ignore
    }).then((response) => response?.data);
  },
});

export const useRegisterManager = createMutation<Response, Manager, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'users/register',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useRegisterContractor = createMutation<Response, Contractor, AxiosError>({
  mutationFn: async (variables) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
    };

    return NetWorkService.Post({
      url: 'users/register',
      body: variables,
      headers: headers,
      timeout: 200000,
      // @ts-ignore
    }).then((response) => response?.data);
  },
});

export const useContractorTypes = createQuery<Response, Variables2, AxiosError>({
  primaryKey: 'contractortypes',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useCommunities = createQuery<Response, Variables2, AxiosError>({
  primaryKey: 'communities',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useHouses = createQuery<Response, Variables2, AxiosError>({
  primaryKey: 'houses',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useForgotPassword = createMutation<Response, ForgotPassword, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'auth/forgot-password',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
