import { Carousel, CarouselItem } from "react-bootstrap";
import image1 from "../../assets/a.jpg";
import image2 from "../../assets/b.jpg";
import image3 from "../../assets/a.jpg";
import { Box, Container, Paper } from "@mui/material";

const images = [
  {
    label: "San Francisco  Oakland Bay Bridge, United States",
    imgPath: image1,
  },
  {
    label: "Bird",
    imgPath: image2,
  },
  {
    label: "Bali, Indonesia",
    imgPath: image3,
  },
  ,
  {
    label: "Bali",
    imgPath: image2,
  },
];

export const CustomeCarousel = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        // minHeight: "20vh",
      }}
    >
      <Carousel>
        {images.map((image) => (
          <CarouselItem key={image.imgPath}>
            <img
              src={image.imgPath}
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "cover" }}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </Container>
  );
};
