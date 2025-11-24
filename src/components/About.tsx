import React from "react";
import {
  Lightbulb,
  Palette,
  Code,
  TrendingUp,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const services = [
  {
    icon: Lightbulb,
    title: "전략 컨설팅",
    description:
      "브랜드 분석과 시장 조사를 통해 최적의 디지털 전략을 수립합니다.",
  },
  {
    icon: Palette,
    title: "UI/UX 디자인",
    description:
      "사용자 중심의 직관적이고 아름다운 인터페이스를 디자인합니다.",
  },
  {
    icon: Code,
    title: "웹 개발",
    description:
      "최신 기술 스택으로 안정적이고 확장 가능한 웹 서비스를 구축합니다.",
  },
  {
    icon: TrendingUp,
    title: "그로스 마케팅",
    description:
      "데이터 기반 분석으로 지속적인 성장을 지원합니다.",
  },
];

const team = [
  {
    name: "김서연",
    role: "CEO & Strategy Director",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNjczMDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "15년 경력의 디지털 전략 전문가",
  },
  {
    name: "박준혁",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1598268012815-ae21095df31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM3MDQ1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "국내외 수상 경력 디자이너",
  },
  {
    name: "이지은",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1704918604737-6a42eacee2d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNyZWF0aXZlfGVufDF8fHx8MTc2MzcwNDU0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "UI/UX 디자인 스페셜리스트",
  },
  {
    name: "최민수",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1760346546771-a81d986459ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjM2MDYyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "풀스택 개발 전문가",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function About() {
  return (
    <section
      id="about"
      className="py-32 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Creative Title Section */}
        <div className="grid grid-cols-12 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-8"
          >
            <h2
              className="text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-gray-900 mb-0"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              We create
            </h2>
            <h2
              className="text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-gray-900"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              digital
            </h2>
            <h2
              className="text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-blue-600"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              excellence
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 flex items-end"
          >
            {/* <div className="border-l-2 border-gray-300 pl-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                RION은 혁신적인 사고와 창의적인 솔루션으로 고객의 비즈니스 성공을 이끌어내는 디지털 에이전시입니다.
              </p>
            </div> */}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Icon
                    className="text-blue-600 group-hover:text-white transition-colors"
                    size={28}
                  />
                </div>
                <h3 className="text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-16 text-white mb-32 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-4xl">
            <h3
              className="text-4xl mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              We Are
            </h3>
            <p className="text-xl leading-relaxed text-white/90">
              단순히 웹사이트를 만드는 것이 아닌, 브랜드의
              이야기를 전달하고 사용자에게 가치 있는 경험을
              제공하는 것이 우리의 목표입니다. 끊임없는 혁신과
              도전으로 고객과 함께 성장하며, 디지털 시장에서
              새로운 기준을 만들어갑니다.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </motion.div>

        {/* Team Section */}
        {/* 팀소개 관련내용은 잠시 주석처리 */}
        {/* <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12"
          >
            <h2
              className="text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-none text-gray-900 mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Meet our
            </h2>
            <h2
              className="text-[3rem] sm:text-[4rem] lg:text-[5rem] leading-none text-gray-900"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              creative team
            </h2>
          </motion.div>
        </div> */}
        {/* 
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-gray-900 mb-1">
                {member.name}
              </h4>
              <div
                className="text-blue-600 mb-2"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                }}
              >
                {member.role}
              </div>
              <p className="text-gray-600">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}