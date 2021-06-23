import React from 'react'
import { Box, Flex, HStack, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'
import { Button } from '@chakra-ui/button'

import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

export const NavBar = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })

  let body = null

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <React.Fragment>
        <NextLink href="/login" passHref>
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link>Register</Link>
        </NextLink>
      </React.Fragment>
    )
  } else {
    body = (
      <HStack align="center">
        <Box>{data.me.username}</Box>
        <Button
          variant="link"
          onClick={() => {
            logout()
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </HStack>
    )
  }

  return (
    <Flex sx={{ bg: 'tomato', p: 3, pos: 'sticky', top: 0, zIndex: 1 }}>
      <HStack sx={{ color: 'white', ml: 'auto' }}>{body}</HStack>
    </Flex>
  )
}
