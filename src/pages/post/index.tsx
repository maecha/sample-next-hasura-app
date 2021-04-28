import { NextPage } from 'next'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

import { Editor } from '@/components/editor'
import { SiteHeader, SiteHeaderItem } from '@/components/site-header'
import { Button } from '@/components/button'
import { UserIcon } from '@/components/user-icon'
import { usePostArticleMutation } from '@/generated/graphql'

import styles from './index.module.css'

const PostPage: NextPage = () => {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [postArticle] = usePostArticleMutation()
  const [postDisabled, setPostDisabled] = useState(false)
  const router = useRouter()

  const handleChangeSubject = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(ev.target.value)
    },
    [],
  )

  const handlePost = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      if (!content || !subject || postDisabled) {
        return
      }

      setPostDisabled(true)

      const { data } = await postArticle({
        variables: {
          // FIXME: authorIdはいったん決め打ちにする
          authorId: '47f32eeb-1c22-4fb5-8741-f09392461af4',
          content,
          subject,
          publishedAt: 'now()',
        },
      })
      if (data && data.insert_articles_one) {
        // FIXME: ユーザーID決め打ち
        const aritcleId = data.insert_articles_one.id
        router.push(`/hoge/${aritcleId}`)
        setPostDisabled(false)
      } else {
        console.log('POST unknown state', data)
      }
    },
    [content, subject, postDisabled, postArticle, router],
  )

  const siteHeaderRight = (
    <>
      <SiteHeaderItem>
        <form onSubmit={handlePost}>
          <Button type="submit">
            <span>投稿する</span>
          </Button>
        </form>
      </SiteHeaderItem>
      <SiteHeaderItem>
        <UserIcon src="/profile.png" />
      </SiteHeaderItem>
    </>
  )

  return (
    <>
      <SiteHeader right={siteHeaderRight} />
      <div className={styles.editContent}>
        <input
          className={styles.subject}
          type="text"
          placeholder="たいとる"
          value={subject}
          onChange={handleChangeSubject}
        />
        <Editor
          className={styles.editor}
          placeholder="本文を書きましょう"
          value={content}
          onEdit={setContent}
        />
      </div>
    </>
  )
}

export default PostPage
