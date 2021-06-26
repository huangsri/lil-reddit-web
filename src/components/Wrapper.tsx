import { ReactNode } from 'react'
import { Box } from '@chakra-ui/layout'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
  children: ReactNode
  variant?: WrapperVariant
}

export const Wrapper = ({ children, variant = 'regular' }: WrapperProps) => {
  return (
    <Box
      sx={{
        maxW: variant === 'regular' ? '800px' : '400px',
        w: '100%',
        mt: 8,
        mx: 'auto',
        pb: 16,
      }}
    >
      {children}
    </Box>
  )
}
