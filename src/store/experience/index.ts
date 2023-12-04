import { create } from 'zustand';

interface ExperienceState {
  selectedCompany: string;
  selectedLocation: any;
  setSelectedCompany: (data: any) => void;
  setSelectedLocation: (data: any) => void;
}

export const useExperience = create<ExperienceState>((set) => ({
  selectedCompany: '',
  selectedLocation: '',

  setSelectedCompany: (data: string) => {
    set({ selectedCompany: data });
  },
  setSelectedLocation: (data: string) => {
    set({ selectedLocation: data });
  },
}));

export const setSelectedCompany = (data) => {
  return useExperience.getState().setSelectedCompany(data);
};

export const setSelectedLocation = (data) => {
  return useExperience.getState().setSelectedLocation(data);
};
