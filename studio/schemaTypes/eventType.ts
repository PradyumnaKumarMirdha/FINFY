import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  title: 'Coins',
  name: 'coins',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Symbol',
      name: 'symbol',
      type: 'string',
    }),
    defineField({
      title: 'Contract Address',
      name: 'contractAddress',
      type: 'string',
    }),
    defineField({
      title: 'INR Price',
      name: 'inrPrice',
      type: 'string',
    }),
    defineField({
      title: 'Logo',
      name: 'logo',
      type: 'image',
    }),
  ],
})
