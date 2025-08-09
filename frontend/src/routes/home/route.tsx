import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

import { Link, useRouterState } from '@tanstack/react-router'

const tabs = [
  { label: 'Tela Inicial', to: '/home' },
  { label: 'Transações', to: '/home/transactions' },
  { label: 'Informações', to: '/home/informations' },
]

function RouteComponent() {
  const { location } = useRouterState()

  return (
    <>
      <nav className="flex w-full justify-between px-22 py-8 mb-4 border-border">
        <ul className="flex gap-2">
          {tabs.map((tab) => {
            let isActive = false
            if (tab.to === '/home') {
              isActive =
                location.pathname === '/home' || location.pathname === '/home/'
            } else {
              isActive = location.pathname.startsWith(tab.to)
            }
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={
                    `px-4 py-2 font-medium ` +
                    (isActive
                      ? 'text-green-700 border-b-2 border-green-600 font-semibold'
                      : 'text-muted-foreground hover:bg-muted')
                  }
                  preload="intent"
                >
                  {tab.label}
                </Link>
              </li>
            )
          })}
        </ul>
        {location.pathname === '/home' && (
          <span className="text-xl">Olá, Lucas</span>
        )}
      </nav>
      <main className="px-22">
        <Outlet />
      </main>
    </>
  )
}
