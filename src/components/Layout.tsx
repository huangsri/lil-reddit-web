import { Fragment, ReactNode } from 'react'
import { NavBar } from './NavBar'

import { Wrapper, WrapperVariant } from './Wrapper'

interface LayoutProps {
  children: ReactNode
  variant?: WrapperVariant
}

export const Layout = ({ variant, children }: LayoutProps) => {
  return (
    <Fragment>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Fragment>
  )
}
