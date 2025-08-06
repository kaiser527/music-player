import BackToPreviousIcon from "@/components/share/BackToPreviousIcon";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import { callRegister } from "@/services/api";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const inputColor = "rgba(255, 255, 255, 0.75)";

const RegisterScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const usernameInputRef = useRef<TextInput>(null);

  const handleReset = () => {
    emailRef.current = "";
    passwordRef.current = "";
    usernameRef.current = "";
    emailInputRef.current?.clear();
    passwordInputRef.current?.clear();
    usernameInputRef.current?.clear();
  };

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      showMessage({
        message: "Error occurred",
        description: "All fields are required",
        type: "danger",
      });
      return;
    }
    setIsLoading(true);
    const res = await callRegister({
      email: emailRef.current,
      password: passwordRef.current,
      username: usernameRef.current,
    });
    setIsLoading(false);
    if (res?.result) {
      handleReset();
      router.push({
        pathname: "/(drawer)/auth/verify",
        params: { email: res.result.email, isForgot: 0 },
      });
      showMessage({
        message: "Registration successful",
        description: "Please check your email to get activation code",
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

  return (
    <SafeAreaView style={styles.container}>
      <BackToPreviousIcon />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Don't Have Account,</Text>
          <Text style={styles.title}>Create One</Text>
        </View>
        <Text style={styles.subtitle}>Register to get started</Text>
        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={26} color={inputColor} />
            <TextInput
              ref={usernameInputRef}
              placeholder="Enter your username"
              placeholderTextColor={colors.minimumTrackTintColor}
              style={styles.input}
              onChangeText={(text) => (usernameRef.current = text)}
            />
          </View>
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
            onPress={() => handleRegister()}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.signupWrapper,
            pressed && styles.forgotPasswordPressed,
          ]}
          onPress={() => router.push("/(drawer)/auth/login")}
        >
          <Text style={styles.forgotPassword}>
            Already have an account? Login
          </Text>
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
    fontWeight: "700",
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
    fontWeight: "700",
    fontSize: fontSize.base - 2,
  },
  loginButtonPressed: {
    backgroundColor: "#d93238",
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
  },
});

export default RegisterScreen;
