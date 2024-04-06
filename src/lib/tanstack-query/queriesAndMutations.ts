import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {INewPost} from "@/lib/types.ts";
import {createPost, getRecentPosts} from "@/lib/appwrite/api.ts";
import {generateDescription} from "@/lib/openai/api.ts";

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getRecentPosts"],
            })
        },
    })
}

export const useGenerateDescription = () => {
    return useMutation({
        mutationFn: (file : File) => generateDescription(file)
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: ["getRecentPosts"],
        queryFn: getRecentPosts,
    })
}