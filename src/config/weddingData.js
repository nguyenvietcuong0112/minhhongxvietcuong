// Modern Wedding Configuration - Việt Cường & Minh Hồng (Lễ Dạm Ngõ)

export const THEMES = {
  ivoryLotus: {
    id: 'ivoryLotus',
    name: 'Kem Sen Tinh Khôi (Ảnh 2 & 3)',
    shortName: 'Kem Sen',
    desc: 'Nhã nhặn, thanh khiết (chuẩn ảnh 2 & 3)',
    icon: '🌿',
    bg: 'radial-gradient(ellipse at 50% 35%, #faf8f5 0%, #f4f0eb 55%, #e8e2d8 100%)',
    swatchGradient: 'linear-gradient(135deg, #faf8f5, #e8e2d8)',
    textColor: '#293d30', // Deep Forest Pine
    subTextColor: '#476352',
    accentColor: '#344e3d',
    knotColor: '#344e3d',
    titleColor: '#24362a',
    nameColor: '#203326',
    tagBg: 'rgba(52, 78, 61, 0.12)',
    lotusOpacity: 0.95,
  },
  royalRed: {
    id: 'royalRed',
    name: 'Đỏ Rượu Vang (Ảnh 1)',
    shortName: 'Đỏ Rượu',
    desc: 'Trang trọng, quý phái lễ gia tiên',
    icon: '🏮',
    bg: 'radial-gradient(ellipse at 50% 35%, #6a0817 0%, #3d030c 60%, #1a0104 100%)',
    swatchGradient: 'linear-gradient(135deg, #8a0c20, #3d030c)',
    textColor: '#FFF4D4',
    subTextColor: '#F5D08A',
    accentColor: '#F5D061',
    knotColor: '#F5D061',
    titleColor: '#FFF4B8',
    nameColor: '#FFFFFF',
    tagBg: 'rgba(245, 208, 97, 0.18)',
    lotusOpacity: 0.45,
  },
  blushSakura: {
    id: 'blushSakura',
    name: 'Hồng Phấn Ngọt Ngào',
    shortName: 'Hồng Phấn',
    desc: 'Dịu dàng, tươi sáng, trẻ trung',
    icon: '🌸',
    bg: 'radial-gradient(ellipse at 50% 40%, #FFF0F4 0%, #FDCBD6 55%, #F9ADC0 100%)',
    swatchGradient: 'linear-gradient(135deg, #FFF0F4, #F9ADC0)',
    textColor: '#721327',
    subTextColor: '#831b32',
    accentColor: '#e84370',
    knotColor: '#e84370',
    titleColor: '#7a152d',
    nameColor: '#6a0f23',
    tagBg: 'rgba(232, 67, 112, 0.14)',
    lotusOpacity: 0.9,
  },
  deepRose: {
    id: 'deepRose',
    name: 'Hồng Đậm Hiện Đại',
    shortName: 'Hồng Đậm',
    desc: 'Nổi bật, rực rỡ, phong cách',
    icon: '🌺',
    bg: 'radial-gradient(ellipse at 50% 35%, #7a1534 0%, #4a091c 60%, #20020b 100%)',
    swatchGradient: 'linear-gradient(135deg, #961b40, #4a091c)',
    textColor: '#FFF4F7',
    subTextColor: '#F8C2D0',
    accentColor: '#F5D061',
    knotColor: '#F5D061',
    titleColor: '#FFF2B2',
    nameColor: '#FFFFFF',
    tagBg: 'rgba(245, 208, 97, 0.15)',
    lotusOpacity: 0.5,
  },
};

export const ORNAMENTS = {
  lotus: {
    id: 'lotus',
    name: 'Hoa Sen Hai Bên (Mẫu Thật)',
    shortName: 'Hoa Sen',
    desc: 'Tranh sen màu nước nở rộ 2 góc thật 100%',
    icon: '🪷',
  },
  real_flowers: {
    id: 'real_flowers',
    name: 'Hoa Tươi Góc (Thật 100%)',
    shortName: 'Hoa Tươi',
    desc: 'Cụm hoa tươi góc phong cách sang trọng',
    icon: '🌺',
  },
  minimal: {
    id: 'minimal',
    name: 'Tối Giản Thuần Khiết',
    shortName: 'Tối Giản',
    desc: 'Không hoa góc, phông trơn thanh lịch',
    icon: '🕊️',
  },
};

