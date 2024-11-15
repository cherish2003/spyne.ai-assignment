import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function ProductListPage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cars/me`,
          {
            withCredentials: true,
          }
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleCardClick = (car) => {
    navigate("/home/product/detail", {
      state: { car, edit: true },
    });
  };

  if (!cars) {
    return <p>No Car are details found</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-muted rounded-xl h-full overflow-auto">
      <h2 className="text-lg font-bold mb-4">My Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <Card
            key={car._id}
            className="p-4 shadow-md cursor-pointer hover:bg-gray-100"
          >
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {car.images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full w-full">
                      <Card className="h-full w-full">
                        <CardContent className="flex aspect-square items-center justify-center p-0">
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
            </Carousel>

            <h3 className="text-md font-semibold mt-2">{car.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {car.description}
            </p>
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => handleCardClick(car)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
