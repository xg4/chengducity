import { GithubOutlined } from '@ant-design/icons';
import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  return (
    <nav className="bg-white flex justify-between">
      <ul className="flex list-none p-0 m-0">
        {links.map((link) => (
          <li className="p-4" key={link.name}>
            <ActiveLink activeClassName="text-blue-500" href={link.path}>
              <a className="text-gray-800">{link.name}</a>
            </ActiveLink>
          </li>
        ))}
      </ul>

      <a
        className="p-4 text-gray-800 text-xl hover:text-gray-400"
        target="_blank"
        href="https://github.com/xg4/chengducity"
      >
        <GithubOutlined></GithubOutlined>
      </a>
    </nav>
  );
}
