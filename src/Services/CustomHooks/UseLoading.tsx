import { useContext } from "react"
import { IContext } from "../../Model/Others"
import { Data } from "../../Layout/Layout"

export const useLoading = () => {
    const { setLoading } = useContext(Data) as IContext

    const updateLoading = (status: boolean, tooltip: string = '') => {
        setLoading({loading: status, tooltip: tooltip})
    }

    return { updateLoading }
}