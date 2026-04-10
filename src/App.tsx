import { FractalsLogo } from './components/preview/FractalsLogo'
import { ProofSection } from './components/preview/ProofSection'
import { Reveal } from './components/preview/Reveal'
import { ThemeToggleIcon } from './components/preview/ThemeToggleIcon'
import { previewContent } from './content/previewContent'
import { useActiveSection } from './hooks/useActiveSection'
import { usePreviewTheme } from './hooks/usePreviewTheme'

function App() {
  const activeSection = useActiveSection(previewContent.navLinks.map((link) => link.id))
  const { toggleTheme, toggleLabel, theme } = usePreviewTheme()

  return (
    <div className="relative overflow-x-clip bg-canvas text-fg">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div
          className="absolute inset-x-0 top-0 h-[34rem]"
          style={{ backgroundImage: 'var(--hero-spot), var(--hero-fade)' }}
        />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-4 md:px-8">
        <div
          data-testid="preview-dock"
          className="inline-flex w-fit max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-full border border-line bg-rail px-3 py-2 shadow-ambient backdrop-blur-md sm:gap-3 sm:px-4"
        >
          <a
            href="#hero"
            aria-label="Fractals"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full px-1 text-fg transition duration-300 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <FractalsLogo />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {previewContent.navLinks.map((link) => (
              <a
                key={link.id}
                className="dock-link"
                data-active={String(activeSection === link.id)}
                aria-current={activeSection === link.id ? 'true' : 'false'}
                href={`#${link.id}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <button
        type="button"
        data-theme-toggle
        data-theme-icon={theme === 'dark' ? 'moon' : 'sun'}
        className="fixed bottom-5 left-5 z-50 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-line bg-rail p-1.5 text-fg shadow-ambient backdrop-blur-md transition duration-300 hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal md:bottom-6 md:left-6"
        aria-label={toggleLabel}
        aria-pressed={theme === 'light'}
        onClick={toggleTheme}
        title={toggleLabel}
      >
        <ThemeToggleIcon theme={theme} />
      </button>

      <main className="relative pb-16 pt-28 md:pt-32">
        <section id="hero" className="scene min-h-[94vh] scroll-mt-28 py-10 md:py-16">
          <Reveal className="mx-auto flex max-w-[62rem] flex-col items-center text-center">
            <p className="mono-label">{previewContent.hero.eyebrow}</p>
            <h1 className="mt-8 max-w-[9.5ch] font-display text-[clamp(4.4rem,10vw,8.6rem)] leading-[0.88] tracking-[-0.05em] text-fg">
              {previewContent.hero.title}
            </h1>
            <p className="mt-7 max-w-[40rem] text-lg leading-7 text-muted md:text-xl md:leading-8">
              {previewContent.hero.body}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={previewContent.hero.primaryCta.href} className="action-primary">
                {previewContent.hero.primaryCta.label}
              </a>
              <a href={previewContent.hero.secondaryCta.href} className="action-secondary">
                {previewContent.hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </section>

        <section id="statement" className="scene scroll-mt-28 py-8 md:py-14">
          <Reveal className="paper-scene rounded-fractal-xl px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(24rem,28rem)]">
              <div>
                <p className="mono-label">{previewContent.statement.eyebrow}</p>
                <p className="mt-6 max-w-[15ch] font-display text-[clamp(2rem,5vw,5rem)] leading-[0.92] tracking-[-0.035em] paper-accent">
                  {previewContent.statement.title}
                </p>
              </div>

              <div className="max-w-[28rem] space-y-6 lg:ml-auto">
                <p className="paper-copy text-base leading-7">
                  {previewContent.statement.body}
                </p>
                <div className="border-t paper-line pt-5">
                  <p className="mono-label">{previewContent.statement.subsectionTitle}</p>
                  <p className="mt-3 paper-copy text-base leading-7">
                    {previewContent.statement.subsectionBody}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <ProofSection />

        <section id="agency" className="scene scroll-mt-28 py-8 md:py-14">
          <Reveal className="paper-scene rounded-fractal-xl px-6 py-10 md:px-10 md:py-14">
            <div className="mx-auto max-w-[72rem] text-center">
              <p className="mono-label">{previewContent.agency.eyebrow}</p>
              <p className="mt-6 w-full font-display text-[clamp(2rem,5vw,5rem)] leading-[0.92] tracking-[-0.035em] paper-accent">
                {previewContent.agency.title}
              </p>
              <p className="mx-auto mt-6 max-w-[40rem] paper-copy text-base leading-7">
                {previewContent.agency.body}
              </p>
            </div>

            <div className="mt-14 grid gap-6 border-t paper-line pt-8 md:grid-cols-3">
              {previewContent.agency.pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={
                    index < 2
                      ? 'border-b paper-line pb-5 md:border-b-0 md:border-r md:pr-6' + (index === 1 ? ' md:pl-6' : '')
                      : 'md:pl-6'
                  }
                >
                  <p className="mono-label">{pillar.index}</p>
                  <p className="mt-3 font-display text-[clamp(1.4rem,3vw,2rem)] leading-[0.95] tracking-[-0.02em] paper-accent">
                    {pillar.title}
                  </p>
                  <p className="mt-1 mono-label">{pillar.label}</p>
                  <p className="mt-3 paper-copy text-sm leading-6 md:max-w-[18rem]">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="foundation" className="scene scroll-mt-28 py-8 md:py-14">
          <Reveal className="paper-scene rounded-fractal-xl px-6 py-10 md:px-10 md:py-14">
            <div className="mx-auto max-w-[72rem] text-center">
              <p className="mono-label">{previewContent.foundation.eyebrow}</p>
              <p className="mt-6 w-full font-display text-[clamp(2rem,5vw,5rem)] leading-[0.92] tracking-[-0.035em] paper-accent">
                {previewContent.foundation.title}
              </p>
              <p className="mx-auto mt-6 max-w-[40rem] paper-copy text-base leading-7">
                {previewContent.foundation.body}
              </p>
            </div>

            <div className="mt-14 grid gap-6 border-t paper-line pt-8 md:grid-cols-2 lg:grid-cols-4">
              {previewContent.foundation.steps.map((step, index) => (
                <div
                  key={step.title}
                  className={
                    index < 3
                      ? 'border-b paper-line pb-5 md:border-b-0 md:border-r md:pr-6' + (index > 0 ? ' md:pl-6' : '')
                      : 'md:pl-6'
                  }
                >
                  <p className="mono-label">{step.title}</p>
                  <p className="mt-3 paper-copy text-sm leading-6">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="flywheel" className="scene scroll-mt-28 py-14 md:py-24">
          <Reveal className="mx-auto flex max-w-[58rem] flex-col items-center text-center">
            <p className="mono-label">{previewContent.flywheel.eyebrow}</p>
            <p className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.035em] text-fg">
              {previewContent.flywheel.title}
            </p>
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-muted md:text-lg md:leading-8">
              {previewContent.flywheel.body}
            </p>
          </Reveal>
        </section>

        <section
          id="philosophy"
          className="scene scroll-mt-28 py-14 md:py-24"
        >
          <Reveal className="mx-auto flex max-w-[58rem] flex-col items-center text-center">
            <p className="mono-label">{previewContent.closing.eyebrow}</p>
            <p className="mt-6 max-w-[10ch] font-display text-[clamp(3.2rem,8vw,6.6rem)] leading-[0.92] tracking-[-0.035em] text-fg">
              {previewContent.closing.title}
            </p>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-muted md:text-lg md:leading-8">
              {previewContent.closing.body}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={previewContent.closing.primaryCta.href} className="action-primary">
                {previewContent.closing.primaryCta.label}
              </a>
              <a href={previewContent.closing.secondaryCta.href} className="action-secondary">
                {previewContent.closing.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="scene pb-10">
        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">{previewContent.footer.tagline}</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted">
            {previewContent.footer.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition duration-300 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
