import React from 'react'
import styles from './index.module.css'

type Props = {
  content: string
}

const Paragraph: React.FC<{ p: string }> = ({ p }) => {
  return <div className={styles.paragraph}>{p}</div>
}

export const Article: React.FC<Props> = ({ content }) => {
  return (
    <>
      {content.split('\n\n').map((p, i) => (
        <Paragraph p={p} key={i} />
      ))}
    </>
  )
}
