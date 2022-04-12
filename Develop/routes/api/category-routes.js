const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      // be sure to include its associated Products
      include: [{model: Product}]
    })
    res.status(200).json(allCategories)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idCategories = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(idCategories);
  } catch (error) {
    res.status(400).json(error);
  };

});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(400).json(error)
  };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.create(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory) {
      res.status(404).json({ message: "There is no category with this ID"})
    }
    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(400).json(updateCategory)
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
try {
  const deleteCategory = await Category.destroy({
    where: { id: req.params.id }
  })
  if (!deleteCategory){
    res.status(404).json({message: "There is no category with this ID"})
  }
  res.status(200).json(deleteCategory)
} catch (error) {
  res.status(400).json(deleteCategory)
}

});

module.exports = router;
