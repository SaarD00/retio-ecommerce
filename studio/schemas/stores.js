import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stores',
  title: 'Stores',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'types',
      title: 'Types',
      type: 'array',
      of: [{type: 'reference', to: {type: 'types'}}],
    }),
    // defineField({
    //   name: 'item',
    //   title: 'Item',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'item'}}],
    // }),
    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
})
