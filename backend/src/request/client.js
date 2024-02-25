import axios from "axios";
// окремий фал для перевикористання HTTP запитів
const formingRequest = async (url) => {
    console.log(url)
    const response = await axios.get(url(), {
        headers: {
            Accept: "application/json",
            "Accept-Encoding": "identity"
        }
    });

    // console.log(response.data)
    return response.data;
};
export default { formingRequest }