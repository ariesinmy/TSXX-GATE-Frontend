import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenAI from 'openai';

// ----------------------------------------------------------------------
export default function AssistantView() {
  const openai = useMemo(() => new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    }), []);


  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // [{text: string, user: boolean}]
  

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    async function fetchGPT() {
      if (openai && chatHistory && chatHistory.length > 0 && (chatHistory.length % 2 !== 0)) {
        const userContent = chatHistory[chatHistory.length - 1].text;
        const completions = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userContent }],
          max_tokens: 256,
        });
        console.log(completions);
        const gptResponse = completions.choices[0].message.content;
        const gptMessage = { text: gptResponse, user: false };
        setChatHistory([...chatHistory, gptMessage]);
      }
    }
    fetchGPT();
  }, [chatHistory, openai])

  const handleUserSubmit = async () => {
    if (userInput) {
      // 模擬向chatGPT發送API請求
      const userMessage = { text: userInput, user: true };
      setChatHistory([...chatHistory, userMessage]);
      setUserInput('');
    }
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Assistant</Typography>

          <Button variant="contained" color="inherit">
            <Typography variant="body1" color="inherit" style={{ marginRight: '.3rem' }}>
              Refresh Chat
            </Typography>
            <RefreshIcon />
          </Button>
        </Stack>

        <Box
          flex="1" // 讓Box元素充滿可用的垂直空間
          display="flex"
          flexDirection="column"
          justifyContent="flex-end" // 此行使對話區固定在底部
          minHeight="70vh" // 或其他您選擇的適當高度
          overflowy="auto" // 如果對話區內容多於可視區域，添加垂直滾動條
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={message.user ? 'flex-end' : 'flex-start'}
              >
                <Box
                  bgcolor={message.user ? 'primary.main' : 'info.main'}
                  color="white"
                  py={1}
                  px={2}
                  borderRadius={8}
                  mb={1}
                  maxWidth="70%"
                  wordWrap="break-word"
                >
                  {message.text}
                </Box>
              </Box>
            ))
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="70vh" // 調整高度以適應您的需求
            >
              <Typography variant="h2" color="#DFE3E8">
                TSXX-GATE
              </Typography>
              <Typography variant="h3" color="#C4CDD5">
                Assistant
              </Typography>
              <Typography variant="h4" color="#C4CDD5">
                Start Conversation!
              </Typography>
            </Box>
          )}
        </Box>

        <Stack direction="row" display="flex" alignItems="center">
          <TextField
            variant="outlined"
            label="Send your message"
            fullWidth
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUserSubmit();
              }
            }}
            style={{
              marginRight: '1.5rem',
              borderRadius: '20px',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUserSubmit}
            style={{
              fontSize: '1rem',
              padding: '0.75rem',
            }}
          >
            Send
          </Button>
        </Stack>
      </Container>
    </>
  );
}
