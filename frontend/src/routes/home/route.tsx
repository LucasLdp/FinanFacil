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
      <nav className="flex flex-col md:flex-row w-full justify-between items-center gap-4 px-4 sm:px-8 py-4 md:py-8 mb-4 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <ul className="flex flex-wrap gap-2">
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
                    `px-3 py-2 font-medium rounded-md transition-colors ` +
                    (isActive
                      ? 'text-green-700 border-b-2 border-green-600 font-semibold bg-green-50'
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
          <span className="text-lg md:text-xl whitespace-nowrap">
            Olá, Lucas
          </span>
        )}
      </nav>
      <main className="px-2 sm:px-4 md:px-8 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  )
}
