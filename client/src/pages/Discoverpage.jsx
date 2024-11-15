import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default function Discoverpage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { car } = location.state || {};
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const handleCardClick = (car) => {
    navigate("/home/product/detail", {
      state: { car, edit: false },
    });
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedCar({
      title: car?.title,
      description: car?.description,
      tags: car?.tags || [],
    });
  };
  useEffect(() => {
    console.log(filteredCars);
  }, [filteredCars]);

  useEffect(() => {
    searchCars();
  }, [searchQuery, selectedTags]);

  const searchCars = async () => {
    if (!searchQuery) {
      setFilteredCars(cars);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars/search`,
        {
          params: { searchQuery: searchQuery },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setFilteredCars(response.data.data);
      } else {
        setFilteredCars([]);
      }
    } catch (error) {
      console.error("Error searching cars:", error);
      setFilteredCars([]);
    }
  };

  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 md:p-8 rounded-xl h-full flex flex-col">
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-full"
        />
        <div className="flex flex-wrap gap-2">
          {["SUV", "Sedan", "Coupe", "Hatchback"].map((tag) => (
            <Badge
              key={tag}
              className={`cursor-pointer ${
                selectedTags.includes(tag) ? "bg-blue-500" : "bg-gray-200"
              }`}
              onClick={() => handleTagSelection(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Filtered Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCars.map((car) => (
            <div key={car._id}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
