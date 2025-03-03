"use client";
import Button from "@repo/ui/button";
import React, { useState } from "react";

export default function FAQ(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is MindSketch?",
      answer:
        "MindSketch is a collaborative platform that enables users to create, edit, and share diagrams in real-time. Our AI-powered text-to-diagram feature automatically converts your written descriptions into visual diagrams, saving you time and effort.",
    },
    {
      question: "How does real-time collaboration work?",
      answer:
        "Multiple users can join the same diagram workspace simultaneously. Changes made by any collaborator appear instantly for everyone, with color-coded cursors showing who's working where. MindSketch also includes a chat feature for direct communication while diagramming.",
    },
    {
      question: "What types of diagrams can I create with MindSketch?",
      answer:
        "MindSketch supports flowcharts, mind maps, UML diagrams, entity-relationship diagrams, network diagrams, Gantt charts, and more. Our intuitive interface makes it easy to create professional-looking diagrams regardless of your technical background.",
    },
    {
      question: "Tell me more about the AI text-to-diagram feature",
      answer:
        "Simply describe what you want in natural language, and our AI will generate a diagram based on your description. For example, type 'Create a flowchart for user registration process' and watch as MindSketch transforms your words into a structured visual diagram. You can then refine and customize the result.",
    },
    {
      question: "Can I use MindSketch offline?",
      answer:
        "MindSketch primarily works online to enable real-time collaboration. However, we offer a desktop application with limited offline functionality. Your work automatically syncs when you reconnect to the internet.",
    },
    {
      question: "What are the pricing plans for MindSketch?",
      answer:
        "MindSketch offers a free tier with basic features and limited collaborators. Our Professional plan includes unlimited diagrams, priority support, and advanced AI features. Enterprise solutions with custom integrations and dedicated support are also available. Visit our pricing page for current rates.",
    },
  ];

  return (
    <div className="min-h-screen text-gray-100 py-16 md:pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-br from-amethyst-200 to-amethyst-500 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400">
            Everything you need to know about MindSketch&apos;s collaborative
            diagramming platform
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 bg-opacity-50 backdrop-blur-sm transition-all duration-200 hover:border-amethyst-700"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium">{item.question}</span>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-royal-blue-400 transition-transform duration-200 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-gray-700 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950  animate-fadeIn">
                  <p className="mt-4 text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-amethyst-500/45 text-center">
          <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-br from-amethyst-200 to-amethyst-500 bg-clip-text text-transparent">
            Still have questions?
          </h2>
          <p className="text-gray-400 text-md mb-4">
            Our support team is just a message away. We&apos;re here to help you
            make the most of MindSketch.
          </p>
          <Button className="px-5 py-2 bg-gradient-to-br from-amethyst-400 to-royal-blue-600 rounded-md text-white font-medium hover:from-amethyst-700 hover:to-royal-blue-700 transition-all duration-200 shadow-lg hover:shadow-amethyst-900/30">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
