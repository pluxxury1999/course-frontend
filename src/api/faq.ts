import axios from "axios";

export interface FaqItem {
    _id: string;
    question: string;
    answer: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * Отримати всі FAQ
 */
export async function fetchFaqs(): Promise<FaqItem[]> {
    const { data } = await axios.get<FaqItem[]>(`${API_URL}/faq`);
    return data;
}

/**
 * Створити новий FAQ-запис
 * @param payload Обʼєкт з полями question та answer
 */
export async function postFaq(payload: { question: string; answer: string }): Promise<FaqItem> {
    const { data } = await axios.post<FaqItem>(`${API_URL}/faq`, payload);
    return data;
}