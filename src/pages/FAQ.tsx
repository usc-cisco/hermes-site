import { Accordion } from "@mantine/core"
import ReactMarkdown from "react-markdown"

import faqs from "../types/constants/faqs"
import { FAQs } from "../types/entities/FAQ"

export default function FAQ() {
  const items = faqs.map((item: FAQs) => (
    <Accordion.Item key={item.id} value={item.question} className="w-full bg-white py-4">
      <Accordion.Control styles={{ label: { fontWeight: 600, fontSize: 18, paddingBottom: 0 } }}>
        {item.question}
      </Accordion.Control>
      <Accordion.Panel className="text-lg text-gray-700">
        <ReactMarkdown>{item.answer}</ReactMarkdown>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <div className="relative min-h-screen bg-white">
      {/* Repeating logo background pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-[drift_8s_linear_infinite] opacity-[0.05]"
        style={{
          backgroundImage: "url('/logo-primary.svg')",
          backgroundSize: "150px 150px",
          backgroundRepeat: "repeat",
          willChange: "background-position",
        }}
      />
      <style>
        {`
          @keyframes drift {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 150px -150px;
            }
          }
        `}
      </style>
      <section className="relative z-10 m-4 sm:mx-4 md:py-4 lg:mx-20">
        <div className="rounded-xl bg-white py-8 shadow-lg">
          <h1 className="py-2 text-center text-6xl font-bold leading-tight">FAQs</h1>
          <Accordion
            styles={{
              root: {
                paddingInline: "30px",
                borderRadius: "12px",
                overflow: "hidden",
              },
            }}
          >
            {items}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
