export const REGISTRATION_STATUS = {
  BEFORE: 'BEFORE',
  OPEN: 'OPEN',
  ENDED: 'ENDED'
};

// 使用 ISO 格式並包含台灣時區 +08:00
export const START_DATE = new Date('2026-06-01T00:00:00+08:00');
export const END_DATE = new Date('2026-06-21T23:59:59+08:00');

export const getRegistrationStatus = () => {
  const now = new Date();
  
  if (now < START_DATE) {
    return REGISTRATION_STATUS.BEFORE;
  } else if (now > END_DATE) {
    return REGISTRATION_STATUS.ENDED;
  } else {
    return REGISTRATION_STATUS.OPEN;
  }
};

export const getTimeRemaining = () => {
  const total = START_DATE.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
};
