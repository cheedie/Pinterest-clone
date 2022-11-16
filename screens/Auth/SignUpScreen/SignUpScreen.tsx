import { View, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import {Text} from '../../../components/Themed'
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import Colors from "../../../constants/Colors";
import { useNhostClient } from "@nhost/react";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const nhost = useNhostClient()

  const onRegisterPressed = async() => {
    const result = await nhost.auth.signUp({
      email,
      password,
      options:{
        displayName: name
      }
    })
    if(result.error){
      Alert.alert('Error signing up', result.error.message)
      setEmail("")
      setName("")
      setPassword("")
    }
    else {
      navigation.navigate('Sign in')
    }
  };

  const onSignInPress = () => {
    navigation.navigate("Sign in");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor = "gray"

          style={styles.input}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor = "gray"

          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor = "gray"

          secureTextEntry
          style={styles.input}
        />

        <CustomButton text="Register" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: Colors.light.tint,
  },
  input: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
  },
});

export default SignUpScreen;
