import axios from "axios"
import { serverURL } from "../App"
import { setUserData } from "../redux/userSlice";


export const getCurrentUser = async (dispatch) => {
    try {
        const result = await axios.get(serverURL + '/api/user/currentUser', {
            withCredentials: true,
        });
        dispatch(setUserData(result.data));
    } catch (error) {
        console.log(error);
    }
}

export const generateNotes = async (payload) => {
    try {
        const result = await axios.post(serverURL + '/api/notes/generate-notes', payload, {
            withCredentials: true,
        })
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const downloadPdf = async (result) => {
    try {
        const response = await axios.post(serverURL + "/api/pdf/generate-pdf", {result}, {
            responseType: 'blob',
            withCredentials: true,
        })

        const blob = new Blob([response.data], { type: 'application/pdf' });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ExamNotesAI-Subhashis.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log("PDF Download Error:", error);
        throw new Error("Sorry, there was an error generating the PDF. Please try again later.");
    }
}