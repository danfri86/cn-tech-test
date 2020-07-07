import React from 'react';
import { Icon as IconType } from '../../@types/Icon';
import icons from 'assets/icons';

type Props = {
  icon: IconType;
  size?: number | string;
  color?: string;
};

const Icon = ({
  icon,
  size = 24,
  color = '#000',
  ...props
}: Props &
  Omit<
    React.HTMLAttributes<SVGSVGElement>,
    'width' | 'height' | 'viewBox'
  >) => {
  const choosenIcon = icons[icon];

  if (!choosenIcon) {
    return null;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      {React.cloneElement(choosenIcon, { fill: color })}
    </svg>
  );
};

export default Icon;
