import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";
import { TagInput } from "emblor";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UploadCarPage() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }
    setImages(files);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || tags.length === 0 || images.length === 0) {
      toast({
        variant: "destructive",
        title: "All inputs are required !! 🥲",
        description: "Enter the required data as mentioned above",
      });
      return;
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags.map((tag) => tag.text).join(","));
      images.forEach((image) => formData.append("images", image));

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/user/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        toast({
          title: "Upload completed Successfully 👍🏻",
          description: "new car details are successfully uploaded",
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error uploading car details:", error);
        toast({
          variant: "destructive",
          title: error || "Upload failed",
          description: "Uploading failed ",
        });
      } finally {
        setDescription("");
        setImages([]);
        setTags([]);
        setTitle("");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-muted rounded-xl h-full flex flex-col space-y-4 items-center">
      <Card className="p-6 shadow-md max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4">Add New Car details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Car Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Car Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Tags</Label>
            <TagInput
              placeholder="Enter a topic"
              tags={tags}
              setTags={(newTags) => setTags(newTags)}
            />
          </div>
          <div>
            <Label>Upload Images (up to 10)</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">
              {images.length} image(s) selected
            </p>
          </div>
          {!isLoading ? (
            <Button type="submit" className="w-full" disabled={isLoading}>
              Save Details
            </Button>
          ) : (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Uploading...
            </Button>
          )}
        </form>
      </Card>
      <div className="max-w-lg image-preview flex space-x-4 overflow-x-scroll py-4 no-scrollbar">
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0">
            <Card className="shadow-lg rounded-lg overflow-hidden w-40">
              <CardContent className="p-0">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs shadow-lg"
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
