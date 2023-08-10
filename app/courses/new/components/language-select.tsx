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
  'English',
  'Mandarin Chinese',
  'Hindi',
  'Spanish',
  'French',
  'Standard Arabic',
  'Bengali',
  'Russian',
  'Portuguese',
  'Urdu',
  'German',
  'Japanese',
  'Swahili',
  'Marathi',
  'Telugu',
  'Turkish',
  'Korean',
  'Tamil',
  'Italian',
  'Cantonese',
  'Punjabi',
  'Javanese',
  'Malay',
  'Gujarati',
  'Kannada',
  'Oriya',
  'Malayalam',
  'Sundanese',
  'Hausa',
  'Burmese',
  'Ukrainian',
  'Tagalog',
  'Yoruba',
  'Maithili',
  'Uzbek',
  'Sindhi',
  'Amharic',
  'Fula',
  'Romanian',
  'Oromo',
  'Igbo',
  'Azerbaijani',
  'Awadhi',
  'Gan Chinese',
  'Cebuano',
  'Dutch',
  'Kurdish',
  'Serbo-Croatian',
  'Malagasy',
  'Saraiki',
  'Nepali',
  'Sinhala',
  'Chittagonian',
  'Zhuang',
  'Khmer',
  'Turkmen',
  'Somali',
  'Marwari',
  'Magahi',
  'Haryanvi',
  'Hungarian',
  'Chhattisgarhi',
  'Greek',
  'Chewa',
  'Deccan',
  'Akan',
  'Kazakh',
  'Northern Min',
  'Sylheti',
  'Zulu',
  'Czech',
  'Kinyarwanda',
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
