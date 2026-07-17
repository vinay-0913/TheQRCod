"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline border-t border-b border-hairline">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              className="flex w-full items-center justify-between py-5 px-1 text-left cursor-pointer group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-trigger-${index}`}
            >
              <span className="text-base font-medium text-ink pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-mute shrink-0 transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
              className={`overflow-hidden transition-all duration-200 ease-out ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-body-mid px-1 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
