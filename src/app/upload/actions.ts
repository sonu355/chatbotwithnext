// "use server"

// import * as pdf from "pdf-parse";
// import { db } from "@/lib/db-config";
// import { documents } from "@/lib/db-schema";
// import { generateEmbeddings } from "@/lib/embeddings";
// import { chunkContent } from "@/lib/chunking";
// import { success } from "zod";


// export async function processPDFFile(formdata: FormData){
//     try {
//         const file = formdata.get("pdf") as File;

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const data = await (pdf as any).default?.(buffer) || await (pdf as any)(buffer);

//         if(!data.text || data.text.trim().length() === 0){
//             return{
//                 success: false,
//                 error: "No text found in PDF"
//             }
//         }

//         const chunks = await chunkContent(data.text);
//         const embeddings = await generateEmbeddings(chunks)

//         const records = chunks.map((chunk, index) => ({
//             content: chunk,
//             embedding: embeddings[index]
//         }))

//         await db.insert(documents).values(records);

//         return{
//             success: true,
//             message: `Created ${records.length} searchable chunks`
//         }

//     } catch (error) {
//         console.error("PDF processing error", error);
//         return {
//             success: false,
//             error: "Failed to process PDF"
//         }
//     }
// }

"use server";

import pdf from "pdf-parse-fork";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPDFFile(formdata: FormData) {
    try {
        const file = formdata.get("pdf") as File;
        if (!file) return { success: false, message: "No file provided" };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // This fork is fixed specifically for Node.js server environments
        const data = await pdf(buffer);

        if (!data.text || data.text.trim().length === 0) {
            return { success: false, message: "No text found in PDF" };
        }

        // Processing the text for your RAG chatbot
        const chunks = await chunkContent(data.text);
        const embeddings = await generateEmbeddings(chunks);

        const records = chunks.map((chunk, index) => ({
            content: chunk,
            embedding: embeddings[index],
        }));

        // Saving to Neon Database
        await db.insert(documents).values(records);

        return {
            success: true,
            message: `Successfully processed ${file.name} into ${records.length} searchable chunks.`
        };

    } catch (error) {
        console.error("PDF processing error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to process PDF"
        };
    }
}