import { type ComponentProps } from 'react'

import { UserBlockStatus } from '@/src/shared/api'
import { Option, type OptionType, Select } from '@meetgram/ui-kit'
import { useTranslations } from 'next-intl'

const options: OptionType[] = [
  {
    label: 'Not selected',
    value: UserBlockStatus.All,
  },
  {
    label: 'Blocked',
    value: UserBlockStatus.Blocked,
  },
  {
    label: 'Not blocked',
    value: UserBlockStatus.Unblocked,
  },
]

type Props = {} & ComponentProps<typeof Select>

export const BanSelector = ({ ...restProps }: Props) => {
  const t = useTranslations('ban-selector')

  return (
    <Select placeholder={t('Not selected')} {...restProps}>
      {options.map(o => {
        console.log(o)

        return (
          <Option key={o.value} value={o.value}>
            {/*{o.label}*/}
            {t(o.label as any)}
          </Option>
        )
      })}
    </Select>
  )
}
