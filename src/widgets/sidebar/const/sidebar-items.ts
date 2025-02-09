import { CreditCardIcon } from '@/src/shared/assets/icons'
import { ALL_POSTS } from '@/src/shared/routes'
import {
  ImageIconOutlined,
  MyProfileIcon,
  type SidebarItemType,
  StatisticsIcon,
} from '@meetgram/ui-kit'

export const sidebarItems: SidebarItemType[] = [
  { Svg: MyProfileIcon, hrefPath: '#', name: 'Users list' },
  { Svg: StatisticsIcon, hrefPath: '#', name: 'Statistics' },
  { Svg: CreditCardIcon, hrefPath: '#', name: 'Payments list' },
  { Svg: ImageIconOutlined, hrefPath: ALL_POSTS, name: 'Posts list' },
]
