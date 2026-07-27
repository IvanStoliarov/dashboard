export function getSearchParamsValue(value: string | string[]| undefined){
    return Array.isArray(value) ? value.at(0) : value
}
