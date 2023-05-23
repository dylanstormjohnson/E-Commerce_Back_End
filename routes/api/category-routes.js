const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    console.log('GETTING ALL CATEGORIES...')
    const categories = await Category.findAll({include: [Product]})
    res.json(categories);

  } catch(err) {
    console.log(err);
    res.json(err);
};
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    console.log('GETTING CARTEGORY BY ID...')
    const category = await Category.findOne({where: {id: req.params.id}, include: [Product]})
    res.json(category);

  } catch (error) {
   console.log(error)
   res.json(error) 
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /*req.body should look like this...
    {
      "category_name": "sports"
    }
  */
    try {
      console.log('ADDING CATEGORY...');
      const newCategory = await Category.create(req.body);
      res.json(newCategory);

    } catch (error) {
      console.log(error);
      res.json(error) ;
    };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    console.log('CHANGING CATEGORY...');
    const updatedCategory = await Category.update( req.body,
      { where: { id: req.params.id }}
      );
      res.json(updatedCategory);

  } catch(err) {
    console.log(err);
    res.json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  
  try {
    console.log('DELETING CATEGORY...');
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    res.json(deletedCategory);

  } catch (error) {
    console.log(error);
    res.json(error);
  };
});

module.exports = router;

// router.get (All) with try/catch:
  // try {
  //   const catagories = await Category.findAll({
  //   include: [Product] 
  // });

  // if (catagories) {
  //   res.json(category.toJSON())
  // } else {
  //   res.json('Categories not found')
  // }

  // } catch(err) {
  //   res.json(err);
  // };

// router.get (One) with try/catch:
  // try {
  //   const category = await Category.findOne({
  //   where: { id: id },
  //   include: [Product] 
  // });
  // if (category) {
  //   res.json(category.toJSON())
  // } else {
  //   res.json('Category not found')
  // }
  // } catch(err) {
  //   res.json(err);
  // };
