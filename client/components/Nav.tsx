import { Menu } from 'antd';
import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  return (
    <Menu mode="horizontal">
      {links.map((link) => (
        <Menu.Item key={link.name}>
          <ActiveLink activeClassName="text-blue-500" href={link.path}>
            <a>{link.name}</a>
          </ActiveLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}
