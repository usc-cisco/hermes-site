import { Accordion } from "@mantine/core"
import ReactMarkdown from "react-markdown"

import faqs from "../constants/faqs"
import { FAQs } from "../types/entities/FAQ"

export default function FAQ() {
  const items = faqs.map((item: FAQs) => (
    <Accordion.Item
      key={item.id}
      value={item.question}
      className="mt-4 w-full rounded-lg bg-white py-4 shadow-lg shadow-blue-200"
    >
      <Accordion.Control icon={item.icon} styles={{ label: { fontWeight: 600, fontSize: 18 } }}>
        {item.question}
      </Accordion.Control>
      <Accordion.Panel>
        <ReactMarkdown>{item.answer}</ReactMarkdown>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <section className="mx-4 sm:mx-4 lg:mx-20">
      <h1 className="text-center text-4xl font-bold leading-tight text-primary sm:text-4xl lg:text-6xl">
        Frequently Asked Questions
      </h1>
      <Accordion defaultValue="Apples" order={2} className="">
        {items}
      </Accordion>
    </section>
  )
}
