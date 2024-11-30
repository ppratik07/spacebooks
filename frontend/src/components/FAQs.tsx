import React, { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is desk booking?",
      answer:
        "Desk sharing, also known as desk booking, is a concept in which workplaces, parking spaces, or other resources in the company are no longer permanently allocated to employees. Desk sharing software is used to organize these resources via the booking system.",
    },
    {
      question: "How do you organize desk booking?",
      answer:
        "You can organize desk booking by using a centralized software system that enables users to check availability and reserve desks based on their requirements.",
    },
    {
      question: "How does desk booking work?",
      answer:
        "Desk booking works by allowing users to reserve desks in advance through a software interface. Administrators can track desk utilization and optimize space.",
    },
    {
        question: "What is a desk sharing workplace?",
        answer:
          "A desk sharing workplace, also known as a shared desk or hot desk, is not just assigned to one permanent employee. The flexible workstation is available to every employee in the company and can be booked via desk sharing software",
      },
  ];

  const toggleFAQ = (index: number): void => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-6">
          SpaceBooks  – FAQs and Answers
        </h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4 px-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-gray-600">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
