import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 처리 (실제 구현 시 API 연동)
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white"></section>
    // <section id="contact" className="py-24 bg-white">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       viewport={{ once: true }}
    //       transition={{ duration: 0.6 }}
    //       className="text-center mb-16"
    //     >
    //       <h2
    //         className="text-gray-900 mb-4"
    //         style={{
    //           fontFamily: "Montserrat, sans-serif",
    //           fontWeight: 800,
    //         }}
    //       >
    //         CONTACT US
    //       </h2>
    //       <p className="text-gray-600">
    //         새로운 프로젝트를 시작하고 싶으신가요?
    //         <br />
    //         언제든지 문의해주세요. 최선을 다해 답변드리겠습니다.
    //       </p>
    //     </motion.div>

    //     <div className="grid lg:grid-cols-2 gap-12">
    //       {/* Contact Info */}
    //       {/* <motion.div
    //         initial={{ opacity: 0, x: -20 }}
    //         whileInView={{ opacity: 1, x: 0 }}
    //         viewport={{ once: true }}
    //         transition={{ duration: 0.6 }}
    //       >
    //         <h3 className="text-gray-900 mb-8">Get in Touch</h3>

    //         <div className="space-y-6 mb-12">
    //           <div className="flex items-start gap-4">
    //             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
    //               <Mail className="text-blue-600" size={24} />
    //             </div>
    //             <div>
    //               <div className="text-gray-900 mb-1">Email</div>
    //               <a
    //                 href="mailto:contact@rion.agency"
    //                 className="text-gray-600 hover:text-blue-600 transition-colors"
    //               >
    //                 contact@rion.agency
    //               </a>
    //             </div>
    //           </div>

    //           <div className="flex items-start gap-4">
    //             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
    //               <Phone className="text-blue-600" size={24} />
    //             </div>
    //             <div>
    //               <div className="text-gray-900 mb-1">Phone</div>
    //               <a
    //                 href="tel:+82212345678"
    //                 className="text-gray-600 hover:text-blue-600 transition-colors"
    //               >
    //                 +82 2-1234-5678
    //               </a>
    //             </div>
    //           </div>

    //           <div className="flex items-start gap-4">
    //             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
    //               <MapPin className="text-blue-600" size={24} />
    //             </div>
    //             <div>
    //               <div className="text-gray-900 mb-1">Address</div>
    //               <p className="text-gray-600">
    //                 서울특별시 강남구 테헤란로 123
    //                 <br />
    //                 RION Tower 15F
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
    //           <h4 className="text-gray-900 mb-3">영업시간</h4>
    //           <div className="space-y-2 text-gray-600">
    //             <p>평일: 09:00 - 18:00</p>
    //             <p>토요일: 10:00 - 14:00</p>
    //             <p>일요일 및 공휴일: 휴무</p>
    //           </div>
    //         </div>
    //       </motion.div> */}

    //       {/* Contact Form */}
    //       <motion.div
    //         initial={{ opacity: 0, x: 20 }}
    //         whileInView={{ opacity: 1, x: 0 }}
    //         viewport={{ once: true }}
    //         transition={{ duration: 0.6 }}
    //       >
    //         <form
    //           onSubmit={handleSubmit}
    //           className="space-y-12"
    //         >
    //           <div>
    //             <label
    //               htmlFor="name"
    //               className="block text-gray-900 mb-2"
    //             >
    //               이름 *
    //             </label>
    //             <input
    //               type="text"
    //               id="name"
    //               name="name"
    //               required
    //               value={formData.name}
    //               onChange={handleChange}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //               placeholder="홍길동"
    //             />
    //           </div>

    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block text-gray-900 mb-2"
    //             >
    //               이메일 *
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               name="email"
    //               required
    //               value={formData.email}
    //               onChange={handleChange}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //               placeholder="email@example.com"
    //             />
    //           </div>

    //           <div className="grid sm:grid-cols-2 gap-6">
    //             <div>
    //               <label
    //                 htmlFor="phone"
    //                 className="block text-gray-900 mb-2"
    //               >
    //                 연락처
    //               </label>
    //               <input
    //                 type="tel"
    //                 id="phone"
    //                 name="phone"
    //                 value={formData.phone}
    //                 onChange={handleChange}
    //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //                 placeholder="010-1234-5678"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="company"
    //                 className="block text-gray-900 mb-2"
    //               >
    //                 회사명
    //               </label>
    //               <input
    //                 type="text"
    //                 id="company"
    //                 name="company"
    //                 value={formData.company}
    //                 onChange={handleChange}
    //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //                 placeholder="회사명"
    //               />
    //             </div>
    //           </div>

    //           <div>
    //             <label
    //               htmlFor="message"
    //               className="block text-gray-900 mb-2"
    //             >
    //               문의내용 *
    //             </label>
    //             <textarea
    //               id="message"
    //               name="message"
    //               required
    //               rows={6}
    //               value={formData.message}
    //               onChange={handleChange}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
    //               placeholder="프로젝트에 대해 자세히 설명해��세요"
    //             />
    //           </div>

    //           <button
    //             type="submit"
    //             disabled={isSubmitted}
    //             className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-green-600"
    //           >
    //             {isSubmitted ? (
    //               <>
    //                 <span>✓</span>
    //                 <span>문의가 접수되었습니다</span>
    //               </>
    //             ) : (
    //               <>
    //                 <span>문의하기</span>
    //                 <Send size={20} />
    //               </>
    //             )}
    //           </button>
    //         </form>
    //       </motion.div>
    //     </div>
    //   </div>
    // </section>
  );
}