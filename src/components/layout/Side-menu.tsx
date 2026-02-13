import { clsx } from 'clsx';
interface SideMenuProp {
  className?: string;
  children?: React.ReactNode;
}

export const SideMenu = ({ className, children }: SideMenuProp) => {
  return <nav className={clsx(className)}>{children}</nav>;
};
