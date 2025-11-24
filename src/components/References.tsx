import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 1,
    title: "롯데렌터카 마이카세이브 중고렌트 서비스",
    category: "기획 / 개발",
    client: "롯데렌터카",
    image:
      "https://mycarsave.lotterentacar.net/images/common/logo.png",
    description:
      "롯데렌터카 마이카세이브 웹사이트 및 중고렌트 시스템 구축",
    year: "2024",
    services: ["서비스기획", "웹디자인", "웹개발"],
    details:
      "국내 최대 렌터카 회사인 롯데렌터카의 중고렌터카 마켓 및 관리 시스템을 구축하였습니다.",
    challenges:
      "본 과제는 롯데렌터카의 기존 신차렌트서비스를 벗어나 중고렌터카 서비스로의 확장을 준비하기위한 기획 및 개발을 진행하였습니다.",
    results:
      "런칭 후 3개월 내 방문자 수 250% 증가, 중고렌트 판매량 극대화",
  },
  {
    id: 2,
    title: "Kt Alpha 공정추첨기 구축",
    category: "기획 / 개발 / 디자인",
    client: "Kt Alpha",
    image:
      "https://pimg.mk.co.kr/news/cms/202511/21/news-p.v1.20251121.e8f649a2d7e34d8f9b74c610dc9af08f_P1.jpg",
    description: "케이티 알파의 이벤트 추첨 서비스 신규구축",
    year: "2025",
    services: ["UI/UX 디자인", "프론트엔드", "백엔드"],
    details:
      "기프티쇼비즈 내 기업 회원을 대상으로한 이벤트 추첨 서비스 구축",
    challenges:
      "이벤트 추첨을 통해 비즈 회원들의 다양한 콘텐츠 제공 및 당첨자대상 기프티콘 판매연계까지 확장 준비",
    results: "",
  },
  {
    id: 3,
    title: "롯데렌터카 티카 중고차 판매 서비스",
    category: "기획 / 개발 / 디자인 / SAP",
    client: "Corporate",
    image:
      "https://daily.hankooki.com/news/photo/202505/1214434_1418515_3343.jpg",
    description:
      "롯데렌터카의 신규 중고차 서비스에 대한 기획 및 개발",
    year: "2025",
    services: ["전략 기획", "웹디자인", "서비스 개발", "SAP"],
    details:
      "렌트 기반 회사의 매매 프로세스 및 채널 구축을 통해서 중고차 판매에 대한 전체 프로세스 개발",
    challenges:
      "원활한 서비스 구축을 통해 소매판매 프로세스 완성",
    results: "중고차 판매 서비스 개시 및 판매량 확대",
  },
  {
    id: 4,
    title: "도이치 오토월드 입출차 관제 시스템",
    category: "기획 / 개발",
    client: "도이치모터스",
    image:
      "https://m.suwonautoworld.co.kr/assets/admin/images/logo/93/og_logo.jpg",
    description:
      "매매상사 단지관제 시스템 및 차량 입출차, 성능, 사진 관리 시스템",
    year: "2022",
    services: ["서비스 리서치", "UI 디자인", "Project Manage"],
    details:
      "중고차 매매단지에서 필요한 모든 시스템을 하나로 모아 서비스",
    challenges:
      "서비스를 통해 주차관제에서 부터 단지관리, 입주매매상사, 성능점검, 사진관리 등 모든 시스템 연계관리",
    results: "",
  },
  {
    id: 5,
    title: "SK렌터카 차세대 빌링시스템",
    category: "기획 / 디자인 / 개발",
    client: "Tech Startup",
    image:
      "https://dtd31o1ybbmk8.cloudfront.net/photos/bc17d2bab252bb53440fecf76079a1b5/thumb.png",
    description:
      "SK렌터카의 차세대 빌링시스템 및 채널서비스 개발",
    year: "2023",
    services: [
      "시스템 구축 전략",
      "어드민 화면 기획/디자인",
      "시스템 개발",
    ],
    details:
      "SK렌터카의 차세대 영업시스템 구축 프로젝트 내 빌링/RM 서비스에 대한 분석 설계 및 개발을 담당",
    challenges:
      "사용성이 편리한 차세대 영업시스템 내 빌링 시스템 구축",
    results: "",
  },
  {
    id: 6,
    title: "goodoc 브랜드 웹사이트",
    category: "개발 / 반응형웹",
    client: "굿닥",
    image:
      "https://d32gkk464bsqbe.cloudfront.net/PlNQ94d-EGjOYZ0z-Jd5LzU_XfM=/800x0/photos/o/f530b1d6f552023a6277e3eee251c7c9b4e01c89.png",
    description:
      "굿닥의 전반적인 서비스소개 및 브랜드 소개를 위한 웹페이지 제작",
    year: "2023",
    services: ["시스템개발", "FRONT", "REACT"],
    details:
      "굿닥의 서비스를 소개하고 서비스의 강점 및 영상을 통해 전체적인 서비스를 한눈에 확인 가능하도록 구성",
    challenges: "전체적인 서비스의 내용을 함축하여 브랜드 사이트 하나에서 확인",
    results: "goodoc.io",
  },
];

const categories = ["전체", "개발", "기획", "디자인", "모바일"];

export function References() {
  const [selectedCategory, setSelectedCategory] =
    useState("전체");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filteredProjects =
    selectedCategory === "전체"
      ? projects
      : projects.filter((project) =>
          project.category.includes(
            selectedCategory === "웹사이트"
              ? "웹사이트"
              : selectedCategory,
          ),
        );

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

  return (
    <section
      id="references"
      className="py-32 bg-gray-50 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Creative Title */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7"
          >
            <h2
              className="text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-gray-900"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Our
            </h2>
            <h2
              className="text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-blue-600"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              portfolio
            </h2>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 flex items-end"
          >
            <div className="border-l-2 border-gray-300 pl-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                다양한 산업군의 클라이언트와 함께한 성공적인 프로젝트를 소개합니다
              </p>
            </div>
          </motion.div> */}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex items-center gap-2 text-white">
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      View Project
                    </span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div
                  className="text-blue-600 mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {project.category}
                </div>
                <h3 className="text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <X size={24} />
                </button>
                <div className="h-96 overflow-hidden">
                  <ImageWithFallback
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-blue-600"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {selectedProject.year}
                  </span>
                </div>

                <h2 className="text-gray-900 mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-gray-900 mb-3">서비스</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map(
                      (service, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full"
                        >
                          {service}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-900 mb-3">
                    프로젝트 개요
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-900 mb-3">
                    주요 과제
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="text-gray-900 mb-3">성과</h4>
                  <p className="text-gray-700">
                    {selectedProject.results}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}