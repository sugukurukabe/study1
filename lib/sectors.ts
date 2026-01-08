// 業種データの定義（サーバーサイドでSupabaseから取得できない場合のフォールバック）
export const SECTORS = [
    {
        id: 'agriculture',
        icon: 'Wheat',
        color: 'green',
        order: 1,
    },
    {
        id: 'livestock',
        icon: 'Beef',
        color: 'amber',
        order: 2,
    },
    {
        id: 'construction',
        icon: 'HardHat',
        color: 'orange',
        order: 3,
    },
    {
        id: 'shipbuilding',
        icon: 'Ship',
        color: 'blue',
        order: 4,
    },
    {
        id: 'automobile',
        icon: 'Car',
        color: 'red',
        order: 5,
    },
    {
        id: 'aviation',
        icon: 'Plane',
        color: 'sky',
        order: 6,
    },
    {
        id: 'accommodation',
        icon: 'Hotel',
        color: 'purple',
        order: 7,
    },
    {
        id: 'nursing',
        icon: 'Heart',
        color: 'pink',
        order: 8,
    },
    {
        id: 'building-cleaning',
        icon: 'Sparkles',
        color: 'teal',
        order: 9,
    },
    {
        id: 'food-manufacturing',
        icon: 'UtensilsCrossed',
        color: 'yellow',
        order: 10,
    },
    {
        id: 'food-service',
        icon: 'ChefHat',
        color: 'rose',
        order: 11,
    },
] as const

export type SectorId = typeof SECTORS[number]['id']

// 業種名の多言語対応
export const SECTOR_NAMES: Record<string, Record<string, string>> = {
    agriculture: {
        ja: '農業',
        vi: 'Nông nghiệp',
        id: 'Pertanian',
        en: 'Agriculture',
    },
    livestock: {
        ja: '畜産業',
        vi: 'Chăn nuôi',
        id: 'Peternakan',
        en: 'Livestock',
    },
    construction: {
        ja: '建設業',
        vi: 'Xây dựng',
        id: 'Konstruksi',
        en: 'Construction',
    },
    shipbuilding: {
        ja: '造船・舶用工業',
        vi: 'Đóng tàu',
        id: 'Pembuatan Kapal',
        en: 'Shipbuilding',
    },
    automobile: {
        ja: '自動車整備',
        vi: 'Bảo dưỡng ô tô',
        id: 'Perawatan Mobil',
        en: 'Automobile Maintenance',
    },
    aviation: {
        ja: '航空',
        vi: 'Hàng không',
        id: 'Penerbangan',
        en: 'Aviation',
    },
    accommodation: {
        ja: '宿泊',
        vi: 'Khách sạn',
        id: 'Akomodasi',
        en: 'Accommodation',
    },
    nursing: {
        ja: '介護',
        vi: 'Điều dưỡng',
        id: 'Perawatan',
        en: 'Nursing Care',
    },
    'building-cleaning': {
        ja: 'ビルクリーニング',
        vi: 'Vệ sinh tòa nhà',
        id: 'Pembersihan Gedung',
        en: 'Building Cleaning',
    },
    'food-manufacturing': {
        ja: '飲食料品製造',
        vi: 'Sản xuất thực phẩm',
        id: 'Manufaktur Makanan',
        en: 'Food Manufacturing',
    },
    'food-service': {
        ja: '外食業',
        vi: 'Dịch vụ ăn uống',
        id: 'Layanan Makanan',
        en: 'Food Service',
    },
}
