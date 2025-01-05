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
    id: string;
  }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const artwork = await prisma.artwork.findUnique({
    where: { id: (await params).id },
    include: { user: true },
  });

  if (!artwork) return { title: "Artwork Not Found" };

  return {
    title: `${artwork.title} uploaded by ${artwork.user.name}`,
    description: artwork.content,
    openGraph: {
      title: `${artwork.title} uploaded by ${artwork.user.name}`,
      description: artwork.content,
      images: artwork.imageUrls,
    },
  };
}

export default async function ArtworkPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { category, id } = resolvedParams;

  const categoryUpper = category.toUpperCase() as ArtCategory;
  if (!Object.values(ArtCategory).includes(categoryUpper)) {
    notFound();
  }

  const artwork = (await prisma.artwork.findUnique({
    where: {
      id: id,
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
  })) as ArtworkWithRelations | null;

  if (!artwork) {
    notFound();
  }

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
              <BreadcrumbItem>
                <BreadcrumbLink href="/portal">Browse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/portal/${category}`}>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).toLowerCase()}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{artwork.title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <Avatar>
                <AvatarImage
                  src={artwork.user.image || ""}
                  alt={artwork.user.name}
                />
                <AvatarFallback>{artwork.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{artwork.user.name}</h3>
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
                <p className="text-xs text-gray-500">
                  Tags: {artwork.tags.join(" + ")}
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

            <CardFooter>
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
