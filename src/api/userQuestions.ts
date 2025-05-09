import axios from "axios";

export interface UserQuestion {
    _id: string;
    name: string;
    email: string;
    question: string;
    answer: string;
    isPublished: boolean;
}

// Тип для створення нового питання — без _id
export type NewUserQuestion = Omit<UserQuestion, "_id">;

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * Отримати всі питання
 */
export async function fetchUserQuestions(): Promise<UserQuestion[]> {
    const { data } = await axios.get<UserQuestion[]>(`${API_URL}/userQuestions`);
    return data;
}

/**
 * Створити нове питання
 * За замовчуванням у NewUserQuestion має бути isPublished: false
 */
export async function postUserQuestion(payload: NewUserQuestion): Promise<UserQuestion> {
    const { data } = await axios.post<UserQuestion>(`${API_URL}/userQuestions`, payload);
    return data;
}

/**
 * Оновити поля answer і/або isPublished
 */
export async function updateUserQuestion(id: string, payload: { answer?: string; isPublished?: boolean }): Promise<UserQuestion> {
    const { data } = await axios.patch<UserQuestion>(`${API_URL}/userQuestions/${id}`, payload);
    return data;
}