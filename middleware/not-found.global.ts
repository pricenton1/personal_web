export default defineNuxtRouteMiddleware((to) => {
    if (!to.matched.length && to.path !== '/404') {
      return navigateTo('/404', { redirectCode: 404 });
    }
});