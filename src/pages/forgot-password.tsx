import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";

import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const ForgotPassword: NextPage = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <Stack spacing="16px">
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Get me an Email!
                </Button>
              </Stack>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
