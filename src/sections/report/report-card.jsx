/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import jsPDF from 'jspdf';

// ----------------------------------------------------------------------

export default function ReportCard({ report, handleOpen, handleSetReportId, handleDeleteReportItems }) {
  const { id, title, content, avatarUrl, createdAt } = report;

  const renderAvatar = (
    <Avatar
      src={avatarUrl}
      sx={{
        width: 32,
        height: 32,
      }}
    />
  );

  const handleOpenContent = () => {
    handleSetReportId(id)
  };

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
      onClick={() => handleOpenContent()}
    >
      {title}
    </Link>
  );

  const handleDeleteReport = () => {
    // eslint-disable-next-line no-alert
    const userConfirmed = window.confirm("確定要刪除週報嗎?");
    if (userConfirmed) {
      console.log("success")
      // 執行刪除操作
      handleDeleteReportItems(id);
    }
  }

  const handleSendMailReport = () => {
    console.log(`share report:${id}`);
    const emailSubject = title; // 电子邮件主题
    const emailBody = content;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  }

  const handleDirectMailReport = () => { };

  const generatePDF = () => {
    const doc = new jsPDF();

    const words = content.split(' '); // 将句子分割成单词
    const lines = [];

    for (let i = 0; i < words.length; i += 10) {
      const line = words.slice(i, i + 10).join(' '); // 将3个单词组合为一行
      lines.push(line);
    }

    // 设置标题
    doc.setFontSize(17);
    doc.text(title, 8, 20);

    // 设置正文文本
    doc.setFontSize(14);
    let yPosition = 40; // 定义文本的起始 y 坐标位置

    lines.forEach(line => {
        doc.text(line, 20, yPosition);
        yPosition += 10; // 每行之间的垂直距离
    });

    doc.save(`${title}.pdf`);
  };

  const getIconHandler = (iconIndex) => {
    if (iconIndex === 0) return () => handleDeleteReport();
    if (iconIndex === 1) return () => handleSendMailReport();
    if (iconIndex === 2) return () => handleDirectMailReport();
    return () => generatePDF();
  }

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { icon: 'mingcute:delete-fill' },
        { icon: 'majesticons:mail' },
        { icon: 'eva:share-fill' },
        { icon: 'ph:download-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          onClick={getIconHandler(_index)}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5, cursor: "pointer" }} />
        </Stack>
      ))}
    </Stack>
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        color: 'text.disabled',
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  return (
    <Grid xs={12} sm={6} md={3}>
      <Card>
        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {renderAvatar}
            <Box>{renderDate}</Box>
          </Box>

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

ReportCard.propTypes = {
  report: PropTypes.object.isRequired,
  handleOpen: PropTypes.func,
  handleSetReportId: PropTypes.func,
  handleDeleteReportItems: PropTypes.func,
};
