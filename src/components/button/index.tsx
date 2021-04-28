import React from 'react'

import { useClassNames } from '@/utils'

import styles from './index.module.css'

// HTML ほとんどそのままのコンポーネントで、本来の props をそのまま受け取る
// ref: https://ginpen.com/2019/05/13/componentpropswithref-to-receive-html-props-in-react/
type Props =
  | (React.ComponentPropsWithRef<'button'> & { as: undefined })
  | (React.ComponentPropsWithRef<'button'> & { as: 'button' })
  | (React.ComponentPropsWithRef<'a'> & { as: 'a' })

export const Button: React.FC<Props> = ({
  className,
  children,
  as = 'button',
  ...rest
}) => {
  const _className = useClassNames(styles.button, className)
  return React.createElement(as, { ...rest, className: _className }, children)
}
