import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center"
          >
            <HomeIcon className="h-4 w-4 mr-1" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Link
              href={item.label === "Industries" ? "/all-industries" : item.href}
              className={`ml-2 text-xs font-light ${
                index === items.length - 1
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
