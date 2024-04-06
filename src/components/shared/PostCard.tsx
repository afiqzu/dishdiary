import {
    Dialog,
    DialogContent, DialogDescription, DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Models} from "appwrite";
import {formatDate} from "@/lib/utils.ts";

interface PostCardProps {
    post: Models.Document
}

const PostCard = ({post}: PostCardProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild className='aspect-square object-fill cursor-pointer'>
                <img src={post.imageUrl} alt='salad'/>
            </DialogTrigger>
            <DialogContent className='p-0 border-none rounded-none'>
                <DialogHeader className='p-4 pb-0 flex flex-col'>
                    <p className='text-xl font-bold'>{post.name}</p>
                    <p className='text-sm'>{formatDate(post.$createdAt)}</p>
                </DialogHeader>
                <DialogDescription className='flex flex-col p-4 pt-0'>
                    {post.description}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )

}
export default PostCard