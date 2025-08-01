import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'pl'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Enable locale prefix for all routes
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

export type localeType = 'en' | 'pl';
export const localeArray = ['en', 'pl'];
