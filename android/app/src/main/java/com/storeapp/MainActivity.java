package com.storeapp;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle; // here
import android.util.Log;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  private void createNotificationChannel() {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      String id = getString(R.string.default_notification_channel_id);
      String name = getString(R.string.channel_name);
      String description = getString(R.string.channel_description);
      Log.d("ReactNative", "MEAPP: Creating channel: " + id +", name: " + name + ", description: " + description + " .");
      int importance = NotificationManager.IMPORTANCE_MAX;
      NotificationChannel channel = new NotificationChannel(id, name, importance);
      channel.setDescription(description);
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      if (notificationManager != null) {
        notificationManager.createNotificationChannel(channel);
      }
    }
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "StoreApp";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    this.createNotificationChannel();
    super.onCreate(savedInstanceState);
  }
}
