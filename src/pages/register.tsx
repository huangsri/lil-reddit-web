import { Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="16px">
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Register
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
