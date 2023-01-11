import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'items',
  title: 'Items',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      type: 'number',
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended',
      type: 'boolean',
    }),
  ],
})
