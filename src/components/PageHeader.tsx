import React from 'react';
import s from './PageHeader.module.css';

type Props = {
  title?: string;
  leftSlot?: JSX.Element;
  rightSlot?: JSX.Element;
};

const PageHeader = ({
  leftSlot,
  rightSlot,
  title,
  className,
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header className={`${s.wrapper} ${className || ''}`}>
      <div className={s.left}>{leftSlot}</div>

      <div className={s.title}>
        {/* Also render empty title, ex: "" */}
        {title !== undefined ? title : 'Awesome logo'}
      </div>

      <div className={s.right}>{rightSlot}</div>
    </header>
  );
};

export default PageHeader;
