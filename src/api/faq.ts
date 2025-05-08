import axios from "axios";

export interface FaqItem {
    _id: string;
    question: string;
    answer: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchFaqs(): Promise<FaqItem[]> {
    const response = await axios.get<FaqItem[]>(API_URL + "/faq");
    return response.data;
}