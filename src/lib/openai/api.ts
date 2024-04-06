import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export function getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export const generateDescription = async (file: File) => {
    const base64 = await getBase64(file);
    if (typeof base64 != "string") {
        return "Dish description"
    }
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Describe this image" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": base64,
                        },
                    },
                ],
            },
        ],
    });
    const description = response.choices[0].message.content
    if (!description) throw Error
    return description
};
