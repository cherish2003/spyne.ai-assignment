import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const carss = {
  id: 1,
  title: "Car 1",
  description: "Description of car 1",
  tags: "SUV, Toyota",
  images: [
    "https://imgd.aeplcdn.com/642x336/n/cw/ec/131131/xc60-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    "https://stimg.cardekho.com/images/carexteriorimages/630x420/Volvo/XC-90/10588/1689924353443/front-left-side-47.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/2022-volvo-xc60-t8-e-awd-polestar-104-1654263951.jpg?crop=0.566xw:0.635xh;0.341xw,0.365xh&resize=768:*",
    "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/131131/xc60-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volvo/XC60/10589/1692870711844/front-left-side-47.jpg",
    "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volvo/XC60/10589/1689925663904/side-view-(left)-90.jpg",
    "https://images.hindustantimes.com/auto/auto-images/Volvo/XC60/1589885807004_XC602",
    "https://motoringworld.in/wp-content/uploads/2022/02/Volvo-XC60-web.jpg",
    "https://m.atcdn.co.uk/vms/media/%7Bresize%7D/01b5e1b388014b6c81fec8246903466c.jpg",
    "https://images.ctfassets.net/uaddx06iwzdz/fT7xWXc8tfPMeHwwb3efV/161a5c004dc1968d1feee7484db86f20/2022_Volvo_XC60_T8_Polestar_Recharge-30.jpg",
  ],

};

export default function ProductListPage() {
  const [cars, setCars] = useState(carss);
  const navigate = useNavigate();

  // Fetch car data from the server
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await fetch("/api/cars");
  //       const data = await response.json();
  //       setCars(data);
  //     } catch (error) {
  //       console.error("Error fetching cars:", error);
  //     }
  //   };
  //   fetchCars();
  // }, []);

  const handleCardClick = (carId) => {
    navigate(`/home/car/${carId}`);
  };

  return (
    <div className="p-4 md:p-8 bg-muted rounded-xl h-full overflow-auto">
      <h2 className="text-lg font-bold mb-4">My Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          className="p-4 shadow-md cursor-pointer hover:bg-gray-100"
          // onClick={() => handleCardClick(car._id)}
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {cars.images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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

          <h3 className="text-md font-semibold mt-2">Volvo</h3>
          <p className="text-sm text-muted-foreground truncate">asfdss</p>
          <Button variant="outline" className="mt-2 w-full">
            View Details
          </Button>
        </Card>
      </div>
    </div>
  );
}
