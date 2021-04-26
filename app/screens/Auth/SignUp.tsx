import React, {useRef} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {MutatorTextInput, MutatorButton} from 'react-graphql/components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Text, Button, useTheme} from 'components';
import type {AuthNavigationProps} from 'navTypes';
import {AppRoute} from 'navRoutes';
import TextInput from '../../components/form/TextInput';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref('password')], "Passwords don't match")
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignUp = ({navigation}: AuthNavigationProps<AppRoute.SIGN_UP>) => {
  const name = useRef<RNTextInput>(null);
  const email = useRef<RNTextInput>(null);
  const password = useRef<RNTextInput>(null);
  const passwordConfirmation = useRef<RNTextInput>(null);
  const {handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agreedToTerms: false,
    },
    onSubmit: () => navigation.navigate(AppRoute.PHONE_INPUT),
  });

  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      paddingHorizontal={'m'}>
      <Text variant="title2" textAlign="center" marginBottom="l">
        Let's get started
      </Text>
      <Box>
        <Box marginBottom="m">
          <TextInput
            ref={name}
            icon="user"
            placeholder="Enter your name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
            touched={touched.name}
            autoCapitalize="none"
            autoCompleteType="name"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => email.current?.focus()}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            ref={email}
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            autoCapitalize="none"
            autoCompleteType="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>

        <Box marginBottom="m">
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => passwordConfirmation.current?.focus()}
            secureTextEntry
          />
        </Box>

        <Box marginBottom="m">
          <TextInput
            ref={passwordConfirmation}
            icon="lock"
            placeholder="Confirm your Password"
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
            secureTextEntry
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button variant="primary" onPress={handleSubmit} label="Next" />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
