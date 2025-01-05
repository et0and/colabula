import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArtCategory, Artwork, User, Comment } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArtworkComments } from "@/components/ArtworkComments";
import { Metadata } from "next";

type ArtworkWithRelations = Artwork & {
  user: User;
  comments: (Comment & {
    user: User;
    replies: (Comment & { user: User })[];
  })[];
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Portal",
  description: "Access portfolios from schools across Aotearoa",
  openGraph: {
    title: "Portal",
    description: "Access portfolios from schools across Aotearoa",
  },
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const categoryUpper = category.toUpperCase() as ArtCategory;
  if (!Object.values(ArtCategory).includes(categoryUpper)) {
    notFound();
  }

  const artworks = (await prisma.artwork.findMany({
    where: {
      category: categoryUpper,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
          replies: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as ArtworkWithRelations[];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>Browse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbPage>
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {artworks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-muted-foreground">
              <p>No portfolios found in this category</p>
            </div>
          ) : (
            artworks.map((artwork) => (
              <Card key={artwork.id} className="mb-6">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                  <Avatar>
                    <AvatarImage
                      src={artwork.user.image || ""}
                      alt={artwork.user.name}
                    />
                    <AvatarFallback>{artwork.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {artwork.user.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(artwork.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Portfolio from{" "}
                      <a
                        href={`https://google.com/search?q=${encodeURIComponent(
                          artwork.school
                        )}`}
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {artwork.school}
                      </a>
                    </p>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="mb-4">{artwork.content}</p>
                  <Carousel className="w-full max-w-xl mx-auto">
                    <CarouselContent>
                      {artwork.imageUrls.map((imageUrl, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Image
                              src={imageUrl}
                              alt={`${artwork.title} - Image ${index + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto rounded-lg shadow"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>

                <CardFooter className="flex justify-between">
                  {/* <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {artwork.likes} Likes
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {artwork.comments.length} Comments
                </Button> */}

                  <ArtworkComments
                    artwork={{
                      ...artwork,
                      comments: artwork.comments.map((comment) => ({
                        ...comment,
                        user: {
                          id: comment.user.id,
                          name: comment.user.name,
                          image: comment.user.image,
                        },
                        replies: comment.replies.map((reply) => ({
                          ...reply,
                          user: {
                            id: reply.user.id,
                            name: reply.user.name,
                            image: reply.user.image,
                          },
                          replies: [],
                        })),
                      })),
                    }}
                  />
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
