import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { type Block, contact, meta, sections, summary } from './content'

export const metadata: Metadata = {
  title: 'Privacy Policy | Philo Homes',
  description:
    'How Philo Homes collects, uses, discloses, and retains personal information across the Philo Homes website and iOS app.',
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="text-base md:text-lg text-[#101A2E] mt-10 mb-3 font-medium">
              {block.text}
            </h3>
          )
        }

        if (block.type === 'ul') {
          return (
            <ul key={i} className="space-y-3 mb-6">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[#4B4B4B] text-sm leading-relaxed">
                  <span className="text-[#D1903E] select-none mt-[0.4rem] shrink-0">
                    <span className="block w-1 h-1 rounded-full bg-current" />
                  </span>
                  <span>
                    {item.label && (
                      <span className="text-[#101A2E] font-medium">{item.label} </span>
                    )}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={i} className="text-[#4B4B4B] text-sm leading-relaxed mb-6">
            {block.text}
          </p>
        )
      })}
    </>
  )
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'GT America', sans-serif" }}>
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-10 bg-white border-b border-[#E1E1E1]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1
                className="text-5xl md:text-7xl text-[#101A2E]"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Privacy Policy
              </h1>
              <p className="text-sm text-[#4B4B4B] max-w-sm md:text-right leading-relaxed">
                {meta.applies}
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Table of contents */}
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-4">
                    Contents
                  </p>
                  <nav>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#summary"
                          className="text-xs text-[#4B4B4B] hover:text-[#101A2E] transition-colors"
                        >
                          Summary of Key Points
                        </a>
                      </li>
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="text-xs text-[#4B4B4B] hover:text-[#101A2E] transition-colors"
                          >
                            {section.heading}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="#contact"
                          className="text-xs text-[#4B4B4B] hover:text-[#101A2E] transition-colors"
                        >
                          {contact.heading}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>

              {/* Policy content */}
              <div className="lg:col-span-9 max-w-[760px]">
                {/* Dates */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 pb-8 mb-10 border-b border-[#E1E1E1] text-xs text-[#8E8E8E]">
                  <span>
                    Effective Date:{' '}
                    <span className="text-[#101A2E]">{meta.effectiveDate}</span>
                  </span>
                  <span>
                    Last Updated: <span className="text-[#101A2E]">{meta.lastUpdated}</span>
                  </span>
                  <span>
                    Version: <span className="text-[#101A2E]">{meta.version}</span>
                  </span>
                </div>

                {/* Summary */}
                <div id="summary" className="scroll-mt-28 mb-14">
                  <h2
                    className="text-2xl md:text-3xl text-[#101A2E] mb-4"
                    style={{ fontFamily: "'Henry Trial', serif" }}
                  >
                    Summary of Key Points
                  </h2>
                  <p className="text-[#4B4B4B] text-sm leading-relaxed mb-6">{summary.intro}</p>
                  <div className="bg-[#FAFAFA] border border-[#E1E1E1] rounded-2xl p-6 md:p-8">
                    <ul className="space-y-4">
                      {summary.items.map((item) => (
                        <li key={item.label} className="text-[#4B4B4B] text-sm leading-relaxed">
                          <span className="text-[#101A2E] font-medium">{item.label} </span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sections */}
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 mb-14">
                    <h2
                      className="text-2xl md:text-3xl text-[#101A2E] mb-5"
                      style={{ fontFamily: "'Henry Trial', serif" }}
                    >
                      {section.heading}
                    </h2>
                    <Blocks blocks={section.blocks} />
                  </section>
                ))}

                {/* Contact */}
                <section id="contact" className="scroll-mt-28">
                  <h2
                    className="text-2xl md:text-3xl text-[#101A2E] mb-5"
                    style={{ fontFamily: "'Henry Trial', serif" }}
                  >
                    {contact.heading}
                  </h2>
                  <div className="bg-[#101A2E] rounded-2xl p-6 md:p-8 text-white">
                    <p className="text-sm mb-1">{contact.company}</p>
                    <p className="text-sm text-white/70 mb-4">{contact.address}</p>
                    <p className="text-sm mb-1">
                      <span className="text-white/50">Email: </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-[#D1903E] hover:underline"
                      >
                        {contact.email}
                      </a>
                    </p>
                    <p className="text-sm">
                      <span className="text-white/50">Web: </span>
                      <a href={contact.web} className="text-[#D1903E] hover:underline">
                        {contact.web}
                      </a>
                    </p>
                  </div>
                  <p className="text-[#4B4B4B] text-sm leading-relaxed mt-6">
                    {contact.accessibility}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
