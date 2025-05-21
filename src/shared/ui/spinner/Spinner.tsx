import { clsx } from 'clsx'

import s from './spinner.module.scss'

type Props = {
  loaderClassName?: string
}

export const Spinner = ({ loaderClassName }: Props) => {
  return <div className={clsx(s.loader, loaderClassName)}></div>
}
