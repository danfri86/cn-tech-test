import React from 'react';
import s from './Tabs.module.css';

type Props<T> = {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
};

const Tabs = <T,>({
  activeTab,
  tabs,
  onTabChange,
  className,
  ...props
}: Props<T> & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${s.wrapper} ${className || ''}`} {...props}>
      {tabs.map((tab) => (
        <div
          key={tab as any}
          className={`${s.tab} ${activeTab === tab ? s['is-active'] : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
