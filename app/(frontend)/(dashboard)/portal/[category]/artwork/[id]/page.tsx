import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  assessmentLevelDescriptions,
  assessmentLevelUrls,
} from "@/lib/strings";

import { ArtCategory, Artwork, User, Comment, Rating } from "@prisma/client";
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
import { AppSidebar } from "@/app/(frontend)/(dashboard)/portal/_components/app-sidebar";
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
import { Info } from "lucide-react";
import { ArtworkComments } from "@/app/(frontend)/(dashboard)/portal/_components/ArtworkComments";
import { Metadata } from "next";
import { ShareCard } from "@/app/(frontend)/(dashboard)/portal/_components/share-card";
import { PostRating } from "@/app/(frontend)/(dashboard)/portal/_components/grading-scale";
import { headers } from "next/headers";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArtworkControls } from "@/app/(frontend)/(dashboard)/portal/_components/(artwork-controls)/artwork-controls";

type ArtworkWithRelations = Artwork & {
  user: User;
  assessmentLevel: string;
  comments: (Comment & {
    user: User;
    replies: (Comment & { user: User })[];
  })[];
  ratings: (Rating & {
    user: User;
  })[];
};

function calculateAverageRating(ratings: Rating[]): string {
  if (!ratings.length) return "No grades yet";

  const average =
    ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;

  // Convert numerical average to grade label
  if (average === 0) return "NØ";
  if (average <= 1) return "N1";
  if (average <= 2) return "N2";
  if (average <= 3) return "A3";
  if (average <= 4) return "A4";
  if (average <= 5) return "M5";
  if (average <= 6) return "M6";
  if (average <= 7) return "E7";
  return "E8";
}

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const artwork = await prisma.artwork.findUnique({
    where: { id },
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

export default async function ArtworkPage({ params }: Readonly<PageProps>) {
  const { category, id } = await params;
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const categoryUpper = category.toUpperCase() as ArtCategory;
  if (!Object.values(ArtCategory).includes(categoryUpper)) {
    notFound();
  }

  const artwork = (await prisma.artwork.findUnique({
    where: {
      id,
      category: categoryUpper,
    },
    include: {
      user: true,
      comments: {
        where: {
          parentId: null,
        },
        include: {
          user: true,
          replies: {
            include: {
              user: true,
            },
          },
        },
      },
      ratings: {
        include: {
          user: true,
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
                  src={artwork.user.image ?? ""}
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
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 text-left">
                    {artwork.assessmentLevel} standard
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Info className="h-3 w-3" color="white" fill="blue" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-w-xs rounded">
                      <DialogTitle>About this standard</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        {
                          assessmentLevelDescriptions[
                            artwork.assessmentLevel as keyof typeof assessmentLevelDescriptions
                          ]
                        }
                      </p>
                      <p className="text-sm mt-4">
                        <a
                          href={
                            assessmentLevelUrls[
                              artwork
                                .assessmentLevel[0] as keyof typeof assessmentLevelUrls
                            ]
                          }
                          className="link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View NZQA source material{" "}
                        </a>
                      </p>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="text-xs text-gray-500">
                  Tags: {artwork.tags.join(" + ")}
                </p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">
                    Average grade: {calculateAverageRating(artwork.ratings)}
                    {artwork.ratings.length > 0 && (
                      <span className="text-xs ml-1">
                        ({artwork.ratings.length}{" "}
                        {artwork.ratings.length === 1 ? "grade" : "grades"})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center my-2 gap-2">
                  {artwork.userId === artwork.user.id && (
                    <ArtworkControls artwork={artwork} />
                  )}
                  <ShareCard
                    baseUrl={baseUrl}
                    category={category}
                    artworkId={artwork.id}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="mb-4">{artwork.content}</p>
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {artwork.imageUrls.map((imageUrl, index) => (
                    <CarouselItem key={`artwork-image-${artwork.id}-${index}`}>
                      <div className="p-1">
                        <div className="block md:hidden">
                          <Image
                            src={imageUrl}
                            alt={`${artwork.title} - Image ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg shadow"
                          />
                        </div>

                        <Dialog>
                          <DialogTrigger className="hidden md:block w-full">
                            <Image
                              src={imageUrl}
                              alt={`${artwork.title} - Image ${index + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto rounded-lg shadow cursor-zoom-in transition-transform hover:scale-[1.02]"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] w-full h-[95vh] flex items-center justify-center bg-white/50">
                            <DialogTitle className="sr-only">
                              {`${artwork.title} - Image ${index + 1}`}
                            </DialogTitle>
                            <Image
                              src={imageUrl}
                              alt={`${artwork.title} - Image ${index + 1}`}
                              width={1920}
                              height={1080}
                              className="w-full max-h-[90vh] h-auto object-contain"
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <Separator className="mt-4" />
              <PostRating
                artworkId={artwork.id}
                initialRating={artwork.ratings.map((rating) => ({
                  rating: rating.value,
                  user: {
                    id: rating.user.id,
                    name: rating.user.name,
                    image: rating.user.image,
                  },
                }))}
              />
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
