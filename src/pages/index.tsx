import { useState } from 'react'
import { withUrqlClient } from 'next-urql'
import { Box, Heading, Link, Stack, Text, Button, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'

import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  })
  const [{ data, fetching }] = usePostsQuery({
    variables,
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
              {data!.posts.posts.map((p, idx) => (
                <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                  <Heading sx={{ fontSize: 'xl' }}>
                    {idx + 1}. {p.title}
                  </Heading>
                  <Text sx={{ mt: 4 }}>{p.textSnippet}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>

        {data && data.posts.hasMore && (
          <Button
            colorScheme="gray"
            isLoading={fetching}
            onClick={() => {
              setVariables((state) => ({
                limit: state.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              }))
            }}
          >
            Load More
          </Button>
        )}
      </Stack>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
