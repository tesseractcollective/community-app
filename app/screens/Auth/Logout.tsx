import React, { useContext, useState } from "react"
import { View } from "react-native"
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components"
import { logoutOnDevice } from "contexts"
import { navigate } from "@ivy/navigation/navigation-utilities"
import { AppRoute } from "@ivy/navigation/app-routes"

export const Logout = () => {
  const styles = useStyleSheet(themedStyles)
  const doLogout = async () => {
    await logoutOnDevice()
    console.log("LOGGED OUT")
    navigate(AppRoute.SIGN_IN)
  }
  return (
    <View style={{ flex: 1 }}>
      <Button
        style={styles.signInButton}
        appearance="ghost"
        status="control"
        onPress={doLogout}>
        Logout
      </Button>
    </View>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "text-hint-color",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-control-color",
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
})
