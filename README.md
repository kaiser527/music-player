# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo run:android
   ```

# Important config after install all dependency

node_module/react-native-track-player/android/src/main/java/comdoublesymetry/trackplayer/service/MusicService.kt
at line number 764

# from this

@mainthread
override fun onBind(intent: Intent?): IBinder {
return binder
}

# to this

@mainthread
override fun onBind(intent: Intent): IBinder {
return binder
}

just remove the question maker ? after intent

# extra

in android/gradle.properties
newArchEnabled=false
make this false