export const DEFAULT_WEDDING_DATA = {
  ceremonyTitle: 'LỄ DẠM NGÕ',
  groomName: 'Việt Cường',
  brideName: 'Minh Hồng',
  dateSolar: '18.09.2026',
  dateLunar: '(08.08 Bính Ngọ)',
  theme: 'deepRose', // Mặc định nền Hồng Đậm theo yêu cầu
  musicUrl: 'https://www.youtube.com/watch?v=MQJJH47WzP4',
  layoutMode: 'center', // 'center' (Chữ Lớn Toàn Cảnh Full) hoặc 'duo' (Kèm Ảnh)
  autoAlternate: false,
  slideDuration: 12, // 12 giây chuyển ngẫu nhiên mỗi cảnh / ảnh theo yêu cầu
  slideshowCycleMode: 'alternate', // 'alternate' (12s Toàn Cảnh ⮂ 12s Kèm Ảnh) hoặc 'batch' (12s Toàn Cảnh ➔ Hết 6 Ảnh ➔ Toàn Cảnh)
  centerEmblem: 'rings', // 'rings' (Đôi Nhẫn Cưới Vàng Kim Chuyển Động) hoặc 'knot' (Song Hỷ Truyền Thống)
  // 4 lời chúc ý nghĩa kèm 4 ảnh cặp đôi (đã loại bỏ anh3, anh4 theo yêu cầu)
  messages: [
    'Xin cảm ơn sự yêu thương của hai bên gia đình và tình cảm quý báu của cả nhà đã góp mặt trong ngày đặc biệt này 💖',
    'Cảm ơn cha mẹ hai bên đã luôn yêu thương, chở che và vun đắp cho tình yêu của chúng con đơm hoa kết trái 💕',
    'Hạnh phúc không phải là điểm đến, mà là từng khoảnh khắc chúng con cùng nắm chặt tay nhau đi suốt cuộc đời 💐',
    'Nguyện một đời thương nhau bình yên, sớm tối có nhau, cùng nhau xây đắp tổ ấm ngập tràn yêu thương và tiếng cười 💖',
  ],
  // 4 ảnh của cặp đôi kèm 4 lời chúc tương ứng
  photos: [
    {
      url: process.env.PUBLIC_URL + '/anh1.jpg',
      caption: 'Việt Cường & Minh Hồng',
      message: 'Xin cảm ơn sự yêu thương của hai bên gia đình và tình cảm quý báu của cả nhà đã góp mặt trong ngày đặc biệt này 💖',
    },
    {
      url: process.env.PUBLIC_URL + '/anh2.jpg',
      caption: 'Khởi Đầu Duyên Lành',
      message: 'Cảm ơn cha mẹ hai bên đã luôn yêu thương, chở che và vun đắp cho tình yêu của chúng con đơm hoa kết trái 💕',
    },
    {
      url: process.env.PUBLIC_URL + '/anh5.jpg',
      caption: 'Khoảnh Khắc Ngọt Ngào',
      message: 'Hạnh phúc không phải là điểm đến, mà là từng khoảnh khắc chúng con cùng nắm chặt tay nhau đi suốt cuộc đời 💐',
    },
    {
      url: process.env.PUBLIC_URL + '/anh6.jpg',
      caption: 'Chung Đôi Hạnh Phúc',
      message: 'Nguyện một đời thương nhau bình yên, sớm tối có nhau, cùng nhau xây đắp tổ ấm ngập tràn yêu thương và tiếng cười 💖',
    },
  ],
  fontFamily: 'dancing', // 'dancing' (Dancing Script) hoặc 'charm' (Charm)
  ornament: 'lotus', // 'lotus', 'real_flowers', 'minimal'
};

export const STORAGE_KEY = 'vietcuong_minhhong_wedding_v18_4photos';

export const loadWeddingData = () => {
  try {
    // Clear legacy keys that might contain references to deleted photos (anh3, anh4)
    const legacyKeys = [
      'vietcuongminhhong_wedding_config',
      'vietcuong_minhhong_wedding_modern_v1',
      'vietcuong_minhhong_wedding_modern_v2',
      'vietcuong_minhhong_wedding_modern_v15',
      'vietcuong_minhhong_wedding_modern_v16',
      'vietcuong_minhhong_wedding_modern_v17',
      'vietcuongminhhong_wedding_modern_v17',
    ];
    legacyKeys.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    });

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.dateSolar === '18 09 2026' || parsed.dateSolar === '18 . 09 . 2026') {
        parsed.dateSolar = DEFAULT_WEDDING_DATA.dateSolar;
      }
      if (!ORNAMENTS[parsed.ornament]) {
        parsed.ornament = 'lotus';
      }
      // Strict photo filter: Never allow deleted photos (anh3, anh4)
      if (Array.isArray(parsed.photos)) {
        parsed.photos = parsed.photos.filter(
          (p) => p && p.url && !p.url.includes('anh3') && !p.url.includes('anh4')
        );
      }
      if (!parsed.photos || parsed.photos.length !== 4) {
        parsed.photos = DEFAULT_WEDDING_DATA.photos;
      }
      if (!parsed.messages || parsed.messages.length !== 4) {
        parsed.messages = DEFAULT_WEDDING_DATA.messages;
      }
      if (!parsed.slideDuration || parsed.slideDuration < 10) {
        parsed.slideDuration = 12;
      }
      if (!parsed.slideshowCycleMode) {
        parsed.slideshowCycleMode = 'alternate';
      }
      return { ...DEFAULT_WEDDING_DATA, ...parsed };
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
