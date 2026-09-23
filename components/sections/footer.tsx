import { imageCredits } from "@/config/content";
import { siteConfig } from "@/config/site";
import { LinkedInIcon, XIcon } from "@/components/ui/brand-icons";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const { email, phone, phoneHref, location } = siteConfig.contact;
  const year = 2026;

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
          <div className="flex gap-2">
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent hover:text-ink"
              >
                <LinkedInIcon className="size-4" />
              </a>
            )}
            {siteConfig.social.x && (
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex size-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent hover:text-ink"
              >
                <XIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Contact</span>
          <a href={`mailto:${email}`} className="text-muted transition-colors hover:text-ink">{email}</a>
          <a href={`tel:${phoneHref}`} className="text-muted transition-colors hover:text-ink">{phone}</a>
          <span className="text-muted">{location}</span>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Company</span>
          <a href="#approach" className="text-muted transition-colors hover:text-ink">Approach</a>
          <a href="#pipeline" className="text-muted transition-colors hover:text-ink">Pipeline</a>
          <a href="#results" className="text-muted transition-colors hover:text-ink">Results</a>
          <a href="#team" className="text-muted transition-colors hover:text-ink">Team</a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-faint sm:px-6 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {siteConfig.name} · {siteConfig.domain}
          </span>
          <details className="group">
            <summary className="cursor-pointer list-none transition-colors hover:text-muted">
              Photography via Unsplash <span className="group-open:hidden">+</span>
            </summary>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {imageCredits.map((c) => (
                <li key={c.href}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-muted">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {/* oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="mx-auto -mb-[3vw] max-w-7xl px-4 text-center text-[17vw] font-semibold leading-none tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/.08)] sm:px-6 lg:text-[15rem]">
          ElectricAI
        </div>
      </div>
    </footer>
  );
}
