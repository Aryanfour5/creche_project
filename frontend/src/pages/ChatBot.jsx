import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom FAQ answers based on the website's business logic
  const faqAnswers = {
    "what are your nanny rates": "Our nanny rates vary depending on the experience and hours needed. Please contact us for personalised assistance.",
    "how do i book a nanny": "To book a nanny, simply select nanny based on profiles as per your preference. In case of any issues reach out to our customer care service and we’ll get back to you as soon as possible.",
    "do you have overnight nanny services": "Yes, we offer overnight nanny services for parents who need assistance during the night. Please provide your specific needs, and we will accommodate accordingly. You can reach out to us on our customer care service",
    "can the profiles of nannies be trusted": "Absolutely! All our nannies undergo thorough background checks, including references, criminal background, and child care experience verification.",
    "are your nannies verified": "Absolutely! All our nannies undergo thorough background checks, including references, criminal background, and child care experience verification.",
    "can i request a specific nanny": "Yes, you can request a specific nanny depending on your requirements. However, availability may depend on your timing and the nanny's schedule. Also in case of any inconvinience contact our customer support",
    "what if the nanny doesn’t work out": "If you're not satisfied with a nanny, we offer a replacement service or you can choose from other available nannies.",
    "do you provide baby care": "Yes, we provide specialized care for infants and toddlers, including feeding, diaper changing, and nap times.",
    "is there a trial period for nanny services": "We offer a trial period for our nanny services, allowing you to assess the fit before making a long-term commitment.",
    "where are you situated" : "We have our Headquarters at Pune, 411027",
    "what services do you provide": "We provide nanny services such as child care customised to your needs. We are also looking forward to incorporate more services like elder care in future.",
    "how can I hire a nanny": "You can hire a nanny by browsing through the nannies and selecting the best one as per your need or contacting us directly through the phone number or email address provided on our website.",
    "are your nannies certified": "Yes, all of our nannies are certified and have passed background checks.",
    "what is the cost of your services": "Our rates vary based on the services provided. Please contact us for a quote based on your needs.",
    "what areas do you serve": "We serve families in Pune, Mumbai, Delhi and Nagpur currently. Feel free to contact us for more details.",
    "how can i contact you": "Please refer to the contact details available on our website. You can email us at support@caringnanny.com or call or whatsapp message on +91 9991268863.",
    "how can i reach out to you": "Please refer to the contact details available on our website. You can email us at support@caringnanny.com or call or whatsapp message on +91 9991268863.",
    "there is an issue with the nanny i hired": "Please refer to the contact details available on our website. You can email us at support@caringnanny.com or call or whatsapp message on +91 9991268863.",
    "what is the minimum booking duration for a nanny": "Our minimum booking duration depends on the type of service. For part-time and occasional needs, the minimum booking is usually four hours. Please contact us to discuss your specific requirements.",
    "can i cancel a booking": "Yes, you can cancel a booking; however, we request that cancellations be made at least 24 hours in advance to avoid any cancellation fees. Please refer to our cancellation policy for more details.",
    "what if my child has special medical needs": "Our nannies are experienced in handling special needs. Please provide us with any specific information about your child's requirements so we can match you with a suitable caregiver.",
    "do you offer elder care services": "No, we currently do not offer elder care services. We are planning to incorporate it. We will update on the website when it is done",
    "how do you handle nanny-client confidentiality": "We take privacy seriously. All our nannies sign confidentiality agreements, ensuring that any personal information or family matters remain strictly confidential.",
    "what qualifications do your nannies have": "Our nannies are carefully selected for their qualifications and experience in childcare, including certifications in CPR and first aid. We prioritize safety and professional experience.",
    "do you offer any discounts for long-term bookings": "Yes, we offer discounts for long-term bookings and repeat clients. Contact us to discuss a custom plan that suits your needs.",
    "how do i provide feedback about my experience": "We value your feedback! You can share your experience via our website feedback form, or reach out directly to our customer service team.",
    "what is your refund policy": "Our refund policy varies depending on the booking and the reason for the refund. Please contact our customer service for specific cases or review our refund policy on the website.",
    "what is your caring nanny": "A platform connecting families with trusted nannies.",
    "how does the vetting proess work": "Through background checks and interviews.",
    "can i book part-time nanny": "Yes, based on your schedule and nanny's availability",
    "what is the cancellation policy": "Flexible cancellation with advance notice.",
    "how do i contact customefr support": "Available 24/7 via website or helpline."
  };

  // Function to generate answer from the API
  async function generateAnswer() {
    if (!question.trim()) return; // Prevent empty submissions
    setAnswer("Loading...");
    setLoading(true);

    // First check if the question matches any FAQ answers
    const lowerCaseQuestion = question.trim().toLowerCase().replace(/\?$/, "");
    if (faqAnswers[lowerCaseQuestion]) {
      setAnswer(faqAnswers[lowerCaseQuestion]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA961mUiK07jV8Bz6Ta9V0DH6tD531Mwe0",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      
      // Process and format the answer from the API
      let rawAnswer = response.data.candidates[0].content.parts[0].text;
      
      // Clean up the answer to remove any unwanted formatting (like **)
      rawAnswer = rawAnswer.replace(/\*\*/g, '');  // Remove ** if present
      rawAnswer = rawAnswer.replace(/\n/g, '<br />'); // Optional: Replace newlines for HTML rendering

      // Replace * (bullet points) with • or any other symbol
      rawAnswer = rawAnswer.replace(/\*/g, '•'); // Replace all * with bullet points (•)
      
      // Optionally, you can add custom logic here to make answers more relevant to nanny management
      if (rawAnswer.toLowerCase().includes("nanny")) {
        rawAnswer = `👶 Nanny Info: ${rawAnswer}`;
      } else if (rawAnswer.toLowerCase().includes("baby")) {
        rawAnswer = `🍼 Baby Care Tip: ${rawAnswer}`;
      } else if (rawAnswer.toLowerCase().includes("website") || rawAnswer.toLowerCase().includes("help") || rawAnswer.toLowerCase().includes("issue")) {
        rawAnswer = `💻 Website Support: ${rawAnswer}`;
      }

      setAnswer(rawAnswer);
    } catch (error) {
      setAnswer("Sorry, something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-2xl p-6 space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Caring Nanny Assistant</h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">💡</span> General knowledge
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🔧</span> Nanny-related questions
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">📝</span> Booking inquiries
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🤔</span> Advice for parents
          </div>
          {/* Add more categories if needed */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">👨‍👩‍👧‍👦</span> Family-related queries
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">💼</span> Nanny careers
          </div>
        </div>

        {/* Display question and answer */}
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-gray-700">Your Question:</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              rows="3"
              className="p-4 w-full text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Answer:</p>
            <div className="bg-gray-200 p-4 rounded-lg max-h-72 overflow-y-auto">
              {loading ? (
                <p className="text-gray-500">Generating...</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: answer || "Ask a question to get an answer!" }} />
              )}
            </div>
          </div>
        </div>

        {/* Send button */}
        <div>
          <button
            onClick={generateAnswer}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white transition-all`}
          >
            {loading ? "Generating..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
