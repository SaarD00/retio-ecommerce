import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'buyer',
      title: 'Buyer',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
    defineField({
      name: 'cost',
      title: 'Cost',
      type: 'string',
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended',
      type: 'boolean',
    }),
  ],
})
