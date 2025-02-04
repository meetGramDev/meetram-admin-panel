import type { CSSProperties, FC, HTMLProps, ReactNode, SVGProps } from 'react'

export type IconProps = {
  /** Set width and height of icon in pixels */
  size?: number
  /** Props to pass directly to svg element */
  svgProps?: SVGProps<SVGSVGElement>
} & Omit<HTMLProps<HTMLSpanElement>, 'size'>

export const IconWrapper: FC<{ icon: ReactNode } & IconProps> = ({
  icon,
  size: sizeProp,
  ...restProps
}) => {
  const size = sizeProp ? `${sizeProp}px` : '24px'

  return (
    <span
      aria-hidden={'true'}
      role={'img'}
      style={
        {
          display: 'inline-flex',
          fontSize: 'inherit',
          height: size,
          width: size,
        } as CSSProperties
      }
      {...restProps}
    >
      {icon}
    </span>
  )
}
