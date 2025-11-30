import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        },
      ]);

      if (error) {
        alert("DB 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      }, 3000);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-gray-900 mb-4"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
            }}
          >
            CONTACT US
          </h2>
          <p className="text-gray-600">
            새로운 프로젝트를 시작하고 싶으신가요?
            <br />
            언제든지 문의해주세요. 최선을 다해 답변드리겠습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <form onSubmit={handleSubmit} className="space-y-12 text-left">
            <div>
              <label htmlFor="name" className="block text-gray-900 mb-2">
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-900 mb-2">
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-900 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-900 mb-2">
                  회사명
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="회사명"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-900 mb-2">
                문의내용 *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                placeholder="프로젝트에 대해 자세히 설명해주세요"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-green-600"
            >
              {isSubmitted ? (
                <>
                  <span>✓</span>
                  <span>문의가 접수되었습니다</span>
                </>
              ) : (
                <>
                  <span>문의하기</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

