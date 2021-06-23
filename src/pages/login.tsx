import { Stack, Button, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface LoginProps {}

const Login = (props: LoginProps) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            // worked
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="16px">
              <InputField
                name="usernameOrEmail"
                placeholder="Username or Email"
                label="Username or Email"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Login
              </Button>

              <NextLink href="/forgot-password">
                <Link sx={{ textDecor: 'underline', color: 'black' }}>
                  Forget Password?
                </Link>
              </NextLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
