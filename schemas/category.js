const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },
  slug: { type: String}
}, { timestamps: true });

categorySchema.pre('save', async function(next) {
    if (this.isModified('categoryName')) {
        this.slug = slugify(this.categoryName, { lower: true });
    }
    next();
});

module.exports = mongoose.model('Category', categorySchema);
