import { Button } from "@chakra-ui/button";
import { Link, Stack, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { GetServerSidePropsContext, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import NextLink from "next/link";

import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";

import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<string>();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({ ...values, token });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }

            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="16px">
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
              />
              {tokenError && (
                <Text color="red.400">
                  {tokenError}&nbsp;
                  <NextLink href="/forgot-password">
                    <Link sx={{ textDecor: "underline", color: "black" }}>
                      Click here to get a new one
                    </Link>
                  </NextLink>
                </Text>
              )}
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Change Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      token: context.query.token as string,
    },
  };
}
