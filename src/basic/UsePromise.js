const usePromise = async (promise) =>{
    try {
        const succes = await promise.then(data=>data.json())
        return [succes, null]
    } catch (error) {
        return [null, error]
    }
}

export default usePromise