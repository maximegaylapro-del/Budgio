import {
  Baby, Car, Home, House, Sun, Waves, Flame, Heart, LineChart, ArrowRight, ArrowLeft,
  Search, Clock, ShieldCheck, Database, SlidersHorizontal, BadgeCheck, RefreshCw, Zap,
  Activity, TrendingUp, Plane, Dog, MapPin, Building, Building2, Trees, Blocks, UserRound,
  UsersRound, GraduationCap, School, Landmark, PiggyBank, Scale, Gem, Wallet, Smile, Cake,
  Info, Sparkles, X, Check, RotateCcw, GitCompare, Share2, BadgePercent, Gift, ListChecks,
  FunctionSquare, Settings2, Copy, Layers, Smartphone, Tablet, Monitor, Moon, Star, Coins,
  Receipt, Calculator, Utensils, FerrisWheel, Package, Shirt, HeartPulse, Circle,
  type LucideIcon,
} from "lucide-react";
import type { LucideIconName } from "@/types/common";
import { cn } from "@/lib/utils/cn";

/** Registre nom (kebab) → composant Lucide. Ajouter ici tout nouvel icône utilisé. */
const REGISTRY: Record<string, LucideIcon> = {
  baby: Baby, car: Car, home: Home, house: House, sun: Sun, waves: Waves, flame: Flame,
  heart: Heart, "line-chart": LineChart, "arrow-right": ArrowRight, "arrow-left": ArrowLeft,
  search: Search, clock: Clock, "shield-check": ShieldCheck, database: Database,
  "sliders-horizontal": SlidersHorizontal, "badge-check": BadgeCheck, "refresh-cw": RefreshCw,
  zap: Zap, activity: Activity, "trending-up": TrendingUp, plane: Plane, dog: Dog,
  "map-pin": MapPin, building: Building, "building-2": Building2, trees: Trees, blocks: Blocks,
  "user-round": UserRound, "users-round": UsersRound, "graduation-cap": GraduationCap,
  school: School, landmark: Landmark, "piggy-bank": PiggyBank, scale: Scale, gem: Gem,
  wallet: Wallet, smile: Smile, cake: Cake, info: Info, sparkles: Sparkles, x: X, check: Check,
  "rotate-ccw": RotateCcw, "git-compare": GitCompare, "share-2": Share2,
  "badge-percent": BadgePercent, gift: Gift, "list-checks": ListChecks,
  "function-square": FunctionSquare, "settings-2": Settings2, copy: Copy, layers: Layers,
  smartphone: Smartphone, tablet: Tablet, monitor: Monitor, moon: Moon, star: Star,
  coins: Coins, receipt: Receipt, calculator: Calculator, utensils: Utensils,
  "ferris-wheel": FerrisWheel, package: Package, shirt: Shirt, "heart-pulse": HeartPulse,
};

interface IconProps {
  name: LucideIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}

/** Rend un icône Lucide depuis son nom. Fallback discret si inconnu. */
export function Icon({ name, size = 20, className, strokeWidth = 1.9, ...rest }: IconProps) {
  const Cmp = REGISTRY[name] ?? Circle;
  return <Cmp size={size} strokeWidth={strokeWidth} className={cn(className)} aria-hidden {...rest} />;
}
