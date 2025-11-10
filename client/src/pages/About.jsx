import { useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import { Target, Eye, Award, X } from 'lucide-react'

const About = () => {
  const [showHODModal, setShowHODModal] = useState(false)
  
  const programOutcomes = [
    'Apply knowledge of mathematics, science, and engineering',
    'Design and conduct experiments, analyze and interpret data',
    'Design systems to meet desired needs within realistic constraints',
    'Function effectively on multi-disciplinary teams',
    'Identify, formulate, and solve engineering problems',
    'Understand professional and ethical responsibility',
  ]
  
  const hodMessage = `Dear Students,

Welcome to the Department of Computer Science & Engineering at PESITM!

It gives me immense pleasure to lead a department that has been at the forefront of technological innovation and academic excellence since its inception in 2007. Our mission is not just to impart knowledge but to nurture future leaders who will shape the digital world.

The field of Computer Science is evolving at an unprecedented pace. From Artificial Intelligence and Machine Learning to Cybersecurity and Cloud Computing, the opportunities are boundless. Our curriculum is designed to keep pace with these advancements while building strong fundamentals that will serve you throughout your career.

I encourage each one of you to make the most of the state-of-the-art facilities, experienced faculty, and industry collaborations we offer. Participate actively in research projects, coding competitions, and technical workshops. Remember, your success is our success.

As you embark on this exciting journey, always stay curious, embrace challenges, and never stop learning. The future belongs to those who innovate and adapt.

Wishing you all the very best in your academic pursuits!

Warm regards,
Dr. Prasanna Kumar H R
Professor & Head of Department
Computer Science & Engineering`

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-pesitm-blue to-blue-900 text-white py-16">
        <div className="container-custom">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About CSE Department</h1>
            <p className="text-xl text-gray-200">Excellence in Computing Education</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The Department of Computer Science & Engineering was established in 2007 and aimed to fulfil 
                the demands of the software industry. The department offers high-quality technical education 
                to its students with the help of its state-of-the-art computing facilities and by keeping pace 
                with the latest technological developments.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Computer Science and Engineering course integrates principles from computer science, covering 
                programming, data structures, algorithms, computer architecture, and software development. It 
                also includes advanced topics like AI, cybersecurity, and networking, preparing students for 
                diverse careers in technology.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The students undergo in-house training, which includes advanced, skill enhancement and industrial 
                training, bridging the gap between industry and academia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The Computer Science & Engineering program is accredited by the National Board of Accreditation (NBA) 
                for three years from 2024 to 2027.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="card bg-white text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-pesitm-blue rounded-full">
                    <Eye size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-pesitm-blue mb-4">Vision</h3>
                <p className="text-gray-700">
                  To be a center of excellence in computer science education and research, 
                  producing skilled professionals who contribute to technological advancement 
                  and societal development.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="card bg-white text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-pesitm-blue rounded-full">
                    <Target size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-pesitm-blue mb-4">Mission</h3>
                <p className="text-gray-700">
                  To provide quality education through innovative teaching methodologies, 
                  foster research culture, promote industry-academia collaboration, and 
                  develop ethical professionals ready for global challenges.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="card bg-white text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-pesitm-blue rounded-full">
                    <Award size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-pesitm-blue mb-4">Core Values</h3>
                <p className="text-gray-700">
                  Excellence in education, integrity in conduct, innovation in approach, 
                  inclusivity in practice, and commitment to continuous improvement and 
                  lifelong learning.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Salient Features */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-12">Salient Features</h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatedSection>
              <div className="prose max-w-none">
                <ul className="list-disc space-y-4 text-lg text-gray-700">
                  <li>
                    Equipped with advanced infrastructure and computing facilities to support practical learning, 
                    including laboratories that enhance students' practical expertise.
                  </li>
                  <li>
                    Industry Collaboration: MoUs with Haegl Technologies and Sulonya Technologies have led to 
                    the establishment of a Centre of Excellence in Data Science on campus, along with regular 
                    technical talks and workshops.
                  </li>
                  <li>
                    Regular workshops and short-term training programs (STTPs) are conducted.
                  </li>
                  <li>
                    Active interaction between students and professors enriches the educational experience.
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Department Head */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-12">Head of Department</h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div 
                className="card bg-white flex flex-col md:flex-row items-center gap-8 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowHODModal(true)}
              >
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src="/hod.jpg" 
                    alt="Dr. Prasanna Kumar H R" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-pesitm-blue mb-2">Dr. Prasanna Kumar H R</h3>
                  <p className="text-lg text-gray-600 mb-4">Professor & Head of Department</p>
                  <p className="text-gray-700 leading-relaxed">
                    Dr. Prasanna Kumar H R brings extensive experience in computer science education and research. 
                    Under his leadership, the department has achieved significant milestones in academic 
                    excellence, research publications, and industry collaborations.
                  </p>
                  <p className="text-sm text-pesitm-blue font-semibold mt-4">Click to read message from HOD →</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HOD Message Modal */}
      {showHODModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHODModal(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-pesitm-blue to-blue-900 text-white p-6 rounded-t-lg flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Message from HOD</h2>
                <p className="text-sm text-gray-200 mt-1">Dr. Prasanna Kumar H R</p>
              </div>
              <button 
                onClick={() => setShowHODModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden mx-auto md:mx-0">
                  <img 
                    src="/hod.jpg" 
                    alt="Dr. Prasanna Kumar H R" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-pesitm-blue mb-1">Dr. Prasanna Kumar H R</h3>
                  <p className="text-gray-600 mb-2">Professor & Head of Department</p>
                  <p className="text-sm text-gray-500">Computer Science & Engineering</p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {hodMessage}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowHODModal(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
