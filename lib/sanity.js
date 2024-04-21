import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5pakioiu',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token:
    'skfE4ltfjwPI7ZwyG3f3vwbs0RaiB8aCDYTy2sjC5bZpCw1ndJIyTAhxytKMwbN23JjANwrJCuakpT1lrqpYPWlH5WP8PBWTZYkMqNljjTl1OcL9C8fFgBs2zl83S9sOPcLJRz5Bhg8ymUPiW06xZvie5vz8YYmioReCuYqs6nd0PgyNusx0', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})