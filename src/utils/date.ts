export type FormattedDate = {
  datetime: string
  isNew: boolean
}

export const formatDate = (d: Date, now: Date): FormattedDate => {
  const dtf = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  const [
    { value: year },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: hour },
    ,
    { value: minute },
  ] = dtf.formatToParts(d)
  return {
    datetime: `${year}/${month}/${day} ${hour}:${minute}`,
    isNew: true,
  }
}
