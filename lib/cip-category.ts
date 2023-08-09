import { slugify } from '@/lib/slugify'

type CIPCategorySansSlug = {
  title: string
  codes: string[]
}

export type CIPCategory = CIPCategorySansSlug & {
  slug: string
}

const CIP_CATEGORIES_SANS_SLUG: CIPCategorySansSlug[] = [
  {
    title: 'Sciences and Mathematics',
    codes: ['01', '03', '26', '27', '40', '42'],
  },
  {
    title: 'Engineering and Technology',
    codes: ['11', '14', '15', '29', '41'],
  },
  {
    title: 'Arts, Literature, and Communication',
    codes: ['04', '05', '09', '10', '23', '50', '54', '55'],
  },
  {
    // Social Sciences, Legal, and Public Administration
    title: 'Social Sciences, Legal, and Admin',
    codes: ['22', '43', '44', '45'],
  },
  {
    title: 'Personal Services, Health, and Safety',
    codes: ['12', '13', '31', '32', '33', '34', '35', '36', '37', '39', '51'],
  },
  {
    title: 'Business and Management',
    codes: ['52'],
  },
  {
    title: 'Interdisciplinary and Miscellaneous',
    codes: ['16', '19', '24', '25', '30', '46', '47', '48', '49', '60'],
  },
]

export const CIP_CATEGORIES: CIPCategory[] = CIP_CATEGORIES_SANS_SLUG.map((category) => ({
  ...category,
  slug: slugify(category.title),
}))

// // type DeweyCategory = {
// //   code: string
// //   name: string
// // }

// // export const mainDeweyCategories: DeweyCategory[] = [
// //   { code: '0', name: 'Computer science' },
// //   { code: '1', name: 'Philosophy and psychology' },
// //   { code: '2', name: 'Religion' },
// //   { code: '3', name: 'Social sciences' },
// //   { code: '4', name: 'Language' },
// //   { code: '5', name: 'Science and mathematics' },
// //   { code: '6', name: 'Technology' },
// //   { code: '7', name: 'Arts and recreation' },
// //   { code: '8', name: 'Literature' },
// //   { code: '9', name: 'History and geography' },
// // ]

// export const mainCipCodes: Record<string, string> = {
//   '01': 'Agriculture, Agriculture Operations, and Related Sciences',
//   '03': 'Natural Resources and Conservation',
//   '04': 'Architecture and Related Services',
//   '05': 'Area, Ethnic, Cultural, Gender, and Group Studies',
//   '09': 'Communication, Journalism, and Related Programs',
//   '10': 'Communications Technologies/Technicians and Support Services',
//   '11': 'Computer and Information Sciences and Support Services',
//   '12': 'Personal and Culinary Services',
//   '13': 'Education',
//   '14': 'Engineering',
//   '15': 'Engineering Technologies and Engineering-Related Fields',
//   '16': 'Foreign Languages, Literatures, and Linguistics',
//   '19': 'Family and Consumer Sciences/Human Sciences',
//   '22': 'Legal Professions and Studies',
//   '23': 'English Language and Literature/Letters',
//   '24': 'Liberal Arts and Sciences, General Studies and Humanities',
//   '25': 'Library Science',
//   '26': 'Biological and Biomedical Sciences',
//   '27': 'Mathematics and Statistics',
//   '29': 'Military Technologies and Applied Sciences',
//   '30': 'Multi/Interdisciplinary Studies',
//   '31': 'Parks, Recreation, Leisure, and Fitness Studies',
//   '32': 'Basic Skills and Developmental/Remedial Education',
//   '33': 'Personal and Social Awareness and Development',
//   '34': 'Citizenship Activities',
//   '35': 'Health-Related Knowledge and Skills',
//   '36': 'Interpersonal and Social Skills',
//   '37': 'Leisure and Recreational Activities',
//   '39': 'Theology and Religious Vocations',
//   '40': 'Physical Sciences',
//   '41': 'Science Technologies/Technicians',
//   '42': 'Psychology',
//   '43': 'Homeland Security, Law Enforcement, Firefighting, and Related Protective Services',
//   '44': 'Public Administration and Social Service Professions',
//   '45': 'Social Sciences',
//   '46': 'Construction Trades',
//   '47': 'Mechanic and Repair Technologies/Technicians',
//   '48': 'Precision Production',
//   '49': 'Transportation and Materials Moving',
//   '50': 'Visual and Performing Arts',
//   '51': 'Health Professions and Related Programs',
//   '52': 'Business, Management, Marketing, and Related Support Services',
//   '54': 'History',
//   '55': 'French, German, Latin and Other Common Foreign Language Studies',
//   '60': 'Residency Programs',
// }

// export const CIP_CATEGORIES: Record<string, string[]> = {
//   'Sciences and Mathematics': ['01', '03', '26', '27', '40', '42'],
//   'Engineering and Technology': ['11', '14', '15', '29', '41'],
//   'Arts, Literature, and Communication': ['04', '05', '09', '10', '23', '50', '54', '55'],
//   'Social Sciences, Legal, and Public Administration': ['22', '43', '44', '45'],
//   'Personal Services, Health, and Safety': [
//     '12',
//     '13',
//     '31',
//     '32',
//     '33',
//     '34',
//     '35',
//     '36',
//     '37',
//     '39',
//     '51',
//   ],
//   'Business and Management': ['52'],
//   'Interdisciplinary and Miscellaneous': [
//     '16',
//     '19',
//     '24',
//     '25',
//     '30',
//     '46',
//     '47',
//     '48',
//     '49',
//     '60',
//   ],
// }
