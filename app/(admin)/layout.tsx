// src/app/layout.tsx
import type { Metadata } from 'next'
import './../globals.css'
import { SWRProvider } from '../providers'
import { Grid2X2Plus, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { logout } from '@/lib/session'
import { LogoutButton } from '@/components/buttons/LogoutButton'
import { AdminLayoutButton } from '@/components/buttons/AdminLayoutButton'

export const metadata: Metadata = {
  title: 'Chrodar - controle financeiro',
  description: 'Home Chrodar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <SWRProvider>
        <body className="bg-white">
          <div className="grid grid-cols-1 overflow-y-hidden bg-transparent">
            <div className=" sm:hidden w-full h-12 bg-[#2563EB] flex px-10 justify-between">
              <span className="cursor-default self-center text-xl font-semibold whitespace-nowrap dark:text-green-neon">
                Chrodar
              </span>
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex place-self-end p-2  text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white cursor-pointer dark:hover:bg-[#1d4ed8] transition-colors  dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon size={24} />
              </button>
            </div>

            <aside
              id="logo-sidebar"
              className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-[#2563EB]">
                <a href="/home" className="flex items-center ps-2.5 mb-5">
                  <Image
                    width={24}
                    height={24}
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-6 me-3 sm:h-7"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-green-neon">
                    Chrodar
                  </span>
                </a>
                <ul className="space-y-2 font-medium">
                  <li>
                    <AdminLayoutButton label="Home" href="/home" icon={<HomeIcon size={16} />} />
                  </li>

                  <li>
                    <AdminLayoutButton
                      label="Categories"
                      href="/categories"
                      icon={<Grid2X2Plus size={16} />}
                    />
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#1d4ed8] transition-colors  group"
                    >
                      <LayoutDashboardIcon size={16} />
                      <span className="ms-3">Dashboard</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#1d4ed8] transition-colors  group"
                    >
                      <UsersIcon size={16} />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Users
                      </span>
                    </a>
                  </li>*/}

                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            </aside>

            <div
              className="p-4 sm:ml-64 bg-white overflow-hidden text-black
            "
            >
              {children}
            </div>
          </div>
        </body>
      </SWRProvider>
    </html>
  )
}
