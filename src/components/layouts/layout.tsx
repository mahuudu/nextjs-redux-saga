// components/common/Layouts.tsx
import AdminLayout from "./admin";
import MainLayout from "./main";
export const Layouts = {
  Main: MainLayout,
  Admin: AdminLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
