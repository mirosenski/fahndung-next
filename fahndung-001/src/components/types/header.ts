import type { MenuItem, MenuSection } from '../constants/navigationData';

export type { MenuItem, MenuSection };

export interface HeaderProps {
  className?: string;
}

export interface DesktopHeaderProps {
  isScrolled: boolean;
}

export interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact' | 'large';
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

export interface HoverMegaMenuProps {
  title: string;
  items?: MenuItem[];
} 