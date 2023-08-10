import { SelectProps } from '@radix-ui/react-select'

import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages: string[] = [
  'Akan',
  'Amharic',
  'Awadhi',
  'Azerbaijani',
  'Bengali',
  'Burmese',
  'Cantonese',
  'Cebuano',
  'Chewa',
  'Chhattisgarhi',
  'Chittagonian',
  'Czech',
  'Deccan',
  'Dutch',
  'English',
  'French',
  'Fula',
  'Gan Chinese',
  'German',
  'Greek',
  'Gujarati',
  'Haryanvi',
  'Hausa',
  'Hindi',
  'Hungarian',
  'Igbo',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Korean',
  'Kurdish',
  'Magahi',
  'Maithili',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Mandarin Chinese',
  'Marathi',
  'Marwari',
  'Nepali',
  'Northern Min',
  'Oriya',
  'Oromo',
  'Portuguese',
  'Punjabi',
  'Romanian',
  'Russian',
  'Saraiki',
  'Serbo-Croatian',
  'Sindhi',
  'Sinhala',
  'Somali',
  'Spanish',
  'Standard Arabic',
  'Sundanese',
  'Swahili',
  'Sylheti',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Turkish',
  'Turkmen',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Yoruba',
  'Zhuang',
  'Zulu',
]

export function LanguageSelect(props: SelectProps) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language} value={language}>
            {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
