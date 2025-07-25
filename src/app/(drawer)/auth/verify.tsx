import BackToHomeIcon from "@/components/share/BackToHomeIcon";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import {
  callResendCode,
  callResetPassword,
  callVerifyCode,
} from "@/services/api";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const inputColor = "rgba(255, 255, 255, 0.75)";

const VerifyScreen = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const isForgot = +params.isForgot;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const codeRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const inputCodeRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const handleReset = () => {
    codeRef.current = "";
    passwordRef.current = "";
    confirmPasswordRef.current = "";
    inputCodeRef.current?.clear();
    inputPasswordRef.current?.clear();
    inputConfirmPasswordRef.current?.clear();
  };

  const handleConfirm = async () => {
    if (
      isForgot == 1
        ? !codeRef.current ||
          !passwordRef.current ||
          !confirmPasswordRef.current
        : !codeRef.current
    ) {
      showMessage({
        message: "Error occurred",
        description:
          isForgot == 1 ? "All field must be filled" : "Code must be not empty",
        type: "danger",
      });
      return;
    }
    const res = isForgot
      ? await callResetPassword({
          email: params.email as string,
          codeId: codeRef.current,
          password: passwordRef.current,
          confirmPassword: confirmPasswordRef.current,
        })
      : await callVerifyCode({
          email: params.email as string,
          codeId: codeRef.current,
          isForgot: false,
        });
    if (res.result) {
      router.replace("/(drawer)/auth/login");
      handleReset();
      showMessage({
        message:
          isForgot == 1
            ? "Reset password successfully"
            : "Account activation successfully",
        description: "Please login to continue",
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

  const handleResend = async () => {
    setIsLoading(true);
    const res = await callResendCode({
      email: params.email as string,
      codeId: codeRef.current,
      isForgot: isForgot == 1,
    });
    setIsLoading(false);
    if (res.code == 1000) {
      showMessage({
        message: "Resend code successfully",
        description: "Please check your email",
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
      <BackToHomeIcon />
      <View style={styles.main}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {isForgot == 1 ? "Reset" : "Activate"}
          </Text>
          <Text style={styles.title}>
            Your {isForgot == 1 ? "Password" : "Account"}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Feather name="key" size={26} color={inputColor} />
            <TextInput
              ref={inputCodeRef}
              style={styles.input}
              placeholder="Enter your verify code"
              placeholderTextColor={colors.minimumTrackTintColor}
              onChangeText={(text) => (codeRef.current = text)}
            />
          </View>
          {isForgot == 1 && (
            <>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock" size={26} color={inputColor} />
                <TextInput
                  ref={inputPasswordRef}
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colors.minimumTrackTintColor}
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
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="lock-outline"
                  size={26}
                  color={inputColor}
                />
                <TextInput
                  ref={inputConfirmPasswordRef}
                  style={styles.input}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.minimumTrackTintColor}
                  onChangeText={(text) => (confirmPasswordRef.current = text)}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={22}
                    color={inputColor}
                  />
                </Pressable>
              </View>
            </>
          )}
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [pressed && styles.textPressed]}
              onPress={handleConfirm}
            >
              <Text style={{ color: inputColor }}>Confirm</Text>
            </Pressable>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Pressable
                style={({ pressed }) => [pressed && styles.textPressed]}
                onPress={handleResend}
              >
                <Text style={{ color: inputColor }}>Resend</Text>
              </Pressable>
            )}
          </View>
        </View>
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
  main: {
    marginTop: 50,
  },
  content: {
    borderWidth: 1,
    borderColor: inputColor,
    borderRadius: 6,
    padding: 25,
  },
  title: {
    fontSize: fontSize.lg + 3,
    color: colors.text,
    fontWeight: 700,
  },
  titleContainer: {
    marginBottom: 23,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: inputColor,
    borderWidth: 1,
    borderRadius: 17,
    height: 52,
    paddingHorizontal: 15,
    marginBottom: 23,
  },
  input: {
    height: "100%",
    color: colors.text,
    marginLeft: 6,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
  },
});

export default VerifyScreen;
