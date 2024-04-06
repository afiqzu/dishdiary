import {ID, Query} from "appwrite";
import {
    appwriteConfig,
    databases,
    storage,
} from '@/lib/appwrite/config.ts'
import {INewPost} from "@/lib/types.ts";

export async function createPost(post: INewPost) {
    try {
        const uploadedFile = await uploadFile(post.file[0])
        if (!uploadedFile) throw Error

        const fileUrl = getFilePreview(uploadedFile.$id)
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        const newPost = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionID,
            ID.unique(),
            {
                creator: post.userId,
                name: post.name,
                description: post.description,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
            }
        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }
        return newPost
    } catch (error) {
        console.log(error)
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageID,
            ID.unique(),
            file
        )
        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageID,
            fileId,
            500,
            500,
            'top',
            90
        )
        return fileUrl
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageID, fileId)
        return { status: 'ok' }
    } catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if (!posts) throw Error

    return posts
}