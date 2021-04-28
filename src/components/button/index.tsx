import React from 'react'

import { useClassNames } from '@/utils'

import styles from './index.module.css'

// HTML ほとんどそのままのコンポーネントで、本来の props をそのまま受け取る
// ref: https://ginpen.com/2019/05/13/componentpropswithref-to-receive-html-props-in-react/
type Props = React.ComponentPropsWithRef<'button'>

export const Button: React.FC<Props> = ({ className, children, ...rest }) => {
  const _className = useClassNames(styles.button, className)
  return (
    <button className={_className} {...rest}>
      {children}
    </button>
  )
}
