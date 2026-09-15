// Wedding Data & Themes Configuration

export const THEMES = {
  royalRed: {
    id: 'royalRed',
    name: 'Đỏ Hoàng Gia',
    accentColor: '#DFB15B',
    bgGradient: 'radial-gradient(ellipse at 50% 45%, #7a091d 0%, #42030d 55%, #1f0106 100%)',
    silkPatternOpacity: 0.15,
    goldGlow: 'rgba(255, 215, 0, 0.45)',
    textColor: '#FFF4D4',
    secondaryText: '#F5D08A',
    borderColor: 'rgba(223, 177, 91, 0.4)',
    tagBg: 'rgba(218, 165, 32, 0.18)',
    fontFamilyHeading: "'Playfair Display', serif",
    fontFamilyScript: "'Great Vibes', cursive",
  },
  blushPink: {
    id: 'blushPink',
    name: 'Hồng Lãng Mạn',
    accentColor: '#D48872',
    bgGradient: 'radial-gradient(ellipse at 50% 45%, #4a1525 0%, #2b0b15 55%, #140409 100%)',
    silkPatternOpacity: 0.12,
    goldGlow: 'rgba(244, 182, 193, 0.45)',
    textColor: '#FFF0F3',
    secondaryText: '#E8B4B8',
    borderColor: 'rgba(232, 180, 184, 0.4)',
    tagBg: 'rgba(232, 180, 184, 0.18)',
    fontFamilyHeading: "'Playfair Display', serif",
    fontFamilyScript: "'Alex Brush', cursive",
  },
  emeraldGreen: {
    id: 'emeraldGreen',
    name: 'Xanh Ngọc Bảo',
    accentColor: '#DFB15B',
    bgGradient: 'radial-gradient(ellipse at 50% 45%, #0e3d32 0%, #06221c 55%, #02120e 100%)',
    silkPatternOpacity: 0.15,
    goldGlow: 'rgba(255, 215, 0, 0.4)',
    textColor: '#F2F9F6',
    secondaryText: '#DFB15B',
    borderColor: 'rgba(223, 177, 91, 0.4)',
    tagBg: 'rgba(223, 177, 91, 0.18)',
    fontFamilyHeading: "'Playfair Display', serif",
    fontFamilyScript: "'Great Vibes', cursive",
  },
};

export const DEFAULT_WEDDING_DATA = {
  ceremonyTitle: 'LỄ DẠM NGÕ',
  groomName: 'Việt Cường',
  brideName: 'Minh Hồng',
  dateSolar: '28 . 10 . 2026',
  dateLunar: 'Ngày 19 Tháng 09 Năm Bính Ngọ',
  time: '09:00',
  location: 'Tư Gia Nhà Gái',
  meaningfulQuote: 'Trăm Năm Tình Viên Mãn • Bạc Đầu Nghĩa Phu Thê',
  targetDate: '2026-10-28T09:00:00',
  theme: 'royalRed',
  photos: [
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      caption: 'Khoảnh khắc bắt đầu một hành trình mới',
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
      caption: 'Ánh mắt trao nhau trọn vẹn yêu thương',
    },
    {
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
      caption: 'Nắm chặt tay nhau qua từng năm tháng',
    },
    {
      url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=80',
      caption: 'Hạnh phúc đong đầy trong ngày vui trọn vẹn',
    },
  ],
};

export const STORAGE_KEY = 'vietcuong_minhhong_wedding_config_v1';

export const loadWeddingData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_WEDDING_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Cannot load saved config:', e);
  }
  return DEFAULT_WEDDING_DATA;
};

export const saveWeddingData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Cannot save config:', e);
  }
};
