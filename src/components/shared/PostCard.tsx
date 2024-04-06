import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer.tsx";
import {Models} from "appwrite";
import {formatDate} from "@/lib/utils.ts";
import {useState} from "react";
import {useMediaQuery} from "@/hooks/use-media-query.ts";

interface PostCardProps {
    post: Models.Document
}

const PostCard = ({post}: PostCardProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = useState(false)

    if (isDesktop) {
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
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild className='aspect-square object-fill cursor-pointer'>
                    <img src={post.imageUrl} alt='salad'/>
                </DrawerTrigger>
                <DrawerContent className='p-0 outline-none'>
                    <DrawerHeader className='p-4 pb-0 flex flex-col'>
                        <p className='text-xl font-bold'>{post.name}</p>
                        <p className='text-sm'>{formatDate(post.$createdAt)}</p>
                    </DrawerHeader>
                    <DrawerDescription className='flex flex-col p-4'>
                        {post.description}
                    </DrawerDescription>
                </DrawerContent>
            </Drawer>
        )
    }
}
export default PostCard