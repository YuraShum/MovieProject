import responseHandlers from "../handlers/responseHandlers"
import movieDBApi from "../theMovieDatabase/api"


const personController = {
    personDetail: async (request, response) => {
        try {
            // отримання ідентифікатора особи з переданих параметрів запиту
            const { id } = request.params

            // отримання інформації про особу 
            const detail = await movieDBApi.personDetail({ id })

            // Якщо отримання інформації про особу вдається, 
            // відправляється відповідь з інформацією про особу
            responseHandlers.ok(response, detail)
        } catch {
            responseHandlers.error(response)
        }
    },
    personMedias: async (request, response) => {
        try {
            const { id } = request.params
            // Отримання інформації про медіа проекти
            const medias = await movieDBApi.personMedias({ id })

            // відправляється відповідь з інформацією про медіапроекти
            responseHandlers.ok(response, medias)
        } catch {
            responseHandlers.error(response)
        }
    },
}

export default personController