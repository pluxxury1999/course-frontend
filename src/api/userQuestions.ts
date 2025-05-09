import axios from "axios";

// Тепер включаємо всі чотири поля
export interface UserQuestion {
    name: string;
    email: string;
    question: string;
    answer: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

// Використовуємо правильний рут – з PascalCase, як у бекенді
export async function postUserQuestion(data: UserQuestion): Promise<void> {
    await axios.post(`${API_URL}/userQuestions`, data);
}