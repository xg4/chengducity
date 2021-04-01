import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  return (
    <nav className="bg-white">
      <ul className="flex list-none p-0 m-0">
        {links.map((link) => (
          <li className="p-5" key={link.name}>
            <ActiveLink activeClassName="text-blue-500" href={link.path}>
              <a className="text-gray-800">{link.name}</a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
