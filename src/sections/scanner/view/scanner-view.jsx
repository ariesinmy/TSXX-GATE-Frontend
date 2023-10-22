import { useState, useEffect } from 'react';

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
import { useTranslation } from 'react-i18next';
import axios from 'axios';


// ----------------------------------------------------------------------
// scannerItem
// {
//     "id": "16c8098d-9f79-4fdd-be67-c0084b702563",
//     "cover": "/assets/images/products/product_21.jpg",
//     "name": "Nike Air Zone SuperRep",
//     "status": "danger"
// }

export default function ScannerView() {
  const { t } = useTranslation();

  const [openFilter, setOpenFilter] = useState(false);
  const [labeledImage, setLabeledImageImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    console.log("file change", event);
    setIsProcessing(true);
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const newImageInference = async () => {
      if (!selectedFile) return;

      const fileName = selectedFile?.name ?? `upload_image${selectedFile.length}`;
      const formData = new FormData();
      formData.append('img_file', selectedFile);

      axios({
        method: 'post',
        url: `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/common/imageInference`,
        data: formData,
        responseType: 'blob', // 设置响应类型为 Blob
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((response) => {
          // 处理成功的响应
          const resultsHeaderValue = response.headers.results;
          console.log(response.headers)
          console.log('results值：', resultsHeaderValue);
          console.log('成功：', response.data);
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);

          const imageData = {
            id: Date.now(), // 使用时间戳作为唯一 ID
            name: fileName,
            cover: url,
            status: "danger",
          };

          const newLabeledImageList = [...labeledImage]
          newLabeledImageList.push(imageData);
          setLabeledImageImage(newLabeledImageList);
          setIsProcessing(false);
        })
        .catch((error) => {
          // 处理错误
          console.error('错误：', error);
        });
    }
    newImageInference();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("scanner.Scanner")}
      </Typography>

      {labeledImage && (
        <Grid container spacing={3} sx={{ my: 4 }}>
          {
            labeledImage.map((imageObj, index) =>
              <Grid xs={12} sm={6} md={3} key={index}>
                <ScannerCard scanItem={imageObj} upload />
              </Grid>
            )
          }
          <Grid xs={12} sm={6} md={3}>
            <ScannerUpload onImageUpload={handleFileChange} isProcessing={isProcessing}/>
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
