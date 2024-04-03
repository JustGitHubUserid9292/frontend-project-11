export default function proxify(url) {
   const base = new URL('https://allorigins.hexlet.app/get')
   const search = encodeURI(url)
   base.searchParams.set('disableCache', 'true');
   base.searchParams.set('url', search);
   return base;
}