import {BookHeart} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import UploadDialog from "@/components/shared/UploadDialog.tsx";
import PostCard from "@/components/shared/PostCard.tsx";
import {useGetRecentPosts} from "@/lib/tanstack-query/queriesAndMutations.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Models} from "appwrite";

const HomePage = () => {
    const {data: posts, isPending: isPostLoading} = useGetRecentPosts()

    return (
        <div className="flex min-h-screen w-full items-center flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-14 w-full max-w-[1280px]">
                <header
                    className="top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <div className="flex items-center">
                        <BookHeart className="hidden sm:flex sm:w-8 sm:h-8" color="#FF6201"/>
                        <p className="ml-1 text-2xl sm:text-4xl font-extrabold text-black font-playfair">DishDiary</p>
                    </div>
                </header>
                <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Welcome back!</CardTitle>
                            <CardDescription className="leading-relaxed">
                                Harness the power of visual tracking and AI-driven analysis to gain a comprehensive
                                understanding of your eating patterns.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                        <UploadDialog/>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Your Dishes</CardTitle>
                            <CardDescription>
                                Select dish image to view generated description.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 lg:grid-cols-4">
                                {isPostLoading ? (
                                    Array.from({ length: 12 }, (_, index) => (
                                        <Skeleton key={index} className="h-full aspect-square" />
                                    ))
                                ) : (
                                    posts?.documents.map((post: Models.Document) => (
                                        <PostCard post={post} key={post.$id} />
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
export default HomePage
