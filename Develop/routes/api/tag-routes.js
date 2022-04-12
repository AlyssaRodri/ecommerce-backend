const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(getAllTags)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagID = await Tag.findByPk(req.params.id, {include: [{model: Product}]});
    res.status(200).json(getTagID)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    if (!newTag){
      res.status(404).json({message:"No tag found with that ID."})
    }
    res.status(200).json(newTag)
  } catch (error) {
    res.status(400).json(error)
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      where: { id: req.params.id}
    })
    if(!deleteTag){
      res.status(404).json("No tage found with that ID.")
    }    res.status(200).json(updateTag)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id}
    })
    if(!deleteTag){
      res.status(404).json("No tage found with that ID.")
    }
    res.status(200).json(deleteTag)
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
