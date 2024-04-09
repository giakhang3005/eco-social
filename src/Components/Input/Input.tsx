import { useState } from "react";
import "./Input.scss"
type Props = {
    value: string | number,
    setValue: (e: any) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLAreaElement>) => void,
    placeholder?: string
    style?: object;
    textarea?: boolean;
    uppercase?: boolean;
    max?: number;
}

const Input = ({ max = 9999999, uppercase, textarea, value, setValue, onBlur, placeholder, style }: Props) => {

    const [count, SetCount] = useState<number>(0);

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLAreaElement>) => {
        if (!onBlur) return

        onBlur(e)
    }

    const onSetValue = (value: string) => {
        SetCount(value.length);
        setValue(value);
    }
    return (
        <>
            {
                textarea
                    ?
                    <div className="inputWrapper">
                        <textarea
                            className="Texarea"
                            style={style}
                            value={value}
                            placeholder={placeholder}
                            onChange={(e) => onSetValue(uppercase ? e.target.value.toUpperCase() : e.target.value)}
                            maxLength={max}
                        ></textarea>
                        {max !== 9999999 && <div className="count">{count}/{max}</div>}
                    </div>
                    :
                    <div className="inputWrapper">
                        <input
                            className="Input"
                            style={style}
                            value={value}
                            placeholder={placeholder}
                            onBlur={(e) => handleOnBlur(e)}
                            onChange={(e) => setValue(uppercase ? e.target.value.toUpperCase() : e.target.value)}
                            maxLength={max}
                        ></input>
                        {max !== 9999999 && <div className="count">{count}/{max}</div>}
                    </div>
            }
        </>

    )
}

export default Input