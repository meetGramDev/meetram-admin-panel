import { type ComponentProps } from 'react'

import { UserBlockStatus } from '@/src/shared/api'
import { Option, type OptionType, Select } from '@meetgram/ui-kit'

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
  return (
    <Select placeholder={'Not selected'} {...restProps}>
      {options.map(o => (
        <Option key={o.value} value={o.value}>
          {o.label}
        </Option>
      ))}
    </Select>
  )
}
