const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: {type: String, default: ''},
  stock: { type: Number, default: 0 },
  images: String
}, { timestamps: true });

productSchema.pre('save', async function(next) {
  if (this.isModified('productName')) {
    this.slug = slugify(this.productName, { lower: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
