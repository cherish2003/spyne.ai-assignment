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
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { toast } = useToast();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { car, edit } = location.state || {};
  const [editMode, setEditMode] = useState(false);
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
        `${import.meta.env.VITE_API_URL}/api/cars/edit/${car._id}`,
        updatedCar,
        {
          withCredentials: true,
        }
      );
        toast({
          variant: "destructive",
          title: "Car details deleted ✅",
          description: "Enter the required data as mentioned above ",
        });
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

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setIsLoading(true);
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/user/delete/${car._id}`,
          {
            withCredentials: true,
          }
        );

        console.log("Car deleted successfully");
        navigate("/home/product");
      } catch (error) {
        console.error("Error deleting car:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!car) {
    return <p>No Car details found. Upload to view.</p>;
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
                <div className="max-w-full overflow-hidden">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-md text-muted-foreground mb-4 break-words">
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
                <div className="flex gap-4 mt-4">
                  <Button onClick={handleEditClick}>Edit</Button>
                  <Button variant="destructive" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
  z;
}
