const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    console.log('GETTING ALL TAGS...');
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(tags);

  } catch(err) {
    console.log(err);
    res.json(err);
  }
  
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log('GETTING TAG BY ID...');
    const tag = await Tag.findOne({
      where: {id: req.params.id}, 
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    res.json(tag);

  } catch(err) {
    console.log(err);
    res.json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
    /*req.body should look like this...
    {
      "tag_name": "recreation"
    }
  */
  try {
    console.log('ADDING TAG...');
    const newTag = await Tag.create(req.body)
    res.json(newTag)

  } catch (error) {
    console.log(error)
    res.json(error) 
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log('CHANGING TAG...');
    const updatedTag = await Tag.update( req.body,
      { where: { id: req.params.id }}
      );
      res.json(updatedTag);

  } catch(err) {
    console.log(err)
    res.json(err) 
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log('DELETING TAG...');
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.json(deletedTag);
  } catch (error) {
    console.log(error);
    res.json(error);
  };
});

module.exports = router;
