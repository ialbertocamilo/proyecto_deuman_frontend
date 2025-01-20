import * as React from "react"

export function Footer() {
  return (
    <footer className="border-t p-4 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Deuman. Todos los derechos reservados.
    </footer>
  )
}

