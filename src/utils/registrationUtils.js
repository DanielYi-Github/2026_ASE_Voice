export const REGISTRATION_STATUS = {
  BEFORE: 'BEFORE',
  OPEN: 'OPEN',
  ENDED: 'ENDED'
};

// 首頁主 Banner 的四個階段(依時間自動切換)
export const HERO_MODE = {
  HERO: 'HERO',             // 報名期間的原始主視覺
  FINALIST: 'FINALIST',     // 7/8 起:決賽名單公佈
  PREDICTION: 'PREDICTION', // 8/1 起:冠軍預測活動
  LIVE: 'LIVE'              // 9/7 起:直播倒數 → 9/11 14:30 直播
};

// 使用 ISO 格式並包含台灣時區 +08:00
const START_DATE = new Date('2026-06-01T00:00:00+08:00');
const END_DATE = new Date('2026-06-21T23:59:59+08:00');
export const FINALIST_ANNOUNCEMENT_DATE = new Date('2026-07-08T00:00:00+08:00');
export const PREDICTION_LAUNCH_DATE = new Date('2026-08-01T00:00:00+08:00');
export const LIVE_COUNTDOWN_DATE = new Date('2026-09-07T00:00:00+08:00');
export const LIVE_START_DATE = new Date('2026-09-11T14:30:00+08:00');

const getSearch = () =>
  typeof window !== 'undefined' ? window.location.search : '';

// 目前時間;網址帶 ?mockdate=2026-09-11T15:00 時以該時間(台灣時區)模擬,供上線前預覽。
// ?preview=<階段> 也會連動模擬該階段起始時間,讓時程調暗等所有時間邏輯與畫面一致。
export const getNow = () => {
  const search = getSearch();
  const match = search.match(/[?&]mockdate=([^&]+)/);
  if (match) {
    let value = decodeURIComponent(match[1]);
    if (!/[Zz]|[+-]\d{2}:?\d{2}$/.test(value)) {
      if (!value.includes('T')) value += 'T00:00:00';
      value += '+08:00';
    }
    const mocked = new Date(value);
    if (!isNaN(mocked.getTime())) return mocked;
  }
  if (search.includes('preview=onair')) return LIVE_START_DATE;
  if (search.includes('preview=live')) return LIVE_COUNTDOWN_DATE;
  if (search.includes('preview=prediction')) return PREDICTION_LAUNCH_DATE;
  if (search.includes('preview=finalist')) return FINALIST_ANNOUNCEMENT_DATE;
  return new Date();
};

export const getRegistrationStatus = () => {
  const now = getNow();

  if (now < START_DATE) {
    return REGISTRATION_STATUS.BEFORE;
  } else if (now > END_DATE) {
    return REGISTRATION_STATUS.ENDED;
  } else {
    return REGISTRATION_STATUS.OPEN;
  }
};

export const isFinalistAnnounced = () => {
  if (getSearch().includes('preview=finalist')) {
    return true;
  }
  return getNow() >= FINALIST_ANNOUNCEMENT_DATE;
};

export const isPredictionLaunched = () => {
  if (getSearch().includes('preview=prediction')) {
    return true;
  }
  return getNow() >= PREDICTION_LAUNCH_DATE;
};

// 決定主 Banner 顯示哪個階段;?preview=finalist|prediction|live 可強制預覽
export const getHeroMode = () => {
  const search = getSearch();
  if (search.includes('preview=finalist')) return HERO_MODE.FINALIST;
  if (search.includes('preview=prediction')) return HERO_MODE.PREDICTION;
  if (search.includes('preview=live') || search.includes('preview=onair')) return HERO_MODE.LIVE;

  const now = getNow();
  if (now >= LIVE_COUNTDOWN_DATE) return HERO_MODE.LIVE;
  if (now >= PREDICTION_LAUNCH_DATE) return HERO_MODE.PREDICTION;
  if (now >= FINALIST_ANNOUNCEMENT_DATE) return HERO_MODE.FINALIST;
  return HERO_MODE.HERO;
};

// 直播是否已開始(?preview=onair 可強制預覽播放器)
export const isLiveStarted = () => {
  if (getSearch().includes('preview=onair')) {
    return true;
  }
  return getNow() >= LIVE_START_DATE;
};

export const getTimeRemaining = () => {
  const total = START_DATE.getTime() - getNow().getTime();
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

// 直播開始(9/11 14:30)前的倒數
export const getLiveTimeRemaining = () => {
  const total = LIVE_START_DATE.getTime() - getNow().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

// 對應 t.info.timelineItems 五個項目的結束時間(順序須一致)
const TIMELINE_END_DATES = [
  new Date('2026-06-21T23:59:59+08:00'), // 初賽線上海選
  new Date('2026-07-04T23:59:59+08:00'), // 初賽審評
  new Date('2026-07-08T23:59:59+08:00'), // 公告決賽名單(7/8 全天為公佈日保持亮起,7/9 起調暗)
  new Date('2026-08-22T23:59:59+08:00'), // 決賽培訓與樂團彩排
  new Date('2026-09-11T23:59:59+08:00')  // 活動總決賽
];

export const isTimelineItemPast = (index) => {
  const endDate = TIMELINE_END_DATES[index];
  if (!endDate) return false;
  return getNow() > endDate;
};

// 從各種 YouTube 網址格式解析出影片 ID(/live/、youtu.be、watch?v=、/embed/)
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:live|embed|shorts)\/|youtu\.be\/|youtube\.com\/watch\?(?:.*&)?v=)([A-Za-z0-9_-]{6,})/
  );
  return match ? match[1] : null;
};
