import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

import { previewContent } from '../../content/previewContent'
import { useProofSectionState } from '../../hooks/useProofSectionState'
import { PreviewIcon } from './PreviewIcon'
import { Reveal } from './Reveal'
import type { PreviewServiceKey } from '../../content/previewContent'

export function ProofSection() {
  // Desktop state
  const assistantRef = useRef<HTMLElement | null>(null)
  const operatorRef = useRef<HTMLElement | null>(null)
  const builderRef = useRef<HTMLElement | null>(null)
  const activeKey = useProofSectionState(assistantRef, operatorRef, builderRef)
  const activeService =
    previewContent.proof.services.find((s) => s.key === activeKey) ??
    previewContent.proof.services[0]

  // Mobile accordion state
  const [mobileActive, setMobileActive] = useState<PreviewServiceKey>(
    previewContent.proof.services[0].key,
  )

  return (
    <section id="proof" className="scene scroll-mt-28 py-12 md:py-20">
      <Reveal className="mb-10 py-[30px] text-center md:mb-14">
        <p className="mono-label">{previewContent.proof.eyebrow}</p>
        <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.75rem)] leading-[0.94] tracking-[-0.035em] text-fg">
          {previewContent.proof.title}
        </h2>
        <p className="mx-auto mt-7 max-w-[40rem] text-lg leading-7 text-muted md:text-xl md:leading-8">
          {previewContent.proof.body}
        </p>
      </Reveal>

      {/* Mobile: accordion */}
      <Reveal className="lg:hidden space-y-3">
        {previewContent.proof.services.map((service) => {
          const isOpen = mobileActive === service.key
          return (
            <div
              key={service.key}
              className="paper-scene rounded-fractal-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setMobileActive(service.key)}
                className="w-full flex items-center justify-between px-5 py-5 text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <p className="mono-label mb-2">{service.index}</p>
                  <h3 className="font-display text-[clamp(1.6rem,5vw,2.2rem)] leading-[0.95] tracking-[-0.02em] text-fg">
                    {service.title}
                  </h3>
                </div>
                <ChevronDown
                  size={20}
                  className={`shrink-0 ml-4 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 border-t border-line pt-5">
                  <p className="text-sm leading-6 text-muted mb-6">{service.summary}</p>
                  <h4 className="font-display text-lg leading-tight tracking-tight text-fg mb-3">
                    {service.detail.title}
                  </h4>
                  <p className="text-sm leading-6 text-muted mb-6">{service.detail.copy}</p>
                  <ul className="space-y-4">
                    {service.detail.aspects.map((aspect, index) => (
                      <li
                        key={aspect.label}
                        className="flex gap-4 border-t border-line pt-4 first:border-t-0 first:pt-0"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg">
                          <PreviewIcon name={aspect.icon} initialDelayMs={index * 800} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-fg">{aspect.label}</p>
                          <p className="mt-1 text-sm leading-6 text-muted">{aspect.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </Reveal>

      {/* Desktop: sticky two-column */}
      <Reveal className="hidden lg:grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="divide-y divide-line">
            {previewContent.proof.services.map((service) => {
              const ref =
                service.key === 'assistant'
                  ? assistantRef
                  : service.key === 'operator'
                    ? operatorRef
                    : builderRef

              return (
                <article
                  key={service.key}
                  ref={ref}
                  className="service-row"
                  data-proof-card={service.key}
                  data-active={String(activeKey === service.key)}
                >
                  <div className="service-row-content">
                    <p className="mono-label">{service.index}</p>
                    <h3 className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.025em] text-fg">
                      {service.title}
                    </h3>
                    <p className="service-copy mt-5 max-w-[36rem]">{service.summary}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="relative self-stretch lg:pl-10 lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:top-0 lg:before:w-px lg:before:bg-line">
          <aside
            id="proof-detail"
            className="detail-panel border-t border-line pt-6 lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100vh-7rem)] lg:flex-col lg:justify-center lg:border-t-0 lg:pt-0"
          >
            <h3
              id="proof-title"
              className="max-w-[11ch] font-display text-[clamp(2.35rem,4.5vw,3.5rem)] leading-[0.94] tracking-[-0.025em] text-fg"
            >
              {activeService.detail.title}
            </h3>
            <p
              id="proof-copy"
              className="mt-4 max-w-[24rem] text-sm leading-6 text-muted md:text-base md:leading-7"
            >
              {activeService.detail.copy}
            </p>

            <div className="mt-8 border-t border-line pt-5">
              <ul id="proof-aspects" className="space-y-4">
                {activeService.detail.aspects.map((aspect, index) => (
                  <li
                    key={aspect.label}
                    className="flex gap-4 border-t border-line pt-4 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg">
                      <PreviewIcon name={aspect.icon} initialDelayMs={index * 1000} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-fg">{aspect.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{aspect.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Reveal>
    </section>
  )
}
