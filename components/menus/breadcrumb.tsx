'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function QBreadcrumb() {
  const path = usePathname();
  const breadcrumbLinks = path.split('/').filter(Boolean);

  if (breadcrumbLinks.length === 0 || path === '/') {
    return null;
  }

  // If the path is too long, show a dropdown for middle items
  if (breadcrumbLinks.length > 10) {
    const dropdownPathItems = breadcrumbLinks.slice(
      2,
      breadcrumbLinks.length - 2
    );

    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${breadcrumbLinks[0]}`}>{breadcrumbLinks[0]}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {dropdownPathItems.map((item, index) => (
                  <DropdownMenuItem key={index} className="capitalize">
                    <Link
                      href={`/${breadcrumbLinks.slice(0, index + 3).join('/')}`}
                    >
                      {item}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Last few breadcrumbs */}
          {breadcrumbLinks.slice(-2).map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="capitalize">
                {index === 1 ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/${breadcrumbLinks.slice(0, breadcrumbLinks.length - 2 + index).join('/')}`}
                    >
                      {item}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Regular breadcrumb when path is not too long
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbLinks.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="capitalize">
              {index === breadcrumbLinks.length - 1 ? (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${breadcrumbLinks.slice(0, index + 1).join('/')}`}
                  >
                    {item}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
