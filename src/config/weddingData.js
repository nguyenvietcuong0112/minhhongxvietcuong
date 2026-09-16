// Modern Wedding Configuration - Việt Cường & Minh Hồng (Lễ Dạm Ngõ)

export const THEMES = {
  deepRose: {
    id: 'deepRose',
    name: 'Hồng Đậm Hiện Đại',
    bg: 'radial-gradient(ellipse at 50% 35%, #7a1534 0%, #4a091c 60%, #20020b 100%)',
    textColor: '#FFF4F7',
    subTextColor: '#F8C2D0',
    accentColor: '#F5D061',
    knotColor: '#F5D061',
    titleColor: '#FFF2B2',
    nameColor: '#FFFFFF',
    tagBg: 'rgba(245, 208, 97, 0.15)',
    lotusOpacity: 0.5,
  },
  royalRed: {
    id: 'royalRed',
    name: 'Đỏ Rượu Vang (Ảnh 1)',
    bg: 'radial-gradient(ellipse at 50% 35%, #6a0817 0%, #3d030c 60%, #1a0104 100%)',
    textColor: '#FFF4D4',
    subTextColor: '#F5D08A',
    accentColor: '#F5D061',
    knotColor: '#F5D061',
    titleColor: '#FFF4B8',
    nameColor: '#FFFFFF',
    tagBg: 'rgba(245, 208, 97, 0.18)',
    lotusOpacity: 0.45,
  },
  ivoryLotus: {
    id: 'ivoryLotus',
    name: 'Kem Sen Tinh Khôi (Ảnh 2 & 3)',
    bg: 'radial-gradient(ellipse at 50% 35%, #faf8f5 0%, #f4f0eb 55%, #e8e2d8 100%)',
    textColor: '#293d30', // Deep Forest Pine
    subTextColor: '#476352',
    accentColor: '#344e3d',
    knotColor: '#344e3d',
    titleColor: '#24362a',
    nameColor: '#203326',
    tagBg: 'rgba(52, 78, 61, 0.12)',
    lotusOpacity: 0.95,
  },
};

export const DEFAULT_WEDDING_DATA = {
  ceremonyTitle: 'LỄ DẠM NGÕ',
  groomName: 'Việt Cường',
  brideName: 'Minh Hồng',
  dateSolar: '18 09 2026',
  dateLunar: '(08.08 Bính Ngọ)',
  theme: 'ivoryLotus',
  musicUrl: 'https://www.youtube.com/watch?v=MQJJH47WzP4',
  layoutMode: 'center', // 'center' (Toàn cảnh chữ như ảnh 2) hoặc 'duo' (Kết hợp ảnh như ảnh 3)
  autoAlternate: false, // Giữ cố định bố cục người dùng chọn, không tự nhảy loạn xạ
  // Lời cảm ơn và câu chúc chuyển động mượt mà
  messages: [
    'Chúng con xin cảm ơn hai bên gia đình đã yêu thương và vun đắp cho chúng con ạ!',
    '“Trăm năm tình viên mãn • Bạc đầu nghĩa phu thê”',
    '“Duyên thắm trầu cau • Khởi đầu cho một hành trình hạnh phúc mới”',
    '“Nguyện cùng nhau đi qua bao năm tháng, trọn đời yêu thương gắn kết bền lâu”',
  ],
  // 4 ảnh của cặp đôi
  photos: [
    { url: process.env.PUBLIC_URL + '/anh1.jpg', caption: 'Việt Cường & Minh Hồng' },
    { url: process.env.PUBLIC_URL + '/anh2.jpg', caption: 'Khởi Đầu Duyên Lành' },
    { url: process.env.PUBLIC_URL + '/anh3.jpg', caption: 'Nắm Chặt Tay Nhau' },
    { url: process.env.PUBLIC_URL + '/anh4.jpg', caption: 'Trọn Vẹn Hạnh Phúc' },
  ],
};

export const STORAGE_KEY = 'vietcuong_minhhong_wedding_modern_v8';

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
