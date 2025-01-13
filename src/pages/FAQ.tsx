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
    <section className="m-4 sm:mx-4 md:py-4 lg:mx-20">
      <div className="rounded-lg bg-white py-8">
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
  )
}
