package com.netzehomes;
import expo.modules.ReactActivityDelegateWrapper;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

@Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme); // ⬅️ initialize the splash screen
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "NetZe Homes";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()));
  }
}
