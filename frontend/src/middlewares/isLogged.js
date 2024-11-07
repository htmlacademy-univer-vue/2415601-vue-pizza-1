import { useAuthStore } from "@/stores";

export default function isLogged() {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return { path: "/" };
  }
  return true;
}
