import { CreditCardIcon } from '@/src/shared/assets/icons'
import { ALL_POSTS, PAYMENTS_LIST, USERS_LIST } from '@/src/shared/routes'
import {
  ImageIconOutlined,
  MyProfileIcon,
  type SidebarItemType,
  StatisticsIcon,
} from '@meetgram/ui-kit'

export const sidebarItems: SidebarItemType[] = [
  { Svg: MyProfileIcon, hrefPath: USERS_LIST, name: 'Users list' },
  { Svg: StatisticsIcon, hrefPath: '#', name: 'Statistics' },
  { Svg: CreditCardIcon, hrefPath: PAYMENTS_LIST, name: 'Payments list' },
  { Svg: ImageIconOutlined, hrefPath: ALL_POSTS, name: 'Posts list' },
]
