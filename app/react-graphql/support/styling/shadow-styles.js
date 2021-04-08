//'0 1px 3px 0 rgba(75, 75, 75, 0.4);'
const shadows = {
  'sh-default': {
    shadowColor: 'rgba(75, 75, 75, 0.4)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2,
  },
  'sh-default-bottom': {
    shadowColor: 'rgba(75, 75, 75, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2,
  },
  'sh-light': {
    // 0 2px 6px 0 ;
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 1,
  },
  'sh-mid': {
    // 0 0px 3px 0 ;
    shadowColor: 'rgba(0, 0, 0, 0.29)',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 2,
  },
  'sh-mid2': {
    // 0 0px 3px 0 ;
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 2,
  },
  'sh-lg': {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 40,
    shadowOpacity: 0.16,
    elevation: 3,
  },
  'sh-none': {
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
  },
};
shadows.sh = shadows['sh-default'];

module.exports = shadows;
