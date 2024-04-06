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
import React, {useState} from "react";
import FileUploader from "@/components/shared/FileUploader.tsx";
import {Soup} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {generateDescription} from "@/lib/openai/api.ts";

const formSchema = z.object({
    file: z.custom<File[]>(),
    dishName: z.string().min(1, {message: "Please enter a dish name"})
})
const UploadDialog = () => {
    const [open, setOpen] = useState(false)
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

}
export default UploadDialog


type UploadFormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function UploadForm({setOpen}: UploadFormProps) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: [],
            dishName: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const desc = await generateDescription(values.file[0])
        console.log(desc)
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
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Dish name</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage/>
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
                    >
                        Upload
                    </Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}