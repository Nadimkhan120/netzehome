import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';
import { getAuthToken } from '@/store/auth';

type UpdateSkills = { unique_id: number; skills: number[] };
type UpdateExperience = {
  unique_id: number;
  from_date: string;
  to_date: string;
  company_name: string;
  job_category_id: string;
  description: string;
  employee_type: string;
  location: string;
  job_title: string;
  is_current: string;
  company_description: string;
};

type UpdateProfile = any;

type Response = any;

export const useUpdateSkills = createMutation<Response, UpdateSkills, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'person/update-skills',
      body: {
        unique_id: variables?.unique_id,
        skills: variables?.skills,
      },
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useUpdateExperience = createMutation<Response, UpdateExperience, AxiosError>(
  {
    mutationFn: async (variables) => {
      return NetWorkService.Post({
        url: 'person/update-work-experience',
        body: variables,
        // @ts-ignore
      }).then((response) => response?.data);
    },
  }
);

export const useUpdatePicture = createMutation<Response, UpdateProfile, AxiosError>({
  mutationFn: async (variables) => {
    const token = getAuthToken();

    let headers = {
      'Content-Type': 'multipart/form-data',
      authorization: 'Bearer ' + token ?? '',
    };

    return NetWorkService.Post({
      url: 'applicant/profiles/update/file',
      body: variables,
      headers: headers,
      transformRequest: (data) => {
        return data;
      },
      // @ts-ignore
    }).then((response) => response?.data);
  },
});
