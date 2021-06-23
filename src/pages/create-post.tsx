import { Button } from '@chakra-ui/button'
import { Stack } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'

import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'

import { useCreatePostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils'
import { createUrqlClient } from '../utils/createUrqlClient'

const CreatePost = () => {
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()

  useIsAuth()

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
          }
          // const response = await login(values)
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors))
          // } else if (response.data?.login.user) {
          //   // worked
          //   router.push('/')
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="16px">
              <InputField name="title" placeholder="Title" label="Title" />
              <InputField
                name="text"
                placeholder="Text..."
                label="Body"
                textarea
              />
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Create Post
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
