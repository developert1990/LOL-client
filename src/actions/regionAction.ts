import { CHANGE_REGION } from './../constants/regionConstants';




export const changeRegion = (region: string) => {
    return {
        type: CHANGE_REGION,
        payload: region,
    }
}