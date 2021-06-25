import { withUrqlClient } from 'next-urql'
import { Box, Heading, Link, Stack, Text, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components'
import { Flex } from '@chakra-ui/react'

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  })

  if (!fetching && !data) {
    return <Box>No Post, Query Failed</Box>
  }

  return (
    <Layout>
      <Stack spacing="16px">
        <Flex justify="space-between" sx={{ alignItems: 'center' }}>
          <Heading>Reddit</Heading>
          <NextLink href="/create-post">
            <Link>Create Post</Link>
          </NextLink>
        </Flex>

        <Stack spacing="4px">
          {!data && fetching ? (
            'loading...'
          ) : (
            <Stack>
              {data!.posts.map((p) => (
                <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                  <Heading sx={{ fontSize: 'xl' }}>{p.title}</Heading>
                  <Text sx={{ mt: 4 }}>{p.textSnippet}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>

        {data && (
          <Button colorScheme="gray" isLoading={fetching}>
            Load More
          </Button>
        )}
      </Stack>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
