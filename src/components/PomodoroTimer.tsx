import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  mode: 'work' | 'break';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;
  border-radius: 60px;
  background: linear-gradient(135deg, #f8edeb 0%, #fae1dd 100%);
  color: #463f3a;
`;

const TimerCircle = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 2rem 0;
  border: 12px solid #f4acb7;
  transition: border-color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f4acb7, #ffcad4);
    z-index: -1;
    filter: blur(10px);
    opacity: 0.6;
  }
`;

const TimeDisplay = styled.div`
  font-size: 4rem;
  font-weight: 600;
  color: #463f3a;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2.5rem;
  border-radius: 30px;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.variant === 'primary' ? '#9d8189' : '#d8e2dc'};
  color: ${props => props.variant === 'primary' ? '#ffffff' : '#463f3a'};
  margin: 0.7rem;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.variant === 'primary' ? '#8a7178' : '#c9d3cd'};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ModeIndicator = styled.div`
  font-size: 1.3rem;
  color: #463f3a;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.8rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    mode: 'work'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            const newMode = timer.mode === 'work' ? 'break' : 'work';
            setTimer({
              minutes: newMode === 'work' ? 25 : 5,
              seconds: 0,
              isRunning: false,
              mode: newMode
            });
            return;
          }
          setTimer(prev => ({
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          }));
        } else {
          setTimer(prev => ({
            ...prev,
            seconds: prev.seconds - 1
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.minutes, timer.seconds]);

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({
      minutes: 25,
      seconds: 0,
      isRunning: false,
      mode: 'work'
    });
  };

  return (
    <Container>
      {/* <ModeIndicator>{timer.mode} Session</ModeIndicator> */}
      <TimerCircle>
        <TimeDisplay>
          {String(timer.minutes).padStart(2, '0')}:
          {String(timer.seconds).padStart(2, '0')}
        </TimeDisplay>
      </TimerCircle>
      <ButtonContainer>
        <Button variant="primary" onClick={toggleTimer}>
          {timer.isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="secondary" onClick={resetTimer}>
          Reset
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PomodoroTimer;