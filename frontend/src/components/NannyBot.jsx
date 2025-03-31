import React, { useState, useRef } from 'react';
import { Send, MessageCircle, X, Loader } from 'lucide-react';

const NannyBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const nannyKeywords = ["baby", "nanny", "childcare", "children", "infant", "toddler"];

  const faqAnswers = {
    // Previous FAQ entries...
    "what are your nanny rates": "Our nanny rates vary depending on the experience and hours needed. Please contact us for personalized assistance.",
    "how do i book a nanny": "To book a nanny, follow these steps:\n1. Visit our website at www.caringnanny.com\n2. Browse available nannies in your area\n3. Select your preferred nanny\n4. Choose your required time slots\n5. Complete the booking process\n\nFor assistance, contact our support team at support@caringnanny.com",
    "what are your nanny rates": "Our nanny rates vary depending on the experience and hours needed. Please contact us for personalized assistance.",
    "how do i book a nanny": "To book a nanny, simply select a nanny based on profiles as per your preference. In case of any issues, reach out to our customer care service, and we’ll get back to you as soon as possible.",
    "do you have overnight nanny services": "Yes, we offer overnight nanny services for parents who need assistance during the night. Please provide your specific needs, and we will accommodate accordingly. You can reach out to us on our customer care service.",
    "can the profiles of nannies be trusted": "Absolutely! All our nannies undergo thorough background checks, including references, criminal background, and child care experience verification.",
    "are your nannies verified": "Absolutely! All our nannies undergo thorough background checks, including references, criminal background, and child care experience verification.",
    "can i request a specific nanny": "Yes, you can request a specific nanny depending on your requirements. However, availability may depend on your timing and the nanny's schedule. In case of any inconvenience, contact our customer support.",
    "what if the nanny doesn’t work out": "If you're not satisfied with a nanny, we offer a replacement service or you can choose from other available nannies.",
    "do you provide baby care": "Yes, we provide specialized care for infants and toddlers, including feeding, diaper changing, and nap times.",
    "is there a trial period for nanny services": "We offer a trial period for our nanny services, allowing you to assess the fit before making a long-term commitment.",
    "where are you situated": "We have our Headquarters at Pune, 411027.",
    "what services do you provide": "We provide nanny services such as child care customized to your needs. We are also looking forward to incorporating more services like elder care in the future.",
    "how can I hire a nanny": "You can hire a nanny by browsing through the nannies and selecting the best one as per your needs, or contacting us directly through the phone number or email address provided on our website.",
    "are your nannies certified": "Yes, all of our nannies are certified and have passed background checks.",
    "what is the cost of your services": "Our rates vary based on the services provided. Please contact us for a quote based on your needs.",
    "what areas do you serve": "We serve families in Pune, Mumbai, Delhi, and Nagpur currently. Feel free to contact us for more details.",
    "how can i contact you": "Please refer to the contact details available on our website. You can email us at support@caringnanny.com or call or WhatsApp us at +91 9991268863.",
    "there is an issue with the nanny i hired": "Please refer to the contact details available on our website. You can email us at support@caringnanny.com or call or WhatsApp us at +91 9991268863.",
    "what is the minimum booking duration for a nanny": "Our minimum booking duration depends on the type of service. For part-time and occasional needs, the minimum booking is usually four hours. Please contact us to discuss your specific requirements.",
    "can i cancel a booking": "Yes, you can cancel a booking; however, we request that cancellations be made at least 24 hours in advance to avoid any cancellation fees. Please refer to our cancellation policy for more details.",
    "what if my child has special medical needs": "Our nannies are experienced in handling special needs. Please provide us with any specific information about your child's requirements so we can match you with a suitable caregiver.",
    "how do you handle nanny-client confidentiality": "We take privacy seriously. All our nannies sign confidentiality agreements, ensuring that any personal information or family matters remain strictly confidential.",
    "what qualifications do your nannies have": "Our nannies are carefully selected for their qualifications and experience in childcare, including certifications in CPR and first aid. We prioritize safety and professional experience.",
    "do you offer any discounts for long-term bookings": "Yes, we offer discounts for long-term bookings and repeat clients. Contact us to discuss a custom plan that suits your needs.",
    "how do i provide feedback about my experience": "We value your feedback! You can share your experience via our website feedback form, or reach out directly to our customer service team.",
    "what is your refund policy": "Our refund policy varies depending on the booking and the reason for the refund. Please contact our customer service for specific cases or review our refund policy on the website.",
    "what is your caring nanny": "A platform connecting families with trusted nannies.",
    "how does the vetting process work": "Through background checks and interviews.",
    "can i book part-time nanny": "Yes, based on your schedule and the nanny's availability.",
    "what is the cancellation policy": "Flexible cancellation with advance notice.",
    "how do i contact customer support": "Available 24/7 via website or helpline.",
    
    // New keyword-based FAQ entries
    "baby": "We provide specialized baby care services including feeding, diaper changing, and creating age-appropriate activities. Our nannies are trained in infant care and safety protocols.",
    "infant": "Our infant care services include:\n• Feeding and nutrition support\n• Sleep schedule management\n• Diaper changing\n• Age-appropriate activities\n• Basic health monitoring\n\nVisit our website to find experienced infant care specialists.",
    "toddler": "Our toddler care services include:\n• Educational activities\n• Potty training assistance\n• Meal preparation\n• Outdoor activities\n• Basic learning activities\n\nBook a toddler-specialized nanny through our website.",
    "childcare": "We offer comprehensive childcare services including:\n• Full-time and part-time care\n• After-school care\n• Educational support\n• Activity planning\n• Meal preparation\n\nVisit www.caringnanny.com to explore our services.",
    "find nanny": "To find the perfect nanny:\n1. Visit www.caringnanny.com\n2. Use our search filters for:\n   - Experience level\n   - Availability\n   - Special skills\n   - Location\n3. Review profiles and ratings\n4. Schedule interviews\n\nNeed help? Contact our matching specialists!",
    "book nanny": "Ready to book a nanny? Here's how:\n1. Go to www.caringnanny.com\n2. Select 'Book Now'\n3. Choose your preferences:\n   - Date and time\n   - Duration\n   - Special requirements\n4. Select available nanny\n5. Confirm booking\n\nNeed assistance? Call us at +91 9991268863",
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', content: text }]);
    setMessage('');
    setIsLoading(true);

    const lowerCaseQuestion = text.toLowerCase();

    // Check for exact FAQ matches first
    let reply = faqAnswers[lowerCaseQuestion];

    // If no exact match, check for keywords
    if (!reply) {
      const foundKeyword = nannyKeywords.find(keyword => lowerCaseQuestion.includes(keyword));
      if (foundKeyword) {
        reply = faqAnswers[foundKeyword];
      }
    }

    // Check for booking/finding related queries
    if (!reply && (lowerCaseQuestion.includes("find") || lowerCaseQuestion.includes("book"))) {
      if (lowerCaseQuestion.includes("find")) {
        reply = faqAnswers["find nanny"];
      } else if (lowerCaseQuestion.includes("book")) {
        reply = faqAnswers["book nanny"];
      }
    }

    // Default response if no matches found
    if (!reply) {
      reply = "👋 Hello! I'm your caring nanny assistant. I can help you with:\n\n• Finding and booking nannies\n• Understanding care services\n• Answering questions about nanny availability\n\nPlease visit www.caringnanny.com or contact us at support@caringnanny.com for more information!";
    }

    setMessages((prev) => [...prev, { type: 'bot', content: reply }]);
    setIsLoading(false);
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.type === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isUser && (
          <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center text-white text-sm mr-2">
            A
          </div>
        )}
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser ? 'bg-indigo-700 text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50">
      <div className="bg-indigo-700 p-4 rounded-t-lg flex justify-between items-center">
        <div className="text-white">
          <h2 className="font-semibold">Caring Nanny Assistant</h2>
          <p className="text-sm opacity-75">Here to assist with nanny services</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-indigo-700 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center text-white text-sm mr-2">
              B
            </div>
            <div className="max-w-[80%] bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(message)}
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={() => handleSendMessage(message)}
          className="ml-2 bg-indigo-700 text-white rounded-full p-2"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NannyBot;