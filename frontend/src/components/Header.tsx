import logo from '@/assets/logo.svg'

export default function Header() {
  return (
    <header className="px-22 py-6 flex gap-2 bg-white text-black justify-between">
      <img src={logo} alt="Logo" />
    </header>
  )
}
