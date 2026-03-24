// import { embed, embedMany } from "ai"
// import { google } from "@ai-sdk/google"

// export async function generateEmbedding(text: string) {
//     const input = text.replace("\n/g", " ");

//     const { embedding } = await embed({
//         model: google.embeddingModel("gemini-embedding-001"),
//         value: input,
//         providerOptions: {
//             google: {
//                 outputDimensionality: 768
//             }
//         }
//     })

//     return embedding;
// }

// export async function generateEmbeddings(texts: string[]) {
//     const inputs = texts.map((text) => text.replace(/\n/g, " "));

//     const { embeddings } = await embedMany({
//         model: google.embeddingModel("gemini-embedding-001"),
//         values: inputs,
//         providerOptions: {
//             google: {
//                 outputDimensionality: 768
//             }
//         }
//     })

//     return embeddings;
// }



import { embed, embedMany } from "ai"
import { google } from "@ai-sdk/google"

export async function generateEmbeddings(texts: string[]) {
    const inputs = texts.map((text) => text.replace(/\n/g, " "));

    const { embeddings } = await embedMany({
        model: google.embeddingModel("gemini-embedding-001"),
        values: inputs,
        // This is the critical fix for the 2000-dimension limit
        providerOptions: {
            google: {
                outputDimensionality: 768 
            }
        }
    })
    return embeddings;
}

// Do the same for your single generateEmbedding function
export async function generateEmbedding(text: string) {
    const input = text.replace(/\n/g, " ");
    const { embedding } = await embed({
        model: google.embeddingModel("gemini-embedding-001"),
        value: input,
        providerOptions: {
            google: {
                outputDimensionality: 768
            }
        }
    })
    return embedding;
}