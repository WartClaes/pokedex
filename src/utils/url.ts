export function getUrlParams(url: string) {
 const [, search] = url.split('?');
 const searchParams = new URLSearchParams(search);

 return Object.fromEntries(searchParams.entries());
}
