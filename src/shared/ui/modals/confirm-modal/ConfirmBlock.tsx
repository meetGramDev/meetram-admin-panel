'use client'
import {
  type ChangeEvent,
  type ComponentProps,
  type ReactElement,
  useEffect,
  useState,
} from 'react'

import { Button, Dialog, Option, Select, TextArea } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'
import { useTranslations } from 'next-intl'

type Props = {
  buttonsClassname?: string
  message: ReactElement | string
  onChange: (value: string) => void
  onConfirm: (isConfirm: boolean) => void
  rootClassname?: string
} & ComponentProps<typeof Dialog>

export const ConfirmBlock = ({
  buttonsClassname,
  className,
  message,
  onChange,
  onConfirm,
  rootClassname,
  ...props
}: Props) => {
  const tButtons = useTranslations('buttons')
  const tReasons = useTranslations('dialogs.ban.reasons')

  const reasons = [
    { label: tReasons('Bad behavior'), value: 'Bad behavior' },
    { label: tReasons('Advertising placemen'), value: 'Advertising placemen' },
    { label: tReasons('Another reason'), value: 'Another reason' },
  ]

  const [isAnotherReason, setIsAnotherReason] = useState(false)
  const [currentReason, setCurrentReason] = useState(reasons[0].value)

  useEffect(() => {
    if (props.open) {
      onChange(currentReason)
    }
  }, [props.open])

  return (
    <Dialog {...props}>
      <div className={cn('px-6 py-7', rootClassname)}>
        <p
          className={
            'mb-8 max-h-60 w-80 overflow-auto text-regular16 font-normal md:mb-[18px] md:w-[20.187rem]'
          }
        >
          {message}
        </p>
        <Select
          rootClassName={'w-full md:mb-[3rem]'}
          value={currentReason}
          onValueChange={(value: string) => {
            setCurrentReason(value)
            onChange(value)
            setIsAnotherReason(value === 'Another reason')
          }}
        >
          {reasons.map((reason, index) => (
            <Option key={index} value={reason.value}>
              <div>{reason.label}</div>
            </Option>
          ))}
        </Select>

        {isAnotherReason && (
          <TextArea
            placeholder={tReasons('Description') + '...'}
            className={'w-full bg-dark-500 md:mb-8 md:h-[7rem]'}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value)}
          />
        )}

        <div className={cn('flex flex-wrap gap-6 md:justify-between', buttonsClassname)}>
          <Button
            className={'md:w-[8.125rem]'}
            onClick={() => onConfirm(true)}
            variant={'outlined'}
          >
            {tButtons('Yes')}
          </Button>
          <Button className={'md:w-[8.125rem]'} onClick={() => onConfirm(false)}>
            {tButtons('No')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
