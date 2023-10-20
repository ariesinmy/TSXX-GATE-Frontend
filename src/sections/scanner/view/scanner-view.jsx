import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { scanners } from 'src/_mock/scanner';

import ScannerCard from '../scanner-card';
import ScannerSort from '../scanner-sort';
import ScannerFilters from '../scanner-filters';
import ScannerUpload from '../scanner-upload';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------
// scannerItem
// {
//     "id": "16c8098d-9f79-4fdd-be67-c0084b702563",
//     "cover": "/assets/images/products/product_21.jpg",
//     "name": "Nike Air Zoom SuperRep",
//     "status": "danger"
// }

export default function ScannerView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [uploadedImage, setUploadedImage] = useState([]); // 跟踪已上传的图像数据

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // 处理文件上传
  const handleImageUpload = (event) => {

    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file); // 创建图像URL
    const fileName = file.name;
    if (file) {
      const imageData = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: fileName,
        cover: imageUrl,
        status: "danger",
        file,
      };

      const newUploadImageList = [...uploadedImage]
      newUploadImageList.push(imageData);
      setUploadedImage(newUploadImageList);
    }
  };


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Scanner
      </Typography>

      {uploadedImage && (
        <Grid container spacing={3} sx={{my: 4}}>
          {
            uploadedImage.map(imageObj =>
              <Grid xs={12} sm={6} md={3}>
                <ScannerCard scanItem={imageObj} upload />
              </Grid>
            )
          }
          <Grid xs={12} sm={6} md={3}>
            <ScannerUpload onImageUpload={handleImageUpload} />
          </Grid>
        </Grid>
      )}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ScannerFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ScannerSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {scanners.map((scanner) => (
          <Grid key={scanner.id} xs={12} sm={6} md={3}>
            <ScannerCard scanItem={scanner} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
