import React, { useEffect, useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCat } from "../../helper/axios";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { AddToCart } from "../../components/products/AddToCart";
import { AddToFav } from "../../components/products/AddToFav";
import { YouMayLike } from "../../components/products/YouMayLike";
import { LandingPageImage } from "../../components/products/LandingPageImage";

export const ProductPage = () => {
  const { slug } = useParams();
  const [product, setproduct] = useState({});
  const [similarProduct, setSimilarproduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderQty, setOrderQty] = useState(1);
  const [selectedItem, setSelectedItem] = useState({ ...product, orderQty });
  const handleOnQty = (e) => {
    const { value } = e.target;
    setOrderQty(value);
  };
  useEffect(() => {
    async function getdata() {
      const pendingResult = getProducts({ slug });
      setOpen(true);
      const { data } = await pendingResult;
      setSelectedItem({ ...data, orderQty });

      setproduct(data);
      const obj = {
        _id: data?.parentCat,
        slug: data.slug,
      };
      const { result } = data?._id && (await getProductsByCat(obj));
      if (result) {
        setSimilarproduct(result);
        // location.reload();
      }
      setOpen(false);
    }
    getdata();
  }, [slug]);
  useEffect(() => {
    setSelectedItem({ ...product, orderQty });
  }, [orderQty]);

  return (
    <div>
      <UserLayout>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {product?._id ? (
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                boxShadow: 6,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <LandingPageImage product={product} />
              <Box
                sx={{
                  gap: 5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack direction="column" gap={1}>
                  <Typography variant="h4">
                    {product.title.toUpperCase()}
                  </Typography>
                  <span style={{ display: "flex", gap: 5 }}>
                    <Rating name="read-only" value={4} readOnly />
                    <Typography variant="subtitle1" color={"grey"}>
                      4 reviews
                    </Typography>
                  </span>
                </Stack>
                <span className="d-flex justify-content-between">
                  <Typography sx={{ textAlign: "justify" }}>
                    {product.description}
                  </Typography>
                </span>
                <span style={{ display: "flex", gap: "20px" }}>
                  <Typography variant="subtitle1" color={"grey"}>
                    Color
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    />
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: "Green",
                      }}
                    />
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: "blue",
                      }}
                    />
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: "black",
                      }}
                    />
                  </Stack>
                </span>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color={"grey"}>
                    Qty
                  </Typography>
                  <Box sx={{ minWidth: 80 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                      <Select
                        value={orderQty}
                        name="qty"
                        label="Qty"
                        onChange={handleOnQty}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
                <span className="d-flex gap-5">
                  <Typography variant="h6">${product.price}</Typography>
                  <div>
                    <AddToCart item={selectedItem} />
                    <AddToFav item={product} />
                  </div>
                </span>
              </Box>
            </Box>
            <YouMayLike similarProduct={similarProduct} />
          </Container>
        ) : (
          <h1>No products found</h1>
        )}
      </UserLayout>
    </div>
  );
};
