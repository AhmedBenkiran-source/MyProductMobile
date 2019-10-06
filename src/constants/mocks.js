const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['produits', 'marques'],
    count: 147,
    image: require('../../assets/icons/plants.png')
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['produits', 'top produits'],
    count: 16,
    image: require('../../assets/icons/seeds.png')
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['produits', 'marques'],
    count: 68,
    image: require('../../assets/icons/flowers.png')
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['produits', 'top produits'],
    count: 17,
    image: require('../../assets/icons/sprayers.png')
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['produits', 'top produits'],
    count: 47,
    image: require('../../assets/icons/pots.png')
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['produits', 'top produits'],
    count: 47,
    image: require('../../assets/icons/fertilizers.png')
  },
];

const produits = [
  {
    id: 1, 
    name: '16 Best Plants That Thrive In Your Bedroom',
    description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior'],
    images: [
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
      require('../../assets/images/plants_1.png'),
      require('../../assets/images/plants_2.png'),
      require('../../assets/images/plants_3.png'),
    ]
  }
];

const explore = [
  // images
  require('../../assets/images/explore_1.png'),
  require('../../assets/images/explore_2.png'),
  require('../../assets/images/explore_3.png'),
  require('../../assets/images/explore_4.png'),
  require('../../assets/images/explore_5.png'),
  require('../../assets/images/explore_6.png'),
];

const profile = {
  id : null,
  username: null,
  email: null,
  token:null,
  avatar: require('../../assets/images/avatar.png'),
};

export {
  categories,
  explore,
  produits,
  profile,
}