import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Textarea } from '@chakra-ui/textarea'
import { useField } from 'formik'
import { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}

export const InputField = ({
  label,
  textarea = false,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, { error }] = useField(props)

  let InputOrTextarea = Input
  if (textarea) {
    InputOrTextarea = Textarea
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>

      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
