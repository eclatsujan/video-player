
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Home, Video, BarChart2, Settings } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: Video },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function DashboardNavbar() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  return (
    <aside className="flex flex-col h-screen w-64 bg-gray-900 text-white border-r">
      <div className="px-6 py-8 text-2xl font-bold">Techie IT.</div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition",
              pathname === item.href ? "bg-gray-800" : ""
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-gray-800 text-sm">shadcnm@example.com</div>
    </aside>
  )
}
