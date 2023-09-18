import React, { useEffect } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shopify/restyle";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppFonts } from "@/hooks";
import { NavigationContainer, Root } from "@/navigation";
import { theme } from "@/theme";
import { APIProvider } from "@/services/api/api-provider";
import FlashMessage from "react-native-flash-message";
import { getToken, removeToken } from "@/storage";
import { login } from "@/store/auth";

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
      }
    });
  }, [appFontsLoaded]);

  if (!appFontsLoaded) return;

  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <APIProvider>
            <BottomSheetModalProvider>
              <Root />
              <FlashMessage position="bottom" />
            </BottomSheetModalProvider>
          </APIProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
