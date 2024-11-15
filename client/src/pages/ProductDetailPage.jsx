import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function ProductDetailPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { car, edit } = location.state || {};
  const [editMode, setEditMode] = useState(edit || false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedCar, setUpdatedCar] = useState({
    title: car?.title,
    description: car?.description,
    tags: car?.tags || [],
  });

  useEffect(() => {
    console.log(car);
  }, [car]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedCar({
      title: car?.title,
      description: car?.description,
      tags: car?.tags || [],
    });
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cars/edit/${car._id}`,
        updatedCar,
        {
          withCredentials: true,
        }
      );
      console.log("Car updated:", response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving car details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagChange = (index, newTag) => {
    const updatedTags = [...updatedCar.tags];
    updatedTags[index] = newTag;
    setUpdatedCar({ ...updatedCar, tags: updatedTags });
  };

  if (!car) {
    return <p>No Car details found upload to view</p>;
  }

  return (
    <div className="p-4 md:p-8 rounded-xl h-full flex">
      <Button onClick={() => navigate("/home/product")} className="mb-4">
        Back to List
      </Button>

      <div className="flex items-center justify-between">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-md"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {car?.images.map((image, index) => (
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
          {editMode ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Edit Car Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Title</h3>
                  <input
                    type="text"
                    value={updatedCar.title}
                    onChange={(e) =>
                      setUpdatedCar({
                        ...updatedCar,
                        title: e.target.value,
                      })
                    }
                    className="p-2 border rounded-md w-full"
                  />
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <textarea
                    value={updatedCar.description}
                    onChange={(e) =>
                      setUpdatedCar({
                        ...updatedCar,
                        description: e.target.value,
                      })
                    }
                    className="p-2 border rounded-md w-full"
                  />
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {updatedCar.tags?.map((tag, index) => (
                      <input
                        key={index}
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className="p-2 border rounded-md"
                      />
                    ))}
                  </div>
                  {!isLoading ? (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                      onClick={handleSaveClick}
                    >
                      Save Changes
                    </Button>
                  ) : (
                    <Button disabled>
                      <Loader2 className="animate-spin" />
                      Updating...
                    </Button>
                  )}
                  <Button
                    onClick={handleCancelClick}
                    variant="outline"
                    className="mt-4 ml-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">{car?.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-md text-muted-foreground mb-4">
                    {car?.description}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {car?.tags?.map((tag, index) => (
                      <Badge key={index} className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {edit && (
                <Button onClick={handleEditClick} className="mt-4">
                  Edit
                </Button>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
