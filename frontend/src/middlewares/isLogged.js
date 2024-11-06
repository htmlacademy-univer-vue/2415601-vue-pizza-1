import { useAuthStore } from "@/stores";

// export const isLoggedIn = ({ to }) => {
//     const authStore = useAuthStore();

//     if (!authStore.isAuthenticated) {
//         return { path: "/login", query: { redirect: to.fullPath}};
//     } else {
//         return true;
//     }
// };

export default function isLogged() {
  const authStore = useAuthStore();
  if (!authStore.user) {
    return { path: "/" };
  }
  return true;
}
