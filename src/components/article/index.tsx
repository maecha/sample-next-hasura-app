import React from 'react'
import { Paragraph } from './paragraph'
import { formatArticle } from '@/utils/article'

type Props = {
  content: string
}

export const Article: React.FC<Props> = ({ content }) => {
  return (
    <>
      {formatArticle(content).map((p, i) => (
        <Paragraph p={p} key={i} />
      ))}
    </>
  )
}
