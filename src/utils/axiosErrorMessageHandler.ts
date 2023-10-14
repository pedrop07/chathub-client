import { AxiosError } from "axios"

export function axiosErrorMessageHandler(error: any){
  if (error instanceof AxiosError && error.response?.data?.message) {
    const errorMessage = error.response?.data?.message
    if(errorMessage instanceof Array) {
      return errorMessage[0]
    } 

    return errorMessage
  }

  return 'Não foi possível realizar está ação no momento, tente novamente mais tarde.'
}
