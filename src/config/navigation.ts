import {
	CalendarClock,
	Clapperboard,
	Compass,
	FileText,
	Gauge,
	type LucideIcon,
	MessageSquare,
	MonitorSmartphone,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{
		key: 'release',
		path: '/release',
		icon: CalendarClock,
		isContentType: true,
	},
	{
		key: 'platforms',
		path: '/platforms',
		icon: MonitorSmartphone,
		isContentType: true,
	},
	{
		key: 'guide',
		path: '/guide',
		icon: Compass,
		isContentType: true,
	},
	{
		key: 'trailers',
		path: '/trailers',
		icon: Clapperboard,
		isContentType: true,
	},
	{
		key: 'performance',
		path: '/performance',
		icon: Gauge,
		isContentType: true,
	},
	{
		key: 'reviews',
		path: '/reviews',
		icon: MessageSquare,
		isContentType: true,
	},
	{
		key: 'story',
		path: '/story',
		icon: FileText,
		isContentType: true,
	},
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
