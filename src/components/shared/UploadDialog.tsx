import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import React, {useState} from "react";
import FileUploader from "@/components/shared/FileUploader.tsx";
import {Soup} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useCreatePost, useGenerateDescription} from "@/lib/tanstack-query/queriesAndMutations.ts";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {useMediaQuery} from "@/hooks/use-media-query.ts";

const formSchema = z.object({
    file: z.custom<File[]>(),
    dishName: z.string().min(1, {message: "Please enter a dish name"})
})

const UploadDialog = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = useState(false)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Add a new dish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2'>
                            <p>Add a new dish</p>
                            <Soup/>
                        </DialogTitle>
                        <DialogDescription>
                            Upload a photo of your dish below. Click upload once you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <UploadForm setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button>Add a new meal</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-lg">
                        <DrawerHeader className='pb-0'>
                            <DrawerTitle className='flex items-center gap-2'>
                                <p>Add a new dish</p>
                                <Soup/>
                            </DrawerTitle>
                            <DrawerDescription className='text-start'>
                                Upload a photo of your dish below. Tap upload once you are done.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 p-4">
                            <UploadForm setOpen={setOpen}/>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }


}
export default UploadDialog


type UploadFormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function UploadForm({setOpen}: UploadFormProps) {
    const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost()
    const {mutateAsync: generateDescription, isPending: isGeneratingDescription} = useGenerateDescription()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: [],
            dishName: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const description = await generateDescription(values.file[0])
        setOpen(false)
        await createPost({
            ...values,
            name: values.dishName,
            userId: "sampleUserId",
            description: description
        });
        toast({
            description: "Dish successfully uploaded!"
        })
    }

    if (isGeneratingDescription || isLoadingCreate) {
        return (
            <div className='flex flex-col items-center justify-center gap-8 mt-6'>
                <LoadingSpinner/>
                <p className='text-sm text-muted-foreground'>
                    {isGeneratingDescription
                        ? "Generating description..."
                        : "Uploading.."}
                </p>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 items-center"
            >
                <FormField
                    control={form.control}
                    name="dishName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Dish name</FormLabel>
                            <FormControl>
                                <Input type="text" className='text-[16px]' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={""}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-4 w-full">
                    <Button
                        type="submit"
                        disabled={isLoadingCreate || isGeneratingDescription}
                    >
                        Upload
                    </Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}