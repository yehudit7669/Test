import { FieldRenderProps } from 'react-final-form'

export const FinalFormInput = <T extends string | number>(
  props: FieldRenderProps<T, HTMLInputElement>
) => {
  const { input, meta, label, placeholder, alt, id, ...inputProps } = props
  return (
    <>
      <div style={{ color: meta.touched && meta.error ? 'red' : '' }}>
        <label>{label}</label>
        <input
          {...input}
          {...inputProps}
          placeholder={placeholder}
          alt={alt}
          id={id}
          style={{ borderColor: meta?.touched && meta?.error ? 'red' : '' }}
        />
        {meta.touched && meta.error && (
          <span style={{ fontSize: '10px' }}>{meta.error}</span>
        )}
      </div>
    </>
  )
}
