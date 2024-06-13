import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

import { AppOverlayLoader } from '@/components/overlay';
import { useAppFonts } from '@/hooks';
import { NavigationContainer, Root } from '@/navigation';
import { APIProvider } from '@/services/api/api-provider';
import { getToken } from '@/storage';
import { login } from '@/store/auth';
import { theme } from '@/theme';

GoogleSignin.configure({
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  webClientId: '353398465240-ji9uf84r9gjlqrk1ucgf8t2f5c545bi2.apps.googleusercontent.com',
});

const App = () => {
  const appFontsLoaded = useAppFonts();

  const appInit = async () => {
    let token = getToken();

    if (token) {
      login(token);
    }
  };

  useEffect(() => {
    appInit().finally(async () => {
      if (appFontsLoaded) {
        await BootSplash.hide({ fade: true });
      }
    });
  }, [appFontsLoaded]);

  if (!appFontsLoaded) return;

  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <KeyboardProvider>
        <ThemeProvider theme={theme}>
          <ActionSheetProvider>
            <NavigationContainer>
              <APIProvider>
                <BottomSheetModalProvider>
                  <Root />
                  <AppOverlayLoader />
                  <Toast position="top" />
                  <FlashMessage position="bottom" />
                </BottomSheetModalProvider>
              </APIProvider>
            </NavigationContainer>
          </ActionSheetProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
