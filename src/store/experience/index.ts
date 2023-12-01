import { create } from 'zustand';

interface ExperienceState {
  selectedCompany: string;
  setSelectedCompany: (data: any) => void;
}

export const useExperience = create<ExperienceState>((set) => ({
  selectedCompany: '',

  setSelectedCompany: (data: string) => {
    set({ selectedCompany: data });
  },
}));

export const setSelectedCompany = (data) => {
  return useExperience.getState().setSelectedCompany(data);
};
