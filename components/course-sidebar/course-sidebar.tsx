import React from 'react'

interface SectionProps {
  name: string
  active: boolean
  description: string
}

interface CourseProps {
  name: string
  progress: number
  sections: SectionProps[]
}

interface SidebarProps {
  courses: CourseProps[]
}

const CourseSidebar: React.FC<SidebarProps> = ({courses}) => {
  return (
    <div className="w-1/4 bg-white rounded shadow-lg p-5">
      <h2 className="font-semibold text-xl mb-4">Courses</h2>
      {courses.map((course) => (
        <div key={course.name} className="mb-4">
          <div className="font-medium text-lg mb-2">
            {course.name}{' '}
            <span className="text-sm text-gray-500">({course.progress}% complete)</span>
          </div>
          <div className="w-full h-2 bg-gray-300 mb-4">
            <div className="h-2 bg-blue-500" style={{width: `${course.progress}%`}}></div>
          </div>
          <div className="pl-4">
            {course.sections.map((section) => (
              <div key={section.name}>
                <div
                  className={`font-medium text-base mt-2 ${
                    section.active ? 'text-blue-500' : ''
                  }`}
                >
                  {section.name}
                </div>
                {section.active && (
                  <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseSidebar
