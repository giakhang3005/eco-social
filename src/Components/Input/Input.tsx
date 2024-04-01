import "./Input.scss"
type Props = {
    value: string | number,
    setValue: (e: any) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLAreaElement>) => void,
    placeholder?: string
    style?: object;
    textarea?: boolean;
}

const Input = ({ textarea, value, setValue, onBlur, placeholder, style }: Props) => {


    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLAreaElement>) => {
        if (!onBlur) return

        onBlur(e)
    }
    return (
        <>
            {
                textarea
                    ? <textarea
                        className="Texarea"
                        style={style}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value)}></textarea>
                    : <input
                        className="Input"
                        style={style}
                        value={value}
                        placeholder={placeholder}
                        onBlur={(e) => handleOnBlur(e)}
                        onChange={(e) => setValue(e.target.value)}
                    />
            }
        </>

    )
}

export default Input