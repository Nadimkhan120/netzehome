import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import {
  AddPaymentCard,
  AddRole,
  AddUser,
  ChangePassword,
  CompanyDetail,
  EditCompany,
  JdLibrary,
  JdLibraryDetail,
  JobDescription,
  JobPosted,
  LoginAndSecurity,
  MyAccount,
  MyPayments,
  PaymentMethods,
  Payments,
  PersonalInformation,
  Postjob,
  PostJobDetail,
  PostJobPayment,
  PostJobPreview,
  Roles,
  Users,
  UserSettings,
  RecruitmentProcess,
  AddProcess,
  Steps,
  AddStep,
  AddCompany,
  MyContacts,
  MyJobs,
  MyCompanies,
  Search,
  EditProfile,
  AddProfile,
  MyJobDetail,
  ChatList,
  Chats,
  AddEducation,
  AddExperience,
  ChooseCompany,
  ChooseSkills,
  ChooseDegree,
  Notifications,
  Profile,
  ChooseLocation,
  ChooseDegreeField,
  ChooseSchool,
  NewJobDetails,
  NewCompanyDetails,
} from '@/screens';
import Applicants from '@/screens/applicants';
import CandidateProfile from '@/screens/candidate-profile';
import { Job } from '@/screens/job';
import JobDetail from '@/screens/job-detail';
import { TabNavigator } from './tab-navigator';
import { SearchResults } from '@/screens/search-results';
import {
  getDeviceToken,
  requestNotificationPermission,
  useInAppNotification,
} from '@/services/notification';

export type AppStackParamList = {
  TabNavigator: undefined;
  Details: { id: number };
  Job: { id: string };
  NewJobDetails: { id: string };
  NewCompanyDetails: { id: any };
  Payments: undefined;
  Applicants: { id: any };
  jobDetail: { id: null };
  CandidateProfile: { data: any };
  PaymentMethods: undefined;
  MyPayments: undefined;
  AddPaymentCard: undefined;
  Postjob: undefined;
  PostJobDetail: undefined;
  PostJobPreview: undefined;
  PostJobPayment: undefined;
  JobPosted: undefined;
  JdLibrary: undefined;
  JdLibraryDetail: undefined;
  MyAccount: undefined;
  ChangePassword: undefined;
  PersonalInformation: undefined;
  LoginAndSecurity: undefined;
  CompanyDetail: undefined;
  EditCompany: { data: any };
  UserSettings: undefined;
  Users: undefined;
  AddUser: undefined;
  Roles: undefined;
  AddRole: undefined;
  JobDescription: undefined;
  RecruitmentProcess: undefined;
  AddProcess: undefined;
  Steps: { id: number };
  AddStep: { processId: number; stepsCount: number };
  AddCompany: undefined;
  MyContacts: undefined;
  MyJobs: undefined;
  MyCompanies: undefined;
  Search: undefined;
  EditProfile: { user: any };
  AddProfile: undefined;
  MyJobDetail: { data: any };
  ChatList: undefined;
  AddEducation: { id: any };
  AddExperience: { id: any };
  ChooseCompany: undefined;
  ChooseSkills: { id: any };
  ChooseDegree: undefined;
  Notifications: undefined;
  Profile: { id: number };
  ChooseLocation: { from: any };
  ChooseDegreeField: undefined;
  ChooseSchool: undefined;
  Chats: { person_id?: any; chat_id: any; profile_pic: any; name: any };
  SearchResults: { searchKeyword: any };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

async function onDisplayNotification(remoteNotification) {
  // Request permissions (required for iOS)
  await notifee.requestPermission({
    criticalAlert: true,
  });

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'order',
    name: 'order',
    importance: AndroidImportance.HIGH,
    sound: 'sound',
    vibration: true,
    vibrationPattern: [300, 500],
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteNotification?.data.title,
    body: remoteNotification?.data.body,
    android: {
      channelId,
      vibrationPattern: [300, 500],
      //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: '100',
      },
    },

    ios: {
      critical: true,
      sound: 'default',
    },
  });
}

export const AppNavigator = () => {
  // send fcm token to backend
  const getFcmToken = async () => {
    let permissionEnabled = requestNotificationPermission();

    if (permissionEnabled) {
      let token = await getDeviceToken();

      console.log('token', token);
    }
  };

  React.useEffect(() => {
    getFcmToken();
  }, []);

  // in app notifications
  useInAppNotification(async (remoteNotification) => {
    onDisplayNotification(remoteNotification);
  });

  // Subscribe to events
  React.useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Job" component={Job} />
        <Stack.Screen name="jobDetail" component={JobDetail} />
        <Stack.Screen name="Applicants" component={Applicants} />
        <Stack.Screen name="CandidateProfile" component={CandidateProfile} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="AddPaymentCard" component={AddPaymentCard} />
        <Stack.Screen name="MyPayments" component={MyPayments} />
        <Stack.Screen name="Postjob" component={Postjob} />
        <Stack.Screen name="PostJobDetail" component={PostJobDetail} />
        <Stack.Screen name="PostJobPayment" component={PostJobPayment} />
        <Stack.Screen name="PostJobPreview" component={PostJobPreview} />
        <Stack.Screen name="JobPosted" component={JobPosted} />
        <Stack.Screen name="JdLibrary" component={JdLibrary} />
        <Stack.Screen name="JdLibraryDetail" component={JdLibraryDetail} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
        <Stack.Screen name="LoginAndSecurity" component={LoginAndSecurity} />
        <Stack.Screen name="CompanyDetail" component={CompanyDetail} />
        <Stack.Screen name="EditCompany" component={EditCompany} />
        <Stack.Screen name="UserSettings" component={UserSettings} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Roles" component={Roles} />
        <Stack.Screen name="AddRole" component={AddRole} />
        <Stack.Screen name="JobDescription" component={JobDescription} />
        <Stack.Screen name="RecruitmentProcess" component={RecruitmentProcess} />
        <Stack.Screen name="AddProcess" component={AddProcess} />
        <Stack.Screen name="Steps" component={Steps} />
        <Stack.Screen name="AddStep" component={AddStep} />
        <Stack.Screen name="AddCompany" component={AddCompany} />

        <Stack.Screen name="MyContacts" component={MyContacts} />
        <Stack.Screen name="MyCompanies" component={MyCompanies} />
        <Stack.Screen name="MyJobs" component={MyJobs} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="AddProfile" component={AddProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="MyJobDetail" component={MyJobDetail} />

        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="AddEducation" component={AddEducation} />
        <Stack.Screen name="AddExperience" component={AddExperience} />
        <Stack.Screen name="ChooseCompany" component={ChooseCompany} />
        <Stack.Screen name="ChooseDegree" component={ChooseDegree} />
        <Stack.Screen name="ChooseSkills" component={ChooseSkills} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="ChooseDegreeField" component={ChooseDegreeField} />
        <Stack.Screen name="ChooseSchool" component={ChooseSchool} />
        <Stack.Screen name="NewJobDetails" component={NewJobDetails} />
        <Stack.Screen name="NewCompanyDetails" component={NewCompanyDetails} />
        <Stack.Screen name="SearchResults" component={SearchResults} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
