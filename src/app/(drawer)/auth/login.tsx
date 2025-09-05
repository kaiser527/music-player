import BackToPreviousIcon from "@/components/share/BackToPreviousIcon";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import { inputValidator } from "@/helpers/validator";
import { useAppDispatch } from "@/redux/hooks";
import { setUserLoginInfo } from "@/redux/slice/AccountSlice";
import { callLogin, callResendCode } from "@/services/api";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const inputColor = "rgba(255, 255, 255, 0.75)";

const LoginScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  const handleReset = () => {
    emailRef.current = "";
    passwordRef.current = "";
    emailInputRef.current?.clear();
    passwordInputRef.current?.clear();
  };

  const handleLogin = async () => {
    const validateFields = [
      { ref: emailRef, name: "email" },
      { ref: passwordRef, name: "password" },
    ];
    const { isValid, output } = inputValidator(validateFields);
    if (!isValid) {
      showMessage({
        message: "Error occurred",
        description: `${output} is not allowed to be empty`,
        type: "danger",
      });
      return;
    }
    setIsLoading(true);
    const res = await callLogin({
      email: emailRef.current,
      password: passwordRef.current,
    });
    setIsLoading(false);
    if (res?.result) {
      await AsyncStorage.multiSet([
        ["access_token", res.result.access_token],
        ["refresh_token", res.result.refresh_token],
      ]);
      dispatch(setUserLoginInfo(res.result.user));
      handleReset();
      router.push("/");
      showMessage({
        message: "Login success",
        type: "success",
      });
    } else {
      showMessage({
        message: "Error occurred",
        description: res.message,
        type: "danger",
      });
    }
  };

  const handleNavigateForgotPassword = async () => {
    if (emailRef.current) {
      setIsSending(true);
      const res = await callResendCode({
        email: emailRef.current,
        codeId: "",
        isForgot: true,
      });
      setIsSending(false);
      if (res?.code == 1000) {
        showMessage({
          message: "Error occurred",
          description: "Verify code is sent to your email",
          type: "success",
        });
        router.push({
          pathname: "/(drawer)/auth/verify",
          params: { email: emailRef.current, isForgot: 1 },
        });
      } else {
        showMessage({
          message: "Error occurred",
          description: res.message,
          type: "danger",
        });
      }
    } else
      showMessage({
        message: "Error occurred",
        description: "You must enter your email first",
        type: "danger",
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackToPreviousIcon />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hey,</Text>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
        <Text style={styles.subtitle}>
          Login to create your own song and playlist
        </Text>
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={26} color={inputColor} />
            <TextInput
              ref={emailInputRef}
              placeholder="Enter your email"
              placeholderTextColor={colors.minimumTrackTintColor}
              style={styles.input}
              onChangeText={(text) => (emailRef.current = text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={26} color={inputColor} />
            <TextInput
              ref={passwordInputRef}
              placeholder="Enter your password"
              placeholderTextColor={colors.minimumTrackTintColor}
              style={styles.input}
              secureTextEntry={!showPassword}
              onChangeText={(text) => (passwordRef.current = text)}
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color={inputColor}
              />
            </Pressable>
          </View>
        </View>
        {isSending ? (
          <View style={styles.forgotPasswordLoading}>
            <LoadingSpinner />
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.forgotPasswordWrapper,
              pressed && styles.forgotPasswordPressed,
            ]}
            onPress={handleNavigateForgotPassword}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
        )}
        {isLoading ? (
          <View style={styles.loginButton}>
            <LoadingSpinner />
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            onPress={() => handleLogin()}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.signupWrapper,
            pressed && styles.forgotPasswordPressed,
          ]}
          onPress={() => router.push("/(drawer)/auth/register")}
        >
          <Text style={styles.forgotPassword}>Don't have account? Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#141414",
    flex: 1,
  },
  signupWrapper: {
    marginTop: 24,
    alignSelf: "center",
  },
  forgotPasswordWrapper: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },
  forgotPasswordPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },
  main: {
    paddingTop: 50,
  },
  titleContainer: {
    marginBottom: 23,
  },
  title: {
    fontSize: fontSize.lg + 3,
    color: colors.text,
    fontWeight: 700,
  },
  subtitle: {
    color: inputColor,
    fontSize: fontSize.sm - 1.5,
    marginBottom: 12,
  },
  inputGroup: {
    gap: 12,
    marginBottom: 18,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: inputColor,
    borderWidth: 1,
    borderRadius: 17,
    height: 52,
    marginTop: 8,
    paddingHorizontal: 15,
  },
  input: {
    height: "100%",
    color: colors.text,
    marginLeft: 6,
    flex: 1,
  },
  forgotPassword: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 17,
    height: 52,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: 700,
    fontSize: fontSize.base - 2,
  },
  loginButtonPressed: {
    backgroundColor: "#d93238",
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
  },
  forgotPasswordLoading: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },
});

export default LoginScreen;
