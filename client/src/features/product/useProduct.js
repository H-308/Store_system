import { useGetProductByIdQuery } from "./proApiSlice"

const useProduct=(id)=>{
    const { isError, isSuccess, isLoading, error, data: product } = useGetProductByIdQuery(id)
    if(product){
        return product
    }
    
}
export default useProduct