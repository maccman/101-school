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
