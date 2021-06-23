import { withUrqlClient } from 'next-urql'
import { Fragment } from 'react'
import { Box, Link, Stack } from '@chakra-ui/layout'
import NextLink from 'next/link'

import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components'

const Index = () => {
  const [{ data }] = usePostsQuery()
  console.log('Index ~ data', data)

  return (
    <Layout>
      <Stack spacing="16px">
        <NextLink href="/create-post">
          <Link>Create Post</Link>
        </NextLink>

        <Stack spacing="4px">
          {!data
            ? 'loading...'
            : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
        </Stack>
      </Stack>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
