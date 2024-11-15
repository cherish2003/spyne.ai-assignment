import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ProductDetailPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { carId } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === parseInt(1));

  if (!car) {
    return <p>Car not found</p>;
  }

  return (
    <div className="p-4 md:p-8 rounded-xl h-full flex ">
      <Button onClick={() => navigate("/home/product")} className="mb-4">
        Back to List
      </Button>
      <div className="flex items-center justify-between ">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-md"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {car.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2 ">
                      <img
                        src={image}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Card className="p-6 shadow-md ml-[70px]">
          <h2 className="text-2xl font-bold mb-4">{car.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-md text-muted-foreground mb-4">
                {car.description}
              </p>
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <p className="text-md text-muted-foreground">{car.tags}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
