import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images: string[] = [
  "/michi_dance.jpg",
  "/michi_dayo.jpg",
  "/michi_mobility2.png",
  "/michi_yoga.png",
  "/michi_workout3.jpg",
];

const ImageCarousel = () => {
  return (
    <Carousel className="md:w-[400px] w-[270px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flexitems-center justify-center "
          >
            <div className="relative w-full h-[400px] ">
              <Image
                src={image}
                alt={`Image ${index}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
