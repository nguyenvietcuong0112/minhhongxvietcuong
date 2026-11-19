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
  musicUrl: 'https://www.youtube.com/watch?v=E1FzUaZsdGk', // Nhạc nền: Dắt Anh Về Nhà (ICM x Thoại Nghi x Trung Đức)
  songTitle: 'Dắt Anh Về Nhà - ICM x Thoại Nghi x Trung Đức',
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

/**
 * DEFAULT_INVITATION_DATA: Data for the interactive online wedding invitation
 * (Thiệp Cưới Online Tương Tác cho Việt Cường & Minh Hồng)
 */
export const DEFAULT_INVITATION_DATA = {
  groom: {
    fullName: 'Nguyễn Việt Cường',
    shortName: 'Việt Cường',
    birthYear: '2000',
    role: 'Trưởng Nam • Canh Thìn (2000)',
    avatar: process.env.PUBLIC_URL + '/anh1.jpg',
    father: 'Nguyễn Văn Hùng',
    mother: 'Lê Thị Thu',
    bank: 'MB Bank (Ngân hàng Quân Đội)',
    accountNumber: '329998686',
    accountName: 'NGUYEN VIET CUONG',
    qrUrl: process.env.PUBLIC_URL + '/assets/qr/qr_chu_re.jpg',
    phone: '0372 736 753',
  },
  bride: {
    fullName: 'Lê Minh Hồng',
    shortName: 'Minh Hồng',
    birthYear: '2002',
    role: 'Út Nữ • Nhâm Ngọ (2002)',
    avatar: process.env.PUBLIC_URL + '/anh2.jpg',
    father: 'Lê Đình Kiên',
    mother: 'Phạm Thị Lan',
    bank: 'VietinBank - CN Hai Bà Trưng',
    accountNumber: '105872273096',
    accountName: 'LE MINH HONG',
    qrUrl: process.env.PUBLIC_URL + '/assets/qr/qr_co_dau.jpg',
    phone: '0977 698 975',
  },
  schedule: {
    // Ngày 1: Lễ Ăn Hỏi & Tiệc Mừng tại Nhà Gái (26/12/2026)
    day1: {
      key: 'gai',
      badge: '🌸 LỄ ĂN HỎI & TIỆC MỪNG',
      title: 'Lễ Ăn Hỏi & Tiệc Mừng Tại Nhà Gái',
      solarDate: '26.12.2026',
      lunarDate: '18.11 năm Bính Ngọ',
      dayOfWeek: 'Thứ Bảy',
      targetDate: '2026-12-26T09:00:00+07:00',
      venueName: 'Tư Gia Nhà Gái',
      venueAddress: '37 Cổng Si, Thôn Bầu, Xã Thiên Lộc, Hà Nội',
      mapEmbedQuery: '21.1258861,105.7768434',
      mapUrl: 'https://maps.app.goo.gl/H6qBMgzRq876AjXs9',
      events: [
        { time: '09:00', title: 'Nhà Trai Xuất Phát & Lễ Ăn Hỏi', desc: 'Đoàn Nhà Trai khởi hành lúc 09:00 sáng mang tráp sính lễ sang Tư Gia Nhà Gái làm Lễ Ăn Hỏi' },
        { time: '11:30', title: 'Tiệc Mừng Thân Mật', desc: 'Kính mời quan khách và hai bên gia đình cùng dùng bữa cơm thân mật chung vui' },
        { time: '15:00', title: 'Hoàn Thành Buổi Lễ (Dự Kiến)', desc: 'Kết thúc chương trình Lễ Ăn Hỏi tại Nhà Gái trong niềm hân hoan trọn vẹn' }
      ]
    },
    // Ngày 2: Đại Lễ Thành Hôn & Đón Dâu tại Nhà Trai (27/12/2026)
    day2: {
      key: 'trai',
      badge: '👑 ĐẠI LỄ THÀNH HÔN',
      title: 'Đại Lễ Thành Hôn & Tiệc Cưới Tại Nhà Trai',
      solarDate: '27.12.2026',
      lunarDate: '19.11 năm Bính Ngọ',
      dayOfWeek: 'Chủ Nhật',
      targetDate: '2026-12-27T12:00:00+07:00',
      venueName: 'Tư Gia Nhà Trai',
      venueAddress: 'Thôn Viên Nội, Đường Vân Trì, Xã Phúc Thịnh, Hà Nội',
      mapEmbedQuery: '21.136830,105.815208',
      mapUrl: 'https://maps.app.goo.gl/TK5p2BFqZta1AstXA',
      events: [
        { time: '10:30', title: 'Đón Khách & Khai Tiệc Nhà Trai', desc: 'Đón tiếp họ hàng, bạn bè thân hữu đến chung vui tại Tư Gia Nhà Trai' },
        { time: '12:00', title: 'Nhà Trai Xuất Phát Đón Dâu', desc: 'Đoàn xe hoa khởi hành lúc 12:00 trưa sang Tư Gia Nhà Gái rước nàng dâu Lê Minh Hồng về dinh' },
        { time: '13:15', title: 'Nghi Lễ Thành Hôn & Gia Tiên', desc: 'Ra mắt hai họ, cử hành nghi lễ Thành Hôn thiêng liêng trước bàn thờ Gia Tiên' },
        { time: '15:00', title: 'Bế Mạc Đại Lễ (Dự Kiến)', desc: 'Khép lại ngày Đại Lễ Thành Hôn ngập tràn tiếng cười và lời chúc phúc' }
      ]
    }
  },
  loveStory: [
    {
      year: 'MÙA THU 2021',
      title: 'Lần Đầu Gặp Gỡ',
      desc: 'Giữa lòng Hà Nội một chiều thu lộng gió, định mệnh đã cho chúng mình vô tình chạm ánh mắt nhau, mở ra câu chuyện tình yêu diệu kỳ.',
      img: process.env.PUBLIC_URL + '/anh1.jpg'
    },
    {
      year: 'MÙA HÈ 2023',
      title: 'Chuyến Đi Của Thanh Xuân',
      desc: 'Cùng nhau vượt qua hàng ngàn cây số, đón bình minh và sẻ chia mọi buồn vui. Khoảnh khắc ấy chúng mình nhận ra người bên cạnh chính là duy nhất.',
      img: process.env.PUBLIC_URL + '/anh2.jpg'
    },
    {
      year: 'MÙA ĐÔNG 2025',
      title: 'Lời Cầu Hôn Ngọt Ngào',
      desc: 'Dưới ánh hoàng hôn ấm áp, anh đã quỳ gối trao chiếc nhẫn ước hẹn trăm năm. Và câu trả lời "Em đồng ý" đã gắn kết hai trái tim trọn đời.',
      img: process.env.PUBLIC_URL + '/anh5.jpg'
    },
    {
      year: '26 - 27.12.2026',
      title: 'Ngày Chung Đôi Hạnh Phúc',
      desc: 'Chính thức nắm chặt tay nhau bước vào lễ đường thiêng liêng, cùng nhau xây đắp mái ấm bình yên ngập tràn tình yêu và tiếng cười.',
      img: process.env.PUBLIC_URL + '/anh6.jpg'
    }
  ],
  // 15 VỊ TRÍ ẢNH CƯỚI CÓ THỂ THAY THẾ (Dễ dàng thay đổi URL sau này)
  gallery: [
    { id: 1, url: process.env.PUBLIC_URL + '/anh1.jpg', title: 'Khởi Đầu Duyên Lành', category: 'Ngoại Cảnh', caption: 'Những bước chân đầu tiên trên con đường chung đôi' },
    { id: 2, url: process.env.PUBLIC_URL + '/anh2.jpg', title: 'Nụ Cười Rạng Rỡ', category: 'Khoảnh Khắc', caption: 'Nụ cười tỏa nắng của nàng thơ Minh Hồng' },
    { id: 3, url: process.env.PUBLIC_URL + '/anh5.jpg', title: 'Khoảnh Khắc Ngọt Ngào', category: 'Studio', caption: 'Ấm áp cái ôm siết nhẹ đầy yêu thương' },
    { id: 4, url: process.env.PUBLIC_URL + '/anh6.jpg', title: 'Nguyện Ước Trăm Năm', category: 'Lễ Đường', caption: 'Ánh mắt hướng về tương lai ngập tràn hy vọng' },
    { id: 5, url: process.env.PUBLIC_URL + '/anh1.jpg', title: 'Dưới Tán Cây Thu Hà Nội', category: 'Ngoại Cảnh', caption: 'Mùa thu dịu dàng lưu dấu câu chuyện tình yêu' },
    { id: 6, url: process.env.PUBLIC_URL + '/anh2.jpg', title: 'Nắm Chặt Tay Nhau', category: 'Khoảnh Khắc', caption: 'Dù mưa giông bão tố vẫn luôn có bàn tay anh nắm chặt' },
    { id: 7, url: process.env.PUBLIC_URL + '/anh5.jpg', title: 'Lời Cầu Hôn Dưới Hoàng Hôn', category: 'Studio', caption: 'Giây phút thiêng liêng nhất của cuộc đời' },
    { id: 8, url: process.env.PUBLIC_URL + '/anh6.jpg', title: 'Chung Đôi Hạnh Phúc', category: 'Lễ Đường', caption: 'Bên nhau sớm tối trọn một đời an yên' },
    { id: 9, url: process.env.PUBLIC_URL + '/anh1.jpg', title: 'Giây Phút Bình Yên', category: 'Khoảnh Khắc', caption: 'Hạnh phúc giản dị từ những điều nhỏ bé' },
    { id: 10, url: process.env.PUBLIC_URL + '/anh2.jpg', title: 'Nụ Cười Hạnh Phúc', category: 'Studio', caption: 'Khoảnh khắc ngọt ngào ghi dấu thanh xuân' },
    { id: 11, url: process.env.PUBLIC_URL + '/anh5.jpg', title: 'Hẹn Ước Trọn Đời', category: 'Ngoại Cảnh', caption: 'Cùng nhau đi qua bốn mùa thương nhớ' },
    { id: 12, url: process.env.PUBLIC_URL + '/anh6.jpg', title: 'Tình Yêu Đơm Hoa', category: 'Lễ Đường', caption: 'Ngày hai trái tim chính thức hòa làm một' },
    { id: 13, url: process.env.PUBLIC_URL + '/anh1.jpg', title: 'Ánh Chiều Lãng Mạn', category: 'Ngoại Cảnh', caption: 'Mỗi khoảnh khắc có em đều là phép màu' },
    { id: 14, url: process.env.PUBLIC_URL + '/anh2.jpg', title: 'Sẵn Sàng Bước Vào Lễ Đường', category: 'Studio', caption: 'Tấm thiệp báo hỷ trao gửi ngàn yêu thương' },
    { id: 15, url: process.env.PUBLIC_URL + '/anh6.jpg', title: 'Trọn Đời Bên Nhau', category: 'Lễ Đường', caption: 'Việt Cường & Minh Hồng - 26 • 27.12.2026' }
  ],
  musicUrl: 'https://www.youtube.com/watch?v=E1FzUaZsdGk', // Bài hát: Dắt Anh Về Nhà (ICM x Thoại Nghi x Trung Đức)
  songTitle: 'Dắt Anh Về Nhà - ICM x Thoại Nghi x Trung Đức',
  wishesScriptUrl: 'https://script.google.com/macros/s/AKfycbwsDDIkkKC1fGjG3CcgG9mjzIzpTZc1vxNW4jHV0ujO1AfLMQA2GKGJIZsCbgOsxO48DA/exec',
  dressCode: [
    { name: 'Trắng Tinh Khôi', color: '#FFFFFF', border: '#E2E8F0' },
    { name: 'Hồng Pastel', color: '#FBCFE8', border: '#F472B6' },
    { name: 'Be / Nude', color: '#F5E6D3', border: '#D4B996' },
    { name: 'Xanh Sage', color: '#D1E7DD', border: '#A3CFBB' },
  ],
};
