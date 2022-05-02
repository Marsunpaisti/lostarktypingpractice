import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import keySound from '../assets/keysound.mp3';
import failSound from '../assets/failsound.mp3';
import winSound from '../assets/winsound.mp3';

const allowedKeys = 'qwerasdf';

export interface Score {
  time: number;
  success: boolean;
}

export const TypingKeyboard = () => {
  const [currentKeyIndex, setCurrentKeyIndex] = useState<number>(0);
  const [keys, setKeys] = useState<string>('');
  const [startedTime, setStartedTime] = useState(Date.now());
  const [scores, setScores] = useState<Score[]>([]);
  const [failedKeys, setFailedKeys] = useState<number[]>([]);

  useEffect(() => {
    if (scores.length > 10) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores.shift();
        return newScores;
      });
    }
  }, [scores]);
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    let newKeys = '';
    for (let i = 0; i < 7; i++) {
      newKeys += allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    }
    setCurrentKeyIndex(0);
    setKeys(newKeys);
    setStartedTime(Date.now());
    setFailedKeys([]);
  };

  useEffect(() => {
    const handleKeyTyped = (e: KeyboardEvent) => {
      if (!allowedKeys.split('').includes(e.key.toLowerCase())) {
        return;
      }
      if (currentKeyIndex > keys.length - 1) return;
      if (failedKeys.length > 0) return;
      if (e.key.toLowerCase() === keys[currentKeyIndex].toLowerCase()) {
        setCurrentKeyIndex((prev) => prev + 1);
        if (currentKeyIndex < keys.length) {
          const keySoundFx = new Audio(keySound);
          keySoundFx.playbackRate = 2;
          keySoundFx.play();
        } else {
          const winSoundFx = new Audio(winSound);
          winSoundFx.playbackRate = 1.5;
          winSoundFx.play();
        }
      } else {
        const failSoundFx = new Audio(failSound);
        failSoundFx.playbackRate = 1;
        failSoundFx.play();
        setFailedKeys((prev) => [...prev, currentKeyIndex]);
        setScores((prev) => {
          return [
            ...prev,
            {
              time: Date.now() - startedTime,
              success: false,
            },
          ];
        });
        setTimeout(() => {
          resetGame();
        }, 1500);
        return;
      }

      if (currentKeyIndex === keys.length - 1) {
        setScores((prev) => {
          return [
            ...prev,
            {
              time: Date.now() - startedTime,
              success: true,
            },
          ];
        });
        setTimeout(() => {
          resetGame();
        }, 600);
      }
    };

    window.addEventListener('keydown', handleKeyTyped);
    return () => window.removeEventListener('keydown', handleKeyTyped);
  }, [currentKeyIndex, failedKeys, keys, startedTime]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        {keys.split('').map((key, ix) => {
          return (
            <Box
              key={ix}
              sx={{
                transform:
                  currentKeyIndex === ix ? 'translateY(-8px)' : undefined,
                outline:
                  currentKeyIndex === ix ? '2px solid #e1dbb6' : undefined,
                width: '40px',
                height: '40px',
                backgroundColor:
                  currentKeyIndex === ix
                    ? '#e1dbb6'
                    : currentKeyIndex > ix
                    ? 'rgba(200, 200, 200, 1)'
                    : 'rgba(200, 200, 200, 1)',
                opacity: currentKeyIndex <= ix ? 1 : 0.5,
                borderRadius: '6px',
                border: '1px solid rgba(114, 114, 114, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '34px',
                boxShadow:
                  currentKeyIndex === ix
                    ? '-1px 4px 15px -3px #e1dbb6'
                    : '-1px 4px 15px -3px rgba(0,0,0,0.43)',
              }}
            >
              {key.toUpperCase()}
            </Box>
          );
        })}
      </Box>
      <Box
        textAlign="center"
        marginTop={10}
        sx={{ background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}
      >
        <Typography variant="h6">Last 10 scores</Typography>
        <Typography variant="h6">
          {scores.length > 0 &&
            `Average time: ${(
              scores
                .filter((s) => s.success)
                .reduce((acc, cur) => cur.time + acc / scores.length, 0) / 1000
            ).toFixed(2)}s`}
        </Typography>{' '}
        <Typography variant="h6">
          {scores.length > 0 &&
            `Fail rate: ${(
              (scores.filter((s) => !s.success).length / scores.length) *
              100
            ).toFixed(1)}%`}
        </Typography>
        {scores.map((score, ix) => {
          return (
            <Typography
              key={ix}
              sx={{ color: score.success ? 'green' : 'red' }}
            >
              {(score.time / 1000).toFixed(2)}s
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};
