import BackToPreviousIcon from "@/components/share/BackToPreviousIcon";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { colors, fontSize } from "@/constants/tokens";
import { inputValidator } from "@/helpers/validator";
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
    const validateFields =
      isForgot === 1
        ? [
            { ref: codeRef, name: "code" },
            { ref: passwordRef, name: "password" },
            { ref: confirmPasswordRef, name: "confirm password" },
          ]
        : [{ ref: codeRef, name: "code" }];
    const { isValid, output } = inputValidator(validateFields);
    if (!isValid) {
      showMessage({
        message: "Error occurred",
        description: `${output} is not allowed to be empty`,
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
          isForgot === 1
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
      isForgot: isForgot === 1,
    });
    setIsLoading(false);
    if (res.code === 1000) {
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
      <BackToPreviousIcon />
      <View style={styles.card}>
        <Text style={styles.title}>
          {isForgot === 1 ? "Reset Password" : "Activate Account"}
        </Text>
        <Text style={styles.subtitle}>
          Enter the verification code sent to your email
        </Text>
        <View style={styles.inputWrapper}>
          <Feather name="key" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Verification code"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            onChangeText={(t) => (codeRef.current = t)}
          />
        </View>
        {isForgot === 1 && (
          <>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color={colors.textMuted} />
              <TextInput
                placeholder="New password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={(t) => (passwordRef.current = t)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="lock-outline"
                size={20}
                color={colors.textMuted}
              />
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                onChangeText={(t) => (confirmPasswordRef.current = t)}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={18}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>
          </>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleConfirm}
        >
          <Text style={styles.primaryButtonText}>Confirm</Text>
        </Pressable>
        <Pressable onPress={handleResend} style={styles.resend}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Text style={styles.resendText}>Resend Code</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: 20,
  },

  card: {
    marginTop: 80,
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 24,
  },

  title: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 28,
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    color: colors.text,
    marginLeft: 10,
    fontSize: fontSize.xs + 2,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  primaryButtonPressed: {
    backgroundColor: "#d93238",
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: fontSize.xs + 2,
  },

  resend: {
    marginTop: 20,
    alignItems: "center",
  },

  resendText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
});

export default VerifyScreen;
