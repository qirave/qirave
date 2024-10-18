'use client';
import App from './app';
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react';

export default function SideBar() {
  return (
    <aside className="group/aside fixed inset-y-0 left-0 z-50 hidden w-14 hover:w-44 flex-col hover:px-1 border-r bg-background sm:flex transition-[width]">
      <nav className="flex flex-col items-center group-hover/aside:items-start gap-4 px-2 sm:py-5">
        <App icon={<Home className="h-5 w-5" />} name="Home" href="/" />
        <App
          icon={<LineChart className="h-5 w-5" />}
          name="Analytics"
          href="/analytics"
        />
        <App
          icon={<Users2 className="h-5 w-5" />}
          name="Customers"
          href="/customers"
        />
        <App
          icon={<Package className="h-5 w-5" />}
          name="Products"
          href="/products"
        />
        <App
          icon={<ShoppingCart className="h-5 w-5" />}
          name="Orders"
          href="/orders"
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center group-hover/aside:items-start gap-4 px-2 sm:py-5">
        <App
          icon={<Settings className="h-5 w-5" />}
          name="Settings"
          href="/settings"
        />
      </nav>
    </aside>
  );
}
