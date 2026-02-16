export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold tracking-tight text-foreground">
          credat
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/credat/credat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://docs.credat.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            Docs
          </a>
          <a
            href="https://x.com/credat_io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            X
          </a>
        </div>

        <span className="text-sm text-foreground-secondary">
          &copy; 2026 Credat. Open source under MIT.
        </span>
      </div>
    </footer>
  );
}
